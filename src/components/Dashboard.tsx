import React, { useState } from 'react';

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

  const handleDelete = (id: number) => {
    setJobApplications(jobApplications.filter((job) => job.id !== id));
  };

  const handleRescanEmails = () => {
    alert('Scanning emails for new job applications...');
  };

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'applied':
        return 'bg-blue-100 text-blue-800';
      case 'interview scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'offer':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Your Job Applications</h1>
        <button
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          onClick={handleRescanEmails}
        >
          <span className="mr-2">🔄</span> Rescan Emails
        </button>
      </div>

      {jobApplications.length === 0 ? (
        <div className="text-gray-600 text-center bg-gray-100 p-6 rounded shadow">
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
