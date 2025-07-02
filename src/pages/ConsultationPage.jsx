import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ConsultationPage = () => {
  const { animalId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [consultationComplete, setConsultationComplete] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);

  // Mock animal data
  useEffect(() => {
    const mockAnimal = {
      id: animalId,
      name: animalId === 'quick' ? 'Your Animal' : 'Gauri',
      species: 'Cow',
      age: '3 years'
    };
    setAnimal(mockAnimal);
    
    // Initialize chat with welcome message
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: `Hello! I'm your AI veterinary assistant. I'm here to help you with ${animal?.name || 'your animal'}'s health concerns. Please describe the symptoms you're observing.`,
        timestamp: new Date()
      }
    ]);
  }, [animalId]);

  // Mock AI responses based on symptoms
  const getAIResponse = (symptoms) => {
    const lowerSymptoms = symptoms.toLowerCase();
    
    if (lowerSymptoms.includes('fever') && lowerSymptoms.includes('loss of appetite')) {
      return {
        possibleConditions: ['Bacterial infection', 'Viral infection', 'Parasitic infection'],
        severity: 'Medium',
        recommendations: [
          'Monitor temperature regularly',
          'Ensure adequate hydration',
          'Isolate from other animals if possible',
          'Contact a veterinarian if symptoms persist for more than 24 hours'
        ],
        urgency: 'Schedule vet appointment within 24-48 hours'
      };
    } else if (lowerSymptoms.includes('limping') || lowerSymptoms.includes('lameness')) {
      return {
        possibleConditions: ['Injury', 'Joint inflammation', 'Hoof problems'],
        severity: 'Low to Medium',
        recommendations: [
          'Rest the animal',
          'Check for visible injuries',
          'Keep the area clean and dry',
          'Avoid strenuous activity'
        ],
        urgency: 'Monitor for 24-48 hours, contact vet if no improvement'
      };
    } else if (lowerSymptoms.includes('diarrhea') || lowerSymptoms.includes('loose stool')) {
      return {
        possibleConditions: ['Gastrointestinal infection', 'Dietary changes', 'Parasites'],
        severity: 'Medium',
        recommendations: [
          'Ensure clean drinking water',
          'Monitor for dehydration',
          'Consider dietary adjustments',
          'Keep the animal in a clean environment'
        ],
        urgency: 'Contact vet if diarrhea persists for more than 24 hours'
      };
    } else if (lowerSymptoms.includes('coughing') || lowerSymptoms.includes('breathing difficulty')) {
      return {
        possibleConditions: ['Respiratory infection', 'Allergies', 'Pneumonia'],
        severity: 'High',
        recommendations: [
          'Ensure good ventilation',
          'Keep the animal in a dust-free environment',
          'Monitor breathing rate',
          'Contact veterinarian immediately'
        ],
        urgency: 'Contact vet immediately - respiratory issues can be serious'
      };
    } else {
      return {
        possibleConditions: ['General health concern', 'Stress-related issues'],
        severity: 'Low',
        recommendations: [
          'Monitor the animal closely',
          'Ensure proper nutrition and hydration',
          'Maintain clean living conditions',
          'Contact a veterinarian for proper diagnosis'
        ],
        urgency: 'Schedule vet appointment for proper evaluation'
      };
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse = getAIResponse(inputMessage);
      
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: `Based on the symptoms you described, here's my assessment:

**Possible Conditions:**
${aiResponse.possibleConditions.map(condition => `• ${condition}`).join('\n')}

**Severity Level:** ${aiResponse.severity}

**Recommendations:**
${aiResponse.recommendations.map(rec => `• ${rec}`).join('\n')}

**Urgency:** ${aiResponse.urgency}

Would you like me to help you book an appointment with a veterinarian?`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      setDiagnosis(aiResponse);
      setConsultationComplete(true);
    }, 2000);
  };

  const handleBookVet = () => {
    navigate(`/book-vet/${animalId}`);
  };

  const handleNewConsultation = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: `Hello! I'm your AI veterinary assistant. I'm here to help you with ${animal?.name || 'your animal'}'s health concerns. Please describe the symptoms you're observing.`,
        timestamp: new Date()
      }
    ]);
    setConsultationComplete(false);
    setDiagnosis(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">AI Veterinary Consultation</h1>
        <p className="text-gray-600">
          Get instant health advice for {animal?.name} ({animal?.species}, {animal?.age})
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md border h-96 flex flex-col">
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
              <p className="text-sm text-gray-600">Ask about your animal's health</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="whitespace-pre-line">{message.content}</div>
                    <div className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Describe the symptoms you're observing..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {consultationComplete && (
            <div className="mt-6 flex space-x-4">
              <button
                onClick={handleBookVet}
                className="bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors"
              >
                Book Vet Appointment
              </button>
              <button
                onClick={handleNewConsultation}
                className="bg-gray-600 text-white py-3 px-6 rounded-md hover:bg-gray-700 transition-colors"
              >
                New Consultation
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
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

          {/* Quick Symptoms */}
          <div className="bg-white rounded-lg shadow-md border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Symptoms</h3>
            <div className="space-y-2">
              {[
                'Fever and loss of appetite',
                'Limping or lameness',
                'Diarrhea or loose stool',
                'Coughing or breathing difficulty',
                'Skin problems or itching',
                'Reduced milk production',
                'Behavioral changes'
              ].map((symptom, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(symptom)}
                  className="block w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2 py-1 rounded"
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>

          {/* Diagnosis Summary */}
          {diagnosis && (
            <div className="bg-white rounded-lg shadow-md border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Assessment Summary</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Severity</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    diagnosis.severity === 'High' ? 'bg-red-100 text-red-800' :
                    diagnosis.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {diagnosis.severity}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Urgency</label>
                  <p className="text-sm text-gray-900">{diagnosis.urgency}</p>
                </div>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">Important Disclaimer</h4>
            <p className="text-xs text-yellow-700">
              This AI consultation is for informational purposes only and should not replace professional veterinary care. 
              Always consult with a qualified veterinarian for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationPage; 