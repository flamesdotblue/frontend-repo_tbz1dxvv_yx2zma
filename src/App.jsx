import React from 'react';
import Hero from './components/Hero';
import FeeCalculator from './components/FeeCalculator';
import Features from './components/Features';
import FAQ from './components/FAQ';

function App() {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      {/* Decoración de fondo */}
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-fuchsia-600/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-700/20 blur-3xl" />
      </div>

      <Hero />
      <Features />
      <FeeCalculator />
      <FAQ />

      <footer className="border-t border-white/10 bg-black/60 py-10 text-center text-sm text-white/60">
        <div className="mx-auto max-w-6xl px-6">
          <p>
            © {new Date().getFullYear()} Abogacía Futurista — Calculadora de honorarios orientativa. No
            constituye asesoramiento jurídico.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
