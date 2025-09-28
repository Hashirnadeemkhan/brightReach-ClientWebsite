/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        "res.cloudinary.com", // For Cloudinary images
        "firebasestorage.googleapis.com", // For Firebase Storage images if needed
      ],
    },
  };
  
  // Use `export default` for ES modules
  export default nextConfig;