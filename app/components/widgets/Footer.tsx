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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Logo and Description */}
          <div>
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
              <Link href="#"><FaFacebookF size={20} /></Link>
              <Link href="#"><FaInstagram size={20} /></Link>
              <Link href="#"><FaTiktok size={20} /></Link>
              <Link href="#"><FaYoutube size={20} /></Link>
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
            <ul className="space-y-2">
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
            <ul className="space-y-2">
              <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link href="/termss" className="hover:underline">Terms & Conditions</Link></li>
              <li><Link href="/cancellation-and-refund-policy" className="hover:underline">Cancellation and Refund Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>📍 South Accommodation Road, Leeds</li>
              <li>📍 West Yorkshire, LS9 8LH</li>
              <li>📧 <a href="mailto:info@brightreachsolutions.com" className="hover:underline">info@brightreachsolutions.com</a></li>
              <li>
                📱{" "}
                <a
                  href="https://wa.me/447718923178"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  +44 7718 923178 
                </a>
              </li>
              <li>
                📞{" "}
                <a
                  href="tel:+441274054457"
                  className="hover:underline"
                >
                  +44 1274 054457
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center mt-6 border-t border-gray-500 pt-4 bg-black w-full pb-3">
        <p>© 2024 Bright Reach Solution. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
