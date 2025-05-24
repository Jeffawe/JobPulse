import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './context/AuthContext';
import NoDiscordWebhook from './Settings/NoDiscordWebhook';
import { NotificationStatus, User, JobApplication, EmailData } from './types/auth';
import { Filter } from 'lucide-react';
import axios from 'axios';
import { toast } from "sonner";
import TestAccountWarning from './Settings/TestAccountWarning';
import DashboardModal from './DashboardModal';
import OnboardingDemo from './Tutorials/OnboardingDemo';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL;

const Dashboard: React.FC = () => {
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);

  const [emails, setEmails] = useState<EmailData[]>([]);
  const [_, setSocket] = useState<Socket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('connecting');

  const [openTestModal, setOpenTestModal] = useState(false);
  //const [openTutorialModal, setOpenTutorialModal] = useState(false);

  const { user, setUser } = useAuth();

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/job/emails?refresh=false`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'api-key': API_KEY
        }
      });

      if (response.data.success) {
        toast.success("Data refreshed");
        setEmails(response.data.emails);
      }
    } catch (error) {
      toast.error("Failed to refresh data");
      console.error('Error fetching emails:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Format the job application data from email format to display format
  const formatApplicationData = (emailData: EmailData): JobApplication => {
    return {
      id: emailData.id,
      company: emailData.company_name,
      position: emailData.job_title,
      link: emailData.job_link,
      status: emailData.jobStatus || 'Applied',
      location: emailData.location || 'Not specified',
      date: new Date(emailData.metadata?.receivedAt || emailData.date),
    };
  };

  useEffect(() => {
    if (!user?.id) return;

    const newSocket = io(WS_BASE_URL, {
      transports: ['websocket'],
      auth: {
        token: localStorage.getItem('token')
      }
    });

    setSocket(newSocket);

    // Always register events right away
    newSocket.on('connect', () => {
      setConnectionStatus('connected');
      console.log('Connected to WebSocket server');
      newSocket.emit('register', user.id, user.isTestUser);
    });

    newSocket.on('disconnect', () => {
      setConnectionStatus('disconnected');
      console.log('Disconnected from WebSocket server');
    });

    newSocket.on('connect_error', (error) => {
      setConnectionStatus('error');
      console.error('WebSocket connection error:', error);
    });

    newSocket.on('initialEmails', (initialEmails: EmailData[]) => {
      setEmails(initialEmails);
      setIsLoading(false);
    });

    newSocket.on('newEmails', (newEmailsData: EmailData[]) => {
      console.log('New emails received:', newEmailsData);
      setEmails(prevEmails => {
        const existingIds = new Set(prevEmails.map(email => email.id));
        const uniqueNewEmails = newEmailsData.filter(email => !existingIds.has(email.id));

        if (uniqueNewEmails.length > 0) {
          toast.info(`${uniqueNewEmails.length} new job application updates`, { duration: 1000 });
          return [...prevEmails, ...uniqueNewEmails];
        }
        return prevEmails;
      });
    });

    // Fallback if socket never connects
    const fallbackTimeout = setTimeout(() => {
      if (connectionStatus !== 'connected') {
        refreshData();
      }
    }, 5000);

    return () => {
      clearTimeout(fallbackTimeout);
      newSocket.disconnect();
    };
  }, [user?.id]);


  // Transform email data to job application format
  useEffect(() => {
    if (emails.length > 0) {
      console.log(emails);
      const formattedApplications = emails.map(formatApplicationData);
      setJobApplications(formattedApplications);
    }
  }, [emails]);

  // useEffect(() => {
  //   if (user?.firstTimeLogin) {
  //     setOpenTutorialModal(true);
  //   }
  // }, []);

  // const handleDelete = (id: number) => {
  //   setJobApplications(jobApplications.filter((job) => job.id !== id));
  // };

  const handleFilterCreation = async () => {
    try {
      if (user?.isTestUser) {
        setOpenTestModal(true);
        return
      }
      const response = await axios.post<User>(
        `${API_BASE_URL}/auth/create-filter`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'api-key': API_KEY,
          },
        }
      );

      setUser(response.data)
      toast.success("Filter created", { duration: 4000 });
    } catch (error) {
      toast.error("Error creating filter", { duration: 4000 });
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case NotificationStatus.APPLIED:
        return 'bg-blue-100 text-blue-800';
      case NotificationStatus.ASSESSMENT:
        return 'bg-yellow-100 text-yellow-800';
      case NotificationStatus.INTERVIEW_COMPLETE:
        return 'bg-green-100 text-green-800';
      case NotificationStatus.INTERVIEW_SCHEDULED:
        return 'bg-yellow-100 text-yellow-800';
      case NotificationStatus.OFFER:
        return 'bg-green-100 text-green-800';
      case NotificationStatus.REJECTED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl min-h-screen mx-auto p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 sm:mb-0">
          Your Job Applications
        </h1>
        <div className="flex flex-col sm:flex-row gap-2">
          {user?.label_id == null &&
            <button
              className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-sm rounded shadow"
              onClick={handleFilterCreation}
            >
              <Filter className="w-4 h-4 mr-2" /> Create Filter
            </button>}
          <button
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-sm rounded shadow"
            onClick={refreshData}
          >
            <span className="mr-2">🔄</span> Rescan Emails
          </button>
        </div>
      </div>

      {openTestModal && (
        <DashboardModal
          isOpen={openTestModal}
          onClose={() => setOpenTestModal(false)}
          message="As a regular user, this button creates a Gmail filter that helps the app fetch relevant emails (we don’t fetch from your Inbox directly). 
          However, for test users, this feature is disabled — the filter won’t be created."
        />
      )}

      <OnboardingDemo />
      {user && !user.discord_webhook && !user.isTestUser && <NoDiscordWebhook />}

      {user?.isTestUser && <TestAccountWarning />}


      {isLoading ? (
        <div className="text-gray-600 text-center bg-gray-100 p-6 rounded shadow pt-5">
          <p>Loading job applications...</p>
        </div>
      )

        : (jobApplications.length === 0 ? (
          <div className="text-gray-600 text-center bg-gray-100 p-6 rounded shadow pt-5">
            <p>
              No job applications found.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {jobApplications.map((job) => (
              <div key={job.id} className="bg-white rounded-xl shadow p-5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold text-gray-800">{job.position}</h2>
                    <span
                      className={`text-sm px-3 py-1 rounded-full font-medium ${getStatusClass(
                        job.status
                      )}`}
                    >
                      {job.status}
                    </span>
                  </div>
                  <div className="text-gray-500 font-medium mb-4">{job.company}</div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <div>📍 {job.location}</div>
                    <div>📅 Updated: {job.date.toLocaleDateString()}</div>
                  </div>
                </div>

                {/* <div className="mt-4 flex justify-end space-x-3">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div> */}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Dashboard;
