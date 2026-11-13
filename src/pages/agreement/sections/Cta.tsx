import { Container } from '../../../components/Container';
import { SocialLink } from '../../../components/SocialLink';
import { scheduleCta, socialLinks } from '../../../data/contact';
import { cta } from '../../../data/agreement';
import { sectionIds } from '../../../data/navigation';

/** "Capa" (fim do estudo): mesmo bloco de contato da Home, com o texto deste projeto */
export function Cta() {
  return (
    <footer id={sectionIds.contact} aria-labelledby="cta-title" className="bg-background-inverse py-64 md:py-96 lg:py-112">
      <Container className="flex flex-col items-center gap-24 text-center">
        <h2 id="cta-title" className="font-archivo text-36 leading-44 font-bold text-content-inverse md:text-48 md:leading-56">
          {cta.title}
        </h2>
        <p className="max-w-702 font-archivo text-18 leading-32 text-content-tertiary">{cta.description}</p>

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
