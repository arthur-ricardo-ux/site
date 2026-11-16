import { ContactFooter } from '../../../components/ContactFooter';
import { cta } from '../../../data/agreement';

/** "Capa" (fim do estudo): mesmo bloco de contato da Home, com o texto deste projeto */
export function Cta() {
  return <ContactFooter title={cta.title} description={cta.description} />;
}
