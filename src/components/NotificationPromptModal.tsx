import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle } from 'lucide-react';
import {
  isNotificationSupported,
  getNotificationPermission,
  requestNotificationPermission,
  isPromptDismissed,
  setPromptDismissed,
  sendTestNotification,
} from '../services/notificationService';

export const NotificationPromptModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isNotificationSupported()) return;

    const currentPermission = getNotificationPermission();

    // Show prompt on first visit if permission is 'default' and not dismissed
    if (currentPermission === 'default' && !isPromptDismissed()) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleEnable = async () => {
    const res = await requestNotificationPermission();
    setPromptDismissed(true);
    setIsOpen(false);

    if (res === 'granted') {
      await sendTestNotification();
    }
  };

  const handleDismiss = () => {
    setPromptDismissed(true);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#131722] border border-[#242c3d] rounded-2xl p-6 space-y-4 text-center shadow-2xl">
        {/* Scout Bell Icon */}
        <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400">
          <Bell className="w-6 h-6" />
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <h2 className="text-base sm:text-lg font-bold text-white font-serif-title">
            Activezi notificările despre evenimente?
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Primești alerte directe pe telefon pentru adunări, activități și detalii din calendar.
          </p>
        </div>

        {/* Warning Box */}
        <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-800/30 text-rose-300 text-xs text-left leading-relaxed flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <span>
            Dacă notificările nu funcționează pe dispozitivul tău, te rugăm să verifici secțiunea <strong className="text-rose-200 underline">Calendar</strong> manual.
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleDismiss}
            className="flex-1 py-2 rounded-lg bg-[#1a202c] hover:bg-[#242c3d] border border-[#2d3748] text-slate-300 text-xs font-medium transition-colors"
          >
            Mai târziu
          </button>

          <button
            onClick={handleEnable}
            className="flex-1 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs transition-colors"
          >
            Activează
          </button>
        </div>
      </div>
    </div>
  );
};
