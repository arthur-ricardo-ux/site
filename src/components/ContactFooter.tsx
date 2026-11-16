import { scheduleCta, socialLinks } from '../data/contact';
import { sectionIds } from '../data/navigation';
import { cn } from '../utils';
import { Container } from './Container';
import { SocialLink } from './SocialLink';

type ContactFooterProps = {
  title: string;
  description: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

/** "Capa" do fim das páginas internas: título, texto, "Agendar uma conversa" e redes (mesmo bloco da Home) */
export function ContactFooter({ title, description, titleClassName, descriptionClassName }: ContactFooterProps) {
  return (
    <footer id={sectionIds.contact} aria-labelledby="cta-title" className="bg-background-inverse py-64 md:py-96 lg:py-112">
      <Container className="flex flex-col items-center gap-24 text-center">
        <h2
          id="cta-title"
          className={cn('font-archivo font-bold text-content-inverse', titleClassName ?? 'text-36 leading-44 md:text-48 md:leading-56')}
        >
          {title}
        </h2>
        <p className={cn('max-w-702 font-archivo text-content-tertiary', descriptionClassName ?? 'text-18 leading-32')}>
          {description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-12">
          <a
            href={scheduleCta.href}
            className="hover-overlay-on-color flex items-center justify-center gap-8 rounded-[32px] bg-lime px-32 py-12 font-archivo text-14 leading-20 font-semibold whitespace-nowrap text-content-primary"
          >
            {scheduleCta.label}
          </a>
          <ul aria-label="Redes e contato" className="flex items-center gap-12">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <SocialLink link={link} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
