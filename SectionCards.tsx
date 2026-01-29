
import React, { useState } from 'react';
import { PAISOS_MASTER } from '../constants';
import { geminiService } from '../services/geminiService';

const SectionCards: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [landmarkImg, setLandmarkImg] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const nextCard = () => {
    setFlipped(false);
    setLandmarkImg(null);
    setTimeout(() => {
      setCurrentIdx(Math.floor(Math.random() * PAISOS_MASTER.length));
    }, 150);
  };

  const generateLandmark = async () => {
    setIsGenerating(true);
    try {
      const img = await geminiService.generateMonumentImage(PAISOS_MASTER[currentIdx].name);
      setLandmarkImg(img);
    } catch (e) {
      alert("Error generant monument");
    } finally {
      setIsGenerating(false);
    }
  };

  const currentCountry = PAISOS_MASTER[currentIdx];
  const filteredList = PAISOS_MASTER.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.capital.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row gap-12 animate-in zoom-in-95 duration-500">
      <div className="lg:w-1/2 bg-white rounded-[4rem] p-14 shadow-2xl border border-slate-100 flex flex-col items-center sticky top-44 h-fit">
        <h3 className="font-black text-slate-400 text-[10px] uppercase tracking-[0.3em] mb-12 italic text-center">Targetes de Memòria Pro</h3>
        
        <div 
          className="relative w-full max-w-sm h-96 cursor-pointer mb-12 [perspective:1000px]"
          onClick={() => setFlipped(!flipped)}
        >
          <div className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${flipped ? '[transform:rotateY(180deg)]' : ''}`}>
            <div className="absolute inset-0 bg-slate-50 border-4 border-slate-100 shadow-inner flex flex-col items-center justify-center rounded-[2.5rem] [backface-visibility:hidden]">
               <img src={`https://flagcdn.com/w320/${currentCountry.code}.png`} className="w-64 h-40 object-cover rounded-2xl shadow-xl mb-8 border-4 border-white" alt="flag" />
               <h4 className="text-4xl font-black text-slate-800 tracking-tighter uppercase italic text-center">{currentCountry.name}</h4>
               <p className="mt-10 text-[9px] text-slate-400 font-bold uppercase tracking-[0.4em]">Toca per la capital</p>
            </div>
            <div className="absolute inset-0 bg-[#83B445] text-white flex flex-col items-center justify-center rounded-[2.5rem] [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-6">La capital és:</p>
              <h4 className="text-5xl font-black tracking-tighter italic uppercase">{currentCountry.capital}</h4>
              <div className="flex gap-4 mt-12">
                <button 
                  onClick={(e) => { e.stopPropagation(); geminiService.speak(`La capital de ${currentCountry.name} és ${currentCountry.capital}`); }}
                  className="bg-white/20 hover:bg-white/40 p-6 rounded-3xl transition-all border border-white/20 text-xs font-black uppercase tracking-widest"
                >
                  🔊 Escolta
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); generateLandmark(); }}
                  disabled={isGenerating}
                  className="bg-blue-500/80 hover:bg-blue-600 p-6 rounded-3xl transition-all border border-white/20 text-xs font-black uppercase tracking-widest"
                >
                  {isGenerating ? '⌛ Generant...' : '🖼️ Monument IA'}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <button onClick={nextCard} className="w-full bg-[#83B445] text-white font-black py-6 rounded-[2rem] shadow-xl uppercase text-[10px] tracking-widest hover:scale-105 transition-all">Següent País ➡️</button>
      </div>

      <div className="lg:w-1/2 w-full space-y-6">
        {landmarkImg && (
          <div className="bg-white rounded-[3rem] p-8 border shadow-xl animate-in fade-in zoom-in duration-500">
             <h4 className="font-black text-xs uppercase tracking-widest text-blue-500 mb-4 italic">Descobreix el monument:</h4>
             <img src={landmarkImg} className="w-full h-auto rounded-3xl shadow-lg mb-4 border-4 border-slate-50" alt="landmark" />
             <p className="text-[10px] font-bold text-slate-400 uppercase italic">Imatge generada per l'AK IA per a tu ✨</p>
          </div>
        )}
        <input 
          type="text" 
          placeholder="Busca un país o capital..." 
          className="w-full bg-white border-2 border-slate-100 rounded-3xl px-8 py-5 font-bold shadow-sm focus:border-[#83B445] outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="bg-white rounded-[3rem] p-8 border h-[500px] overflow-y-auto no-scrollbar shadow-inner space-y-2">
          {filteredList.map((p) => (
            <div key={p.name} className="flex justify-between p-5 items-center hover:bg-slate-50 transition-all rounded-3xl border-b border-slate-50 last:border-0">
               <div className="flex items-center gap-4">
                  <img src={`https://flagcdn.com/w40/${p.code}.png`} className="w-10 h-auto rounded shadow-sm border" alt="flag" />
                  <span className="font-bold">{p.name}</span>
               </div>
               <span className="text-[#83B445] font-black italic tracking-widest text-sm uppercase">{p.capital}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionCards;
