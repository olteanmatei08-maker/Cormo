import React, { useState, useEffect, useRef } from 'react';
import {
  ExternalLink,
  ArrowLeft,
  X,
  LayoutGrid,
  List,
  ChevronRight,
  ShieldAlert,
  Lock,
} from 'lucide-react';

interface ScoutProgress {
  id: string;
  name: string;
  initials: string;
  folderId: string;
  driveUrl: string;
  pin: string;
}

// Lista celor 7 cercetași cu linkurile reale din Google Drive și codurile PIN de 6 cifre, ordonată strict alfabetic
const SCOUTS: ScoutProgress[] = [
  {
    id: 'alex-mosutiu',
    name: 'Alex Moșuțiu',
    initials: 'AM',
    folderId: '1_5216dEmXjuSuRltKVY3HVcRsHUwp1p8',
    driveUrl: 'https://drive.google.com/drive/u/0/folders/1_5216dEmXjuSuRltKVY3HVcRsHUwp1p8',
    pin: '250612',
  },
  {
    id: 'cristian-man',
    name: 'Cristian Man',
    initials: 'CM',
    folderId: '1Y5NRxk5WbaqIFZo_IawNTpc0ja89ziWx',
    driveUrl: 'https://drive.google.com/drive/u/0/folders/1Y5NRxk5WbaqIFZo_IawNTpc0ja89ziWx',
    pin: '010513',
  },
  {
    id: 'eduard-pop',
    name: 'Eduard Pop',
    initials: 'EP',
    folderId: '1gk_oPa_HRqGVNc0JqwTNG7kD-hqiowZR',
    driveUrl: 'https://drive.google.com/drive/u/0/folders/1gk_oPa_HRqGVNc0JqwTNG7kD-hqiowZR',
    pin: '020414',
  },
  {
    id: 'filip-hruban',
    name: 'Filip Hruban',
    initials: 'FH',
    folderId: '1C-H2yGJH3c3ZadMhugGX6OXPANDxdoZi',
    driveUrl: 'https://drive.google.com/drive/u/0/folders/1C-H2yGJH3c3ZadMhugGX6OXPANDxdoZi',
    pin: '290610',
  },
  {
    id: 'marius-domsa',
    name: 'Marius Domșa',
    initials: 'MD',
    folderId: '1Ma_vu4XRoFMTd5sAMMNoSzHcwxHChYPM',
    driveUrl: 'https://drive.google.com/drive/u/0/folders/1Ma_vu4XRoFMTd5sAMMNoSzHcwxHChYPM',
    pin: '123456',
  },
  {
    id: 'matei-cosmovici',
    name: 'Matei Cosmovici',
    initials: 'MC',
    folderId: '1n1yZ0oyDQQhSdVZlHJMze70D56SvQNjt',
    driveUrl: 'https://drive.google.com/drive/u/0/folders/1n1yZ0oyDQQhSdVZlHJMze70D56SvQNjt',
    pin: '150414',
  },
  {
    id: 'matei-oltean',
    name: 'Matei Oltean',
    initials: 'MO',
    folderId: '1jbMxSte0v4SLucPul0wofrgNyiQFFs2S',
    driveUrl: 'https://drive.google.com/drive/u/0/folders/1jbMxSte0v4SLucPul0wofrgNyiQFFs2S',
    pin: '020411',
  },
].sort((a, b) => a.name.localeCompare(b.name, 'ro'));

