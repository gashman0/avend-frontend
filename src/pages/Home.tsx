
import React from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useMe } from '../network/me/queries'

import NavBar from '../components/sections/Navbar'
import Hero from '../components/sections/Hero'
import HeroBackdrop from '../components/sections/HeroBackDrop'
import Awards from '../components/sections/Awards'
import Products from '../components/sections/Products'
import RateCards from '../components/sections/RateCards'
import PricingPlans from '../components/sections/PricingPlans'
import Platforms from '../components/sections/Platforms'
import AiIntegration from '../components/sections/AiIntegration'
import FinancialStrength from '../components/sections/FinancialStrength'
import GetStarted from '../components/sections/GetStarted'
import Disclosures from '../components/sections/Disclosures'
import LegalNotice from '../components/sections/LegalNotice'
import Footer from '../components/sections/Footer'

const Home = () => {
  const navigate = useNavigate();
  const { data: me, isPending, isError } = useMe();

  // Wait until authentication has been checked.
  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#15181E] text-white">
        Checking your session...
      </div>
    );
  }

  // Redirect authenticated users to the dashboard.
  if (!isError && me) {
    return <Navigate to="/dashboard" replace />;
  }

  // Unauthenticated users can see the homepage.
  return (
    <div className="bg-[#15181E] min-h-screen">
      <NavBar
        onLogin={() => navigate('/login')}
        onOpenAccount={() => navigate('/signup')}
      />
      <Hero />
      <HeroBackdrop>
        <img
          src="hero-ibkr-home-xl.png"
          alt=""
          className="w-full max-w-[1000px] h-auto"
        />
      </HeroBackdrop>
      <Awards />
      <Products backgroundSrc="bg-global-markets-xl.jpg" exploreHref="" />
      <RateCards />
      <PricingPlans />
      <Platforms imageSrc="professional-trading-tools-xl.png" />
      <AiIntegration />
      <FinancialStrength />
      <GetStarted backgroundSrc='bg-page-cta-xl.jpg'/>
      <Disclosures />
      <LegalNotice />
      <Footer />
    </div>
  );
};

export default Home;
