
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Home, Calendar, Activity, Heart, Brain, Bone, Eye, Ear, Stethoscope } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BodySymptomSelector from './BodySymptomSelector';

interface AppointmentBookingProps {
  patient: any;
  vitalsData: any;
  onComplete: (appointment: any) => void;
  onBack: () => void;
  onBackToHome: () => void;
  voiceEnabled: boolean;
  onVoiceToggle: () => void;
  onSymptomSelect?: (symptom: string) => void;
}

const AppointmentBooking: React.FC<AppointmentBookingProps> = ({
  patient,
  vitalsData,
  onComplete,
  onBack,
  onBackToHome,
  voiceEnabled,
  onVoiceToggle,
  onSymptomSelect
}) => {
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [showBodySelector, setShowBodySelector] = useState(false);
  const { toast } = useToast();

  const symptoms = [
    { id: 'headache', name: 'Headache', icon: Brain },
    { id: 'chest-pain', name: 'Chest Pain', icon: Heart },
    { id: 'back-pain', name: 'Back Pain', icon: Bone },
    { id: 'eye-problems', name: 'Eye Problems', icon: Eye },
    { id: 'ear-problems', name: 'Ear Problems', icon: Ear },
    { id: 'general-checkup', name: 'General Checkup', icon: Stethoscope },
  ];

  const handleSymptomSelect = (symptom: string) => {
    console.log('Symptom selected in AppointmentBooking:', symptom);
    setSelectedSymptom(symptom);
    
    // Call the parent's onSymptomSelect function to navigate to doctor recommendation
    if (onSymptomSelect) {
      console.log('Calling parent onSymptomSelect');
      onSymptomSelect(symptom);
    } else {
      console.log('onSymptomSelect is not available');
    }
    
    toast({
      title: "Symptom Selected",
      description: `Finding doctors for ${symptom.replace('-', ' ')}`,
    });
  };

  const handleBodySymptomSelect = (symptom: string, bodyPart: string) => {
    console.log('Body symptom selected:', symptom, 'from', bodyPart);
    handleSymptomSelect(symptom);
  };

  if (showBodySelector) {
    return (
      <BodySymptomSelector
        onSymptomSelect={handleBodySymptomSelect}
        onBack={() => setShowBodySelector(false)}
        voiceEnabled={voiceEnabled}
        onVoiceToggle={onVoiceToggle}
      />
    );
  }

  return (
    <div className={`min-h-screen ${voiceEnabled ? 'bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100' : 'bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50'} p-4`}>
      <Card className="w-full max-w-5xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className={`text-center ${voiceEnabled ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-teal-600 to-blue-600'} text-white rounded-t-lg`}>
          <div className="flex justify-between items-center mb-8">
            <Button
              onClick={onBack}
              size="lg"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30 h-20 px-8 text-xl font-bold"
            >
              <Home size={32} className="mr-3" />
              Back to Services
            </Button>
            <Button
              onClick={onVoiceToggle}
              size="lg"
              className={`h-20 px-8 text-xl font-bold ${voiceEnabled ? 'bg-white text-purple-600 hover:bg-gray-100 border-4 border-white shadow-lg ring-4 ring-white/30' : 'bg-white/20 border-white/30 text-white hover:bg-white/30'}`}
            >
              {voiceEnabled ? <Mic size={32} /> : <MicOff size={32} />}
              <span className="ml-3">{voiceEnabled ? 'Voice ON' : 'Voice OFF'}</span>
            </Button>
          </div>
          <CardTitle className="text-5xl font-bold flex items-center justify-center gap-4">
            📅 Book Appointment
          </CardTitle>
          <p className="text-2xl mt-6">
            Select your health concern to find the right doctor
          </p>
          {voiceEnabled && (
            <div className="bg-white/20 p-4 rounded-lg text-xl mt-4">
              🎤 Voice Control Active - Say symptom names or "Body selector"
            </div>
          )}
        </CardHeader>
        
        <CardContent className="space-y-10 p-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {symptoms.map((symptom) => (
              <Button
                key={symptom.id}
                onClick={() => handleSymptomSelect(symptom.id)}
                className={`h-32 text-2xl font-bold flex items-center gap-6 ${voiceEnabled ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 border-4 border-purple-300' : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'} transform hover:scale-105 transition-all duration-300 shadow-lg`}
                variant="default"
              >
                <symptom.icon size={40} />
                <div className="text-left">
                  <div>{symptom.name}</div>
                  <div className="text-lg font-normal opacity-90">Find specialists</div>
                </div>
              </Button>
            ))}
          </div>

          <div className="border-t pt-8">
            <Button
              onClick={() => setShowBodySelector(true)}
              className={`w-full h-24 text-2xl font-bold flex items-center gap-6 ${voiceEnabled ? 'bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 border-4 border-pink-300' : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'} transform hover:scale-105 transition-all duration-300 shadow-lg`}
              variant="default"
            >
              <Activity size={40} />
              <div className="text-left">
                <div>🧍 Interactive Body Selector</div>
                <div className="text-lg font-normal opacity-90">Point to where it hurts</div>
              </div>
            </Button>
          </div>

          <div className="flex gap-8 mt-16">
            <Button onClick={onBackToHome} variant="outline" className="flex-1 h-20 font-bold text-2xl">
              🏠 Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentBooking;
