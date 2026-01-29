
import React, { useEffect } from 'react';

interface DiplomaProps {
  studentName: string;
  score: number;
  onClose: () => void;
}

const Diploma: React.FC<DiplomaProps> = ({ studentName, score, onClose }) => {
  const dateStr = new Date().toLocaleDateString('ca-ES');

  useEffect(() => {
    // Automatically trigger print dialog when opened
    const t = setTimeout(() => {
      window.print();
    }, 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 bg-white/98 z-[5000] flex items-center justify-center backdrop-blur-md no-print">
      <div className="bg-white p-16 rounded-xl text-center shadow-2xl border-[15px] border-double border-[#83B445] max-w-[297mm] w-full mx-6 print-only-display">
        <div className="absolute top-6 right-6 no-print">
          <button onClick={onClose} className="text-slate-300 hover:text-slate-500 font-bold text-xl">✕</button>
        </div>
        
        <p className="text-[#83B445] font-black uppercase tracking-[1em] mb-10 text-sm">Aula Kids Academy</p>
        <h1 className="text-[5rem] font-black text-slate-900 mb-8 italic leading-none tracking-tighter uppercase">Mestre d'Europa</h1>
        <p className="text-slate-500 font-medium text-2xl mb-12 italic text-center">Aquest diploma d'excel·lència acredita a:</p>
        
        <div className="text-[4rem] font-black text-[#83B445] mb-10 border-b-8 border-[#83B445]/10 inline-block px-20 pb-4 italic leading-tight uppercase">
          {studentName}
        </div>
        
        <p className="text-slate-400 font-bold uppercase tracking-[0.4em] mt-12 mb-20 text-xl text-center px-20">
          Per superar amb èxit el Tema 11 d'Aula Kids: L'Espai Europeu amb una nota de {score}/10.
        </p>
        
        <div className="flex justify-between items-end w-full px-20">
          <div className="text-left">
            <p className="text-slate-400 text-sm uppercase font-bold tracking-widest">Data d'emissió</p>
            <p className="text-slate-800 text-2xl font-black">{dateStr}</p>
          </div>
          <div className="w-32 h-32 bg-[#83B445] rounded-full border-[10px] border-white shadow-xl flex items-center justify-center text-white font-black text-4xl italic">AK</div>
        </div>

        <div className="mt-16 no-print flex gap-4 justify-center">
          <button onClick={() => window.print()} className="bg-[#83B445] text-white px-12 py-5 rounded-full font-black uppercase text-xs shadow-2xl hover:scale-105 transition-all">Imprimir o Desar PDF 🖨️</button>
          <button onClick={onClose} className="ml-4 text-slate-300 font-bold uppercase text-xs">Tancar</button>
        </div>
      </div>

      {/* Actual Print Structure for Browsers */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-only-display {
             border: 15px double #83B445 !important;
             width: 297mm !important;
             height: 210mm !important;
             position: fixed !important;
             inset: 0 !important;
             display: flex !important;
             flex-direction: column !important;
             align-items: center !important;
             justify-content: center !important;
             background: white !important;
             margin: 0 !important;
             padding: 40px !important;
             -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
};

export default Diploma;
