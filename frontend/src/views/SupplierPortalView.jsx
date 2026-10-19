import React, { useState } from 'react';
import { 
  Users, 
  ShoppingBag, 
  Send, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Star,
  Award,
  Sparkles,
  MessageSquare,
  AlertCircle,
  Truck,
  Check,
  Building2,
  Calendar,
  DollarSign,
  Download,
  Filter,
  Search,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  Globe,
  LogOut,
  Layers,
  ChevronRight,
  Printer
} from 'lucide-react';
import IramLogo from '../components/IramLogo';

export default function SupplierPortalView({ 
  language, 
  onLanguageToggle, 
  onSwitchToCompany, 
  onLogout,
  onOpenAssistant 
}) {
  const isAr = language === 'ar';
  
  // Navigation tabs: 'rfqs' (incoming requests) | 'bids' (my quotations) | 'pos' (awarded purchase orders) | 'profile' (supplier profile)
  const [activeTab, setActiveTab] = useState('rfqs');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Open RFQs sent by contractors to this supplier network
  const [openRfqs, setOpenRfqs] = useState([
    {
      id: "RFQ-0088",
      contractor: "El-Sewedy Construction & Contracting",
      contractorAr: "شركة السويدي للتطوير والمقاولات",
      project: "Al-Mansoura Residential Complex",
      projectAr: "كمبوند المنصورة السكني (Sector B4)",
      category: "steel",
      material: "High Tensile Steel Rebar 16mm (Grade 60)",
      materialAr: "حديد تسليح عالي المقاومة 16 مم (مشرشر Grade 60)",
      quantity: "50 Tons",
      deliveryTargetDate: "Nov 02, 2026",
      deliveryLocation: "New Mansoura Site - Staging Bay 4",
      deadline: "Oct 26, 2026",
      milestone: "Critical Slab Pour (سقف الدور الأرضي)",
      status: "Open for Verified Steel Mills",
      statusAr: "مفتوح للمصانع وموزعي الحديد المعتمدين",
      estimatedBudget: "$46,000",
      urgency: "high"
    },
    {
      id: "RFQ-0092",
      contractor: "The Arab Contractors (Osman Ahmed Osman)",
      contractorAr: "شركة المقاولون العرب",
      project: "New Capital Business Tower",
      projectAr: "برج الأعمال - العاصمة الإدارية (CBD Plot 12)",
      category: "steel",
      material: "High Tensile Steel Rebar 12mm & 10mm",
      materialAr: "حديد تسليح 12 مم و 10 مم عالي الإجهاد",
      quantity: "120 Tons",
      deliveryTargetDate: "Nov 05, 2026",
      deliveryLocation: "CBD Sector - Bay 2",
      deadline: "Oct 28, 2026",
      milestone: "Core Wall Reinforcement",
      status: "Open for Verified Steel Mills",
      statusAr: "مفتوح لتقديم العروض الفنية",
      estimatedBudget: "$110,400",
      urgency: "medium"
    },
    {
      id: "RFQ-0095",
      contractor: "Orascom Construction",
      contractorAr: "أوراسكوم للإنشاءات",
      project: "Alexandria Waterfront Heights",
      projectAr: "أبراج كورنيش الإسكندرية (San Stefano)",
      category: "cement",
      material: "Sulfate Resistant Portland Cement 42.5N (CEM I)",
      materialAr: "أسمنت بورتلاندي مقاوم للكبريتات 42.5N (شيكارة 50كجم)",
      quantity: "800 Bags (40 Tons)",
      deliveryTargetDate: "Oct 29, 2026",
      deliveryLocation: "Alexandria Corniche Site - Bay 1",
      deadline: "Oct 25, 2026",
      milestone: "Basement Waterproof Retaining Wall",
      status: "Open for Cement Producers",
      statusAr: "مفتوح لمصانع وموزعي الأسمنت",
      estimatedBudget: "$5,200",
      urgency: "high"
    },
    {
      id: "RFQ-0101",
      contractor: "Al-Bayan Contracting & Engineering",
      contractorAr: "شركة البيان للهندسة والمقاولات",
      project: "Sadat City Industrial Logistics Park",
      projectAr: "مجمع المخازن واللوجستيات بمدينة السادات",
      category: "infrastructure",
      material: "Ductile Iron Infrastructure Pipes 300mm",
      materialAr: "مواسير حديد زهر مرن (Ductile Iron) قطر 300 مم",
      quantity: "350 Linear Meters",
      deliveryTargetDate: "Nov 10, 2026",
      deliveryLocation: "Sadat Logistics Yard B",
      deadline: "Nov 01, 2026",
      milestone: "Main Water Network Infrastructure",
      status: "Open for Verified Pipe Suppliers",
      statusAr: "مفتوح لموردي البنية التحتية",
      estimatedBudget: "$38,000",
      urgency: "low"
    }
  ]);

  // Bids submitted by supplier with Contractor Replies / Decision
  const [myBids, setMyBids] = useState([
    {
      id: "QT-8101",
      rfqId: "RFQ-0081",
      contractor: "El-Sewedy Construction & Contracting",
      contractorAr: "شركة السويدي للتطوير والمقاولات",
      project: "Alexandria Waterfront Heights",
      projectAr: "أبراج كورنيش الإسكندرية",
      material: "Portland Cement 42.5N (CEM I)",
      materialAr: "أسمنت بورتلاندي 42.5N (CEM I)",
      quantity: "600 Bags (50kg)",
      unitPrice: "$6.45 / Bag",
      deliveryCost: "$180",
      totalPrice: "$4,050",
      leadTime: "2 Days (Delivered Oct 28)",
      status: "Accepted - PO Issued",
      statusAr: "تم القبول وترسية أمر الشراء الرسمي 🏆",
      statusClass: "bg-emerald-50 text-emerald-800 border-emerald-300",
      contractorDecision: "ACCEPTED",
      contractorFeedback: "تهانينا! تم اختيار عرضكم كأفضل عرض فني ومالي واصل للموقع بناءً على تقييم الذكاء الاصطناعي ومجلس المشتريات. تم إصدار أمر الشراء الرسمي PO-0043 وتثبيت موعد التوريد.",
      awardedPO: "PO-0043",
      respondedAt: "اليوم الساعة 2:10 م",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "QT-8401",
      rfqId: "RFQ-0084",
      contractor: "El-Sewedy Construction & Contracting",
      contractorAr: "شركة السويدي للتطوير والمقاولات",
      project: "New Capital Business Tower",
      projectAr: "برج الأعمال - العاصمة الإدارية",
      material: "High Tensile Steel Rebar 12mm",
      materialAr: "حديد تسليح 12 مم عالي الإجهاد",
      quantity: "80 Tons",
      unitPrice: "$920 / Ton",
      deliveryCost: "$1,200",
      totalPrice: "$74,800",
      leadTime: "3 Days",
      status: "Under Technical AI Evaluation",
      statusAr: "قيد التقييم الفني والذكاء الاصطناعي (94.2% Score)",
      statusClass: "bg-amber-50 text-amber-800 border-amber-300",
      contractorDecision: "PENDING",
      contractorFeedback: "تم استلام العرض وهو قيد المراجعة الفنية لمطابقة شهادة الفحص المعملي MTC مع كود المشروع بواسطة مسؤول المشتريات.",
      awardedPO: null,
      respondedAt: "أمس",
      image: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?w=150&auto=format&fit=crop&q=80"
    }
  ]);

  // Awarded Purchase Orders
  const [awardedOrders] = useState([
    {
      id: "PO-0043",
      quoteId: "QT-8101",
      contractor: "El-Sewedy Construction & Contracting",
      contractorAr: "شركة السويدي للتطوير والمقاولات",
      project: "Alexandria Waterfront Heights",
      projectAr: "أبراج كورنيش الإسكندرية (San Stefano)",
      material: "Portland Cement 42.5N (CEM I)",
      materialAr: "أسمنت بورتلاندي 42.5N (CEM I)",
      quantity: "600 Bags (50kg)",
      totalAmount: "$4,050",
      paymentTerms: "Net 30 Days Credit (آجل 30 يوماً)",
      deliveryTargetDate: "Oct 28, 2026",
      status: "Ready for Dispatch",
      statusAr: "جاهز للتسليم والشحن الميداني",
      siteContact: "Eng. Rami Fawzy (+20 10 9876 5432)"
    },
    {
      id: "PO-0039",
      quoteId: "QT-7720",
      contractor: "El-Sewedy Construction & Contracting",
      contractorAr: "شركة السويدي للتطوير والمقاولات",
      project: "New Capital Business Tower",
      projectAr: "برج الأعمال - العاصمة الإدارية",
      material: "High Tensile Steel Rebar 16mm",
      materialAr: "حديد تسليح عالي المقاومة 16 مم",
      quantity: "50 Tons",
      totalAmount: "$48,200",
      paymentTerms: "50% Advance / 50% on Site Delivery",
      deliveryTargetDate: "Oct 15, 2026",
      status: "Completed & Reconciled",
      statusAr: "تم التوريد ومطابقة إذن الاستلام عبر OCR",
      siteContact: "Eng. Mostafa Salem (+20 12 3456 7890)"
    }
  ]);

  // Proposal Form Modal States
  const [showBidModal, setShowBidModal] = useState(false);
  const [activeRfqForBid, setActiveRfqForBid] = useState(null);
  
  const [unitPrice, setUnitPrice] = useState('920');
  const [deliveryCost, setDeliveryCost] = useState('1000');
  const [leadTimeDays, setLeadTimeDays] = useState('2');
  const [dailyCapacity, setDailyCapacity] = useState('25 Tons / Day');
  const [materialStandard, setMaterialStandard] = useState('ASTM A615 Grade 60 (High Tensile Deformed Bars)');
  const [millOrigin, setMillOrigin] = useState('Ezz Flat & Long Steel Rolling Mills (Ain Sokhna)');
  const [hasMillTestCert, setHasMillTestCert] = useState(true);
  const [unloadingIncluded, setUnloadingIncluded] = useState(true);
  const [paymentTerms, setPaymentTerms] = useState('Net 30 Days Credit (Deferred Payment)');
  const [validityDays, setValidityDays] = useState('14');
  const [warrantyTerms, setWarrantyTerms] = useState('Official Factory Replacement Guarantee if elongation or yield fails consultant tests');
  const [supplierRemarks, setSupplierRemarks] = useState('Stock ready in staging yard for immediate dispatch upon PO signing to strictly meet your concrete pouring milestone.');
  
  const [bidSuccessMessage, setBidSuccessMessage] = useState(null);
  const [viewPoModal, setViewPoModal] = useState(null);

  // Open the detailed quotation modal for a specific RFQ
  const handleOpenBid = (rfq) => {
    setActiveRfqForBid(rfq);
    setBidSuccessMessage(null);
    if (rfq.category === 'cement') {
      setUnitPrice('6.5');
      setDeliveryCost('200');
      setMaterialStandard('EN 197-1 CEM I 42.5N (Sulfate Resistant)');
      setMillOrigin('Suez Cement Industrial Plant (Ain Sokhna)');
    } else if (rfq.category === 'infrastructure') {
      setUnitPrice('110');
      setDeliveryCost('800');
      setMaterialStandard('ISO 2531 / EN 545 Ductile Iron Class C40');
      setMillOrigin('Egyptian German Industrial Pipes Co.');
    } else {
      setUnitPrice('920');
      setDeliveryCost('1000');
      setMaterialStandard('ASTM A615 Grade 60 (High Tensile Deformed Bars)');
      setMillOrigin('Ezz Flat & Long Steel Rolling Mills (Ain Sokhna)');
    }
    setShowBidModal(true);
  };

  // Submit quotation to contractor
  const handleSubmitBid = (e) => {
    e.preventDefault();
    const qtyNum = parseInt(activeRfqForBid.quantity) || 50;
    const baseTotal = Number(unitPrice) * qtyNum;
    const totalWithFreight = baseTotal + Number(deliveryCost);

    const newBidItem = {
      id: `QT-${Date.now().toString().slice(-4)}`,
      rfqId: activeRfqForBid.id,
      contractor: activeRfqForBid.contractor,
      contractorAr: activeRfqForBid.contractorAr,
      project: activeRfqForBid.project,
      projectAr: activeRfqForBid.projectAr,
      material: activeRfqForBid.material,
      materialAr: activeRfqForBid.materialAr,
      quantity: activeRfqForBid.quantity,
      unitPrice: `$${unitPrice} / Unit`,
      deliveryCost: `$${Number(deliveryCost).toLocaleString()}`,
      totalPrice: `$${totalWithFreight.toLocaleString()}`,
      leadTime: `${leadTimeDays} Days (Delivery: Nov 01)`,
      standard: materialStandard,
      mill: millOrigin,
      paymentTerms: paymentTerms,
      hasCert: hasMillTestCert,
      status: "Under AI Evaluation by Contractor",
      statusAr: "تم الإرسال بنجاح • قيد تقييم الـ AI والمشتريات",
      statusClass: "bg-blue-50 text-blue-800 border-blue-300",
      contractorDecision: "SUBMITTED",
      contractorFeedback: "تم تسجيل عرضكم رسمياً في مصفوفة المقارنة الفنية والمالية للذكاء الاصطناعي لدى شركة المقاولات. سيتم إشعاركم بقرار الترسية فوراً.",
      awardedPO: null,
      respondedAt: isAr ? "الآن" : "Just now",
      image: activeRfqForBid.category === 'cement' 
        ? "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=150&auto=format&fit=crop&q=80"
        : "https://images.unsplash.com/photo-1535813547-99c456a41d4a?w=150&auto=format&fit=crop&q=80"
    };

    setMyBids([newBidItem, ...myBids]);
    setBidSuccessMessage(isAr 
      ? "تم إرسال العرض التفصيلي بنجاح! تم إشعار صاحب الشركة ومسؤول المشتريات بمقارنة الـ AI فورياً."
      : "Quotation submitted successfully! Contractor admin and procurement board notified.");
    
    setTimeout(() => {
      setShowBidModal(false);
      setBidSuccessMessage(null);
      setActiveTab('bids'); // Take supplier directly to "My Bids" so they see it live!
    }, 1500);
  };

  // Filtered RFQs
  const filteredRfqs = openRfqs.filter(rfq => {
    const matchCat = categoryFilter === 'all' || rfq.category === categoryFilter;
    const matchSearch = (rfq.material + rfq.contractor + rfq.project + rfq.materialAr + rfq.contractorAr)
      .toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className={`min-h-screen bg-[#EEF2F6] flex flex-col text-[#0F172A] ${isAr ? 'font-arabic' : 'font-sans'}`}>
      
      {/* ============================================================== */}
      {/* 1. DEDICATED STANDALONE SUPPLIER NAVBAR */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#CBD5E1] shadow-xs">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Brand & Supplier Identity */}
          <div className="flex items-center gap-3">
            <button
              onClick={onLogout}
              className="cursor-pointer group focus:outline-hidden"
              title={isAr ? "العودة إلى الصفحة الرئيسية للموقع" : "Return to Home Page"}
            >
              <IramLogo className="h-9 w-auto group-hover:opacity-90 transition-opacity" variant="light" />
            </button>
            <div className="h-6 w-px bg-[#CBD5E1] hidden sm:block"></div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-tight text-[#0F172A]">
                  {isAr ? "بوابة مجتمع الموردين ومصانع مواد البناء" : "IRAM Supplier Community & Contracting Board"}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-[10px] font-black uppercase flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Verified Partner Tier-1</span>
                </span>
              </div>
              <p className="text-[11px] text-[#475569] font-medium hidden sm:block">
                {isAr ? "منظومة مستقلة لتلقي طلبات عروض الأسعار (RFQs)، تقديم العروض التنافسية، واستلام أوامر الشراء الرسمية" : "Independent vendor workstation for contractor RFQs and PO awards"}
              </p>
            </div>
          </div>

          {/* Supplier Profile Badge & Top Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* AI Assistant Quick Trigger */}
            {onOpenAssistant && (
              <button 
                onClick={onOpenAssistant}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-[#E85312] hover:bg-[#CC490F] text-white shadow-xs transition-all cursor-pointer"
                title="AI Material Sourcing Assistant"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{isAr ? "مساعد الـ AI" : "AI Assistant"}</span>
              </button>
            )}

            {/* Language Toggle */}
            {onLanguageToggle && (
              <button 
                onClick={onLanguageToggle}
                className="px-3 py-2 text-xs font-bold text-[#334155] hover:bg-[#EEF2F6] border border-[#CBD5E1] rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                title="Toggle Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#64748B]" />
                <span className="uppercase text-[11px]">{language}</span>
              </button>
            )}

            {/* Prominent Quick-Switch Button: Return to Contractor Owner */}
            {onSwitchToCompany && (
              <button 
                onClick={onSwitchToCompany}
                className="px-3.5 py-2 rounded-lg bg-orange-50 hover:bg-orange-100 border border-[#E85312]/30 text-[#E85312] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                title={isAr ? "التبديل إلى حساب صاحب شركة المقاولات" : "Switch to Contractor Owner Workspace"}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isAr ? "الانتقال لحساب صاحب الشركة" : "Contractor Admin"}</span>
              </button>
            )}

            {/* Logout / Exit to Public Site */}
            {onLogout && (
              <button 
                onClick={onLogout}
                className="p-2 sm:px-3 sm:py-2 rounded-lg border border-[#CBD5E1] hover:bg-rose-50 hover:border-rose-300 text-rose-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                title={isAr ? "تسجيل الخروج والعودة للرئيسية" : "Sign Out"}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isAr ? "خروج" : "Sign Out"}</span>
              </button>
            )}

          </div>

        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. SUPPLIER COMMAND CENTER HERO & LIVE KPIS */}
      {/* ============================================================== */}
      <div className="bg-white border-b border-[#CBD5E1] py-5 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1720px] mx-auto">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#EEF2F6]">
            
            {/* Registered Supplier Profile Chip */}
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center font-black text-lg shadow-md border-2 border-amber-400">
                EZ
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-black text-[#0F172A]">
                    {isAr ? "مصانع حديد عز (Ezz Steel Mills Egypt)" : "Ezz Steel Mills Egypt"}
                  </h1>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold border border-amber-300 font-mono">
                    ID: VND-2026-EZ
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#475569] mt-1 font-medium">
                  <span className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>4.9 / 5.0 Partner Rating</span>
                  </span>
                  <span>•</span>
                  <span>{isAr ? "المقر: العين السخنة والإسكندرية" : "Ain Sokhna & Alexandria Plants"}</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-bold">✓ ASTM A615 & ES 262 Certified</span>
                </div>
              </div>
            </div>

            {/* Live Supplier Metric Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div 
                onClick={() => setActiveTab('rfqs')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  activeTab === 'rfqs' ? 'bg-[#FEECE5] border-[#E85312] shadow-xs' : 'bg-[#EEF2F6] border-[#CBD5E1] hover:border-slate-400'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-[#475569]">
                  <span>{isAr ? "طلبات واردة" : "Incoming RFQs"}</span>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#E85312]" />
                </div>
                <div className="text-2xl font-black text-[#0F172A] font-mono mt-1">
                  {openRfqs.length} <span className="text-xs font-normal text-emerald-600 font-sans font-bold">{isAr ? "جديد" : "New"}</span>
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('bids')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  activeTab === 'bids' ? 'bg-[#FEECE5] border-[#E85312] shadow-xs' : 'bg-[#EEF2F6] border-[#CBD5E1] hover:border-slate-400'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-[#475569]">
                  <span>{isAr ? "عروضي النشطة" : "My Active Bids"}</span>
                  <MessageSquare className="w-3.5 h-3.5 text-[#E85312]" />
                </div>
                <div className="text-2xl font-black text-[#0F172A] font-mono mt-1">
                  {myBids.length}
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('pos')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  activeTab === 'pos' ? 'bg-[#FEECE5] border-[#E85312] shadow-xs' : 'bg-[#EEF2F6] border-[#CBD5E1] hover:border-slate-400'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-[#475569]">
                  <span>{isAr ? "أوامر الشراء POs" : "Awarded POs"}</span>
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div className="text-2xl font-black text-emerald-700 font-mono mt-1">
                  {awardedOrders.length}
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('profile')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  activeTab === 'profile' ? 'bg-[#FEECE5] border-[#E85312] shadow-xs' : 'bg-[#EEF2F6] border-[#CBD5E1] hover:border-slate-400'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-[#475569]">
                  <span>{isAr ? "نسبة الفوز بالعقود" : "Win Rate"}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div className="text-2xl font-black text-[#0F172A] font-mono mt-1">
                  72%
                </div>
              </div>
            </div>

          </div>

          {/* Primary Navigation Tabs */}
          <div className="flex items-center gap-2 pt-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab('rfqs')}
              className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'rfqs'
                  ? 'bg-[#E85312] text-white shadow-xs font-bold'
                  : 'bg-[#EEF2F6] hover:bg-[#E2E8F0] text-[#334155] border border-[#CBD5E1]'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isAr ? "طلبات التوريد والمناقصات الواردة من المقاولين" : "Incoming Contractor Demands & RFQs"}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold ${
                activeTab === 'rfqs' ? 'bg-white/20 text-white' : 'bg-white text-[#E85312] border border-[#CBD5E1]'
              }`}>
                {openRfqs.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('bids')}
              className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'bids'
                  ? 'bg-[#E85312] text-white shadow-xs font-bold'
                  : 'bg-[#EEF2F6] hover:bg-[#E2E8F0] text-[#334155] border border-[#CBD5E1]'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isAr ? "عروضي المقدمة وقرارات وردود الشركات" : "My Quotations & Contractor Decisions"}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold ${
                activeTab === 'bids' ? 'bg-white/20 text-white' : 'bg-white text-[#0F172A] border border-[#CBD5E1]'
              }`}>
                {myBids.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('pos')}
              className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'pos'
                  ? 'bg-[#E85312] text-white shadow-xs font-bold'
                  : 'bg-[#EEF2F6] hover:bg-[#E2E8F0] text-[#334155] border border-[#CBD5E1]'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>{isAr ? "أوامر الشراء المعتمدة والتسليم الميداني (POs)" : "Awarded POs & Deliveries"}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold ${
                activeTab === 'pos' ? 'bg-white/20 text-white' : 'bg-white text-emerald-700 border border-[#CBD5E1]'
              }`}>
                {awardedOrders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-[#E85312] text-white shadow-xs font-bold'
                  : 'bg-[#EEF2F6] hover:bg-[#E2E8F0] text-[#334155] border border-[#CBD5E1]'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isAr ? "ملف واعتمادات المصنع والمستندات" : "Supplier Profile & Accreditation"}</span>
            </button>
          </div>

        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. MAIN WORKSPACE CONTAINER */}
      {/* ============================================================== */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1720px] w-full mx-auto pb-16">
        
        {/* ============================================================ */}
        {/* TAB 1: INCOMING RFQS & DEMANDS FROM CONTRACTORS */}
        {/* ============================================================ */}
        {activeTab === 'rfqs' && (
          <div className="space-y-6">
            
            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-[#CBD5E1] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-[#64748B] font-bold text-xs flex items-center gap-1 mr-1">
                  <Filter className="w-3.5 h-3.5" />
                  <span>{isAr ? "تصنيف المواد:" : "Category:"}</span>
                </span>
                
                {[
                  { id: 'all', labelAr: 'الكل (جميع المناقصات)', labelEn: 'All Demands' },
                  { id: 'steel', labelAr: 'حديد تسليح وصلب', labelEn: 'Structural Steel & Rebar' },
                  { id: 'cement', labelAr: 'أسمنت وخرسانة جاهزة', labelEn: 'Cement & Concrete' },
                  { id: 'infrastructure', labelAr: 'مواسير وبنية تحتية', labelEn: 'Infrastructure Pipes' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                      categoryFilter === cat.id
                        ? 'bg-[#0F172A] text-white'
                        : 'bg-[#EEF2F6] text-[#334155] hover:bg-[#E2E8F0] border border-[#CBD5E1]'
                    }`}
                  >
                    {isAr ? cat.labelAr : cat.labelEn}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isAr ? "بحث في المناقصات، كود RFQ، المشروع..." : "Search RFQ, contractor, project..."}
                  className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-[#EEF2F6] border border-[#CBD5E1] rounded-lg text-[#0F172A] placeholder-[#64748B] focus:bg-white focus:outline-hidden focus:border-[#E85312]"
                />
              </div>

            </div>

            {/* List of Incoming Contractor RFQs */}
            <div className="grid grid-cols-1 gap-4">
              {filteredRfqs.map(rfq => (
                <div 
                  key={rfq.id}
                  className="bg-white rounded-2xl border border-[#CBD5E1] p-6 shadow-xs hover:border-[#E85312] transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  {/* Left Column: Demand Details */}
                  <div className="space-y-3 flex-1">
                    
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-[#FEECE5] text-[#E85312] border border-[#E85312]/20">
                        {rfq.id}
                      </span>
                      <h3 className="font-black text-lg text-[#0F172A]">
                        {isAr ? rfq.materialAr : rfq.material}
                      </h3>
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-slate-900 text-white">
                        {rfq.quantity}
                      </span>
                      {rfq.urgency === 'high' && (
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-rose-600" />
                          <span>{isAr ? "موعد صب حرج" : "Urgent Milestone"}</span>
                        </span>
                      )}
                    </div>

                    {/* Contractor & Location Information */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-[#334155] pt-1 font-medium">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#E85312] shrink-0" />
                        <div>
                          <span className="text-[#64748B] text-[10px] block">{isAr ? "شركة المقاولات:" : "Contractor:"}</span>
                          <strong className="text-[#0F172A]">{isAr ? rfq.contractorAr : rfq.contractor}</strong>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-blue-600 shrink-0" />
                        <div>
                          <span className="text-[#64748B] text-[10px] block">{isAr ? "المشروع وموقع الاستلام:" : "Project & Site:"}</span>
                          <strong className="text-[#0F172A]">{isAr ? rfq.projectAr : rfq.project}</strong>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                        <div>
                          <span className="text-[#64748B] text-[10px] block">{isAr ? "موعد التوريد المستهدف:" : "Required On-Site Date:"}</span>
                          <strong className="text-amber-800 font-mono">{rfq.deliveryTargetDate}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Milestone & Technical Notes */}
                    <div className="p-3 bg-[#EEF2F6] rounded-xl border border-[#CBD5E1] text-xs flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-[#334155]">
                        <Clock className="w-3.5 h-3.5 text-[#E85312]" />
                        <span>{isAr ? "مرحلة النشاط:" : "Milestone Activity:"} <strong>{rfq.milestone}</strong></span>
                        <span className="text-slate-400">•</span>
                        <span>{isAr ? "موقع التشوين:" : "Yard:"} {rfq.deliveryLocation}</span>
                      </div>
                      <div className="text-[11px] text-[#64748B] font-mono">
                        {isAr ? `الميزانية التقديرية المرصودة: ${rfq.estimatedBudget}` : `Target Budget: ${rfq.estimatedBudget}`}
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Proposal Action CTA */}
                  <div className="flex flex-col items-end gap-2.5 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-200">
                    <button
                      onClick={() => handleOpenBid(rfq)}
                      className="w-full lg:w-auto px-6 py-3 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm shadow-[#E85312]/20 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isAr ? "الرد وتقديم عرض سعر تفصيلي" : "Submit Binding Proposal"}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <span className="text-[10px] text-[#64748B] font-mono">
                      {isAr ? `آخر موعد للتقديم: ${rfq.deadline}` : `Submission Deadline: ${rfq.deadline}`}
                    </span>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: MY SUBMITTED QUOTATIONS & CONTRACTOR REPLIES */}
        {/* ============================================================ */}
        {activeTab === 'bids' && (
          <div className="space-y-4">
            
            <div className="p-4 bg-white rounded-2xl border border-[#CBD5E1] flex items-center justify-between text-xs">
              <div>
                <h3 className="font-bold text-[#0F172A]">{isAr ? "سجل العروض المقدمة لشركات المقاولات" : "My Outgoing Quotations & Decisions"}</h3>
                <p className="text-[11px] text-[#475569]">{isAr ? "متابعة قرارات مجالس المشتريات، نتائج تقييم الذكاء الاصطناعي، وأوامر الشراء المعتمدة" : "Live feedback from contractor procurement boards"}</p>
              </div>
              <button 
                onClick={() => setActiveTab('rfqs')}
                className="px-3.5 py-2 rounded-lg bg-[#EEF2F6] hover:bg-[#E2E8F0] border border-[#CBD5E1] text-[#0F172A] font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#E85312]" />
                <span>{isAr ? "تقديم عرض على مناقصة جديدة" : "Bid on New RFQ"}</span>
              </button>
            </div>

            {myBids.map(bid => (
              <div 
                key={bid.id} 
                className={`p-6 rounded-2xl border bg-white shadow-xs transition-all ${
                  bid.contractorDecision === 'ACCEPTED' ? 'border-emerald-400 ring-2 ring-emerald-300/30' : 'border-[#CBD5E1]'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  
                  <div className="flex-1 space-y-3">
                    
                    {/* Header info */}
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-2xl border border-[#CBD5E1] overflow-hidden shrink-0 shadow-2xs mt-0.5 relative flex items-center justify-center bg-slate-900 select-none">
                        {bid.material.toLowerCase().includes('steel') ? (
                          <svg className="w-full h-full p-2.5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="48" height="48" rx="8" fill="#0F172A" />
                            <rect x="8" y="12" width="32" height="6" rx="3" fill="#64748B" />
                            <line x1="12" y1="12" x2="16" y2="18" stroke="#E85312" strokeWidth="1.5" />
                            <line x1="22" y1="12" x2="26" y2="18" stroke="#E85312" strokeWidth="1.5" />
                            <rect x="8" y="24" width="32" height="6" rx="3" fill="#94A3B8" />
                            <line x1="12" y1="24" x2="16" y2="30" stroke="#E85312" strokeWidth="1.5" />
                            <line x1="22" y1="24" x2="26" y2="30" stroke="#E85312" strokeWidth="1.5" />
                          </svg>
                        ) : (
                          <svg className="w-full h-full p-2.5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="48" height="48" rx="8" fill="#1E293B" />
                            <rect x="12" y="10" width="24" height="28" rx="4" fill="#E85312" />
                            <rect x="16" y="18" width="16" height="12" fill="#FFFFFF" rx="2" />
                            <text x="18" y="27" fill="#E85312" fontSize="7" fontWeight="bold" fontFamily="sans-serif">CEM I</text>
                          </svg>
                        )}
                        {bid.image && (
                          <img 
                            src={bid.image} 
                            alt="" 
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        )}
                      </div>

                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-[#EEF2F6] text-[#0F172A] border border-[#CBD5E1]">
                            {bid.id}
                          </span>
                          <span className="font-mono text-xs font-bold text-[#E85312]">
                            ({bid.rfqId})
                          </span>
                          <h3 className="font-black text-base text-[#0F172A]">
                            {isAr ? bid.materialAr : bid.material} ({bid.quantity})
                          </h3>
                          <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${bid.statusClass}`}>
                            {isAr ? bid.statusAr : bid.status}
                          </span>
                        </div>

                        <div className="text-xs text-[#334155] font-medium">
                          {isAr ? "العميل:" : "Client:"} <strong>{isAr ? bid.contractorAr : bid.contractor}</strong> • {isAr ? "المشروع:" : "Project:"} <strong>{isAr ? bid.projectAr : bid.project}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Financial & Landed Breakdown Chips */}
                    <div className="flex flex-wrap gap-4 text-xs font-mono text-[#334155] bg-[#EEF2F6] p-3 rounded-xl border border-[#CBD5E1]">
                      <div>{isAr ? "سعر الوحدة:" : "Unit Price:"} <strong className="text-[#0F172A]">{bid.unitPrice}</strong></div>
                      <div>{isAr ? "تكلفة النقل:" : "Freight:"} <strong className="text-[#0F172A]">{bid.deliveryCost}</strong></div>
                      <div>{isAr ? "الإجمالي الواصل:" : "Total Landed:"} <strong className="text-[#E85312] font-black">{bid.totalPrice}</strong></div>
                      <div>{isAr ? "فترة التوريد:" : "Lead Time:"} <strong className="text-[#0F172A]">{bid.leadTime}</strong></div>
                    </div>

                    {/* Contractor Decision Feedback Quote Box */}
                    <div className="p-3.5 bg-white rounded-xl border border-[#CBD5E1] text-xs">
                      <div className="flex items-center gap-2 font-bold text-[#0F172A] text-[11px] mb-1">
                        <MessageSquare className="w-3.5 h-3.5 text-[#E85312]" />
                        <span>{isAr ? "رد وملاحظات شركة المقاولات الرسمية:" : "Official Contractor Reply & Decision Notes:"}</span>
                        <span className="text-[10px] text-[#64748B] font-normal">({bid.respondedAt})</span>
                      </div>
                      <p className="text-[#334155] font-medium leading-relaxed italic pr-1">
                        "{bid.contractorFeedback}"
                      </p>

                      {bid.awardedPO && (
                        <div className="mt-3 pt-3 border-t border-[#EEF2F6] flex flex-wrap items-center justify-between gap-2">
                          <span className="font-bold text-emerald-800 text-xs flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>{isAr ? "تم إصدار أمر الشراء الرسمي:" : "Official PO Issued:"} <strong className="font-mono">{bid.awardedPO}</strong></span>
                          </span>
                          <button 
                            onClick={() => {
                              const poObj = awardedOrders.find(p => p.id === bid.awardedPO) || awardedOrders[0];
                              setViewPoModal(poObj);
                            }}
                            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>{isAr ? "عرض أمر الشراء الرسمي" : "View Official PO"}</span>
                          </button>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Right side Price Pillar */}
                  <div className="flex flex-col items-end justify-center shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-200">
                    <span className="text-[10px] text-[#64748B] uppercase font-bold tracking-wider">{isAr ? "قيمة عرضكم الواصل" : "Your Landed Offer"}</span>
                    <div className="text-3xl font-black text-[#0F172A] font-mono mt-1">
                      {bid.totalPrice}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: AWARDED PURCHASE ORDERS & DELIVERIES */}
        {/* ============================================================ */}
        {activeTab === 'pos' && (
          <div className="space-y-4">
            
            <div className="p-4 bg-white rounded-2xl border border-[#CBD5E1] flex items-center justify-between text-xs">
              <div>
                <h3 className="font-bold text-[#0F172A]">{isAr ? "أوامر الشراء المعتمدة والتوريدات الميدانية" : "Confirmed Purchase Orders (POs)"}</h3>
                <p className="text-[11px] text-[#475569]">{isAr ? "أوامر التوريد الموقعة من شركات المقاولات لتجهيز الشحنات ومطابقة أذون الاستلام" : "Signed supply contracts ready for dispatch"}</p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                {awardedOrders.length} Confirmed POs
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {awardedOrders.map(po => (
                <div key={po.id} className="bg-white rounded-2xl border border-emerald-300 p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="px-3 py-1 rounded-md bg-emerald-600 text-white font-mono font-black text-xs">
                        {po.id}
                      </span>
                      <span className="text-xs font-mono text-[#64748B]">Ref: {po.quoteId}</span>
                      <h4 className="font-black text-base text-[#0F172A]">{isAr ? po.materialAr : po.material}</h4>
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800">
                        {po.quantity}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {isAr ? po.statusAr : po.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#334155] font-medium pt-1">
                      <div>
                        <span className="text-[10px] text-[#64748B] block">{isAr ? "المقاول الصادر منه:" : "Issued By:"}</span>
                        <strong className="text-[#0F172A]">{isAr ? po.contractorAr : po.contractor}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#64748B] block">{isAr ? "المشروع وجهة التسليم:" : "Delivery Site:"}</span>
                        <strong className="text-[#0F172A]">{isAr ? po.projectAr : po.project}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#64748B] block">{isAr ? "شروط السداد:" : "Payment Terms:"}</span>
                        <strong className="text-[#0F172A]">{po.paymentTerms}</strong>
                      </div>
                    </div>

                    <div className="p-3 bg-[#EEF2F6] rounded-xl border border-[#CBD5E1] text-xs flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-[#334155]">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{isAr ? "تاريخ التوريد المستهدف بالموقع:" : "Target Delivery:"} <strong className="font-mono text-emerald-800">{po.deliveryTargetDate}</strong></span>
                      </div>
                      <div className="text-[11px] text-[#64748B]">
                        {isAr ? "مسؤول الاستلام بالموقع:" : "Site Receiver:"} {po.siteContact}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-[10px] text-[#64748B] uppercase font-bold">{isAr ? "قيمة أمر التوريد الإجمالية" : "Total Contract Value"}</span>
                      <div className="text-2xl font-black text-emerald-700 font-mono">
                        {po.totalAmount}
                      </div>
                    </div>
                    <button
                      onClick={() => setViewPoModal(po)}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>{isAr ? "معاينة وطباعة العقد" : "Print PO Document"}</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: SUPPLIER PROFILE & ACCREDITATIONS */}
        {/* ============================================================ */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            
            <div className="bg-white p-6 rounded-2xl border border-[#CBD5E1] shadow-xs space-y-6">
              <div>
                <h3 className="text-lg font-black text-[#0F172A]">{isAr ? "ملف المورد الصناعي المعتمد" : "Verified Industrial Supplier Profile"}</h3>
                <p className="text-xs text-[#475569] mt-0.5">{isAr ? "بيانات المصنع، الاعتمادات القياسية، وسجل التوريدات لشركات المقاولات" : "Accreditations, manufacturing yards, and consultant pre-qualifications"}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-[#EEF2F6] rounded-xl border border-[#CBD5E1]">
                  <span className="text-[10px] text-[#64748B] uppercase font-bold block">{isAr ? "الاسم التجاري الرسمي" : "Legal Company Name"}</span>
                  <strong className="text-sm text-[#0F172A] block mt-1">Ezz Steel Mills Egypt (S.A.E)</strong>
                  <span className="text-[11px] text-[#475569]">مصانع حديد عز - قطاع درفلة وصهر الصلب</span>
                </div>

                <div className="p-4 bg-[#EEF2F6] rounded-xl border border-[#CBD5E1]">
                  <span className="text-[10px] text-[#64748B] uppercase font-bold block">{isAr ? "السجل التجاري والبطاقة الضريبية" : "Commercial Reg & Tax ID"}</span>
                  <strong className="text-sm text-[#0F172A] block mt-1 font-mono">CR: 101039841 • Tax: 200398110</strong>
                  <span className="text-[11px] text-emerald-700 font-bold">✓ Active & Tax Compliant</span>
                </div>

                <div className="p-4 bg-[#EEF2F6] rounded-xl border border-[#CBD5E1]">
                  <span className="text-[10px] text-[#64748B] uppercase font-bold block">{isAr ? "شهادات الجودة والمطابقة" : "Quality Standards"}</span>
                  <strong className="text-sm text-[#0F172A] block mt-1">ISO 9001 / ISO 14001 / ASTM A615</strong>
                  <span className="text-[11px] text-[#475569]">المواصفة المصرية القياسية ES 262/2015</span>
                </div>
              </div>

              {/* Plants and Staging Yards */}
              <div className="space-y-3 pt-3 border-t border-[#EEF2F6]">
                <h4 className="font-bold text-xs text-[#0F172A] uppercase tracking-wider">{isAr ? "مصانع الإنتاج وساحات التشوين اللوجستية" : "Rolling Plants & Staging Logistics"}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-[#CBD5E1] flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-[#E85312]" />
                    <div>
                      <strong className="text-[#0F172A] block">{isAr ? "مصنع العين السخنة" : "Ain Sokhna Integrated Complex"}</strong>
                      <span className="text-[10px] text-[#64748B]">{isAr ? "طاقة 3.2 مليون طن سنوياً" : "3.2M Tons / Year Capacity"}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-[#CBD5E1] flex items-center gap-3">
                    <Truck className="w-5 h-5 text-blue-600" />
                    <div>
                      <strong className="text-[#0F172A] block">{isAr ? "ساحة تشوين العاشر من رمضان" : "10th of Ramadan Staging Yard"}</strong>
                      <span className="text-[10px] text-[#64748B]">{isAr ? "تجهيز فوري لشحنات القاهرة والعاصمة" : "Immediate dispatch to Cairo / Capital"}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-[#CBD5E1] flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <div>
                      <strong className="text-[#0F172A] block">{isAr ? "مصنع الدخيلة بالإسكندرية" : "El-Dekheila Flat & Rebar Plant"}</strong>
                      <span className="text-[10px] text-[#64748B]">{isAr ? "تغذية مشروعات الساحل والإسكندرية" : "Supplying Alexandria & North Coast"}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* ============================================================== */}
      {/* 4. COMPREHENSIVE SUPPLIER PROPOSAL MODAL */}
      {/* ============================================================== */}
      {showBidModal && activeRfqForBid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border border-[#CBD5E1] w-full max-w-2xl max-h-[92vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="p-6 bg-[#EEF2F6] border-b border-[#CBD5E1] text-[#0F172A] flex items-center justify-between sticky top-0 z-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#FEECE5] text-[#E85312] font-black border border-[#E85312]/20">
                    {activeRfqForBid.id}
                  </span>
                  <span className="text-xs text-[#475569] font-bold">
                    {isAr ? "تقديم عرض سعر فني ومالي ملزم لشركة المقاولات" : "Submit Binding Technical & Commercial Proposal"}
                  </span>
                </div>
                <h3 className="font-black text-lg text-[#0F172A]">
                  {isAr ? activeRfqForBid.materialAr : activeRfqForBid.material} ({activeRfqForBid.quantity})
                </h3>
                <p className="text-xs text-[#475569] mt-0.5">
                  {isAr ? "المقاول:" : "Contractor:"} <strong className="text-[#0F172A]">{isAr ? activeRfqForBid.contractorAr : activeRfqForBid.contractor}</strong> • {isAr ? "المشروع:" : "Site:"} {isAr ? activeRfqForBid.projectAr : activeRfqForBid.project}
                </p>
              </div>
              <button 
                onClick={() => setShowBidModal(false)}
                className="w-8 h-8 rounded-full bg-white hover:bg-[#E2E8F0] border border-[#CBD5E1] text-[#475569] hover:text-[#0F172A] flex items-center justify-center transition-colors text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitBid} className="p-6 sm:p-8 space-y-6 text-xs">
              {bidSuccessMessage ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center text-2xl font-bold shadow-lg shadow-emerald-200">
                    ✓
                  </div>
                  <h4 className="font-black text-[#0F172A] text-base">{bidSuccessMessage}</h4>
                  <p className="text-xs text-[#475569]">
                    {isAr 
                      ? "يقوم محرك الذكاء الاصطناعي الآن بمقارنة عرضك مع باقي الموردين وإعطائه الأولوية بناءً على السعر والجودة وسرعة التوريد." 
                      : "The AI procurement engine is analyzing your quotation against other competing offers."}
                  </p>
                </div>
              ) : (
                <>
                  {/* SECTION 1: FINANCIAL & FREIGHT PROPOSAL */}
                  <div className="space-y-3 pb-5 border-b border-[#CBD5E1]">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-orange-100 text-[#E85312] font-black flex items-center justify-center text-[10px]">1</span>
                      <h4 className="font-extrabold text-[#0F172A] text-xs uppercase tracking-wider">
                        {isAr ? "العرض المالي وتكاليف النقل (Commercial & Landed Pricing)" : "Commercial & Landed Pricing"}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-[#334155] mb-1">
                          {isAr ? "سعر الوحدة الأساسي ($ / Unit) *" : "Base Unit Price ($/Unit) *"}
                        </label>
                        <input 
                          type="number" 
                          required
                          value={unitPrice}
                          onChange={(e) => setUnitPrice(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs bg-[#EEF2F6] border border-[#CBD5E1] rounded-xl focus:bg-white font-mono font-bold text-[#0F172A]"
                          placeholder="e.g. 920"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#334155] mb-1">
                          {isAr ? "مصاريف النقل واللوجستيات للموقع ($) *" : "Freight & Site Logistics ($) *"}
                        </label>
                        <input 
                          type="number" 
                          required
                          value={deliveryCost}
                          onChange={(e) => setDeliveryCost(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs bg-[#EEF2F6] border border-[#CBD5E1] rounded-xl focus:bg-white font-mono font-bold text-[#0F172A]"
                          placeholder="e.g. 1000"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3.5 bg-orange-50/70 rounded-xl border border-orange-200">
                      <div>
                        <span className="text-[10px] text-[#475569] block uppercase font-bold">
                          {isAr ? `إجمالي قيمة العرض واصل للموقع (${activeRfqForBid.quantity})` : `Total Landed Proposal (${activeRfqForBid.quantity})`}
                        </span>
                        <div className="text-xl font-black text-[#0F172A] font-mono">
                          ${(Number(unitPrice) * (parseInt(activeRfqForBid.quantity) || 50) + Number(deliveryCost)).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox"
                          id="unloadingCheck"
                          checked={unloadingIncluded}
                          onChange={(e) => setUnloadingIncluded(e.target.checked)}
                          className="w-4 h-4 text-[#E85312] rounded accent-[#E85312]"
                        />
                        <label htmlFor="unloadingCheck" className="text-[11px] font-bold text-[#0F172A] cursor-pointer">
                          {isAr ? "الشحن شامل التفريغ بونش الموقع" : "Offloading Included"}
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: DELIVERY TIMELINE & SITE SCHEDULE */}
                  <div className="space-y-3 pb-5 border-b border-[#CBD5E1]">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-orange-100 text-[#E85312] font-black flex items-center justify-center text-[10px]">2</span>
                      <h4 className="font-extrabold text-[#0F172A] text-xs uppercase tracking-wider">
                        {isAr ? "الجدول الزمني والقدرة الاستيعابية (Delivery & Schedule)" : "Delivery & Logistics"}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-[#334155] mb-1">
                          {isAr ? "مدة التوريد بعد التعميد (بالأيام) *" : "Dispatch Lead Time (Days) *"}
                        </label>
                        <input 
                          type="number" 
                          required
                          value={leadTimeDays}
                          onChange={(e) => setLeadTimeDays(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs bg-[#EEF2F6] border border-[#CBD5E1] rounded-xl focus:bg-white font-bold text-[#0F172A]"
                        />
                        <span className="text-[10px] text-emerald-700 font-bold block mt-1">
                          ✓ {isAr ? "التسليم مضمون قبل موعد الصب المحدد من المقاول" : "Arrives strictly before pouring milestone"}
                        </span>
                      </div>

                      <div>
                        <label className="block font-bold text-[#334155] mb-1">
                          {isAr ? "القدرة اليومية للتوريد" : "Daily Delivery Capacity"}
                        </label>
                        <input 
                          type="text" 
                          value={dailyCapacity}
                          onChange={(e) => setDailyCapacity(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs bg-[#EEF2F6] border border-[#CBD5E1] rounded-xl focus:bg-white font-bold text-[#0F172A]"
                          placeholder="e.g. 25 Tons / Day"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 3: TECHNICAL STANDARDS & QUALITY */}
                  <div className="space-y-3 pb-5 border-b border-[#CBD5E1]">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-orange-100 text-[#E85312] font-black flex items-center justify-center text-[10px]">3</span>
                      <h4 className="font-extrabold text-[#0F172A] text-xs uppercase tracking-wider">
                        {isAr ? "المواصفات الفنية وشهادات الجودة (Technical Standard & Quality)" : "Quality & Standards"}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-[#334155] mb-1">
                          {isAr ? "المواصفة القياسية المعتمدة" : "Standard Specification"}
                        </label>
                        <input 
                          type="text" 
                          required
                          value={materialStandard}
                          onChange={(e) => setMaterialStandard(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs bg-[#EEF2F6] border border-[#CBD5E1] rounded-xl focus:bg-white font-bold text-[#0F172A]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#334155] mb-1">
                          {isAr ? "المصنع ومصدر الصهر (Rolling Mill / Origin)" : "Manufacturing Plant Origin"}
                        </label>
                        <input 
                          type="text" 
                          required
                          value={millOrigin}
                          onChange={(e) => setMillOrigin(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs bg-[#EEF2F6] border border-[#CBD5E1] rounded-xl focus:bg-white font-bold text-[#0F172A]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-[#EEF2F6] rounded-xl border border-[#CBD5E1]">
                      <div>
                        <span className="font-bold text-[#0F172A] text-xs block">
                          {isAr ? "شهادة فحص معملية معتمدة لكل لوت (Mill Test Certificate - MTC)" : "Mill Test Certificate (MTC)"}
                        </span>
                        <span className="text-[10px] text-[#475569]">
                          {isAr ? "تتضمن نتائج اختبار الشد، الخضوع، والتركيب الكيميائي للحديد" : "Includes chemical composition & tensile test reports"}
                        </span>
                      </div>
                      <input 
                        type="checkbox"
                        checked={hasMillTestCert}
                        onChange={(e) => setHasMillTestCert(e.target.checked)}
                        className="w-4 h-4 text-[#E85312] rounded accent-[#E85312]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#334155] mb-1">
                        {isAr ? "شروط الضمان والاستبدال" : "Warranty & Replacement Guarantee"}
                      </label>
                      <input 
                        type="text" 
                        value={warrantyTerms}
                        onChange={(e) => setWarrantyTerms(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#EEF2F6] border border-[#CBD5E1] rounded-xl focus:bg-white text-[#0F172A]"
                      />
                    </div>
                  </div>

                  {/* SECTION 4: COMMERCIAL TERMS & NOTES */}
                  <div className="space-y-3 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-orange-100 text-[#E85312] font-black flex items-center justify-center text-[10px]">4</span>
                      <h4 className="font-extrabold text-[#0F172A] text-xs uppercase tracking-wider">
                        {isAr ? "شروط السداد وصلاحية العرض (Payment Terms & Remarks)" : "Payment & Validity"}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-[#334155] mb-1">
                          {isAr ? "شروط وتسهيلات الدفع" : "Payment Terms"}
                        </label>
                        <select 
                          value={paymentTerms}
                          onChange={(e) => setPaymentTerms(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs bg-[#EEF2F6] border border-[#CBD5E1] rounded-xl focus:bg-white font-bold text-[#0F172A]"
                        >
                          <option>Net 30 Days Credit (Deferred Payment)</option>
                          <option>50% Advance / 50% on Site Delivery</option>
                          <option>100% Cash On Delivery (COD)</option>
                          <option>100% Irrevocable Letter of Credit (LC)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-[#334155] mb-1">
                          {isAr ? "صلاحية العرض (أيام)" : "Quotation Validity (Days)"}
                        </label>
                        <input 
                          type="number" 
                          value={validityDays}
                          onChange={(e) => setValidityDays(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs bg-[#EEF2F6] border border-[#CBD5E1] rounded-xl focus:bg-white font-bold text-[#0F172A]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-[#334155] mb-1">
                        {isAr ? "ملاحظات وتسهيلات خاصة للمقاول (Supplier Notes to Contractor)" : "Notes to Contractor"}
                      </label>
                      <textarea 
                        rows={2}
                        value={supplierRemarks}
                        onChange={(e) => setSupplierRemarks(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-[#EEF2F6] border border-[#CBD5E1] rounded-xl focus:bg-white text-[#0F172A]"
                        placeholder="e.g. Dedicated dispatch lane ready..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-[#E85312] hover:brightness-105 text-white font-extrabold text-xs shadow-md shadow-[#E85312]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isAr ? "إرسال العرض الرسمي لمنظومة المشتريات ولصاحب الشركة" : "Submit Binding Quotation to Contractor Board"}</span>
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. VIEW OFFICIAL PURCHASE ORDER MODAL */}
      {/* ============================================================== */}
      {viewPoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border border-[#CBD5E1] w-full max-w-2xl max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#CBD5E1]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 font-bold font-mono text-sm">
                  {viewPoModal.id}
                </div>
                <div>
                  <h3 className="font-black text-lg text-[#0F172A]">
                    {isAr ? "أمر شراء رسمي معتمد (Official Purchase Order)" : "Official Awarded Purchase Order"}
                  </h3>
                  <span className="text-xs text-[#475569]">
                    {isAr ? "صادر من شركة المقاولات ومسجل رسمياً بالسحابة" : "Legally binding procurement contract"}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setViewPoModal(null)}
                className="w-8 h-8 rounded-full bg-[#EEF2F6] hover:bg-[#E2E8F0] border border-[#CBD5E1] text-[#475569] flex items-center justify-center cursor-pointer text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 bg-[#EEF2F6] rounded-xl border border-[#CBD5E1]">
                <div>
                  <span className="text-[#64748B] text-[10px] uppercase font-bold block">{isAr ? "المشتري (شركة المقاولات)" : "Buyer (Contractor)"}</span>
                  <strong className="text-sm text-[#0F172A] block mt-0.5">{isAr ? viewPoModal.contractorAr : viewPoModal.contractor}</strong>
                  <span className="text-[11px] text-[#475569]">{isAr ? viewPoModal.projectAr : viewPoModal.project}</span>
                </div>
                <div>
                  <span className="text-[#64748B] text-[10px] uppercase font-bold block">{isAr ? "المورد المعتمد" : "Awarded Supplier"}</span>
                  <strong className="text-sm text-[#0F172A] block mt-0.5">Ezz Steel Mills Egypt</strong>
                  <span className="text-[11px] text-emerald-700 font-bold">Verified Vendor Tier-1</span>
                </div>
              </div>

              <div className="border border-[#CBD5E1] rounded-xl overflow-hidden">
                <table className="w-full text-right text-xs">
                  <thead className="bg-[#EEF2F6] border-b border-[#CBD5E1] text-[#475569] font-bold">
                    <tr>
                      <th className="p-3">{isAr ? "المادة" : "Item"}</th>
                      <th className="p-3">{isAr ? "الكمية" : "Qty"}</th>
                      <th className="p-3">{isAr ? "الإجمالي" : "Total"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#EEF2F6]">
                      <td className="p-3 font-bold text-[#0F172A]">{isAr ? viewPoModal.materialAr : viewPoModal.material}</td>
                      <td className="p-3 font-mono">{viewPoModal.quantity}</td>
                      <td className="p-3 font-mono font-black text-emerald-700">{viewPoModal.totalAmount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <div className="font-bold">{isAr ? "شروط التسليم واللوجستيات:" : "Delivery Logistics & Terms:"}</div>
                <div>• {isAr ? "تاريخ التسليم في الموقع:" : "Target Site Date:"} <strong className="font-mono">{viewPoModal.deliveryTargetDate}</strong></div>
                <div>• {isAr ? "شروط الدفع:" : "Payment Terms:"} <strong>{viewPoModal.paymentTerms}</strong></div>
                <div>• {isAr ? "مسؤول الاستلام بالموقع:" : "Contact:"} <strong>{viewPoModal.siteContact}</strong></div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#CBD5E1]">
              <button 
                onClick={() => setViewPoModal(null)}
                className="px-4 py-2 rounded-lg border border-[#CBD5E1] text-[#334155] hover:bg-[#EEF2F6] text-xs font-bold cursor-pointer"
              >
                {isAr ? "إغلاق" : "Close"}
              </button>
              <button 
                onClick={() => alert(`Printing official PO document ${viewPoModal.id}...`)}
                className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{isAr ? "طباعة نسخة أمر الشراء الرسمية" : "Print Official PO Copy"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
