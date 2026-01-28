import React from 'react';
import Link from 'next/link';
import Button from '../components/shared/Button';

const CancellationRefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Cancellation and Refund Policy</h1>
        <div className="w-24 h-1 bg-gradientStart mx-auto mb-8"></div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Effective Date: April 15, 2025. At NineSquare, we are committed to providing transparent, ethical, and high-quality digital services. Due to the nature of our work, the following cancellation and refund policy applies.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/contact">
            <Button text="Contact Us" />
          </Link>
          <Link href="/services">
            <Button text="Our Services" variant="secondary" />
          </Link>
        </div>
      </div>

      {/* Policy Content */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">General Policy</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>Refunds are not available once project work has begun, as resources, time, and strategic planning are immediately allocated upon confirmation.</li>
            <li>Clients may cancel services at any time; however, no partial or prorated refunds will be issued if cancellation occurs during the current billing cycle.</li>
            <li>All cancellations must be submitted in writing via email or text message. Future billing will cease upon acknowledgment of the cancellation request.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">White Hat SEO and Compliance</h2>
          <p className="text-gray-700 mb-4">
            NineSquare strictly follows White Hat SEO techniques that comply with search engine guidelines, ensuring long-term success and protection from penalties.
          </p>
          <p className="text-gray-700 mb-6">
            No refund will be provided if the client ignores or overrides NineSquare's SEO recommendations or implementation strategies, including but not limited to:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>Keyword research and optimization</li>
            <li>On-page and technical SEO best practices</li>
            <li>Content strategy and updates</li>
            <li>Website structure and user experience improvements</li>
            <li>Backlink acquisition and optimization efforts</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Refund Limitations</h2>
          <p className="text-gray-700 mb-6">
            Refunds will not be granted under the following circumstances:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>The client hires another SEO or marketing agency or makes unapproved changes to the SEO strategy or website during our contract period.</li>
            <li>The client fails to provide required access credentials or if the website is non-operational or inactive, preventing successful implementation.</li>
            <li>Mock-up designs have been approved and the project has moved into the development or testing phase.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Special Campaigns and Promotions</h2>
          <p className="text-gray-700 mb-4">
            Services related to event-based promotions or limited-time campaigns cannot be canceled once confirmed.
          </p>
          <p className="text-gray-700 mb-6">
            A minimum of 30 days' written notice is required to withdraw from such exclusive service plans.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Inactivity and Dormant Projects</h2>
          <p className="text-gray-700 mb-6">
            Projects that are inactive, placed on hold, or receive no client response for 30 days or more will be considered abandoned. No refunds will be issued.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Monthly SEO & Marketing Services</h2>
          <p className="text-gray-700 mb-6">
            Although services such as SEO, website management, and digital marketing are non-refundable, clients may cancel ongoing plans by providing at least 15 days' written notice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CancellationRefundPolicy;