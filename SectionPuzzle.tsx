
import React, { useState, useEffect, useMemo } from 'react';
import { Region, Country } from '../types';
import { PAISOS_MASTER } from '../constants';

interface SectionPuzzleProps {
  onScore: () => void;
}

const SectionPuzzle: React.FC<SectionPuzzleProps> = ({ onScore }) => {
  const [placedCountries, setPlacedCountries] = useState<Set<string>>(new Set());
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [regionSlots, setRegionSlots] = useState<Record<string, string[]>>(() => ({
    [Region.Nordic]: [],
    [Region.Western]: [],
    [Region.Central]: [],
    [Region.Eastern]: [],
    [Region.Balkans]: [],
    [Region.Mediterranean]: [],
  }));
  const [searchTerm, setSearchTerm] = useState("");
  const [showLupa, setShowLupa] = useState(false);

  useEffect(() => {
    // Reset or Initialize
    setPlacedCountries(new Set());
    setRegionSlots({
      [Region.Nordic]: [],
      [Region.Western]: [],
      [Region.Central]: [],
      [Region.Eastern]: [],
      [Region.Balkans]: [],
      [Region.Mediterranean]: [],
    });
  }, []);

  const pool = useMemo(() => {
    return PAISOS_MASTER.filter(p => !placedCountries.has(p.name));
  }, [placedCountries]);

  const filteredPool = useMemo(() => {
    return pool.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.capital.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pool, searchTerm]);

  const handleDrop = (region: Region) => {
    if (!selectedCountry) return;
    if (selectedCountry.region === region) {
      setRegionSlots(prev => ({
        ...prev,
        [region]: [...(prev[region] || []), selectedCountry.code]
      }));
      setPlacedCountries(prev => new Set([...prev, selectedCountry.name]));
      setSelectedCountry(null);
      onScore(); 
    } else {
      alert(`Ops! ${selectedCountry.name} no pertany a la regió ${region}. Torna-ho a intentar!`);
    }
  };

  const progress = placedCountries.size;
  const total = PAISOS_MASTER.length;

  return (
    <div className="bg-white rounded-[4rem] p-8 md:p-16 shadow-sm border border-slate-100 animate-in zoom-in-95 duration-500">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-widest italic mb-2">Puzle Mestre: 50 Països</h2>
          <div className="flex items-center gap-4">
             <div className="h-4 w-48 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#83B445] transition-all duration-500" 
                  style={{ width: `${(progress/total) * 100}%` }}
                ></div>
             </div>
             <span className="text-sm font-black text-[#83B445]">{progress} / {total} països completats</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          <div className="relative w-full sm:w-64">
            <input 
              type="text" 
              placeholder="Cerca un país..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 text-sm font-bold focus:border-[#83B445] outline-none transition-all pl-10"
            />
            <span className="absolute left-3 top-3.5 opacity-30">🔍</span>
          </div>
          <button 
            onClick={() => setShowLupa(true)}
            className="w-full sm:w-auto bg-[#83B445] text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase shadow-lg shadow-[#83B445]/20 hover:scale-105 transition-all"
          >
            🔎 Veure Microestats
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {Object.values(Region).map((r) => (
            <div 
              key={r} 
              onClick={() => handleDrop(r)}
              className={`min-h-[160px] border-2 border-dashed rounded-[2.5rem] p-6 flex flex-col items-center transition-all cursor-pointer ${
                selectedCountry ? 'bg-slate-50 border-[#83B445]/40 hover:bg-[#83B445]/10' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex justify-between w-full mb-4 items-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{r}</span>
                <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded-lg text-[10px] font-bold">{regionSlots[r]?.length || 0}</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {regionSlots[r]?.map((code, idx) => (
                  <img 
                    key={idx} 
                    src={`https://flagcdn.com/w40/${code}.png`} 
                    className="w-8 rounded-sm shadow-sm animate-in fade-in zoom-in duration-300" 
                    alt="flag"
                  />
                ))}
                {(regionSlots[r]?.length || 0) === 0 && (
                  <p className="text-[10px] text-slate-300 font-bold uppercase mt-4">Arrossega o prem aquí</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 p-6 rounded-[2.5rem] flex flex-col h-[600px] border shadow-inner">
          <h3 className="font-black text-slate-800 text-[10px] uppercase border-b pb-4 mb-6 text-center tracking-widest italic">Pool de Països ({pool.length})</h3>
          <div className="flex flex-wrap gap-2 overflow-y-auto pr-1 no-scrollbar flex-grow content-start">
            {filteredPool.length > 0 ? (
              filteredPool.map((p) => (
                <button
                  key={p.name}
                  onClick={() => setSelectedCountry(p)}
                  className={`px-3 py-2 bg-white border-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 transition-all hover:border-[#83B445] ${
                    selectedCountry?.name === p.name ? 'border-[#83B445] scale-105 shadow-md ring-2 ring-[#83B445]/20' : 'border-slate-100'
                  }`}
                >
                  <img src={`https://flagcdn.com/w40/${p.code}.png`} className="w-5 rounded-sm" alt="flag" />
                  <span>{p.name}</span>
                </button>
              ))
            ) : (
              <div className="w-full text-center py-20">
                <p className="text-slate-300 font-black text-[10px] uppercase">Cap país trobat</p>
              </div>
            )}
          </div>
          <button 
            onClick={() => { setPlacedCountries(new Set()); setRegionSlots({ [Region.Nordic]: [], [Region.Western]: [], [Region.Central]: [], [Region.Eastern]: [], [Region.Balkans]: [], [Region.Mediterranean]: [] }); }} 
            className="mt-6 text-[10px] font-black text-rose-400 hover:text-rose-500 uppercase text-center"
          >
            Reiniciar Tot 🔄
          </button>
        </div>
      </div>

      {showLupa && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-6" onClick={() => setShowLupa(false)}>
          <div className="bg-white rounded-[4rem] p-12 max-w-2xl w-full shadow-2xl text-center" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-black text-slate-800 mb-8 uppercase tracking-widest italic">🔎 Microestats i Dependències</h3>
            <p className="text-slate-400 text-xs mb-8 uppercase font-bold italic">Selecciona un país per ubicar-lo al puzle</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {PAISOS_MASTER.filter(p => !placedCountries.has(p.name)).sort((a,b) => a.name.length - b.name.length).slice(0, 9).map(p => (
                <button 
                  key={p.name}
                  onClick={() => { setSelectedCountry(p); setShowLupa(false); }}
                  className="px-4 py-5 bg-slate-50 border-2 border-slate-100 rounded-[2rem] text-sm font-black uppercase cursor-pointer hover:border-[#83B445] flex items-center justify-center gap-3 shadow-sm transition-all"
                >
                  <img src={`https://flagcdn.com/w40/${p.code}.png`} className="w-6 h-auto rounded-sm border" alt="flag" />
                  <span>{p.name}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setShowLupa(false)} className="mt-12 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] hover:text-rose-500 transition-colors">Tancar finestra</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionPuzzle;
