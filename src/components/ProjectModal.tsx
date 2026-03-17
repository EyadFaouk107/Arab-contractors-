import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, User, Briefcase } from 'lucide-react';
import { Project } from './ProjectCard';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-zinc-950 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-md"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image Section */}
          <div className="lg:w-1/2 h-64 lg:h-auto overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 p-8 sm:p-12 overflow-y-auto">
            <div className="mb-8">
              <span className="inline-block bg-gold/10 text-gold px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                {project.category}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-primary dark:text-white mb-4">
                {project.title}
              </h2>
              <div className="flex flex-wrap gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gold" />
                  <span>{project.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gold" />
                  <span>{project.client}</span>
                </div>
              </div>
            </div>

            <div className="prose prose-zinc dark:prose-invert max-w-none mb-10">
              <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
                {project.fullDescription}
              </p>
            </div>

            {/* Project Details Grid */}
            <div className="grid grid-cols-2 gap-6 p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
              {project.details.map((detail, index) => (
                <div key={index}>
                  <p className="text-xs text-zinc-400 uppercase tracking-widest mb-1">
                    {detail.label}
                  </p>
                  <p className="font-bold text-primary dark:text-white">
                    {detail.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <button
                onClick={onClose}
                className="w-full sm:w-auto bg-primary text-white dark:bg-gold dark:text-primary px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform"
              >
                Contact Us About This Project
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
