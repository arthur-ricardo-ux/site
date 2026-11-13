import { cn } from '../../utils';

type FeatureItemProps = {
  number: string;
  title: string;
  description: string;
  /** "Case / Feature Item": Light com linha superior; Dark (seção 07) sem linha */
  theme: 'dark' | 'light';
};

export function FeatureItem({ number, title, description, theme }: FeatureItemProps) {
  const dark = theme === 'dark';
  return (
    <div className={cn('flex flex-col gap-8 pt-20', !dark && 'border-t border-border-primary')}>
      <div className={cn('flex items-center gap-8', dark ? 'text-content-inverse' : 'text-content-primary')}>
        <span className={cn('font-archivo text-14 leading-20 font-semibold', !dark && 'text-content-tertiary')}>{number}</span>
        <h3 className="min-w-px flex-1 font-archivo text-20 leading-28 font-bold">{title}</h3>
      </div>
      <p
        className={cn(
          'font-archivo text-14 leading-20 tracking-[0.025em]',
          dark ? 'text-content-tertiary' : 'text-content-secondary',
        )}
      >
        {description}
      </p>
    </div>
  );
}
