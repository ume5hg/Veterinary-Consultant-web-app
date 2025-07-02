import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const VetProfilePage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: currentUser?.name || 'Dr. Smith',
    email: currentUser?.email || 'dr.smith@example.com',
    phone: currentUser?.phone || '+977-1234567890',
    qualification: 'BVSc, MVSc',
    licenseNumber: 'VET-2024-001',
    specialization: 'Ruminants',
    experience: '10 years',
    appointmentFee: 800,
    clinicAddress: 'Thamel, Kathmandu, Nepal',
    bio: 'Experienced veterinarian specializing in ruminant health with over 10 years of practice.',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400'
  });
  const [editForm, setEditForm] = useState(profile);

  useEffect(() => {
    setEditForm(profile);
  }, [profile]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
    // In real app, save to Firebase
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In real app, upload to Firebase Storage
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditForm(prev => ({
          ...prev,
          photo: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Veterinarian Profile</h1>
          <p className="text-gray-600">Manage your professional information and settings</p>
        </div>
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Photo and Basic Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md border p-6">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <img
                  src={editForm.photo}
                  alt={editForm.name}
                  className="w-48 h-48 rounded-lg object-cover mx-auto mb-4"
                />
                {isEditing && (
                  <label className="absolute bottom-4 right-4 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    📷
                  </label>
                )}
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{editForm.name}</h2>
              <p className="text-gray-600">{editForm.qualification}</p>
              <div className="flex items-center justify-center mt-2">
                <span className="text-yellow-400">⭐</span>
                <span className="ml-1 text-sm font-medium">4.8</span>
                <span className="ml-1 text-sm text-gray-600">(150 reviews)</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{editForm.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editForm.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{editForm.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Experience</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="experience"
                    value={editForm.experience}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{editForm.experience}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Professional Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Professional Information */}
          <div className="bg-white rounded-lg shadow-md border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Qualification</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="qualification"
                    value={editForm.qualification}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{editForm.qualification}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">License Number</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="licenseNumber"
                    value={editForm.licenseNumber}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{editForm.licenseNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Specialization</label>
                {isEditing ? (
                  <select
                    name="specialization"
                    value={editForm.specialization}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Ruminants">Ruminants (Cattle, Goats, Sheep)</option>
                    <option value="Poultry">Poultry</option>
                    <option value="Swine">Swine</option>
                    <option value="Equine">Equine</option>
                    <option value="General Practice">General Practice</option>
                  </select>
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{editForm.specialization}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Appointment Fee (NPR)</label>
                {isEditing ? (
                  <input
                    type="number"
                    name="appointmentFee"
                    value={editForm.appointmentFee}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">₹{editForm.appointmentFee}</p>
                )}
              </div>
            </div>
          </div>

          {/* Clinic Information */}
          <div className="bg-white rounded-lg shadow-md border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Clinic Information</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Clinic Address</label>
              {isEditing ? (
                <textarea
                  name="clinicAddress"
                  value={editForm.clinicAddress}
                  onChange={handleInputChange}
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">{editForm.clinicAddress}</p>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white rounded-lg shadow-md border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Bio</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">About Me</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={editForm.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell farmers about your experience and expertise..."
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">{editForm.bio}</p>
              )}
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-white rounded-lg shadow-md border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Practice Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">150</div>
                <div className="text-sm text-gray-600">Total Patients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">4.8</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">₹{editForm.appointmentFee}</div>
                <div className="text-sm text-gray-600">Consultation Fee</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">10</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => navigate('/vet/schedule')}
                className="bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Manage Schedule
              </button>
              <button
                onClick={() => navigate('/vet/appointments')}
                className="bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors"
              >
                View Appointments
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
      </div>
    </div>
  );
};

export default VetProfilePage; 