import Link from 'next/link';
import Button from '../shared/Button';
import Image from 'next/image';
import { services } from '@/app/data/services';

const ServicesSection = ({ showLearnMore = true }) => {


  return (
    <div className="bg-gradient-to-r from-red-900 via-purple-800 to-blue-900 py-20 px-10 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h2 className="md:text-3xl text-lg font-bold mb-4">WHAT WE DO</h2>
          <h3 className="lg:text-5xl text-4xl font-bold mb-4 text-start">Our Expertise at a Glance</h3>
          <p className="text-lg mb-4">
            Partner with Bright Reach Solution and take your digital journey to the next level. Whether you need a website, app, or full-scale digital strategy, we’re here to help.
          </p>
          {showLearnMore && (
            <Link href={"/service"}>
              <button className="bg-white text-red-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300 ease-in-out transform hover:scale-105">
                Learn More
              </button>
            </Link>
          )}
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="p-6 rounded-lg shadow-lg flex flex-col lg:flex-row lg:items-start items-center justify-center w-full bg-opacity-[24%] bg-white transform transition duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex-shrink-0 lg:mb-0 lg:mr-4">
                <Image src={service.image || '/assets/default-service.png'} alt={service.title} width={200} height={200} className="rounded-lg" />
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-2 lg:text-start text-center">{service.title}</h4>
                <p className="text-sm mb-4 text-center lg:text-start">{service.description}</p>
                <div className="flex lg:justify-start lg:items-start justify-center items-center">
  <Link href={`/services/${service.slug}`}>
    {service.title === 'Animation' ? (
      <div className="mt-12">
        <Button text="Learn more" />
      </div>
    ) : service.title === 'SaaS' || service.title === 'Artificial Intelligence Optimization' || service.title === 'Google Ads' || service.title === 'Google Guarantee' || service.title === 'Shopify Development' ? (
      <div className="mt-2">
        <Button text="Learn more" />
      </div>
    ) : (
      <Button text="Learn more" />
    )}
  </Link>
</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
