
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Video, Download, Play, AlertCircle } from "lucide-react";
import { useVideoGeneration } from '@/hooks/useVideoGeneration';
import { useToast } from "@/hooks/use-toast";

interface VideoGeneratorProps {
  apiKey?: string;
  onApiKeyChange?: (key: string) => void;
}

const VideoGenerator: React.FC<VideoGeneratorProps> = ({ apiKey, onApiKeyChange }) => {
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState('5');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16' | '1:1'>('16:9');
  const [inputApiKey, setInputApiKey] = useState(apiKey || '');
  
  const { generateVideo, resetGeneration, isGenerating, progress, error, generatedVideo } = useVideoGeneration(apiKey || inputApiKey);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please enter a description for your video",
        variant: "destructive"
      });
      return;
    }

    if (!apiKey && !inputApiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your video generation API key",
        variant: "destructive"
      });
      return;
    }

    await generateVideo({
      prompt: prompt.trim(),
      duration: parseInt(duration),
      aspectRatio,
    });
  };

  const handleDownload = () => {
    if (generatedVideo?.videoUrl) {
      const link = document.createElement('a');
      link.href = generatedVideo.videoUrl;
      link.download = `generated-video-${generatedVideo.id}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
          <Video size={28} />
          AI Video Generator
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {!apiKey && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">API Key</label>
            <Input
              type="password"
              placeholder="Enter your video generation API key"
              value={inputApiKey}
              onChange={(e) => {
                setInputApiKey(e.target.value);
                onApiKeyChange?.(e.target.value);
              }}
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              Get your API key from RunwayML or Pika Labs
            </p>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Video Description</label>
          <Input
            placeholder="Describe the video you want to generate..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full"
            disabled={isGenerating}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Duration (seconds)</label>
            <Select value={duration} onValueChange={setDuration} disabled={isGenerating}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 seconds</SelectItem>
                <SelectItem value="5">5 seconds</SelectItem>
                <SelectItem value="10">10 seconds</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Aspect Ratio</label>
            <Select value={aspectRatio} onValueChange={(value: '16:9' | '9:16' | '1:1') => setAspectRatio(value)} disabled={isGenerating}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="16:9">16:9 (Landscape)</SelectItem>
                <SelectItem value="9:16">9:16 (Portrait)</SelectItem>
                <SelectItem value="1:1">1:1 (Square)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isGenerating && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Generating video...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
            <AlertCircle size={16} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {generatedVideo && generatedVideo.videoUrl && (
          <div className="space-y-4">
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video
                controls
                className="w-full h-auto"
                poster={generatedVideo.thumbnailUrl}
              >
                <source src={generatedVideo.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleDownload} className="flex-1">
                <Download size={16} className="mr-2" />
                Download Video
              </Button>
              <Button onClick={resetGeneration} variant="outline" className="flex-1">
                Generate New Video
              </Button>
            </div>
          </div>
        )}

        <Button 
          onClick={handleGenerate} 
          disabled={isGenerating || !prompt.trim()}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
        >
          {isGenerating ? (
            <>Generating Video...</>
          ) : (
            <>
              <Play size={16} className="mr-2" />
              Generate Video
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default VideoGenerator;
