import React from 'react';
import Image from 'next/image';

const OurProcess = () => {
  return (
    <div 
    className="bg-gradient-to-r from-red-900 via-purple-800 to-blue-900 py-20 px-10 text-white"
    style={{
      backgroundImage: 'linear-gradient(to right, #7f1d1d, #6b21a8, #1e3a8a), url("/assets/bg.png")', // Gradient and image combined
      backgroundSize: 'cover', // Make the background image cover the entire section
      backgroundPosition: 'center', // Center the image
      backgroundRepeat: 'no-repeat', // Prevent image repetition
      backgroundBlendMode: 'overlay', // Blend the gradient with the image
    }}
  >
    <div className=" text-white ">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        
        {/* Text Section */}
        <div className="flex-1">
          <h5 className="text-white lg:text-xl text-sm uppercase tracking-wide font-semibold mb-2">
          Our Expertise:
          </h5>
          <h1 className="text-4xl md:text-2xl lg:text-4xl font-bold leading-tight">
            A Streamlined Approach That <span className="text-white italic">ensures success</span>
          </h1>
          <ul className="mt-6 space-y-4 text-white">
            <li className="flex items-start">
              <span className="lg:text-2xl text-lg mr-2">✔️</span>
              <div className='text-sm lg:text-lg'>
                <strong>Custom Software Development:</strong>Creating scalable, robust, and secure software tailored to your unique business requirements.
              </div>
            </li>
            <li className="flex items-start">
              <span className=" lg:text-2xl text-lg mr-2">✔️</span>
              <div className='text-sm lg:text-lg'>
                <strong>Mobile Application Development: </strong> Designing intuitive and user-friendly mobile applications that engage customers and boost brand loyalty.

              </div>
            </li>
            <li className="flex items-start">
              <span className=" lg:text-2xl text-lg mr-2">✔️</span>
              <div className='text-sm lg:text-lg'>
                <strong>IT Consultancy:  </strong>Offering strategic guidance to optimize your IT infrastructure, streamline processes, and improve efficiency.

              </div>
            </li>
            <li className="flex items-start">
              <span className=" lg:text-2xl text-lg mr-2">✔️</span>
              <div className='text-sm lg:text-lg'>
                <strong>Digital Transformation: </strong> : Helping businesses adapt to the digital era by leveraging cutting-edge technologies and solutions

              </div>
            </li>
          
         
          </ul>
        
        </div>
        
        {/* Image Section */}
        <div className="flex-1">
          <Image 
            src="/assets/abouts-02.png" 
            alt="Streamlined Approach" 
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>

    </div>
  );
};

export default OurProcess;
