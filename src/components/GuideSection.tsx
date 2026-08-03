import { BookOpen, HelpCircle, ArrowLeft, ChevronDown, Sparkles, MessageCircle } from 'lucide-react';
import { safeLocalStorage } from '../lib/safeStorage';
import { useState, useEffect } from 'react';

interface GuideSectionProps {
  onBack: () => void;
}

export default function GuideSection({ onBack }: GuideSectionProps) {
  const defaultFaqs = [
    {
      question: 'Ini beneran gratis?',
      answer: 'Ya, 100% gratis tanpa batasan jumlah unduhan.'
    },
    {
      question: 'Apakah butuh login akun?',
      answer: 'Tidak perlu. Langsung pakai tanpa mendaftar.'
    },
    {
      question: 'Hasil downloadnya ada watermark gak?',
      answer: 'Tidak ada. Video bersih tanpa logo dari platform aslinya.'
    }
  ];

  const [faqs, setFaqs] = useState<{question: string, answer: string}[]>([]);
  const [faqsActive, setFaqsActive] = useState<boolean>(true);
  const [faqsSubheading, setFaqsSubheading] = useState<string>('Jawaban lengkap seputar mekanisme verifikasi dan lisensi Alight Motion Pro di AlightPro.');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    const saved = safeLocalStorage.getJSON<{question: string, answer: string}[]>('savetik-faqs', []);
    if (saved && saved.length > 0) {
      setFaqs(saved);
    } else {
      setFaqs(defaultFaqs);
    }
    setFaqsActive(safeLocalStorage.getItem('savetik-faqs-active') !== 'false');
    setFaqsSubheading(safeLocalStorage.getItem('savetik-faqs-subheading') || 'Jawaban lengkap seputar mekanisme verifikasi dan lisensi Alight Motion Pro di AlightPro.');

    // Load from dynamic API
    const loadFaqs = async () => {
      try {
        const res = await fetch('/api/faqs');
        const data = await res.json();
        if (data.success) {
          if (Array.isArray(data.faqs)) {
            setFaqs(data.faqs);
            safeLocalStorage.setJSON('savetik-faqs', data.faqs);
          }
          if (typeof data.active === 'boolean') {
            setFaqsActive(data.active);
            safeLocalStorage.setItem('savetik-faqs-active', String(data.active));
          }
          if (typeof data.subheading === 'string') {
            setFaqsSubheading(data.subheading);
            safeLocalStorage.setItem('savetik-faqs-subheading', data.subheading);
          }
        }
      } catch (err) {
        console.error('Error fetching FAQs in guide:', err);
      }
    };
    loadFaqs();
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      
      {/* Back to main menu button (top) */}
      <div className="mb-6 flex justify-start">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-neo-card hover:bg-neo-bg-sec text-neo-text font-heading font-black text-xs md:text-sm uppercase tracking-wider border-[3px] border-neo-border shadow-[3px_3px_0px_0px_var(--neo-border)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_var(--neo-border)] transition-all flex items-center gap-2 cursor-pointer rounded-lg"
        >
          <ArrowLeft size={14} className="stroke-[3]" />
          MENU UTAMA
        </button>
      </div>

      {/* CARA PENGGUNAAN SECTION */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <BookOpen className="text-[#6366F1] stroke-[3]" size={28} />
          <h2 className="font-heading font-black text-2xl md:text-4xl uppercase tracking-tight text-neo-text">
            CARA PENGGUNAAN
          </h2>
        </div>
        <p className="font-mono text-xs md:text-sm font-black text-neo-text opacity-60 uppercase tracking-wider mb-4">
          3 LANGKAH PRAKTIS
        </p>

        {/* 3 Steps Cards */}
        <div className="space-y-6">
          
          {/* Step 1 */}
          <div className="bg-neo-card p-5 border-[3px] border-neo-border rounded-[10px] shadow-[4px_4px_0px_0px_#F97316] flex gap-4 items-start transition-colors">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FCD34D] border-[3px] border-neo-border rounded-md flex items-center justify-center font-heading font-black text-lg md:text-xl shrink-0 text-black">
              1
            </div>
            <div>
              <h3 className="font-heading font-black text-sm md:text-base uppercase tracking-wide text-neo-text mb-1">
                SALIN LINK
              </h3>
              <p className="text-xs md:text-sm text-neo-text opacity-70 font-semibold leading-relaxed">
                Copy link video/audio dari TikTok, YouTube, Instagram, CapCut, atau Spotify.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-neo-card p-5 border-[3px] border-neo-border rounded-[10px] shadow-[4px_4px_0px_0px_#F97316] flex gap-4 items-start transition-colors">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FCD34D] border-[3px] border-neo-border rounded-md flex items-center justify-center font-heading font-black text-lg md:text-xl shrink-0 text-black">
              2
            </div>
            <div>
              <h3 className="font-heading font-black text-sm md:text-base uppercase tracking-wide text-neo-text mb-1">
                TEMPEL &amp; PROSES
              </h3>
              <p className="text-xs md:text-sm text-neo-text opacity-70 font-semibold leading-relaxed">
                Paste ke kolom input di halaman utama, lalu pencet tombol EKSTRAK VIDEO.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-neo-card p-5 border-[3px] border-neo-border rounded-[10px] shadow-[4px_4px_0px_0px_#F97316] flex gap-4 items-start transition-colors">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FCD34D] border-[3px] border-neo-border rounded-md flex items-center justify-center font-heading font-black text-lg md:text-xl shrink-0 text-black">
              3
            </div>
            <div>
              <h3 className="font-heading font-black text-sm md:text-base uppercase tracking-wide text-neo-text mb-1">
                UNDUH MEDIA
              </h3>
              <p className="text-xs md:text-sm text-neo-text opacity-70 font-semibold leading-relaxed">
                Tinggal pilih format kualitas terbaik lalu klik tombol unduh.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* TANYA JAWAB LANGSUNG SECTION */}
      {faqsActive && faqs && faqs.length > 0 && (
        <section className="mb-8 animate-in fade-in-50 duration-300">
          <div className="flex flex-col items-center mb-8">
            {/* Center Badge Pill */}
            <div className="mb-4 inline-flex items-center gap-2 px-5 py-2 bg-[#EEF2FF] dark:bg-[#1E1B4B] border-3 border-neo-border rounded-full shadow-[3px_3px_0px_0px_var(--neo-border)] transition-all">
              <MessageCircle size={16} className="text-[#8B5CF6] shrink-0" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-neo-text">
                Pertanyaan Yang Sering Diajukan
              </span>
            </div>

            {/* Big Center Header */}
            <h2 className="text-center font-heading font-black text-xl md:text-3xl text-neo-text uppercase tracking-tight leading-tight mb-2">
              FAQ & Informasi Penting
            </h2>

            {/* Subheading */}
            <p className="text-center text-xs md:text-sm text-neo-text/75 font-semibold max-w-2xl leading-relaxed">
              {faqsSubheading}
            </p>
          </div>

          {/* FAQ Accordion Cards */}
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = expandedFaqIndex === index;
              const faqColors = [
                { text: '#3B82F6', bg: 'bg-blue-50/70 dark:bg-blue-950/20' }, // Blue
                { text: '#EC4899', bg: 'bg-pink-50/70 dark:bg-pink-950/20' }, // Pink
                { text: '#10B981', bg: 'bg-emerald-50/70 dark:bg-emerald-950/20' }, // Emerald green
                { text: '#F59E0B', bg: 'bg-amber-50/70 dark:bg-amber-950/20' }, // Amber orange
                { text: '#8B5CF6', bg: 'bg-violet-50/70 dark:bg-violet-950/20' }, // Purple/Violet
                { text: '#EF4444', bg: 'bg-red-50/70 dark:bg-red-950/20' }, // Red-Orange
              ];
              const colorSet = faqColors[index % faqColors.length];

              return (
                <div 
                  key={index} 
                  className={`border-3 border-neo-border transition-all duration-300 rounded-[24px] overflow-hidden shadow-[4px_4px_0px_0px_var(--neo-border)] hover:-translate-y-0.5 ${
                    isOpen ? 'bg-neo-card' : 'bg-neo-card hover:bg-neo-bg-sec/10'
                  }`}
                >
                  <button
                    onClick={() => setExpandedFaqIndex(isOpen ? null : index)}
                    className={`w-full text-left py-5 px-5 md:px-7 flex items-center justify-between gap-4 cursor-pointer select-none transition-colors ${
                      isOpen ? colorSet.bg : 'bg-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Colorful outline HelpCircle icon */}
                      <HelpCircle 
                        size={22} 
                        strokeWidth={2.5} 
                        className="shrink-0"
                        style={{ color: colorSet.text }}
                      />
                      <span className="font-heading font-extrabold text-sm md:text-base text-neo-text leading-snug">
                        {faq.question}
                      </span>
                    </div>
                    
                    {/* Circle Chevron Button */}
                    <div className={`flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full border-3 border-neo-border flex items-center justify-center transition-all duration-300 ${
                      isOpen ? 'bg-neo-border text-neo-card' : 'bg-neo-card text-neo-text'
                    }`}>
                      <ChevronDown 
                        size={16} 
                        strokeWidth={3} 
                        className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                      />
                    </div>
                  </button>
                  
                  {/* Expandable Answer */}
                  {isOpen && (
                    <div className="px-5 md:px-7 pb-6 pt-5 text-sm text-neo-text/90 leading-relaxed border-t-3 border-neo-border bg-neo-card">
                      <div className="flex gap-4 items-start">
                        {/* Sparkles icon */}
                        <Sparkles 
                          size={22} 
                          className="text-amber-500 shrink-0 mt-0.5 fill-amber-500/20" 
                        />
                        <p className="flex-1 font-sans font-semibold text-neo-text/85">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
