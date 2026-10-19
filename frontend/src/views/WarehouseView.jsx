import React, { useState } from 'react';
import { 
  Warehouse, 
  PackageCheck, 
  AlertOctagon, 
  Plus, 
  FileSearch, 
  CheckCircle2, 
  Boxes,
  QrCode,
  ArrowRightLeft,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export default function WarehouseView({ onOpenOCR, onOpenSurplusLog, onBack, language }) {
  const isAr = language === 'ar';

  const [showSurplusModal, setShowSurplusModal] = useState(false);
  const [surplusMaterial, setSurplusMaterial] = useState('MAT-001');
  const [surplusQty, setSurplusQty] = useState(25);
  const [surplusCondition, setSurplusCondition] = useState('Brand New in Storage');
  const [surplusReason, setSurplusReason] = useState('Phase completed early');
  const [surplusSavedSuccess, setSurplusSavedSuccess] = useState(false);

  const warehouseStocks = [
    {
      sku: "STL-RB-16",
      material: "High Tensile Steel Rebar 16mm",
      category: "Metals & Structural",
      stockOnHand: "26 Tons",
      reserved: "10 Tons",
      condition: "Stored on wooden dunnage",
      location: "Al-Mansoura Yard 1",
      image: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?w=150&auto=format&fit=crop&q=80"
    },
    {
      sku: "CMT-PORT-42",
      material: "Portland Cement 42.5N",
      category: "Masonry",
      stockOnHand: "350 Bags",
      reserved: "50 Bags",
      condition: "Moisture-free warehouse",
      location: "Al-Mansoura Shed A",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=150&auto=format&fit=crop&q=80"
    },
    {
      sku: "STL-RB-16",
      material: "High Tensile Steel Rebar 16mm (Surplus)",
      category: "Metals & Structural",
      stockOnHand: "90 Tons (Surplus)",
      reserved: "50 Tons (TR-00101)",
      condition: "Wrapped bundles",
      location: "New Capital Yard Alpha",
      image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=150&auto=format&fit=crop&q=80"
    },
    {
      sku: "PIP-PVC-4IN",
      material: "Heavy Duty PVC Drainage Pipes 4 Inch (Surplus)",
      category: "Plumbing",
      stockOnHand: "280 Meters (Surplus)",
      reserved: "0",
      condition: "Racks in B2",
      location: "New Capital B2 Storage",
      image: "https://images.unsplash.com/photo-1542013936693-884638332954?w=150&auto=format&fit=crop&q=80"
    }
  ];

  const handleRegisterSurplus = (e) => {
    e.preventDefault();
    setSurplusSavedSuccess(true);
    setTimeout(() => {
      setShowSurplusModal(false);
      setSurplusSavedSuccess(false);
    }, 1500);
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

      {/* Banner */}
      <div className="bg-white p-6 rounded-2xl border border-[#CBD5E1] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900">
              {isAr ? "إدارة المخازن والاستلام الميداني (Site Warehouse & Receiving)" : "Site Warehouse & Material Receiving"}
            </h1>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
              SRS 10.6
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
            {isAr
              ? "تسجيل استلام المواد المشتراة، مطابقة أذون الاستلام بالفحص الضوئي الذكي OCR، وتسجيل الفائض المتبقي لإعادة استغلاله."
              : "Reconcile delivery notes with purchase orders, verify received vs damaged goods, and log leftover surplus."}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenOCR}
            className="px-3.5 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#E85312] font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <FileSearch className="w-3.5 h-3.5" />
            <span>{isAr ? "فحص إذن استلام بالـ OCR" : "Scan Delivery Note OCR"}</span>
          </button>

          <button
            onClick={() => setShowSurplusModal(true)}
            className="px-3.5 py-2 rounded-xl bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-xs shadow-xs shadow-[#E85312]/20 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isAr ? "تسجيل فائض مواد (Log Surplus)" : "Log Material Surplus"}</span>
          </button>
        </div>
      </div>

      {/* Stock Cards */}
      <div className="bg-white rounded-2xl border border-[#CBD5E1] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#CBD5E1] flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-900">
            {isAr ? "المخزون الفعلي بالمواقع والمخازن" : "On-Hand Site Warehouse Balances"}
          </h3>
          <span className="text-xs text-slate-400 font-mono">Live Sync</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
              <tr>
                <th className="px-5 py-3">Material & SKU</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Physical Stock</th>
                <th className="px-4 py-3">Reserved</th>
                <th className="px-4 py-3">Storage Location & Bay</th>
                <th className="px-4 py-3 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {warehouseStocks.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl border border-slate-200 overflow-hidden shrink-0 shadow-2xs relative flex items-center justify-center bg-slate-900 select-none">
                        {item.sku.startsWith('STL') ? (
                          <svg className="w-full h-full p-2" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="40" height="40" rx="8" fill="#0F172A" />
                            <rect x="6" y="10" width="28" height="5" rx="2.5" fill="#64748B" />
                            <line x1="10" y1="10" x2="14" y2="15" stroke="#E85312" strokeWidth="1.5" />
                            <line x1="18" y1="10" x2="22" y2="15" stroke="#E85312" strokeWidth="1.5" />
                            <line x1="26" y1="10" x2="30" y2="15" stroke="#E85312" strokeWidth="1.5" />
                            
                            <rect x="6" y="18" width="28" height="5" rx="2.5" fill="#94A3B8" />
                            <line x1="10" y1="18" x2="14" y2="23" stroke="#E85312" strokeWidth="1.5" />
                            <line x1="18" y1="18" x2="22" y2="23" stroke="#E85312" strokeWidth="1.5" />
                            <line x1="26" y1="18" x2="30" y2="23" stroke="#E85312" strokeWidth="1.5" />

                            <rect x="6" y="26" width="28" height="5" rx="2.5" fill="#475569" />
                            <line x1="10" y1="26" x2="14" y2="31" stroke="#E85312" strokeWidth="1.5" />
                            <line x1="18" y1="26" x2="22" y2="31" stroke="#E85312" strokeWidth="1.5" />
                            <line x1="26" y1="26" x2="30" y2="31" stroke="#E85312" strokeWidth="1.5" />
                          </svg>
                        ) : item.sku.startsWith('CMT') ? (
                          <svg className="w-full h-full p-2" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="40" height="40" rx="8" fill="#1E293B" />
                            <rect x="10" y="8" width="20" height="24" rx="3" fill="#E85312" />
                            <rect x="13" y="15" width="14" height="10" fill="#FFFFFF" rx="2" />
                            <text x="14" y="23" fill="#E85312" fontSize="6" fontWeight="bold" fontFamily="sans-serif">CEM I</text>
                          </svg>
                        ) : item.sku.startsWith('PIP') ? (
                          <svg className="w-full h-full p-2" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="40" height="40" rx="8" fill="#0C4A6E" />
                            <circle cx="15" cy="18" r="7" stroke="#38BDF8" strokeWidth="2.5" fill="#0284C7" />
                            <circle cx="15" cy="18" r="3.5" fill="#0369A1" />
                            <circle cx="26" cy="24" r="7" stroke="#F97316" strokeWidth="2.5" fill="#EA580C" />
                            <circle cx="26" cy="24" r="3.5" fill="#C2410C" />
                          </svg>
                        ) : (
                          <svg className="w-full h-full p-2" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="40" height="40" rx="8" fill="#334155" />
                            <rect x="8" y="12" width="11" height="8" fill="#94A3B8" rx="1" />
                            <rect x="21" y="12" width="11" height="8" fill="#94A3B8" rx="1" />
                            <rect x="14" y="22" width="12" height="8" fill="#F59E0B" rx="1" />
                          </svg>
                        )}
                        {item.image && (
                          <img 
                            src={item.image} 
                            alt="" 
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        )}
                      </div>
                      <div>
                        <span className="font-mono text-[10px] text-slate-400 font-bold block">{item.sku}</span>
                        <div className="font-bold text-slate-900 text-xs">{item.material}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-slate-600">{item.category}</td>
                  <td className="px-4 py-3.5 font-mono font-bold text-slate-900">{item.stockOnHand}</td>
                  <td className="px-4 py-3.5 font-mono text-amber-600 font-semibold">{item.reserved}</td>
                  <td className="px-4 py-3.5 text-slate-500">{item.location}</td>
                  <td className="px-4 py-3.5 text-right">
                    <button 
                      onClick={() => setShowSurplusModal(true)}
                      className="text-xs text-[#E85312] hover:underline font-bold"
                    >
                      Declare Surplus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* LOG SURPLUS MODAL (SRS 10.6.2) */}
      {showSurplusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="p-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">
                  {isAr ? "تسجيل فائض مواد بالمشروع (Register Material Surplus - SRS 10.6.2)" : "Register Surplus Material"}
                </h3>
                <p className="text-[11px] text-slate-500">
                  Automatically broadcasts availability to sister projects to avoid duplicate purchases
                </p>
              </div>
              <button onClick={() => setShowSurplusModal(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={handleRegisterSurplus} className="p-6 space-y-4 text-xs">
              {surplusSavedSuccess ? (
                <div className="text-center py-6 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {isAr ? "تم تسجيل الفائض ومطابقته مع مشاريع الشركة بنجاح!" : "Surplus Registered & Matched Across Sister Sites!"}
                  </h4>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Surplus Material Item</label>
                    <select 
                      value={surplusMaterial}
                      onChange={(e) => setSurplusMaterial(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                    >
                      <option value="MAT-001">High Tensile Steel Rebar 16mm (Grade 60)</option>
                      <option value="MAT-002">Portland Cement 42.5N</option>
                      <option value="MAT-005">Heavy Duty PVC Drainage Pipes 4 Inch</option>
                      <option value="MAT-006">Vitrified Floor Tiles 60x60</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Surplus Quantity</label>
                      <input 
                        type="number" 
                        value={surplusQty}
                        onChange={(e) => setSurplusQty(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Material Condition</label>
                      <select 
                        value={surplusCondition}
                        onChange={(e) => setSurplusCondition(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                      >
                        <option>Brand New in Storage</option>
                        <option>Good Usable Condition</option>
                        <option>Opened Bags / Requires Rapid Use</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Reason for Surplus</label>
                    <input 
                      type="text" 
                      value={surplusReason}
                      onChange={(e) => setSurplusReason(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                      placeholder="e.g. Design change in structural drawings"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-xs shadow-md shadow-[#E85312]/20 transition-all flex items-center justify-center gap-2"
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                    <span>Broadcast Surplus to Company Projects</span>
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
