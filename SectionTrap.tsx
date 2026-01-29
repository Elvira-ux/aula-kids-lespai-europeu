
import React, { useState } from 'react';
import { TRAPS } from '../constants';

interface SectionTrapProps {
  onScore: () => void;
}

const SectionTrap: React.FC<SectionTrapProps> = ({ onScore }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const nextChallenge = () => {
    setFeedback(null);
    setCurrentIdx((prev) => (prev + 1) % TRAPS.length);
  };

  const handleAnswer = (idx: number) => {
    if (idx === TRAPS[currentIdx].correct) {
      setFeedback("EXCEL·LENT! NO T'HAS CONFÓS. ✨");
      onScore();
      setTimeout(nextChallenge, 1500);
    } else {
      setFeedback("ALERTA! HAS CAIGUT EN LA TRAMPA. 🛑");
    }
  };

  const challenge = TRAPS[currentIdx];

  return (
    <div className="bg-white rounded-[4rem] p-16 shadow-sm border border-slate-100 text-center animate-in slide-in-from-bottom-8 duration-500">
      <h2 className="text-3xl font-black text-rose-500 uppercase tracking-tighter italic mb-4">Evita la Trampa! 🛑</h2>
      <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-12">Diferencia els països sovint confosos</p>
      
      <div className="max-w-2xl mx-auto space-y-10">
        <div className="text-2xl font-black text-slate-800 bg-slate-50 p-10 rounded-[3rem] border-2 border-slate-100 shadow-inner italic">
          {challenge.question}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {challenge.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className="bg-white border-4 border-slate-100 p-12 rounded-[4rem] text-xl font-black text-slate-700 hover:border-[#83B445] hover:scale-105 transition-all shadow-md flex flex-col items-center"
            >
              <img src={`https://flagcdn.com/w160/${opt.flag}.png`} className="w-20 mb-4 rounded-lg shadow" alt="flag" />
              {opt.label}
            </button>
          ))}
        </div>
        <div className={`h-10 text-sm font-bold uppercase tracking-widest italic transition-all ${feedback?.includes('ALERTA') ? 'text-rose-500' : 'text-[#83B445]'}`}>
          {feedback}
        </div>
      </div>
    </div>
  );
};

export default SectionTrap;
