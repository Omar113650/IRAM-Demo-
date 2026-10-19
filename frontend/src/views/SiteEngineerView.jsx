import React, { useState } from 'react';
import { 
  HardHat, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Calendar, 
  ClipboardCheck, 
  Clock, 
  FileText,
  Sparkles,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export default function SiteEngineerView({ onBack, onOpenWaste, onOpenTransfers, language }) {
  const isAr = language === 'ar';

  const [consumptionLogs, setConsumptionLogs] = useState([
    {
      id: "LOG-4091",
      date: "Today, 11:30 AM",
      activity: "4th Floor Columns Pouring (Zone B)",
      material: "High Tensile Steel Rebar 16mm",
      quantity: "3.2 Tons",
      plannedAllowance: "2.8 Tons",
      wasteObserved: "0.4 Tons (Off-cuts discarded)",
      status: "Flagged for AI Waste Review",
      statusColor: "bg-rose-50 text-rose-700 border-rose-200",
      image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "LOG-4088",
      date: "Yesterday, 04:15 PM",
      activity: "Basement Water Storage Tank Slab",
      material: "Ready-Mix Concrete C30/37",
      quantity: "48 m³",
      plannedAllowance: "46 m³",
      wasteObserved: "2 m³ (Chute residue & pump line washout)",
      status: "Within Engineering Tolerance",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=150&auto=format&fit=crop&q=80"
    }
  ]);

  const [showLogModal, setShowLogModal] = useState(false);
  const [activityName, setActivityName] = useState('Ground Floor Masonry Partitions');
  const [materialSelected, setMaterialSelected] = useState('Hollow Concrete Blocks 20x20x40');
  const [actualQty, setActualQty] = useState('12');
  const [unit, setUnit] = useState('Thousand Pcs');
  const [notes, setNotes] = useState('');
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSaveLog = (e) => {
    e.preventDefault();
    const newEntry = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      date: "Just now",
      activity: activityName,
      material: materialSelected,
      quantity: `${actualQty} ${unit}`,
      plannedAllowance: `${(Number(actualQty) * 0.95).toFixed(1)} ${unit}`,
      wasteObserved: "0.2 (Corner chipping)",
      status: "Logged & Synced to Project Manager",
      statusColor: "bg-blue-50 text-blue-700 border-blue-200"
    };

    setConsumptionLogs([newEntry, ...consumptionLogs]);
    setSuccessMsg(isAr ? "تم تسجيل الاستهلاك اليومي بنجاح وإرساله للـ BOQ!" : "Daily consumption recorded and synced to Project BOQ!");
    setTimeout(() => {
      setShowLogModal(false);
      setSuccessMsg(null);
    }, 1400);
  };

  return (
    <div className="space-y-6">
      
      {/* Contextual Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="px-3.5 py-1.5 rounded-lg bg-white border border-[#CBD5E1] hover:border-[#E85312] text-[#0F172A] hover:text-[#E85312] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs w-fit"
        >
          {isAr ? <ArrowRight className="w-3.5 h-3.5 text-[#E85312]" /> : <ArrowLeft className="w-3.5 h-3.5 text-[#E85312]" />}
          <span>{isAr ? "← العودة إلى الشاشة السابقة" : "← Back to Previous Screen"}</span>
        </button>
      )}

      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-slate-900">
              {isAr ? "لوحة مهندس الموقع (Site Engineer Dashboard)" : "Site Engineer Execution & Consumption"}
            </h1>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
              Al-Mansoura Site Scope
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            {isAr
              ? "تسجيل الاستهلاك اليومي للمواد بموقع العمل، مراقبة نسب الهدر الميداني، ومطابقة الكميات الفعلية مع جدول الـ BOQ."
              : "Log daily material installation, report field waste anomalies, and maintain accurate real-time site balances."}
          </p>
        </div>

        <button 
          onClick={() => setShowLogModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-xs shadow-md shadow-[#E85312]/20 transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{isAr ? "تسجيل استهلاك مواد يومي" : "Log Daily Consumption"}</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card">
          <span className="text-xs font-bold text-slate-400">Assigned Site</span>
          <div className="text-base font-black text-slate-900 mt-1">Al-Mansoura Residential Complex</div>
          <span className="text-[11px] text-slate-500">Zone B4 • Phase 2 Core Structure</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-rose-200 bg-rose-50/20 shadow-card">
          <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            Active Waste Alert
          </span>
          <div className="text-xl font-black text-rose-700 mt-1">+3.5% Rebar Cutting Loss</div>
          <span className="text-[11px] text-rose-600 font-medium">BBS digital optimization recommended</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-card">
          <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Inspection Approvals
          </span>
          <div className="text-xl font-black text-emerald-800 mt-1">100% Quality Pass</div>
          <span className="text-[11px] text-emerald-600 font-medium">Ready for next concrete pour</span>
        </div>
      </div>

      {/* Consumption Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">
              {isAr ? "سجل استهلاك المواد الميداني اليومي" : "Daily Site Material Consumption Log"}
            </h3>
            <p className="text-[11px] text-slate-400">Recorded on-site by Eng. Mohamed Fathy</p>
          </div>
          <button 
            onClick={() => setShowLogModal(true)}
            className="text-xs font-bold text-[#E85312] hover:underline"
          >
            + Add Log
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {consumptionLogs.map(log => (
            <div key={log.id} className="p-5 hover:bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-13 h-13 rounded-xl border border-slate-200 overflow-hidden shrink-0 shadow-2xs relative flex items-center justify-center bg-slate-900 select-none">
                  {log.material.toLowerCase().includes('steel') ? (
                    <svg className="w-full h-full p-2" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="48" height="48" rx="8" fill="#0F172A" />
                      {/* 3 Rebar Ribbed Rods */}
                      <rect x="8" y="10" width="32" height="6" rx="3" fill="#64748B" />
                      <line x1="12" y1="10" x2="16" y2="16" stroke="#E85312" strokeWidth="1.5" />
                      <line x1="20" y1="10" x2="24" y2="16" stroke="#E85312" strokeWidth="1.5" />
                      <line x1="28" y1="10" x2="32" y2="16" stroke="#E85312" strokeWidth="1.5" />
                      
                      <rect x="8" y="21" width="32" height="6" rx="3" fill="#94A3B8" />
                      <line x1="12" y1="21" x2="16" y2="27" stroke="#E85312" strokeWidth="1.5" />
                      <line x1="20" y1="21" x2="24" y2="27" stroke="#E85312" strokeWidth="1.5" />
                      <line x1="28" y1="21" x2="32" y2="27" stroke="#E85312" strokeWidth="1.5" />

                      <rect x="8" y="32" width="32" height="6" rx="3" fill="#475569" />
                      <line x1="12" y1="32" x2="16" y2="38" stroke="#E85312" strokeWidth="1.5" />
                      <line x1="20" y1="32" x2="24" y2="38" stroke="#E85312" strokeWidth="1.5" />
                      <line x1="28" y1="32" x2="32" y2="38" stroke="#E85312" strokeWidth="1.5" />
                    </svg>
                  ) : log.material.toLowerCase().includes('concrete') ? (
                    <svg className="w-full h-full p-2" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="48" height="48" rx="8" fill="#1E293B" />
                      {/* Ready Mix Transit Drum & Flow */}
                      <polygon points="12,14 36,18 36,30 12,34" fill="#E85312" rx="2" />
                      <path d="M 24 16 Q 28 24 24 32" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="2 2" />
                      <path d="M 36 24 L 42 28 L 38 36 Z" fill="#94A3B8" />
                      <circle cx="16" cy="36" r="3" fill="#0F172A" />
                      <circle cx="32" cy="36" r="3" fill="#0F172A" />
                    </svg>
                  ) : (
                    <svg className="w-full h-full p-2" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="48" height="48" rx="8" fill="#334155" />
                      <rect x="10" y="14" width="13" height="9" fill="#94A3B8" rx="1" />
                      <rect x="25" y="14" width="13" height="9" fill="#94A3B8" rx="1" />
                      <rect x="18" y="25" width="13" height="9" fill="#F59E0B" rx="1" />
                    </svg>
                  )}

                  {log.image && (
                    <img 
                      src={log.image} 
                      alt="" 
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#E85312]">{log.id}</span>
                    <h4 className="font-bold text-slate-900 text-sm">{log.material}</h4>
                    <span className="text-xs font-mono font-bold text-slate-700">({log.quantity})</span>
                  </div>
                  <div className="text-xs text-slate-600">
                    Activity: <strong>{log.activity}</strong> • Allowance: {log.plannedAllowance}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    Observed Waste: <strong className="text-rose-600">{log.wasteObserved}</strong> • Timestamp: {log.date}
                  </div>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border shrink-0 ${log.statusColor}`}>
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: LOG CONSUMPTION */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in zoom-in-95">
            <div className="p-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">
                  {isAr ? "تسجيل استهلاك مواد الموقع" : "Log Material Installation"}
                </h3>
                <p className="text-[11px] text-slate-500">Updates live project inventory balance</p>
              </div>
              <button onClick={() => setShowLogModal(false)}>✕</button>
            </div>

            <form onSubmit={handleSaveLog} className="p-6 space-y-3.5 text-xs">
              {successMsg ? (
                <div className="text-center py-6 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{successMsg}</h4>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Construction Activity</label>
                    <input 
                      type="text" 
                      required
                      value={activityName}
                      onChange={(e) => setActivityName(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Material Item</label>
                    <select 
                      value={materialSelected}
                      onChange={(e) => setMaterialSelected(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                    >
                      <option>High Tensile Steel Rebar 16mm</option>
                      <option>Portland Cement 42.5N</option>
                      <option>Ready-Mix Concrete C30/37</option>
                      <option>Hollow Concrete Blocks 20x20x40</option>
                      <option>Heavy Duty PVC Drainage Pipes 4 Inch</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Actual Consumed Qty</label>
                      <input 
                        type="number" 
                        required
                        value={actualQty}
                        onChange={(e) => setActualQty(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Unit</label>
                      <input 
                        type="text" 
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Field Observation / Waste Notes</label>
                    <textarea 
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. 2 bags damaged due to rain splatter..."
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-xs shadow-md shadow-[#E85312]/20 transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <ClipboardCheck className="w-4 h-4" />
                    <span>Save & Commit to Project Consumption Ledger</span>
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
