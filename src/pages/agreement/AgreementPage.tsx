import { Header } from '../../components/Header';
import { AgreementHero } from './sections/AgreementHero';
import { Contexto } from './sections/Contexto';
import { Problema } from './sections/Problema';
import { Hipotese } from './sections/Hipotese';
import { Solucao } from './sections/Solucao';
import { ExperienciaCliente } from './sections/ExperienciaCliente';
import { Inteligencia } from './sections/Inteligencia';
import { Dashboard } from './sections/Dashboard';
import { Dados } from './sections/Dados';
import { Resultados } from './sections/Resultados';
import { Cta } from './sections/Cta';

/** Estudo de caso "Contratações bancárias guiadas por agentes de IA" (Figma 424:6646) */
export function AgreementPage() {
  return (
    <div className="page">
      <Header basePath="/" theme="dark" />
      <main>
        <AgreementHero />
        <Contexto />
        <Problema />
        <Hipotese />
        <Solucao />
        <ExperienciaCliente />
        <Inteligencia />
        <Dashboard />
        <Dados />
        <Resultados />
      </main>
      <Cta />
    </div>
  );
}
