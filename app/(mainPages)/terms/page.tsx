import React from "react"
import TermLayout from "@/app/components/(private)/TermLayout"
import Creativity from "@/app/components/widgets/Creativity-service"
import Companies from "@/app/components/widgets/Companies"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Kode Affinity",
  description:
    "Review the Terms of Service for Kode Affinity. By using our IT services, you agree to the terms and conditions outlined for web development, mobile apps, and more.",
};

// Define the BreadcrumbItem type
type BreadcrumbItem = 
  | { type: "link"; label: string; href: string }
  | { type: "page"; label: string; href?: undefined }

const Terms = () => {
  const breadcrumbItems: BreadcrumbItem[] = [
    { type: "link", label: "Home", href: "/" },
    { type: "page", label: "Terms and Services" },
  ]

  return (
    <div>
      {/* Layout for header and breadcrumb */}
      <TermLayout title="Terms and Services" breadcrumb={breadcrumbItems} />
      <section className="max-w-screen-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
        <h2 className="text-2xl font-semibold text-red-700 mb-4">
          Terms of Service
        </h2>
        <p className="text-black mb-6">
          These Terms of Service {`("Terms")`} govern the use of the services provided by Kode Affinity {`("we," "us," "our").`} By accessing or using our IT services, you agree to comply with these Terms.
        </p>

        <h3 className="text-xl font-semibold text-red-600 mb-2">
          1. Acceptance of Terms
        </h3>
        <p className="text-black mb-4">
          By using Kode {`Affinity's`} website or services, you accept and agree to be bound by these Terms. If you do not agree to these Terms, you must not use our services.
        </p>

        <h3 className="text-xl font-semibold text-red-600 mb-2">
          2. Services Provided
        </h3>
        <p className="text-black mb-4">
          Kode Affinity offers a range of IT solutions, including software development, IT consulting, website design, and digital marketing services. These services are described in detail on our website. We reserve the right to modify or discontinue any of our services at any time.
        </p>

        <h3 className="text-xl font-semibold text-red-600 mb-2">
          3. Account Responsibilities
        </h3>
        <p className="text-black mb-4">
          If you create an account with us, you agree to provide accurate and up-to-date information. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
        </p>

        <h3 className="text-xl font-semibold text-red-600 mb-2">
          4. Service Fees and Payments
        </h3>
        <p className="text-black mb-4">
          For certain services, you may be required to pay fees. Payment terms, including pricing and billing schedules, will be outlined in the contract or service agreement for the services you choose. By accepting these Terms, you agree to pay the fees associated with the services provided.
        </p>

        <h3 className="text-xl font-semibold text-red-600 mb-2">
          5. Client Responsibilities
        </h3>
        <p className="text-black mb-4">
          You agree to use Kode Affinity’s services in accordance with all applicable laws and regulations. You must not use our services for any unlawful or prohibited activities, including but not limited to, infringing intellectual property rights, spreading malware, or engaging in fraudulent activities.
        </p>

        <h3 className="text-xl font-semibold text-red-600 mb-2">
          6. Intellectual Property
        </h3>
        <p className="text-black mb-4">
          All intellectual property rights in any content, software, designs, or materials provided by Kode Affinity remain the property of Kode Affinity or its licensors. You may not use, copy, modify, or distribute any of our intellectual property without our explicit permission.
        </p>

        <h3 className="text-xl font-semibold text-red-600 mb-2">
          7. Privacy and Data Protection
        </h3>
        <p className="text-black mb-4">
          Your use of our services is subject to our Privacy Policy, which governs the collection, use, and protection of your personal data. Please review our Privacy Policy for more details.
        </p>

        <h3 className="text-xl font-semibold text-red-600 mb-2">
          8. Termination
        </h3>
        <p className="text-black mb-4">
          We may suspend or terminate your access to our services at any time if we believe you are in breach of these Terms. You may also terminate your account by notifying us in writing.
        </p>

        <h3 className="text-xl font-semibold text-red-600 mb-2">
          9. Limitation of Liability
        </h3>
        <p className="text-black mb-4">
          To the maximum extent permitted by law, Kode Affinity shall not be liable for any indirect, incidental, or consequential damages arising out of or in connection with your use of our services. Our liability is limited to the amount paid for the services in question.
        </p>

        <h3 className="text-xl font-semibold text-red-600 mb-2">
          10. Indemnification
        </h3>
        <p className="text-black mb-4">
          You agree to indemnify and hold harmless Kode Affinity, its employees, and affiliates from any claims, losses, or damages arising from your use of our services or your breach of these Terms.
        </p>

        <h3 className="text-xl font-semibold text-red-600 mb-2">
          11. Governing Law
        </h3>
        <p className="text-black mb-4">
          These Terms are governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes will be resolved in the courts located in [Your Jurisdiction].
        </p>

        <h3 className="text-xl font-semibold text-red-600 mb-2">
          12. Changes to These Terms
        </h3>
        <p className="text-black mb-4">
          We reserve the right to update or modify these Terms at any time. Any changes will be posted on this page with an updated {`"Last Revised"`} date. Your continued use of our services after such changes indicates your acceptance of the new Terms.
        </p>

        <h3 className="text-xl font-semibold text-red-600 mb-2">
          13. Contact Us
        </h3>
        <p className="text-black mb-4">
          If you have any questions or concerns regarding these Terms, please contact us at:
          <br />
         Kode Affinity
          <br />
          Email: [Your Email Address]
          <br />
          Phone: [Your Contact Number]
          <br />
          Address: [Your Business Address]
        </p>
      </section>
      {/* Render other components */}
      <Companies />
      <Creativity />
    </div>
  )
}

export default Terms