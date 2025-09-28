import React from 'react';
// import Slider from 'react-slick';


const Expertise = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-white text-black py-12 px-6 lg:mt-20 mt-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h5 className="text-red-500 uppercase tracking-wide font-semibold text-center">
            Our Expertise
          </h5>
          <h1 className="text-4xl md:text-5xl leading-tight text-center">
            Turning <span className="bg-gradient-to-r from-[#981127] via-[#652046] to-[#24346D] bg-clip-text text-transparent italic">ideas into impact</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-center">
            At <span className="font-semibold">Bright Reach Solution</span>, we specialize in creating 
            innovative digital solutions that help businesses scale and thrive. 
            Whether it’s building custom software, optimizing business processes, 
            or driving digital transformation, our team combines technical expertise 
            with strategic thinking to deliver measurable results. 
            We don’t just build technology — we craft solutions that make a difference.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Expertise;
