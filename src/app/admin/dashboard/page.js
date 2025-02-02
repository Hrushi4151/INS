'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useToast } from '@/contexts/ToastContext';
import Loading from '@/components/Loading';
import ApplicationStatus from '@/components/ApplicationStatus';
import AdminStats from '@/components/AdminStats';
import ApplicationList from '@/components/ApplicationList';

export default function AdminDashboard() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [internshipsRes, applicationsRes] = await Promise.all([
          fetch('/api/internships?postedByMe=true'),
          fetch('/api/applications/admin'),
        ]);

        const [internshipsData, applicationsData] = await Promise.all([
          internshipsRes.json(),
          applicationsRes.json(),
        ]);

        if (internshipsRes.ok) {
          setInternships(internshipsData);
        }
        if (applicationsRes.ok) {
          setApplications(applicationsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        showToast('Failed to load dashboard data', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [showToast]);

  useEffect(() => {
    const fetchRecentApplications = async () => {
      try {
        const res = await fetch('/api/applications/recent');
        const data = await res.json();
        
        if (res.ok) {
          setRecentApplications(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        showToast('Failed to load recent applications', 'error');
      }
    };

    fetchRecentApplications();
  }, [showToast]);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      const res = await fetch(`/api/applications/${applicationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (res.ok) {
        setApplications(prev =>
          prev.map(app =>
            app._id === applicationId ? { ...app, status: newStatus } : app
          )
        );
        showToast('Application status updated', 'success');
      } else {
        showToast(data.message || 'Failed to update status', 'error');
      }
    } catch (error) {
      console.error('Status update error:', error);
      showToast('Failed to update status', 'error');
    }
  };

  const handleDeleteInternship = async (internshipId) => {
    if (!window.confirm('Are you sure you want to delete this internship?')) {
      return;
    }

    try {
      const res = await fetch(`/api/internships/${internshipId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setInternships(prev => prev.filter(i => i._id !== internshipId));
        showToast('Internship deleted successfully', 'success');
      } else {
        const data = await res.json();
        showToast(data.message || 'Failed to delete internship', 'error');
      }
    } catch (error) {
      console.error('Delete error:', error);
      showToast('Failed to delete internship', 'error');
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <Link
              href="/admin/internships/new"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
            >
              Post New Internship
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* My Internships */}
          <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              My Internships
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Applications
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Deadline
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {internships.map((internship) => (
                    <tr key={internship._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {internship.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {internship.company}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {applications.filter(a => a.internship._id === internship._id).length}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(internship.deadline).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/admin/internships/${internship._id}/edit`}
                          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mr-4"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteInternship(internship._id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Recent Applications */}
          <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Recent Applications
            </h2>
            <ApplicationList applications={recentApplications} />
          </section>

          <section className="mb-6">
            <AdminStats internships={internships} applications={applications} />
          </section>
        </div>
      </main>
    </div>
  );
} 