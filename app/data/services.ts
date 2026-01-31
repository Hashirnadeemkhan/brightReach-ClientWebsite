export interface Service {
    id: string;
    title: string;
    description: string;
    icon?: string;
    slug: string;
    information: string;
    image?: string; // Added optional image property to match the data structure
}

export const services: Service[] = [
    {
        id: "1",
        title: "Web Design and Development",
        description: "Web Design and Development",
        image: "/assets/web.png",
        slug: "web-design-development",
        information:
            "At bright reach solutions, we specialize in creating responsive, visually appealing, and high-performing websites tailored to your business needs. Whether you need a simple landing page or a complex e-commerce platform, our team ensures seamless functionality and an exceptional user experience. From custom web design to full-stack development, we bring your vision to life."
    },
    {
        id: "2",
        title: "Mobile Application Development",
        description: "Native and cross-platform mobile apps",
        slug: "mobile-development",
        image: "/assets/mobile.png",
        information:"In today’s mobile-first world, having a robust app is essential. bright reach solutions offers custom mobile app development services for iOS, Android, and cross-platform solutions. We focus on creating intuitive, feature-rich apps that engage users and drive business growth."    },
    {
        id: "3",
        title: "SEO & Content Writing",
        description: "Optimize your online presence",
        image: "/assets/seo.png", // Added missing comma
        slug: "seo-content",
        information:
"Our SEO and content writing services are designed to help your business rank higher on search engines and connect with your target audience. From keyword research to content creation and technical SEO, we ensure your website is optimized for maximum visibility and engagement."    },
    {
        id: "4",
        title: "Logo and Illustration ",
        description: "Creative design solutions",
        slug: "logo-illustration",
        image: "/assets/illustration.png",
        information:
"Your logo is the face of your brand. At bright reach solutions, we craft custom logos and illustrations that capture your brand’s essence and leave a lasting impression. Whether you need a minimalist logo or intricate illustrations, we’ve got you covered."    },
    {
        id: "5",
        title: "Branding & Graphic Design",
        description: "Build your brand identity",
        slug: "branding-design",
        image: "/assets/graphics.png",
        information:
            "Our branding and graphic design services help businesses establish a strong identity. From logo creation to brand guidelines, we ensure your brand conveys professionalism, trust, and uniqueness across all platforms.",
    },
    {
        id: "6",
        title: "Animation",
        description: "Bring your ideas to life",
        image: "/assets/animation.png",
        slug: "animation",
        information:
"Animation is a powerful tool to tell your story and captivate your audience. bright reach solutions offers custom animation services for explainer videos, advertisements, and social media content. Our animations are designed to grab attention and leave a lasting impression."    
    },
    {
        id: "7",
        title: "Social Media Marketing",
        description: "Engage with your audience",
        image: "/assets/SMM.png",
        slug: "social-media",
        information:
"Social media is a powerful platform to connect with your audience. bright reach solutions offers comprehensive social media marketing services, including content creation, strategy development, and performance tracking. We help you build a strong online presence and achieve your business goals."    },
    {
        id: "8",
        title: "SaaS",
        description: "Software as a Service solutions",
        slug: "saas",
        image: "/assets/saas.png",
        information:
"bright reach solutions specializes in SaaS development, creating scalable, secure, and user-friendly software solutions tailored to your business needs. From concept to deployment, we ensure your SaaS platform delivers exceptional performance and value."    },
    {
        id: "9",
        title: "Artificial Intelligence Optimization",
        description: "AI-powered solutions for business growth",
        slug: "ai-optimization",
        image: "/assets/Ai.webp",
        information:
"Transform your business with our AI optimization services. At bright reach solutions, we leverage cutting-edge artificial intelligence technologies to enhance your operations, automate processes, and unlock new opportunities. From machine learning algorithms to intelligent automation, we help you stay ahead of the competition."
    },
    {
        id: "10",
        title: "Google Ads",
        description: "Maximize your ROI with strategic advertising",
        slug: "google-ads",
        image: "/assets/googleads.png",
        information:
"Drive targeted traffic and increase conversions with our Google Ads management services. Our certified experts create and optimize high-performing ad campaigns that reach your ideal customers at the right time. From search ads to display campaigns, we ensure maximum return on your advertising investment."
    },
    {
        id: "11",
        title: "Google Guarantee",
        description: "Boost credibility and trust with certification",
        slug: "google-guarantee",
        image: "/assets/goodfirms.png",
        information:
"Elevate your business credibility with our Google Guarantee services. We help service-based businesses get verified through Google's trusted platform, increasing customer confidence and driving more qualified leads. Our experts guide you through the entire verification process."
    },
    {
        id: "12",
        title: "Shopify Development",
        description: "Custom eCommerce solutions on Shopify",
        slug: "shopify-development",
        image: "/assets/shopify.png",
        information:
"Launch or optimize your online store with our custom Shopify development services. From theme customization to app integration and payment processing, we create seamless shopping experiences that convert visitors into customers. Our solutions are tailored to scale with your business."
    },
];