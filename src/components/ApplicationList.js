'use client';
import { useState } from 'react';
import ApplicationBadge from './ApplicationBadge';
import FileViewer from './FileViewer';

export default function ApplicationList({ applications }) {
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredApplications = selectedStatus === 'all'
    ? applications
    : applications.filter(app => app.status === selectedStatus);

  const updateApplicationStatus = async (applicationId, newStatus) => {
    try {
      const res = await fetch(`/api/applications/${applicationId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error('Failed to update status');
      }

      // Refresh the page to show updated status
      window.location.reload();
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedStatus('all')}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedStatus === 'all'
              ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setSelectedStatus('pending')}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedStatus === 'pending'
              ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setSelectedStatus('accepted')}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedStatus === 'accepted'
              ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
          }`}
        >
          Accepted
        </button>
        <button
          onClick={() => setSelectedStatus('rejected')}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedStatus === 'rejected'
              ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
          }`}
        >
          Rejected
        </button>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {filteredApplications.map((application) => (
          <div key={application._id} className="py-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {application.student.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {application.student.email}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Applied on: {new Date(application.createdAt).toLocaleDateString()}
                </p>
              </div>
              <ApplicationBadge status={application.status} />
            </div>

            <div className="flex items-center space-x-4">
              <FileViewer fileData={application.resume} fileName="Resume" />
              
              {application.status === 'pending' && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => updateApplicationStatus(application._id, 'accepted')}
                    className="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateApplicationStatus(application._id, 'rejected')}
                    className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredApplications.length === 0 && (
          <div className="py-6 text-center text-gray-500 dark:text-gray-400">
            No applications found
          </div>
        )}
      </div>
    </div>
  );
} 