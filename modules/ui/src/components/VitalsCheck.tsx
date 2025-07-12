
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import { ArrowLeft, ArrowRight, Activity, Thermometer, Heart, Home, Mic, MicOff, Printer, Mail, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VitalsCheckProps {
  patient: any;
  onComplete: (vitalsData: any) => void;
  onBack: () => void;
  onBackToHome: () => void;
  voiceEnabled: boolean;
  onVoiceToggle: () => void;
}

const VitalsCheck: React.FC<VitalsCheckProps> = ({
  patient,
  onComplete,
  onBack,
  onBackToHome,
  voiceEnabled,
  onVoiceToggle
}) => {
  const [currentVital, setCurrentVital] = useState(0);
  const [vitalsData, setVitalsData] = useState({
    temperature: null as number | null,
    bloodPressure: { systolic: null as number | null, diastolic: null as number | null },
    pulseOx: { heartRate: null as number | null, oxygenSat: null as number | null },
    height: null as number | null,
    weight: null as number | null,
    bmi: null as number | null
  });
  const [isChecking, setIsChecking] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [readingStarted, setReadingStarted] = useState(false);
  const [completedReadings, setCompletedReadings] = useState<boolean[]>([false, false, false, false]);
  const [showHeightInput, setShowHeightInput] = useState(false);
  const [heightInput, setHeightInput] = useState('');
  const [showBMICalculation, setShowBMICalculation] = useState(false);
  const { toast } = useToast();

  const vitals = [
    {
      name: 'Temperature',
      icon: <Thermometer size={40} />,
      instruction: 'Please place the digital thermometer on your forehead and hold steady',
      detailedInstructions: [
        'Ensure the thermometer is clean and ready',
        'Place it gently on the center of your forehead',
        'Hold the thermometer steady against your skin',
        'Wait for the digital reading to appear'
      ],
      unit: '°F',
      field: 'temperature',
      videoPlaceholder: 'forehead-temperature-check.mp4'
    },
    {
      name: 'Blood Pressure',
      icon: <Activity size={40} />,
      instruction: 'Please insert your arm into the blood pressure cuff and remain still',
      detailedInstructions: [
        'Sit comfortably with your back supported',
        'Place your arm in the cuff at heart level',
        'Keep your arm still and relaxed',
        'Breathe normally during measurement'
      ],
      unit: 'mmHg',
      field: 'bloodPressure',
      videoPlaceholder: 'bp-check.mp4'
    },
    {
      name: 'Pulse Oximeter',
      icon: <Heart size={40} />,
      instruction: 'Please place your index finger on the pulse oximeter sensor',
      detailedInstructions: [
        'Clean your finger if needed',
        'Insert finger completely into the sensor',
        'Keep your hand still and relaxed',
        'Wait for stable readings'
      ],
      unit: 'bpm / %',
      field: 'pulseOx',
      videoPlaceholder: 'pulse-ox-check.mp4'
    },
    {
      name: 'Weight Measurement',
      icon: <Activity size={40} />,
      instruction: 'Please step on the scale and stand straight for weight measurement',
      detailedInstructions: [
        'Remove shoes and heavy clothing',
        'Step on the center of the scale',
        'Stand straight with feet together',
        'Keep still until measurement is complete'
      ],
      unit: 'kg',
      field: 'weight',
      videoPlaceholder: 'weight-check.mp4'
    }
  ];

  const calculateBMI = (height: number, weight: number, age?: number) => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return parseFloat(bmi.toFixed(1));
  };

  const getBMIStatus = (bmi: number, age?: number) => {
    // Standard BMI categories for adults
    if (bmi < 18.5) return { status: 'Underweight', color: 'text-orange-600', description: 'Below normal weight range' };
    if (bmi >= 18.5 && bmi <= 24.9) return { status: 'Normal', color: 'text-green-600', description: 'Healthy weight range' };
    if (bmi >= 25 && bmi <= 29.9) return { status: 'Overweight', color: 'text-orange-600', description: 'Above normal weight range' };
    return { status: 'Obese', color: 'text-red-600', description: 'Significantly above normal weight range' };
  };

  const simulateReading = () => {
    setIsChecking(true);
    setReadingStarted(true);
    
    setTimeout(() => {
      const vital = vitals[currentVital];
      let newVitalsData = { ...vitalsData };
      
      switch (vital.field) {
        case 'temperature':
          newVitalsData.temperature = parseFloat((Math.random() * (100.4 - 97.0) + 97.0).toFixed(1));
          break;
        case 'bloodPressure':
          newVitalsData.bloodPressure = {
            systolic: Math.floor(Math.random() * (140 - 110) + 110),
            diastolic: Math.floor(Math.random() * (90 - 70) + 70)
          };
          break;
        case 'pulseOx':
          newVitalsData.pulseOx = {
            heartRate: Math.floor(Math.random() * (100 - 60) + 60),
            oxygenSat: Math.floor(Math.random() * (100 - 95) + 95)
          };
          break;
        case 'weight':
          newVitalsData.weight = Math.floor(Math.random() * (80 - 60) + 60);
          break;
      }
      
      setVitalsData(newVitalsData);
      setIsChecking(false);
      
      // Mark this reading as completed
      const newCompletedReadings = [...completedReadings];
      newCompletedReadings[currentVital] = true;
      setCompletedReadings(newCompletedReadings);
      
      // Show height input after weight measurement
      if (vital.field === 'weight') {
        setShowHeightInput(true);
      }
      
      toast({
        title: "Reading Complete!",
        description: `${vital.name} recorded successfully`,
      });
    }, 4000);
  };

  const handleHeightInput = () => {
    const height = parseFloat(heightInput);
    if (height && height > 0) {
      const newVitalsData = { ...vitalsData, height };
      setVitalsData(newVitalsData);
      setShowBMICalculation(true);
      toast({
        title: "Height Recorded!",
        description: `Height: ${height} cm`,
      });
    }
  };

  const handleSkipHeight = () => {
    setShowHeightInput(false);
    setShowBMICalculation(false);
  };

  const handleCalculateBMI = () => {
    if (vitalsData.weight && vitalsData.height) {
      const bmi = calculateBMI(vitalsData.height, vitalsData.weight);
      const newVitalsData = { ...vitalsData, bmi };
      setVitalsData(newVitalsData);
      setShowBMICalculation(false);
      
      const bmiStatus = getBMIStatus(bmi);
      toast({
        title: "BMI Calculated!",
        description: `BMI: ${bmi} - ${bmiStatus.status}`,
      });
    }
  };

  const handleNext = () => {
    if (currentVital < vitals.length - 1) {
      setCurrentVital(currentVital + 1);
      setReadingStarted(false);
      setShowHeightInput(false);
      setShowBMICalculation(false);
    } else {
      // All vitals complete - show completion options
      const finalVitals = {
        ...vitalsData,
        timestamp: new Date().toISOString()
      };
      setVitalsData(finalVitals);
      setShowCompletion(true);
    }
  };

  const handlePrevious = () => {
    if (currentVital > 0) {
      setCurrentVital(currentVital - 1);
      setReadingStarted(false);
      setShowHeightInput(false);
      setShowBMICalculation(false);
    }
  };

  const handleSendSMS = () => {
    toast({
      title: "SMS Sent!",
      description: `Vitals report sent to ${patient.mobile || 'registered mobile number'}`,
    });
  };

  const handleSendEmail = () => {
    toast({
      title: "Email Sent!",
      description: `Vitals report sent to ${patient.email || 'registered email address'}`,
    });
  };

  const handlePrint = () => {
    window.print();
    toast({
      title: "Printing...",
      description: "Vitals report is being printed",
    });
  };

  const handleBookAppointment = () => {
    onComplete(vitalsData);
  };

  if (showCompletion) {
    const bmiStatus = vitalsData.bmi ? getBMIStatus(vitalsData.bmi) : { status: 'Not calculated', color: 'text-gray-600', description: 'Height not provided' };
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className={`${voiceEnabled ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-green-600 to-emerald-600'} text-white rounded-t-lg`}>
            <div className="flex justify-between items-start mb-6">
              <Button
                onClick={onBackToHome}
                size="lg"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 h-20 px-8 text-xl font-bold"
              >
                <Home size={32} className="mr-3" />
                Back to Home
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
            <CardTitle className="text-4xl font-bold text-center">
              ✅ Vitals Check Complete!
            </CardTitle>
            {voiceEnabled && (
              <p className="text-center text-lg mt-4 bg-white/20 p-3 rounded-lg">
                🎤 Voice commands active - Say "Send SMS", "Send Email", "Print Report", or "Book Appointment"
              </p>
            )}
          </CardHeader>
          
          <CardContent className="p-12 space-y-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-xl border border-green-200">
              <h3 className="text-2xl font-semibold text-green-800 mb-6">📊 Your Complete Vitals Summary</h3>
              <div className="grid grid-cols-2 gap-6 text-lg">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-gray-700 font-medium">🌡️ Temperature:</p>
                    <p className="font-bold text-2xl text-green-700">{vitalsData.temperature ? `${vitalsData.temperature}°F` : 'Not recorded'}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-gray-700 font-medium">💓 Blood Pressure:</p>
                    <p className="font-bold text-2xl text-green-700">
                      {vitalsData.bloodPressure?.systolic && vitalsData.bloodPressure?.diastolic 
                        ? `${vitalsData.bloodPressure.systolic}/${vitalsData.bloodPressure.diastolic} mmHg` 
                        : 'Not recorded'}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-gray-700 font-medium">❤️ Heart Rate:</p>
                    <p className="font-bold text-2xl text-green-700">{vitalsData.pulseOx?.heartRate ? `${vitalsData.pulseOx.heartRate} bpm` : 'Not recorded'}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-gray-700 font-medium">🫁 Oxygen Saturation:</p>
                    <p className="font-bold text-2xl text-green-700">{vitalsData.pulseOx?.oxygenSat ? `${vitalsData.pulseOx.oxygenSat}%` : 'Not recorded'}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-gray-700 font-medium">⚖️ Weight:</p>
                  <p className="font-bold text-xl text-green-700">{vitalsData.weight ? `${vitalsData.weight} kg` : 'Not recorded'}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-gray-700 font-medium">📏 Height:</p>
                  <p className="font-bold text-xl text-green-700">{vitalsData.height ? `${vitalsData.height} cm` : 'Not provided'}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-gray-700 font-medium">📊 BMI:</p>
                  <p className="font-bold text-xl">
                    {vitalsData.bmi ? (
                      <>
                        <span className="text-green-700">{vitalsData.bmi}</span>
                        <br />
                        <span className={`text-sm ${bmiStatus.color}`}>({bmiStatus.status})</span>
                      </>
                    ) : 'Not calculated'}
                  </p>
                </div>
              </div>
              
              {vitalsData.bmi && (
                <div className={`mt-4 p-4 rounded-lg ${bmiStatus.color === 'text-green-600' ? 'bg-green-100' : bmiStatus.color === 'text-orange-600' ? 'bg-orange-100' : 'bg-red-100'}`}>
                  <p className={`text-sm font-medium ${bmiStatus.color}`}>
                    📋 BMI Status: {bmiStatus.description}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800">📤 Share Your Vitals Report</h3>
              
              <div className="grid grid-cols-3 gap-6">
                <Button
                  onClick={handleSendSMS}
                  className="h-20 flex flex-col items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-lg font-semibold"
                >
                  <MessageCircle size={32} />
                  <span>Send SMS</span>
                </Button>
                
                <Button
                  onClick={handleSendEmail}
                  className="h-20 flex flex-col items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-lg font-semibold"
                  disabled={!patient?.email}
                >
                  <Mail size={32} />
                  <span>Send Email</span>
                </Button>
                
                <Button
                  onClick={handlePrint}
                  className="h-20 flex flex-col items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-lg font-semibold"
                >
                  <Printer size={32} />
                  <span>Print Report</span>
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800">🔄 What's Next?</h3>
              <div className="grid grid-cols-2 gap-6">
                <Button
                  onClick={onBackToHome}
                  variant="outline"
                  className="h-20 flex flex-col items-center gap-3 bg-gradient-to-r from-gray-50 to-slate-100 hover:from-gray-100 hover:to-slate-200 text-lg font-semibold"
                >
                  <Home size={32} />
                  <span>Return to Home</span>
                </Button>
                
                <Button
                  onClick={handleBookAppointment}
                  className="h-20 flex flex-col items-center gap-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-lg font-semibold"
                >
                  <Calendar size={32} />
                  <span>Book Appointment</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentVitalData = vitals[currentVital];
  const hasReading = completedReadings[currentVital] && vitalsData[currentVitalData.field as keyof typeof vitalsData];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-5xl shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className={`${voiceEnabled ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-green-600 to-teal-600'} text-white rounded-t-lg`}>
          <div className="flex justify-between items-start mb-6">
            <Button
              onClick={onBackToHome}
              size="lg"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30 h-20 px-8 text-xl font-bold"
            >
              <Home size={32} className="mr-3" />
              Back to Home
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
          <CardTitle className="text-3xl font-bold text-center">
            🔘 Vitals Check
          </CardTitle>
          <p className="text-center text-xl mt-2">
            Patient: {patient?.name || patient?.patientId}
          </p>
          <div className="flex justify-center mt-6">
            <div className="flex space-x-4">
              {vitals.map((_, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold
                    ${completedReadings[index] ? 'bg-green-500 text-white' : 
                      currentVital === index ? 'bg-white text-green-600' : 'bg-white/30 text-white/70'}`}
                >
                  {completedReadings[index] ? '✓' : index + 1}
                </div>
              ))}
            </div>
          </div>
          {voiceEnabled && (
            <div className="text-center text-lg mt-4 bg-white/20 p-3 rounded-lg">
              🎤 Voice guidance enabled - Say "Start check", "Next", or "Previous"
            </div>
          )}
        </CardHeader>
        
        <CardContent className="p-10">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Instructions Section */}
            <div className="space-y-8">
              <div className="flex justify-center">
                {currentVitalData.icon}
              </div>
              
              <h3 className="text-3xl font-semibold text-center">{currentVitalData.name}</h3>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-xl border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-4">
                  📋 Instructions
                </h4>
                <p className="text-blue-700 mb-6 text-lg">{currentVitalData.instruction}</p>
                <ul className="space-y-3">
                  {currentVitalData.detailedInstructions.map((instruction, index) => (
                    <li key={index} className="text-blue-600 flex items-start gap-3 text-lg">
                      <span className="text-blue-500 text-xl">•</span>
                      {instruction}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Video/Sensor Section */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-gray-100 to-slate-200 p-10 rounded-xl border border-gray-300 h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-6">📹</div>
                  <p className="text-gray-600 font-semibold text-xl">Instructional Video</p>
                  <p className="text-gray-500 mt-3 text-lg">{currentVitalData.videoPlaceholder}</p>
                  <div className="mt-6 w-full bg-gray-300 h-3 rounded-full">
                    <div className="bg-blue-500 h-3 rounded-full w-0 animate-pulse"></div>
                  </div>
                </div>
              </div>

              {!hasReading && !isChecking && !showHeightInput && !showBMICalculation && (
                <Button 
                  onClick={simulateReading}
                  className="w-full h-20 text-xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  🔍 Start {currentVitalData.name} Check
                </Button>
              )}
              
              {isChecking && (
                <div className="space-y-6 text-center">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-green-600"></div>
                  </div>
                  <p className="text-xl text-green-600 font-bold">Taking reading...</p>
                  <p className="text-gray-600 text-lg">Please remain still</p>
                </div>
              )}
              
              {hasReading && !showHeightInput && !showBMICalculation && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-xl border border-green-200">
                  <h4 className="text-xl font-bold text-green-800 mb-4 text-center">✅ Reading Complete!</h4>
                  {currentVitalData.field === 'temperature' && vitalsData.temperature && (
                    <p className="text-4xl font-bold text-green-700 text-center">
                      {vitalsData.temperature}°F
                    </p>
                  )}
                  {currentVitalData.field === 'bloodPressure' && vitalsData.bloodPressure.systolic && vitalsData.bloodPressure.diastolic && (
                    <p className="text-4xl font-bold text-green-700 text-center">
                      {vitalsData.bloodPressure.systolic}/{vitalsData.bloodPressure.diastolic} mmHg
                    </p>
                  )}
                  {currentVitalData.field === 'pulseOx' && vitalsData.pulseOx.heartRate && vitalsData.pulseOx.oxygenSat && (
                    <div className="space-y-2 text-center">
                      <p className="text-3xl font-bold text-green-700">
                        Heart Rate: {vitalsData.pulseOx.heartRate} bpm
                      </p>
                      <p className="text-3xl font-bold text-green-700">
                        Oxygen Sat: {vitalsData.pulseOx.oxygenSat}%
                      </p>
                    </div>
                  )}
                  {currentVitalData.field === 'weight' && vitalsData.weight && (
                    <div className="space-y-3 text-center">
                      <p className="text-4xl font-bold text-green-700">
                        Weight: {vitalsData.weight} kg
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Height Input Section */}
              {showHeightInput && !showBMICalculation && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-xl border border-blue-200">
                  <h4 className="text-xl font-bold text-blue-800 mb-4 text-center">📏 Enter Your Height (Optional)</h4>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="height" className="text-lg font-medium">Height (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder="Enter height in cm"
                        value={heightInput}
                        onChange={(e) => setHeightInput(e.target.value)}
                        className="text-lg h-12 mt-2"
                      />
                    </div>
                    <div className="flex gap-4">
                      <Button
                        onClick={handleHeightInput}
                        className="flex-1 h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                        disabled={!heightInput || parseFloat(heightInput) <= 0}
                      >
                        Save Height
                      </Button>
                      <Button
                        onClick={handleSkipHeight}
                        variant="outline"
                        className="flex-1 h-12"
                      >
                        Skip Height
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* BMI Calculation Section */}
              {showBMICalculation && (
                <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-xl border border-purple-200">
                  <h4 className="text-xl font-bold text-purple-800 mb-4 text-center">📊 Calculate BMI</h4>
                  <div className="space-y-4 text-center">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Weight</p>
                        <p className="text-2xl font-bold text-purple-700">{vitalsData.weight} kg</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Height</p>
                        <p className="text-2xl font-bold text-purple-700">{vitalsData.height} cm</p>
                      </div>
                    </div>
                    <Button
                      onClick={handleCalculateBMI}
                      className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                    >
                      Calculate BMI
                    </Button>
                  </div>
                </div>
              )}

              {/* BMI Result Display */}
              {vitalsData.bmi && currentVitalData.field === 'weight' && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-xl border border-green-200">
                  <h4 className="text-xl font-bold text-green-800 mb-4 text-center">📊 BMI Result</h4>
                  <div className="text-center space-y-3">
                    <p className="text-4xl font-bold text-green-700">
                      BMI: {vitalsData.bmi}
                    </p>
                    <p className={`text-xl font-semibold ${getBMIStatus(vitalsData.bmi).color}`}>
                      {getBMIStatus(vitalsData.bmi).status}
                    </p>
                    <p className="text-sm text-gray-600">
                      {getBMIStatus(vitalsData.bmi).description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-between mt-10">
            <Button 
              onClick={currentVital === 0 ? onBack : handlePrevious}
              variant="outline"
              size="lg"
              className="flex items-center gap-3 h-16 px-8 text-lg font-semibold"
            >
              <ArrowLeft size={24} />
              {currentVital === 0 ? 'Back to Services' : 'Previous'}
            </Button>
            
            {(hasReading || (currentVitalData.field === 'weight' && vitalsData.weight && !showHeightInput && !showBMICalculation)) && (
              <Button 
                onClick={handleNext}
                size="lg"
                className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 h-16 px-8 text-lg font-semibold"
              >
                {currentVital === vitals.length - 1 ? 'Complete Vitals Check' : 'Next Vital'}
                <ArrowRight size={24} />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VitalsCheck;
