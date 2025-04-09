import React, { useState } from 'react';
import './LandingPage.css';
import AuthModal from './AuthModal';

const LandingPage : React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="landing-text">
          <h1>Track Your Job Applications Effortlessly</h1>
          <p>
            JobTrackr automatically scans your emails to organize and track all your job applications in one place.
            Never miss an interview or lose track of your applications again.
          </p>
          <div className="landing-features">
            <div className="feature">
              <div className="feature-icon">📧</div>
              <h3>Email Integration</h3>
              <p>Automatically detects job applications from your inbox</p>
            </div>
            <div className="feature">
              <div className="feature-icon">📊</div>
              <h3>Status Tracking</h3>
              <p>Monitor each application's progress</p>
            </div>
            <div className="feature">
              <div className="feature-icon">⏰</div>
              <h3>Reminders</h3>
              <p>Get notified about upcoming interviews</p>
            </div>
          </div>
          <button className="cta-button" onClick={openModal}>
            Get Started
          </button>
        </div>
        <div className="landing-image">
          <div className="app-preview">
            <div className="preview-header">
              <div className="preview-dot"></div>
              <div className="preview-dot"></div>
              <div className="preview-dot"></div>
            </div>
            <div className="preview-content">
              <div className="preview-card"></div>
              <div className="preview-card"></div>
              <div className="preview-card"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal isOpen={isModalOpen} setisOpen={setIsModalOpen} />
    </div>
  );
}

export default LandingPage;