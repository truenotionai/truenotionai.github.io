// App.jsx
'use client';
import { useEffect, useRef } from 'react';
import { DOMAIN } from './service/backend_domain';
import ChatWithTrueNotion from './components/ChatWithTrueNotion';
import SmoothFollower from './components/SmoothFollower';
import AgentConfigForm from './components/AgentData';
import VideoImageDisplay from './components/Media';
import ImageDisplay from './components/Media2';
import { Container } from '@chakra-ui/react';
import Lenis from '@studio-freight/lenis';
import HelperFunctionForStyles from './utils/utils';
import SocialButtons from './components/SocialProfile';
import LoadedFilesReference from './components/LoadedFilesReference';
import './App.css';

function App() {
  const hasInitialized = useRef(false);

  // Adjust viewport height for mobile devices
  useEffect(() => {
    const setVhProperty = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVhProperty();
    window.addEventListener('resize', setVhProperty);
    return () => window.removeEventListener('resize', setVhProperty);
  }, []);

  // Smooth scrolling with Lenis (only on larger screens)
  useEffect(() => {
    if (window.innerWidth < 768) return; // Skip Lenis on mobile
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  // Backend initialization on page load/refresh
  useEffect(() => {
    const navType = performance.getEntriesByType("navigation")[0]?.type;
    if (!hasInitialized.current && navType === "reload") {
      hasInitialized.current = true;
      fetch(DOMAIN +'/initialize', {
        method: "POST"
      }).catch(err => console.error("Backend initialization failed:", err));
    }
  }, []);

  // Initialize Style Engine
  useEffect(() => {
    const helperElement = document.getElementById('helper-style-span');
    if (!helperElement) {
      throw new Error("Error in system styling. Ensure all styling elements are active.");
    }
  }, []);

  return (
    <>
      <SmoothFollower />
      <div className="relative h-full w-full bg-[#060a13]">
        {/* Grid pattern overlay */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_150%_150%_at_50%_0%,#000_0%,transparent_75%)] hidden sm:block" />

        {/* Radial gradient overlay */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(160%_50%_at_55%_0%,rgba(89,92,250,0.3)_0%,rgba(0,0,0,1)_55%)] hidden sm:block" />
        <SocialButtons />
        {/* Chat container */}
        <Container maxW="none" className="App relative z-10 text-white">
          <HelperFunctionForStyles />
          <ChatWithTrueNotion />
        </Container>
        <LoadedFilesReference />
        {/* Scrollable content after Chat */}
        <main>
          <article>
            {/* Section 1 */}
            <section className="relative text-white min-h-screen w-full bg-slate-950 grid place-content-center sm:sticky sm:top-0">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0" />
              <div className="pointer-events-none absolute top-0 left-0 w-full h-60 bg-gradient-to-b from-black to-transparent z-10" />
              <AgentConfigForm />
              <h1 className="relative z-20 2xl:text-6xl text-3xl px-20 font-semibold text-center tracking-tight leading-[120%]">
                🤖 Personalize your AI Assistant anytime.. <br />
              </h1>
            </section>
            {/* Section 2 */}
            <section className="relative bg-gray-300 text-black grid place-content-center min-h-screen sm:sticky sm:top-0 rounded-tr-2xl rounded-tl-2xl overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0" />
              <h1 className="hidden lg:block relative z-20 2xl:text-6xl text-3xl px-20 font-semibold text-center tracking-tight leading-[120%]">
                🗓️ Integrate RAG-based reasoning into your daily decisions..
              </h1>
              <div className="relative z-10">
                <VideoImageDisplay />
              </div>
              <h1 className="block lg:hidden relative z-20 text-3xl px-4 pt-3 mt-0 font-semibold text-center tracking-tight leading-snug">
                🗓️ Integrate RAG-based reasoning into your daily decisions..
              </h1>
            </section>
            {/* Section 3 */}
            <section className="text-white min-h-screen w-full bg-slate-950 grid place-content-center sm:sticky sm:top-0">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
              <div className="relative z-10">
                <ImageDisplay />
              </div>
              <h1 className="relative z-20 2xl:text-6xl text-3xl px-20 font-semibold text-center tracking-tight leading-[120%]">
                ⚙️ Implementation
              </h1>
            </section>
          </article>
        </main>
      </div>
    </>
  );
}

export default App;
