import React from 'react';
import { Calculator, Shield, Zap, Rocket } from 'lucide-react';

const FeatureCard = ({ Icon, title, desc }) => (
  <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-fuchsia-500/30 hover:bg-white/10">
    <div className="mb-3 inline-flex rounded-xl bg-fuchsia-600/20 p-3 text-fuchsia-300 ring-1 ring-inset ring-fuchsia-500/30">
      <Icon className="h-5 w-5" />
    </div>
    <h4 className="text-lg font-semibold text-white">{title}</h4>
    <p className="mt-2 text-sm text-white/70">{desc}</p>
  </div>
);

const Features = () => {
  const items = [
    {
      Icon: Calculator,
      title: 'Cálculo progresivo',
      desc: 'Aplicación de tramos por cuantía con mínimos y complementos personalizables.',
    },
    {
      Icon: Shield,
      title: 'Basado en criterios',
      desc: 'Inspirado en orientaciones colegiales, adaptable a cada jurisdicción.',
    },
    {
      Icon: Zap,
      title: 'Rápido y claro',
      desc: 'Resultados instantáneos con desglose detallado y formato en euros.',
    },
    {
      Icon: Rocket,
      title: 'Pensado para SaaS',
      desc: 'Arquitectura lista para integrarse en tu flujo: presupuestos, minutas y más.',
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 text-white">
      <h3 className="text-center text-2xl font-semibold md:text-3xl">Diseñado para abogados del futuro</h3>
      <p className="mx-auto mt-2 max-w-2xl text-center text-white/70">
        Una experiencia elegante, veloz y precisa en un entorno visual futurista.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {items.map((f, i) => (
          <FeatureCard key={i} Icon={f.Icon} title={f.title} desc={f.desc} />
        ))}
      </div>
    </section>
  );
};

export default Features;
