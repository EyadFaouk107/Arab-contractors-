import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Innovation from '../components/Innovation';
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

        <Innovation />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
