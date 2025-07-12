import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Home, Mic, MicOff, User, Settings, History, Shield, Fingerprint, Eye, MessageSquare, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FaceRecognition from "./FaceRecognition";

interface RegisteredPatientLoginProps {
  onLogin: (patientData: any) => void;
  onBack: () => void;
  voiceEnabled: boolean;
  onVoiceToggle: () => void;
}

const RegisteredPatientLogin: React.FC<RegisteredPatientLoginProps> = ({
  onLogin,
  onBack,
  voiceEnabled,
  onVoiceToggle
}) => {
  const [patientId, setPatientId] = useState('');
  const [securityPin, setSecurityPin] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [showProfile, setShowProfile] = useState(false);
  const [patientData, setPatientData] = useState<any>(null);
  const [authMethod, setAuthMethod] = useState('pin');
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [showFaceRecognition, setShowFaceRecognition] = useState(false);
  const [fingerprintScanning, setFingerprintScanning] = useState(false);
  const { toast } = useToast();

  const handleAuthenticate = () => {
    if (!patientId.trim()) {
      toast({
        title: "Error",
        description: "Please enter Patient ID",
        variant: "destructive"
      });
      return;
    }

    if (authMethod === 'pin' && (!securityPin.trim() || securityPin.length !== 4)) {
      toast({
        title: "Invalid PIN",
        description: "Security PIN must be 4 digits",
        variant: "destructive"
      });
      return;
    }

    if (authMethod === 'otp' && (!otpValue.trim() || otpValue.length !== 6)) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit OTP",
        variant: "destructive"
      });
      return;
    }

    // Generate patient data based on Patient ID - in a real app, this would fetch from database
    const generatePatientName = (id: string) => {
      // Simple name generation based on ID for demo purposes
      const firstNames = ['Alex', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Avery', 'Quinn', 'Blake', 'Sage'];
      const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
      
      const idNumber = parseInt(id.replace(/\D/g, '')) || 0;
      const firstName = firstNames[idNumber % firstNames.length];
      const lastName = lastNames[Math.floor(idNumber / 10) % lastNames.length];
      
      return `${firstName} ${lastName}`;
    };

    const patientName = generatePatientName(patientId);
    
    const patientData = {
      patientId: patientId,
      name: patientName,
      dob: '1990-01-01',
      gender: 'Other',
      mobile: '+91 98765 43210',
      email: `${patientName.toLowerCase().replace(' ', '.')}@email.com`,
      address: '123 Main Street, City',
      aadharNumber: '1234-5678-9012',
      lastVitalsCheck: '2024-01-15',
      upcomingAppointments: 2,
      totalAppointments: 15,
      height: 170, // cm
      weight: 70, // kg
      bmi: 24.2
    };

    toast({
      title: "Login Successful!",
      description: `Welcome back, ${patientName}`,
    });

    setTimeout(() => {
      setPatientData(patientData);
      setShowProfile(true);
    }, 2000);
  };

  const handleBiometricAuth = (method: string) => {
    if (method === 'Fingerprint') {
      setFingerprintScanning(true);
      toast({
        title: "Fingerprint Scanner Active",
        description: "Please place your finger on the scanner",
      });
      
      // Simulate fingerprint scanning process
      setTimeout(() => {
        setFingerprintScanning(false);
        handleAuthenticate();
      }, 4000);
    } else {
      toast({
        title: `${method} Authentication`,
        description: `Please place your ${method.toLowerCase()} on the scanner`,
      });
      
      // Simulate biometric authentication
      setTimeout(() => {
        handleAuthenticate();
      }, 3000);
    }
  };

  const handleFaceRecognitionSuccess = () => {
    setShowFaceRecognition(false);
    handleAuthenticate();
  };

  const handleOTPAuth = () => {
    toast({
      title: "OTP Sent",
      description: "Verification code sent to your registered mobile number",
    });
    
    setOtpSent(true);
  };

  const handleContinueToServices = () => {
    onLogin(patientData);
  };

  const handleLogout = () => {
    setShowProfile(false);
    setShowProfileSettings(false);
    setPatientData(null);
    setCurrentStep(1);
    setPatientId('');
    setSecurityPin('');
    setOtpValue('');
    setOtpSent(false);
    setFingerprintScanning(false);
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };

  if (showFaceRecognition) {
    return (
      <FaceRecognition
        onSuccess={handleFaceRecognitionSuccess}
        onCancel={() => setShowFaceRecognition(false)}
      />
    );
  }

  if (showProfileSettings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-4">
        <Card className="w-full max-w-6xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className={`${voiceEnabled ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-indigo-600 to-purple-600'} text-white rounded-t-lg`}>
            <div className="flex justify-between items-center mb-6">
              <Button
                onClick={() => setShowProfileSettings(false)}
                size="lg"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 h-16 px-6 text-lg"
              >
                <Home size={24} className="mr-2" />
                Back
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
            <CardTitle className="text-4xl font-bold text-center">
              ⚙️ Profile Settings
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-12 space-y-8">
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
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-4">
        <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className={`${voiceEnabled ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-blue-600 to-indigo-600'} text-white rounded-t-lg`}>
            <div className="flex justify-between items-center mb-6">
              <Button
                onClick={() => setShowProfile(false)}
                size="lg"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 h-16 px-6 text-lg"
              >
                <Home size={24} className="mr-2" />
                Back to Profile
              </Button>
              <div className="flex gap-4">
                <Button
                  onClick={handleLogout}
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
              📥 Patient Login
            </CardTitle>
            {voiceEnabled && (
              <div className="text-center text-lg text-blue-100 mt-4">
                🎤 Voice input enabled
              </div>
            )}
          </CardHeader>
          
          <CardContent className="p-12">
            <div className="space-y-8">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={48} className="text-white" />
                </div>
                <h3 className="text-3xl font-semibold">Welcome, {patientData.name}!</h3>
                <p className="text-xl text-gray-600 mt-2">Patient ID: {patientData.patientId}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border border-blue-200">
                  <h4 className="text-xl font-semibold text-blue-800 mb-4">📊 Health Summary</h4>
                  <div className="space-y-2 text-lg">
                    <p><strong>Last Vitals Check:</strong> {patientData.lastVitalsCheck}</p>
                    <p><strong>Height:</strong> {patientData.height} cm</p>
                    <p><strong>Weight:</strong> {patientData.weight} kg</p>
                    <p><strong>BMI:</strong> {patientData.bmi} <span className={patientData.bmi >= 18.5 && patientData.bmi <= 24.9 ? 'text-green-600' : 'text-orange-600'}>({patientData.bmi >= 18.5 && patientData.bmi <= 24.9 ? 'Normal' : 'Needs Attention'})</span></p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border border-green-200">
                  <h4 className="text-xl font-semibold text-green-800 mb-4">👤 Personal Info</h4>
                  <div className="space-y-2 text-lg">
                    <p><strong>DOB:</strong> {patientData.dob}</p>
                    <p><strong>Mobile:</strong> {patientData.mobile}</p>
                    <p><strong>Email:</strong> {patientData.email}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={() => toast({ title: "Feature Coming Soon", description: "View appointment history" })}
                  className="h-20 flex flex-col items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-lg"
                >
                  <History size={32} />
                  <span>View History</span>
                </Button>

                <Button
                  onClick={() => setShowProfileSettings(true)}
                  className="h-20 flex flex-col items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-lg"
                >
                  <Settings size={32} />
                  <span>Settings</span>
                </Button>
              </div>

              <Button 
                onClick={handleContinueToServices}
                className="w-full h-20 text-2xl font-semibold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              >
                🏥 Continue to Healthcare Services
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div>
              <Label htmlFor="patientId" className="text-2xl">Enter Patient ID</Label>
              <Input 
                id="patientId"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="mt-4 h-16 text-xl"
                placeholder="e.g., PAT1234567890"
                autoFocus
              />
            </div>
            
            <Button 
              onClick={() => setCurrentStep(2)}
              className="w-full h-16 text-xl font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              disabled={!patientId.trim()}
            >
              Continue to Authentication
            </Button>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-6">Authenticate Patient</h3>
              <div className="bg-gradient-to-br from-gray-50 to-slate-100 p-6 rounded-xl border">
                <p className="font-semibold text-lg">Patient ID: {patientId}</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-center">Choose Authentication Method</h4>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  onClick={() => setAuthMethod('pin')}
                  className={`h-20 flex flex-col items-center gap-2 ${authMethod === 'pin' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                >
                  <Shield size={24} />
                  <span>Security PIN</span>
                </Button>
                
                <Button
                  onClick={() => setAuthMethod('fingerprint')}
                  className={`h-20 flex flex-col items-center gap-2 ${authMethod === 'fingerprint' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                >
                  <Fingerprint size={24} />
                  <span>Fingerprint</span>
                </Button>
                
                <Button
                  onClick={() => setAuthMethod('face')}
                  className={`h-20 flex flex-col items-center gap-2 ${authMethod === 'face' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                >
                  <Eye size={24} />
                  <span>Face Recognition</span>
                </Button>
                
                <Button
                  onClick={() => setAuthMethod('otp')}
                  className={`h-20 flex flex-col items-center gap-2 ${authMethod === 'otp' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                >
                  <MessageSquare size={24} />
                  <span>OTP Verification</span>
                </Button>
              </div>
            </div>
            
            {authMethod === 'pin' && (
              <div>
                <Label htmlFor="pin" className="text-2xl">Enter 4-Digit Security PIN</Label>
                <Input 
                  id="pin"
                  type="password"
                  value={securityPin}
                  onChange={(e) => setSecurityPin(e.target.value)}
                  className="mt-4 h-16 text-xl text-center"
                  placeholder="••••"
                  maxLength={4}
                  autoFocus
                />
              </div>
            )}
            
            {authMethod === 'otp' && (
              <div className="space-y-6">
                {!otpSent ? (
                  <div className="bg-gradient-to-br from-orange-50 to-red-100 p-6 rounded-xl border border-orange-200 text-center">
                    <MessageSquare size={64} className="mx-auto text-orange-600 mb-4" />
                    <h4 className="font-semibold text-orange-800 mb-3 text-lg">📱 OTP Verification</h4>
                    <p className="text-lg text-orange-700 mb-4">We'll send a verification code to your registered mobile number</p>
                    <Button 
                      onClick={handleOTPAuth}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      Send OTP
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border border-green-200 text-center">
                      <h4 className="font-semibold text-green-800 mb-3 text-lg">📱 Enter OTP</h4>
                      <p className="text-lg text-green-700 mb-4">Enter the 6-digit code sent to your mobile</p>
                    </div>
                    <div className="flex justify-center">
                      <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {authMethod === 'fingerprint' && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border border-green-200 text-center">
                <div className="relative">
                  <Fingerprint 
                    size={80} 
                    className={`mx-auto mb-4 ${fingerprintScanning ? 'text-blue-600 animate-pulse' : 'text-green-600'}`} 
                  />
                  {fingerprintScanning && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                <h4 className={`font-semibold mb-3 text-lg ${fingerprintScanning ? 'text-blue-800' : 'text-green-800'}`}>
                  🔒 Fingerprint Authentication
                </h4>
                <p className={`text-lg ${fingerprintScanning ? 'text-blue-700' : 'text-green-700'} mb-4`}>
                  {fingerprintScanning ? 'Scanning fingerprint... Please keep your finger steady' : 'Place your finger on the fingerprint scanner'}
                </p>
                {fingerprintScanning && (
                  <div className="flex justify-center">
                    <div className="bg-white/90 px-4 py-2 rounded-lg">
                      <span className="text-blue-600 font-semibold">🔄 Processing...</span>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {authMethod === 'face' && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-xl border border-purple-200 text-center">
                <Eye size={64} className="mx-auto text-purple-600 mb-4" />
                <h4 className="font-semibold text-purple-800 mb-3 text-lg">👁️ Face Recognition</h4>
                <p className="text-lg text-purple-700 mb-4">Look at the camera for face recognition</p>
                <Button 
                  onClick={() => setShowFaceRecognition(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Start Face Recognition
                </Button>
              </div>
            )}
            
            <Button 
              onClick={() => {
                if (authMethod === 'pin') {
                  handleAuthenticate();
                } else if (authMethod === 'fingerprint') {
                  handleBiometricAuth('Fingerprint');
                } else if (authMethod === 'face') {
                  setShowFaceRecognition(true);
                } else if (authMethod === 'otp' && otpSent) {
                  handleAuthenticate();
                }
              }}
              className="w-full h-16 text-xl font-semibold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              disabled={(authMethod === 'pin' && !securityPin.trim()) || (authMethod === 'otp' && (!otpSent || !otpValue.trim())) || fingerprintScanning}
            >
              ✅ Authenticate & Login
            </Button>
            
            <Button 
              onClick={() => setCurrentStep(1)}
              variant="outline"
              size="lg"
              className="w-full h-16 text-lg"
            >
              Back to Patient ID Entry
            </Button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className={`${voiceEnabled ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-blue-600 to-indigo-600'} text-white rounded-t-lg`}>
          <div className="flex justify-between items-center mb-6">
            <Button
              onClick={onBack}
              size="lg"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30 h-16 px-6 text-lg"
            >
              <Home size={24} className="mr-2" />
              Home
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
          <CardTitle className="text-4xl font-bold text-center">
            📥 Patient Login
          </CardTitle>
          {!showProfile && (
            <div className="flex justify-center mt-6">
              <div className="flex space-x-4">
                {[1, 2].map((step) => (
                  <div
                    key={step}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold
                      ${currentStep >= step ? 'bg-white text-blue-600' : 'bg-white/30 text-white/70'}`}
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>
          )}
          {voiceEnabled && (
            <div className="text-center text-lg text-blue-100 mt-4">
              🎤 Voice input enabled
            </div>
          )}
        </CardHeader>
        
        <CardContent className="p-12">
          {renderStep()}
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisteredPatientLogin;
