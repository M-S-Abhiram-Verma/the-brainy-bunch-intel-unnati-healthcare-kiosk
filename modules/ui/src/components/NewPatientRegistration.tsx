
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Mic, MicOff, User, Settings, History, Shield, Fingerprint, Eye, MessageSquare, LogOut, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewPatientRegistrationProps {
  onComplete: (patientData: any) => void;
  onBack: () => void;
  voiceEnabled: boolean;
  onVoiceToggle: () => void;
}

const NewPatientRegistration: React.FC<NewPatientRegistrationProps> = ({
  onComplete,
  onBack,
  voiceEnabled,
  onVoiceToggle
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: '',
    mobile: '',
    email: '',
    address: '',
    aadharNumber: '',
    ayushmanBharatId: '',
    emergencyContact: '',
    height: '',
    weight: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();

  const validateForm = () => {
    if (currentStep === 1) {
      if (!formData.fullName.trim()) {
        toast({
          title: "Error",
          description: "Full Name is required",
          variant: "destructive"
        });
        return false;
      }
      if (!formData.dob.trim()) {
        toast({
          title: "Error",
          description: "Date of Birth is required",
          variant: "destructive"
        });
        return false;
      }
      if (!formData.gender.trim()) {
        toast({
          title: "Error",
          description: "Gender is required",
          variant: "destructive"
        });
        return false;
      }
    } else if (currentStep === 2) {
      if (!formData.mobile.trim() || formData.mobile.length !== 10) {
        toast({
          title: "Error",
          description: "Valid 10-digit Mobile number is required",
          variant: "destructive"
        });
        return false;
      }
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        toast({
          title: "Error",
          description: "Valid Email is required",
          variant: "destructive"
        });
        return false;
      }
      if (!formData.address.trim()) {
        toast({
          title: "Error",
          description: "Address is required",
          variant: "destructive"
        });
        return false;
      }
    } else if (currentStep === 3) {
      if (!formData.aadharNumber.trim() || formData.aadharNumber.length !== 12) {
        toast({
          title: "Error",
          description: "Valid 12-digit Aadhar Number is required",
          variant: "destructive"
        });
        return false;
      }
      // Ayushman Bharat ID is optional, so no validation needed
      if (formData.ayushmanBharatId && formData.ayushmanBharatId.length !== 17) {
        toast({
          title: "Error",
          description: "Ayushman Bharat ID should be 17 characters if provided",
          variant: "destructive"
        });
        return false;
      }
      if (!formData.emergencyContact.trim() || formData.emergencyContact.length !== 10) {
        toast({
          title: "Error",
          description: "Valid Emergency Contact number is required",
          variant: "destructive"
        });
        return false;
      }
    } else if (currentStep === 4) {
      if (!formData.height.trim()) {
        toast({
          title: "Error",
          description: "Height is required",
          variant: "destructive"
        });
        return false;
      }
      if (!formData.weight.trim()) {
        toast({
          title: "Error",
          description: "Weight is required",
          variant: "destructive"
        });
        return false;
      }
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Use actual form data instead of dummy data
    const patientData = {
      patientId: `PAT${Date.now()}`, // Generate unique ID
      name: formData.fullName,
      dob: formData.dob,
      gender: formData.gender,
      mobile: formData.mobile,
      email: formData.email,
      address: formData.address,
      aadharNumber: formData.aadharNumber,
      ayushmanBharatId: formData.ayushmanBharatId,
      emergencyContact: formData.emergencyContact,
      height: parseInt(formData.height) || 170,
      weight: parseInt(formData.weight) || 70,
      bmi: calculateBMI(parseInt(formData.weight) || 70, parseInt(formData.height) || 170)
    };

    toast({
      title: "Registration Successful!",
      description: `Welcome to HealthCare Kiosk, ${formData.fullName}!`,
    });

    setTimeout(() => {
      onComplete(patientData);
    }, 2000);
  };

  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div>
              <Label htmlFor="fullName" className="text-2xl">Full Name</Label>
              <Input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-4 h-16 text-xl"
                placeholder="Enter your full name"
                autoFocus
              />
            </div>
            <div>
              <Label htmlFor="dob" className="text-2xl">Date of Birth</Label>
              <Input
                type="date"
                id="dob"
                value={formData.dob}
                onChange={handleChange}
                className="mt-4 h-16 text-xl"
              />
            </div>
            <div>
              <Label htmlFor="gender" className="text-2xl">Gender</Label>
              <select
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-4 w-full h-16 rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xl"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <Button
              onClick={() => setCurrentStep(2)}
              className="w-full h-16 text-xl font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              disabled={!formData.fullName || !formData.dob || !formData.gender}
            >
              Next: Contact Information
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8">
            <div>
              <Label htmlFor="mobile" className="text-2xl">Mobile Number</Label>
              <Input
                type="tel"
                id="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="mt-4 h-16 text-xl"
                placeholder="Enter your 10-digit mobile number"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-2xl">Email Address</Label>
              <Input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-4 h-16 text-xl"
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <Label htmlFor="address" className="text-2xl">Address</Label>
              <Input
                type="text"
                id="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-4 h-16 text-xl"
                placeholder="Enter your address"
              />
            </div>
            <div className="flex justify-between">
              <Button
                onClick={() => setCurrentStep(1)}
                variant="outline"
                size="lg"
                className="w-1/2 h-16 text-lg mr-2"
              >
                Back: Personal Details
              </Button>
              <Button
                onClick={() => setCurrentStep(3)}
                className="w-1/2 h-16 text-xl font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                disabled={!formData.mobile || !formData.email || !formData.address}
              >
                Next: Additional Information
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8">
            <div>
              <Label htmlFor="aadharNumber" className="text-2xl">Aadhar Number</Label>
              <Input
                type="text"
                id="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                className="mt-4 h-16 text-xl"
                placeholder="Enter your 12-digit Aadhar number"
              />
            </div>
            
            <div>
              <Label htmlFor="ayushmanBharatId" className="text-2xl flex items-center gap-2">
                Ayushman Bharat ID
                <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Optional</span>
              </Label>
              <Input
                type="text"
                id="ayushmanBharatId"
                value={formData.ayushmanBharatId}
                onChange={handleChange}
                className="mt-4 h-16 text-xl"
                placeholder="Enter your 17-character Ayushman Bharat ID (if available)"
              />
              <div className="mt-3 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                <div className="flex items-start gap-3">
                  <Info size={20} className="text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-green-800">Don't have an Ayushman Bharat ID?</p>
                    <p className="text-sm text-green-700 mt-1">
                      Get free healthcare coverage up to ₹5 lakhs per year! Ayushman Bharat provides cashless 
                      treatment at empaneled hospitals. You can apply online at 
                      <span className="font-semibold"> pmjay.gov.in</span> or visit your nearest Common Service Center.
                    </p>
                    <p className="text-xs text-green-600 mt-2 font-medium">
                      💡 Having this ID can significantly reduce your healthcare costs!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="emergencyContact" className="text-2xl">Emergency Contact Number</Label>
              <Input
                type="tel"
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                className="mt-4 h-16 text-xl"
                placeholder="Enter emergency contact number"
              />
            </div>
            <div className="flex justify-between">
              <Button
                onClick={() => setCurrentStep(2)}
                variant="outline"
                size="lg"
                className="w-1/2 h-16 text-lg mr-2"
              >
                Back: Contact Information
              </Button>
              <Button
                onClick={() => setCurrentStep(4)}
                className="w-1/2 h-16 text-xl font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                disabled={!formData.aadharNumber || !formData.emergencyContact}
              >
                Next: Health Information
              </Button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8">
            <div>
              <Label htmlFor="height" className="text-2xl">Height (cm)</Label>
              <Input
                type="number"
                id="height"
                value={formData.height}
                onChange={handleChange}
                className="mt-4 h-16 text-xl"
                placeholder="Enter your height in cm"
              />
            </div>
            <div>
              <Label htmlFor="weight" className="text-2xl">Weight (kg)</Label>
              <Input
                type="number"
                id="weight"
                value={formData.weight}
                onChange={handleChange}
                className="mt-4 h-16 text-xl"
                placeholder="Enter your weight in kg"
              />
            </div>
            <div className="flex justify-between">
              <Button
                onClick={() => setCurrentStep(3)}
                variant="outline"
                size="lg"
                className="w-1/2 h-16 text-lg mr-2"
              >
                Back: Additional Information
              </Button>
              <Button
                onClick={handleSubmit}
                className="w-1/2 h-16 text-xl font-semibold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                disabled={!formData.height || !formData.weight}
              >
                Complete Registration
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
      <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className={`${voiceEnabled ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-green-600 to-teal-600'} text-white rounded-t-lg`}>
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
            📝 New Patient Registration
          </CardTitle>
          <div className="flex justify-center mt-6">
            <div className="flex space-x-4">
              {[1, 2, 3, 4].map((step) => (
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
          {voiceEnabled && (
            <div className="text-center text-lg text-blue-100 mt-4">
              🎤 Voice input enabled
            </div>
          )}
        </CardHeader>
        
        <CardContent className="p-12">
          <form onSubmit={handleSubmit}>
            {renderStep()}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewPatientRegistration;
