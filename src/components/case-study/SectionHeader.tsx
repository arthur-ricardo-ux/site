import { cn } from '../../utils';

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  /** "Case / Section Header": Dark em fundo background/inverse, Light em background/primary */
  theme: 'dark' | 'light';
  id?: string;
  className?: string;
  /** Título maior da seção 09 (72/80) */
  size?: 'default' | 'display';
};

export function SectionHeader({ eyebrow, title, theme, id, className, size = 'default' }: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col items-start gap-24', className)}>
      <p className="flex items-center gap-12 font-archivo text-14 leading-20 font-semibold whitespace-nowrap text-content-tertiary">
        <span aria-hidden="true" className="h-px w-24 shrink-0 bg-content-tertiary" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cn(
          'font-archivo font-normal',
          size === 'display'
            ? 'text-40 leading-48 tracking-[-0.015em] md:text-56 md:leading-64 lg:text-72 lg:leading-80'
            : 'text-32 leading-40 md:text-40 md:leading-48 lg:text-48 lg:leading-56',
          theme === 'dark' ? 'text-content-inverse' : 'text-content-primary',
        )}
      >
        {title}
      </h2>
    </div>
  );
}
