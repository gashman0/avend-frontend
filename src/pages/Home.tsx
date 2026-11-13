import React from 'react'
import { useNavigate } from 'react-router-dom'
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

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      
      <div className='bg-[#15181E] min-h-screen'>
        <NavBar onLogin={() => navigate('/login')} onOpenAccount={() => navigate('signup')}/>
        <Hero />
        <HeroBackdrop>
          <img src="hero-ibkr-home-xl.png" alt="" className="w-full max-w-[1000px] h-auto"/>
        </HeroBackdrop>
        <Awards />
        <Products backgroundSrc='bg-global-markets-xl.jpg' exploreHref=''/>
        <RateCards />
        <PricingPlans />
        <Platforms imageSrc='professional-trading-tools-xl.png'/>
        <AiIntegration />
        <FinancialStrength />
        
      </div>
    </>
    
  )
}

export default Home