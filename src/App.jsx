import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FarmerDashboard from './pages/FarmerDashboard';
import VetDashboard from './pages/VetDashboard';
import AnimalProfile from './pages/AnimalProfile';
import ConsultationPage from './pages/ConsultationPage';
import VetBookingPage from './pages/VetBookingPage';
import VetProfilePage from './pages/VetProfilePage';
import AddAnimalPage from './pages/AddAnimalPage';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
            <Route path="/vet/dashboard" element={<VetDashboard />} />
            <Route path="/animal/:id" element={<AnimalProfile />} />
            <Route path="/animal/new" element={<AddAnimalPage />} />
            <Route path="/consult/:animalId" element={<ConsultationPage />} />
            <Route path="/book-vet/:animalId" element={<VetBookingPage />} />
            <Route path="/vet/profile" element={<VetProfilePage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
