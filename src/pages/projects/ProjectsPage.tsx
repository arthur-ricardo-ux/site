import dividerLime from '../../assets/icons/divider-lime.svg';
import { CaseStudyCard } from '../../components/CaseStudyCard';
import { ContactFooter } from '../../components/ContactFooter';
import { Container } from '../../components/Container';
import { Header } from '../../components/Header';
import { allProjects, projectsCta, projectsIntro } from '../../data/projects';

/** Página "Todos os projetos" (Figma 526:4954) */
export function ProjectsPage() {
  return (
    <div className="page bg-background-inverse">
      <Header basePath="/" theme="dark" />
      <main>
        {/* "Cabeçalho" (544:1170) */}
        <Container className="flex flex-col items-center gap-24 pt-48 pb-40 text-center md:gap-32 md:pt-80 md:pb-64">
          <div className="flex w-320 max-w-full flex-col items-center gap-12">
            <h1 className="font-archivo text-38 leading-[1.2] font-bold tracking-[-0.01em] text-content-inverse md:text-52">
              {projectsIntro.title}
            </h1>
            {/* "divider [1.0]": altura 0 no layout, o traço de 2px fica acima da linha (como no Figma) */}
            <img src={dividerLime} alt="" width={320} height={2} className="-mt-2 h-2 w-full" />
          </div>
          <p className="font-archivo text-18 leading-28 text-content-inverse md:text-20 md:leading-32">
            {projectsIntro.description[0]}
            <br className="max-md:hidden" />
            {projectsIntro.description[1]}
          </p>
        </Container>

        {/* "Galeria de projetos" (544:1191): cards de 1024×540 empilhados, 48px entre eles */}
        <ul aria-label="Projetos" className="flex flex-col items-center gap-24 px-(--gutter) md:gap-48">
          {allProjects.map((project, index) => (
            <li key={project.id} className="flex justify-center max-md:w-full">
              <CaseStudyCard study={project} eager={index === 0} />
            </li>
          ))}
        </ul>
      </main>

      {/* "Capa" (526:4970) */}
      <ContactFooter
        title={projectsCta.title}
        description={projectsCta.description}
        titleClassName="text-32 leading-40 md:text-40 md:leading-48"
        descriptionClassName="text-18 leading-32 md:text-20"
      />
    </div>
  );
}
