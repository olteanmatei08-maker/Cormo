import React, { useState, useEffect } from 'react';
import {
  fetchClujWeather,
  ClujWeatherData,
  getWeatherCondition,
} from '../services/weatherService';
import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudSnow,
  CloudFog,
  Wind,
  Umbrella,
  RefreshCw,
} from 'lucide-react';

export const WeatherCluj: React.FC = () => {
  const [weather, setWeather] = useState<ClujWeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchClujWeather();
      setWeather(data);
    } catch (err: any) {
      setError(err?.message || 'Nu s-a putut încărca prognoza meteo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather();
    const interval = setInterval(loadWeather, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const renderWeatherIcon = (
    iconType: string,
    className: string = 'w-8 h-8 text-amber-400'
  ) => {
    switch (iconType) {
      case 'sun':
        return <Sun className={className} />;
      case 'cloud':
        return <Cloud className={className} />;
      case 'rain':
      case 'cloud-rain':
        return <CloudRain className={className} />;
      case 'storm':
        return <CloudLightning className={className} />;
      case 'snow':
        return <CloudSnow className={className} />;
      case 'fog':
        return <CloudFog className={className} />;
      default:
        return <Cloud className={className} />;
    }
  };

  if (loading && !weather) {
    return (
      <div className="p-8 text-center rounded-2xl bg-[#131722] border border-[#1e2433] space-y-2">
        <RefreshCw className="w-5 h-5 text-emerald-400 animate-spin mx-auto" />
        <p className="text-xs text-slate-400">Se preia starea vremii pentru Cluj-Napoca...</p>
      </div>
    );
  }

  if (error && !weather) {
    return (
      <div className="p-6 text-center rounded-2xl bg-[#131722] border border-[#1e2433] space-y-2">
        <p className="text-xs text-slate-400">{error}</p>
        <button
          onClick={loadWeather}
          className="px-3.5 py-1.5 rounded-lg bg-[#1a202c] border border-[#2d3748] text-xs text-slate-200 cursor-pointer"
        >
          Reîncearcă
        </button>
      </div>
    );
  }

  if (!weather) return null;

  const saturdayCondition = getWeatherCondition(weather.saturday.weatherCode);

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* VREMEA DE SÂMBĂTĂ - CARD MINIMALIST */}
      <section className="p-5 sm:p-6 rounded-2xl bg-[#131722] border border-[#1e2433] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1e2433]">
          <div>
            <h2 className="text-base font-bold text-white font-serif-title uppercase tracking-wider">
              Prognoză Sâmbătă
            </h2>
            <span className="text-xs text-emerald-400">
              Cluj-Napoca
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-300">
              {weather.saturday.relativeLabel}
            </span>

            <button
              onClick={loadWeather}
              disabled={loading}
              className="p-1.5 rounded-lg bg-[#1a202c] border border-[#2d3748] text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Actualizează prognoza"
              aria-label="Actualizează prognoza"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#0c0e14] border border-[#1e2433] shrink-0">
                {renderWeatherIcon(saturdayCondition.iconType, 'w-10 h-10 text-amber-400')}
              </div>
              <div>
                <span className="text-3xl font-bold text-white tracking-tight">
                  {weather.saturday.tempMax}°C
                </span>
                <span className="text-sm text-slate-400 ml-2">
                  / min. {weather.saturday.tempMin}°C
                </span>
              </div>
            </div>

            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-white capitalize">
                {saturdayCondition.label}
              </p>
              <p className="text-xs text-slate-400 capitalize">
                {weather.saturday.formattedDate}
              </p>
            </div>
          </div>

          {/* Date meteo Sâmbătă */}
          <div className="grid grid-cols-2 gap-2 sm:w-60">
            <div className="p-3 rounded-xl bg-[#0c0e14] border border-[#1e2433] flex items-center gap-2.5">
              <Umbrella className="w-4 h-4 text-sky-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Precipitații</span>
                <span className="text-xs font-semibold text-white">
                  {weather.saturday.precipitationProbability}%
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#0c0e14] border border-[#1e2433] flex items-center gap-2.5">
              <Wind className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Vânt max.</span>
                <span className="text-xs font-semibold text-white">
                  {weather.saturday.windMax} km/h
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-[#1e2433]">
          <span>Date furnizate prin Open-Meteo</span>
          <span>Actualizat la {weather.updatedAt}</span>
        </div>
      </section>
    </div>
  );
};
