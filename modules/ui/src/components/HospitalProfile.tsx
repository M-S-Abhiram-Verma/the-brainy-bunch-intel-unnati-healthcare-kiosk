
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Phone, Clock, Award, Users, Bed, Calendar, Shield, Zap } from "lucide-react";

interface HospitalProfileProps {
  hospital: any;
  doctors: any[];
  onBack: () => void;
  onDoctorSelect: (doctor: any) => void;
}

const HospitalProfile: React.FC<HospitalProfileProps> = ({
  hospital,
  doctors,
  onBack,
  onDoctorSelect
}) => {
  const mockReviews = [
    {
      id: 1,
      patientName: 'Jennifer K.',
      rating: 5,
      comment: 'Excellent facility with caring staff. Clean and well-organized.',
      date: '2024-01-12',
      department: 'Emergency'
    },
    {
      id: 2,
      patientName: 'Robert S.',
      rating: 4,
      comment: 'Good medical care and modern equipment. Parking could be better.',
      date: '2024-01-10',
      department: 'Cardiology'
    },
    {
      id: 3,
      patientName: 'Lisa M.',
      rating: 5,
      comment: 'Outstanding service from admission to discharge. Highly recommend.',
      date: '2024-01-08',
      department: 'Surgery'
    }
  ];

  const facilities = [
    'Emergency Department 24/7',
    'ICU & Critical Care',
    'Operating Theaters',
    'Diagnostic Imaging',
    'Laboratory Services',
    'Pharmacy',
    'Cafeteria',
    'Parking Available'
  ];

  const accreditations = [
    'Joint Commission Accredited',
    'ISO 9001:2015 Certified',
    'NABH Accredited',
    'Green Hospital Certified'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-6xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
          <div className="flex justify-between items-center mb-4">
            <Button
              onClick={onBack}
              size="lg"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30 h-16 px-6 text-lg font-bold"
            >
              ← Back to Search
            </Button>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-6xl">{hospital.image}</div>
            <div>
              <CardTitle className="text-4xl font-bold">{hospital.name}</CardTitle>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-2">
                  <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  <span className="text-xl font-semibold">{hospital.rating}</span>
                  <span className="text-lg">({hospital.reviews} reviews)</span>
                </div>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  Established {hospital.established}
                </Badge>
                {hospital.emergency && (
                  <Badge className="bg-red-500 text-lg px-4 py-2">
                    24/7 Emergency
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <MapPin className="h-5 w-5" />
                <span className="text-lg">{hospital.address}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <Card className="p-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="h-6 w-6" />
                  Hospital Overview
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <Bed className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-blue-600">{hospital.beds}</div>
                    <div className="text-sm text-gray-600">Total Beds</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <Users className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold text-green-600">{hospital.doctors}</div>
                    <div className="text-sm text-gray-600">Specialists</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                    <Award className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <div className="text-2xl font-bold text-purple-600">{hospital.specialties.length}</div>
                    <div className="text-sm text-gray-600">Specialties</div>
                  </div>
                </div>
              </Card>

              {/* Specialties */}
              <Card className="p-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Zap className="h-6 w-6" />
                  Medical Specialties
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {hospital.specialties.map((specialty: string) => (
                    <div key={specialty} className="flex items-center gap-2 p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border">
                      <Award className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">{specialty}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Facilities */}
              <Card className="p-6">
                <h3 className="text-2xl font-bold mb-4">Facilities & Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {facilities.map((facility, index) => (
                    <div key={index} className="flex items-center gap-2 p-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Accreditations */}
              <Card className="p-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Award className="h-6 w-6" />
                  Accreditations & Certifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {accreditations.map((accreditation, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <Shield className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium">{accreditation}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Reviews */}
              <Card className="p-6">
                <h3 className="text-2xl font-bold mb-4">Patient Reviews</h3>
                <div className="space-y-4">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{review.patientName}</span>
                          <Badge variant="outline" className="text-xs">{review.department}</Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">{review.comment}</p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card className="p-6 sticky top-4">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-gray-600" />
                    <span>{hospital.phone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-gray-600 mt-1" />
                    <span className="text-sm">{hospital.address}</span>
                  </div>
                  {hospital.emergency && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-2 text-red-600 font-semibold">
                        <Clock className="h-5 w-5" />
                        24/7 Emergency Services
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Our Doctors */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Our Specialist Doctors</h3>
                <div className="space-y-4">
                  {doctors.map((doctor) => (
                    <div key={doctor.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{doctor.avatar}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{doctor.name}</h4>
                          <p className="text-sm text-blue-600">{doctor.specialization}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-semibold">{doctor.rating}</span>
                          </div>
                          <Button
                            onClick={() => onDoctorSelect(doctor)}
                            variant="outline"
                            size="sm"
                            className="mt-2 w-full"
                          >
                            <Calendar className="h-4 w-4 mr-1" />
                            Book Appointment
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HospitalProfile;
