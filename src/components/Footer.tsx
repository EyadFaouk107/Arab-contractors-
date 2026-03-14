import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-1 md:grid-2 lg:grid-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-white font-bold">AC</div>
              <span className="font-bold tracking-wider">ARAB CONTRACTORS</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              One of the largest and oldest construction companies in the Middle East and Africa, with roots extending back more than half a century.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              <li><a href="/about" className="hover:text-gold transition-colors">About Us</a></li>
              <li><a href="/projects" className="hover:text-gold transition-colors">Our Projects</a></li>
              <li><a href="/sectors" className="hover:text-gold transition-colors">Sectors</a></li>
              <li><a href="/news" className="hover:text-gold transition-colors">Latest News</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Contact</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              <li>34 Adly Street - Cairo, Egypt</li>
              <li>+20 2 23959500</li>
              <li>info@arabcont.com</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-gold hover:border-gold transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-gold hover:border-gold transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-gold hover:border-gold transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Arab Contractors. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
