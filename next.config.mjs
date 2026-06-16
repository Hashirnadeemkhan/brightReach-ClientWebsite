/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        "res.cloudinary.com", // For Cloudinary images
        "firebasestorage.googleapis.com", // For Firebase Storage images if needed
        "utfs.io", // UploadThing CDN
      ],
      remotePatterns: [
        { protocol: "https", hostname: "*.ufs.sh" }, // UploadThing (newer regional hosts)
      ],
    },
  };
  
  // Use `export default` for ES modules
  export default nextConfig;