import { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './sections/Hero';
import { CaseStudies } from './sections/CaseStudies';
import { Services } from './sections/Services';
import { Trajectory } from './sections/Trajectory';
import { Contact } from './sections/Contact';

export default function App() {
  // Vindo de outra página (ex.: /#sobre-mim na topbar do estudo de caso), o navegador procura a âncora
  // antes de o React desenhar a Home: rola até ela depois que a página carrega
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const scrollToAnchor = () => document.getElementById(id)?.scrollIntoView();
    if (document.readyState === 'complete') scrollToAnchor();
    else window.addEventListener('load', scrollToAnchor, { once: true });
    return () => window.removeEventListener('load', scrollToAnchor);
  }, []);

  return (
    <div className="page">
      <Header />
      <main>
        <Hero />
        <CaseStudies />
        <Services />
        <Trajectory />
      </main>
      <Contact />
    </div>
  );
}
