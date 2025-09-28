import React from "react";
import PrivacyLayout from "@/app/components/(private)/PrivacyLayout";
import Creativity from "@/app/components/widgets/Creativity-service";
import Companies from "@/app/components/widgets/Companies";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Kode Affinity",
  description:
    "Learn how Kode Affinity protects your personal information. Our Privacy Policy outlines how we collect, use, and secure your data when you use our services.",
};

// Define the BreadcrumbItem type
type BreadcrumbItem =
  | { type: "link"; label: string; href: string }
  | { type: "page"; label: string; href?: undefined };

const Privacy = () => {
  const breadcrumbItems: BreadcrumbItem[] = [
    { type: "link", label: "Home", href: "/" },
    { type: "page", label: "Privacy Policy" },
  ];

  return (
    <div className="bg-gray-100 text-gray-900">
      {/* Privacy layout for header and breadcrumb */}
      <PrivacyLayout title="Privacy Policy" breadcrumb={breadcrumbItems} />

      {/* Main Privacy Policy Section */}
      <section className="max-w-screen-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 space-y-8">
        {/* Introduction */}
        <div>
          <h2 className="text-2xl font-bold text-red-700 mb-4">
            Your Privacy Matters to Us
          </h2>
          <p className="text-black">
            At Kode Affinity, we value your privacy and are committed to safeguarding the personal data of our clients and website visitors. This Privacy Policy explains how we collect, use, and protect your information, in accordance with industry standards and regulations.
          </p>
        </div>

        {/* Section 1: Information We Collect */}
        <div>
          <h3 className="text-xl font-semibold text-red-700 mb-2">
            1. Information We Collect
          </h3>
          <p className="text-black">
            We gather personal information when you interact with our website or use our IT services. The data we may collect includes:
          </p>
          <ul className="list-disc list-inside pl-4 text-black space-y-2">
            <li>
              <strong>Personal Information:</strong> Name, email address, phone number, company name, and other contact details.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you use our website and services, such as pages visited, links clicked, and time spent on specific sections.
            </li>
            <li>
              <strong>Cookies and Tracking Technologies:</strong> To improve your experience and analyze website traffic, we may use cookies and other tracking technologies.
            </li>
          </ul>
        </div>

        {/* Section 2: How We Use Your Information */}
        <div>
          <h3 className="text-xl font-semibold text-red-700 mb-2">
            2. How We Use Your Information
          </h3>
          <p className="text-black">
            We use your personal data for the following purposes:
          </p>
          <ul className="list-disc list-inside pl-4 text-black space-y-2">
            <li>
              <strong>Customer Support:</strong> To provide assistance and respond to inquiries regarding our IT services.
            </li>
            <li>
              <strong>Service Improvement:</strong> To enhance our services, products, and website content to meet your needs and preferences.
            </li>
            <li>
              <strong>Marketing Communications:</strong> With your consent, we may send promotional materials or newsletters related to our IT solutions.
            </li>
          </ul>
        </div>

        {/* Section 3: Data Protection and Security */}
        <div>
          <h3 className="text-xl font-semibold text-red-700 mb-2">
            3. Data Protection and Security
          </h3>
          <p className="text-black">
            We implement advanced security measures to protect your personal data against unauthorized access or misuse. Our infrastructure is regularly updated to comply with industry standards and ensure the safety of your data.
          </p>
        </div>

        {/* Section 4: Sharing Your Data */}
        <div>
          <h3 className="text-xl font-semibold text-red-700 mb-2">
            4. Sharing Your Data
          </h3>
          <p className="text-black">
            At Kode Affinity, we respect your privacy. We do not sell, lease, or trade your personal information. However, we may share your data with trusted third-party partners and service providers who assist in providing our IT services, subject to strict confidentiality agreements.
          </p>
        </div>

        {/* Section 5: Cookies and Tracking Technologies */}
        <div>
          <h3 className="text-xl font-semibold text-red-700 mb-2">
            5. Cookies and Tracking Technologies
          </h3>
          <p className="text-black">
            We use cookies to improve your browsing experience, analyze usage, and optimize our {`website's`} performance. Cookies also help us deliver personalized content. You have the option to manage your cookie preferences via your browser settings.
          </p>
        </div>

        {/* Section 6: Your Data Rights */}
        <div>
          <h3 className="text-xl font-semibold text-red-700 mb-2">
            6. Your Data Rights
          </h3>
          <p className="text-black">
            Under data protection laws, you have the right to:
          </p>
          <ul className="list-disc list-inside pl-4 text-black space-y-2">
            <li>Access and obtain a copy of your personal data.</li>
            <li>Request corrections to inaccurate or incomplete data.</li>
            <li>Request the deletion of your personal information.</li>
            <li>
              Object to the processing of your data in certain circumstances.
            </li>
          </ul>
          <p className="text-black">
            To exercise these rights, please contact us using the details below.
          </p>
        </div>

        {/* Section 7: Updates to This Privacy Policy */}
        <div>
          <h3 className="text-xl font-semibold text-red-700 mb-2">
            7. Updates to This Privacy Policy
          </h3>
          <p className="text-black">
            We may update this Privacy Policy from time to time to reflect changes in our practices or due to regulatory requirements. The {`Last Updated`} date will be displayed at the bottom of this page to reflect any changes.
          </p>
        </div>

        {/* Section 8: Contact Us */}
        <div>
          <h3 className="text-xl font-semibold text-red-600 mb-2">
            8. Contact Us
          </h3>
          <p className="text-black">
            If you have any questions or concerns about this Privacy Policy or how we handle your personal data, please reach out to us:
          </p>
          <ul className="list-disc list-inside pl-4 text-black">
            <li><strong>Kode Affinity</strong></li>
            <li>Email: [Your Email Address]</li>
            <li>Phone: [Your Contact Number]</li>
            <li>Address: [Your Business Address]</li>
          </ul>
        </div>
      </section>

      {/* Render other components */}
      <Companies />
      <Creativity />
    </div>
  );
};

export default Privacy;
