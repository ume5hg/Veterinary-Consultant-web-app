import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const VetBookingPage = () => {
  const { animalId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(null);
  const [vets, setVets] = useState([]);
  const [filteredVets, setFilteredVets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVet, setSelectedVet] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [filters, setFilters] = useState({
    specialization: '',
    maxFee: '',
    location: ''
  });

  // Mock data - in real app, this would come from Firebase
  useEffect(() => {
    const mockAnimal = {
      id: animalId,
      name: animalId === 'search' ? 'Your Animal' : 'Gauri',
      species: 'Cow',
      age: '3 years'
    };

    const mockVets = [
      {
        id: '1',
        name: 'Dr. Ram Bahadur Thapa',
        qualification: 'BVSc, MVSc',
        specialization: 'Ruminants',
        experience: '15 years',
        rating: 4.8,
        appointmentFee: 800,
        location: 'Kathmandu',
        clinicAddress: 'Thamel, Kathmandu',
        photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
        availableSlots: ['09:00 AM', '10:00 AM', '02:00 PM', '03:00 PM']
      },
      {
        id: '2',
        name: 'Dr. Sita Devi Sharma',
        qualification: 'BVSc',
        specialization: 'General Practice',
        experience: '8 years',
        rating: 4.6,
        appointmentFee: 600,
        location: 'Lalitpur',
        clinicAddress: 'Patan, Lalitpur',
        photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
        availableSlots: ['11:00 AM', '12:00 PM', '04:00 PM', '05:00 PM']
      },
      {
        id: '3',
        name: 'Dr. Hari Prasad Karki',
        qualification: 'BVSc, MVSc, PhD',
        specialization: 'Poultry',
        experience: '20 years',
        rating: 4.9,
        appointmentFee: 1000,
        location: 'Bhaktapur',
        clinicAddress: 'Bhaktapur Durbar Square',
        photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
        availableSlots: ['08:00 AM', '09:00 AM', '01:00 PM', '02:00 PM']
      },
      {
        id: '4',
        name: 'Dr. Gita Kumari Tamang',
        qualification: 'BVSc',
        specialization: 'Ruminants',
        experience: '12 years',
        rating: 4.7,
        appointmentFee: 700,
        location: 'Kathmandu',
        clinicAddress: 'Baneshwor, Kathmandu',
        photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
        availableSlots: ['10:00 AM', '11:00 AM', '03:00 PM', '04:00 PM']
      }
    ];
    
    setTimeout(() => {
      setAnimal(mockAnimal);
      setVets(mockVets);
      setFilteredVets(mockVets);
      setLoading(false);
    }, 1000);
  }, [animalId]);

  // Filter vets based on criteria
  useEffect(() => {
    let filtered = vets;

    if (filters.specialization) {
      filtered = filtered.filter(vet => 
        vet.specialization.toLowerCase().includes(filters.specialization.toLowerCase())
      );
    }

    if (filters.maxFee) {
      filtered = filtered.filter(vet => vet.appointmentFee <= parseInt(filters.maxFee));
    }

    if (filters.location) {
      filtered = filtered.filter(vet => 
        vet.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setFilteredVets(filtered);
  }, [filters, vets]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVetSelect = (vet) => {
    setSelectedVet(vet);
    setSelectedDate('');
    setSelectedTime('');
  };

  const handleBooking = () => {
    if (!selectedVet || !selectedDate || !selectedTime) {
      alert('Please select a vet, date, and time');
      return;
    }

    // In real app, save booking to Firebase
    const booking = {
      id: Date.now().toString(),
      vetId: selectedVet.id,
      vetName: selectedVet.name,
      animalId: animal.id,
      animalName: animal.name,
      farmerId: currentUser.id,
      farmerName: currentUser.name,
      date: selectedDate,
      time: selectedTime,
      fee: selectedVet.appointmentFee,
      status: 'confirmed'
    };

    console.log('Booking created:', booking);
    alert('Appointment booked successfully!');
    navigate('/farmer/dashboard');
  };

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading veterinarians...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Book Veterinary Appointment</h1>
        <p className="text-gray-600">
          Find and book an appointment with a qualified veterinarian for {animal?.name}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Vet List */}
        <div className="lg:col-span-2">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md border p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Search Filters</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specialization
                </label>
                <select
                  name="specialization"
                  value={filters.specialization}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">All Specializations</option>
                  <option value="Ruminants">Ruminants</option>
                  <option value="Poultry">Poultry</option>
                  <option value="General Practice">General Practice</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Fee (NPR)
                </label>
                <input
                  type="number"
                  name="maxFee"
                  value={filters.maxFee}
                  onChange={handleFilterChange}
                  placeholder="Enter max fee"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  placeholder="Enter location"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>

          {/* Vet Cards */}
          <div className="space-y-4">
            {filteredVets.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 text-4xl mb-4">👨‍⚕️</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No veterinarians found</h3>
                <p className="text-gray-600">Try adjusting your search filters</p>
              </div>
            ) : (
              filteredVets.map((vet) => (
                <div
                  key={vet.id}
                  className={`bg-white rounded-lg shadow-md border p-6 cursor-pointer transition-all ${
                    selectedVet?.id === vet.id ? 'ring-2 ring-green-500 bg-green-50' : 'hover:shadow-lg'
                  }`}
                  onClick={() => handleVetSelect(vet)}
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={vet.photo}
                      alt={vet.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{vet.name}</h3>
                          <p className="text-sm text-gray-600">{vet.qualification}</p>
                          <p className="text-sm text-gray-600">{vet.specialization} • {vet.experience} experience</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-sm font-medium">{vet.rating}</span>
                          </div>
                          <p className="text-lg font-semibold text-green-600">₹{vet.appointmentFee}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm text-gray-600">
                          <strong>Location:</strong> {vet.clinicAddress}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Available Slots:</strong> {vet.availableSlots.join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="space-y-6">
          {/* Animal Info */}
          <div className="bg-white rounded-lg shadow-md border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Animal Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="text-sm text-gray-900">{animal?.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Species</label>
                <p className="text-sm text-gray-900">{animal?.species}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <p className="text-sm text-gray-900">{animal?.age}</p>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          {selectedVet && (
            <div className="bg-white rounded-lg shadow-md border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Book Appointment</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selected Veterinarian
                </label>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="font-medium text-gray-900">{selectedVet.name}</p>
                  <p className="text-sm text-gray-600">{selectedVet.specialization}</p>
                  <p className="text-sm text-gray-600">₹{selectedVet.appointmentFee}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Date
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Choose a date</option>
                    {getAvailableDates().map((date) => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Time
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Choose a time</option>
                    {selectedVet.availableSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleBooking}
                    disabled={!selectedDate || !selectedTime}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Book Appointment (₹{selectedVet.appointmentFee})
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Booking Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Booking Instructions</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Select a veterinarian from the list</li>
              <li>• Choose your preferred date and time</li>
              <li>• Payment will be collected at the clinic</li>
              <li>• You'll receive a confirmation email</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VetBookingPage; 