import React from 'react';
import Spline from '@splinetool/react-spline';

const Hero = () => {
  const handleScroll = () => {
    const el = document.getElementById('calculadora');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pt-28 text-center md:pt-36">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-widest text-white/80 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-fuchsia-500" /> Beta
        </span>
        <h1 className="text-balance bg-gradient-to-b from-white to-white/70 bg-clip-text text-4xl font-semibold leading-tight text-transparent md:text-6xl">
          Calculadora de Honorarios para Abogacía en España
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-base text-white/80 md:text-lg">
          Estima honorarios según cuantía, complejidad, éxito e IVA con un enfoque
          inspirado en los criterios orientadores de los Colegios de Abogados.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleScroll}
            className="group relative inline-flex items-center gap-2 rounded-xl bg-fuchsia-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-fuchsia-500"
          >
            Comenzar cálculo
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4 transition group-hover:translate-x-0.5"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
          <a
            href="#faq"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm text-white/90 transition hover:bg-white/10"
          >
            ¿Cómo funciona?
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
