import React, { useState, useEffect } from 'react';
import { Calendar, Sparkles, Database, ShieldCheck, Activity } from 'lucide-react';

interface StatsData {
  downloadsToday: number;
  totalDownloads: number;
  activeUsers: number;
}

export default function LiveStatsCard() {
  const [stats, setStats] = useState<StatsData>({
    downloadsToday: 0,
    totalDownloads: 0,
    activeUsers: 0,
  });
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchStats = async (isFirstTime = false) => {
    if (isFirstTime) {
      setInitialLoading(true);
    }
    try {
      const response = await fetch('/api/public-stats');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setStats({
            downloadsToday: data.downloadsToday,
            totalDownloads: data.totalDownloads,
            activeUsers: data.activeUsers,
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch real-time stats:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(true);
    const interval = setInterval(() => fetchStats(false), 5000); // update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Format big numbers like 15693 -> "15.7K"
  const formatK = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 my-3">
      <div 
        id="savetik-live-stats" 
        className="bg-neo-card border-2 border-neo-border rounded-[16px] p-3.5 shadow-[4px_4px_0px_0px_var(--neo-border)] relative overflow-hidden transition-colors duration-200"
      >
        {/* Header section with live badge */}
        <div className="flex items-center justify-between gap-2 pb-2.5 border-b-2 border-neo-border/10 mb-3">
          <div className="flex items-center gap-2">
            <div className="bg-neo-bg border-2 border-neo-border p-1.5 rounded-lg shadow-[2px_2px_0px_0px_var(--neo-border)] shrink-0 flex items-center justify-center">
              <Activity className="text-neo-text animate-heartbeat" size={16} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-heading font-black uppercase text-xs tracking-wide text-neo-text leading-tight">
                STATISTIK DOWNLOAD REAL-TIME
              </h3>
              <p className="text-[9px] font-semibold text-neo-text/70 flex items-center gap-1 mt-0.5">
                Live Real-Time Database
              </p>
            </div>
          </div>
          
          {/* Live Badge */}
          <div className="shrink-0">
            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-2 border-neo-border rounded-full px-2 py-0.5 font-black text-[9px] flex items-center gap-1 shadow-[1.5px_1.5px_0px_0px_var(--neo-border)] select-none">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Pengguna Aktif :</span>
              {initialLoading ? (
                <span className="inline-block w-10 h-2 bg-emerald-500/20 rounded animate-pulse" />
              ) : (
                <span className="text-[8px] opacity-80 font-medium"> {stats.activeUsers}</span>
              )}
            </span>
          </div>
        </div>

        {/* Two metrics grids side-by-side always */}
        <div className="grid grid-cols-2 gap-2.5 mb-3">
          {/* Daily downloads card */}
          <div className="bg-neo-bg border-2 border-neo-border rounded-[12px] p-2.5 shadow-[3px_3px_0px_0px_var(--neo-border)] relative transition-transform hover:-translate-y-0.5 hover:shadow-[3.5px_3.5px_0px_0px_var(--neo-border)]">
            <div className="flex items-center gap-1 mb-1">
              <Calendar className="text-blue-500 dark:text-blue-400 shrink-0" size={12} strokeWidth={2.5} />
              <span className="font-heading font-black text-[9px] text-neo-text tracking-wider uppercase">
               HARI INI
              </span>
            </div>
            <div className="flex items-baseline gap-1 py-0.5 min-h-[32px]">
              {initialLoading ? (
                <div className="h-7 w-16 bg-neo-border/20 rounded-md animate-pulse my-0.5" />
              ) : (
                <span className="font-heading font-black text-2xl text-neo-text tracking-tight animate-fade-in">
                  {stats.downloadsToday}
                </span>
              )}
            </div>
            <p className="text-[9px] font-semibold text-neo-text/70 mt-0.5">
              Total Unduhan Hari Ini
            </p>
          </div>

          {/* Total downloads card */}
          <div className="bg-neo-accent border-2 border-neo-border rounded-[12px] p-2.5 shadow-[3px_3px_0px_0px_var(--neo-border)] relative transition-transform hover:-translate-y-0.5 hover:shadow-[3.5px_3.5px_0px_0px_var(--neo-border)]">
            <div className="flex items-center gap-1 mb-1">
              <Sparkles className="text-rose-600 shrink-0 animate-pulse" size={12} strokeWidth={2.5} />
              <span className="font-heading font-black text-[9px] text-neo-accent-text tracking-wider uppercase opacity-90">
               TOTAL UNDUHAN
              </span>
            </div>
            <div className="flex items-baseline gap-1 py-0.5 flex-wrap min-h-[32px]">
              {initialLoading ? (
                <div className="h-7 w-24 bg-neo-border/20 rounded-md animate-pulse my-0.5" />
              ) : (
                <>
                  <span className="font-heading font-black text-2xl text-neo-accent-text tracking-tight animate-fade-in">
                    {formatK(stats.totalDownloads)}
                  </span>
                  <span className="text-[9px] text-neo-accent-text/85 font-bold tracking-wide">
                    ({stats.totalDownloads})
                  </span>
                </>
              )}
            </div>
            <p className="text-[9px] font-semibold text-neo-accent-text/80 mt-0.5">
              Total Unduhan Berhasil
            </p>
          </div>
        </div>

        {/* Footer/Bottom row */}
        <div className="flex items-center justify-between pt-2 border-t-2 border-neo-border/10 text-neo-text">
          <div className="flex items-center gap-1 text-[9px] font-bold text-neo-text/80">
            <ShieldCheck className="text-emerald-500 dark:text-emerald-400 shrink-0" size={14} strokeWidth={2.5} />
            <span>Terverifikasi Otomatis</span>
          </div>

          {/* Database Stack Badge */}
          <div className="bg-neo-bg border-2 border-neo-border rounded-lg px-1.5 py-0.5 text-[9px] font-black text-neo-text flex items-center gap-1 shadow-[1px_1px_0px_0px_var(--neo-border)] hover:bg-neo-bg-sec transition-colors cursor-default">
            <Database size={10} strokeWidth={2.5} className="text-blue-500 dark:text-blue-400" />
            <span>SaveTikStore</span>
          </div>
        </div>
      </div>
    </div>
  );
}
