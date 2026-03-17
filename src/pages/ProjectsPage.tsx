import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, Building2, Trophy, Users, Globe } from 'lucide-react';
import ProjectCard, { Project } from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ALL_PROJECTS: Project[] = [
  {
    id: 'rod-el-farag',
    title: 'Rod El Farag Axis Bridge',
    description: "The world's widest cable-stayed bridge and a masterpiece of modern engineering.",
    fullDescription: "The Rod El Farag Axis Bridge is a monumental infrastructure project in Cairo, Egypt. It holds the Guinness World Record for the widest cable-stayed bridge in the world. Spanning the Nile, it serves as a critical link in the city's transport network, significantly reducing travel time and congestion. The project involved complex engineering challenges, including the installation of massive cable stays and the construction of large-scale support structures in the riverbed.",
    category: 'Infrastructure',
    location: 'Cairo, Egypt',
    image: 'https://www.arabcont.com/images/projects/rod-el-farag-1.jpg',
    date: '2019',
    client: 'Egyptian Government',
    details: [
      { label: 'Total Length', value: '16.7 km' },
      { label: 'Width', value: '67.3 m' },
      { label: 'Contract Value', value: '$1.2 Billion' },
      { label: 'Workforce', value: '4,000+ Engineers' }
    ]
  },
  {
    id: 'aswan-dam',
    title: 'Aswan High Dam',
    description: 'An iconic hydro-electric power plant that transformed Egypt\'s energy landscape.',
    fullDescription: "The Aswan High Dam is one of the most significant engineering feats of the 20th century. Built across the Nile in Aswan, Egypt, it provides essential water storage for agriculture and generates a substantial portion of the country's electricity. The dam's construction required the relocation of ancient monuments, including Abu Simbel, and the creation of Lake Nasser, one of the world's largest man-made reservoirs.",
    category: 'Energy',
    location: 'Aswan, Egypt',
    image: 'https://www.arabcont.com/images/projects/aswan-dam-1.jpg',
    date: '1970',
    client: 'Ministry of Electricity',
    details: [
      { label: 'Height', value: '111 m' },
      { label: 'Length', value: '3,830 m' },
      { label: 'Power Capacity', value: '2,100 MW' },
      { label: 'Material Used', value: '43 Million m³' }
    ]
  },
  {
    id: 'cairo-metro',
    title: 'Cairo Metro Line 3',
    description: 'A modern urban transit system connecting key districts of the capital.',
    fullDescription: "Cairo Metro Line 3 is a state-of-the-art underground railway system designed to alleviate urban congestion. The project features deep-level tunnels, modern stations with advanced safety systems, and high-capacity rolling stock. Arab Contractors played a leading role in the civil engineering and station construction, utilizing advanced tunnel boring machines (TBMs) to navigate the city's complex underground environment.",
    category: 'Infrastructure',
    location: 'Cairo, Egypt',
    image: 'https://www.arabcont.com/images/projects/metro-1.jpg',
    date: '2024',
    client: 'National Authority for Tunnels',
    details: [
      { label: 'Total Stations', value: '34' },
      { label: 'Tunnel Depth', value: 'Up to 30m' },
      { label: 'Daily Capacity', value: '1.5 Million' },
      { label: 'Technology', value: 'Driverless Ready' }
    ]
  },
  {
    id: 'nac-gov',
    title: 'Government District - NAC',
    description: 'The administrative heart of Egypt\'s New Administrative Capital.',
    fullDescription: "The Government District in the New Administrative Capital (NAC) is a massive urban development project. It includes the construction of ministries, administrative buildings, and the parliament house. The district is designed with a focus on sustainability, smart city technology, and modern architectural aesthetics, reflecting the future vision of Egypt's governance.",
    category: 'Buildings',
    location: 'NAC, Egypt',
    image: 'https://www.arabcont.com/images/projects/nac-1.jpg',
    date: '2023',
    client: 'Administrative Capital for Urban Development',
    details: [
      { label: 'Total Area', value: '1.5 Million m²' },
      { label: 'Buildings', value: '34 Ministries' },
      { label: 'Green Space', value: '40%' },
      { label: 'Smart Features', value: 'IoT Integrated' }
    ]
  },
  {
    id: 'bahr-baqar',
    title: 'Bahr El Baqar Treatment Plant',
    description: 'The world\'s largest water treatment plant for agricultural reuse.',
    fullDescription: "Bahr El Baqar is a record-breaking water treatment facility designed to reclaim agricultural drainage water. With a capacity of 5.6 million cubic meters per day, it is the largest of its kind globally. The treated water is used to irrigate hundreds of thousands of acres in the Sinai Peninsula, supporting food security and regional development.",
    category: 'Water',
    location: 'Port Said, Egypt',
    image: 'https://www.arabcont.com/images/projects/tunnel-1.jpg',
    date: '2021',
    client: 'Ministry of Water Resources',
    details: [
      { label: 'Daily Capacity', value: '5.6M m³' },
      { label: 'Area', value: '155 Acres' },
      { label: 'Treatment Stages', value: 'Triple Stage' },
      { label: 'Irrigation Area', value: '400k Acres' }
    ]
  },
  {
    id: 'gem-museum',
    title: 'Grand Egyptian Museum',
    description: 'The largest archaeological museum in the world, housing the treasures of Tutankhamun.',
    fullDescription: "The Grand Egyptian Museum (GEM) is a cultural landmark located near the Giza Pyramids. It is designed to be the world's premier destination for Egyptology. The project features a massive translucent stone wall, grand staircases, and specialized galleries for the complete collection of King Tutankhamun. Arab Contractors executed the complex structural and finishing works for this iconic institution.",
    category: 'Buildings',
    location: 'Giza, Egypt',
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=1200',
    date: '2024',
    client: 'Ministry of Tourism & Antiquities',
    details: [
      { label: 'Exhibition Space', value: '45,000 m²' },
      { label: 'Artifacts', value: '100,000+' },
      { label: 'Architect', value: 'Heneghan Peng' },
      { label: 'Total Area', value: '500,000 m²' }
    ]
  }
];