export const ProgressPage: React.FC = () => {
  const [selectedScoutId, setSelectedScoutId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Stare pentru fereastra PIN securizat (6 cifre pentru fiecare cercetaș)
  const [pendingScoutId, setPendingScoutId] = useState<string | null>(null);
  const [pinValue, setPinValue] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);
  const pinInputRef = useRef<HTMLInputElement>(null);

  const selectedScout = SCOUTS.find((scout) => scout.id === selectedScoutId);
  const pendingScout = SCOUTS.find((scout) => scout.id === pendingScoutId);

  // Focus pe input când se deschide modalul de PIN
  useEffect(() => {
    if (pendingScoutId) {
      setPinValue('');
      setPinError(null);
      setTimeout(() => {
        pinInputRef.current?.focus();
      }, 50);
    }
  }, [pendingScoutId]);

  // Închidere vizualizator cu tasta Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (pendingScoutId) {
          setPendingScoutId(null);
        } else if (selectedScoutId) {
          setSelectedScoutId(null);
        }
      }
    };
    if (selectedScoutId || pendingScoutId) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedScoutId, pendingScoutId]);

  const handleScoutClick = (scoutId: string) => {
    setPendingScoutId(scoutId);
  };

  const verifyPin = (code: string) => {
    if (!pendingScout) return;

    if (code === pendingScout.pin) {
      setSelectedScoutId(pendingScout.id);
      setViewMode('list');
      setPendingScoutId(null);
      setPinValue('');
      setPinError(null);
    } else {
      setPinError('PIN incorect. Mai încearcă.');
      setPinValue('');
      setTimeout(() => {
        pinInputRef.current?.focus();
      }, 50);
    }
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyPin(pinValue);
  };

  const handlePinChange = (val: string) => {
    // Permite doar cifre, maxim 6
    const cleaned = val.replace(/\D/g, '').slice(0, 6);
    setPinValue(cleaned);
    if (pinError) setPinError(null);

    // Auto-validare la introducerea celor 6 cifre
    if (cleaned.length === 6) {
      verifyPin(cleaned);
    }
  };

  return (
    <div className="space-y-3 max-w-2xl mx-auto py-2">
      {/* Butoane cercetași în stil minimalist */}
      <div className="flex flex-col gap-2.5">
        {SCOUTS.map((scout) => {
          return (
            <button
              type="button"
              key={scout.id}
              onClick={() => handleScoutClick(scout.id)}
              className="w-full p-4 rounded-xl bg-[#131722] hover:bg-[#181d2a] border border-[#1e2433] hover:border-slate-600 flex items-center justify-between cursor-pointer select-none transition-colors group text-left"
            >
              <div className="flex items-center gap-3.5">
                {/* Monogramă cercetaș */}
                <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 font-semibold text-xs flex items-center justify-center shrink-0">
                  {scout.initials}
                </div>

                {/* Nume cercetaș cu indicator de securitate */}
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold text-slate-100 group-hover:text-white transition-colors">
                    {scout.name}
                  </span>
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                </div>
              </div>

              {/* Săgeată indicator */}
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
            </button>
          );
        })}
      </div>

      {/* FEREASTRĂ SIMPLĂ ȘI MINIMALISTĂ DE INTRODUCERE PIN */}
      {pendingScout && (
        <div className="fixed inset-0 z-[120] bg-black/75 flex items-center justify-center p-4">
          <div className="w-full max-w-xs bg-[#131722] border border-[#242c3d] rounded-2xl p-6 text-center space-y-5 shadow-2xl relative">
            {/* Buton Închide */}
            <button
              type="button"
              onClick={() => setPendingScoutId(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Pictogramă lacăt */}
            <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-950/50 border border-emerald-800/40 text-emerald-400 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white font-serif-title">
                {pendingScout.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Introdu codul PIN de 6 cifre
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <input
                ref={pinInputRef}
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={pinValue}
                onChange={(e) => handlePinChange(e.target.value)}
                className="opacity-0 absolute -z-10 pointer-events-none"
                autoFocus
              />

              {/* Căsuțe simple pentru cele 6 cifre */}
              <div
                onClick={() => pinInputRef.current?.focus()}
                className="flex items-center justify-center gap-2 cursor-pointer py-1"
              >
                {[0, 1, 2, 3, 4, 5].map((idx) => {
                  const digit = pinValue[idx];
                  const isCurrent = pinValue.length === idx;
                  const hasError = !!pinError;

                  return (
                    <div
                      key={idx}
                      className={`w-9 h-12 rounded-lg flex items-center justify-center text-lg font-bold transition-colors ${
                        hasError
                          ? 'border border-rose-500 bg-rose-950/20 text-rose-300'
                          : digit !== undefined
                          ? 'border border-emerald-600 bg-emerald-950/30 text-white'
                          : isCurrent
                          ? 'border border-slate-400 bg-slate-900 text-white'
                          : 'border border-slate-800 bg-[#0c0e14] text-slate-600'
                      }`}
                    >
                      {digit !== undefined ? '•' : ''}
                    </div>
                  );
                })}
              </div>

              {/* Mesaj de eroare */}
              {pinError && (
                <div className="text-xs text-rose-400 font-medium">
                  {pinError}
                </div>
              )}

              {/* Butoane */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPendingScoutId(null)}
                  className="flex-1 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                >
                  Anulează
                </button>
                <button
                  type="submit"
                  disabled={pinValue.length !== 6}
                  className="flex-1 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 disabled:opacity-40 text-white text-xs font-semibold transition-colors"
                >
                  Continuă
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Deschidere directă a folderului Google Drive pe toată pagina */}
      {selectedScout && (
        <div className="fixed inset-0 z-[100] bg-[#0c0e14] flex flex-col">
          {/* Bară de instrumente superioară curată și simplificată */}
          <div className="h-16 px-4 sm:px-6 bg-[#0c0e14] border-b border-[#1e2433] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              {/* Buton Înapoi */}
              <button
                type="button"
                onClick={() => setSelectedScoutId(null)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#181d2a] hover:bg-[#202738] border border-[#2d3748] text-slate-200 text-xs font-medium transition-colors shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-emerald-400" />
                <span>Înapoi</span>
              </button>

              <div className="flex items-center gap-2 truncate">
                <span className="font-semibold text-white text-sm sm:text-base font-serif-title truncate">
                  {selectedScout.name}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Selector mod vizualizare: Listă / Grilă */}
              <div className="hidden sm:flex items-center bg-[#131722] border border-[#1e2433] rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 rounded text-xs flex items-center gap-1.5 transition-colors ${
                    viewMode === 'list'
                      ? 'bg-emerald-700 text-white font-medium'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>Listă</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded text-xs flex items-center gap-1.5 transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-emerald-700 text-white font-medium'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Grilă</span>
                </button>
              </div>

              {/* Buton Deschide în Google Drive */}
              <a
                href={selectedScout.driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/60 text-emerald-300 text-xs font-medium transition-colors"
                title="Deschide în Google Drive"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Drive</span>
              </a>

              {/* Buton Închide (X) */}
              <button
                type="button"
                onClick={() => setSelectedScoutId(null)}
                className="w-8 h-8 rounded-lg bg-[#181d2a] hover:bg-rose-950/50 border border-[#2d3748] hover:border-rose-800/50 text-slate-400 hover:text-rose-300 flex items-center justify-center transition-colors"
                title="Închide (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mențiune securitate Google simplă și discretă */}
          <div className="px-4 py-2 bg-[#10141e] border-b border-[#1e2433] flex items-center justify-center gap-2 text-center text-xs text-slate-400 shrink-0">
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Fișierele se vor deschide în browser din cauza politicii de securitate Google.</span>
          </div>

          {/* Vizualizare exclusivă Google Drive Folder */}
          <div className="flex-1 w-full h-full relative overflow-hidden bg-[#14161c]">
            <iframe
              src={`https://drive.google.com/embeddedfolderview?id=${selectedScout.folderId}#${viewMode}`}
              className={`w-full border-0 block ${
                viewMode === 'list'
                  ? 'h-[calc(100%+42px)] -mt-[42px]'
                  : 'h-full'
              }`}
              style={{
                filter:
                  'invert(0.92) hue-rotate(180deg) brightness(1.08) contrast(1.1)',
                backgroundColor: '#ffffff',
              }}
              title={`Fișiere dosar Google Drive - ${selectedScout.name}`}
              allow="autoplay; fullscreen"
            />
          </div>
        </div>
      )}
    </div>
  );
};
