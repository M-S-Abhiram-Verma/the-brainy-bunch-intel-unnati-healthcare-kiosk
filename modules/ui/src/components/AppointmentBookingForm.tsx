
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, Video, User, ArrowLeft, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface AppointmentBookingFormProps {
  doctor: any;
  hospital: any;
  onBack: () => void;
  onConfirm: (appointmentDetails: any) => void;
}

const AppointmentBookingForm: React.FC<AppointmentBookingFormProps> = ({
  doctor,
  hospital,
  onBack,
  onConfirm
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [consultationType, setConsultationType] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [patientMobile, setPatientMobile] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const { toast } = useToast();

  const availableTimeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM'
  ];

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTimeSlot || !consultationType || !patientName || !patientAge || !patientGender || !patientMobile) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const appointmentDetails = {
      doctor,
      hospital,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      consultationType,
      patient: {
        name: patientName,
        age: patientAge,
        gender: patientGender,
        mobile: patientMobile
      },
      symptoms,
      fee: doctor.consultationFee
    };

    onConfirm(appointmentDetails);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex justify-between items-center mb-4">
            <Button
              onClick={onBack}
              size="lg"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30 h-16 px-6 text-lg font-bold"
            >
              <ArrowLeft size={24} className="mr-2" />
              Back
            </Button>
          </div>
          <CardTitle className="text-4xl font-bold text-center">
            📅 Book Appointment
          </CardTitle>
          <div className="text-center mt-4">
            <p className="text-xl">with {doctor.name}</p>
            <p className="text-lg">{doctor.specialization} at {hospital?.name}</p>
          </div>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Appointment Details */}
            <div className="space-y-6">
              {/* Doctor Info Summary */}
              <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{doctor.avatar}</div>
                  <div>
                    <h3 className="text-xl font-bold">{doctor.name}</h3>
                    <p className="text-lg text-blue-600">{doctor.specialization}</p>
                    <p className="text-gray-600">{hospital?.name}</p>
                    <div className="text-2xl font-bold text-green-600 mt-2">₹{doctor.consultationFee}</div>
                  </div>
                </div>
              </Card>

              {/* Consultation Type */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">Consultation Type *</Label>
                <RadioGroup value={consultationType} onValueChange={setConsultationType}>
                  {doctor.teleconsultation && (
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="teleconsultation" id="teleconsultation" />
                      <Label htmlFor="teleconsultation" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Video className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-semibold">Video Consultation</div>
                          <div className="text-sm text-gray-600">Consult from home via video call</div>
                        </div>
                      </Label>
                    </div>
                  )}
                  {doctor.inPerson && (
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="in-person" id="in-person" />
                      <Label htmlFor="in-person" className="flex items-center gap-2 cursor-pointer flex-1">
                        <User className="h-5 w-5 text-purple-600" />
                        <div>
                          <div className="font-semibold">In-Person Visit</div>
                          <div className="text-sm text-gray-600">Visit the hospital/clinic</div>
                        </div>
                      </Label>
                    </div>
                  )}
                </RadioGroup>
              </div>

              {/* Date Selection */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">Select Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-12 text-lg",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Slot Selection */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">Select Time Slot *</Label>
                <div className="grid grid-cols-3 gap-2">
                  {availableTimeSlots.map((slot) => (
                    <Button
                      key={slot}
                      onClick={() => setSelectedTimeSlot(slot)}
                      variant={selectedTimeSlot === slot ? "default" : "outline"}
                      className="h-12"
                    >
                      <Clock className="h-4 w-4 mr-1" />
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Patient Details */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">Patient Details</h3>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-lg font-semibold">Patient Name *</Label>
                  <Input
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter patient name"
                    className="h-12 text-lg mt-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-lg font-semibold">Age *</Label>
                    <Input
                      value={patientAge}
                      onChange={(e) => setPatientAge(e.target.value)}
                      placeholder="Age"
                      type="number"
                      className="h-12 text-lg mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-lg font-semibold">Gender *</Label>
                    <Select value={patientGender} onValueChange={setPatientGender}>
                      <SelectTrigger className="h-12 text-lg mt-2">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-lg font-semibold">Mobile Number *</Label>
                  <Input
                    value={patientMobile}
                    onChange={(e) => setPatientMobile(e.target.value)}
                    placeholder="Enter mobile number"
                    type="tel"
                    className="h-12 text-lg mt-2"
                  />
                </div>

                <div>
                  <Label className="text-lg font-semibold">Symptoms/Reason for Visit</Label>
                  <Input
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="Describe your symptoms (optional)"
                    className="h-12 text-lg mt-2"
                  />
                </div>
              </div>

              {/* Booking Summary */}
              <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <h4 className="text-xl font-bold mb-4">Booking Summary</h4>
                <div className="space-y-2 text-lg">
                  {selectedDate && <p><strong>Date:</strong> {format(selectedDate, "PPP")}</p>}
                  {selectedTimeSlot && <p><strong>Time:</strong> {selectedTimeSlot}</p>}
                  {consultationType && (
                    <p><strong>Type:</strong> {consultationType === 'teleconsultation' ? 'Video Consultation' : 'In-Person Visit'}</p>
                  )}
                  <p><strong>Consultation Fee:</strong> ₹{doctor.consultationFee}</p>
                </div>
                <Button
                  onClick={handleConfirmBooking}
                  className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 h-14 text-lg font-semibold"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Confirm Booking
                </Button>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentBookingForm;
