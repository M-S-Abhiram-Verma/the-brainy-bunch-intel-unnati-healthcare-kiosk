
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

interface BodyPart {
  id: string;
  name: string;
  symptoms: string[];
  x: number;
  y: number;
}

interface BodySymptomSelectorProps {
  onSymptomSelect: (symptom: string, bodyPart: string) => void;
  onBack: () => void;
  voiceEnabled: boolean;
  onVoiceToggle: () => void;
}

const BodySymptomSelector: React.FC<BodySymptomSelectorProps> = ({
  onSymptomSelect,
  onBack,
  voiceEnabled,
  onVoiceToggle
}) => {
  const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPart | null>(null);

  const bodyParts: BodyPart[] = [
    { id: 'head', name: 'Head', symptoms: ['headache', 'dizziness', 'migraine'], x: 50, y: 12 },
    { id: 'neck', name: 'Neck', symptoms: ['neck-pain', 'stiff-neck'], x: 50, y: 22 },
    { id: 'chest', name: 'Chest', symptoms: ['chest-pain', 'breathing-issues', 'heart-palpitations'], x: 50, y: 35 },
    { id: 'abdomen', name: 'Abdomen', symptoms: ['stomach-pain', 'nausea', 'bloating'], x: 50, y: 48 },
    { id: 'leftArm', name: 'Left Arm', symptoms: ['arm-pain', 'numbness', 'weakness'], x: 25, y: 35 },
    { id: 'rightArm', name: 'Right Arm', symptoms: ['arm-pain', 'numbness', 'weakness'], x: 75, y: 35 },
    { id: 'leftLeg', name: 'Left Leg', symptoms: ['leg-pain', 'swelling', 'cramps'], x: 40, y: 75 },
    { id: 'rightLeg', name: 'Right Leg', symptoms: ['leg-pain', 'swelling', 'cramps'], x: 60, y: 75 },
    { id: 'back', name: 'Back', symptoms: ['back-pain', 'lower-back-pain', 'muscle-strain'], x: 50, y: 45 },
    { id: 'general', name: 'General Health', symptoms: ['general-checkup', 'routine-checkup', 'health-screening'], x: 50, y: 60 }
  ];

  const handleBodyPartClick = (bodyPart: BodyPart) => {
    setSelectedBodyPart(bodyPart);
  };

  const handleSymptomClick = (symptom: string) => {
    if (selectedBodyPart) {
      console.log('Body symptom clicked:', symptom, 'from', selectedBodyPart.name);
      // Convert display names to match the symptom IDs used in the main app
      const symptomMap: { [key: string]: string } = {
        'headache': 'headache',
        'dizziness': 'headache',
        'migraine': 'headache',
        'neck-pain': 'headache',
        'stiff-neck': 'headache',
        'chest-pain': 'chest-pain',
        'breathing-issues': 'chest-pain',
        'heart-palpitations': 'chest-pain',
        'stomach-pain': 'fever',
        'nausea': 'fever',
        'bloating': 'fever',
        'arm-pain': 'back-pain',
        'numbness': 'back-pain',
        'weakness': 'back-pain',
        'leg-pain': 'back-pain',
        'swelling': 'back-pain',
        'cramps': 'back-pain',
        'back-pain': 'back-pain',
        'lower-back-pain': 'back-pain',
        'muscle-strain': 'back-pain',
        'general-checkup': 'general-checkup',
        'routine-checkup': 'general-checkup',
        'health-screening': 'general-checkup'
      };
      
      const mappedSymptom = symptomMap[symptom] || symptom;
      onSymptomSelect(mappedSymptom, selectedBodyPart.name);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-4">🧍 Click on the body part that hurts</h3>
        <p className="text-gray-600">Select the area where you're experiencing symptoms</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* 3D-like Body Diagram */}
        <div className="flex-1">
          <div className="relative bg-gradient-to-b from-blue-100 to-blue-200 rounded-2xl p-8 border-2 border-blue-300">
            <div className="relative mx-auto" style={{ width: '280px', height: '400px' }}>
              {/* Body Outline */}
              <div className="absolute inset-0">
                <svg width="280" height="400" viewBox="0 0 280 400" className="w-full h-full">
                  {/* Body shape with 3D effect */}
                  <defs>
                    <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#e0f2fe" />
                      <stop offset="50%" stopColor="#bae6fd" />
                      <stop offset="100%" stopColor="#7dd3fc" />
                    </linearGradient>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="3" dy="3" stdDeviation="2" floodColor="#0369a1" floodOpacity="0.3"/>
                    </filter>
                  </defs>
                  
                  {/* Head */}
                  <ellipse cx="140" cy="50" rx="35" ry="40" fill="url(#bodyGradient)" filter="url(#shadow)" stroke="#0369a1" strokeWidth="2" />
                  
                  {/* Neck */}
                  <rect x="130" y="85" width="20" height="25" fill="url(#bodyGradient)" filter="url(#shadow)" stroke="#0369a1" strokeWidth="2" />
                  
                  {/* Torso */}
                  <ellipse cx="140" cy="180" rx="55" ry="85" fill="url(#bodyGradient)" filter="url(#shadow)" stroke="#0369a1" strokeWidth="2" />
                  
                  {/* Arms */}
                  <ellipse cx="85" cy="140" rx="20" ry="60" fill="url(#bodyGradient)" filter="url(#shadow)" stroke="#0369a1" strokeWidth="2" />
                  <ellipse cx="195" cy="140" rx="20" ry="60" fill="url(#bodyGradient)" filter="url(#shadow)" stroke="#0369a1" strokeWidth="2" />
                  
                  {/* Legs */}
                  <ellipse cx="115" cy="320" rx="25" ry="75" fill="url(#bodyGradient)" filter="url(#shadow)" stroke="#0369a1" strokeWidth="2" />
                  <ellipse cx="165" cy="320" rx="25" ry="75" fill="url(#bodyGradient)" filter="url(#shadow)" stroke="#0369a1" strokeWidth="2" />
                </svg>
              </div>

              {/* Interactive Body Parts */}
              {bodyParts.map((part) => (
                <button
                  key={part.id}
                  onClick={() => handleBodyPartClick(part)}
                  className={`absolute w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-125 ${
                    selectedBodyPart?.id === part.id
                      ? 'bg-red-500 border-red-700 shadow-lg animate-pulse'
                      : part.id === 'general' 
                        ? 'bg-green-400 border-green-600 hover:bg-green-500'
                        : 'bg-yellow-400 border-yellow-600 hover:bg-yellow-500'
                  }`}
                  style={{
                    left: `${part.x}%`,
                    top: `${part.y}%`,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: selectedBodyPart?.id === part.id ? '0 0 15px rgba(239, 68, 68, 0.8)' : '0 2px 8px rgba(0, 0, 0, 0.3)'
                  }}
                  title={part.name}
                >
                  <span className="text-xs font-bold text-white">
                    {part.id === 'general' ? '🏥' : '•'}
                  </span>
                </button>
              ))}
            </div>
            
            <div className="text-center mt-4">
              <p className="text-sm text-blue-700 font-medium">
                {selectedBodyPart ? `Selected: ${selectedBodyPart.name}` : 'Click on a dot - Green for general checkup, Yellow for specific areas'}
              </p>
            </div>
          </div>
        </div>

        {/* Symptom Selection */}
        <div className="flex-1">
          {selectedBodyPart ? (
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border border-green-200">
              <h4 className="text-xl font-bold text-green-800 mb-4">
                🎯 {selectedBodyPart.id === 'general' ? 'General Health Options' : `Common symptoms for ${selectedBodyPart.name}`}
              </h4>
              <div className="space-y-3">
                {selectedBodyPart.symptoms.map((symptom) => (
                  <Button
                    key={symptom}
                    onClick={() => handleSymptomClick(symptom)}
                    className="w-full h-14 text-left flex items-center gap-3 bg-white hover:bg-green-50 text-green-800 border border-green-300 hover:border-green-400 text-lg font-semibold"
                    variant="outline"
                  >
                    <span className="text-2xl">🔹</span>
                    {symptom.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Button>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-white/50 rounded-lg">
                <p className="text-sm text-green-700">
                  💡 <strong>Tip:</strong> Select the {selectedBodyPart.id === 'general' ? 'service' : 'symptom'} that best describes your {selectedBodyPart.id === 'general' ? 'needs' : 'condition'}. You can provide more details later.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-gray-50 to-slate-100 p-8 rounded-xl border border-gray-200 h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">👆</div>
                <h4 className="text-xl font-semibold text-gray-700 mb-2">
                  Select a Body Part
                </h4>
                <p className="text-gray-600">
                  Click on any dot on the body diagram - Green for general checkup, Yellow for specific symptoms
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-100 p-4 rounded-lg border border-blue-200">
        <h5 className="font-semibold text-blue-800 mb-2">🔍 How it works:</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-blue-700">
          <div>1️⃣ Click on the body part</div>
          <div>2️⃣ Choose your symptom/service</div>
          <div>3️⃣ Get doctor recommendations</div>
        </div>
      </div>
    </div>
  );
};

export default BodySymptomSelector;