const CATEGORIES = ['All', 'Buildings', 'Infrastructure', 'Energy', 'Water'];

const ProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredProjects = useMemo(() => {
    return ALL_PROJECTS.filter(project => {
      const matchesFilter = activeFilter === 'All' || project.category === activeFilter;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           project.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const displayedProjects = filteredProjects.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?w=1920"
            className="w-full h-full object-cover"
            alt="Construction background"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-zinc-950" />
        </div>
        
        <div className="container relative z-10 px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-gold font-bold tracking-[0.3em] uppercase text-sm mb-4"
          >
            Our Legacy in Motion
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Landmark Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-300 max-w-2xl mx-auto text-lg"
          >
            Explore seven decades of engineering excellence that shaped the skyline of nations across the Middle East and Africa.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-zinc-50 dark:bg-zinc-900/50 border-y border-zinc-100 dark:border-zinc-800">
        <div className="container px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Trophy, label: 'Projects Completed', value: '1,200+' },
              { icon: Globe, label: 'Countries Active', value: '30+' },
              { icon: Users, label: 'Expert Engineers', value: '5,000+' },
              { icon: Building2, label: 'Years Experience', value: '70+' }
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="p-3 bg-gold/10 rounded-xl">
                  <stat.icon className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary dark:text-white">{stat.value}</p>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container px-6">
          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-8 justify-between items-center mb-16">
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                    activeFilter === cat
                      ? 'bg-gold text-primary shadow-lg shadow-gold/20'
                      : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-3 bg-zinc-100 dark:bg-zinc-900 border-none rounded-2xl focus:ring-2 focus:ring-gold transition-all text-zinc-800 dark:text-white"
              />
            </div>
          </div>

          {/* Projects Grid */}
          <AnimatePresence mode="popLayout">
            {displayedProjects.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {displayedProjects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={setSelectedProject}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="inline-block p-6 bg-zinc-50 dark:bg-zinc-900 rounded-full mb-6">
                  <Search className="w-12 h-12 text-zinc-300" />
                </div>
                <h3 className="text-xl font-bold text-zinc-500">No projects found matching your criteria.</h3>
                <button
                  onClick={() => { setActiveFilter('All'); setSearchQuery(''); }}
                  className="mt-4 text-gold font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Load More */}
          {visibleCount < filteredProjects.length && (
            <div className="mt-20 text-center">
              <button
                onClick={() => setVisibleCount(prev => prev + 3)}
                className="group inline-flex items-center gap-3 bg-primary text-white dark:bg-zinc-900 px-10 py-4 rounded-2xl font-bold hover:bg-gold hover:text-primary transition-all duration-300"
              >
                Load More Projects
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="py-20 border-t border-zinc-100 dark:border-zinc-800">
        <div className="container px-6">
          <p className="text-center text-zinc-400 text-sm uppercase tracking-[0.3em] mb-12">Trusted By Global Leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Mock client logos using text or simple shapes */}
            {['Ministry of Transport', 'National Housing', 'Petroleum Authority', 'Water Resources', 'Energy Council'].map((client, i) => (
              <div key={i} className="text-xl font-black text-zinc-400 dark:text-zinc-600 tracking-tighter italic">
                {client}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <Footer />
    </div>
  );
};

export default ProjectsPage;
