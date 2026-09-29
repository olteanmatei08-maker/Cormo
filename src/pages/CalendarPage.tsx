import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CalendarEvent } from '../types';
import {
  getCachedCalendarEvents,
  fetchCalendarEventsWithAutoSync,
} from '../services/googleCalendar';
import {
  Calendar as CalendarIcon,
  RefreshCw,
  CloudSun,
  WifiOff,
  CheckCircle2,
} from 'lucide-react';
import { WeatherCluj } from '../components/WeatherCluj';
import { checkAndDispatchEventNotifications } from '../services/notificationService';

export const CalendarPage: React.FC = () => {
  const [, setEvents] = useState<CalendarEvent[]>(getCachedCalendarEvents);
  const [loading, setLoading] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);
  const [iframeKey, setIframeKey] = useState<number>(Date.now());
  const lastEventsJsonRef = useRef('');

  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  // Main page mode: 'calendar' (Cormo Calendar Oficial) or 'meteo' (Vremea Sâmbătă)
  const [activeTab, setActiveTab] = useState<'calendar' | 'meteo'>('calendar');

  // Function to refresh events directly from the public Google Calendar
  const refreshEvents = useCallback(async (interactive: boolean = false) => {
    if (!navigator.onLine) return;

    try {
      if (interactive) {
        setLoading(true);
        // Force reload the embedded iframe
        setIframeKey(Date.now());
      }

      const res = await fetchCalendarEventsWithAutoSync(interactive);
      if (res.events && Array.isArray(res.events)) {
        setEvents(res.events);
        checkAndDispatchEventNotifications(res.events);
        if (interactive) {
          setSyncFeedback('Sincronizat live');
          setTimeout(() => setSyncFeedback(null), 3000);
        }
      }
    } catch (err) {
      console.warn('Eroare actualizare calendar:', err);
    } finally {
      if (interactive) setLoading(false);
    }
  }, []);

  // Listen to background updates: when events change in Google Calendar, auto-reload iframe
  useEffect(() => {
    const handleEventsUpdated = (e: any) => {
      const detail = e.detail;
      const evList = Array.isArray(detail) ? detail : detail?.events;
      if (Array.isArray(evList) && evList.length > 0) {
        setEvents(evList);
        const json = JSON.stringify(evList);
        if (lastEventsJsonRef.current && lastEventsJsonRef.current !== json) {
          setIframeKey(Date.now());
        }
        lastEventsJsonRef.current = json;
      }
    };
    window.addEventListener('cormo_events_updated', handleEventsUpdated);
    return () => window.removeEventListener('cormo_events_updated', handleEventsUpdated);
  }, []);

  // Online / Offline listener
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      refreshEvents(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [refreshEvents]);

  // Initial refresh on mount
  useEffect(() => {
    refreshEvents(false);
  }, [refreshEvents]);

  // Polling every 10 minutes for background synchronization
  const isPollingRef = useRef(false);
  useEffect(() => {
    if (!isOnline) return;

    const interval = setInterval(async () => {
      if (isPollingRef.current) return;
      isPollingRef.current = true;
      try {
        await refreshEvents(false);
      } finally {
        isPollingRef.current = false;
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [isOnline, refreshEvents]);

  // Also refresh when tab regains focus or visibility
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        refreshEvents(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('focus', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('focus', handleVisibility);
    };
  }, [refreshEvents]);

  const embedUrl = `https://calendar.google.com/calendar/embed?src=olteanmatei08%40gmail.com&ctz=Europe%2FBucharest&mode=AGENDA&wkst=2&hl=ro&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=1&bgcolor=%230c0e14`;

  return (
    <div className="space-y-4 max-w-4xl mx-auto py-2">
      {/* Card Antet Calendar Simplificat */}
      <section className="p-5 rounded-2xl bg-[#131722] border border-[#1e2433] space-y-4">
        {/* Titlu & Buton Sincronizare */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h1 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider font-serif-title">
            Calendarul Patrulei
          </h1>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => refreshEvents(true)}
              disabled={loading || !isOnline}
              className="px-3.5 py-1.5 rounded-lg bg-[#1a202c] hover:bg-[#242c3d] border border-[#2d3748] text-slate-200 text-xs font-medium transition-colors disabled:opacity-50 flex items-center gap-2 cursor-pointer"
              title="Sincronizează datele"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-400' : 'text-slate-400'}`} />
              <span>{loading ? 'Se sincronizează...' : 'Sincronizează'}</span>
            </button>

            {syncFeedback && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{syncFeedback}</span>
              </div>
            )}
          </div>
        </div>

        {/* Butoane comutare mod (Cormo Calendar Oficial / Vremea Sâmbătă) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[#1e2433]">
          <button
            type="button"
            onClick={() => setActiveTab('calendar')}
            className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'calendar'
                ? 'bg-emerald-700 text-white'
                : 'bg-[#181d2a] text-slate-400 hover:text-slate-200 hover:bg-[#202738]'
            }`}
          >
            <CalendarIcon className="w-4 h-4" />
            <span>Cormo Calendar Oficial</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('meteo')}
            className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'meteo'
                ? 'bg-emerald-700 text-white'
                : 'bg-[#181d2a] text-slate-400 hover:text-slate-200 hover:bg-[#202738]'
            }`}
          >
            <CloudSun className="w-4 h-4" />
            <span>Vremea Sâmbătă</span>
          </button>
        </div>
      </section>

      {/* Mesaj Mod Offline */}
      {!isOnline && activeTab !== 'meteo' && (
        <div className="p-3 bg-amber-950/30 border border-amber-800/40 rounded-xl text-amber-200 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Mod offline activ: Evenimentele sunt încărcate din memoria telefonului.</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-900/40 text-amber-300 shrink-0">
            Offline
          </span>
        </div>
      )}

      {/* 1. Cormo Calendar Oficial */}
      {activeTab === 'calendar' && (
        <section className="p-2 rounded-2xl bg-[#131722] border border-[#1e2433] overflow-hidden">
          <div className="w-full rounded-xl overflow-hidden bg-[#10141e] relative min-h-[580px] sm:min-h-[680px]">
            <iframe
              key={iframeKey}
              src={embedUrl}
              style={{
                border: 0,
                filter: 'invert(0.92) hue-rotate(180deg) brightness(0.95) contrast(1.08)',
              }}
              width="100%"
              height="680"
              frameBorder="0"
              scrolling="no"
              title="Cormo Calendar Oficial"
              className="w-full h-[580px] sm:h-[680px] block rounded-xl"
            />
          </div>
        </section>
      )}

      {/* 2. Vremea Sâmbătă */}
      {activeTab === 'meteo' && <WeatherCluj />}
    </div>
  );
};
