import React from 'react';
import {
  SCOUT_LAWS,
  SCOUT_PRINCIPLES,
  SCOUT_VIRTUES,
  SCOUT_TRAILS,
  PROMISE_SONG,
  PROMISE_TEXT,
  BROTHERHOOD_MOTTO,
  SCOUT_SPIRIT,
} from '../data/patrolData';

export const PedagogyPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      {/* 1. Legile */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#131722] border border-[#1e2433] space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white font-serif-title pb-3 border-b border-[#1e2433]">
          Legile
        </h2>

        <div className="space-y-3">
          {SCOUT_LAWS.map((law, index) => (
            <div key={index} className="flex items-start gap-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              <span className="font-mono text-xs font-bold text-emerald-400 shrink-0 mt-0.5">
                {index + 1}.
              </span>
              <p>{law}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Principiile */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#131722] border border-[#1e2433] space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white font-serif-title pb-3 border-b border-[#1e2433]">
          Principiile
        </h2>

        <div className="space-y-3">
          {SCOUT_PRINCIPLES.map((principle, index) => (
            <div key={index} className="flex items-start gap-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
              <p>{principle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Virtuțile */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#131722] border border-[#1e2433] space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white font-serif-title pb-3 border-b border-[#1e2433]">
          Virtuțile
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SCOUT_VIRTUES.map((virtue, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-[#0c0e14] border border-[#1e2433] text-center"
            >
              <span className="text-base font-semibold text-white capitalize font-serif-title">
                {virtue}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Potecile cercetășești */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#131722] border border-[#1e2433] space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white font-serif-title pb-3 border-b border-[#1e2433]">
          Potecile cercetășești
        </h2>

        <div className="space-y-3">
          {SCOUT_TRAILS.map((trail) => (
            <div
              key={trail.name}
              className="p-4 rounded-xl bg-[#0c0e14] border border-[#1e2433] flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3"
            >
              <div className="flex items-center gap-2 shrink-0">
                <span className={`px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider ${trail.badgeBg}`}>
                  {trail.name}
                </span>
                <span className="text-slate-400 text-sm hidden sm:inline">:</span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {trail.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Cântecul promisiunii */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#131722] border border-[#1e2433] space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white font-serif-title pb-3 border-b border-[#1e2433]">
          {PROMISE_SONG.title}
        </h2>

        <div className="space-y-4 max-w-md">
          {PROMISE_SONG.strophes.map((strophe, sIdx) => (
            <div key={sIdx} className="space-y-0.5 text-slate-300 text-sm sm:text-base leading-relaxed font-serif">
              {strophe.map((line, lIdx) => (
                <p key={lIdx}>{line}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* 6. Textul promisiunii */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#131722] border border-[#1e2433] space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white font-serif-title pb-3 border-b border-[#1e2433]">
          {PROMISE_TEXT.title}
        </h2>

        <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-serif italic bg-[#0c0e14] p-5 rounded-xl border border-[#1e2433]">
          „{PROMISE_TEXT.text}”
        </p>
      </section>

      {/* 7. Cel mare îl ajută pe cel mic */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#131722] border border-[#1e2433] space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-white font-serif-title pb-3 border-b border-[#1e2433]">
          {BROTHERHOOD_MOTTO.title}
        </h2>

        <div className="space-y-2 text-slate-300 text-sm leading-relaxed">
          <p>{BROTHERHOOD_MOTTO.paragraph1}</p>
          <p>{BROTHERHOOD_MOTTO.paragraph2}</p>
        </div>
      </section>

      {/* 8. Spiritul */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#131722] border border-[#1e2433] space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-white font-serif-title pb-3 border-b border-[#1e2433]">
          {SCOUT_SPIRIT.title}
        </h2>

        <div className="space-y-2 text-slate-300 text-sm leading-relaxed">
          <p>{SCOUT_SPIRIT.paragraph1}</p>
          <p>{SCOUT_SPIRIT.paragraph2}</p>
        </div>
      </section>
    </div>
  );
};
