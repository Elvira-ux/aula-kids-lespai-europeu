
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { geminiService } from '../services/geminiService';

const SectionHome: React.FC = () => {
  const [aiSummary, setAiSummary] = useState("Carregant resum de l'acadèmia...");
  const data = [
    { name: 'S.Terciari', value: 75 },
    { name: 'S.Secundari', value: 20 },
    { name: 'S.Primari', value: 5 },
  ];
  const COLORS = ['#FFFFFF', '#A5D6A7', '#FFF59D'];

  useEffect(() => {
    geminiService.generateSummary().then(setAiSummary);
  }, []);

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="bg-[#83B445] rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 relative z-10 text-center md:text-left">
          <h2 className="text-4xl font-black mb-4 uppercase italic tracking-tighter">Guia Interactiva Aula Kids</h2>
          <p className="text-white/90 font-medium text-lg leading-relaxed mb-10">{aiSummary}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <button 
              onClick={() => geminiService.speak("Aula Kids 100% online. Aprèn amb confiança. Europa és un continent de 50 països.")}
              className="bg-white text-[#83B445] px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
            >
              🔊 Escoltar Resum
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/3 relative z-10 text-center bg-white/10 p-8 rounded-[2rem] border border-white/20 backdrop-blur-sm h-64">
           <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <p className="text-[10px] font-black uppercase mt-4 opacity-70 italic">Sectors de l'economia Europea</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-100 rounded-[2rem] p-10 hover:shadow-lg transition-all">
          <h3 className="font-black text-[#83B445] text-xs uppercase mb-6 tracking-widest border-b pb-4">📌 Geografia i Població</h3>
          <div className="space-y-4 text-sm font-semibold text-slate-600 leading-relaxed">
            <p>• Europa: Continent de <strong>50 països</strong> (+750 milions hab).</p>
            <p>• Densitat: <strong>70 hab/km²</strong>. Zones poblades: Centre i Mediterrani.</p>
            <p>• Població envellida: <strong>Baixa natalitat</strong> + Longevitat.</p>
          </div>
        </div>
        <div className="bg-white border border-slate-100 rounded-[2rem] p-10 hover:shadow-lg transition-all">
          <h3 className="font-black text-[#0CC0DF] text-xs uppercase mb-6 tracking-widest border-b pb-4">🏛️ La Unió Europea (UE)</h3>
          <div className="space-y-4 text-sm font-semibold text-slate-600 leading-relaxed">
            <p>• Fundada en <strong>1957</strong> (CEE) per garantir la pau.</p>
            <p>• <strong>27 Estats membres</strong> actualment.</p>
            <p>• <strong>20 Països a l'Eurozona</strong> (moneda Euro €).</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionHome;
