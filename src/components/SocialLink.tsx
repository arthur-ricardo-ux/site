import type { SocialLinkData } from '../data/contact';

/** Instâncias Linkedin / Whatsapp / Email do Figma (variantes Hover=off / Hover=on) */
export function SocialLink({ link }: { link: SocialLinkData }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.label}
      className="group flex size-44 shrink-0 items-center justify-center rounded-[32px] border border-border-secondary bg-white p-12 transition-colors duration-150 hover:bg-background-tertiary"
    >
      <span className="relative size-20">
        <img
          src={link.icon}
          alt=""
          width={20}
          height={20}
          className="absolute inset-0 transition-opacity duration-150 group-hover:opacity-0"
        />
        <img
          src={link.hoverIcon}
          alt=""
          width={20}
          height={20}
          className="absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        />
      </span>
    </a>
  );
}
