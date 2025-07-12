
export interface VideoGenerationRequest {
  prompt: string;
  duration?: number;
  aspectRatio?: '16:9' | '9:16' | '1:1';
  model?: string;
}

export interface VideoGenerationResponse {
  id: string;
  status: 'processing' | 'completed' | 'failed';
  videoUrl?: string;
  thumbnailUrl?: string;
  progress?: number;
  estimatedTime?: number;
}

class VideoGenerationService {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, provider: 'runwayml' | 'pika' = 'runwayml') {
    this.apiKey = apiKey;
    this.baseUrl = provider === 'runwayml' 
      ? 'https://api.runwayml.com/v1'
      : 'https://api.pika.art/v1';
  }

  async generateVideo(request: VideoGenerationRequest): Promise<VideoGenerationResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/video/generate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`Video generation failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Video generation error:', error);
      throw error;
    }
  }

  async checkStatus(videoId: string): Promise<VideoGenerationResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/video/${videoId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Status check failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Status check error:', error);
      throw error;
    }
  }
}

export default VideoGenerationService;
