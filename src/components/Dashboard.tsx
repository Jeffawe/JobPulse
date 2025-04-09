import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard : React.FC = () => {
  // Mock data - would come from your API
  const [jobApplications, setJobApplications] = useState([
    {
      id: 1,
      company: 'Tech Solutions Inc.',
      position: 'Frontend Developer',
      status: 'Applied',
      lastUpdated: '2025-04-05',
      location: 'Remote',
      salary: '$90,000 - $120,000'
    },
    {
      id: 2,
      company: 'DataViz Corporation',
      position: 'UI/UX Designer',
      status: 'Interview Scheduled',
      lastUpdated: '2025-04-03',
      location: 'New York, NY',
      salary: '$85,000 - $110,000'
    },
    {
      id: 3,
      company: 'CloudNet Systems',
      position: 'React Developer',
      status: 'Rejected',
      lastUpdated: '2025-03-28',
      location: 'San Francisco, CA',
      salary: '$110,000 - $140,000'
    }
  ]);

  const handleDelete = (id:number) => {
    setJobApplications(jobApplications.filter(job => job.id !== id));
  };

  const handleRescanEmails = () => {
    // This would connect to your backend to trigger email scanning
    alert('Scanning emails for new job applications...');
  };

  const getStatusClass = (status:string) => {
    switch(status.toLowerCase()) {
      case 'applied': return 'status-applied';
      case 'interview scheduled': return 'status-interview';
      case 'offer': return 'status-offer';
      case 'rejected': return 'status-rejected';
      default: return 'status-default';
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Your Job Applications</h1>
        <button className="rescan-btn" onClick={handleRescanEmails}>
          <span className="rescan-icon">🔄</span> Rescan Emails
        </button>
      </div>
      
      {jobApplications.length === 0 ? (
        <div className="no-applications">
          <p>No job applications found. We'll scan your emails when you add your account in settings.</p>
        </div>
      ) : (
        <div className="job-grid">
          {jobApplications.map(job => (
            <div className="job-card" key={job.id}>
              <div className="job-header">
                <h2>{job.position}</h2>
                <div className={`job-status ${getStatusClass(job.status)}`}>
                  {job.status}
                </div>
              </div>
              <div className="job-company">{job.company}</div>
              <div className="job-details">
                <div className="job-location">📍 {job.location}</div>
                <div className="job-salary">💰 {job.salary}</div>
                <div className="job-date">📅 Updated: {job.lastUpdated}</div>
              </div>
              <div className="job-actions">
                <button className="edit-btn">Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(job.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;