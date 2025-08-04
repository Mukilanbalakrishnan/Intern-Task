import React from 'react';

const Header = ({ setPage, onAdminClick }) => (
  <header className="bg-gray-800 text-white shadow-md">
    <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <span className="text-teal-400">Dev</span>Portal
      </div>
      <ul className="flex space-x-6">
        <li><button onClick={() => setPage('home')} className="hover:text-teal-300 transition duration-300">Home</button></li>
        <li><button onClick={() => setPage('register')} className="hover:text-teal-300 transition duration-300">Register</button></li>
        <li><button onClick={onAdminClick} className="hover:text-teal-300 transition duration-300">Admin</button></li>
      </ul>
    </nav>
  </header>
);

export default Header;
