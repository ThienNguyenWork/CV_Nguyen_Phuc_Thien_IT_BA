import React, { Suspense, lazy } from 'react';
import { motion } from 'motion/react';
import ClickSpark from './components/ClickSpark';
import Background from './components/Background';
import ScrollProgress from './components/ScrollProgress';
import MouseFollower from './components/MouseFollower';
import Navbar from './components/Navbar';
import HeroSection from './components/sections/HeroSection';
import SectionSkeleton from './components/SectionSkeleton';

import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useActiveSection } from './hooks/useActiveSection';

// Code-split all major below-the-fold sections via React.lazy
const AboutSection = lazy(() => import('./components/sections/AboutSection'));
const EcosystemSection = lazy(() => import('./components/sections/EcosystemSection'));
const ExperienceSection = lazy(() => import('./components/sections/ExperienceSection'));
const TechnicalSkillsSection = lazy(() => import('./components/sections/TechnicalSkillsSection'));
const ResumeSection = lazy(() => import('./components/sections/ResumeSection'));
const ContactSection = lazy(() => import('./components/sections/ContactSection'));

const SECTION_IDS = ['about', 'work', 'resume', 'contact'];

export default function App() {
  const { scrollToSection, scrollToTop } = useSmoothScroll(80);
  const activeSection = useActiveSection(SECTION_IDS);

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

        <Navbar 
          onNavigate={scrollToSection} 
          onScrollToTop={scrollToTop} 
          activeSection={activeSection} 
        />

        <main className="relative z-10 pt-40 pb-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Hero Section - Rendered immediately for optimal FCP / LCP */}
            <HeroSection onNavigate={scrollToSection} />

            {/* Below-the-fold major sections dynamically loaded with React.lazy and Suspense */}
            <Suspense fallback={<SectionSkeleton height="min-h-[500px]" />}>
              <AboutSection />
            </Suspense>

            <Suspense fallback={<SectionSkeleton height="min-h-[800px]" />}>
              <EcosystemSection />
            </Suspense>

            <Suspense fallback={<SectionSkeleton height="min-h-[700px]" />}>
              <ExperienceSection />
            </Suspense>

            <Suspense fallback={<SectionSkeleton height="min-h-[400px]" />}>
              <TechnicalSkillsSection />
            </Suspense>

            <Suspense fallback={<SectionSkeleton height="min-h-[900px]" />}>
              <ResumeSection />
            </Suspense>

            <Suspense fallback={<SectionSkeleton height="min-h-[250px]" />}>
              <ContactSection />
            </Suspense>
          </motion.div>
        </main>
      </ClickSpark>
    </div>
  );
}
