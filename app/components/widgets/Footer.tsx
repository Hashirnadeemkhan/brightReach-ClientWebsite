import Image from "next/image";
import Link from "next/link";

import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="text-white pt-8"
      style={{
        backgroundImage:
          'linear-gradient(to right, #7f1d1d, #6b21a8, #1e3a8a), url("/assets/bg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 md:grid-cols-3 gap-8 text-center md:text-left">

          {/* Logo and Description */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex justify-center md:justify-start mb-4">
              <Image
                src="/logo.png"
                width={120}
                height={120}
                alt="Bright Reach Solution Logo"
                className="w-24 md:w-20 h-auto"
              />
            </div>
            <div className="flex justify-center md:justify-start space-x-4 mb-4">
              <Link href="https://www.instagram.com/bright_reach_solutions?igsh=bDdhY3FqZHNyOTZv&utm_source=qr" target="_blank" rel="noopener noreferrer"><FaInstagram size={20} className="hover:text-custom-red transition-colors" /></Link>
              <Link href="#"><FaFacebookF size={20} className="hover:text-custom-red transition-colors" /></Link>
              <Link href="#"><FaTiktok size={20} className="hover:text-custom-red transition-colors" /></Link>
              <Link href="#"><FaYoutube size={20} className="hover:text-custom-red transition-colors" /></Link>
            </div>
            <p className="text-sm">
              At <span className="font-semibold">Bright Reach Solution</span>, we
              empower businesses with innovative, scalable, and reliable digital
              solutions that drive growth and long-term success.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/about" className="hover:underline">About Us</Link></li>
              <li><Link href="/pricing" className="hover:underline">Pricing</Link></li>
              <li><Link href="/service" className="hover:underline">Services</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link href="/termss" className="hover:underline">Terms & Conditions</Link></li>
              <li><Link href="/cancellation-refund-policy" className="hover:underline">Cancellation & Refund Policy</Link></li>
            </ul>
          </div>

          {/* UK Office */}
          <div>
            <h3 className="font-bold mb-4 text-lg flex items-center justify-center md:justify-start gap-2">
              <span className="text-xs font-bold bg-blue-700 text-white px-1.5 py-0.5 rounded">UK</span>
              <span> Office</span>
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📍</span>
                <span>South Accommodation Road, Leeds,<br />West Yorkshire, LS9 8LH</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📞</span>
                <a href="tel:+447848177145" className="hover:underline">+44 7848 177145</a>
              </li>
              <li className="flex items-start gap-2">
                <span>📧</span>
                <a href="mailto:info@brightreachsolutions.com" className="hover:underline break-all">
                  info@brightreachsolutions.com
                </a>
              </li>
            </ul>
          </div>

          {/* US Offices */}
          <div>
            <h3 className="font-bold mb-4 text-lg flex items-center justify-center md:justify-start gap-2">
              <span className="text-xs font-bold bg-red-600 text-white px-1.5 py-0.5 rounded">US</span>
              <span>Offices</span>
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📍</span>
                <span>
                  <span className="block text-white/70 text-xs uppercase tracking-wide mb-0.5">Chicago</span>
                  25 E Washington St Suite 1115,<br />Chicago, IL 60602
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📍</span>
                <span>
                  <span className="block text-white/70 text-xs uppercase tracking-wide mb-0.5">Head Office</span>
                  5396 Lincoln Avenue, Unit C,<br />Cypress, CA 90630
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span>📞</span>
                <a href="tel:+19169167722" className="hover:underline">(916) 916-7722</a>
              </li>
              <li className="flex items-start gap-2">
                <span>📧</span>
                <a href="mailto:info@brightreachsolutions.com" className="hover:underline break-all">
                  info@brightreachsolutions.com
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="mt-6 border-t border-gray-500 pt-4 bg-black w-full pb-4 px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 text-center md:text-left">
          <p className="text-sm">© 2024 Bright Reach Solution. All Rights Reserved.</p>
          <p className="text-xs text-white/60">
            Powered &amp; Managed by <span className="text-white/80 font-semibold">Aftab Amin</span> — Secure payments handled through the official account of Aftab Amin.
          </p>
        </div>
      </div>
    </footer>
  );
}
