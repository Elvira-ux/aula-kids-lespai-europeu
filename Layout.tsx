
import React from 'react';
import { View, UserStats } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  setCurrentView: (view: View) => void;
  studentName: string;
  stats: UserStats;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, setCurrentView, studentName, stats }) => {
  const tabs: { id: View; label: string; color?: string }[] = [
    { id: 'home', label: 'Resum' },
    { id: 'data', label: 'Dades' },
    { id: 'puzzle', label: 'Puzle' },
    { id: 'trap', label: 'Trampa' },
    { id: 'cards', label: 'Targetes' },
    { id: 'tutor', label: '🤖 Tutor IA', color: 'text-blue-500' },
    { id: 'exam', label: 'Examen', color: 'text-rose-500' },
  ];

  const progress = {
    home: 10, data: 25, puzzle: 40, trap: 55, cards: 70, tutor: 85, exam: 100
  }[currentView];

  const level = Math.floor(stats.xp / 100) + 1;
  const currentLevelXP = stats.xp % 100;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 z-[100] h-16 px-6 no-print">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#83B445] rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-[#83B445]/20">AK</div>
            <div>
              <p className="text-[11px] font-black text-slate-800 leading-none uppercase">Hola, {studentName}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[9px] font-bold text-blue-500 uppercase italic tracking-widest">Nivell {level}</span>
                <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 transition-all duration-500" style={{ width: `${currentLevelXP}%` }}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <div className="text-right">
              <p className="opacity-50 uppercase">XP Acumulada</p>
              <p className="text-[#83B445] font-bold text-sm">{stats.xp} pts</p>
            </div>
          </div>
        </div>
        <div className="h-1 w-full bg-slate-50 absolute bottom-0 left-0">
          <div className="h-full bg-[#83B445] transition-all duration-700" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <header className="sticky top-16 z-50 bg-white border-b border-slate-100 no-print shadow-sm overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-center">
          <nav className="flex p-1 bg-slate-100 rounded-2xl whitespace-nowrap overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentView(tab.id)}
                className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${
                  currentView === tab.id 
                    ? 'bg-[#83B445] text-white shadow-lg' 
                    : `text-slate-500 hover:text-slate-800 ${tab.color || ''}`
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="mt-20 py-20 bg-[#83B445] text-white text-center no-print">
        <div className="w-16 h-16 bg-white/20 rounded-3xl mx-auto mb-8 flex items-center justify-center font-black text-2xl italic">AK</div>
        <p className="text-xs font-bold text-white uppercase tracking-widest mb-4 italic">“Aula Kids 100% online · Aprèn amb confiança”</p>
        <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.4em]">aulakids513@gmail.com · 602 02 61 19</p>
      </footer>
    </div>
  );
};
