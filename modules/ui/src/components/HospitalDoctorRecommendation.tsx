import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Phone, Clock, Video, User, Filter, Search, Heart, Brain, Bone, Eye, Ear } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DoctorProfile from './DoctorProfile';
import HospitalProfile from './HospitalProfile';
import AppointmentBookingForm from './AppointmentBookingForm';

interface HospitalDoctorRecommendationProps {
  selectedSymptom?: string;
  onBack: () => void;
  onBookAppointment: (doctor: any, hospital: any) => void;
}

const HospitalDoctorRecommendation: React.FC<HospitalDoctorRecommendationProps> = ({
  selectedSymptom,
  onBack,
  onBookAppointment
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSymptomFilter, setSelectedSymptomFilter] = useState(selectedSymptom || '');
  const [selectedLocality, setSelectedLocality] = useState('');
  const [consultationType, setConsultationType] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedHospital, setSelectedHospital] = useState<any>(null);
  const [viewType, setViewType] = useState<'list' | 'doctorProfile' | 'hospitalProfile' | 'appointmentBooking'>('list');
  const [bookingDoctor, setBookingDoctor] = useState<any>(null);
  const [bookingHospital, setBookingHospital] = useState<any>(null);
  const { toast } = useToast();

  const symptoms = [
    { value: 'headache', label: 'Headache', icon: Brain },
    { value: 'chest-pain', label: 'Chest Pain', icon: Heart },
    { value: 'back-pain', label: 'Back Pain', icon: Bone },
    { value: 'eye-problems', label: 'Eye Problems', icon: Eye },
    { value: 'ear-problems', label: 'Ear Problems', icon: Ear },
    { value: 'fever', label: 'Fever', icon: User }
  ];

  const localities = [
    'Connaught Place', 'Karol Bagh', 'Lajpat Nagar', 'Saket', 'Rohini', 'Dwarka', 'Gurgaon'
  ];

  const mockDoctors = [
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      specialization: 'Cardiologist',
      rating: 4.8,
      reviews: 156,
      experience: '15 years',
      hospital: 'All India Institute of Medical Sciences',
      hospitalId: 1,
      location: 'Connaught Place',
      avatar: '👩‍⚕️',
      consultationFee: 800,
      teleconsultation: true,
      inPerson: true,
      nextAvailable: '2024-01-15',
      languages: ['Hindi', 'English'],
      education: 'MBBS, MD from AIIMS Delhi',
      symptoms: ['chest-pain', 'headache', 'fever'],
      timeSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM']
    },
    {
      id: 2,
      name: 'Dr. Rajesh Kumar',
      specialization: 'Neurologist',
      rating: 4.9,
      reviews: 203,
      experience: '18 years',
      hospital: 'Fortis Healthcare',
      hospitalId: 2,
      location: 'Saket',
      avatar: '👨‍⚕️',
      consultationFee: 1200,
      teleconsultation: true,
      inPerson: true,
      nextAvailable: '2024-01-14',
      languages: ['Hindi', 'English', 'Punjabi'],
      education: 'MBBS, DM Neurology from PGI Chandigarh',
      symptoms: ['headache', 'back-pain', 'fever'],
      timeSlots: ['10:00 AM', '01:00 PM', '03:00 PM', '05:00 PM']
    },
    {
      id: 3,
      name: 'Dr. Anjali Gupta',
      specialization: 'Orthopedist',
      rating: 4.7,
      reviews: 128,
      experience: '12 years',
      hospital: 'Max Super Speciality Hospital',
      hospitalId: 3,
      location: 'Lajpat Nagar',
      avatar: '👩‍⚕️',
      consultationFee: 1000,
      teleconsultation: false,
      inPerson: true,
      nextAvailable: '2024-01-16',
      languages: ['Hindi', 'English'],
      education: 'MBBS, MS Orthopedics from Maulana Azad Medical College',
      symptoms: ['back-pain', 'headache', 'fever'],
      timeSlots: ['08:00 AM', '10:00 AM', '02:00 PM']
    },
    {
      id: 4,
      name: 'Dr. Suresh Patel',
      specialization: 'Ophthalmologist',
      rating: 4.6,
      reviews: 89,
      experience: '14 years',
      hospital: 'Apollo Hospital',
      hospitalId: 4,
      location: 'Dwarka',
      avatar: '👨‍⚕️',
      consultationFee: 900,
      teleconsultation: true,
      inPerson: true,
      nextAvailable: '2024-01-15',
      languages: ['Hindi', 'English', 'Gujarati'],
      education: 'MBBS, MS Ophthalmology from King George Medical University',
      symptoms: ['eye-problems', 'headache', 'fever'],
      timeSlots: ['09:00 AM', '11:00 AM', '03:00 PM', '05:00 PM']
    },
    {
      id: 5,
      name: 'Dr. Kavita Singh',
      specialization: 'ENT Specialist',
      rating: 4.8,
      reviews: 145,
      experience: '16 years',
      hospital: 'Safdarjung Hospital',
      hospitalId: 5,
      location: 'Karol Bagh',
      avatar: '👩‍⚕️',
      consultationFee: 700,
      teleconsultation: true,
      inPerson: true,
      nextAvailable: '2024-01-17',
      languages: ['Hindi', 'English'],
      education: 'MBBS, MS ENT from Lady Hardinge Medical College',
      symptoms: ['ear-problems', 'headache', 'fever'],
      timeSlots: ['09:30 AM', '12:00 PM', '03:30 PM', '05:30 PM']
    },
    {
      id: 6,
      name: 'Dr. Amit Verma',
      specialization: 'General Physician',
      rating: 4.5,
      reviews: 187,
      experience: '10 years',
      hospital: 'Sir Ganga Ram Hospital',
      hospitalId: 6,
      location: 'Rohini',
      avatar: '👨‍⚕️',
      consultationFee: 600,
      teleconsultation: true,
      inPerson: true,
      nextAvailable: '2024-01-13',
      languages: ['Hindi', 'English'],
      education: 'MBBS, MD General Medicine from Maulana Azad Medical College',
      symptoms: ['fever', 'headache', 'chest-pain', 'back-pain', 'eye-problems', 'ear-problems'],
      timeSlots: ['08:30 AM', '11:30 AM', '02:30 PM', '04:30 PM']
    }
  ];

  const mockHospitals = [
    {
      id: 1,
      name: 'All India Institute of Medical Sciences',
      rating: 4.9,
      reviews: 2850,
      location: 'Connaught Place',
      address: 'Ansari Nagar, New Delhi - 110029',
      phone: '+91-11-26588500',
      emergency: true,
      specialties: ['Cardiology', 'Emergency Medicine', 'Surgery', 'Neurology'],
      image: '🏥',
      established: '1956',
      beds: 2478,
      doctors: 12
    },
    {
      id: 2,
      name: 'Fortis Healthcare',
      rating: 4.7,
      reviews: 1856,
      location: 'Saket',
      address: 'B-22, Sector 62, Noida - 201301',
      phone: '+91-120-6644000',
      emergency: true,
      specialties: ['Neurology', 'Cardiology', 'Oncology'],
      image: '🧠',
      established: '2001',
      beds: 736,
      doctors: 15
    },
    {
      id: 3,
      name: 'Max Super Speciality Hospital',
      rating: 4.6,
      reviews: 1287,
      location: 'Lajpat Nagar',
      address: '1-2, Press Enclave Road, Saket, New Delhi - 110017',
      phone: '+91-11-26515050',
      emergency: true,
      specialties: ['Orthopedics', 'Sports Medicine', 'Rehabilitation'],
      image: '🦴',
      established: '2006',
      beds: 350,
      doctors: 18
    },
    {
      id: 4,
      name: 'Apollo Hospital',
      rating: 4.8,
      reviews: 2156,
      location: 'Dwarka',
      address: 'Sarita Vihar, Mathura Road, New Delhi - 110076',
      phone: '+91-11-26925858',
      emergency: true,
      specialties: ['Ophthalmology', 'Cardiology', 'Neurosurgery'],
      image: '👁️',
      established: '1996',
      beds: 695,
      doctors: 20
    },
    {
      id: 5,
      name: 'Safdarjung Hospital',
      rating: 4.4,
      reviews: 1456,
      location: 'Karol Bagh',
      address: 'Ansari Nagar West, New Delhi - 110029',
      phone: '+91-11-26165060',
      emergency: true,
      specialties: ['ENT', 'General Medicine', 'Surgery'],
      image: '🏥',
      established: '1942',
      beds: 1500,
      doctors: 10
    },
    {
      id: 6,
      name: 'Sir Ganga Ram Hospital',
      rating: 4.6,
      reviews: 1687,
      location: 'Rohini',
      address: 'Rajinder Nagar, New Delhi - 110060',
      phone: '+91-11-42251000',
      emergency: true,
      specialties: ['General Medicine', 'Surgery', 'Pediatrics'],
      image: '🏥',
      established: '1951',
      beds: 675,
      doctors: 16
    }
  ];

  // Filter doctors - now all symptoms will show all doctors (they all can handle general symptoms)
  const filteredDoctors = mockDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSymptom = !selectedSymptomFilter || selectedSymptomFilter === 'all-symptoms' || doctor.symptoms.includes(selectedSymptomFilter);
    const matchesLocality = !selectedLocality || selectedLocality === 'all-locations' || doctor.location === selectedLocality;
    const matchesConsultationType = !consultationType || consultationType === 'both-options' ||
                                  (consultationType === 'teleconsultation' && doctor.teleconsultation) ||
                                  (consultationType === 'in-person' && doctor.inPerson);
    
    return matchesSearch && matchesSymptom && matchesLocality && matchesConsultationType;
  });

  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'experience':
        return parseInt(b.experience) - parseInt(a.experience);
      case 'fee':
        return a.consultationFee - b.consultationFee;
      default:
        return 0;
    }
  });

  const handleDoctorClick = (doctor: any) => {
    setSelectedDoctor(doctor);
    setViewType('doctorProfile');
  };

  const handleHospitalClick = (hospitalId: number) => {
    const hospital = mockHospitals.find(h => h.id === hospitalId);
    setSelectedHospital(hospital);
    setViewType('hospitalProfile');
  };

  const handleBookAppointment = (doctor: any) => {
    const hospital = mockHospitals.find(h => h.id === doctor.hospitalId);
    setBookingDoctor(doctor);
    setBookingHospital(hospital);
    setViewType('appointmentBooking');
  };

  const handleConfirmAppointment = (appointmentDetails: any) => {
    onBookAppointment(appointmentDetails.doctor, appointmentDetails.hospital);
    toast({
      title: "Appointment Booked Successfully!",
      description: `Your appointment with ${appointmentDetails.doctor.name} is confirmed for ${appointmentDetails.date.toDateString()} at ${appointmentDetails.timeSlot}`,
    });
  };

  if (viewType === 'doctorProfile' && selectedDoctor) {
    return (
      <DoctorProfile
        doctor={selectedDoctor}
        hospital={mockHospitals.find(h => h.id === selectedDoctor.hospitalId)}
        onBack={() => setViewType('list')}
        onBookAppointment={handleBookAppointment}
        onViewHospital={() => handleHospitalClick(selectedDoctor.hospitalId)}
      />
    );
  }

  if (viewType === 'hospitalProfile' && selectedHospital) {
    return (
      <HospitalProfile
        hospital={selectedHospital}
        doctors={mockDoctors.filter(d => d.hospitalId === selectedHospital.id)}
        onBack={() => setViewType('list')}
        onDoctorSelect={handleDoctorClick}
      />
    );
  }

  if (viewType === 'appointmentBooking' && bookingDoctor && bookingHospital) {
    return (
      <AppointmentBookingForm
        doctor={bookingDoctor}
        hospital={bookingHospital}
        onBack={() => setViewType('list')}
        onConfirm={handleConfirmAppointment}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-7xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex justify-between items-center mb-4">
            <Button
              onClick={onBack}
              size="lg"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30 h-16 px-6 text-lg font-bold"
            >
              ← Back
            </Button>
          </div>
          <CardTitle className="text-4xl font-bold text-center flex items-center justify-center gap-4">
            🏥 Find Best Healthcare Providers
          </CardTitle>
          <p className="text-xl text-center mt-2">
            Discover top-rated doctors and hospitals near you
          </p>
        </CardHeader>
        
        <CardContent className="p-8">
          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border">
            <div className="space-y-2">
              <Label className="text-lg font-semibold flex items-center gap-2">
                <Search size={20} />
                Search
              </Label>
              <Input
                placeholder="Search doctors, hospitals, specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-lg font-semibold flex items-center gap-2">
                <Filter size={20} />
                Symptom
              </Label>
              <Select value={selectedSymptomFilter} onValueChange={setSelectedSymptomFilter}>
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue placeholder="Select symptom" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-symptoms">All Symptoms</SelectItem>
                  {symptoms.map(symptom => (
                    <SelectItem key={symptom.value} value={symptom.value}>
                      <div className="flex items-center gap-2">
                        <symptom.icon size={16} />
                        {symptom.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-lg font-semibold flex items-center gap-2">
                <MapPin size={20} />
                Location
              </Label>
              <Select value={selectedLocality} onValueChange={setSelectedLocality}>
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-locations">All Locations</SelectItem>
                  {localities.map(locality => (
                    <SelectItem key={locality} value={locality}>
                      {locality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-lg font-semibold">Consultation Type</Label>
              <Select value={consultationType} onValueChange={setConsultationType}>
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="both-options">Both Options</SelectItem>
                  <SelectItem value="teleconsultation">
                    <div className="flex items-center gap-2">
                      <Video size={16} />
                      Teleconsultation
                    </div>
                  </SelectItem>
                  <SelectItem value="in-person">
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      In-Person
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-lg font-semibold">Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                  <SelectItem value="experience">Most Experience</SelectItem>
                  <SelectItem value="fee">Lowest Fee</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Found {sortedDoctors.length} Healthcare Providers
              </h2>
            </div>

            <div className="grid gap-6">
              {sortedDoctors.map((doctor) => {
                const hospital = mockHospitals.find(h => h.id === doctor.hospitalId);
                return (
                  <Card key={doctor.id} className="p-6 hover:shadow-lg transition-shadow border-2 hover:border-blue-200">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      {/* Doctor Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start gap-4">
                          <div className="text-4xl">{doctor.avatar}</div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
                            <p className="text-lg text-blue-600 font-semibold">{doctor.specialization}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="flex items-center gap-1">
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <span className="font-semibold">{doctor.rating}</span>
                              </div>
                              <span className="text-gray-600">({doctor.reviews} reviews)</span>
                            </div>
                            <p className="text-gray-600 mt-1">{doctor.experience} experience</p>
                          </div>
                        </div>
                      </div>

                      {/* Hospital Info */}
                      <div>
                        <div className="space-y-2">
                          <button
                            onClick={() => handleHospitalClick(doctor.hospitalId)}
                            className="text-lg font-semibold text-purple-600 hover:text-purple-800 text-left"
                          >
                            {hospital?.name}
                          </button>
                          <div className="flex items-center gap-1 text-gray-600">
                            <MapPin size={16} />
                            <span>{doctor.location}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{hospital?.rating} ({hospital?.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-2">
                          {doctor.teleconsultation && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Video size={14} />
                              Online
                            </Badge>
                          )}
                          {doctor.inPerson && (
                            <Badge variant="outline" className="flex items-center gap-1">
                              <User size={14} />
                              In-Person
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            Next: {doctor.nextAvailable}
                          </div>
                          <div className="font-semibold text-green-600 mt-1">
                            ₹{doctor.consultationFee} consultation fee
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleDoctorClick(doctor)}
                            variant="outline"
                            className="flex-1"
                          >
                            View Profile
                          </Button>
                          <Button
                            onClick={() => handleBookAppointment(doctor)}
                            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600"
                          >
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {sortedDoctors.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No healthcare providers found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HospitalDoctorRecommendation;
