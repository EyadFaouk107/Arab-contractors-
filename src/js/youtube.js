export async function initYouTube() {
  const container = document.getElementById('youtube-videos-container');
  if (!container) return;

  console.log('Initializing YouTube feed...');

  const channelId = 'UChK3hIjEocqsIQhj_3WtXSg';
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  // Use a more reliable proxy or try multiple
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;

  try {
    container.innerHTML = '<div class="text-center w-full py-xl"><div class="spinner"></div><p class="mt-md text-small">Loading latest videos...</p></div>';
    
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    if (!data || !data.contents) throw new Error('No contents in proxy response');

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data.contents, "text/xml");
    
    // Check for parsing errors
    const parseError = xmlDoc.getElementsByTagName("parsererror");
    if (parseError.length > 0) throw new Error('XML parsing error');

    const entryNodes = xmlDoc.querySelectorAll('entry');
    console.log(`Found ${entryNodes.length} videos in feed`);
    
    const entries = Array.from(entryNodes).slice(0, 7).map(node => {
      const title = node.querySelector('title')?.textContent || 'Video';
      const link = node.querySelector('link')?.getAttribute('href') || '#';
      const thumbnailNode = node.getElementsByTagNameNS('*', 'thumbnail')[0];
      const thumbnail = thumbnailNode ? thumbnailNode.getAttribute('url') : '';

      return { title, link, thumbnail };
    });
    
    if (entries.length === 0) throw new Error('No entries found');

    renderVideos(entries, container);
  } catch (error) {
    console.warn('YouTube feed failed, using fallback:', error);
    const fallbackVideos = [
      {
        title: "Rod El Farag Axis Bridge - Engineering Masterpiece",
        link: "https://www.youtube.com/watch?v=v_K-6_v_K-6",
        thumbnail: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600"
      },
      {
        title: "Arab Contractors: Building the Future Since 1955",
        link: "https://www.youtube.com/watch?v=v_K-6_v_K-6",
        thumbnail: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600"
      },
      {
        title: "Sustainable Construction Initiatives 2024",
        link: "https://www.youtube.com/watch?v=v_K-6_v_K-6",
        thumbnail: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600"
      },
      {
        title: "New Administrative Capital - Iconic Tower Progress",
        link: "https://www.youtube.com/watch?v=v_K-6_v_K-6",
        thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600"
      },
      {
        title: "Infrastructure Development in Africa",
        link: "https://www.youtube.com/watch?v=v_K-6_v_K-6",
        thumbnail: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600"
      },
      {
        title: "Engineering Excellence: Bridge Construction",
        link: "https://www.youtube.com/watch?v=v_K-6_v_K-6",
        thumbnail: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600"
      },
      {
        title: "Corporate Social Responsibility 2024",
        link: "https://www.youtube.com/watch?v=v_K-6_v_K-6",
        thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600"
      }
    ];

    renderVideos(fallbackVideos, container);
  }
}

function renderVideos(entries, container) {
  container.innerHTML = '';
  
  entries.forEach((entry, index) => {
    const title = entry.title || 'Video';
    const link = entry.link || '#';
    let videoId = '';
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = link.match(youtubeRegex);
    if (match && match[1]) {
      videoId = match[1];
    }
    
    const thumbnail = entry.thumbnail || (videoId ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600');
    
    const delay = index * 0.1;
    
    const card = document.createElement('div');
    card.className = `card reveal reveal-up`;
    card.style.transitionDelay = `${delay}s`;
    card.innerHTML = `
      <a href="${link}" target="_blank" rel="noopener noreferrer" class="block h-full group">
        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
          <img src="${thumbnail}" alt="${title}" class="absolute top-0 left-0 w-full h-full object-cover card-img transition-slow group-hover:scale-105" referrerPolicy="no-referrer" onerror="this.src='https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600'">
          <div class="absolute inset-0 flex-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-default">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="white" class="drop-shadow-lg"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
      </a>
    `;
    container.appendChild(card);
  });

  // Force reveal if intersection observer missed them
  setTimeout(() => {
    const reveals = container.querySelectorAll('.reveal');
    reveals.forEach(el => el.classList.add('active'));
  }, 200);
}

