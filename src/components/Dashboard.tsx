import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './context/AuthContext';
import NoDiscordWebhook from './Settings/NoDiscordWebhook';
import { NotificationStatus } from './types/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const Dashboard: React.FC = () => {
  const [jobApplications, setJobApplications] = useState([
    {
      id: 1,
      company: 'Tech Solutions Inc.',
      position: 'Frontend Developer',
      status: 'Applied',
      lastUpdated: '2025-04-05',
      location: 'Remote',
      salary: '$90,000 - $120,000',
    },
    {
      id: 2,
      company: 'DataViz Corporation',
      position: 'UI/UX Designer',
      status: 'Interview Scheduled',
      lastUpdated: '2025-04-03',
      location: 'New York, NY',
      salary: '$85,000 - $110,000',
    },
    {
      id: 3,
      company: 'CloudNet Systems',
      position: 'React Developer',
      status: 'Rejected',
      lastUpdated: '2025-03-28',
      location: 'San Francisco, CA',
      salary: '$110,000 - $140,000',
    },
  ]);

  const [_, setSocket] = useState<Socket | null>(null);

  const [Email, setEmail] = useState([
    {
      id: 1,
      company: 'Tech Solutions Inc.',
      position: 'Frontend Developer',
      status: 'Applied',
      lastUpdated: '2025-04-05',
      location: 'Remote',
      salary: '$90,000 - $120,000',
    },
    {
      id: 2,
      company: 'DataViz Corporation',
      position: 'UI/UX Designer',
      status: 'Interview Scheduled',
      lastUpdated: '2025-04-03',
      location: 'New York, NY',
      salary: '$85,000 - $110,000',
    }
  ]);

  const { user } = useAuth();

  // useEffect(() => {
  //   // Initial fetch of emails
  //   fetch(`${API_BASE_URL}/emails`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${localStorage.getItem('token')}`,
  //       'api-key': API_KEY
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data.success) {
  //         setEmail(data.emails);
  //         console.log(Email);
  //       }
  //     });

  //   // Connect to WebSocket
  //   const newSocket = io(import.meta.env.VITE_API_BASE_URL);
  //   setSocket(newSocket);

  //   // Register with userId
  //   newSocket.emit('register', user?.id);

  //   // Listen for new emails
  //   newSocket.on('newEmail', (email) => {
  //     setEmail(prevEmails => [...prevEmails, email]);
  //   });

  //   return () => {
  //     newSocket.disconnect();
  //   };
  // }, [user?.id]);

  const handleDelete = (id: number) => {
    setJobApplications(jobApplications.filter((job) => job.id !== id));
  };

  const handleRescanEmails = () => {
    alert('Scanning emails for new job applications...');
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case NotificationStatus.APPLIED:
        return 'bg-blue-100 text-blue-800';
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Your Job Applications</h1>
        <button
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          onClick={handleRescanEmails}
        >
          <span className="mr-2">🔄</span> Rescan Emails
        </button>
      </div>

      {user?.discord_webhook === "NULL" && <NoDiscordWebhook />}

      {jobApplications.length === 0 ? (
        <div className="text-gray-600 text-center bg-gray-100 p-6 rounded shadow pt-5">
          <p>
            No job applications found. We'll scan your emails when you add your account in
            settings.
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
                  <div>💰 {job.salary}</div>
                  <div>📅 Updated: {job.lastUpdated}</div>
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-3">
                <button className="text-blue-600 hover:underline">Edit</button>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
