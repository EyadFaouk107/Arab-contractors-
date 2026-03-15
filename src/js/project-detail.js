/**
 * Project Detail Dynamic Loading
 */

const projectsData = {
  'rod-el-farag': {
    title: 'Rod El Farag Axis Bridge',
    subtitle: "The World's Widest Cable-Stayed Bridge",
    heroImg: 'https://www.arabcont.com/images/projects/Rod-El-Farag-Axis-1.jpg',
    overview: "The Rod El Farag Axis is one of the most important infrastructure projects in Egypt's modern history. It includes the Tahya Misr Bridge, which is the world's widest cable-stayed bridge at 67.3 meters. This massive project connects East Cairo to West Cairo, significantly reducing traffic congestion and travel time.",
    overview2: "Awarded the Guinness World Record for the widest cable-stayed bridge, it features a width of 67.3 meters and spans the Nile River with breathtaking engineering precision. The project was executed under the supervision of the Engineering Authority of the Armed Forces.",
    features: [
      'Width: 67.3 meters (Guinness World Record)',
      'Length: 540 meters (cable-stayed portion)',
      '6 lanes in each direction',
      'Pedestrian glass walkways on both sides'
    ],
    details: {
      client: 'Engineering Authority of the Armed Forces',
      location: 'Cairo, Egypt',
      sector: 'Infrastructure',
      status: 'Completed',
      year: '2019'
    },
    sideImg: 'https://www.arabcont.com/images/projects/Rod-El-Farag-Axis-2.jpg',
    gallery: [
      'https://www.arabcont.com/images/projects/Rod-El-Farag-Axis-3.jpg',
      'https://www.arabcont.com/images/projects/Rod-El-Farag-Axis-4.jpg',
      'https://www.arabcont.com/images/projects/Rod-El-Farag-Axis-5.jpg',
      'https://www.arabcont.com/images/projects/Rod-El-Farag-Axis-6.jpg'
    ]
  },
  'aswan-dam': {
    title: 'Aswan High Dam',
    subtitle: 'Iconic Hydro-electric Power Plant',
    heroImg: 'https://www.arabcont.com/images/projects/Aswan-High-Dam-1.jpg',
    overview: "The Aswan High Dam is an embankment dam built across the Nile in Aswan, Egypt, between 1960 and 1970. Its significance in the history of modern Egypt is immense, providing flood control, irrigation water, and hydroelectric power. It is considered one of the most important projects of the 20th century.",
    overview2: "The dam has had a significant effect on the economy and culture of Egypt. It created Lake Nasser, one of the world's largest reservoirs, and provides a significant portion of Egypt's electricity through its 12 turbines.",
    features: [
      'Height: 111 meters',
      'Length: 3,830 meters',
      'Reservoir capacity: 132 cubic kilometers',
      'Hydroelectric power: 2,100 megawatts'
    ],
    details: {
      client: 'Government of Egypt',
      location: 'Aswan, Egypt',
      sector: 'Energy',
      status: 'Completed',
      year: '1970'
    },
    sideImg: 'https://www.arabcont.com/images/projects/Aswan-High-Dam-2.jpg',
    gallery: [
      'https://www.arabcont.com/images/projects/Aswan-High-Dam-3.jpg',
      'https://www.arabcont.com/images/projects/Aswan-High-Dam-4.jpg',
      'https://www.arabcont.com/images/projects/Aswan-High-Dam-5.jpg'
    ]
  },
  'cairo-metro': {
    title: 'Cairo Metro Line 3',
    subtitle: 'Modern Urban Transit System',
    heroImg: 'https://www.arabcont.com/images/projects/Cairo-Metro-3-1.jpg',
    overview: "Cairo Metro Line 3 is a vital component of the city's mass transit system. The Arab Contractors, in joint venture with international partners, has been responsible for the construction of several phases, including complex underground stations and tunnels.",
    overview2: "The project uses state-of-the-art tunneling technology and station design to provide a safe, efficient, and comfortable transport solution for millions of Cairenes. It features advanced signaling and air-conditioned rolling stock.",
    features: [
      'Total length: 41.2 km (when completed)',
      'Number of stations: 34 (when completed)',
      'Advanced signaling systems',
      'Air-conditioned rolling stock'
    ],
    details: {
      client: 'National Authority for Tunnels (NAT)',
      location: 'Cairo, Egypt',
      sector: 'Transport',
      status: 'Ongoing',
      year: 'Ongoing'
    },
    sideImg: 'https://www.arabcont.com/images/projects/Cairo-Metro-3-2.jpg',
    gallery: [
      'https://www.arabcont.com/images/projects/Cairo-Metro-3-3.jpg',
      'https://www.arabcont.com/images/projects/Cairo-Metro-3-4.jpg',
      'https://www.arabcont.com/images/projects/Cairo-Metro-3-5.jpg'
    ]
  },
  'new-capital': {
    title: 'New Administrative Capital',
    subtitle: "Developing the Future of Egypt's Governance",
    heroImg: 'https://www.arabcont.com/images/projects/NAC-Gov-1.jpg',
    overview: "The Arab Contractors is a major player in the development of the New Administrative Capital. The company has constructed several key buildings in the Governmental District, including the Parliament Building and the Cabinet Building.",
    overview2: "The city is designed as a smart city, integrating advanced infrastructure and sustainable building practices. The Governmental District is a hub for Egypt's governance and administrative functions.",
    features: [
      'Smart city infrastructure',
      'Governmental district',
      'Parliament Building with iconic dome',
      'Business and financial center'
    ],
    details: {
      client: 'Administrative Capital for Urban Development',
      location: 'New Capital, Egypt',
      sector: 'Buildings',
      status: 'Ongoing',
      year: 'Ongoing'
    },
    sideImg: 'https://www.arabcont.com/images/projects/NAC-Gov-2.jpg',
    gallery: [
      'https://www.arabcont.com/images/projects/NAC-Gov-3.jpg',
      'https://www.arabcont.com/images/projects/NAC-Gov-4.jpg',
      'https://www.arabcont.com/images/projects/NAC-Gov-5.jpg'
    ]
  },
  'grand-museum': {
    title: 'Grand Egyptian Museum',
    subtitle: 'The Largest Archaeological Museum in the World',
    heroImg: 'https://www.arabcont.com/images/projects/GEM-1.jpg',
    overview: "The Grand Egyptian Museum (GEM) is a world-class cultural institution located near the Giza Pyramids. The Arab Contractors was responsible for major construction phases, including the main galleries and the conservation center.",
    overview2: "The museum is sited on 50 hectares of land and is part of a new master plan for the Giza plateau. It will house over 100,000 artifacts, including the complete Tutankhamun collection.",
    features: [
      'Total floor area: 480,000 square meters',
      'Over 100,000 artifacts',
      'Full Tutankhamun collection',
      'State-of-the-art conservation labs'
    ],
    details: {
      client: 'Ministry of Tourism and Antiquities',
      location: 'Giza, Egypt',
      sector: 'Cultural',
      status: 'Ongoing',
      year: 'Ongoing'
    },
    sideImg: 'https://www.arabcont.com/images/projects/GEM-2.jpg',
    gallery: [
      'https://www.arabcont.com/images/projects/GEM-3.jpg',
      'https://www.arabcont.com/images/projects/GEM-4.jpg',
      'https://www.arabcont.com/images/projects/GEM-5.jpg'
    ]
  },
  'bahr-el-baqar': {
    title: 'Bahr El Baqar Water Treatment Plant',
    subtitle: "World's Largest Water Treatment Plant",
    heroImg: 'https://www.arabcont.com/images/projects/Bahr-Baqar-1.jpg',
    overview: "The Bahr El Baqar plant is the world's largest water treatment facility, awarded the Guinness World Record. It treats agricultural drainage water to be reused for irrigation, reclaiming thousands of acres of land in Sinai.",
    overview2: "The plant has a capacity of 5.6 million m3 per day and uses advanced triple-stage treatment. It is a cornerstone of Egypt's water security and agricultural development strategy.",
    features: [
      'Capacity: 5.6 million m3 per day',
      'World\'s largest treatment plant (Guinness Record)',
      'Reclaims 400,000 acres of land',
      'Advanced triple-stage treatment'
    ],
    details: {
      client: 'Engineering Authority of the Armed Forces',
      location: 'Sinai, Egypt',
      sector: 'Water',
      status: 'Completed',
      year: '2021'
    },
    sideImg: 'https://www.arabcont.com/images/projects/Bahr-Baqar-2.jpg',
    gallery: [
      'https://www.arabcont.com/images/projects/Bahr-Baqar-3.jpg',
      'https://www.arabcont.com/images/projects/Bahr-Baqar-4.jpg',
      'https://www.arabcont.com/images/projects/Bahr-Baqar-5.jpg'
    ]
  },
  'fattah-aleem': {
    title: 'Al-Fattah Al-Aleem Mosque',
    subtitle: 'A Landmark of Islamic Architecture',
    heroImg: 'https://www.arabcont.com/images/projects/Fattah-Aleem-1.jpg',
    overview: "Al-Fattah Al-Aleem Mosque is one of the largest mosques in the world, located in the New Administrative Capital. It serves as a major landmark and a center for religious and cultural activities.",
    overview2: "The mosque features a massive central dome, four minarets, and can accommodate over 17,000 worshippers. It was built using high-quality materials and features intricate architectural details.",
    features: [
      'Capacity: 17,000 worshippers',
      'Four minarets, each 95 meters high',
      'Massive central dome',
      'Intricate Islamic architectural details'
    ],
    details: {
      client: 'Administrative Capital for Urban Development',
      location: 'New Capital, Egypt',
      sector: 'Buildings',
      status: 'Completed',
      year: '2019'
    },
    sideImg: 'https://www.arabcont.com/images/projects/Fattah-Aleem-2.jpg',
    gallery: [
      'https://www.arabcont.com/images/projects/Fattah-Aleem-3.jpg',
      'https://www.arabcont.com/images/projects/Fattah-Aleem-4.jpg',
      'https://www.arabcont.com/images/projects/Fattah-Aleem-5.jpg'
    ]
  },
  'borg-stadium': {
    title: 'Borg El Arab Stadium',
    subtitle: 'One of Africa\'s Largest Stadiums',
    heroImg: 'https://www.arabcont.com/images/projects/Borg-Stadium-1.jpg',
    overview: "Borg El Arab Stadium is a multi-purpose stadium in Alexandria, Egypt. It is the largest stadium in Egypt and the second largest in Africa, with a capacity of 86,000. It was built by the Arab Contractors and the Egyptian Armed Forces.",
    overview2: "The stadium is designed to international standards and features an Olympic track, modern facilities for athletes and media, and extensive parking. It is a key venue for major sporting events in the region.",
    features: [
      'Capacity: 86,000 spectators',
      'Olympic track and field facilities',
      'Modern athlete and media centers',
      'Extensive surrounding infrastructure'
    ],
    details: {
      client: 'Egyptian Armed Forces',
      location: 'Alexandria, Egypt',
      sector: 'Infrastructure',
      status: 'Completed',
      year: '2007'
    },
    sideImg: 'https://www.arabcont.com/images/projects/Borg-Stadium-2.jpg',
    gallery: [
      'https://www.arabcont.com/images/projects/Borg-Stadium-3.jpg',
      'https://www.arabcont.com/images/projects/Borg-Stadium-4.jpg'
    ]
  },
  'suez-tunnels': {
    title: 'Suez Canal Tunnels',
    subtitle: 'Strategic Links to Sinai',
    heroImg: 'https://www.arabcont.com/images/projects/Suez-Tunnels-1.jpg',
    overview: "The Suez Canal Tunnels are a series of strategic tunnels constructed under the Suez Canal to facilitate rapid transit between the Sinai Peninsula and the rest of Egypt. The Arab Contractors executed several of these tunnels using advanced TBM technology.",
    overview2: "These tunnels are vital for the development of Sinai and represent a major engineering achievement, overcoming complex geological challenges. They feature dual-lane traffic and advanced safety systems.",
    features: [
      'Advanced TBM (Tunnel Boring Machine) technology',
      'Dual-lane traffic in each direction',
      'Enhanced safety and ventilation systems',
      'Strategic connection to Sinai'
    ],
    details: {
      client: 'Engineering Authority of the Armed Forces',
      location: 'Suez Canal, Egypt',
      sector: 'Infrastructure',
      status: 'Completed',
      year: '2019'
    },
    sideImg: 'https://www.arabcont.com/images/projects/Suez-Tunnels-2.jpg',
    gallery: [
      'https://www.arabcont.com/images/projects/Suez-Tunnels-3.jpg',
      'https://www.arabcont.com/images/projects/Suez-Tunnels-4.jpg'
    ]
  }
};

