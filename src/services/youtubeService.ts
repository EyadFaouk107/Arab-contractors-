import axios from 'axios';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const CHANNEL_HANDLE = '@arabcontcompany';

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

export const fetchLatestVideos = async (limit: number = 7): Promise<YouTubeVideo[]> => {
  if (!API_KEY) {
    console.warn('YouTube API Key is missing. Please add VITE_YOUTUBE_API_KEY to your environment.');
    return [];
  }

  try {
    // 1. Get Channel ID from Handle
    const channelResponse = await axios.get(`${BASE_URL}/channels`, {
      params: {
        part: 'id,contentDetails',
        forHandle: CHANNEL_HANDLE,
        key: API_KEY,
      },
    });

    if (!channelResponse.data.items?.length) {
      throw new Error('Channel not found');
    }

    const channelId = channelResponse.data.items[0].id;
    const uploadsPlaylistId = channelResponse.data.items[0].contentDetails.relatedPlaylists.uploads;

    // 2. Get Playlist Items (Latest Uploads)
    // We fetch more than limit to allow filtering shorts
    const playlistResponse = await axios.get(`${BASE_URL}/playlistItems`, {
      params: {
        part: 'snippet,contentDetails',
        playlistId: uploadsPlaylistId,
        maxResults: 20,
        key: API_KEY,
      },
    });

    const items = playlistResponse.data.items || [];
    const videoIds = items.map((item: any) => item.contentDetails.videoId).join(',');

    // 3. Get Video Details to filter Shorts and get high-res thumbnails
    const videosResponse = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: 'snippet,contentDetails',
        id: videoIds,
        key: API_KEY,
      },
    });

    const videos = videosResponse.data.items || [];

    // 4. Filter and Map
    // Heuristic for Shorts: duration < 61s and usually vertical (but we can't easily check aspect ratio here without more calls)
    // Most Shorts are < 60s.
    const filteredVideos = videos
      .filter((video: any) => {
        const duration = video.contentDetails.duration; // ISO 8601 format like PT1M2S
        const seconds = parseISO8601Duration(duration);
        return seconds > 60; // Exclude videos 60s or less (likely Shorts)
      })
      .slice(0, limit)
      .map((video: any) => ({
        id: video.id,
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default?.url,
        publishedAt: video.snippet.publishedAt,
      }));

    return filteredVideos;
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
};

// Helper to parse ISO 8601 duration
function parseISO8601Duration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');
  return hours * 3600 + minutes * 60 + seconds;
}
