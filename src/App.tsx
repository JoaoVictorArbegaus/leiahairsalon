import { LazyMotion, MotionConfig, domAnimation, useReducedMotion } from 'motion/react';
import { ReactLenis } from 'lenis/react';
import { Footer, WhatsAppFloat } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SvgDefs } from './components/Icons';
import { About, Brides, Houses, Seam, Services } from './components/Sections';
import { useLandingEffects } from './hooks/useLandingEffects';
import './styles/landing.css';

export function App() {
  useLandingEffects();
  const reduce = useReducedMotion();

  return (
    // LazyMotion + m.*: carrega só os recursos de animação de DOM usados na página (bundle menor)
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        {/* rolagem suave com inércia. Âncoras sem deslocamento: as seções já reservam a altura do cabeçalho fixo */}
        {!reduce && <ReactLenis root options={{ lerp: 0.085, anchors: { offset: 0 } }} />}
        <a className="skip" href="#conteudo">
          Pular para o conteúdo
        </a>
        <SvgDefs />
        <Header />

        <main id="conteudo">
          <Hero />
          <Seam />
          <Services />
          <Brides />
          <About />
          <Houses />
        </main>

        <Footer />
        <WhatsAppFloat />
      </MotionConfig>
    </LazyMotion>
  );
}