export function initProjectDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');

  if (!projectId || !projectsData[projectId]) {
    // Default to Rod El Farag if no ID or invalid ID
    return;
  }

  const data = projectsData[projectId];

  // Update Hero
  const heroSection = document.querySelector('.section-dark');
  if (heroSection) {
    heroSection.style.backgroundImage = `url('${data.heroImg}')`;
  }

  const heroTitle = document.querySelector('.section-dark h1');
  if (heroTitle) {
    heroTitle.textContent = data.title;
    heroTitle.removeAttribute('data-i18n'); // Disable translation for dynamic title
  }

  const heroSubtitle = document.querySelector('.section-dark p');
  if (heroSubtitle) {
    heroSubtitle.textContent = data.subtitle;
    heroSubtitle.removeAttribute('data-i18n');
  }

  // Update Overview
  const overviewTitle = document.querySelector('.reveal-left h2');
  if (overviewTitle) overviewTitle.textContent = 'Project Overview';

  const overviewParagraphs = document.querySelectorAll('.reveal-left p.text-body');
  if (overviewParagraphs[0]) overviewParagraphs[0].textContent = data.overview;
  if (overviewParagraphs[1]) overviewParagraphs[1].textContent = data.overview2;

  // Update Features
  const featuresList = document.querySelector('.reveal-left ul');
  if (featuresList) {
    featuresList.innerHTML = data.features.map(f => `<li>• ${f}</li>`).join('');
  }

  // Update Details Card
  const detailsList = document.querySelector('.card ul');
  if (detailsList) {
    detailsList.innerHTML = `
      <li class="flex-between"><strong>Client:</strong> <span>${data.details.client}</span></li>
      <li class="flex-between"><strong>Location:</strong> <span>${data.details.location}</span></li>
      <li class="flex-between"><strong>Sector:</strong> <span>${data.details.sector}</span></li>
      <li class="flex-between"><strong>Status:</strong> <span>${data.details.status}</span></li>
      <li class="flex-between"><strong>Year:</strong> <span>${data.details.year}</span></li>
    `;
  }

  // Update Side Image
  const sideImg = document.querySelector('.reveal-right img');
  if (sideImg) {
    sideImg.src = data.sideImg;
    sideImg.alt = data.title;
    sideImg.onerror = function() {
      this.src = 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800';
    };
  }

  // Update Gallery
  const galleryContainer = document.querySelector('.grid.grid-3.gap-md');
  if (galleryContainer) {
    galleryContainer.innerHTML = data.gallery.map((img, index) => `
      <div class="reveal reveal-up overflow-hidden radius-card group cursor-pointer" style="transition-delay: ${index * 0.1}s;">
        <img src="${img}" alt="Gallery ${index + 1}" class="w-full h-full object-cover transition-slow group-hover:scale-110" referrerPolicy="no-referrer" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1503387762-592dee582a7b?w=600';">
      </div>
    `).join('');

    // Setup Lightbox
    setupLightbox(data.gallery);
  }
}

function setupLightbox(images) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  
  if (!lightbox || !lightboxImg) return;

  let currentIndex = 0;

  const openLightbox = (index) => {
    currentIndex = index;
    lightboxImg.src = images[currentIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  const showNext = (e) => {
    if (e) e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex];
  };

  const showPrev = (e) => {
    if (e) e.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex];
  };

  // Attach to gallery items
  const galleryItems = document.querySelectorAll('.grid.grid-3.gap-md .group');
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  // Close on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}
