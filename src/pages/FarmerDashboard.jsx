import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const FarmerDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [livestock, setLivestock] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - in real app, this would come from Firebase
  useEffect(() => {
    const mockLivestock = [
      {
        id: '1',
        name: 'Gauri',
        species: 'Cow',
        age: '3 years',
        photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        lastCheckup: '2024-01-15',
        healthStatus: 'Healthy'
      },
      {
        id: '2',
        name: 'Bhola',
        species: 'Goat',
        age: '2 years',
        photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        lastCheckup: '2024-02-01',
        healthStatus: 'Needs attention'
      }
    ];
    
    setTimeout(() => {
      setLivestock(mockLivestock);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddAnimal = () => {
    navigate('/animal/new');
  };

  const handleConsultChatbot = (animalId) => {
    navigate(`/consult/${animalId}`);
  };

  const handleBookVet = (animalId) => {
    navigate(`/book-vet/${animalId}`);
  };

  const handleViewAnimal = (animalId) => {
    navigate(`/animal/${animalId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your livestock...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {currentUser?.name}!
        </h1>
        <p className="mt-2 text-gray-600">
          Manage your livestock health and get professional veterinary care
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-xl">🐄</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Add New Animal</h3>
              <p className="text-sm text-gray-500">Register a new livestock</p>
            </div>
          </div>
          <button
            onClick={handleAddAnimal}
            className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            Add Animal
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">🤖</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">AI Chatbot</h3>
              <p className="text-sm text-gray-500">Get instant health advice</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/consult/quick')}
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Start Chat
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-xl">👨‍⚕️</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Find Vet</h3>
              <p className="text-sm text-gray-500">Book professional consultation</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/book-vet/search')}
            className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
          >
            Find Vet
          </button>
        </div>
      </div>

      {/* Livestock List */}
      <div className="bg-white rounded-lg shadow-md border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">My Livestock</h2>
          <p className="text-sm text-gray-600 mt-1">
            {livestock.length} animal{livestock.length !== 1 ? 's' : ''} registered
          </p>
        </div>
        
        <div className="p-6">
          {livestock.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-6xl mb-4">🐄</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No livestock registered yet</h3>
              <p className="text-gray-600 mb-4">Add your first animal to get started</p>
              <button
                onClick={handleAddAnimal}
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
              >
                Add Your First Animal
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {livestock.map((animal) => (
                <div key={animal.id} className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex items-center mb-4">
                    <img
                      src={animal.photo}
                      alt={animal.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{animal.name}</h3>
                      <p className="text-sm text-gray-600">{animal.species} • {animal.age}</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        animal.healthStatus === 'Healthy' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {animal.healthStatus}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <button
                      onClick={() => handleViewAnimal(animal.id)}
                      className="w-full bg-gray-600 text-white py-2 px-3 rounded-md text-sm hover:bg-gray-700 transition-colors"
                    >
                      View Details
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleConsultChatbot(animal.id)}
                        className="bg-blue-600 text-white py-2 px-3 rounded-md text-sm hover:bg-blue-700 transition-colors"
                      >
                        AI Chat
                      </button>
                      <button
                        onClick={() => handleBookVet(animal.id)}
                        className="bg-green-600 text-white py-2 px-3 rounded-md text-sm hover:bg-green-700 transition-colors"
                      >
                        Book Vet
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard; 