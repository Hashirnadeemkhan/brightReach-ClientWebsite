// app/services/page.tsx
import { Metadata } from "next";
import ServiceLayout from "@/app/components/(private)/ServiceLayout";
import ServicesSection from "@/app/components/widgets/Services";
import Creativity from "@/app/components/widgets/Creativity-service";
import Companies from "@/app/components/widgets/Companies";


// Define the BreadcrumbItem type
type BreadcrumbItem =
  | { type: "link"; label: string; href: string }
  | { type: "page"; label: string; href?: undefined };

// Static metadata for the Services overview page
export const metadata: Metadata = {
  title: "Our IT Services | Kode Affinity",
  description:
    "Kode Affinity offers a range of IT services, including web development, mobile apps, branding, SEO, and more. Let us help you with custom solutions for your business.",
};

const Service = () => {
  const breadcrumbItems: BreadcrumbItem[] = [
    { type: "link", label: "Home", href: "/" },
    { type: "page", label: "Services" },
  ];

  return (
    <div>
      {/* Service layout for header/breadcrumb */}
      <ServiceLayout title={"Services"} breadcrumb={breadcrumbItems} />

      {/* Service section rendered separately */}
      <ServicesSection showLearnMore={false} />
      <Companies />
      <Creativity />
    </div>
  );
};

export default Service;