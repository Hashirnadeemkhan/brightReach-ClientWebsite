import Link from 'next/link';
import Button from '../shared/Button';
import Image from 'next/image';

const ServicesSection = ({ showLearnMore = true }) => {
 const services = [
  {
    title: 'Website Development',
    description:
      'A great website is the foundation of your digital presence. At Bright Reach Solution, we design and build sleek, responsive, and high-performing websites tailored to your business needs — from corporate sites to advanced eCommerce stores.',
    image: '/assets/webdev.png',
    slug: 'web-design-development',
  },
  {
    title: 'Software as a Service (SaaS)',
    description:
      'Scale smarter with our SaaS solutions. We create secure, cloud-based platforms that simplify complex workflows, improve collaboration, and help businesses grow faster with automation and efficiency at their core.',
    image: '/assets/ppc.png',
    slug: 'saas',
  },
  {
    title: 'Search Engine Optimization',
    description:
      'Be seen where it matters. Our SEO strategies are crafted to boost your Google rankings, bring organic traffic, and build long-term authority in your niche. From keyword optimization to content strategies, we’ve got you covered.',
    image: '/assets/seo-service.png',
    slug: 'seo-content',
  },
  {
    title: 'Mobile Application Development',
    description:
      'Your customers are mobile — and your business should be too. We create feature-rich mobile apps for iOS and Android that are intuitive, scalable, and designed to maximize user engagement.',
    image: '/assets/mobileapp.png',
    slug: 'mobile-development',
  },
  {
    title: 'Branding & Graphic Design',
    description:
      'Your brand identity speaks louder than words. We craft memorable branding strategies, visuals, and marketing materials that make your business instantly recognizable and trusted.',
    image: '/assets/brand.png',
    slug: 'branding-design',
  },
  {
    title: 'Animation',
    description:
      'Capture attention with motion. Our custom animations, explainer videos, and motion graphics bring your ideas to life, making your content engaging, impactful, and unforgettable.',
    image: '/assets/animation-service.png',
    slug: 'animation',
  },
  {
    title: 'Social Media Marketing',
    description:
      'Turn followers into loyal customers. Our social media campaigns focus on storytelling, engagement, and conversions — ensuring your brand stands out across platforms like Instagram, LinkedIn, and TikTok.',
    image: '/assets/social.png',
    slug: 'social-media',
  },
  {
    title: 'Logo & Illustration',
    description:
      'Your logo is the face of your business. At Bright Reach Solution, we design unique logos and custom illustrations that reflect your brand’s values and leave a lasting impression.',
    image: '/assets/logoservice.png',
    slug: 'logo-illustration',
  },
]


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
              key={index}
              className="p-6 rounded-lg shadow-lg flex flex-col lg:flex-row lg:items-start items-center justify-center w-full bg-opacity-[24%] bg-white transform transition duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex-shrink-0 lg:mb-0 lg:mr-4">
                <Image src={service.image} alt={service.title} width={200} height={200} className="rounded-lg" />
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
    ) : service.title === 'Software as a Service (SaaS)' ? (
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
