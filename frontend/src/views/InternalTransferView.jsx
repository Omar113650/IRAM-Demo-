import React, { useState } from 'react';
import { 
  ArrowRightLeft, 
  Coins, 
  CheckCircle2, 
  Building, 
  Truck, 
  MapPin, 
  Calendar, 
  Sparkles, 
  AlertCircle,
  Plus,
  ShieldCheck,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export default function InternalTransferView({ language, onBack }) {
  const isAr = language === 'ar';

  const [activeTab, setActiveTab] = useState('matches'); // 'matches', 'surplus', 'history'
  const [transfers, setTransfers] = useState([
    {
      id: "TR-00101",
      requestId: "REQ-00101",
      sourceProject: "New Capital Business Tower",
      sourceProjectId: "PRJ-002",
      targetProject: "Al-Mansoura Residential Complex",
      targetProjectId: "PRJ-001",
      materialName: "High Tensile Steel Rebar 16mm",
      quantity: 50,
      unit: "Ton",
      distanceKm: 145,
      transportCost: 1450,
      externalPurchaseCost: 47000,
      totalSaved: 45550,
      status: "Pending Source PM Approval",
      requestedBy: "Eng. Tamer Khaled (Target PM)",
      sourceApprover: "Eng. Mostafa Salem (Source PM)",
      createdAt: "Today at 10:15 AM"
    },
    {
      id: "TR-00098",
      requestId: "REQ-00092",
      sourceProject: "Al-Mansoura Residential Complex",
      sourceProjectId: "PRJ-001",
      targetProject: "Alexandria Waterfront Heights",
      targetProjectId: "PRJ-003",
      materialName: "Vitrified Porcelain Floor Tiles 60x60",
      quantity: 450,
      unit: "m²",
      distanceKm: 120,
      transportCost: 350,
      externalPurchaseCost: 8100,
      totalSaved: 7750,
      status: "Completed & Received",
      requestedBy: "Eng. Sara Adel",
      sourceApprover: "Eng. Tamer Khaled",
      createdAt: "Oct 02, 2026"
    }
  ]);

  const [surplusItems, setSurplusItems] = useState([
    {
      id: "SUR-0001",
      project: "New Capital Business Tower",
      material: "High Tensile Steel Rebar 16mm",
      sku: "STL-RB-16",
      quantity: "90 Tons",
      condition: "Brand New - Mill Wrapped Bundles",
      valueUSD: 84600,
      status: "50T Matched to Al-Mansoura (40T Remaining)"
    },
    {
      id: "SUR-0002",
      project: "New Capital Business Tower",
      material: "Heavy Duty PVC Drainage Pipes 4 Inch",
      sku: "PIP-PVC-4IN",
      quantity: "280 Meters",
      condition: "Pristine - Basement Racks",
      valueUSD: 3500,
      status: "Available for Reallocation"
    }
  ]);

  const [notification, setNotification] = useState(null);

  const handleApproveTransfer = (transferId) => {
    setTransfers(prev => prev.map(t => {
      if (t.id === transferId) {
        return {
          ...t,
          status: "Approved & In Transit",
          approvedAt: "Just now"
        };
      }
      return t;
    }));

    setNotification(isAr 
      ? `تم اعتماد النقل الداخلي ${transferId} بنجاح! تم حجز الكمية وجاري التنسيق اللوجستي مع السائقين.`
      : `Internal Transfer ${transferId} approved! Material reserved and dispatched for inter-site hauling.`
    );

    setTimeout(() => setNotification(null), 5000);
  };

  const cumulativeSavings = transfers.reduce((acc, t) => acc + t.totalSaved, 184500);

  return (
    <div className="space-y-6">
      
      {/* Contextual Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="px-3.5 py-1.5 rounded-lg bg-white border border-[#CBD5E1] hover:border-[#E85312] text-[#0F172A] hover:text-[#E85312] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
        >
          {isAr ? <ArrowRight className="w-3.5 h-3.5 text-[#E85312]" /> : <ArrowLeft className="w-3.5 h-3.5 text-[#E85312]" />}
          <span>{isAr ? "← العودة إلى الشاشة السابقة" : "← Back to Previous Screen"}</span>
        </button>
      )}

      {/* Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900">
              {isAr ? "إدارة الفائض وإعادة التوزيع الداخلي (Cross-Project Reallocation)" : "Surplus Matching & Cross-Project Transfers"}
            </h1>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold">
              SRS 10.4 & 10.7
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            {isAr
              ? "تحويل المواد المتبقية من أصول راكدة إلى موارد حيوية تسد عجز المشاريع الأخرى دون الحاجة للشراء الخارجي."
              : "Turns idle surplus into vital site resources, eliminating duplicate purchases and capturing massive cost avoidance."}
          </p>
        </div>

        {/* Savings Badge */}
        <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide">
              {isAr ? "إجمالي التوفير التراكمي" : "Cumulative Cost Saved"}
            </span>
            <div className="text-xl font-black text-emerald-700">
              ${cumulativeSavings.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {notification && (
        <div className="p-4 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-between shadow-lg animate-in fade-in">
          <span>{notification}</span>
          <button onClick={() => setNotification(null)}>✕</button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#E2E8F0] pb-2">
        <button
          onClick={() => setActiveTab('matches')}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
            activeTab === 'matches'
              ? 'bg-[#E85312] text-white shadow-xs'
              : 'text-[#64748B] hover:bg-[#F1F5F9]'
          }`}
        >
          {isAr ? "طلبات النقل والتطابق الذكي" : "AI Transfer Matches (Active)"}
        </button>
        <button
          onClick={() => setActiveTab('surplus')}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
            activeTab === 'surplus'
              ? 'bg-[#E85312] text-white shadow-xs'
              : 'text-[#64748B] hover:bg-[#F1F5F9]'
          }`}
        >
          {isAr ? "قائمة المواد الفائضة بالشركة" : "Company Surplus Catalog"}
        </button>
      </div>

      {/* MATCHES VIEW */}
      {activeTab === 'matches' && (
        <div className="space-y-4">
          {transfers.map(t => (
            <div 
              key={t.id}
              className={`p-6 rounded-2xl border transition-all ${
                t.status.includes('Pending') 
                  ? 'bg-white border-orange-200 shadow-sm' 
                  : 'bg-white border-slate-200/80'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                {/* Transfer Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-orange-100 text-[#E85312]">
                      {t.id}
                    </span>
                    <h3 className="font-black text-base text-slate-900">
                      {t.materialName} ({t.quantity} {t.unit})
                    </h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      t.status.includes('Approved') 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {t.status}
                    </span>
                  </div>

                  {/* Inter-site Path visual */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                    <span className="flex items-center gap-1 font-bold text-slate-900">
                      <Building className="w-3.5 h-3.5 text-[#E85312]" />
                      {t.sourceProject} (Source)
                    </span>
                    <span className="text-slate-400">➔</span>
                    <span className="flex items-center gap-1 font-bold text-slate-900">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      {t.targetProject} (Target)
                    </span>
                    <span className="text-slate-400">|</span>
                    <span className="text-slate-500 font-mono">
                      Distance: {t.distanceKm} km • Freight Est: ${t.transportCost.toLocaleString()}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500">
                    Requested by <strong>{t.requestedBy}</strong> • Source Approver: <strong>{t.sourceApprover}</strong>
                  </div>
                </div>

                {/* Savings & Action */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-end gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Net Cost Avoided</span>
                    <div className="text-2xl font-black text-emerald-600 font-mono">
                      +${t.totalSaved.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-slate-400">
                      Purchasing external would cost ${t.externalPurchaseCost.toLocaleString()}
                    </span>
                  </div>

                  {t.status.includes('Pending') ? (
                    <button
                      onClick={() => handleApproveTransfer(t.id)}
                      className="px-5 py-2 rounded-lg bg-[#E85312] hover:bg-[#CC490F] text-white font-medium text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isAr ? "موافقة مدير المشروع المصدر" : "Authorize Transfer (BR-08)"}</span>
                    </button>
                  ) : (
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center gap-1.5">
                      <Truck className="w-4 h-4" />
                      <span>{isAr ? "جاري النقل والتحميل" : "Dispatched In-Transit"}</span>
                    </span>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* SURPLUS CATALOG VIEW */}
      {activeTab === 'surplus' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
              <tr>
                <th className="px-5 py-3">ID & Material</th>
                <th className="px-4 py-3">Project Site</th>
                <th className="px-4 py-3">Surplus Qty</th>
                <th className="px-4 py-3">Asset Value</th>
                <th className="px-4 py-3">Condition & Storage</th>
                <th className="px-4 py-3">Reallocation Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {surplusItems.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3.5">
                    <span className="font-mono text-[10px] font-bold text-[#E85312]">{item.id}</span>
                    <div className="font-bold text-slate-900 text-xs">{item.material}</div>
                  </td>
                  <td className="px-4 py-3.5 text-slate-800">{item.project}</td>
                  <td className="px-4 py-3.5 font-bold font-mono text-slate-900">{item.quantity}</td>
                  <td className="px-4 py-3.5 font-mono text-emerald-600 font-bold">${item.valueUSD.toLocaleString()}</td>
                  <td className="px-4 py-3.5 text-slate-500">{item.condition}</td>
                  <td className="px-4 py-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-[#E85312]">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
