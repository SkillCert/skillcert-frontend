import React from 'react';
import { X, AlertTriangle, Loader2 } from 'lucide-react';

interface DeleteCourseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  courseName: string;
  isDeleting: boolean;
  error?: string | null;
}

const DeleteCourseDialog: React.FC<DeleteCourseDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  courseName,
  isDeleting,
  error,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative bg-gray-800 border border-gray-600 rounded-xl p-6 max-w-md mx-4 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isDeleting}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Icon */}
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-white">Delete Course</h3>
        </div>

        {/* Warning Message */}
        <div className="mb-6">
          <p className="text-gray-300 mb-3">
            Are you sure you want to delete <span className="font-semibold text-white">"{courseName}"</span>?
          </p>
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-3">
            <p className="text-red-300 text-sm">
              <strong>Warning:</strong> This action cannot be undone. This will permanently delete:
            </p>
            <ul className="text-red-300 text-sm mt-2 list-disc list-inside space-y-1">
              <li>The course and all its content</li>
              <li>All associated modules and lessons</li>
              <li>Student enrollment data</li>
            </ul>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-900/50 border border-red-700 rounded-lg p-3">
            <p className="text-red-300 text-sm">
              <strong>Error:</strong> {error}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{isDeleting ? 'Deleting...' : 'Delete Course'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCourseDialog;