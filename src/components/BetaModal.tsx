import React, { useState, useEffect } from 'react';

interface BetaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerateTestUser: () => void;
}

const BetaNotificationModal: React.FC<BetaModalProps> = ({ 
  isOpen, 
  onClose,
  onGenerateTestUser
}) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setIsModalOpen(false);
    onClose();
  };

  const handleGenerateTestUser = () => {
    onGenerateTestUser();
    handleClose();
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 backdrop-blur-sm bg-opacity-50 transition-opacity" 
        onClick={handleClose}
      />
      
      {/* Modal content */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 z-10 transform transition-all">
        {/* Beta badge */}
        <div className="absolute -top-3 -right-3">
          <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
            BETA
          </span>
        </div>

        {/* Modal header */}
        <div className="px-6 pt-6 pb-0">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Welcome to JobPulse Beta
            </h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal body */}
        <div className="px-6 py-4">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            JobPulse is currently in beta. If you're new to this page and want to gain email access to test it, please send an email to the developer:
          </p>
          
          <a 
            href="mailto:awagujeffery@gmail.com" 
            className="text-blue-600 hover:text-blue-800 font-medium block mb-4"
          >
            awagujeffery@gmail.com
          </a>
          
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            If you've already been given access, you can ignore this message.
          </p>
          
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            Alternatively, you can generate a test user to explore the features:
          </p>
        </div>

        {/* Modal footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            type="button"
            className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleClose}
          >
            I Already Have Access
          </button>
          <button
            type="button"
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 border border-transparent rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleGenerateTestUser}
          >
            Generate Test User
          </button>
        </div>
      </div>
    </div>
  );
};

export default BetaNotificationModal;