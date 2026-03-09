export async function initYouTube() {
  const container = document.getElementById('youtube-videos-container');
  if (!container) return;

  const channelId = 'UChK3hIjEocqsIQhj_3WtXSg';
  const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`)}`;

  try {
    container.innerHTML = '<div class="text-center w-full py-xl"><div class="spinner"></div><p class="mt-md text-small">Loading latest videos...</p></div>';
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch YouTube feed');
    
    const data = await response.json();
    const entries = data.items ? data.items.slice(0, 7) : [];
    
    if (entries.length === 0) {
      container.innerHTML = '<p class="text-center w-full py-xl">No videos found at the moment.</p>';
      return;
    }

    container.innerHTML = '';
    
    entries.forEach((entry, index) => {
      const title = entry.title || 'Video';
      const link = entry.link || '#';
      // Extract video ID from link (e.g., https://www.youtube.com/watch?v=VIDEO_ID)
      const videoIdMatch = link.match(/v=([^&]+)/);
      const videoId = videoIdMatch ? videoIdMatch[1] : '';
      const thumbnail = entry.thumbnail || (videoId ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600');
      const publishedStr = entry.pubDate;
      const published = publishedStr ? new Date(publishedStr).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '';
      
      const delay = index * 0.1;
      
      const card = document.createElement('div');
      card.className = `card reveal reveal-up ${index === 0 ? 'video-featured' : ''}`;
      card.style.transitionDelay = `${delay}s`;
      card.innerHTML = `
        <a href="${link}" target="_blank" rel="noopener noreferrer" class="block h-full flex flex-col group">
          <div class="relative overflow-hidden" style="padding-top: ${index === 0 ? '56.25%' : '56.25%'};">
            <img src="${thumbnail}" alt="${title}" class="absolute top-0 left-0 w-full h-full object-cover card-img transition-slow group-hover:scale-105" referrerPolicy="no-referrer" onerror="this.src='https://i.ytimg.com/vi/${videoId}/hqdefault.jpg'">
            <div class="absolute inset-0 flex-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-default">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="white" class="drop-shadow-lg"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
          <div class="card-content flex-grow flex flex-col">
            <p class="text-small text-gold mb-sm">${published}</p>
            <h3 class="text-body font-bold mb-md line-clamp-2" style="font-size: ${index === 0 ? '1.5rem' : '1.1rem'}; line-height: 1.4;">${title}</h3>
            <span class="text-small font-bold mt-auto text-primary flex items-center gap-xs">
              WATCH NOW <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </div>
        </a>
      `;
      container.appendChild(card);
    });

    // Trigger reveal animation for newly added elements
    setTimeout(() => {
      const reveals = container.querySelectorAll('.reveal');
      reveals.forEach(el => el.classList.add('active'));
    }, 100);

  } catch (error) {
    console.error('YouTube Fetch Error:', error);
    container.innerHTML = '<p class="text-center w-full py-xl text-error">Unable to load videos at this time. Please try again later.</p>';
  }
}
