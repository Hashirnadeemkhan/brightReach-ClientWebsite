"use client"
import React from 'react';

const ProjectPage = () => {
  const projects = [
    {
      id: 1,
      title: "Fence Masters",
      description: "Professional fencing solutions with high-quality materials and expert installation services for residential and commercial properties.",
      url: "https://fencemasters804ltd.com",
      image: "/assets/fencemaster.jpg",
      tags: ["Web Development", "E-Commerce", "SEO"],
      color: "from-emerald-600 to-teal-700"
    },
    {
      id: 2,
      title: "Angels Tyres",
      description: "Premium tyre services with expert advice and quality products for all vehicle types, offering exceptional customer service.",
      url: "https://Angelstyres.co.uk",
      image: "/assets/angels_tyres.jpg",
      tags: ["Web Design", "Booking System", "Mobile Responsive"],
      color: "from-blue-600 to-indigo-700"
    },
    {
      id: 3,
      title: "V-Class Chauffeur",
      description: "Luxury chauffeur services with premium Mercedes V-Class vehicles and professional drivers for executive travel.",
      url: "https://V-classchauffeur.com",
      image: "/assets/classchaufuer.jpg",
      tags: ["Luxury Brand", "Booking Platform", "CRM Integration"],
      color: "from-purple-600 to-pink-700"
    },
    {
      id: 4,
      title: "Car Breakdown Recovery",
      description: "24/7 roadside assistance and car recovery services for all types of vehicles with rapid response times across the region.",
      url: "https://Carbreakdownrecovery247.com",
      image: "/assets/carbreakdown.jpg",
      tags: ["Emergency Services", "Real-time Tracking", "24/7 Support"],
      color: "from-orange-600 to-red-700"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-gradient-to-r from-gradientStart/20 to-gradientEnd/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-gradient-to-r from-gradientEnd/20 to-gradientStart/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
              Our <span className="bg-gradient-to-r from-gradientStart to-gradientEnd bg-clip-text text-transparent">Portfolio</span>
            </h1>
            <p className="text-xl md:text-2xl text-gradient-to-r from-gradientStart to-gradientEnd max-w-3xl mx-auto leading-relaxed">
              Explore our collection of cutting-edge projects showcasing excellence in web development and digital solutions
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="h-1 w-20 bg-gradient-to-r from-gradientStart to-gradientEnd rounded-full"></div>
              <svg className="w-6 h-6 text-gradientStart animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <div className="h-1 w-20 bg-gradient-to-r from-gradientEnd to-gradientStart rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-12">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="group relative"
            style={{
              animation: `fadeInUp 0.8s ease-out ${index * 0.15}s both`
            }}
          >
            {/* Project Card */}
            <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 shadow-2xl hover:shadow-gradientStart/20">
              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                {/* Image Section */}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lg:w-1/2 relative overflow-hidden block cursor-pointer"
                >
                  <div className="aspect-[16/10] lg:aspect-auto lg:min-h-[500px] relative">
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-${index % 2 === 0 ? 'r' : 'l'} ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500 z-10`}></div>
                    
                    {/* Image */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Decorative Corner Element */}
                    <div className={`absolute ${index % 2 === 0 ? 'top-0 left-0' : 'top-0 right-0'} w-32 h-32 bg-gradient-to-br ${project.color} opacity-60 blur-3xl`}></div>
                  </div>
                </a>

                {/* Content Section */}
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center relative">
                  {/* Project Number */}
                  <div className="absolute top-8 right-8 text-8xl font-black text-white/5">
                    0{project.id}
                  </div>

                  <div className="relative z-10">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={`px-4 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r ${project.color} text-white shadow-lg`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
                      {project.title}
                    </h2>

                    {/* Description */}
                    <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group/btn relative overflow-hidden bg-gradient-to-r ${project.color} text-white font-bold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-gradientStart/50 hover:-translate-y-1 flex items-center justify-center gap-2`}
                      >
                        <span className="relative z-10">Visit Website</span>
                        <svg className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                      </a>

                      <button className="relative bg-slate-800/80 hover:bg-slate-700/80 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 border border-slate-700 hover:border-slate-600 flex items-center justify-center gap-2">
                        <span>Case Study</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Effect Line */}
              <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${project.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-${index % 2 === 0 ? 'left' : 'right'}`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="relative bg-gradient-to-r from-gradientStart to-gradientEnd rounded-3xl p-12 md:p-20 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:24px_24px]"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
              Partner with us to bring your vision to life with innovative solutions tailored to your business needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a
                href="/contact"
                className="group/cta relative overflow-hidden bg-white text-gradientStart hover:bg-slate-100 font-bold py-5 px-12 rounded-full transition-all duration-300 shadow-2xl hover:shadow-white/30 hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                <span className="relative z-10 text-lg">Get Started</span>
                <svg className="w-6 h-6 relative z-10 group-hover/cta:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="/service"
                className="group/cta2 bg-transparent border-2 border-white hover:bg-white hover:text-gradientStart text-white font-bold py-5 px-12 rounded-full transition-all duration-300 shadow-2xl hover:shadow-white/30 hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                <span className="text-lg">View Our Services</span>
                <svg className="w-6 h-6 group-hover/cta2:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Add keyframes for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectPage;