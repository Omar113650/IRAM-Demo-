import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Tag, 
  TrendingUp, 
  Coins, 
  ShieldCheck, 
  ExternalLink, 
  Sparkles, 
  Building2, 
  CheckCircle2, 
  MapPin, 
  Calendar,
  ArrowRight,
  ArrowLeft,
  Truck
} from 'lucide-react';

export default function MarketplaceView({ onBack, language }) {
  const isAr = language === 'ar';
  const BackIcon = isAr ? ArrowRight : ArrowLeft;

  const [activeTab, setActiveTab] = useState('marketplace'); // 'marketplace' | 'listings' | 'bids'
  const [inquireModal, setInquireModal] = useState(null);
  const [successToast, setSuccessToast] = useState(null);

  // Surplus items offered for external resale or supplier buyback
  const [marketplaceItems, setMarketplaceItems] = useState([
    {
      id: "MKT-01",
      title: "Surplus Off-Cut High Tensile Rebar Bundles (Grade 60)",
      titleAr: "فائض حزم حديد تسليح مقصوص عالي الإجهاد (أطوال 6-9 متر)",
      quantity: "40 Tons",
      sellerProject: "New Capital Business Tower",
      location: "New Capital CBD Staging Bay",
      originalValue: "$37,600",
      askPrice: "$31,200 (17% Discount)",
      recoveryPotential: "+$31,200 Cash Inflow",
      condition: "Bundled, Mill Certified MTC Attached",
      category: "Steel & Rebar",
      verifiedContractorBuyers: 4,
      image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "MKT-02",
      title: "Leftover Premium Porcelain Polished Floor Tiles 60x60",
      titleAr: "بواقي سيراميك وبورسلين أرضيات فرز أول نخب ممتاز (كراتين سليمة)",
      quantity: "650 m²",
      sellerProject: "Alexandria Waterfront Heights",
      location: "San Stefano Warehouse Racks",
      originalValue: "$11,700",
      askPrice: "$8,900 (24% Bulk Discount)",
      recoveryPotential: "+$8,900 Cash Inflow",
      condition: "Original Factory Crates, Sealed",
      category: "Finishing & Ceramics",
      verifiedContractorBuyers: 7,
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "MKT-03",
      title: "Unopened Sulfate Resistant Cement (CEM I 42.5N)",
      titleAr: "أسمنت بورتلاندي مقاوم للكبريتات فائض (صلاحية 90 يوماً)",
      quantity: "350 Bags (17.5 Tons)",
      sellerProject: "Al-Mansoura Residential Complex",
      location: "New Mansoura Bay 3",
      originalValue: "$2,850",
      askPrice: "$2,300",
      recoveryPotential: "+$2,300 Cash Inflow",
      condition: "Palletized & Shrink-Wrapped",
      category: "Cement & Binders",
      verifiedContractorBuyers: 2,
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&auto=format&fit=crop&q=80"
    }
  ]);

  const handleInquire = (item) => {
    setInquireModal(item);
  };

  const submitInquiry = (e) => {
    e.preventDefault();
    setSuccessToast(isAr 
      ? `تم إرسال طلب الشراء / الاسترداد لعرض ${inquireModal.titleAr} لشبكة المشترين المعتمدين!`
      : `Offer inquiry dispatched to verified marketplace buyers!`);
    setInquireModal(null);
    setTimeout(() => setSuccessToast(null), 4000);
  };

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
      {successToast && (
        <div className="p-4 bg-emerald-600 text-white rounded-2xl shadow-xl text-xs font-bold flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast(null)}>✕</button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-[#CBD5E1] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-[#0F172A]">
              {isAr ? "سوق تصريف الفائض واسترداد القيمة (Surplus Value Recovery Marketplace)" : "Surplus External Value Recovery & Marketplace"}
            </h1>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-black uppercase border border-emerald-300">
              IRAM Roadmap Section 08
            </span>
          </div>
          <p className="text-xs text-[#475569] mt-1 max-w-3xl leading-relaxed">
            {isAr
              ? "المواد الفائضة التي يتعذر نقلها أو استخدامها داخلياً بالمشاريع الشقيقة يتم طرحها في سوق آمن لشبكة المقاولين المعتمدين أو ردها للمصنع لاسترداد السيولة النقدية ومنع الهدر التام."
              : "Surplus materials that cannot be reused internally are offered through a controlled B2B marketplace to peer contractors and recycling mills to recover working capital."}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <div className="text-right">
            <span className="text-[10px] text-[#64748B] block uppercase font-bold">{isAr ? "سيولة مستردة محتملة" : "Recoverable Capital"}</span>
            <span className="text-2xl font-black text-emerald-700 font-mono">+$42,400</span>
          </div>
        </div>
      </div>

      {/* Marketplace Listings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {marketplaceItems.map(item => (
          <div 
            key={item.id}
            className="bg-white rounded-2xl border border-[#CBD5E1] hover:border-[#E85312] transition-all p-5 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-md bg-[#EEF2F6] text-[#0F172A] text-[11px] font-mono font-bold">
                  {item.id} • {item.category}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {item.verifiedContractorBuyers} {isAr ? "مشترين مهتمين" : "Buyers"}
                </span>
              </div>

              <h3 className="font-extrabold text-base text-[#0F172A] leading-snug">
                {isAr ? item.titleAr : item.title}
              </h3>

              <div className="mt-3 space-y-1.5 text-xs text-[#475569]">
                <div className="flex justify-between">
                  <span>{isAr ? "الكمية المتاحة:" : "Available Quantity:"}</span>
                  <strong className="text-[#0F172A]">{item.quantity}</strong>
                </div>
                <div className="flex justify-between">
                  <span>{isAr ? "المشروع المصدر:" : "Seller Project:"}</span>
                  <span className="text-[#0F172A] font-medium">{item.sellerProject.split(' ')[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isAr ? "الحالة الفنية:" : "Condition:"}</span>
                  <span className="text-[#0F172A] font-medium">{item.condition}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-emerald-800 uppercase block font-bold">{isAr ? "سعر البيع المقترح" : "Ask Price"}</span>
                    <strong className="text-base font-black text-emerald-900 font-mono">{item.askPrice}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 line-through block">{item.originalValue}</span>
                    <span className="text-[11px] font-bold text-emerald-700">{item.recoveryPotential}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleInquire(item)}
              className="w-full py-2.5 rounded-xl bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isAr ? "تقديم عرض بيع لشبكة المقاولين" : "Publish to Verified B2B Network"}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Inquiry Modal */}
      {inquireModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="p-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">
                  {isAr ? "طرح الفائض في سوق المقاولين B2B" : "Offer Material to B2B Network"}
                </h3>
                <p className="text-xs text-slate-500">
                  {inquireModal.quantity} • {inquireModal.sellerProject}
                </p>
              </div>
              <button onClick={() => setInquireModal(null)}>✕</button>
            </div>

            <form onSubmit={submitInquiry} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {isAr ? "طريقة استرداد القيمة" : "Liquidity Recovery Method"}
                </label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-xs font-bold">
                  <option>{isAr ? "مزاد مغلق لمقاولي الفئة الأولى المعتمدين" : "Verified Tier-1 Contractor Tender"}</option>
                  <option>{isAr ? "رد للمورد/المصنع مع خصم استرجاع 10%" : "Supplier Return (10% Restocking Fee)"}</option>
                  <option>{isAr ? "بيع مباشر لمصانع إعادة التدوير والدرفلة" : "Direct Sale to Re-Rolling Mills"}</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {isAr ? "الحد الأدنى المقبول للسعر النقدى (USD)" : "Minimum Reserve Price"}
                </label>
                <input 
                  type="text" 
                  defaultValue={inquireModal.askPrice.split(' ')[0]} 
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-xs font-bold font-mono"
                />
              </div>

              <div className="p-3 bg-orange-50 rounded-xl border border-orange-200 text-orange-950 text-xs">
                <strong>{isAr ? "سياسة التحقق:" : "Escrow Policy:"}</strong> {isAr ? "يتم تأكيد شهادات الجودة MTC وفحص الموقع قبل تحصيل الدفعة النقدية لحساب الشركة." : "MTC inspection and physical yard audit mandatory prior to fund release."}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                {isAr ? "تأكيد النشر وفتح المزايدة للمقاولين" : "Publish & Collect Buyer Bids"}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
