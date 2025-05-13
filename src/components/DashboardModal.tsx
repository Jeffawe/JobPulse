import React from 'react';

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const DashboardModal: React.FC<DashboardModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-lg font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Notice</h2>
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default DashboardModal;
