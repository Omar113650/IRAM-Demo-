import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRightLeft, 
  Sparkles, 
  Wrench, 
  ShieldCheck, 
  Filter, 
  Search,
  Activity,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export default function SmartEquipmentView({ onBack, language }) {
  const isAr = language === 'ar';
  const BackIcon = isAr ? ArrowRight : ArrowLeft;

  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterSite, setFilterSite] = useState('ALL');
  const [reallocateModal, setReallocateModal] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Machinery & Equipment Fleet across company sister projects
  const [equipmentList, setEquipmentList] = useState([
    {
      id: "EQP-01",
      code: "CRN-LIEB-550",
      name: "Liebherr Tower Crane 550 EC-H",
      nameAr: "ونش برج (تاور كرين) ليبر 550 طن-متر",
      category: "Lifting & Cranes",
      categoryAr: "روافع وأوناش برجية",
      currentSite: "New Capital Business Tower",
      siteId: "PRJ-002",
      status: "Idle in 4 Days",
      statusAr: "سيتوفر خلال 4 أيام (انتهاء الهيكل)",
      statusClass: "bg-amber-50 text-amber-800 border-amber-300",
      utilizationPct: 92,
      operatingHours: "1,420 hrs",
      nextMaintenance: "Nov 15, 2026",
      aiRecommendation: "مطلوب فوراً في كمبوند المنصورة (قطاع B4) لصب الأبراج السكنية؛ نقله يوفر $18,000 إيجار شهري لمعدة خارجية.",
      aiRecommendationEn: "Demanded by Al-Mansoura Site. Reallocating saves $18k/month in external equipment rental.",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "EQP-02",
      code: "PMP-PUTZ-42",
      name: "Putzmeister 42m Mobile Concrete Boom Pump",
      nameAr: "مضخة خرسانة متحركة بوتزمايستر 42 متر",
      category: "Concreting Machinery",
      categoryAr: "معدات ومضخات الخرسانة",
      currentSite: "Al-Mansoura Residential Complex",
      siteId: "PRJ-001",
      status: "Active on Site",
      statusAr: "نشطة بموقع المنصورة",
      statusClass: "bg-emerald-50 text-emerald-800 border-emerald-300",
      utilizationPct: 86,
      operatingHours: "890 hrs",
      nextMaintenance: "Dec 01, 2026",
      aiRecommendation: "تغطي جدول صب الأسقف الحالي بمعدل 45 م³/ساعة؛ لا توجد فترات خمول غير مستغلة.",
      aiRecommendationEn: "Sufficiently utilized on current floor slab pouring cycle.",
      image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "EQP-03",
      code: "EXC-CAT-336",
      name: "CAT 336 Hydraulic Excavator (Heavy Duty)",
      nameAr: "حفار هيدروليكي كاتربيلر 336D",
      category: "Earthmoving & Excavation",
      categoryAr: "حفر وتسوية التربة",
      currentSite: "Alexandria Waterfront Heights",
      siteId: "PRJ-003",
      status: "Surplus / Available",
      statusAr: "فائض جاهز للنقل (انتهاء أعمال الحفر)",
      statusClass: "bg-blue-50 text-blue-800 border-blue-300",
      utilizationPct: 35,
      operatingHours: "2,150 hrs",
      nextMaintenance: "Oct 29, 2026",
      aiRecommendation: "أعمال الأساسات والحفر في الإسكندرية اكتملت بنسبة 100%؛ يوصى بنقله إلى ساحة تشوين المنصورة لتجهيز المرحلة الثانية.",
      aiRecommendationEn: "Foundation digging completed. Ready for immediate redeployment.",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "EQP-04",
      code: "LDR-CAT-966",
      name: "Caterpillar 966H Wheel Loader",
      nameAr: "لودر كاتربيلر 966 عجل كبير",
      category: "Material Handling",
      categoryAr: "نقل ومناولة الركام والمواد",
      currentSite: "New Capital Business Tower",
      siteId: "PRJ-002",
      status: "Active on Site",
      statusAr: "نشط بموقع العاصمة",
      statusClass: "bg-emerald-50 text-emerald-800 border-emerald-300",
      utilizationPct: 78,
      operatingHours: "3,400 hrs",
      nextMaintenance: "Nov 20, 2026",
      aiRecommendation: "مخصص لتحميل ركام ورمل محطة الخلط المركزية.",
      aiRecommendationEn: "Operational for batch plant aggregate feeding.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&auto=format&fit=crop&q=80"
    }
  ]);

  const handleReallocate = (eq) => {
    setReallocateModal(eq);
  };

  const confirmReallocation = (e) => {
    e.preventDefault();
    setEquipmentList(prev => prev.map(item => {
      if (item.id === reallocateModal.id) {
        return {
          ...item,
          status: "Transfer Scheduled",
          statusAr: "مجدول للنقل الداخلي",
          statusClass: "bg-purple-50 text-purple-800 border-purple-300"
        };
      }
      return item;
    }));

    setToastMessage(isAr 
      ? `تم جدولة نقل المعدة ${reallocateModal.nameAr} بنجاح وإشعار مديري المواقع اللوجستية.`
      : `Equipment ${reallocateModal.name} mobilization request dispatched!`);
    
    setReallocateModal(null);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredEquipment = equipmentList.filter(eq => {
    if (filterStatus !== 'ALL' && eq.status !== filterStatus) return false;
    if (filterSite !== 'ALL' && eq.siteId !== filterSite) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Contextual Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="px-3.5 py-1.5 rounded-lg bg-white border border-[#CBD5E1] hover:border-[#E85312] text-[#0F172A] hover:text-[#E85312] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs w-fit"
        >
          <BackIcon className="w-3.5 h-3.5 text-[#E85312]" />
          <span>{isAr ? "← العودة إلى الشاشة السابقة" : "← Back to Previous Screen"}</span>
        </button>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-4 bg-emerald-600 text-white rounded-2xl shadow-xl text-xs font-bold flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)}>✕</button>
        </div>
      )}

      {/* Section 07 Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-[#CBD5E1] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-[#0F172A]">
              {isAr ? "إدارة وتتبع الآليات والمعدات الذكية (Smart Equipment Management)" : "Smart Machinery & Equipment Management"}
            </h1>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-orange-100 text-[#E85312] font-black uppercase border border-orange-300">
              IRAM Roadmap Section 07
            </span>
          </div>
          <p className="text-xs text-[#475569] mt-1 max-w-3xl leading-relaxed">
            {isAr
              ? "متابعة مواقع وتوافر الأوناش البرجية ومضخات الخرسانة والمعدات الثقيلة عبر كافة مواقع الشركة، رصد معدلات التشغيل، وإعادة التوزيع الذكي لتفادي تكاليف الاستئجار الخارجي المرهقة."
              : "Track equipment location, operating availability, and utilization across project sites to identify smart internal reallocation opportunities."}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="px-3 py-1.5 rounded-lg bg-[#EEF2F6] text-xs font-bold text-[#0F172A] border border-[#CBD5E1]">
            {isAr ? `إجمالي الأسطول: ${equipmentList.length} معدات نشطة` : `Fleet: ${equipmentList.length} Assets`}
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#CBD5E1] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#475569] font-bold">
            <span>{isAr ? "متوسط كفاءة التشغيل" : "Average Fleet Utilization"}</span>
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-[#0F172A] mt-2 font-mono">72.8%</div>
          <p className="text-[11px] text-emerald-700 font-bold mt-1">+14% higher than industry benchmark</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#CBD5E1] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#475569] font-bold">
            <span>{isAr ? "توفير الإيجار عبر النقل الداخلي" : "Rental Avoidance Saved"}</span>
            <ArrowRightLeft className="w-4 h-4 text-[#E85312]" />
          </div>
          <div className="text-2xl font-black text-[#0F172A] mt-2 font-mono">$42,500</div>
          <p className="text-[11px] text-[#E85312] font-bold mt-1">2 Tower Cranes reallocated</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#CBD5E1] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#475569] font-bold">
            <span>{isAr ? "معدات متاحة لإعادة التوجيه" : "Surplus Equipment Ready"}</span>
            <Wrench className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-[#0F172A] mt-2 font-mono">2 Units</div>
          <p className="text-[11px] text-blue-700 font-bold mt-1">CAT Excavator + Mobile Pump</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#CBD5E1] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#475569] font-bold">
            <span>{isAr ? "تأمين الصيانة الدورية" : "Scheduled Maintenance"}</span>
            <ShieldCheck className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-[#0F172A] mt-2 font-mono">100% Valid</div>
          <p className="text-[11px] text-slate-500 font-bold mt-1">Next inspection in 10 days</p>
        </div>
      </div>

      {/* Equipment List */}
      <div className="bg-white rounded-2xl border border-[#CBD5E1] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#EEF2F6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="font-extrabold text-base text-[#0F172A]">
            {isAr ? "مصفوفة المعدات والآليات عبر مشروعات الشركة" : "Cross-Project Machinery Fleet Matrix"}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#475569]">{isAr ? "تصفية الموقع:" : "Filter Site:"}</span>
            <select 
              value={filterSite}
              onChange={(e) => setFilterSite(e.target.value)}
              className="text-xs font-bold px-3 py-1.5 border border-[#CBD5E1] rounded-lg bg-[#EEF2F6]"
            >
              <option value="ALL">{isAr ? "كافة مواقع الشركة" : "All Projects"}</option>
              <option value="PRJ-001">Al-Mansoura Complex</option>
              <option value="PRJ-002">New Capital Tower</option>
              <option value="PRJ-003">Alexandria Waterfront</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
          {filteredEquipment.map(eq => (
            <div 
              key={eq.id}
              className="p-5 rounded-xl border border-[#CBD5E1] bg-white hover:border-[#E85312] transition-all space-y-3.5 shadow-2xs"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#EEF2F6] border border-[#CBD5E1] flex items-center justify-center shrink-0">
                    <Truck className="w-6 h-6 text-[#E85312]" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-[#0F172A]">{isAr ? eq.nameAr : eq.name}</h4>
                    <span className="text-xs text-[#64748B] font-mono">{eq.code} • {isAr ? eq.categoryAr : eq.category}</span>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${eq.statusClass}`}>
                  {isAr ? eq.statusAr : eq.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 py-2 border-y border-[#EEF2F6] text-xs">
                <div>
                  <span className="text-[#64748B] block text-[11px]">{isAr ? "الموقع الحالي" : "Current Site"}</span>
                  <strong className="text-[#0F172A] font-bold truncate block">{eq.currentSite.split(' ')[0]}</strong>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[11px]">{isAr ? "نسبة التشغيل" : "Utilization"}</span>
                  <strong className="text-emerald-700 font-mono font-bold">{eq.utilizationPct}%</strong>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[11px]">{isAr ? "ساعات العمل" : "Operating"}</span>
                  <strong className="text-[#0F172A] font-mono font-bold">{eq.operatingHours}</strong>
                </div>
              </div>

              {/* AI Recommendation Pill */}
              <div className="p-3 bg-orange-50/70 border border-orange-200/80 rounded-xl text-xs text-[#0F172A] leading-relaxed">
                <div className="flex items-center gap-1.5 text-[#E85312] font-bold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isAr ? "توصية إعادة التوزيع بالذكاء الاصطناعي (AI Reallocation):" : "AI Reallocation Opportunity:"}</span>
                </div>
                <p className="text-xs text-[#334155]">{isAr ? eq.aiRecommendation : eq.aiRecommendationEn}</p>
              </div>

              <div className="flex items-center justify-end pt-1">
                <button
                  onClick={() => handleReallocate(eq)}
                  className="px-4 py-2 rounded-lg bg-[#E85312] hover:bg-[#CC490F] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span>{isAr ? "طلب نقل المعدة لمشروع شقيق" : "Request Inter-Site Transfer"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reallocation Modal */}
      {reallocateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="p-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">
                  {isAr ? "تأكيد نقل المعدة لمشروع شقيق" : "Dispatch Equipment Transfer"}
                </h3>
                <p className="text-xs text-slate-500">
                  {reallocateModal.name}
                </p>
              </div>
              <button onClick={() => setReallocateModal(null)}>✕</button>
            </div>

            <form onSubmit={confirmReallocation} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {isAr ? "الموقع المستهدف للاستلام" : "Target Destination Project"}
                </label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-xs font-bold">
                  <option value="PRJ-001">Al-Mansoura Residential Complex (Sector B4)</option>
                  <option value="PRJ-002">New Capital Business Tower</option>
                  <option value="PRJ-003">Alexandria Waterfront Heights</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {isAr ? "تاريخ بدء التشغيل المطلوب" : "Required Deployment Date"}
                </label>
                <input 
                  type="date" 
                  defaultValue="2026-10-26"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-xs font-bold"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs">
                <strong>{isAr ? "الوفورات المالية المقدرة:" : "Estimated Savings:"}</strong> {isAr ? "توفير 18,000 دولار شهرياً بتجنب استئجار ونش خارجي." : "Avoids $18,000 monthly external crane rental fee."}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                {isAr ? "تأكيد أمر النقل اللوجستي" : "Confirm Mobilization Dispatch"}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
