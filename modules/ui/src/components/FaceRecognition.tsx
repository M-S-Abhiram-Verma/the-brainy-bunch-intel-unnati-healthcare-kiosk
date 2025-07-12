
import React, { useRef, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScanFace, Webcam, X, RotateCcw } from "lucide-react";

interface FaceRecognitionProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const FaceRecognition: React.FC<FaceRecognitionProps> = ({ onSuccess, onCancel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string>('');
  const [noFaceDetected, setNoFaceDetected] = useState(false);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setError('');
    } catch (err) {
      setError('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const detectFace = () => {
    setScanning(true);
    setNoFaceDetected(false);
    setFaceDetected(false);

    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);

        // Get image data to analyze
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // Simple face detection based on analyzing pixel patterns
        // In a real app, you'd use a proper face detection library like face-api.js
        const hasMovement = analyzeForFacePattern(imageData);
        
        setTimeout(() => {
          setScanning(false);
          
          if (hasMovement) {
            setFaceDetected(true);
            setNoFaceDetected(false);
          } else {
            setFaceDetected(false);
            setNoFaceDetected(true);
          }
        }, 2000);
      }
    }
  };

  // Basic face detection simulation - checks for varied pixel patterns
  const analyzeForFacePattern = (imageData: ImageData) => {
    const data = imageData.data;
    let varianceSum = 0;
    let pixelCount = 0;
    
    // Sample every 10th pixel to check for variation (indicates presence of features)
    for (let i = 0; i < data.length; i += 40) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Calculate luminance
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      varianceSum += luminance;
      pixelCount++;
    }
    
    const averageLuminance = varianceSum / pixelCount;
    
    // Check if there's enough variation and brightness to suggest a face
    // This is a very basic check - real face detection would be much more sophisticated
    return averageLuminance > 50 && averageLuminance < 200 && pixelCount > 1000;
  };

  const handleCapture = () => {
    setCapturing(true);
    
    // Simulate authentication process
    setTimeout(() => {
      stopCamera();
      onSuccess();
    }, 2000);
  };

  const handleTryAgain = () => {
    setFaceDetected(false);
    setCapturing(false);
    setNoFaceDetected(false);
    detectFace();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4 p-6 bg-white">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold flex items-center gap-2">
            <ScanFace className="text-purple-600" />
            Face Recognition
          </h3>
          <Button onClick={onCancel} variant="ghost" size="sm">
            <X size={24} />
          </Button>
        </div>

        {error ? (
          <div className="text-center p-8">
            <div className="text-red-600 mb-4 text-lg">{error}</div>
            <Button onClick={startCamera} className="bg-purple-600 hover:bg-purple-700">
              Try Again
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-80 object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />
              
              {scanning && (
                <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                  <div className="bg-white/90 px-6 py-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                      <span className="text-blue-600 font-semibold">Scanning for face...</span>
                    </div>
                  </div>
                </div>
              )}

              {capturing && (
                <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                  <div className="bg-white/90 px-6 py-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
                      <span className="text-green-600 font-semibold">Authenticating...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="text-center space-y-4">
              {!faceDetected && !capturing && !scanning && !noFaceDetected && (
                <>
                  <p className="text-lg text-gray-600">
                    Position your face in the center of the camera
                  </p>
                  <p className="text-purple-600 font-medium">
                    👀 Look directly into the camera for face recognition
                  </p>
                  <Button 
                    onClick={detectFace}
                    className="bg-purple-600 hover:bg-purple-700 h-12 px-8 text-lg"
                  >
                    <Webcam className="mr-2" />
                    Start Face Recognition
                  </Button>
                </>
              )}

              {scanning && (
                <div className="text-blue-600 font-semibold text-lg">
                  🔍 Scanning for your face...
                </div>
              )}

              {noFaceDetected && !scanning && (
                <div className="space-y-4">
                  <div className="text-red-600 font-semibold text-lg">
                    ❌ No face detected!
                  </div>
                  <p className="text-orange-600 font-medium">
                    Please position your face clearly in front of the camera and try again
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button 
                      onClick={detectFace}
                      className="bg-purple-600 hover:bg-purple-700 h-12 px-8 text-lg"
                    >
                      <RotateCcw className="mr-2" />
                      Scan Again
                    </Button>
                  </div>
                </div>
              )}

              {faceDetected && !capturing && (
                <div className="space-y-4">
                  <div className="text-green-600 font-semibold text-lg">
                    ✅ Face detected successfully!
                  </div>
                  <div className="flex gap-4 justify-center">
                    <Button 
                      onClick={handleCapture}
                      className="bg-green-600 hover:bg-green-700 h-12 px-8 text-lg"
                    >
                      Authenticate
                    </Button>
                    <Button 
                      onClick={handleTryAgain}
                      variant="outline"
                      className="h-12 px-8 text-lg"
                    >
                      Try Again
                    </Button>
                  </div>
                </div>
              )}

              {capturing && (
                <div className="text-blue-600 font-semibold text-lg">
                  🔄 Processing authentication...
                </div>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default FaceRecognition;
