import React, { useMemo, useState } from 'react';

// Tramos progresivos de cuantía (inspirado en criterios orientadores)
// Cada tramo: hasta, porcentaje
const TRAMOS = [
  { hasta: 3000, pct: 0.15 },
  { hasta: 6000, pct: 0.12 },
  { hasta: 30000, pct: 0.10 },
  { hasta: 60000, pct: 0.08 },
  { hasta: 300000, pct: 0.06 },
  { hasta: Infinity, pct: 0.04 },
];

const formatEUR = (n) =>
  n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 });

function calcularBase(cuantia) {
  if (!cuantia || cuantia <= 0) return 0;
  let restante = cuantia;
  let base = 0;
  let previo = 0;

  for (const tramo of TRAMOS) {
    const limite = isFinite(tramo.hasta) ? tramo.hasta : cuantia;
    const porcion = Math.max(Math.min(restante, limite - previo), 0);
    if (porcion <= 0) break;
    base += porcion * tramo.pct;
    restante -= porcion;
    previo = limite;
  }
  return base;
}

const FeeCalculator = () => {
  const [cuantia, setCuantia] = useState(12000);
  const [complejidad, setComplejidad] = useState('media'); // baja 0.9, media 1, alta 1.2
  const [exitoPct, setExitoPct] = useState(0);
  const [incluirIVA, setIncluirIVA] = useState(true);
  const [procurador, setProcurador] = useState(0);
  const [minimo, setMinimo] = useState(350);

  const factorComplejidad = useMemo(() => {
    if (complejidad === 'baja') return 0.9;
    if (complejidad === 'alta') return 1.2;
    return 1;
  }, [complejidad]);

  const resultado = useMemo(() => {
    const base = calcularBase(Number(cuantia) || 0);
    const ajustada = base * factorComplejidad;
    const conMinimo = Math.max(ajustada, Number(minimo) || 0);
    const exito = conMinimo * ((Number(exitoPct) || 0) / 100);
    const subtotal = conMinimo + exito + (Number(procurador) || 0);
    const iva = incluirIVA ? subtotal * 0.21 : 0;
    const total = subtotal + iva;
    return { base, ajustada, conMinimo, exito, subtotal, iva, total };
  }, [cuantia, factorComplejidad, exitoPct, incluirIVA, procurador, minimo]);

  return (
    <section id="calculadora" className="relative z-0 mx-auto max-w-6xl px-6 py-16 text-white">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="text-3xl font-semibold md:text-4xl">Calcula tus honorarios</h2>
          <p className="mt-2 max-w-2xl text-white/70">
            Este estimador aplica tramos progresivos por cuantía, permite ajustar por complejidad y
            añade, si procede, cuota de éxito e IVA. Es orientativo y no sustituye a los criterios
            del Colegio correspondiente.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Panel de entradas */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm text-white/80">Cuantía del asunto (€)</label>
              <input
                type="number"
                value={cuantia}
                onChange={(e) => setCuantia(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none ring-fuchsia-500/40 focus:ring"
                min={0}
                step="100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/80">Complejidad</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'baja', label: 'Baja' },
                  { key: 'media', label: 'Media' },
                  { key: 'alta', label: 'Alta' },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setComplejidad(opt.key)}
                    className={`rounded-xl px-4 py-2 text-sm transition ${
                      complejidad === opt.key
                        ? 'bg-fuchsia-600 text-white'
                        : 'bg-white/5 text-white/80 hover:bg-white/10'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <p className="mt-1 text-xs text-white/50">Baja: -10%, Alta: +20% sobre el cálculo base</p>
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/80">Honorario mínimo (€)</label>
              <input
                type="number"
                value={minimo}
                onChange={(e) => setMinimo(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none ring-fuchsia-500/40 focus:ring"
                min={0}
                step="10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/80">Cuota de éxito (%)</label>
              <input
                type="number"
                value={exitoPct}
                onChange={(e) => setExitoPct(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none ring-fuchsia-500/40 focus:ring"
                min={0}
                max={100}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/80">Procurador (€) opcional</label>
              <input
                type="number"
                value={procurador}
                onChange={(e) => setProcurador(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none ring-fuchsia-500/40 focus:ring"
                min={0}
                step="10"
              />
            </div>

            <label className="flex items-center gap-3 text-sm text-white/80">
              <input
                type="checkbox"
                checked={incluirIVA}
                onChange={(e) => setIncluirIVA(e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-black/60 text-fuchsia-600 focus:ring-fuchsia-500/40"
              />
              Incluir IVA (21%)
            </label>
          </div>
        </div>

        {/* Panel de resultados */}
        <div className="rounded-2xl border border-fuchsia-500/20 bg-gradient-to-b from-fuchsia-500/10 to-purple-700/10 p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">Resultado</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between text-white/80">
              <span>Base por tramos</span>
              <span>{formatEUR(resultado.base)}</span>
            </div>
            <div className="flex items-center justify-between text-white/80">
              <span>Factor complejidad</span>
              <span>{formatEUR(resultado.ajustada)}</span>
            </div>
            <div className="flex items-center justify-between text-white/80">
              <span>Aplicación mínimo</span>
              <span>{formatEUR(resultado.conMinimo)}</span>
            </div>
            <div className="flex items-center justify-between text-white/80">
              <span>Cuota de éxito</span>
              <span>{formatEUR(resultado.exito)}</span>
            </div>
            <div className="flex items-center justify-between text-white/80">
              <span>Procurador</span>
              <span>{formatEUR(Number(procurador) || 0)}</span>
            </div>
            <div className="flex items-center justify-between text-white/80">
              <span>Subtotal</span>
              <span>{formatEUR(resultado.subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-white/80">
              <span>IVA (21%)</span>
              <span>{formatEUR(resultado.iva)}</span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-base font-semibold">
              <span>Total estimado</span>
              <span className="text-fuchsia-400">{formatEUR(resultado.total)}</span>
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-white/60">
            Aviso: Cálculo orientativo, no vinculante. Las tablas reales pueden variar según Colegio de
            Abogados, jurisdicción, fase procesal y otros factores. Verifique siempre con su Colegio.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeeCalculator;
