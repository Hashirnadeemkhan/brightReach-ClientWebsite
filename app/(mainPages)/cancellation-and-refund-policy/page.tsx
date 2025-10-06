import React from "react";
import TermLayout from "@/app/components/(private)/TermLayout";
import Creativity from "@/app/components/widgets/Creativity-service";
import Companies from "@/app/components/widgets/Companies";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellation and Refund Policy | BrightReach Solutions",
  description:
    "Read the Cancellation and Refund Policy of BrightReach Solutions to understand our terms regarding cancellations, refunds, and service commitments.",
};

// Breadcrumb Type
type BreadcrumbItem =
  | { type: "link"; label: string; href: string }
  | { type: "page"; label: string; href?: undefined };

const CancellationAndRefundPolicy = () => {
  const breadcrumbItems: BreadcrumbItem[] = [
    { type: "link", label: "Home", href: "/" },
    { type: "page", label: "Cancellation and Refund Policy" },
  ];

  return (
    <div>
      {/* Layout Header and Breadcrumb */}
      <TermLayout title="Cancellation and Refund Policy" breadcrumb={breadcrumbItems} />

      <section className="max-w-screen-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
        <h2 className="text-2xl font-semibold text-red-700 mb-4">
          Cancellation and Refund Policy
        </h2>
        <p className="text-black mb-6">
          By using this website, you agree to comply with and be bound by these
          Refund and Conditions. All content is for general information and may
          be subject to change without notice. Unauthorized use of this site may
          result in legal action. We reserve the right to update these Refund
          terms at any time.
        </p>

        <h3 className="text-xl font-semibold text-red-600 mb-2">1. Overview</h3>
        <p className="text-black mb-4">
          At BrightReach Solutions, we are committed to providing transparent,
          ethical, and high-quality digital services. Due to the nature of our
          work, the following cancellation and refund policy applies:
        </p>

        <h3 className="text-xl font-semibold text-red-600 mb-2">2. General Policy</h3>
        <ul className="list-disc pl-6 text-black mb-4 space-y-2">
          <li>
            Refunds are not available once project work has begun, as resources,
            time, and strategic planning are immediately allocated upon
            confirmation.
          </li>
          <li>
            Clients may cancel services at any time; however, no partial or
            prorated refunds will be issued if cancellation occurs during the
            current billing cycle.
          </li>
          <li>
            All cancellations must be submitted in writing via email or text
            message. Future billing will cease upon acknowledgment of the
            cancellation request.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-red-600 mb-2">
          3. White Hat SEO and Compliance
        </h3>
        <p className="text-black mb-4">
          BrightReach Solutions strictly follows White Hat SEO techniques that
          comply with search engine guidelines, ensuring long-term success and
          protection from penalties.
        </p>
        <p className="text-black mb-2">
          No refund will be provided if the client ignores or overrides
          BrightReach’s SEO recommendations or implementation strategies,
          including but not limited to:
        </p>
        <ul className="list-disc pl-6 text-black mb-4 space-y-2">
          <li>Keyword research and optimization</li>
          <li>On-page and technical SEO best practices</li>
          <li>Content strategy and updates</li>
          <li>Website structure and user experience improvements</li>
          <li>Backlink acquisition and optimization efforts</li>
        </ul>

        <h3 className="text-xl font-semibold text-red-600 mb-2">
          4. Refund Limitations
        </h3>
        <ul className="list-disc pl-6 text-black mb-4 space-y-2">
          <li>
            Refunds will not be granted if the client hires another SEO or
            marketing agency or makes unapproved changes to the SEO strategy or
            website during our contract period.
          </li>
          <li>
            Refunds are not applicable if the client fails to provide required
            access credentials or if the website is non-operational or inactive,
            preventing successful implementation.
          </li>
          <li>
            No refund is possible after mock-up designs are approved and the
            project moves into the development or testing phase.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-red-600 mb-2">
          5. Special Campaigns and Promotions
        </h3>
        <ul className="list-disc pl-6 text-black mb-4 space-y-2">
          <li>
            Services related to event-based promotions or limited-time campaigns
            cannot be canceled once confirmed.
          </li>
          <li>
            A minimum of 30 days’ written notice is required to withdraw from
            such exclusive service plans.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-red-600 mb-2">
          6. Inactivity and Dormant Projects
        </h3>
        <p className="text-black mb-4">
          Projects that are inactive, placed on hold, or receive no client
          response for 30 days or more will be considered abandoned. No refunds
          will be issued.
        </p>

        <h3 className="text-xl font-semibold text-red-600 mb-2">
          7. Monthly SEO & Marketing Services
        </h3>
        <p className="text-black mb-4">
          Although services such as SEO, website management, and digital
          marketing are non-refundable, clients may cancel ongoing plans by
          providing at least 15 days’ written notice.
        </p>

        <h3 className="text-xl font-semibold text-red-600 mb-2">
          8. Customer Support
        </h3>
        <p className="text-black mb-4">
          For refund-related assistance, please contact:
          <br />
          <strong>Email:</strong> info@brightreachsolutions.com
          <br />
          <strong>WhatsApp:</strong> +44 7718 923178
          <br />
          <strong>Phone:</strong> +44 1274 054457
          <br />
          <strong>Support Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM EST
          <br />
          <strong>Response Time:</strong> Within 24 business hours
        </p>
      </section>

      {/* Footer Components */}
      <Companies />
      <Creativity />
    </div>
  );
};

export default CancellationAndRefundPolicy;
