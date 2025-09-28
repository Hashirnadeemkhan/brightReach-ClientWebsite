
import Footer from "./components/widgets/Footer";
import "./styles/quill-content.css"
import { Montserrat } from "next/font/google";
import { Metadata } from "next";
import "./globals.css"; // Assuming you have global styles

export const metadata: Metadata = {
  title: "Kode Affinity", // Default title (optional, overridden by page-specific metadata)
  description: "Innovative IT Solutions by Kode Affinity", // Default description
};
const poppins = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Adjust as needed
  variable: "--font-montserrat", // This creates a CSS variable
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={` bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
      {children}
      <Footer/>
    </body>
  </html>
  );
}