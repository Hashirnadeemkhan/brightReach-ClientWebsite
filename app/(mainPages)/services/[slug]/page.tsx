// app/services/[slug]/page.tsx
import { notFound } from "next/navigation";
import { services } from "@/app/data/services"; // Assuming this contains your service data
import FAQSection from "@/app/components/widgets/Faqs";
import Creativity from "@/app/components/widgets/Creativity-service";
import ServiceLayout from "@/app/components/(private)/ServiceSlugLayout";
import Companies from "@/app/components/widgets/Companies";
import AnimatedServiceSection from "@/app/components/widgets/AnimatedServiceSection";
import { Metadata } from "next";

// Define the Service type
interface Service {
  slug: string;
  title: string;
  description: string;
  // Add other fields as needed (e.g., content, image, etc.)
}

// Function to fetch service by slug (using static data here)
async function getServiceBySlug(slug: string): Promise<Service | null> {
  return services.find((service) => service.slug === slug) || null;
}

// Generate metadata dynamically based on slug
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    return {
      title: "Service Not Found | Kode Affinity",
      description: "The requested service could not be found. Explore our other IT services at Kode Affinity.",
    };
  }

  return {
    title: service.title,
    description: service.description,
  };
}

// Generate static params for pre-rendering
export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

// Page component
export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div>
      <ServiceLayout service={service} />
      <AnimatedServiceSection service={service} />
      <FAQSection />
      <Companies />
      <Creativity />
    </div>
  );
}