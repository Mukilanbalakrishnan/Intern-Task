import React, { useState, useEffect } from 'react';
import { API_URL } from '../App';

const AdminView = () => {
    const [applicants, setApplicants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchApplicants = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API_URL}/api/applicants`);
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setApplicants(data);
        } catch (err) {
            setError('An error occurred while fetching data.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchApplicants();
    }, []);

    const handleStatusChange = async (id, status) => {
        setApplicants(prev => prev.map(app => app._id === id ? { ...app, status } : app));

        try {
            const response = await fetch(`${API_URL}/api/applicants/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            if (!response.ok) throw new Error('Failed to update status');
        } catch (error) {
            console.error("Status Update Error:", error);
            setError('Failed to update status. Please refresh.');
            fetchApplicants(); 
        }
    };

    const StatusBadge = ({ status }) => {
        const baseClasses = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full";
        if (status === 'Accepted') return <span className={`${baseClasses} bg-green-100 text-green-800`}>Accepted</span>;
        if (status === 'Declined') return <span className={`${baseClasses} bg-red-100 text-red-800`}>Declined</span>;
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Pending</span>;
    };

    if (isLoading) return <div className="text-center mt-10"><p className="text-lg">Loading applicants...</p></div>;
    if (error) return <div className="text-center mt-10 p-4 bg-red-100 text-red-700 rounded-md">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Applicant Dashboard</h2>
            {applicants.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-lg shadow-md"><p className="text-gray-500">No applicants yet!</p></div>
            ) : (
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {applicants.map(app => (
                                    <tr key={app._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900">{app.name}</div><div className="text-sm text-gray-500">{app.email}</div><div className="text-sm text-gray-500">{app.mobile}</div></td>
                                        <td className="px-6 py-4"><div className="text-sm text-gray-900"><strong>Place:</strong> {app.place}</div><div className="text-sm text-gray-500"><strong>Blood:</strong> {app.bloodGroup || 'N/A'}</div><div className="text-sm text-gray-500 pt-1"><strong>Reason:</strong> <span title={app.reason}>{app.reason.substring(0, 30)}...</span></div></td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.role}</td>
                                        <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={app.status} /></td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                                            {app.status === 'Pending' ? (
                                                <div className="flex items-center justify-center space-x-2">
                                                    <button onClick={() => handleStatusChange(app._id, 'Accepted')} className="text-green-600 hover:text-green-900 bg-green-100 px-3 py-1 rounded-md transition">Accept</button>
                                                    <button onClick={() => handleStatusChange(app._id, 'Declined')} className="text-red-600 hover:text-red-900 bg-red-100 px-3 py-1 rounded-md transition">Decline</button>
                                                </div>
                                            ) : ( <span className="text-gray-500">-</span> )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminView;
