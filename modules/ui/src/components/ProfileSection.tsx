import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, History, Settings, Shield, Calendar, Activity, Home, Mic, MicOff, LogOut, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfileSectionProps {
  patient: any;
  onBack: () => void;
  onBackToServices: () => void;
  voiceEnabled: boolean;
  onVoiceToggle: () => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  patient,
  onBack,
  onBackToServices,
  voiceEnabled,
  onVoiceToggle
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  const mockVitalsHistory = [
    { date: '2024-01-15', temperature: '98.6°F', bp: '120/80', heartRate: '72 bpm', height: '170 cm', weight: '70 kg', bmi: '24.2' },
    { date: '2024-01-10', temperature: '98.4°F', bp: '118/78', heartRate: '70 bpm', height: '170 cm', weight: '69 kg', bmi: '23.9' },
    { date: '2024-01-05', temperature: '99.1°F', bp: '122/82', heartRate: '75 bpm', height: '170 cm', weight: '71 kg', bmi: '24.6' }
  ];

  const mockAppointmentHistory = [
    { date: '2024-01-20', doctor: 'Dr. Priya Sharma', specialty: 'General Medicine', status: 'Completed', notes: 'Regular checkup, all vitals normal' },
    { date: '2024-01-15', doctor: 'Dr. Rajesh Kumar', specialty: 'Cardiology', status: 'Completed', notes: 'Heart examination, ECG normal' },
    { date: '2024-01-25', doctor: 'Dr. Anjali Gupta', specialty: 'Neurology', status: 'Upcoming', notes: 'Consultation for headaches' },
    { date: '2024-01-08', doctor: 'Dr. Suresh Patel', specialty: 'Orthopedics', status: 'Completed', notes: 'Knee pain consultation' },
    { date: '2023-12-20', doctor: 'Dr. Kavita Singh', specialty: 'General Medicine', status: 'Completed', notes: 'Annual health checkup' }
  ];

  const getBMIStatus = (bmi: string) => {
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) return { status: 'Underweight', color: 'text-orange-600' };
    if (bmiValue >= 18.5 && bmiValue <= 24.9) return { status: 'Normal', color: 'text-green-600' };
    if (bmiValue >= 25 && bmiValue <= 29.9) return { status: 'Overweight', color: 'text-orange-600' };
    return { status: 'Obese', color: 'text-red-600' };
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };

  const handleViewHistory = () => {
    setActiveTab('history');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <User size={64} className="text-white" />
              </div>
              <h2 className="text-4xl font-bold">{patient.name}</h2>
              <p className="text-2xl text-gray-600 mt-2">Patient ID: {patient.patientId}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border border-blue-200">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">📊 Health Stats</h3>
                <div className="space-y-2 text-lg">
                  <p><strong>Last Check:</strong> Jan 15, 2024</p>
                  <p><strong>Next Appointment:</strong> Jan 25, 2024</p>
                  <p><strong>Total Visits:</strong> 15</p>
                  <p><strong>Height:</strong> {patient.height || '170'} cm</p>
                  <p><strong>Weight:</strong> {patient.weight || '70'} kg</p>
                  <p><strong>BMI:</strong> {patient.bmi || '24.2'} <span className={getBMIStatus(patient.bmi || '24.2').color}>({getBMIStatus(patient.bmi || '24.2').status})</span></p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border border-green-200">
                <h3 className="text-xl font-semibold text-green-800 mb-4">👤 Personal Info</h3>
                <div className="space-y-2 text-lg">
                  <p><strong>Age:</strong> 34 years</p>
                  <p><strong>Gender:</strong> {patient.gender}</p>
                  <p><strong>Mobile:</strong> {patient.mobile}</p>
                  <p><strong>Email:</strong> {patient.email}</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-xl border border-purple-200">
                <h3 className="text-xl font-semibold text-purple-800 mb-4">🏥 Healthcare</h3>
                <div className="space-y-2 text-lg">
                  <p><strong>Primary Doctor:</strong> Dr. Priya Sharma</p>
                  <p><strong>Insurance:</strong> Ayushman Bharat</p>
                  <p><strong>Allergies:</strong> None reported</p>
                  <p><strong>Blood Group:</strong> O+</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'history':
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold">📋 Complete Medical History</h3>
            
            {/* Recent Vitals Summary */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border border-blue-200">
              <h4 className="text-xl font-semibold text-blue-800 mb-4">🩺 Latest Vitals (Jan 15, 2024)</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-lg">
                <div className="text-center">
                  <p className="text-blue-600 font-semibold">Temperature</p>
                  <p className="text-2xl font-bold">98.6°F</p>
                  <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">Normal</span>
                </div>
                <div className="text-center">
                  <p className="text-blue-600 font-semibold">Blood Pressure</p>
                  <p className="text-2xl font-bold">120/80</p>
                  <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">Normal</span>
                </div>
                <div className="text-center">
                  <p className="text-blue-600 font-semibold">Heart Rate</p>
                  <p className="text-2xl font-bold">72 bpm</p>
                  <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">Normal</span>
                </div>
                <div className="text-center">
                  <p className="text-blue-600 font-semibold">BMI</p>
                  <p className="text-2xl font-bold">24.2</p>
                  <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">Normal</span>
                </div>
              </div>
            </div>

            {/* Recent Appointments */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border border-green-200">
              <h4 className="text-xl font-semibold text-green-800 mb-4">📅 Recent Appointments</h4>
              <div className="space-y-3">
                {mockAppointmentHistory.slice(0, 3).map((appointment, index) => (
                  <div key={index} className="flex justify-between items-center bg-white/70 p-4 rounded-lg">
                    <div>
                      <p className="font-semibold text-lg">{appointment.doctor}</p>
                      <p className="text-gray-600">{appointment.specialty} • {appointment.date}</p>
                      <p className="text-sm text-gray-500">{appointment.notes}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      appointment.status === 'Completed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => setActiveTab('appointments')}
                variant="outline"
                className="mt-4 w-full"
              >
                View All Appointments
              </Button>
            </div>

            {/* Health Trends */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-xl border border-purple-200">
              <h4 className="text-xl font-semibold text-purple-800 mb-4">📈 Health Trends</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/70 p-4 rounded-lg">
                  <h5 className="font-semibold text-purple-700 mb-2">Weight Trend</h5>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">70 kg</span>
                    <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">Stable</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">No significant change in last 3 months</p>
                </div>
                <div className="bg-white/70 p-4 rounded-lg">
                  <h5 className="font-semibold text-purple-700 mb-2">BP Trend</h5>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">120/80</span>
                    <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">Good</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Consistently normal range</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={() => setActiveTab('vitals')}
                className="h-16 flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-lg"
              >
                <Activity size={24} />
                View Detailed Vitals History
              </Button>
              <Button
                onClick={() => setActiveTab('appointments')}
                className="h-16 flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-lg"
              >
                <Calendar size={24} />
                View All Appointments
              </Button>
            </div>
          </div>
        );

      case 'vitals':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">📈 Vitals History</h3>
            <div className="space-y-4">
              {mockVitalsHistory.map((vital, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl border">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-semibold">{vital.date}</h4>
                    <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">Normal</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-lg">
                    <div>
                      <p className="text-gray-600">Temperature</p>
                      <p className="font-semibold">{vital.temperature}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Blood Pressure</p>
                      <p className="font-semibold">{vital.bp}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Heart Rate</p>
                      <p className="font-semibold">{vital.heartRate}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Height</p>
                      <p className="font-semibold">{vital.height}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Weight</p>
                      <p className="font-semibold">{vital.weight}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">BMI</p>
                      <p className="font-semibold">{vital.bmi} <span className={getBMIStatus(vital.bmi).color}>({getBMIStatus(vital.bmi).status})</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'appointments':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">📅 Appointment History</h3>
            <div className="space-y-4">
              {mockAppointmentHistory.map((appointment, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl border">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-semibold">{appointment.date}</h4>
                      <p className="text-lg text-gray-600">{appointment.doctor}</p>
                      <p className="text-lg text-blue-600">{appointment.specialty}</p>
                      <p className="text-md text-gray-500 mt-2">{appointment.notes}</p>
                    </div>
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      appointment.status === 'Completed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold">⚙️ Profile Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Button
                onClick={() => toast({ title: "Feature Coming Soon", description: "Change password functionality" })}
                className="h-20 flex flex-col items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-lg"
              >
                <Shield size={32} />
                <span>Change Password</span>
              </Button>

              <Button
                onClick={() => toast({ title: "Feature Coming Soon", description: "Change security PIN functionality" })}
                className="h-20 flex flex-col items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-lg"
              >
                <Shield size={32} />
                <span>Change Security PIN</span>
              </Button>

              <Button
                onClick={() => toast({ title: "Feature Coming Soon", description: "Update contact information" })}
                className="h-20 flex flex-col items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-lg"
              >
                <User size={32} />
                <span>Update Contact Info</span>
              </Button>

              <Button
                onClick={() => toast({ title: "Feature Coming Soon", description: "Privacy settings" })}
                className="h-20 flex flex-col items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-lg"
              >
                <Settings size={32} />
                <span>Privacy Settings</span>
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-6xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className={`${voiceEnabled ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-indigo-600 to-purple-600'} text-white rounded-t-lg`}>
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <Button
                onClick={onBack}
                size="lg"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 h-16 px-6 text-lg"
              >
                <ArrowLeft size={24} className="mr-2" />
                Back
              </Button>
              <Button
                onClick={onBackToServices}
                size="lg"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 h-16 px-6 text-lg"
              >
                <Home size={24} className="mr-2" />
                Back to Services
              </Button>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={handleViewHistory}
                size="lg"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 h-16 px-6 text-lg"
              >
                <History size={24} className="mr-2" />
                View History
              </Button>
              <Button
                onClick={() => {
                  handleLogout();
                  window.location.reload();
                }}
                size="lg"
                className="bg-red-500 hover:bg-red-600 text-white h-16 px-6 text-lg"
              >
                <LogOut size={24} className="mr-2" />
                Logout
              </Button>
              <Button
                onClick={onVoiceToggle}
                size="lg"
                className={`h-16 px-6 text-lg ${voiceEnabled ? 'bg-white text-purple-600 hover:bg-gray-100 border-4 border-white shadow-lg ring-4 ring-white/30' : 'bg-white/20 border-white/30 text-white hover:bg-white/30'}`}
              >
                {voiceEnabled ? <Mic size={24} /> : <MicOff size={24} />}
                <span className="ml-2">{voiceEnabled ? 'Voice ON' : 'Voice OFF'}</span>
              </Button>
            </div>
          </div>
          <CardTitle className="text-4xl font-bold text-center">
            👤 Patient Profile
          </CardTitle>
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              {[
                { id: 'overview', label: 'Overview', icon: User },
                { id: 'history', label: 'Medical History', icon: History },
                { id: 'vitals', label: 'Vitals History', icon: Activity },
                { id: 'appointments', label: 'Appointment History', icon: Calendar },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map((tab) => (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  size="lg"
                  className={`h-16 px-6 text-lg ${
                    activeTab === tab.id
                      ? 'bg-white text-indigo-600'
                      : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
                  }`}
                >
                  <tab.icon size={20} className="mr-2" />
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-12">
          {renderTabContent()}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSection;
