Veterinary consultant web app

A comprehensive web application that connects farmers with veterinarians for livestock health management and consultation services.

## 🚀 Features

### For Farmers
- **Livestock Management**: Add, edit, and manage livestock profiles with photos and medical records
- **AI Chatbot Consultation**: Get instant health advice through an intelligent symptom-based chatbot
- **Vet Booking System**: Search and book appointments with qualified veterinarians
- **Medical Records**: Track vaccination history, treatments, and health status
- **Dashboard**: Overview of all livestock with quick access to health services

### For Veterinarians
- **Professional Profile**: Manage qualifications, specializations, and appointment fees
- **Appointment Management**: View and manage upcoming consultations
- **Patient History**: Access complete medical records before consultations
- **Practice Analytics**: Track patients, ratings, and earnings
- **Schedule Management**: Set availability and manage bookings

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Context API
- **UI Components**: Custom components with Tailwind CSS
- **Authentication**: Mock authentication (ready for Firebase integration)

## 📋 Prerequisites

- Node.js (v18.x recommended)
- npm or yarn package manager

## 📱 Usage Guide

### Getting Started

1. **Registration**: Choose between "Farmer" or "Veterinarian" account type
2. **Login**: Use your credentials to access the platform
3. **Dashboard**: Access role-specific features and services

### For Farmers

#### Adding Livestock
1. Navigate to Dashboard → "Add Animal"
2. Fill in animal details (name, species, breed, age, etc.)
3. Upload a photo for identification
4. Add any special notes or health conditions

#### AI Consultation
1. Select an animal from your livestock list
2. Click "AI Chat" or "Quick Help"
3. Describe the symptoms you're observing
4. Receive instant health advice and recommendations
5. Option to book a vet appointment if needed

#### Booking Veterinarians
1. Click "Book Vet" from animal profile or dashboard
2. Filter vets by specialization, location, or fee
3. Select preferred date and time
4. Confirm booking

### For Veterinarians

#### Profile Management
1. Navigate to "Profile" from dashboard
2. Update professional information, qualifications, and fees
3. Upload profile photo and clinic details
4. Set availability and specializations

#### Managing Appointments
1. View upcoming appointments on dashboard
2. Access patient medical history before consultations
3. Update treatment records after consultations
4. Track practice statistics and earnings

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Navbar.jsx      # Navigation component
├── contexts/           # React Context providers
│   └── AuthContext.jsx # Authentication state management
├── pages/              # Application pages
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── FarmerDashboard.jsx
│   ├── VetDashboard.jsx
│   ├── AnimalProfile.jsx
│   ├── AddAnimalPage.jsx
│   ├── ConsultationPage.jsx
│   ├── VetBookingPage.jsx
│   └── VetProfilePage.jsx
├── App.jsx             # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles
```

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS v4 with the following configuration:
- Custom color scheme (green for farmers, blue for vets)
- Responsive design for mobile and desktop
- Custom components and utilities

### Routing
- `/login` - User authentication
- `/register` - Account registration
- `/farmer/dashboard` - Farmer dashboard
- `/vet/dashboard` - Veterinarian dashboard
- `/animal/:id` - Animal profile view/edit
- `/animal/new` - Add new animal
- `/consult/:animalId` - AI consultation
- `/book-vet/:animalId` - Vet booking
- `/vet/profile` - Vet profile management


## 🔮 Future Enhancements

### Planned Features
- **Firebase Integration**: Real-time database and authentication
- **Payment Gateway**: Online payment for consultations
- **Push Notifications**: Appointment reminders and health alerts
- **Mobile App**: React Native application
- **QR Code System**: Quick animal identification
- **Voice Input**: Nepali language support for chatbot
- **Advanced Analytics**: Health trends and predictive insights

### Technical Improvements
- **Real-time Chat**: Live messaging between farmers and vets
- **File Upload**: Cloud storage for photos and documents
- **Offline Support**: PWA capabilities for rural areas
- **Multi-language**: Support for Nepali and other local languages
- **Advanced AI**: Machine learning for better diagnosis

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: [Umesh Gautam]
- **Project**: Veterinary consultant web app
- **Version**: 1.0.0

