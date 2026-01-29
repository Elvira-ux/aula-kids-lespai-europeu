
import React, { useState, useEffect } from 'react';
import { View, UserStats } from './types';
import SectionHome from './components/SectionHome';
import SectionData from './components/SectionData';
import SectionPuzzle from './components/SectionPuzzle';
import SectionTrap from './components/SectionTrap';
import SectionCards from './components/SectionCards';
import SectionExam from './components/SectionExam';
import SectionTutor from './components/SectionTutor';
import Diploma from './components/Diploma';
import { Layout } from './components/Layout';

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [studentName, setStudentName] = useState('');
  const [currentView, setCurrentView] = useState<View>('home');
  const [showDiploma, setShowDiploma] = useState(false);
  const [lastExamScore, setLastExamScore] = useState(0);
  const [stats, setStats] = useState<UserStats>({ bestScore: 0, attempts: 0, xp: 0 });

  const handleLogin = () => {
    if (password === '2024') setIsAuth(true);
    else alert('Clau incorrecta');
  };

  const handleRegister = (name: string) => {
    setStudentName(name);
  };

  const handleExamFinish = (score: number) => {
    setLastExamScore(score);
    setStats(prev => ({
      ...prev,
      attempts: prev.attempts + 1,
      bestScore: Math.max(prev.bestScore, score),
      xp: prev.xp + (score * 50)
    }));
  };

  const addXP = (amount: number) => {
    setStats(prev => ({ ...prev, xp: prev.xp + amount }));
  };

  if (!isAuth) {
    return (
      <div className="fixed inset-0 bg-[#83B445] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl text-center">
          <div className="w-20 h-20 bg-[#83B445] rounded-2xl mx-auto mb-8 flex items-center justify-center text-white font-black text-3xl shadow-lg">AK</div>
          <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase italic">ACCÉS PROTEGIT</h2>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-8 italic">Aula Kids Academy · Tema 11</p>
          <input 
            type="password" 
            placeholder="Clau d'accés (2024)" 
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-center text-lg font-bold focus:border-[#83B445] outline-none mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
          <button onClick={handleLogin} className="w-full bg-[#83B445] text-white font-black py-5 rounded-2xl shadow-xl hover:scale-105 transition-all uppercase text-xs tracking-widest">Desbloquejar</button>
        </div>
      </div>
    );
  }

  if (!studentName) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 bg-[#83B445] rounded-[2.5rem] mx-auto mb-6 flex items-center justify-center text-white font-black text-4xl shadow-xl">AK</div>
          <h1 className="text-3xl font-black text-slate-800 mb-2 uppercase tracking-tighter italic text-[#83B445]">Benvingut/da</h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.1em] mb-10 italic">Aula Kids 100% online · Aprèn amb confiança</p>
          <div className="space-y-4">
            <input 
              type="text" 
              id="student-name-input" 
              placeholder="El teu nom per al diploma" 
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-center text-lg font-bold focus:border-[#83B445] outline-none"
              onKeyDown={(e) => { if(e.key === 'Enter') handleRegister((e.target as HTMLInputElement).value) }}
            />
            <button 
              onClick={() => {
                const el = document.getElementById('student-name-input') as HTMLInputElement;
                handleRegister(el.value);
              }} 
              className="w-full bg-[#83B445] text-white font-black py-5 rounded-2xl shadow-xl hover:scale-105 transition-all uppercase text-xs tracking-widest"
            >
              Entrar a l'Estudi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout 
      currentView={currentView} 
      setCurrentView={setCurrentView} 
      studentName={studentName}
      stats={stats}
    >
      {showDiploma && (
        <Diploma 
          studentName={studentName} 
          score={lastExamScore} 
          onClose={() => setShowDiploma(false)} 
        />
      )}
      <div className="max-w-7xl mx-auto px-6 mt-12 pb-40 no-print">
        {currentView === 'home' && <SectionHome />}
        {currentView === 'data' && <SectionData />}
        {currentView === 'puzzle' && <SectionPuzzle onScore={() => addXP(20)} />}
        {currentView === 'trap' && <SectionTrap onScore={() => addXP(10)} />}
        {currentView === 'cards' && <SectionCards />}
        {currentView === 'tutor' && <SectionTutor />}
        {currentView === 'exam' && (
          <SectionExam 
            onFinish={handleExamFinish} 
            onClaimDiploma={() => setShowDiploma(true)}
            studentName={studentName}
          />
        )}
      </div>
    </Layout>
  );
};

export default App;
