
import React from 'react';

const SectionData: React.FC = () => {
  const data1 = [
    { l: "País més Gran", v: "Rússia" },
    { l: "País més Menut", v: "Vaticà" },
    { l: "Densitat Mitjana", v: "70 hab/km²" },
    { l: "Transcontinentals", v: "Rússia, Espanya, Turquia" }
  ];

  const data2 = [
    { l: "Any de Fundació", v: "1957 (CEE)" },
    { l: "Estats Membres UE", v: "27 països" },
    { l: "Membres Eurozona", v: "20 països" },
    { l: "Seus Principals", v: "3 ciutats (BXL, LUX, STR)" }
  ];

  return (
    <div className="space-y-12 animate-in slide-in-from-right-8 duration-500">
      <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter text-center">Fitxes Tècniques</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm">
          <h3 className="font-black text-[#83B445] text-xs uppercase mb-8 border-b pb-4 tracking-widest italic">📌 Geografia i Dades Bàsiques</h3>
          <div className="space-y-4">
            {data1.map((item, i) => (
              <div key={i} className="flex justify-between border-b border-slate-50 pb-2 text-[11px] font-bold uppercase">
                <span className="text-slate-400">{item.l}</span>
                <span className="text-slate-800">{item.v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm">
          <h3 className="font-black text-[#83B445] text-xs uppercase mb-8 border-b pb-4 tracking-widest italic">🏛️ Política i Institucions</h3>
          <div className="space-y-4">
            {data2.map((item, i) => (
              <div key={i} className="flex justify-between border-b border-slate-50 pb-2 text-[11px] font-bold uppercase">
                <span className="text-slate-400">{item.l}</span>
                <span className="text-slate-800">{item.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionData;
