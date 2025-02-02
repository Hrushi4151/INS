'use client';
import { useState, useEffect } from 'react';
import ApplicationBadge from './ApplicationBadge';
import FileViewer from './FileViewer';

export default function ApplicationHistory({ internshipId }) {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await fetch(`/api/applications/check/${internshipId}`);
        const data = await res.json();
        if (res.ok && data) {
          setApplication(data);
        }
      } catch (error) {
        console.error('Error fetching application:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [internshipId]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      </div>
    );
  }

  if (!application) {
    return null;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Your Application
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Applied on: {new Date(application.createdAt).toLocaleDateString()}
          </div>
          <ApplicationBadge status={application.status} />
        </div>
        <div>
          <FileViewer fileUrl={application.resume} fileName="Your Resume" />
        </div>
      </div>
    </div>
  );
} 