 import Navbar from '@/app/components/widgets/Navbar'
import React from 'react'
import Journey from "@/app/components/widgets/Journey";
import CoreValue from '@/app/components/widgets/CoreValue';
import Expertise from '@/app/components/widgets/Expertise';
import OurProcess from '@/app/components/widgets/OurProcess';
import Testimonals from '@/app/components/widgets/Testimonals';
import FAQSection from '@/app/components/widgets/Faqs';
import Companies from '@/app/components/widgets/Companies';
import Layout from "../../components/(private)/Layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Kode Affinity | Leading IT Services Company",
  description:
    "Learn more about Kode Affinity and our mission to deliver top-notch IT solutions. Our team provides expert web development, mobile apps, branding, and more.",
};

const page = () => {
  return (
    <div>
        <Layout isAboutOnly={true} isReducedHeight={true}/>
      <Journey/>
      <CoreValue/>
      <Expertise/>
      <OurProcess/>
      <FAQSection/>
      <Testimonals/>
      <Companies/>

    </div>
  )
}

export default page
