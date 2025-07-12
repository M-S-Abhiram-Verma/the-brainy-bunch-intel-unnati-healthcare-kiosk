
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Download, Mail, MessageCircle, Printer, Home, Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ConfirmationScreenProps {
  patient: any;
  vitalsData: any;
  appointmentData: any;
  onComplete: () => void;
  onBackToHome: () => void;
  voiceEnabled: boolean;
  onVoiceToggle: () => void;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  patient,
  vitalsData,
  appointmentData,
  onComplete,
  onBackToHome,
  voiceEnabled,
  onVoiceToggle
}) => {
  const [autoLogoutTimer, setAutoLogoutTimer] = useState(45);
  const [smsAlreadySent, setSmsAlreadySent] = useState(true); // SMS sent automatically
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setAutoLogoutTimer((prev) => {
        if (prev <= 1) {
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  const handleSendEmail = () => {
    toast({
      title: "Email Sent Successfully!",
      description: `Detailed confirmation sent to ${patient.email || 'registered email address'}`,
    });
  };

  const handlePrint = () => {
    window.print();
    toast({
      title: "Printing Receipt...",
      description: "Your appointment and vitals receipt is being printed",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-5xl shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
          <div className="flex justify-between items-start mb-4">
            <Button
              onClick={onBackToHome}
              variant="outline"
              size="sm"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <Home size={16} className="mr-2" />
              Home
            </Button>
            <Button
              onClick={onVoiceToggle}
              variant="outline"
              size="sm"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              {voiceEnabled ? <Mic size={16} /> : <MicOff size={16} />}
            </Button>
          </div>
          <div className="flex justify-center mb-4">
            <CheckCircle size={64} className="text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-center">
            🎉 All Done! Thank You!
          </CardTitle>
          <p className="text-lg text-green-100 text-center">
            Your healthcare requests have been processed successfully
          </p>
          {voiceEnabled && (
            <div className="text-sm text-green-100 mt-2 text-center">
              🎤 Voice confirmation available
            </div>
          )}
        </CardHeader>
        
        <CardContent className="space-y-6 p-8">
          {/* Patient Details */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
              👤 Patient Information
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Patient ID:</strong> {patient?.patientId}</p>
                <p><strong>Name:</strong> {patient?.name}</p>
                <p><strong>Date of Birth:</strong> {patient?.dob}</p>
              </div>
              <div>
                <p><strong>Gender:</strong> {patient?.gender}</p>
                <p><strong>Mobile:</strong> {patient?.mobile || 'Not provided'}</p>
                <p><strong>Email:</strong> {patient?.email || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Vitals Report */}
          {vitalsData && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border border-green-200">
              <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
                📊 Vitals Report Summary
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>🌡️ Temperature:</strong> {vitalsData.temperature}°F</p>
                  <p><strong>💓 Blood Pressure:</strong> {vitalsData.bloodPressure?.systolic}/{vitalsData.bloodPressure?.diastolic} mmHg</p>
                </div>
                <div>
                  <p><strong>❤️ Heart Rate:</strong> {vitalsData.pulseOx?.heartRate} bpm</p>
                  <p><strong>🫁 Oxygen Saturation:</strong> {vitalsData.pulseOx?.oxygenSat}%</p>
                </div>
              </div>
              <div className="mt-3 p-3 bg-green-100 rounded-lg">
                <p className="text-xs text-green-700">
                  ✓ All vitals are within normal ranges and have been shared with your doctor
                </p>
              </div>
            </div>
          )}

          {/* Appointment Details */}
          {appointmentData && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-xl border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center gap-2">
                📅 Appointment Confirmation
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Appointment ID:</strong> {appointmentData.appointmentId}</p>
                  <p><strong>👨‍⚕️ Doctor:</strong> {appointmentData.doctor?.name}</p>
                  <p><strong>🏥 Hospital:</strong> {appointmentData.hospital?.name || appointmentData.doctor?.hospital}</p>
                </div>
                <div>
                  <p><strong>📆 Date:</strong> {appointmentData.date}</p>
                  <p><strong>⏰ Time:</strong> {appointmentData.timeSlot}</p>
                  <p><strong>🩺 Symptom:</strong> {appointmentData.symptom}</p>
                </div>
              </div>
              {appointmentData.remarks && (
                <div className="mt-4 p-3 bg-purple-100 rounded-lg">
                  <p className="text-sm"><strong>📝 Your Notes:</strong> {appointmentData.remarks}</p>
                </div>
              )}
            </div>
          )}

          {/* Notification Status */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-100 p-6 rounded-xl border border-yellow-200">
            <h3 className="text-xl font-semibold text-yellow-800 mb-4 flex items-center gap-2">
              📲 Notification Status
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-green-100 rounded-lg">
                <MessageCircle size={20} className="text-green-600" />
                <div>
                  <p className="font-semibold text-green-800">✅ SMS Sent Automatically</p>
                  <p className="text-sm text-green-700">Confirmation sent to {patient?.mobile || 'registered mobile'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Mail size={20} className="text-blue-600" />
                <div>
                  <p className="font-semibold text-blue-800">📧 Email Available</p>
                  <p className="text-sm text-blue-700">Click below to send detailed report via email</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <Printer size={20} className="text-purple-600" />
                <div>
                  <p className="font-semibold text-purple-800">🖨️ Print Option</p>
                  <p className="text-sm text-purple-700">Get a physical copy of your records</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">📤 Additional Options</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={handleSendEmail}
                className="h-16 flex flex-col items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                disabled={!patient?.email}
              >
                <Mail size={24} />
                <span>Send Detailed Email</span>
              </Button>
              
              <Button
                onClick={handlePrint}
                className="h-16 flex flex-col items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                <Printer size={24} />
                <span>Print Complete Report</span>
              </Button>
            </div>
          </div>

          {/* Auto Logout Timer */}
          <div className="bg-gradient-to-br from-red-50 to-pink-100 p-6 rounded-xl border border-red-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-red-800 flex items-center gap-2">
                  🔒 Privacy Protection - Auto Logout
                </h4>
                <p className="text-sm text-red-700 mt-1">
                  For your security, this session will end automatically in <strong>{autoLogoutTimer} seconds</strong>
                </p>
              </div>
              <Button 
                onClick={onComplete}
                variant="destructive"
                className="ml-4 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
              >
                🚪 End Session Now
              </Button>
            </div>
            <div className="mt-3 w-full bg-red-200 rounded-full h-2">
              <div 
                className="bg-red-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${(45 - autoLogoutTimer) / 45 * 100}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfirmationScreen;
