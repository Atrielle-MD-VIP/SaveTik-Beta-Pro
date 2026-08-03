import { useState } from 'react';
import { Menu, X, Sun, Moon, Smartphone, LogOut, Home, BookOpen, ShieldAlert, Heart, MessageSquare, Star, Clock, Info, Download } from 'lucide-react';

interface NavbarProps {
  activeView: 'downloader' | 'guide' | 'restrictions' | 'donation' | 'history' | 'feedback' | 'favorites' | 'offline' | 'admin' | 'about';
  onViewChange: (view: 'downloader' | 'guide' | 'restrictions' | 'donation' | 'history' | 'feedback' | 'favorites' | 'offline' | 'admin' | 'about') => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  onOpenInstallModal: () => void;
  onAdminAccess: () => void;
  onAdminLogout?: () => void;
  accentColor?: string;
}

export default function Navbar({ 
  activeView,
  onViewChange,
  theme,
  onThemeToggle,
  onOpenInstallModal,
  onAdminAccess,
  onAdminLogout,
  accentColor = '#FFE600'
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Desktop Header (hidden on mobile/tablet) */}
      <nav className="hidden lg:flex fixed top-0 left-0 right-0 h-20 bg-neo-card border-b-[4px] border-neo-border z-40 px-8 items-center justify-between transition-colors">
        {/* Left Side: Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border-none bg-transparent">
            <span className="font-heading font-black text-3xl tracking-tight uppercase text-neo-text dark:text-white">
              Save<span className="text-blue-700 dark:text-blue-500 font-black">Tik</span>
            </span>
          </div>
        </div>

        {/* Right Side: Desktop Items & Theme Toggle */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onViewChange('downloader')}
            className={`font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeView === 'downloader' ? 'underline underline-offset-4 decoration-[3px]' : 'text-neo-text hover:opacity-80'
            }`}
            style={{ color: activeView === 'downloader' ? accentColor : undefined }}
          >
            <Home size={14} className="stroke-[2.5]" />
            <span>BERANDA</span>
          </button>
          
          <button
            onClick={() => onViewChange('guide')}
            className={`font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeView === 'guide' ? 'underline underline-offset-4 decoration-[3px]' : 'text-neo-text hover:opacity-80'
            }`}
            style={{ color: activeView === 'guide' ? accentColor : undefined }}
          >
            <BookOpen size={14} className="stroke-[2.5]" />
            <span>CARA PENGGUNAAN</span>
          </button>

          <button
            onClick={() => onViewChange('restrictions')}
            className={`font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeView === 'restrictions' ? 'underline underline-offset-4 decoration-[3px]' : 'text-neo-text hover:opacity-80'
            }`}
            style={{ color: activeView === 'restrictions' ? accentColor : undefined }}
          >
            <ShieldAlert size={14} className="stroke-[2.5]" />
            <span>LARANGAN</span>
          </button>

          <button
            onClick={() => onViewChange('donation')}
            className={`font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeView === 'donation' ? 'underline underline-offset-4 decoration-[3px]' : 'text-neo-text hover:opacity-80'
            }`}
            style={{ color: activeView === 'donation' ? accentColor : undefined }}
          >
            <Heart size={14} className="stroke-[2.5]" />
            <span>DONASI</span>
          </button>

          <button
            onClick={() => onViewChange('feedback')}
            className={`font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeView === 'feedback' ? 'underline underline-offset-4 decoration-[3px]' : 'text-neo-text hover:opacity-80'
            }`}
            style={{ color: activeView === 'feedback' ? accentColor : undefined }}
          >
            <MessageSquare size={14} className="stroke-[2.5]" />
            <span>FEEDBACK</span>
          </button>

          <button
            onClick={() => onViewChange('favorites')}
            className={`font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeView === 'favorites' ? 'underline underline-offset-4 decoration-[3px]' : 'text-neo-text hover:opacity-80'
            }`}
            style={{ color: activeView === 'favorites' ? accentColor : undefined }}
          >
            <Star size={14} className="stroke-[2.5]" />
            <span>FAVORIT</span>
          </button>

          <button
            onClick={() => onViewChange('about')}
            className={`font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeView === 'about' ? 'underline underline-offset-4 decoration-[3px]' : 'text-neo-text hover:opacity-80'
            }`}
            style={{ color: activeView === 'about' ? accentColor : undefined }}
          >
            <Info size={14} className="stroke-[2.5]" />
            <span>TENTANG WEBSITE</span>
          </button>

          {activeView === 'admin' && onAdminLogout && (
            <button
              onClick={onAdminLogout}
              className="bg-[#DC2626] hover:bg-[#B91C1C] text-white px-3 py-1.5 font-heading font-black text-xs uppercase tracking-wider neo-border shadow-neo-btn flex items-center gap-1.5 cursor-pointer transition-all active:translate-y-0.5 rounded-lg ml-2"
              title="Keluar dari mode admin"
            >
              <LogOut size={14} className="stroke-[3]" />
              KELUAR ADMIN
            </button>
          )}

          <div className="bg-[#E2F7F2] dark:bg-[#1A3D35] neo-border-thin px-3 py-1.5 font-mono text-xs flex items-center gap-2 font-black text-[#14B8A6] transition-colors rounded-lg">
            ✓ ONLINE
          </div>

          <button
            onClick={onThemeToggle}
            className="p-1.5 neo-border bg-neo-bg text-neo-text hover:bg-neo-bg-sec active:translate-y-0.5 transition-all shadow-neo-btn-press cursor-pointer rounded-lg ml-2"
            aria-label="Toggle theme"
            title={`Mode: ${theme}`}
          >
            {theme === 'light' ? <Moon size={18} className="stroke-[3]" /> : <Sun size={18} className="stroke-[3]" />}
          </button>
        </div>
      </nav>

      {/* Mobile Floating Expandable Header & Menu */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 p-2.5 pointer-events-none">
        <div 
          className={`bg-neo-bg dark:bg-[#1A1A1A] neo-border shadow-neo-btn p-2.5 flex flex-col transition-all duration-500 ease-in-out rounded-2xl pointer-events-auto overflow-hidden ${
            isOpen ? 'max-h-[90vh]' : 'max-h-[58px]'
          }`}
        >
          {/* Header Row */}
          <div className="flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#7DB4FF] dark:bg-[#3B82F6] rounded-lg neo-border flex items-center justify-center text-black dark:text-white shrink-0 shadow-sm">
                <Download size={16} className="stroke-[3]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <h2 className="font-heading font-black text-base tracking-tight text-neo-text leading-none">SaveTik</h2>
                  <span className="bg-[#FF90E8] text-black text-[8px] font-black px-1.5 py-0.5 rounded-full neo-border-thin flex items-center gap-0.5 shadow-sm">
                    <Star size={8} className="fill-black" /> PRO
                  </span>
                </div>
                <p className="text-[7px] font-bold text-slate-500 uppercase tracking-widest mt-0.5 leading-none">TikTok Downloader</p>
              </div>
            </div>
            
            <button 
              onClick={toggleMenu} 
              className="w-8 h-8 flex items-center justify-center bg-neo-card hover:bg-neo-bg-sec text-neo-text neo-border shadow-neo-btn-press active:translate-y-0.5 transition-all rounded-lg shrink-0"
            >
              {isOpen ? <X size={16} className="stroke-[3]" /> : <Menu size={16} className="stroke-[3]" />}
            </button>
          </div>

          {/* Expanded Menu Items */}
          <div className={`mt-3 space-y-1.5 overflow-y-auto transition-opacity duration-300 delay-100 pb-1 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <button
              onClick={() => {
                onViewChange('downloader');
                toggleMenu();
              }}
              className={`w-full text-left py-2 px-3 font-black text-xs neo-border shadow-neo-btn-press transition-all active:translate-y-0.5 cursor-pointer rounded-lg flex items-center justify-between ${
                activeView === 'downloader' ? 'bg-[#EEF2FF] dark:bg-[#1E1B4B] text-[#4F46E5] dark:text-[#818CF8]' : 'bg-neo-card text-neo-text hover:bg-neo-bg-sec'
              }`}
            >
              <div className="flex items-center gap-2">
                <Home size={14} className="stroke-[2.5]" />
                <span className="uppercase tracking-wide">BERANDA</span>
              </div>
              {activeView === 'downloader' && <span className="bg-white dark:bg-black neo-border-thin px-1.5 py-0.5 text-[9px] rounded-md">AKTIF</span>}
            </button>
            
            <button
              onClick={() => {
                onViewChange('guide');
                toggleMenu();
              }}
              className={`w-full text-left py-2 px-3 font-black text-xs neo-border shadow-neo-btn-press transition-all active:translate-y-0.5 cursor-pointer rounded-lg flex items-center gap-2 ${
                activeView === 'guide' ? 'bg-[#EEF2FF] dark:bg-[#1E1B4B] text-[#4F46E5] dark:text-[#818CF8]' : 'bg-neo-card text-neo-text hover:bg-neo-bg-sec'
              }`}
            >
              <BookOpen size={14} className="stroke-[2.5]" />
              <span className="uppercase tracking-wide">CARA PENGGUNAAN</span>
            </button>
            
            <button
              onClick={() => {
                onViewChange('restrictions');
                toggleMenu();
              }}
              className={`w-full text-left py-2 px-3 font-black text-xs neo-border shadow-neo-btn-press transition-all active:translate-y-0.5 cursor-pointer rounded-lg flex items-center gap-2 ${
                activeView === 'restrictions' ? 'bg-[#EEF2FF] dark:bg-[#1E1B4B] text-[#4F46E5] dark:text-[#818CF8]' : 'bg-neo-card text-neo-text hover:bg-neo-bg-sec'
              }`}
            >
              <ShieldAlert size={14} className="stroke-[2.5]" />
              <span className="uppercase tracking-wide">LARANGAN</span>
            </button>
            
            <button
              onClick={() => {
                onViewChange('history');
                toggleMenu();
              }}
              className={`w-full text-left py-2 px-3 font-black text-xs neo-border shadow-neo-btn-press transition-all active:translate-y-0.5 cursor-pointer rounded-lg flex items-center justify-between ${
                activeView === 'history' ? 'bg-[#EEF2FF] dark:bg-[#1E1B4B] text-[#4F46E5] dark:text-[#818CF8]' : 'bg-neo-card text-neo-text hover:bg-neo-bg-sec'
              }`}
            >
              <div className="flex items-center gap-2">
                <Clock size={14} className="stroke-[2.5]" />
                <span className="uppercase tracking-wide">RIWAYAT</span>
              </div>
            </button>
            
            <button
              onClick={() => {
                onViewChange('favorites');
                toggleMenu();
              }}
              className={`w-full text-left py-2 px-3 font-black text-xs neo-border shadow-neo-btn-press transition-all active:translate-y-0.5 cursor-pointer rounded-lg flex items-center gap-2 ${
                activeView === 'favorites' ? 'bg-[#EEF2FF] dark:bg-[#1E1B4B] text-[#4F46E5] dark:text-[#818CF8]' : 'bg-neo-card text-neo-text hover:bg-neo-bg-sec'
              }`}
            >
              <Star size={14} className="stroke-[2.5]" />
              <span className="uppercase tracking-wide">FAVORIT</span>
            </button>
            
            <button
              onClick={() => {
                onViewChange('donation');
                toggleMenu();
              }}
              className={`w-full text-left py-2 px-3 font-black text-xs neo-border shadow-neo-btn-press transition-all active:translate-y-0.5 cursor-pointer rounded-lg flex items-center gap-2 ${
                activeView === 'donation' ? 'bg-[#EEF2FF] dark:bg-[#1E1B4B] text-[#4F46E5] dark:text-[#818CF8]' : 'bg-neo-card text-neo-text hover:bg-neo-bg-sec'
              }`}
            >
              <Heart size={14} className="stroke-[2.5]" />
              <span className="uppercase tracking-wide">DONASI</span>
            </button>
            
            <button
              onClick={() => {
                onViewChange('feedback');
                toggleMenu();
              }}
              className={`w-full text-left py-2 px-3 font-black text-xs neo-border shadow-neo-btn-press transition-all active:translate-y-0.5 cursor-pointer rounded-lg flex items-center gap-2 ${
                activeView === 'feedback' ? 'bg-[#EEF2FF] dark:bg-[#1E1B4B] text-[#4F46E5] dark:text-[#818CF8]' : 'bg-neo-card text-neo-text hover:bg-neo-bg-sec'
              }`}
            >
              <MessageSquare size={14} className="stroke-[2.5]" />
              <span className="uppercase tracking-wide">FEEDBACK</span>
            </button>

            <button
              onClick={() => {
                onViewChange('about');
                toggleMenu();
              }}
              className={`w-full text-left py-2 px-3 font-black text-xs neo-border shadow-neo-btn-press transition-all active:translate-y-0.5 cursor-pointer rounded-lg flex items-center gap-2 ${
                activeView === 'about' ? 'bg-[#EEF2FF] dark:bg-[#1E1B4B] text-[#4F46E5] dark:text-[#818CF8]' : 'bg-neo-card text-neo-text hover:bg-neo-bg-sec'
              }`}
            >
              <Info size={14} className="stroke-[2.5]" />
              <span className="uppercase tracking-wide">TENTANG WEBSITE</span>
            </button>

            {activeView === 'admin' && onAdminLogout && (
              <button
                onClick={() => {
                  onAdminLogout();
                  toggleMenu();
                }}
                className="w-full text-left py-2 px-3 bg-[#DC2626] text-white font-black text-xs neo-border shadow-neo-btn-press transition-all active:translate-y-0.5 cursor-pointer uppercase tracking-wider rounded-lg flex items-center gap-2 mt-2"
              >
                <LogOut size={14} className="stroke-[3]" />
                KELUAR ADMIN
              </button>
            )}

            <div className="pt-1 flex items-center gap-2">
              <button
                onClick={onThemeToggle}
                className="w-10 h-10 flex shrink-0 items-center justify-center bg-neo-card text-neo-text hover:bg-neo-bg-sec neo-border shadow-neo-btn-press active:translate-y-0.5 transition-all rounded-lg"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={16} className="stroke-[3]" /> : <Sun size={16} className="stroke-[3]" />}
              </button>

              <button
                onClick={() => {
                  onOpenInstallModal();
                  toggleMenu();
                }}
                className="flex-1 h-10 bg-neo-card text-neo-text hover:bg-neo-bg-sec font-heading font-black text-[11px] uppercase tracking-wider neo-border shadow-neo-btn-press flex items-center justify-center gap-1.5 cursor-pointer transition-all active:translate-y-0.5 rounded-lg"
              >
                <Smartphone size={16} className="stroke-[3]" />
                INSTALL APP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pad fixed top bar */}
      <div className="h-[100px] lg:h-20" />
    </>
  );
}
