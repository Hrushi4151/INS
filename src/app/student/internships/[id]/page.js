'use client';
import { useState, useEffect } from 'react';
import { useToast } from '@/contexts/ToastContext';
import Loading from '@/components/Loading';
import InternshipDetails from '@/components/InternshipDetails';
import ApplicationForm from '@/components/ApplicationForm';
import ApplicationHistory from '@/components/ApplicationHistory';

export default function InternshipPage({ params }) {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [internship, setInternship] = useState(null);

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const res = await fetch(`/api/internships/${params.id}`);
        const data = await res.json();
        
        if (res.ok) {
          setInternship(data);
        } else {
          showToast(data.message || 'Failed to load internship', 'error');
        }
      } catch (error) {
        console.error('Error fetching internship:', error);
        showToast('Failed to load internship', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchInternship();
  }, [params.id, showToast]);

  if (loading) {
    return <Loading />;
  }

  if (!internship) {
    return (
      <div className="text-center py-8 text-gray-600 dark:text-gray-400">
        Internship not found
      </div>
    );
  }

  const isDeadlinePassed = new Date(internship.deadline) < new Date();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {internship.title}
        </h1>

        <InternshipDetails internship={internship} />

        {isDeadlinePassed ? (
          <div className="mt-8 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  Application Closed
                </h3>
                <p className="mt-2 text-sm text-red-700 dark:text-red-300">
                  The deadline for this internship has passed.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <ApplicationHistory internshipId={internship._id} />
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Apply for this Internship
              </h2>
              <ApplicationForm internship={internship} />
            </div>
          </>
        )}
      </div>
    </div>
  );
} 