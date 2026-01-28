import React from 'react';

const ProjectPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Video Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Video 1 */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Showcase #1</h2>
              <p className="text-gray-600 mb-6">
                Discover our innovative approach to digital transformation with this featured project.
              </p>

              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <video
                  controls
                  className="w-full h-full object-contain"
                  poster="/assets/aboutHero.svg"
                >
                  <source
                    src="/assets/WhatsApp Video 2026-01-25 at 6.56.53 PM.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          {/* Video 2 */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Showcase #2</h2>
              <p className="text-gray-600 mb-6">
                See how we leverage cutting-edge technology to deliver exceptional results.
              </p>

              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <video
                  controls
                  className="w-full h-full object-contain"
                  poster="/assets/aboutHero.svg"
                >
                  <source
                    src="/assets/WhatsApp Video 2026-01-25 at 6.56.57 PM.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="bg-gradient-to-r from-gradientStart to-gradientEnd rounded-3xl p-8 md:p-12 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl mb-8 opacity-90">
              Partner with us to bring your vision to life with innovative solutions tailored to your business needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/contact"
                className="bg-white text-gradientStart hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-all duration-300"
              >
                Get Started
              </a>
              <a
                href="/services"
                className="bg-transparent border-2 border-white hover:bg-white/10 font-bold py-3 px-8 rounded-full transition-all duration-300"
              >
                View Our Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;