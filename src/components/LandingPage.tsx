import React, { useState } from 'react';
import AuthModal from './AuthModal';

const LandingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen items-center justify-center px-10 py-10">
      <div className="w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Track Your Job Applications Effortlessly
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          JobPulse automatically scans your emails to organize and track all your job applications in a heartbeat.
          Never miss an interview or lose track of your applications again.
        </p>

        <div className="flex flex-col items-center gap-6 mb-8">
          {/* Row 1: Email Integration */}
          <div className="min-w-[200px] max-w-xs bg-white rounded-2xl shadow-md p-4 transition-transform hover:-translate-y-1">
            <div className="text-2xl mb-2">📧</div>
            <h3 className="font-semibold text-gray-700 mb-1">Email Integration</h3>
            <p className="text-sm text-gray-500">
              Automatically detects job applications from your inbox
            </p>
          </div>

          {/* Row 2: Two cards side by side on medium+ screens */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            {/* Status Tracking */}
            <div className="min-w-[200px] max-w-xs bg-white rounded-2xl shadow-md p-4 transition-transform hover:-translate-y-1">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-700 mb-1">Status Tracking</h3>
              <p className="text-sm text-gray-500">Monitor each application's progress</p>
            </div>

            {/* Reminders */}
            <div className="min-w-[200px] max-w-xs bg-white rounded-2xl shadow-md p-4 transition-transform hover:-translate-y-1">
              <div className="text-2xl mb-2">⏰</div>
              <h3 className="font-semibold text-gray-700 mb-1">Reminders</h3>
              <p className="text-sm text-gray-500">Get notified about upcoming interviews</p>
            </div>
          </div>
        </div>

        <button
          onClick={openModal}
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium py-3 px-6 rounded-xl shadow-md transition-colors"
        >
          Get Started
        </button>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={isModalOpen} setisOpen={setIsModalOpen} />
    </div >
  );
};

export default LandingPage;
