import type { Service, ServiceTone } from '../data/services';
import { cn, linkProps } from '../utils';

const tones: Record<ServiceTone, { card: string; badge: string; title: string; text: string; icon: string }> = {
  dark: {
    card: 'bg-background-inverse',
    badge: 'bg-action-hover-on-dark text-content-inverse',
    title: 'text-content-inverse',
    text: 'text-content-inverse',
    icon: 'text-white',
  },
  gray: {
    card: 'bg-background-tertiary',
    badge: 'bg-action-hover-on-color text-black',
    title: 'text-black',
    text: 'text-content-secondary',
    icon: 'text-[#1a1a1a]',
  },
  lime: {
    card: 'bg-lime',
    badge: 'bg-action-hover-on-color text-black',
    title: 'text-black',
    text: 'text-content-secondary',
    icon: 'text-[#1a1a1a]',
  },
};

export function ServiceCard({ service, className }: { service: Service; className?: string }) {
  const tone = tones[service.tone];

  return (
    <a
      {...linkProps(service.href)}
      style={{ rotate: `${service.rotate}deg` }}
      className={cn(
        'flex w-268 flex-col gap-48 rounded-[32px] p-24 transition-[translate] duration-200 ease-out hover:-translate-y-4',
        tone.card,
        className,
      )}
    >
      <div className="flex w-full items-center justify-between">
        <span
          className={cn(
            'flex w-44 items-center justify-center rounded-[50px] p-10 text-center font-archivo text-16 leading-24 font-semibold',
            tone.badge,
          )}
        >
          {service.number}
        </span>
        <service.icon aria-hidden="true" strokeWidth={2} className={cn('size-24 shrink-0', tone.icon)} />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className={cn('font-archivo text-20 leading-28 font-bold', tone.title)}>{service.title}</h3>
        <p className={cn('font-archivo text-16 leading-24', tone.text)}>{service.description}</p>
      </div>
    </a>
  );
}
