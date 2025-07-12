import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, User, UserPlus, Activity, Home, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import NewPatientRegistration from '@/components/NewPatientRegistration';
import RegisteredPatientLogin from '@/components/RegisteredPatientLogin';
import VitalsCheck from '@/components/VitalsCheck';
import AppointmentBooking from '@/components/AppointmentBooking';
import ConfirmationScreen from '@/components/ConfirmationScreen';
import ProfileSection from '@/components/ProfileSection';
import HospitalDoctorRecommendation from '@/components/HospitalDoctorRecommendation';

type Screen = 'home' | 'newRegistration' | 'login' | 'serviceSelection' | 'vitals' | 'appointment' | 'confirmation' | 'profile' | 'doctorRecommendation';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [currentPatient, setCurrentPatient] = useState<any>(null);
  const [vitalsData, setVitalsData] = useState<any>(null);
  const [appointmentData, setAppointmentData] = useState<any>(null);
  const [selectedSymptom, setSelectedSymptom] = useState<string>('');
  const { toast } = useToast();

  const handleVoiceToggle = () => {
    setVoiceEnabled(!voiceEnabled);
    toast({
      title: voiceEnabled ? "Voice Control Disabled" : "Voice Control Enabled",
      description: voiceEnabled ? "Voice commands are now off" : "Voice commands are now active",
    });
  };

  const handleLogout = () => {
    setCurrentScreen('home');
    setCurrentPatient(null);
    setVitalsData(null);
    setAppointmentData(null);
    setSelectedSymptom('');
    toast({
      title: "Session Ended",
      description: "Thank you for using our healthcare kiosk",
    });
  };

  const handleBackToHome = () => {
    if (currentPatient) {
      setCurrentScreen('profile');
    } else {
      setCurrentScreen('home');
      setCurrentPatient(null);
      setVitalsData(null);
      setAppointmentData(null);
      setSelectedSymptom('');
    }
  };

  const handleSymptomSelection = (symptom: string) => {
    setSelectedSymptom(symptom);
    setCurrentScreen('doctorRecommendation');
  };

  const handleBookAppointment = (doctor: any, hospital: any) => {
    setAppointmentData({
      doctor,
      hospital,
      symptom: selectedSymptom,
      timestamp: Date.now()
    });
    setCurrentScreen('confirmation');
  };

  // Check if vitals were checked today
  const hasVitalsToday = () => {
    if (!vitalsData) return false;
    const today = new Date().toDateString();
    const vitalsDate = new Date(vitalsData.timestamp || Date.now()).toDateString();
    return today === vitalsDate;
  };

  const renderHomeScreen = () => (
    <div className={`min-h-screen ${voiceEnabled ? 'bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100' : 'bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50'} p-4`}>
      <Card className="w-full max-w-6xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className={`text-center ${voiceEnabled ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-blue-600 to-purple-600'} text-white rounded-t-lg`}>
          <div className="flex justify-between items-center mb-8">
            <div className="w-40"></div>
            <CardTitle className="text-6xl font-bold flex items-center justify-center gap-6">
              🏥 HealthCare Kiosk
            </CardTitle>
            <Button
              onClick={handleVoiceToggle}
              size="lg"
              className={`h-20 px-8 text-xl font-bold ${voiceEnabled ? 'bg-white text-purple-600 hover:bg-gray-100 border-4 border-white shadow-lg ring-4 ring-white/30' : 'bg-white/20 border-white/30 text-white hover:bg-white/30'}`}
            >
              {voiceEnabled ? <Mic size={32} /> : <MicOff size={32} />}
              <span className="ml-3">{voiceEnabled ? 'Voice ON' : 'Voice OFF'}</span>
            </Button>
          </div>
          <p className="text-3xl mb-4">
            Your Health, Our Priority - Welcome to Digital Healthcare
          </p>
          {voiceEnabled && (
            <div className="bg-white/20 p-4 rounded-lg text-xl">
              🎤 Voice Control Active - Say "New Registration", "Patient Login", or "Toggle Voice"
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-10 p-16">
          <div className="grid gap-10">
            <Button
              onClick={() => setCurrentScreen('newRegistration')}
              className={`h-32 text-3xl font-bold flex items-center gap-8 ${voiceEnabled ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 border-4 border-purple-300' : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'} transform hover:scale-105 transition-all duration-300 shadow-lg`}
              variant="default"
            >
              <UserPlus size={50} />
              <div className="text-left">
                <div>🆕 New Patient Registration</div>
                <div className="text-xl font-normal opacity-90">Create your health profile</div>
              </div>
            </Button>
            
            <Button
              onClick={() => setCurrentScreen('login')}
              className={`h-32 text-3xl font-bold flex items-center gap-8 ${voiceEnabled ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-4 border-indigo-300' : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'} transform hover:scale-105 transition-all duration-300 shadow-lg`}
              variant="default"
            >
              <User size={50} />
              <div className="text-left">
                <div>👤 Registered Patient Login</div>
                <div className="text-xl font-normal opacity-90">Access your health records</div>
              </div>
            </Button>

            {currentPatient && (
              <Button
                onClick={() => setCurrentScreen('profile')}
                className={`h-32 text-3xl font-bold flex items-center gap-8 ${voiceEnabled ? 'bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 border-4 border-pink-300' : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700'} transform hover:scale-105 transition-all duration-300 shadow-lg`}
                variant="default"
              >
                <User size={50} />
                <div className="text-left">
                  <div>👤 My Profile</div>
                  <div className="text-xl font-normal opacity-90">View profile & history</div>
                </div>
              </Button>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div className={`${voiceEnabled ? 'bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200' : 'bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200'} p-10 rounded-xl border`}>
              <h3 className={`font-bold ${voiceEnabled ? 'text-purple-800' : 'text-blue-800'} mb-6 flex items-center gap-4 text-2xl`}>
                🛡️ Secure & Private
              </h3>
              <p className={`text-xl ${voiceEnabled ? 'text-purple-700' : 'text-blue-700'}`}>
                Your health data is protected with advanced bio-metric authentication and encryption
              </p>
            </div>
            
            <div className={`${voiceEnabled ? 'bg-gradient-to-br from-pink-50 to-rose-100 border-pink-200' : 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-200'} p-10 rounded-xl border`}>
              <h3 className={`font-bold ${voiceEnabled ? 'text-pink-800' : 'text-green-800'} mb-6 flex items-center gap-4 text-2xl`}>
                ⚡ Quick & Easy
              </h3>
              <p className={`text-xl ${voiceEnabled ? 'text-pink-700' : 'text-green-700'}`}>
                Get vitals checked and book appointments in under 5 minutes
              </p>
            </div>
          </div>
          
          {voiceEnabled && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-10 rounded-xl border border-purple-200">
              <h4 className="font-bold text-purple-800 mb-6 flex items-center gap-4 text-2xl">
                🗣️ Voice Commands Available:
              </h4>
              <div className="grid md:grid-cols-3 gap-6 text-xl text-purple-700">
                <div className="bg-white/60 p-6 rounded-lg font-semibold">"New registration"</div>
                <div className="bg-white/60 p-6 rounded-lg font-semibold">"Patient login"</div>
                <div className="bg-white/60 p-6 rounded-lg font-semibold">"Toggle voice"</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderServiceSelection = () => (
    <div className={`min-h-screen ${voiceEnabled ? 'bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100' : 'bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50'} p-4`}>
      <Card className="w-full max-w-5xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className={`text-center ${voiceEnabled ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-teal-600 to-blue-600'} text-white rounded-t-lg`}>
          <div className="flex justify-between items-center mb-8">
            <Button
              onClick={() => setCurrentScreen('profile')}
              size="lg"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30 h-20 px-8 text-xl font-bold"
            >
              <Home size={32} className="mr-3" />
              Back to Profile
            </Button>
            <Button
              onClick={handleVoiceToggle}
              size="lg"
              className={`h-20 px-8 text-xl font-bold ${voiceEnabled ? 'bg-white text-purple-600 hover:bg-gray-100 border-4 border-white shadow-lg ring-4 ring-white/30' : 'bg-white/20 border-white/30 text-white hover:bg-white/30'}`}
            >
              {voiceEnabled ? <Mic size={32} /> : <MicOff size={32} />}
              <span className="ml-3">{voiceEnabled ? 'Voice ON' : 'Voice OFF'}</span>
            </Button>
          </div>
          <CardTitle className="text-5xl font-bold flex items-center justify-center gap-4">
            🏥 Select Healthcare Service
          </CardTitle>
          <p className="text-2xl mt-6">
            Welcome {currentPatient?.name || currentPatient?.patientId}! Choose your service
          </p>
          {voiceEnabled && (
            <div className="bg-white/20 p-4 rounded-lg text-xl mt-4">
              🎤 Voice Control Active - Say "Check Vitals" or "Book Appointment"
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-10 p-16">
          <Button
            onClick={() => setCurrentScreen('vitals')}
            className={`w-full h-32 text-3xl font-bold flex items-center gap-8 ${voiceEnabled ? 'bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 border-4 border-pink-300' : 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700'} transform hover:scale-105 transition-all duration-300 shadow-lg`}
            variant="default"
          >
            <Activity size={50} />
            <div className="text-left">
              <div>🔸 Check Vitals</div>
              <div className="text-xl font-normal opacity-90">Temperature, BP, Pulse & more</div>
            </div>
          </Button>
          
          {hasVitalsToday() ? (
            <Button
              onClick={() => setCurrentScreen('appointment')}
              className={`w-full h-32 text-3xl font-bold flex items-center gap-8 ${voiceEnabled ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-4 border-indigo-300' : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700'} transform hover:scale-105 transition-all duration-300 shadow-lg`}
              variant="default"
            >
              <Calendar size={50} />
              <div className="text-left">
                <div>📅 Book Appointment</div>
                <div className="text-xl font-normal opacity-90">Schedule with our doctors</div>
              </div>
            </Button>
          ) : (
            <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-600 mb-2">📅 Book Appointment</p>
                <p className="text-lg text-gray-500">Please check your vitals first today</p>
                <Button
                  onClick={() => setCurrentScreen('vitals')}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Check Vitals First
                </Button>
              </div>
            </div>
          )}
          
          <div className="flex gap-8 mt-16">
            <Button onClick={handleLogout} variant="destructive" className="flex-1 h-20 font-bold text-2xl">
              🚪 End Session
            </Button>
            <Button 
              onClick={() => setCurrentScreen('profile')}
              variant="outline" 
              className="flex-1 h-20 font-bold text-2xl bg-gradient-to-r from-gray-50 to-slate-100"
            >
              👤 View Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen">
      {currentScreen === 'home' && renderHomeScreen()}
      
      {currentScreen === 'newRegistration' && (
        <NewPatientRegistration 
          onComplete={(patientData) => {
            setCurrentPatient(patientData);
            setCurrentScreen('serviceSelection');
          }}
          onBack={handleBackToHome}
          voiceEnabled={voiceEnabled}
          onVoiceToggle={handleVoiceToggle}
        />
      )}
      
      {currentScreen === 'login' && (
        <RegisteredPatientLogin 
          onLogin={(patientData) => {
            setCurrentPatient(patientData);
            if (patientData.redirectTo === 'vitals') {
              setCurrentScreen('vitals');
            } else if (patientData.redirectTo === 'appointment') {
              setCurrentScreen('appointment');
            } else {
              setCurrentScreen('serviceSelection');
            }
          }}
          onBack={handleBackToHome}
          voiceEnabled={voiceEnabled}
          onVoiceToggle={handleVoiceToggle}
        />
      )}

      {currentScreen === 'profile' && currentPatient && (
        <ProfileSection 
          patient={currentPatient}
          onBack={() => setCurrentScreen('profile')}
          onBackToServices={() => setCurrentScreen('serviceSelection')}
          voiceEnabled={voiceEnabled}
          onVoiceToggle={handleVoiceToggle}
        />
      )}
      
      {currentScreen === 'serviceSelection' && renderServiceSelection()}
      
      {currentScreen === 'vitals' && (
        <VitalsCheck 
          patient={currentPatient}
          onComplete={(vitals) => {
            setVitalsData({ ...vitals, timestamp: Date.now() });
            setCurrentScreen('appointment');
          }}
          onBack={() => setCurrentScreen('serviceSelection')}
          onBackToHome={() => setCurrentScreen('profile')}
          voiceEnabled={voiceEnabled}
          onVoiceToggle={handleVoiceToggle}
        />
      )}
      
      {currentScreen === 'appointment' && (
        <AppointmentBooking 
          patient={currentPatient}
          vitalsData={vitalsData}
          onComplete={(appointment) => {
            setAppointmentData(appointment);
            setCurrentScreen('confirmation');
          }}
          onBack={() => setCurrentScreen('serviceSelection')}
          onBackToHome={() => setCurrentScreen('profile')}
          voiceEnabled={voiceEnabled}
          onVoiceToggle={handleVoiceToggle}
          onSymptomSelect={handleSymptomSelection}
        />
      )}

      {currentScreen === 'doctorRecommendation' && (
        <HospitalDoctorRecommendation
          selectedSymptom={selectedSymptom}
          onBack={() => setCurrentScreen('appointment')}
          onBookAppointment={handleBookAppointment}
        />
      )}
      
      {currentScreen === 'confirmation' && (
        <ConfirmationScreen 
          patient={currentPatient}
          vitalsData={vitalsData}
          appointmentData={appointmentData}
          onComplete={handleLogout}
          onBackToHome={() => setCurrentScreen('profile')}
          voiceEnabled={voiceEnabled}
          onVoiceToggle={handleVoiceToggle}
        />
      )}
    </div>
  );
};

export default Index;
