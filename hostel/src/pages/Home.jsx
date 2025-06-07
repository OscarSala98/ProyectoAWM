import React from 'react';
import HeroSection from '../components/HeroSection';
import BookingForm from '../components/BookingForm';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Header />
      <HeroSection>
        <BookingForm />
      </HeroSection>
      <Footer />
    </>
  );
};

export default Home;
