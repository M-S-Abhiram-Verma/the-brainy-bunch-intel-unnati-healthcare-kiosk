
import { useState, useCallback } from 'react';
import VideoGenerationService, { VideoGenerationRequest, VideoGenerationResponse } from '@/services/videoGeneration';

export const useVideoGeneration = (apiKey?: string) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [generatedVideo, setGeneratedVideo] = useState<VideoGenerationResponse | null>(null);

  const generateVideo = useCallback(async (request: VideoGenerationRequest) => {
    if (!apiKey) {
      setError('API key is required for video generation');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setProgress(0);

    try {
      const service = new VideoGenerationService(apiKey);
      const response = await service.generateVideo(request);
      
      // Poll for completion
      const pollStatus = async () => {
        const statusResponse = await service.checkStatus(response.id);
        
        if (statusResponse.progress) {
          setProgress(statusResponse.progress);
        }

        if (statusResponse.status === 'completed') {
          setGeneratedVideo(statusResponse);
          setIsGenerating(false);
          setProgress(100);
        } else if (statusResponse.status === 'failed') {
          setError('Video generation failed');
          setIsGenerating(false);
        } else {
          // Continue polling
          setTimeout(pollStatus, 2000);
        }
      };

      // Start polling
      setTimeout(pollStatus, 1000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Video generation failed');
      setIsGenerating(false);
    }
  }, [apiKey]);

  const resetGeneration = useCallback(() => {
    setIsGenerating(false);
    setProgress(0);
    setError(null);
    setGeneratedVideo(null);
  }, []);

  return {
    generateVideo,
    resetGeneration,
    isGenerating,
    progress,
    error,
    generatedVideo,
  };
};
