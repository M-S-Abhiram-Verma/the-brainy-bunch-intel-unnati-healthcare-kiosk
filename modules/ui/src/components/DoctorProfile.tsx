
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Phone, Clock, Video, User, Calendar, Award, BookOpen, MessageCircle, Heart } from "lucide-react";

interface DoctorProfileProps {
  doctor: any;
  hospital: any;
  onBack: () => void;
  onBookAppointment: (doctor: any) => void;
  onViewHospital: () => void;
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({
  doctor,
  hospital,
  onBack,
  onBookAppointment,
  onViewHospital
}) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  const mockReviews = [
    {
      id: 1,
      patientName: 'Sarah M.',
      rating: 5,
      comment: 'Excellent doctor! Very thorough and caring. Highly recommend.',
      date: '2024-01-10',
      verified: true
    },
    {
      id: 2,
      patientName: 'John D.',
      rating: 5,
      comment: 'Dr. Johnson explained everything clearly and made me feel comfortable.',
      date: '2024-01-08',
      verified: true
    },
    {
      id: 3,
      patientName: 'Maria L.',
      rating: 4,
      comment: 'Great experience. Professional and knowledgeable.',
      date: '2024-01-05',
      verified: true
    }
  ];

  const achievements = [
    'Board Certified in Cardiology',
    'Fellow of American College of Cardiology',
    'Best Doctor Award 2023',
    'Research Publication in NEJM'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-6xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
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
            <div className="text-6xl">{doctor.avatar}</div>
            <div>
              <CardTitle className="text-4xl font-bold">{doctor.name}</CardTitle>
              <p className="text-xl mt-2">{doctor.specialization}</p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-2">
                  <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  <span className="text-xl font-semibold">{doctor.rating}</span>
                  <span className="text-lg">({doctor.reviews} reviews)</span>
                </div>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {doctor.experience} experience
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <Card className="p-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <User className="h-6 w-6" />
                  About Dr. {doctor.name.split(' ')[1]}
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Education</h4>
                    <p className="text-gray-700">{doctor.education}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Languages</h4>
                    <div className="flex gap-2">
                      {doctor.languages.map((lang: string) => (
                        <Badge key={lang} variant="outline">{lang}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Specializes in treating</h4>
                    <div className="flex gap-2 flex-wrap">
                      {doctor.symptoms.map((symptom: string) => (
                        <Badge key={symptom} className="capitalize">{symptom.replace('-', ' ')}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Hospital Info */}
              <Card className="p-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="h-6 w-6" />
                  Hospital Information
                </h3>
                <div className="flex justify-between items-start">
                  <div>
                    <button
                      onClick={onViewHospital}
                      className="text-xl font-semibold text-purple-600 hover:text-purple-800 mb-2"
                    >
                      {hospital?.name}
                    </button>
                    <p className="text-gray-600 mb-2">{hospital?.address}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{hospital?.rating}</span>
                      <span className="text-gray-600">({hospital?.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} />
                      <span>{hospital?.phone}</span>
                    </div>
                  </div>
                  <Button onClick={onViewHospital} variant="outline">
                    View Hospital Details
                  </Button>
                </div>
              </Card>

              {/* Achievements */}
              <Card className="p-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Award className="h-6 w-6" />
                  Achievements & Certifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <Award className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium">{achievement}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Reviews */}
              <Card className="p-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <MessageCircle className="h-6 w-6" />
                  Patient Reviews
                </h3>
                <div className="space-y-4">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{review.patientName}</span>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">Verified</Badge>
                          )}
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

            {/* Booking Sidebar */}
            <div className="space-y-6">
              <Card className="p-6 sticky top-4">
                <h3 className="text-xl font-bold mb-4">Book Appointment</h3>
                
                <div className="space-y-4">
                  <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-600">₹{doctor.consultationFee}</div>
                    <div className="text-sm text-gray-600">Consultation Fee</div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Consultation Options</h4>
                    <div className="space-y-2">
                      {doctor.teleconsultation && (
                        <div className="flex items-center gap-2 p-3 border rounded-lg">
                          <Video className="h-5 w-5 text-blue-600" />
                          <span>Video Consultation</span>
                        </div>
                      )}
                      {doctor.inPerson && (
                        <div className="flex items-center gap-2 p-3 border rounded-lg">
                          <User className="h-5 w-5 text-purple-600" />
                          <span>In-Person Visit</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Available Time Slots</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {doctor.timeSlots.map((slot: string) => (
                        <Button
                          key={slot}
                          onClick={() => setSelectedTimeSlot(slot)}
                          variant={selectedTimeSlot === slot ? "default" : "outline"}
                          className="text-sm"
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="h-5 w-5 text-gray-600" />
                      <span className="text-sm text-gray-600">Next Available: {doctor.nextAvailable}</span>
                    </div>
                    <Button
                      onClick={() => onBookAppointment(doctor)}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 h-12 text-lg font-semibold"
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      Book Appointment
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-3">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Heart className="h-4 w-4 mr-2" />
                    Save to Favorites
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Ask a Question
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorProfile;
