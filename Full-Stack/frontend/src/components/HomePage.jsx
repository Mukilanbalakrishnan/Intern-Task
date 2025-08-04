import React from 'react';

const HomePage = ({ setPage }) => (
  <div className="text-center p-10">
    <h1 className="text-5xl font-bold mb-4 text-gray-800">
      Ignite a Future, <span className="text-teal-500">Inspire a Generation</span>
    </h1>
    <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
      We are dedicated to illuminating the path for young minds in underserved communities through the transformative power of education.
    </p>
    <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
      Our mission is to bridge the opportunity gap, ensuring every child has the tools and support needed to build a brighter tomorrow.
    </p>
    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
      As an intern or volunteer, you can become a vital part of this journey, making a tangible difference in the lives of children and their communities.
    </p>
    <button
      onClick={() => setPage('register')}
      className="bg-teal-500 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-600 transition duration-300 shadow-lg transform hover:scale-105"
    >
      Join Our Mission
    </button>
  </div>
);

export default HomePage;
