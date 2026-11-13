import { Container } from '../../../components/Container';
import { DashboardShowcase } from '../../../components/case-study/DashboardShowcase';
import { FeatureItem } from '../../../components/case-study/FeatureItem';
import { SectionHeader } from '../../../components/case-study/SectionHeader';
import { dashboard } from '../../../data/agreement';

export function Dashboard() {
  return (
    <section aria-labelledby="dashboard-title" className="bg-background-inverse py-64 md:py-96 lg:py-112">
      <Container className="flex flex-col gap-48">
        <div className="flex flex-col gap-48">
          <SectionHeader id="dashboard-title" theme="dark" eyebrow={dashboard.eyebrow} title={dashboard.title} />
          <p className="font-archivo text-20 leading-32 text-content-inverse md:text-24 md:leading-36">{dashboard.lead}</p>
        </div>

        <DashboardShowcase />

        <ul className="grid gap-24 sm:grid-cols-2 lg:grid-cols-4">
          {dashboard.features.map((feature) => (
            <li key={feature.number}>
              <FeatureItem theme="dark" {...feature} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
