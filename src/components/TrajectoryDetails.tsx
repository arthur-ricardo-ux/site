import type {
  CourseEntry,
  EducationEntry,
  ExperienceAccent,
  ExperienceEntry,
  TrajectoryDetails as TrajectoryDetailsData,
} from '../data/trajectory';
import { cn } from '../utils';

const accentClasses: Record<ExperienceAccent, string> = {
  blue: 'bg-accent-blue',
  green: 'bg-accent-green',
  yellow: 'bg-accent-yellow',
  pink: 'bg-accent-pink',
};

/** Conteúdo exibido ao expandir um item de "Minha trajetória" */
export function TrajectoryDetails({ details }: { details: TrajectoryDetailsData }) {
  switch (details.kind) {
    case 'text': {
      const text = (
        <div className="flex flex-col gap-24 font-archivo text-16 leading-24 text-content-secondary">
          {details.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      );
      if (!details.photos) return <div className="max-w-800">{text}</div>;
      // "Sobre mim" expandido (Figma 471:7431): texto com fio à esquerda + grade 2×2 de fotos
      return (
        <div className="flex max-w-1152 flex-col gap-32 rounded-[32px] bg-background-inverse p-16 lg:flex-row lg:items-stretch lg:gap-48">
          <div className="flex min-w-px flex-1 gap-16">
            <span aria-hidden="true" className="w-2 shrink-0 self-stretch bg-silver" />
            {text}
          </div>
          <ul className="grid grid-cols-2 gap-16 sm:gap-24 md:grid-cols-4 lg:shrink-0 lg:grid-cols-[220px_220px] lg:grid-rows-2">
            {details.photos.map((photo) => (
              <li
                key={photo.src}
                className="relative aspect-[220/302] overflow-clip rounded-[24px] border-2 border-border-primary sm:rounded-[32px] lg:aspect-auto"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  decoding="async"
                  className="absolute max-w-none object-cover"
                  style={{
                    left: `${photo.crop.left}%`,
                    top: `${photo.crop.top}%`,
                    width: `${photo.crop.width}%`,
                    height: `${photo.crop.height}%`,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      );
    }
    case 'experience':
      return (
        <ol className="flex flex-col gap-24">
          {details.entries.map((entry) => (
            <ExperienceCard key={entry.role} entry={entry} />
          ))}
        </ol>
      );
    case 'education':
      return (
        <div className="flex flex-col gap-48">
          <ul className="grid gap-24 md:grid-cols-3">
            {details.entries.map((entry) => (
              <EducationCard key={entry.title} entry={entry} />
            ))}
          </ul>
          {details.courses && (
            <section aria-labelledby="cursos-titulo" className="flex flex-col gap-24">
              <h4 id="cursos-titulo" className="font-archivo text-20 leading-28 font-bold text-content-primary">
                Cursos e Certificados
              </h4>
              <ul className="grid gap-16 sm:grid-cols-2 sm:gap-24 lg:grid-cols-3">
                {details.courses.map((course) => (
                  <CourseCard key={course.title} course={course} />
                ))}
              </ul>
            </section>
          )}
        </div>
      );
  }
}

function ExperienceCard({ entry }: { entry: ExperienceEntry }) {
  return (
    <li className="flex gap-20 rounded-[32px] bg-background-inverse p-24 md:p-32">
      <span aria-hidden="true" className={cn('w-4 shrink-0 self-stretch rounded-full', accentClasses[entry.accent])} />
      <div className="flex min-w-px flex-1 flex-col gap-8 py-4">
        <div className="flex flex-wrap items-baseline gap-x-12 gap-y-2">
          <h4 className="font-archivo text-20 leading-28 font-bold text-content-primary">{entry.role}</h4>
          <p className="font-archivo text-16 leading-24 text-content-tertiary">{entry.period}</p>
        </div>
        <ul className="font-archivo text-16 leading-24 text-content-secondary">
          {entry.highlights.map((highlight) => (
            <li key={highlight}>
              <span aria-hidden="true">• </span>
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

/** Card de curso: só o link "Ver certificado" (quando houver) é interativo, não o card */
function CourseCard({ course }: { course: CourseEntry }) {
  const meta = [course.year, course.duration].filter(Boolean).join(' · ');
  const { box } = course.icon;

  return (
    <li className="flex items-center gap-16 rounded-[24px] bg-background-inverse px-16 py-16 sm:px-20">
      <span aria-hidden="true" className={cn('relative size-56 shrink-0 overflow-hidden rounded-full', box && 'bg-white')}>
        <img
          src={course.icon.src}
          alt=""
          loading="lazy"
          className={cn('absolute max-w-none', box ? 'object-contain' : 'inset-0 size-full object-cover')}
          style={box && { left: `${box.left}%`, top: `${box.top}%`, width: `${box.width}%`, height: `${box.height}%` }}
        />
      </span>
      <div className="flex min-w-px flex-1 flex-col gap-4">
        <h5 className="font-archivo text-18 leading-24 font-bold text-content-primary sm:text-20 sm:leading-28">{course.title}</h5>
        <p className="font-archivo text-14 leading-20 tracking-[0.025em] text-content-secondary">{course.institution}</p>
        {meta && <p className="font-archivo text-14 leading-20 text-content-tertiary">{meta}</p>}
        {course.certificateUrl && (
          <a
            href={course.certificateUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 self-start font-archivo text-14 leading-20 font-semibold text-accent-highlight underline-offset-4 hover:underline"
          >
            Ver certificado<span className="sr-only"> de {course.title} (abre em nova aba)</span>
          </a>
        )}
      </div>
    </li>
  );
}

function EducationCard({ entry }: { entry: EducationEntry }) {
  return (
    <li className="flex flex-col gap-16 rounded-[32px] bg-background-inverse p-24">
      <img
        src={entry.logo.src}
        alt={entry.logo.alt}
        width={56}
        height={56}
        loading="lazy"
        className="size-56"
      />
      <div className="flex flex-col items-start gap-8">
        <h4 className="font-archivo text-20 leading-28 font-bold text-content-primary">{entry.title}</h4>
        <p className="rounded-[50px] bg-action-hover-on-dark px-12 py-4 font-archivo text-14 leading-20 font-semibold whitespace-nowrap text-content-inverse">
          {entry.period}
        </p>
      </div>
    </li>
  );
}
