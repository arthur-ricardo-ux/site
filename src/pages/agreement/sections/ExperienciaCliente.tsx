import { Container } from '../../../components/Container';
import { MomentsExperience } from '../../../components/case-study/MomentsExperience';
import { SectionHeader } from '../../../components/case-study/SectionHeader';
import { experiencia } from '../../../data/agreement';

export function ExperienciaCliente() {
  return (
    <section aria-labelledby="experiencia-title" className="overflow-x-clip bg-background-inverse py-64 md:py-96 lg:py-112">
      <Container>
        <div className="flex flex-col gap-48">
          <SectionHeader id="experiencia-title" theme="dark" eyebrow={experiencia.eyebrow} title={experiencia.title} />
          <p className="font-archivo text-20 leading-32 text-content-inverse md:text-24 md:leading-36">{experiencia.intro}</p>
        </div>

        <div className="mt-48 lg:mt-96">
          <MomentsExperience moments={experiencia.moments} decisionLabel={experiencia.decisionLabel} />
        </div>
      </Container>
    </section>
  );
}
