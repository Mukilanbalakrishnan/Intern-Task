import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import RegistrationForm from './components/RegistrationForm';
import AdminView from './components/AdminView';

export const API_URL = 'https://intern-task-backend.onrender.com';
// export const API_URL = 'http://localhost:5173';

function App() {
  const [page, setPage] = useState('home');
  const [showAdminConfirm, setShowAdminConfirm] = useState(false);

  const renderPage = () => {
    switch (page) {
      case 'register':
        return <RegistrationForm />;
      case 'admin':
        return <AdminView />;
      case 'home':
      default:
        return <HomePage setPage={setPage} />;
    }
  };


  const handleAdminConfirm = () => {
    setPage('admin');
    setShowAdminConfirm(false);
  };


  const handleAdminCancel = () => {
    setShowAdminConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header setPage={setPage} onAdminClick={() => setShowAdminConfirm(true)} />

      {showAdminConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Admin Access
            </h3>
            <p className="text-gray-700 mb-6">Are you an admin?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleAdminConfirm}
                className="bg-teal-500 text-white font-bold py-2 px-8 rounded-md hover:bg-teal-600 transition duration-300"
              >
                Yes
              </button>
              <button
                onClick={handleAdminCancel}
                className="bg-gray-300 text-gray-800 font-bold py-2 px-8 rounded-md hover:bg-gray-400 transition duration-300"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <main>
        {renderPage()}
      </main>
      <footer className="text-center py-4 mt-10 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} DevPortal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
