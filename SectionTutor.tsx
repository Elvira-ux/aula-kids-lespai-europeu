
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

const SectionTutor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hola! Soc l\'Aula Kids, el teu tutor de geografia. Tens algun dubte sobre els 50 països d\'Europa? Pregunta\'m el que vulguis! 🌍✨' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await geminiService.askTutor(userMsg, messages);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "S'ha produït un error de connexió. Torna-ho a provar! ⚠️" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[3.5rem] p-10 shadow-2xl border border-slate-100 max-w-4xl mx-auto h-[700px] flex flex-col animate-in zoom-in-95 duration-500">
      <div className="flex items-center gap-4 border-b pb-6 mb-6">
        <div className="w-14 h-14 bg-gradient-to-br from-[#83B445] to-emerald-400 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">AK</div>
        <div>
          <h2 className="font-black text-slate-800 uppercase tracking-tighter text-xl">Tutor Aula Kids</h2>
          <p className="text-[10px] font-bold text-[#83B445] uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-[#83B445] rounded-full animate-pulse"></span>
            Intel·ligència Artificial Activa
          </p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-grow overflow-y-auto pr-4 space-y-6 no-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-7 py-5 rounded-[2.2rem] text-sm font-semibold shadow-sm leading-relaxed ${
              m.role === 'user' ? 'bg-[#83B445] text-white rounded-tr-none' : 'bg-slate-50 text-slate-700 rounded-tl-none border border-slate-100'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-50 px-6 py-4 rounded-[2rem] rounded-tl-none border border-slate-100 flex gap-2">
              <div className="w-2 h-2 bg-[#83B445] rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-[#83B445] rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 bg-[#83B445] rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex gap-4">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Com es diu la capital de..."
          className="flex-grow bg-slate-50 border-2 border-slate-100 rounded-[2rem] px-8 py-5 font-bold focus:border-[#83B445] outline-none transition-all"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="bg-[#83B445] text-white w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-[#83B445]/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SectionTutor;
