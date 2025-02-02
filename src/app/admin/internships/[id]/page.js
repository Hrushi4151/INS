'use client';
import { useState, useEffect } from 'react';
import { useToast } from '@/contexts/ToastContext';
import Loading from '@/components/Loading';
import { 
  RiUserLine, 
  RiTimeLine, 
  RiCheckLine, 
  RiCloseLine,
  RiFileList3Line 
} from 'react-icons/ri';
import ApplicationList from '@/components/ApplicationList';

export default function AdminInternshipDetail({ params }) {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [internship, setInternship] = useState(null);
  const [applications, setApplications] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [internshipRes, applicationsRes] = await Promise.all([
          fetch(`/api/internships/${params.id}`),
          fetch(`/api/internships/${params.id}/applications`)
        ]);

        const [internshipData, applicationsData] = await Promise.all([
          internshipRes.json(),
          applicationsRes.json()
        ]);

        if (internshipRes.ok) {
          setInternship(internshipData);
        }
        if (applicationsRes.ok) {
          setApplications(applicationsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        showToast('Failed to load internship details', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id, showToast]);

  const getStatusCount = (status) => {
    if (status === 'all') return applications.length;
    return applications.filter(app => app.status === status).length;
  };

  const filteredApplications = applications.filter(app => {
    if (selectedStatus === 'all') return true;
    return app.status === selectedStatus;
  });

  if (loading) return <Loading />;
  if (!internship) return <div>Internship not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Internship Header */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {internship.title}
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {internship.company} • {internship.location}
              </p>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Posted on: {new Date(internship.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Application Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div 
            onClick={() => setSelectedStatus('all')}
            className={`cursor-pointer p-6 rounded-lg ${
              selectedStatus === 'all' 
                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                : 'bg-white dark:bg-gray-800'
            }`}
          >
            <div className="flex items-center space-x-3">
              <RiFileList3Line className="w-6 h-6" />
              <div>
                <p className="text-sm font-medium">Total Applications</p>
                <p className="text-2xl font-semibold">{getStatusCount('all')}</p>
              </div>
            </div>
          </div>

          <div 
            onClick={() => setSelectedStatus('pending')}
            className={`cursor-pointer p-6 rounded-lg ${
              selectedStatus === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-white dark:bg-gray-800'
            }`}
          >
            <div className="flex items-center space-x-3">
              <RiTimeLine className="w-6 h-6" />
              <div>
                <p className="text-sm font-medium">Pending</p>
                <p className="text-2xl font-semibold">{getStatusCount('pending')}</p>
              </div>
            </div>
          </div>

          <div 
            onClick={() => setSelectedStatus('accepted')}
            className={`cursor-pointer p-6 rounded-lg ${
              selectedStatus === 'accepted'
                ? 'bg-green-100 text-green-800'
                : 'bg-white dark:bg-gray-800'
            }`}
          >
            <div className="flex items-center space-x-3">
              <RiCheckLine className="w-6 h-6" />
              <div>
                <p className="text-sm font-medium">Accepted</p>
                <p className="text-2xl font-semibold">{getStatusCount('accepted')}</p>
              </div>
            </div>
          </div>

          <div 
            onClick={() => setSelectedStatus('rejected')}
            className={`cursor-pointer p-6 rounded-lg ${
              selectedStatus === 'rejected'
                ? 'bg-red-100 text-red-800'
                : 'bg-white dark:bg-gray-800'
            }`}
          >
            <div className="flex items-center space-x-3">
              <RiCloseLine className="w-6 h-6" />
              <div>
                <p className="text-sm font-medium">Rejected</p>
                <p className="text-2xl font-semibold">{getStatusCount('rejected')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            {selectedStatus === 'all' 
              ? 'All Applications' 
              : `${selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)} Applications`}
          </h2>
          
          {filteredApplications.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No {selectedStatus} applications found
            </div>
          ) : (
            <ApplicationList 
              applications={filteredApplications}
              onStatusUpdate={(applicationId, newStatus) => {
                setApplications(prev => 
                  prev.map(app => 
                    app._id === applicationId 
                      ? { ...app, status: newStatus }
                      : app
                  )
                );
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
} 