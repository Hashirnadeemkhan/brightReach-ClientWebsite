import { Metadata } from "next";
import Navbar from "@/app/components/widgets/Navbar";
import ReviewsClient from "@/app/components/widgets/ReviewsClient";

export const metadata: Metadata = {
  title: "Client Reviews | Bright Reach Solutions",
  description:
    "Read genuine reviews from Bright Reach Solutions clients and share your own experience. See how we've helped businesses grow with web development, branding, and digital solutions.",
};

const ReviewsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-6">
        <Navbar />
      </div>
      <ReviewsClient />
    </div>
  );
};

export default ReviewsPage;
