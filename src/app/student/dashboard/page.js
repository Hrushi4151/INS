'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/contexts/ToastContext';
import Loading from '@/components/Loading';
import InternshipCard from '@/components/InternshipCard';
import { RiFilter3Line } from 'react-icons/ri';

export default function StudentDashboard() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch('/api/applications');
        const data = await res.json();
        if (res.ok) {
          setApplications(data);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
        showToast('Failed to load applications', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();

    // Show success message when redirected from application submission
    if (searchParams.get('applied') === 'true') {
      showToast('Application submitted successfully', 'success');
    }
  }, [showToast, searchParams]);

  const filteredApplications = applications.filter(app => {
    if (statusFilter === 'all') return true;
    return app.status === statusFilter;
  });

  const getStatusCount = (status) => {
    return applications.filter(app => app.status === status).length;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Applications
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Application Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div 
              onClick={() => setStatusFilter('all')}
              className={`cursor-pointer p-4 rounded-lg ${
                statusFilter === 'all' 
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                  : 'bg-white dark:bg-gray-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Applications
                  </p>
                  <p className="text-2xl font-semibold">
                    {applications.length}
                  </p>
                </div>
                <RiFilter3Line className="w-8 h-8 text-gray-400" />
              </div>
            </div>

            <div 
              onClick={() => setStatusFilter('pending')}
              className={`cursor-pointer p-4 rounded-lg ${
                statusFilter === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-white dark:bg-gray-800'
              }`}
            >
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Pending
              </p>
              <p className="text-2xl font-semibold">
                {getStatusCount('pending')}
              </p>
            </div>

            <div 
              onClick={() => setStatusFilter('accepted')}
              className={`cursor-pointer p-4 rounded-lg ${
                statusFilter === 'accepted'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-white dark:bg-gray-800'
              }`}
            >
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Accepted
              </p>
              <p className="text-2xl font-semibold">
                {getStatusCount('accepted')}
              </p>
            </div>

            <div 
              onClick={() => setStatusFilter('rejected')}
              className={`cursor-pointer p-4 rounded-lg ${
                statusFilter === 'rejected'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-white dark:bg-gray-800'
              }`}
            >
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Rejected
              </p>
              <p className="text-2xl font-semibold">
                {getStatusCount('rejected')}
              </p>
            </div>
          </div>

          {/* Applications List */}
          {filteredApplications.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {applications.length === 0 
                  ? 'No applications yet'
                  : `No ${statusFilter} applications`
                }
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {applications.length === 0 
                  ? 'Start exploring internships and submit your first application!'
                  : 'Try selecting a different filter'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredApplications.map((application) => (
                <InternshipCard
                  key={application._id}
                  internship={application.internship}
                  application={application}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 