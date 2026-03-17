import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Innovation from '../components/Innovation';
import { VideoSlider } from '../components/VideoSlider';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Navbar />
      <main>
        <Hero />
        
        {/* Other sections could go here */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Our Legacy of Excellence</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              With over 70 years of experience, we have shaped the skyline of cities across the Middle East and Africa.
            </p>
          </div>
        </section>

        {/* Video Slider Section */}
        <section className="py-20 bg-zinc-50 dark:bg-zinc-950">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Latest from Our Channel</h2>
              <p className="text-zinc-500 max-w-2xl mx-auto">
                Stay updated with our latest projects, innovations, and corporate news directly from our official YouTube channel.
              </p>
            </div>
            <VideoSlider />
          </div>
        </section>

        <Innovation />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
