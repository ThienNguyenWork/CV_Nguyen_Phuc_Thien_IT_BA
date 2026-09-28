import React, { lazy } from 'react';
import { motion } from 'motion/react';
import ClickSpark from './components/ClickSpark';
import Background from './components/Background';
import ScrollProgress from './components/ScrollProgress';
import MouseFollower from './components/MouseFollower';
import Navbar from './components/Navbar';
import HeroSection from './components/sections/HeroSection';
import LazySection from './components/LazySection';

import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useActiveSection } from './hooks/useActiveSection';

// Code-split all major below-the-fold sections via React.lazy
const AboutSection = lazy(() => import('./components/sections/AboutSection'));
const EcosystemSection = lazy(() => import('./components/sections/EcosystemSection'));
const ExperienceSection = lazy(() => import('./components/sections/ExperienceSection'));
const TechnicalSkillsSection = lazy(() => import('./components/sections/TechnicalSkillsSection'));
const ResumeSection = lazy(() => import('./components/sections/ResumeSection'));
const ContactSection = lazy(() => import('./components/sections/ContactSection'));

const NAVBAR_SECTION_IDS = ['about', 'work', 'resume', 'contact'];

// Isolated Navbar component that tracks active section without re-rendering App root
const ConnectedNavbar: React.FC<{
  onNavigate: (id: string) => void;
  onScrollToTop: () => void;
}> = React.memo(({ onNavigate, onScrollToTop }) => {
  const activeSection = useActiveSection(NAVBAR_SECTION_IDS);
  return (
    <Navbar 
      onNavigate={onNavigate} 
      onScrollToTop={onScrollToTop} 
      activeSection={activeSection} 
    />
  );
});

export default function App() {
  const { scrollToSection, scrollToTop } = useSmoothScroll(80);

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-blue-500/30 selection:text-white overflow-x-hidden">
      <ClickSpark
        sparkColor="#3b82f6"
        sparkSize={10}
        sparkRadius={20}
        sparkCount={8}
        duration={400}
      >
        <Background />
        <ScrollProgress />
        <MouseFollower />

        <ConnectedNavbar 
          onNavigate={scrollToSection} 
          onScrollToTop={scrollToTop} 
        />

        <main className="relative z-10 pt-40 pb-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Hero Section - Rendered immediately for optimal FCP / LCP */}
            <HeroSection onNavigate={scrollToSection} />

            {/* Below-the-fold major sections dynamically loaded only when approaching viewport */}
            <LazySection id="about" minHeight="min-h-[500px]">
              <AboutSection />
            </LazySection>

            <LazySection 
              id="ecosystem" 
              minHeight="min-h-[800px]"
              renderContent={(isVisible) => <EcosystemSection isVisible={isVisible} />}
            />

            <LazySection id="work" minHeight="min-h-[700px]">
              <ExperienceSection />
            </LazySection>

            <LazySection id="skills" minHeight="min-h-[400px]">
              <TechnicalSkillsSection />
            </LazySection>

            <LazySection id="resume" minHeight="min-h-[900px]">
              <ResumeSection />
            </LazySection>

            <LazySection id="contact" minHeight="min-h-[250px]">
              <ContactSection />
            </LazySection>
          </motion.div>
        </main>
      </ClickSpark>
    </div>
  );
}
