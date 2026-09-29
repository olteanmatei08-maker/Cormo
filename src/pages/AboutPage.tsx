import React, { useState } from 'react';
import { CormorantEmblem } from '../components/CormorantEmblem';
import {
  PATROL_TESTAMENT,
  PATROL_HISTORY,
  PATROL_LEADERS,
} from '../data/patrolData';
import {
  Search,
  Shield,
  Heart,
  Users,
  Compass,
  Scroll,
  Mountain,
  ExternalLink,
} from 'lucide-react';

function getPatrolYears(): number {
  const today = new Date();
  const currentYear = today.getFullYear();
  // Month is 0-indexed: October is 9
  const hasPassedOct5 =
    today.getMonth() > 9 || (today.getMonth() === 9 && today.getDate() >= 5);
  return hasPassedOct5 ? currentYear - 2002 : currentYear - 2002 - 1;
}

export const AboutPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const patrolYears = getPatrolYears();

  const filteredLeaders = PATROL_LEADERS.filter((l) =>
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.period.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const dimensions = [
    {
      title: 'Natura',
      desc: 'Locul desfășurării tuturor activităţilor.',
      icon: Mountain,
    },
    {
      title: 'Patrula',
      desc: 'Unitatea de bază a cercetășiei.',
      icon: Users,
    },
    {
      title: 'Legea',
      desc: 'Ghid al comportamentului cercetășesc.',
      icon: Scroll,
    },
    {
      title: 'Promisiunea',
      desc: 'Promisiune făcută în mod liber.',
      icon: Heart,
    },
    {
      title: 'Spiritul civic',
      desc: 'Promovarea responsabilității față de comunitate.',
      icon: Shield,
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-4">
      {/* ========================================================================= */}
      {/* PARTEA 1: TOT CE ERA ÎN PAGINA ACASĂ */}
      {/* ========================================================================= */}

      {/* App Header & Cormorant Bird Emblem */}
      <section className="min-h-[calc(100vh-16rem)] flex flex-col justify-center items-center text-center space-y-4 pt-4 pb-8">
        <CormorantEmblem size="xl" />

        <div className="space-y-1.5">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif-title uppercase">
            Patrula Cormoran
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-medium">
            Cercetașii Munților
          </p>
          <p className="text-xs text-emerald-400 font-medium tracking-wide">
            {patrolYears} de ani de activitate
          </p>
        </div>
      </section>

      {/* Testament */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#131722] border border-[#1e2433] space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white font-serif-title pb-3 border-b border-[#1e2433]">
          {PATROL_TESTAMENT.title}
        </h2>

        <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
          <p>{PATROL_TESTAMENT.text1}</p>
          <p>{PATROL_TESTAMENT.text2}</p>
          <p className="text-white italic pl-4 border-l-2 border-emerald-500 py-1">
            „{PATROL_TESTAMENT.text3}”
          </p>
        </div>

        <div className="pt-3 border-t border-[#1e2433] text-right">
          <span className="text-xs sm:text-sm font-semibold text-slate-300">
            — {PATROL_TESTAMENT.author}
          </span>
        </div>
      </section>

      {/* Scurt istoric */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#131722] border border-[#1e2433] space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-white font-serif-title pb-3 border-b border-[#1e2433]">
          {PATROL_HISTORY.title}
        </h2>

        <div className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
          <p>{PATROL_HISTORY.paragraph1}</p>
          <p>{PATROL_HISTORY.paragraph2}</p>
        </div>
      </section>

      {/* Istoric șefi · Cormoran */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#131722] border border-[#1e2433] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1e2433]">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-serif-title">
            Istoric șefi · Cormoran
          </h2>

          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Caută în istoric..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#0c0e14] border border-[#2d3748] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-600"
            />
          </div>
        </div>

        <div className="divide-y divide-[#1e2433]">
          {filteredLeaders.map((leader) => (
            <div
              key={leader.name + leader.period}
              className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-sm sm:text-base font-semibold text-white">
                  {leader.name}
                </span>
                {leader.isCurrent && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-900/60 border border-emerald-700/60 text-emerald-300">
                    ACTUAL
                  </span>
                )}
              </div>

              <div className="text-xs sm:text-sm font-medium text-slate-400 font-mono shrink-0">
                {leader.period}
              </div>
            </div>
          ))}
        </div>

        {filteredLeaders.length === 0 && (
          <div className="text-center py-4 text-slate-500 text-xs">
            Niciun rezultat găsit.
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* LINIE DE DEMARCARE (SEPARATOR) */}
      {/* ========================================================================= */}
      <div className="pt-2 pb-1">
        <hr className="border-t border-[#1e2433]" />
      </div>

      {/* ========================================================================= */}
      {/* PARTEA 2: CE ERA ÎN PAGINA DESPRE */}
      {/* ========================================================================= */}

      {/* Header Ramura Verde */}
      <section className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-800/40 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>12 – 17 ani</span>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-serif-title">
            Ramura Verde
          </h1>
          <div className="text-sm sm:text-base font-serif-title">
            <span className="text-emerald-400 font-semibold italic">Totdeauna gata!</span>
          </div>
        </div>
      </section>

      {/* Continut Principal Ramura Verde */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#131722] border border-[#1e2433] space-y-6">
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Ramura verde este constituită din cercetașe și cercetași şi se adresează tinerilor cu vârsta cuprinsă între <span className="text-white font-semibold">12 şi 17 ani</span>.
        </p>

        {/* Cele 5 Dimensiuni */}
        <div className="space-y-3">
          <h2 className="text-xs uppercase tracking-wider font-bold text-slate-400">
            Cele cinci dimensiuni care definesc cadrul jocului cercetăşesc:
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {dimensions.map((dim) => {
              const Icon = dim.icon;
              return (
                <div
                  key={dim.title}
                  className="p-3.5 rounded-xl bg-[#0c0e14] border border-[#1e2433] space-y-1"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                    <h3 className="text-sm font-semibold text-white font-serif-title">
                      {dim.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {dim.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Patrula și Trupa */}
        <div className="p-5 rounded-xl bg-[#0c0e14] border border-[#1e2433] space-y-2.5">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-400 shrink-0" />
            <h3 className="text-sm sm:text-base font-bold text-white font-serif-title">
              Patrula și Trupa
            </h3>
          </div>

          <div className="space-y-2 text-slate-300 text-xs sm:text-sm leading-relaxed">
            <p>
              <strong className="text-white font-semibold">Patrula</strong> este formată din 5-8 membri, are un Șef și un Asistent de Patrulă, un steag, un strigăt şi un caiet de aur în care sunt notate amintirile patrulei de la activitățile la care participă.
            </p>
            <p>
              În momentul în care într-un grup există două sau mai multe patrule, se formează o <strong className="text-white font-semibold">trupă</strong> care este condusă la rândul ei de un Șef de Trupă ajutat de doi sau mai mulți asistenți.
            </p>
          </div>
        </div>

        {/* Link Site Patrulă */}
        <div className="pt-2 flex justify-center">
          <a
            href="https://sites.google.com/view/patrulacormoran/patrula-cormo"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm tracking-wide transition-colors flex items-center justify-center gap-2 text-center"
          >
            <span>Vezi site-ul patrulei</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-200" />
          </a>
        </div>
      </section>
    </div>
  );
};
