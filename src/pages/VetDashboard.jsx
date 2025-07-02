import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const VetDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [recentConsultations, setRecentConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - in real app, this would come from Firebase
  useEffect(() => {
    const mockAppointments = [
      {
        id: '1',
        farmerName: 'Ram Bahadur',
        animalName: 'Gauri',
        animalSpecies: 'Cow',
        date: '2024-03-15',
        time: '10:00 AM',
        status: 'upcoming',
        symptoms: 'Fever and loss of appetite'
      },
      {
        id: '2',
        farmerName: 'Sita Devi',
        animalName: 'Bhola',
        animalSpecies: 'Goat',
        date: '2024-03-16',
        time: '2:00 PM',
        status: 'upcoming',
        symptoms: 'Limping in right leg'
      }
    ];

    const mockConsultations = [
      {
        id: '1',
        farmerName: 'Hari Prasad',
        animalName: 'Lakshmi',
        animalSpecies: 'Cow',
        date: '2024-03-10',
        diagnosis: 'Mastitis',
        treatment: 'Antibiotics prescribed',
        status: 'completed'
      },
      {
        id: '2',
        farmerName: 'Gita Kumari',
        animalName: 'Raja',
        animalSpecies: 'Buffalo',
        date: '2024-03-08',
        diagnosis: 'Foot and Mouth Disease',
        treatment: 'Vaccination and isolation',
        status: 'completed'
      }
    ];
    
    setTimeout(() => {
      setAppointments(mockAppointments);
      setRecentConsultations(mockConsultations);
      setLoading(false);
    }, 1000);
  }, []);

  const handleViewAppointment = (appointmentId) => {
    navigate(`/appointment/${appointmentId}`);
  };

  const handleUpdateProfile = () => {
    navigate('/vet/profile');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, Dr. {currentUser?.name}!
        </h1>
        <p className="mt-2 text-gray-600">
          Manage your appointments and provide veterinary care
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">📅</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                {appointments.filter(a => a.status === 'upcoming').length}
              </h3>
              <p className="text-sm text-gray-500">Upcoming Appointments</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-xl">✅</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                {recentConsultations.length}
              </h3>
              <p className="text-sm text-gray-500">Recent Consultations</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-xl">💰</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">₹{currentUser?.appointmentFee || 500}</h3>
              <p className="text-sm text-gray-500">Appointment Fee</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600 text-xl">⭐</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">4.8</h3>
              <p className="text-sm text-gray-500">Average Rating</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow-md border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
            <p className="text-sm text-gray-600 mt-1">
              {appointments.filter(a => a.status === 'upcoming').length} appointment{appointments.filter(a => a.status === 'upcoming').length !== 1 ? 's' : ''} today
            </p>
          </div>
          
          <div className="p-6">
            {appointments.filter(a => a.status === 'upcoming').length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 text-4xl mb-4">📅</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming appointments</h3>
                <p className="text-gray-600">You're all caught up!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.filter(a => a.status === 'upcoming').map((appointment) => (
                  <div key={appointment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {appointment.animalName} ({appointment.animalSpecies})
                        </h3>
                        <p className="text-sm text-gray-600">
                          Owner: {appointment.farmerName}
                        </p>
                      </div>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {appointment.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      <strong>Symptoms:</strong> {appointment.symptoms}
                    </p>
                    <button
                      onClick={() => handleViewAppointment(appointment.id)}
                      className="w-full bg-blue-600 text-white py-2 px-3 rounded-md text-sm hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Consultations */}
        <div className="bg-white rounded-lg shadow-md border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Consultations</h2>
            <p className="text-sm text-gray-600 mt-1">
              Your latest veterinary services
            </p>
          </div>
          
          <div className="p-6">
            {recentConsultations.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 text-4xl mb-4">👨‍⚕️</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No recent consultations</h3>
                <p className="text-gray-600">Start helping farmers with their livestock</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentConsultations.slice(0, 3).map((consultation) => (
                  <div key={consultation.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {consultation.animalName} ({consultation.animalSpecies})
                        </h3>
                        <p className="text-sm text-gray-600">
                          Owner: {consultation.farmerName}
                        </p>
                      </div>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Diagnosis:</strong> {consultation.diagnosis}</p>
                      <p><strong>Treatment:</strong> {consultation.treatment}</p>
                      <p><strong>Date:</strong> {consultation.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg shadow-md border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handleUpdateProfile}
            className="bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Update Profile
          </button>
          <button
            onClick={() => navigate('/vet/schedule')}
            className="bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            Manage Schedule
          </button>
          <button
            onClick={() => navigate('/vet/earnings')}
            className="bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 transition-colors"
          >
            View Earnings
          </button>
        </div>
      </div>
    </div>
  );
};

export default VetDashboard; 