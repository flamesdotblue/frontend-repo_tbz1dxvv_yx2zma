import React, { useState } from 'react';

const QA = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4 text-left text-white"
      >
        <span className="font-medium">{q}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`h-5 w-5 transition ${open ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 text-sm text-white/70">{a}</div>}
    </div>
  );
};

const FAQ = () => {
  const qas = [
    {
      q: '¿Es vinculante el resultado?',
      a: 'No. Es una estimación orientativa y puede variar según Colegio de Abogados, jurisdicción, fase procesal y particularidades del caso.',
    },
    {
      q: '¿Incluye IVA?',
      a: 'Puedes activar o desactivar el IVA (21%) desde la calculadora. El cálculo muestra el desglose detallado.',
    },
    {
      q: '¿Puedo añadir cuota de éxito?',
      a: 'Sí. Añade un porcentaje sobre el honorario para supuestos de éxito, muy útil en acuerdos de cuota litis dentro de los límites legales.',
    },
    {
      q: '¿Qué tramos se aplican?',
      a: 'Se aplican tramos progresivos de ejemplo (15% hasta 3.000€, 12% hasta 6.000€, 10% hasta 30.000€, 8% hasta 60.000€, 6% hasta 300.000€, 4% en adelante). Puedes ajustarlos a tu criterio en futuras versiones.',
    },
  ];

  return (
    <section id="faq" className="mx-auto max-w-6xl px-6 py-16 text-white">
      <h3 className="text-center text-2xl font-semibold md:text-3xl">Preguntas frecuentes</h3>
      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-4">
        {qas.map((item, idx) => (
          <QA key={idx} q={item.q} a={item.a} />
        ))}
      </div>
    </section>
  );
};

export default FAQ;
