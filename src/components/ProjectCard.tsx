import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  location: string;
  image: string;
  date: string;
  client: string;
  details: {
    label: string;
    value: string;
  }[];
}

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -10 }}
      className="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-lg border border-zinc-100 dark:border-zinc-800 transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <button
            onClick={() => onClick(project)}
            className="bg-gold text-primary px-6 py-3 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex items-center gap-2"
          >
            View Details <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute top-4 left-4">
          <span className="bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs mb-3">
          <MapPin className="w-3 h-3 text-gold" />
          <span>{project.location}</span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-primary dark:text-white group-hover:text-gold transition-colors">
          {project.title}
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-2">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
