import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  ArrowRightLeft, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp,
  Cpu
} from 'lucide-react';
import { api } from '../services/api';
import IramLogo from './IramLogo';

export default function AIAssistantDrawer({ isOpen, onClose, language }) {
  const isAr = language === 'ar';

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: isAr 
        ? 'مرحباً بك! أنا مساعد IRAM الإنشائي الذكي. كيف يمكنني مساعدتك في تحليل مخزون المواد، فحص العجز، أو استغلال الفائض والهدر عبر مشاريع الشركة؟'
        : 'Welcome! I am your IRAM AI Construction Assistant. How can I help you optimize material inventory, forecast shortages, or recover surplus value today?',
      structuredData: null,
      timestamp: 'Just now'
    }
  ]);
  const [loading, setLoading] = useState(false);

  const quickPrompts = isAr ? [
    "ماذا تملك الشركة حالياً وأين يقع؟ (رؤية موحدة)",
    "تحليل عجز حديد التسليح وتاريخ النفاذ",
    "أين يتوفر فائض مواد قابل للنقل داخلياً؟",
    "مقارنة عروض أسعار الموردين والترسية الذكية",
    "تقرير أنشطة الهدر المرتفع (Waste Prediction)",
    "تتبع ونقل المعدات والآليات بين المواقع"
  ] : [
    "What does company have and where is it located?",
    "Analyze Steel Rebar shortage & burn rate",
    "Where is surplus available to reallocate?",
    "Compare supplier RFQ offers & AI recommendation",
    "High risk waste prediction activities",
    "Track & reallocate equipment across sites"
  ];

  const handleSend = async (queryText) => {
    const query = queryText || input;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.chatAI(query, language);
      const replyData = res.data || {};

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: replyData.reply || (isAr ? "تمت معالجة استفسارك وفقاً لبيانات مشاريع الشركة." : "Your query was processed against company project records."),
        structuredData: replyData.structuredData || null,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
      
      {/* Header */}
      <div className="p-4 bg-[#0A1128] border-b border-slate-800 text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <IramLogo className="h-6 w-auto" variant="dark" />
          <div className="border-l border-slate-700 pl-2.5">
            <div className="text-xs font-bold flex items-center gap-1.5">
              <span>Construction AI</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold">
                Live
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              {isAr ? "تحليل المخزون، النقل الداخلي، والتنبؤ بالهدر" : "Material Lifecycle Assistant"}
            </p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map(msg => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-start gap-2 max-w-[90%]">
              {msg.sender === 'bot' && (
                <div className="w-6 h-6 rounded-full bg-[#F95738]/10 text-[#F95738] flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div>
                <div className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-line shadow-xs ${
                  msg.sender === 'user' 
                    ? 'bg-[#F95738] text-white rounded-tr-xs' 
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs'
                }`}>
                  {msg.text}

                  {/* Embedded Structured Data Card */}
                  {msg.structuredData && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 bg-slate-50 -mx-1 -mb-1 p-2.5 rounded-xl">
                      {msg.structuredData.type === 'TRANSFER_RECOMMENDATION' && (
                        <div className="space-y-1.5 text-[11px]">
                          <div className="flex items-center justify-between font-bold text-slate-900">
                            <span className="flex items-center gap-1 text-[#F95738]">
                              <ArrowRightLeft className="w-3.5 h-3.5" />
                              {msg.structuredData.transferId}
                            </span>
                            <span className="text-emerald-600 font-extrabold">
                              +${msg.structuredData.potentialSaving.toLocaleString()} Saved
                            </span>
                          </div>
                          <div className="text-slate-600">
                            {msg.structuredData.material} • {msg.structuredData.quantity}
                          </div>
                          <button className="w-full mt-1.5 py-1 text-center bg-[#F95738] text-white rounded-lg font-bold text-[10px] hover:bg-[#E24426] transition-colors">
                            {isAr ? "مراجعة واعتماد النقل الداخلي" : "Review & Authorize Transfer"}
                          </button>
                        </div>
                      )}

                      {msg.structuredData.type === 'WASTE_ALERT' && (
                        <div className="space-y-1.5 text-[11px]">
                          <div className="flex items-center justify-between font-bold text-rose-600">
                            <span className="flex items-center gap-1">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              Waste Anomaly ({msg.structuredData.risk} Risk)
                            </span>
                            <span>{msg.structuredData.deviation}</span>
                          </div>
                          <p className="text-slate-600 text-[10px]">
                            {isAr ? "إلزام المقاول ببرنامج قص رقمي BBS 1D" : "Mandate 1D BBS cutting optimization"}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-slate-500 italic p-2">
            <Sparkles className="w-3.5 h-3.5 animate-spin text-[#E85312]" />
            <span>{isAr ? "جاري تحليل مشاريع الشركة بالذكاء الاصطناعي..." : "Querying cross-project knowledge model..."}</span>
          </div>
        )}
      </div>

      {/* Quick Suggestions */}
      <div className="p-2.5 bg-white border-t border-[#E2E8F0] overflow-x-auto flex gap-1.5 no-scrollbar">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="whitespace-nowrap px-2.5 py-1 rounded-full bg-[#F1F5F9] hover:bg-[#FEECE5] hover:text-[#E85312] text-[#0F172A] text-[10px] font-medium transition-all shrink-0 cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-white border-t border-[#E2E8F0] flex items-center gap-2">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={isAr ? "اسأل عن أي مادة، فائض، هدر، أو مورد..." : "Ask about materials, surplus, waste, or suppliers..."}
          className="flex-1 px-3 py-2 text-xs bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] focus:outline-hidden focus:border-[#E85312] focus:ring-1 focus:ring-[#E85312]"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim()}
          className="p-2 rounded-lg bg-[#E85312] hover:bg-[#CC490F] disabled:opacity-50 text-white transition-colors cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
