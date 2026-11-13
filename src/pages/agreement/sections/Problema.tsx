import { Container } from '../../../components/Container';
import { SectionHeader } from '../../../components/case-study/SectionHeader';
import { problema } from '../../../data/agreement';

export function Problema() {
  return (
    <section aria-labelledby="problema-title" className="bg-background-primary py-64 md:py-96 lg:py-112">
      <Container className="flex flex-col gap-48 lg:gap-64">
        <div className="flex flex-col gap-32">
          <SectionHeader id="problema-title" theme="light" eyebrow={problema.eyebrow} title={problema.title} />
          <p className="max-w-904 font-archivo text-20 leading-32 text-content-primary md:text-24 md:leading-36">
            {problema.intro}
          </p>
        </div>

        {/* "Case / Problem Card" */}
        <ul className="grid gap-24 sm:grid-cols-2 lg:grid-cols-4">
          {problema.cards.map((card) => (
            <li
              key={card.number}
              className="flex flex-col gap-40 rounded-[20px] border border-border-primary bg-background-primary p-24"
            >
              <div className="flex items-center justify-between">
                <img src={card.icon} alt="" width={card.iconSize} height={card.iconSize} style={{ width: card.iconSize, height: card.iconSize }} />
                <span className="font-archivo text-14 leading-20 font-semibold text-content-tertiary">{card.number}</span>
              </div>
              <div className="flex flex-col gap-8">
                <h3 className="font-archivo text-20 leading-28 font-bold text-content-primary">{card.title}</h3>
                <p className="font-archivo text-14 leading-20 tracking-[0.025em] text-content-secondary">{card.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
