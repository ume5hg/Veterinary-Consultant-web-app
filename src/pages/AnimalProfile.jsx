import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AnimalProfile = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  // Mock data - in real app, this would come from Firebase
  useEffect(() => {
    const mockAnimal = {
      id: id,
      name: 'Gauri',
      species: 'Cow',
      breed: 'Jersey',
      age: '3 years',
      weight: '450 kg',
      dob: '2021-05-10',
      photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      owner: currentUser?.name || 'John Farmer',
      healthStatus: 'Healthy',
      vaccinations: [
        {
          id: '1',
          type: 'Anthrax',
          date: '2023-06-15',
          nextDue: '2024-06-15',
          status: 'Completed'
        },
        {
          id: '2',
          type: 'Foot and Mouth Disease',
          date: '2023-08-20',
          nextDue: '2024-08-20',
          status: 'Completed'
        }
      ],
      medicalHistory: [
        {
          id: '1',
          date: '2024-01-15',
          symptoms: 'Fever, loss of appetite',
          diagnosis: 'Bacterial infection',
          treatment: 'Antibiotics prescribed',
          vet: 'Dr. Smith',
          status: 'Recovered'
        },
        {
          id: '2',
          date: '2023-11-10',
          symptoms: 'Limping in right leg',
          diagnosis: 'Minor injury',
          treatment: 'Rest and anti-inflammatory',
          vet: 'Dr. Johnson',
          status: 'Recovered'
        }
      ],
      notes: 'Gauri is a healthy cow with good milk production. Regular checkups recommended.'
    };
    
    setTimeout(() => {
      setAnimal(mockAnimal);
      setEditForm(mockAnimal);
      setLoading(false);
    }, 1000);
  }, [id, currentUser]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setAnimal(editForm);
    setIsEditing(false);
    // In real app, save to Firebase
  };

  const handleCancel = () => {
    setEditForm(animal);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConsultChatbot = () => {
    navigate(`/consult/${id}`);
  };

  const handleBookVet = () => {
    navigate(`/book-vet/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading animal profile...</p>
        </div>
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Animal not found</h2>
          <button
            onClick={() => navigate('/farmer/dashboard')}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{animal.name}</h1>
          <p className="text-gray-600">{animal.species} • {animal.breed}</p>
        </div>
        <div className="flex space-x-3">
          {currentUser?.userType === 'farmer' && (
            <>
              <button
                onClick={handleConsultChatbot}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                AI Consultation
              </button>
              <button
                onClick={handleBookVet}
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
              >
                Book Vet
              </button>
            </>
          )}
          {currentUser?.userType === 'farmer' && (
            <button
              onClick={isEditing ? handleSave : handleEdit}
              className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
          )}
          {isEditing && (
            <button
              onClick={handleCancel}
              className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Animal Details */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md border p-6">
            <div className="text-center mb-6">
              <img
                src={animal.photo}
                alt={animal.name}
                className="w-48 h-48 rounded-lg object-cover mx-auto mb-4"
              />
              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                animal.healthStatus === 'Healthy' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {animal.healthStatus}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{animal.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Species</label>
                {isEditing ? (
                  <select
                    name="species"
                    value={editForm.species}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="Cow">Cow</option>
                    <option value="Goat">Goat</option>
                    <option value="Buffalo">Buffalo</option>
                    <option value="Sheep">Sheep</option>
                    <option value="Pig">Pig</option>
                    <option value="Poultry">Poultry</option>
                  </select>
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{animal.species}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Breed</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="breed"
                    value={editForm.breed}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{animal.breed}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="age"
                    value={editForm.age}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{animal.age}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Weight</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="weight"
                    value={editForm.weight}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{animal.weight}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    name="dob"
                    value={editForm.dob}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{animal.dob}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Owner</label>
                <p className="mt-1 text-sm text-gray-900">{animal.owner}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Medical History and Vaccinations */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vaccinations */}
          <div className="bg-white rounded-lg shadow-md border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Vaccinations</h2>
            </div>
            <div className="p-6">
              {animal.vaccinations.length === 0 ? (
                <p className="text-gray-500">No vaccination records available.</p>
              ) : (
                <div className="space-y-4">
                  {animal.vaccinations.map((vaccination) => (
                    <div key={vaccination.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{vaccination.type}</h3>
                          <p className="text-sm text-gray-600">
                            Given: {vaccination.date} • Next due: {vaccination.nextDue}
                          </p>
                        </div>
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {vaccination.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Medical History */}
          <div className="bg-white rounded-lg shadow-md border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Medical History</h2>
            </div>
            <div className="p-6">
              {animal.medicalHistory.length === 0 ? (
                <p className="text-gray-500">No medical history available.</p>
              ) : (
                <div className="space-y-4">
                  {animal.medicalHistory.map((record) => (
                    <div key={record.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900">{record.date}</h3>
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {record.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><strong>Symptoms:</strong> {record.symptoms}</p>
                        <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                        <p><strong>Treatment:</strong> {record.treatment}</p>
                        <p><strong>Vet:</strong> {record.vet}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-lg shadow-md border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Notes</h2>
            </div>
            <div className="p-6">
              {isEditing ? (
                <textarea
                  name="notes"
                  value={editForm.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              ) : (
                <p className="text-gray-700">{animal.notes}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalProfile; 