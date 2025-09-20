import React, { useState, useEffect } from 'react';

interface BetaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BetaNotificationModal: React.FC<BetaModalProps> = ({
  isOpen,
  onClose
}) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setIsModalOpen(false);
    onClose();
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
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full mx-4 z-10 transform transition-all">
        {/* Service Status badge */}
        <div className="absolute -top-3 -right-3">
          <span className="bg-amber-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
            SERVICE NOTICE
          </span>
        </div>
        {/* Modal header */}
        <div className="px-6 pt-6 pb-0">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              JobPulse Service Update
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
            Unfortunately, the backend service for this application has been shut down due to limited usage and hosting costs.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            However, the complete source code is available on GitHub for anyone interested in self-hosting or contributing to the project:
          </p>

          <div className="space-y-3 mb-4">
            <a
              href="https://github.com/Jeffawe/JobPulse-Backend"
              className="block bg-gray-800 hover:bg-gray-900 text-white text-center py-2 px-4 rounded-lg transition-colors"
            >
              📱 Node.js Backend Repository
            </a>
            <a
              href="https://github.com/Jeffawe/JobPulse-DiscordBot"
              className="block bg-indigo-600 hover:bg-indigo-700 text-white text-center py-2 px-4 rounded-lg transition-colors"
            >
              🤖 Discord Bot Repository
            </a>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
            <p className="text-gray-700 dark:text-gray-300 mb-2 text-sm">
              Feel free to personally host it or contact me if you need any help or are interested in this or any of my works:
            </p>
            <a
              href="mailto:awagujeffery@gmail.com"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              awagujeffery@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetaNotificationModal;