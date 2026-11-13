import { Fragment } from 'react';
import { Container } from '../components/Container';
import { TrajectoryItem } from '../components/TrajectoryItem';
import { sectionIds } from '../data/navigation';
import { trajectoryIntro, trajectoryItems } from '../data/trajectory';

/** Componente "divider [1.0]" (type=Line) do design system: linha de 1px sem altura no layout */
function Divider() {
  return <hr className="-mt-1 border-0 border-t border-border-primary" />;
}

export function Trajectory() {
  return (
    <section
      id={sectionIds.about}
      aria-labelledby="trajectory-title"
      className="theme-dark bg-background-primary py-64 md:py-96 lg:py-112"
    >
      <Container size="narrow" className="flex flex-col gap-24">
        <div className="flex flex-col gap-10">
          <h2
            id="trajectory-title"
            className="font-archivo text-32 leading-40 font-bold text-content-primary md:text-40 md:leading-48"
          >
            {trajectoryIntro.title}
          </h2>
          <p className="font-archivo text-14 leading-20 tracking-[0.025em] text-content-secondary">
            {trajectoryIntro.description}
          </p>
        </div>

        {trajectoryItems.map((item) => (
          <Fragment key={item.id}>
            <Divider />
            <TrajectoryItem item={item} />
          </Fragment>
        ))}
      </Container>
    </section>
  );
}
