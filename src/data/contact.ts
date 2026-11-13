import linkedinIcon from '../assets/icons/linkedin.svg';
import linkedinHoverIcon from '../assets/icons/linkedin-hover.svg';
import whatsappIcon from '../assets/icons/whatsapp.svg';
import whatsappHoverIcon from '../assets/icons/whatsapp-hover.svg';
import mailIcon from '../assets/icons/mail-send-envelope.svg';
import mailHoverIcon from '../assets/icons/mail-send-envelope-hover.svg';

// URLs definidas nas interações de protótipo do Figma (ON_CLICK → URL)
const whatsappUrl =
  'https://wa.me/5527996400180?text=Oi,%20Arthur!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20com%20voc%C3%AA%20sobre%20uma%20poss%C3%ADvel%20oportunidade.';

export const scheduleCta = {
  label: 'Agendar uma conversa',
  href: whatsappUrl,
};

export type SocialLinkData = {
  label: string;
  href: string;
  icon: string;
  hoverIcon: string;
};

export const socialLinks: SocialLinkData[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/arthur-ricardo-ux/',
    icon: linkedinIcon,
    hoverIcon: linkedinHoverIcon,
  },
  {
    label: 'WhatsApp',
    href: whatsappUrl,
    icon: whatsappIcon,
    hoverIcon: whatsappHoverIcon,
  },
  {
    label: 'E-mail',
    href: 'mailto:arthur.at.almeida@gmail.com?subject=Contato+pelo+portf%C3%B3lio&body=Oi,+Arthur!+Vi+seu+portf%C3%B3lio+e+gostaria+de+conversar+com+voc%C3%AA+sobre+uma+poss%C3%ADvel+oportunidade.',
    icon: mailIcon,
    hoverIcon: mailHoverIcon,
  },
];
