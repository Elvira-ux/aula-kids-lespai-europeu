
import React, { useState, useEffect, useRef } from 'react';
import { QUESTS_MASTER } from '../constants';

interface SectionExamProps {
  studentName: string;
  onFinish: (score: number) => void;
  onClaimDiploma: () => void;
}

const SectionExam: React.FC<SectionExamProps> = ({ studentName, onFinish, onClaimDiploma }) => {
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [score, setScore] = useState(0);
  // Fixed: Use 'any' type for the timer reference to avoid "Cannot find namespace 'NodeJS'" in browser contexts.
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (!isEvaluated) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleFinish();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if(timerRef.current) clearInterval(timerRef.current) };
  }, [isEvaluated]);

  const handleFinish = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    let currentScore = 0;
    QUESTS_MASTER.forEach((q, i) => {
      if (answers[i] === q.correct) currentScore++;
    });
    setScore(currentScore);
    setIsEvaluated(true);
    onFinish(currentScore);
  };

  const handleRetry = () => {
    setAnswers({});
    setTimeLeft(600);
    setIsEvaluated(false);
    setScore(0);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' + s : s}`;
  };

  if (isEvaluated) {
    const isPass = score >= 8;
    return (
      <div className="animate-in slide-in-from-bottom-12 duration-700 max-w-4xl mx-auto space-y-12">
        <div className={`rounded-[4rem] p-20 text-white text-center shadow-2xl relative overflow-hidden ${isPass ? 'bg-[#83B445]' : 'bg-slate-400'}`}>
          <h3 className="text-3xl font-black mb-2 italic uppercase tracking-tighter">{studentName}</h3>
          <div className="text-[12rem] font-black mb-12 tracking-tighter leading-none">{score}/{QUESTS_MASTER.length}</div>
          <p className="text-3xl font-black tracking-tight mb-16 uppercase italic">
            {isPass ? "DOMINI EXCEL·LENT 🌟" : "EN PROCÉS 💪"}
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <button onClick={handleRetry} className="bg-white/10 px-12 py-5 rounded-[2.5rem] text-[10px] font-black uppercase hover:bg-white/20 transition-all border border-white/20">Repetir Intent 🔄</button>
            {isPass && (
              <button onClick={onClaimDiploma} className="bg-white text-[#83B445] px-12 py-5 rounded-[2.5rem] text-[10px] font-black uppercase shadow-2xl hover:scale-105 transition-all">Generar Diploma 🏆</button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in slide-in-from-bottom-12 duration-700 max-w-4xl mx-auto space-y-12 pt-6">
      <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 mb-1 uppercase tracking-tighter italic">Simulacre Mestre Final</h2>
          <p className="text-[#83B445] font-bold uppercase text-[9px] tracking-widest italic">Aula Kids 100% online · Aprèn amb confiança</p>
        </div>
        <div className="bg-slate-50 px-8 py-5 rounded-3xl flex flex-col items-center border shadow-inner min-w-[150px]">
          <span className="text-4xl font-black text-slate-800 tabular-nums">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="space-y-8">
        {QUESTS_MASTER.map((q, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-[3rem] p-12 shadow-sm">
            <p className="font-black text-slate-800 text-lg mb-8 italic tracking-tight">{i + 1}. {q.question}</p>
            <div className="grid grid-cols-1 gap-3">
              {q.options.map((opt, j) => (
                <label 
                  key={j} 
                  className={`flex items-center space-x-4 p-5 rounded-3xl border-2 cursor-pointer transition-all ${
                    answers[i] === j ? 'border-[#83B445] bg-[#83B445]/5' : 'border-slate-50 hover:border-[#83B445]/30'
                  }`}
                >
                  <input 
                    type="radio" 
                    name={`q-${i}`} 
                    checked={answers[i] === j}
                    onChange={() => setAnswers({...answers, [i]: j})}
                    className="hidden"
                  />
                  <span className="text-sm font-bold text-slate-600">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={handleFinish}
        className="w-full bg-slate-900 text-white font-black py-10 rounded-[4rem] shadow-2xl uppercase text-[14px] tracking-[0.6em] transition-all hover:bg-slate-800 hover:-translate-y-1"
      >
        Tancar i Avaluar Examen
      </button>
    </div>
  );
};

export default SectionExam;
