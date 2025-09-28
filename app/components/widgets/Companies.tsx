import React from 'react';
import Image from 'next/image';
import styles from './Companies.module.css'; // Create a CSS module for custom styles

const Companies = () => {
  return (
    <div className='mt-20 mb-10'>
      <h1 className='text-center lg:text-5xl text-3xl font-semibold'>WE WORKED WITH</h1>
      <hr className='border-red-700 mb-10 w-52 mx-auto mt-2' />
      
      {/* The container for the scrolling logos */}
      <div className={`${styles.slider} bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500  rounded-md`}>
        <div className={styles.sliderTrack}>
          <div className={styles.sliderItem}><Image src={"/assets/clutch.png"} alt='clutch' height={150} width={150} className={styles.logo} /></div>
          <div className={styles.sliderItem}><Image src={"/assets/google.png"} alt='google' height={150} width={150} className={styles.logo} /></div>
          <div className={styles.sliderItem}><Image src={"/assets/upwork.png"} alt='upwork' height={150} width={150} className={styles.logo} /></div>
          <div className={styles.sliderItem}><Image src={"/assets/goodfirms.png"} alt='goodfirms' height={150} width={150} className={styles.logo} /></div>
          <div className={styles.sliderItem}><Image src={"/assets/barkwebsite.png"} alt='bark' height={150} width={150} className={styles.logo} /></div>
          {/* Repeat logos to ensure seamless scrolling */}
          <div className={styles.sliderItem}><Image src={"/assets/clutch.png"} alt='clutch' height={150} width={150} className={styles.logo} /></div>
          <div className={styles.sliderItem}><Image src={"/assets/google.png"} alt='google' height={150} width={150} className={styles.logo} /></div>
          <div className={styles.sliderItem}><Image src={"/assets/upwork.png"} alt='upwork' height={150} width={150} className={styles.logo} /></div>
          <div className={styles.sliderItem}><Image src={"/assets/goodfirms.png"} alt='goodfirms' height={150} width={150} className={styles.logo} /></div>
          <div className={styles.sliderItem}><Image src={"/assets/barkwebsite.png"} alt='bark' height={150} width={150} className={styles.logo} /></div>
          <div className={styles.sliderItem}><Image src={"/assets/clutch.png"} alt='clutch' height={150} width={150} className={styles.logo} /></div>
          <div className={styles.sliderItem}><Image src={"/assets/google.png"} alt='google' height={150} width={150} className={styles.logo} /></div>
          <div className={styles.sliderItem}><Image src={"/assets/upwork.png"} alt='upwork' height={150} width={150} className={styles.logo} /></div>
          <div className={styles.sliderItem}><Image src={"/assets/goodfirms.png"} alt='goodfirms' height={150} width={150} className={styles.logo} /></div>
          <div className={styles.sliderItem}><Image src={"/assets/barkwebsite.png"} alt='bark' height={150} width={150} className={styles.logo} /></div>
        </div>
      </div>
    </div>
  );
}

export default Companies;
