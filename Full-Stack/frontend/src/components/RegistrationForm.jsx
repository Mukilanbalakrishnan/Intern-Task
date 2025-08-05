import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', mobile: '', place: '', bloodGroup: '', role: 'Intern', reason: ''
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, type: '', text: '' });

  // This directly gets the backend URL from the environment variables.
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setModal({ isOpen: false, type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile || !formData.place || !formData.reason) {
        setModal({ isOpen: true, type: 'error', text: 'Please fill out all required fields.' });
        return;
    }
    if (!termsAccepted) {
        setModal({ isOpen: true, type: 'error', text: 'You must accept the terms and conditions.' });
        return;
    }
    setIsSubmitting(true);

    try {
        // This now uses the full backend URL for the POST request.
        const response = await fetch(`${API_URL}/api/applicants`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg || 'An unknown server error occurred.');
        }

        await response.json();
        setModal({ isOpen: true, type: 'success', text: 'Registration successful! Thank you for applying.' });
        setFormData({ name: '', email: '', mobile: '', place: '', bloodGroup: '', role: 'Intern', reason: '' });
        setTermsAccepted(false);

    } catch (error) {
        setModal({ isOpen: true, type: 'error', text: error.message });
        console.error("Submission Error:", error);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <>
      {modal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full text-center">
            <h3 className={`text-2xl font-bold mb-4 ${modal.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{modal.type === 'success' ? 'Success!' : 'Attention'}</h3>
            <p className="text-gray-700 mb-6">{modal.text}</p>
            <button onClick={closeModal} className="bg-teal-500 text-white font-bold py-2 px-8 rounded-md hover:bg-teal-600 transition duration-300">Close</button>
          </div>
        </div>
      )}
      <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Join Our Team</h2>
        <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-2"><label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label><input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500" required /></div>
              <div className="mb-2"><label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label><input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500" required /></div>
              <div className="mb-2"><label htmlFor="mobile" className="block text-gray-700 text-sm font-bold mb-2">Mobile Number</label><input type="tel" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500" required /></div>
              <div className="mb-2"><label htmlFor="place" className="block text-gray-700 text-sm font-bold mb-2">Place</label><input type="text" id="place" name="place" value={formData.place} onChange={handleChange} className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500" required /></div>
              <div className="mb-2"><label htmlFor="bloodGroup" className="block text-gray-700 text-sm font-bold mb-2">Blood Group</label><select id="bloodGroup" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"><option value="">Select...</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option><option>O+</option><option>O-</option></select></div>
              <div className="mb-2"><label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">Applying As</label><select id="role" name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"><option>Intern</option><option>Volunteer</option></select></div>
          </div>
          <div className="mb-6 mt-6"><label htmlFor="reason" className="block text-gray-700 text-sm font-bold mb-2">Why do you want to join?</label><textarea id="reason" name="reason" rows="4" value={formData.reason} onChange={handleChange} className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500" required></textarea></div>
          <div className="mb-6"><label className="flex items-center"><input type="checkbox" checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} className="form-checkbox h-5 w-5 text-teal-600" /><span className="ml-2 text-gray-700 text-sm">I accept the terms and conditions.</span></label></div>
          <div className="text-center"><button type="submit" disabled={isSubmitting} className="w-full bg-teal-500 text-white font-bold py-3 px-6 rounded-md hover:bg-teal-600 transition duration-300 disabled:bg-gray-400">{isSubmitting ? 'Submitting...' : 'Submit Application'}</button></div>
        </form>
      </div>
    </>
  );
};

export default RegistrationForm;
