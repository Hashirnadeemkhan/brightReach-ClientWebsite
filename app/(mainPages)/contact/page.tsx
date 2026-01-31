import ContactComponent from "@/app/components/widgets/Contact";
import ContactLayout from "@/app/components/(private)/ContactLayout";
import WhatsAppButton from "@/app/components/widgets/WhatsAppButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Kode Affinity | Get in Touch for IT Solutions",
  description:
    "Contact Kode Affinity today for your web development, mobile app, and branding needs. Our team is here to help you create innovative IT solutions for your business.",
};

const ContactPage = () => {
  return (
    <div>
      <ContactLayout>
        <></>
      </ContactLayout>

      <ContactComponent />

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
};

export default ContactPage;
