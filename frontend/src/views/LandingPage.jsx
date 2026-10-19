import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle, 
  Layers, 
  Sparkles, 
  TrendingUp, 
  ArrowRightLeft, 
  ShieldCheck, 
  Building2,
  PackageCheck,
  TrendingDown,
  HardHat,
  Truck,
  FileCheck,
  DollarSign,
  Calculator,
  ChevronDown,
  ChevronUp,
  Sliders,
  CheckCircle2,
  Play,
  ExternalLink,
  Users,
  Compass,
  Cpu,
  Boxes,
  Globe,
  Star,
  Check,
  BarChart3,
  ScanLine,
  FileSpreadsheet,
  Zap,
  Quote,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import IramLogo from '../components/IramLogo';

export default function LandingPage({ onOpenAuth, onExploreDashboard, language }) {
  const isAr = language === 'ar';

  // Interactive Pricing State
  const [billingCycle, setBillingCycle] = useState('yearly'); // 'monthly' | 'yearly'

  // Interactive Hero Tabs ('yard' | 'twin' | 'surplus' | 'waste')
  const [heroTab, setHeroTab] = useState('yard');

  // Interactive Hero Zone Inspection ('zone-a' | 'zone-b')
  const [activeZone, setActiveZone] = useState('zone-a');

  // Interactive Services Filter ('all' | 'waste' | 'surplus' | 'procurement' | 'warehouse')
  const [serviceFilter, setServiceFilter] = useState('all');

  // Interactive ROI Calculator State
  const [calcProjectsCount, setCalcProjectsCount] = useState(4);
  const [calcAnnualBudgetPerSite, setCalcAnnualBudgetPerSite] = useState(8); // $M
  
  // Interactive Lifecycle Step Selector
  const [activeLifecycleStep, setActiveLifecycleStep] = useState(2); // 0 to 5

  // Interactive Persona Tabs
  const [activePersonaTab, setActivePersonaTab] = useState('admin');

  // Interactive FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Calculations for ROI
  const totalBudget = calcProjectsCount * calcAnnualBudgetPerSite * 1000000;
  const surplusSaved = Math.round(totalBudget * 0.048); // ~4.8% recovered
  const emergencyProcurementAvoided = Math.round(totalBudget * 0.024); // ~2.4% avoided rush fees
  const wasteLossAvoided = Math.round(totalBudget * 0.035); // ~3.5% saved via AI cutting/pour optimization
  const totalNetSaving = surplusSaved + emergencyProcurementAvoided + wasteLossAvoided;

  // 6 Lifecycle Steps Data
  const lifecycleSteps = [
    {
      num: "01",
      titleEn: "Requisition & BOQ Planning",
      titleAr: "طلب المواد ومطابقة الـ BOQ",
      descEn: "Site enters material requirements with technical specifications, required delivery date, and floor zone.",
      descAr: "يقوم مهندس الموقع بتسجيل الاحتياج مع المواصفات الفنية وجدول الصب وتحديد الزون الهندسي.",
      badge: "Step 1",
      metric: "100% Digital BOQ",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop&q=80"
    },
    {
      num: "02",
      titleEn: "AI Burn Rate & Shortage Forecasting",
      titleAr: "تنبؤ العجز ومعدل الحرق بالذكاء الاصطناعي",
      descEn: "Machine learning analyzes daily consumption velocity vs inventory days to detect shortages 14 days before work stops.",
      descAr: "نماذج الـ AI تحلل سرعة الاستهلاك اليومي مقارنة بالأرصدة لتوقع العجز قبل حدوثه بأسبوعين.",
      badge: "AI Predictive",
      metric: "14-Day Early Warning",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=800&auto=format&fit=crop&q=80"
    },
    {
      num: "03",
      titleEn: "Sister Sites Surplus Check (Internal First)",
      titleAr: "فحص الفائض بالمشاريع الأخرى (داخلياً أولاً)",
      descEn: "Before issuing purchase orders, IRAM searches company sister sites for usable surplus, saving millions in duplicate buys.",
      descAr: "قبل إصدار أي أمر شراء خارجي، يبحث النظام آلياً في مشروعات الشركة الأخرى عن أي فائض قابل للنقل.",
      badge: "Cost Saver",
      metric: "+$184.5k Saved",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80"
    },
    {
      num: "04",
      titleEn: "Smart External Sourcing & RFQ Matrix",
      titleAr: "الشراء الذكي ومقارنة عروض الأسعار",
      descEn: "If internal transfer is unfeasible, RFQ is dispatched to verified steel mills and cement factories with AI quotation scoring.",
      descAr: "في حال عدم توفر فائض داخلي، يتم طرح مناقصة RFQ وتقييم عروض أسعار الموردين بالذكاء الاصطناعي.",
      badge: "Procurement",
      metric: "AI Landed Cost Scoring",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80"
    },
    {
      num: "05",
      titleEn: "Warehouse Receiving & AI Document OCR",
      titleAr: "استلام المخازن وفحص المستندات بالـ OCR",
      descEn: "Delivery trucks arrive at site yards; receipts and delivery notes are scanned with AI OCR to verify received vs ordered quantities.",
      descAr: "استلام الشحنات بساحات التشوين ومسح بوالص الشحن ضوئياً بالـ OCR لمطابقة الكميات الفعلية مع أمر الشراء.",
      badge: "AI OCR Vision",
      metric: "99.2% Extraction Accuracy",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80"
    },
    {
      num: "06",
      titleEn: "Surplus Reallocation & Value Recovery",
      titleAr: "إعادة توزيع الفائض وتحقيق أعلى عائد",
      descEn: "Leftover rebar bundles and intact materials are recorded in the surplus ledger and dynamically redeployed to ongoing projects.",
      descAr: "حصر الفائض المتبقي بعد انتهاء مراحل البناء وإعادة توجيهه للمشاريع الجديدة بدلاً من تركه كأصل هالك.",
      badge: "Lifecycle Loop",
      metric: "Zero Leftover Waste",
      image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80"
    }
  ];

  // Persona Showcases
  const personas = [
    {
      id: "admin",
      role: "Company Admin",
      titleEn: "Executive Multi-Project Portfolio & RBAC",
      titleAr: "إدارة الشركة ومصفوفة الصلاحيات (RBAC)",
      descEn: "Oversee all active projects, monitor total financial savings from surplus transfers, configure project scopes, and assign engineering roles.",
      descAr: "رؤية شاملة لكافة مشروعات الشركة، متابعة الوفورات المالية المحققة، وإضافة المشروعات وتوزيع المهام للمهندسين.",
      icon: Building2,
      badge: "Master Control",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: "pm",
      role: "Project Manager",
      titleEn: "Site Management & Transfer Approvals",
      titleAr: "إدارة الموقع واعتماد النقل الداخلي (Al-Mansoura)",
      descEn: "Scoped strictly to their assigned site. Monitor real-time BOQ progress, critical shortage burn rates, and approve internal transfer matches.",
      descAr: "لوحة مخصصة حصراً للمشروع المسند للمدير؛ متابعة جدول الكميات، تنبيهات العجز، والموافقة على نقل الفائض من المواقع الشقيقة.",
      icon: HardHat,
      badge: "Site Scoped",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: "site",
      role: "Site Engineer",
      titleEn: "Field Consumption & Waste Anomaly Audits",
      titleAr: "تسجيل الاستهلاك اليومي ورصد الهدر الميداني",
      descEn: "Log daily material installation, report cutting off-cuts and pour waste, and review AI recommendations for BBS bar bending optimization.",
      descAr: "تسجيل الكميات المركبة في الميدان يومياً، رصد نسب فواقد القص وصب الخرسانة، ومراجعة تقارير الذكاء الاصطناعي.",
      icon: TrendingDown,
      badge: "Field Execution",
      image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: "procurement",
      role: "Procurement Officer",
      titleEn: "Sourcing, AI Bid Matrix & Contractor Replies",
      titleAr: "إدارة المشتريات والرد الرسمي على الموردين",
      descEn: "Issue RFQs, compare bids using AI landed cost evaluation, send formal decision letters to suppliers, and release Purchase Orders (POs).",
      descAr: "طرح المناقصات، تقييم العروض بالـ AI، اتخاذ قرار المقاول الرسمي (قبول/رفض) وإرسال الرد للمورد وإصدار الـ PO.",
      icon: PackageCheck,
      badge: "Sourcing & Awards",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: "warehouse",
      role: "Warehouse Officer",
      titleEn: "Site Yard Balances & AI Delivery Note OCR",
      titleAr: "المخازن ومسح بوالص الشحن ضوئياً بالـ OCR",
      descEn: "Inspect incoming materials, scan delivery tickets via AI OCR, manage staging yard balances, and declare surplus inventory.",
      descAr: "إدارة أرصدة ساحات التشوين، مسح أذون الاستلام ضوئياً بالـ OCR، وتسجيل كميات الفائض المتبقية.",
      icon: Boxes,
      badge: "Yard Balances",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: "supplier",
      role: "Verified Supplier",
      titleEn: "Dedicated Supplier Community & Bid Tracker",
      titleAr: "بوابة الموردين المستقلة ومتابعة قرارات الشركات",
      descEn: "Completely separated portal. Browse open contractor RFQs, submit binding price quotes, review formal contractor replies, and view awarded POs.",
      descAr: "بوابة مستقلة للمصانع والموردين؛ تصفح طلبات التوريد، تقديم عروض الأسعار، واستلام ردود المقاولين الفورية وأوامر الشراء.",
      icon: Truck,
      badge: "Supplier Network",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop&q=80"
    }
  ];

  // FAQs
  const faqs = [
    {
      qEn: "How does IRAM check internal sister sites before purchasing?",
      qAr: "كيف تفحص منصة IRAM التوفر الداخلي بالمشاريع الشقيقة قبل الشراء؟",
      aEn: "Whenever a Project Manager logs a material need, IRAM immediately scans the centralized surplus ledger across all active company sites and regional yards. If compatible specifications and quantities exist, an internal transfer recommendation is generated, saving substantial purchasing capital.",
      aAr: "عند قيام أي مشروع بتسجيل احتياج لمادة معينة، يقوم النظام آلياً بمسح سجل الفائض في كافة مواقع ومخازن الشركة. وفي حال وجود تطابق بالمواصفات، يتم اقتراح النقل الداخلي الفوري لتوفير تكلفة الشراء الخارجي."
    },
    {
      qEn: "How does the AI Material Waste Prediction (FR-WP-01 to 10) work?",
      qAr: "كيف يعمل نظام التنبؤ بهدر المواد بالذكاء الاصطناعي (FR-WP-01 to 10)؟",
      aEn: "IRAM employs trained machine learning models evaluated against historical construction logs. It inputs planned BOQ quantities, activity types, and daily consumption velocity to forecast expected waste percentages and flag abnormal consumption early.",
      aAr: "تعتمد المنصة على نماذج تعلم آلي مدربة على بيانات إنشائية تاريخية؛ تحلل جدول الكميات ونوع النشاط وسرعة الاستهلاك لتوقع نسبة الهدر واكتشاف أي انحرافات غير طبيعية مع تقديم حلول وتوصيات هندسية."
    },
    {
      qEn: "Are company contractor data and supplier quotations completely isolated?",
      qAr: "هل بيانات شركة المقاولات ومناقصاتها معزولة تماماً عن حسابات الموردين؟",
      aEn: "Yes. IRAM enforces strict multi-tenant isolation. Contractor companies have dedicated RBAC workspaces with project-level access controls, while suppliers operate through a separate community portal where they only see RFQs they are invited to bid on.",
      aAr: "نعم بالتأكيد؛ تم بناء النظام على عزل كامل للمستأجرين (Tenant Isolation). لشركة المقاولات منظومة صلاحيات داخلية محكمة، بينما يمتلك الموردون بوابة مستقلة تماماً لتقديم عروضهم واستلام الردود."
    },
    {
      qEn: "Can we scan paper delivery notes using smartphones on-site?",
      qAr: "هل يمكن مسح أذون استلام الشحنات الورقية بالموقع ضوئياً؟",
      aEn: "Yes. The AI Document OCR engine processes delivery notes, manifests, and mill test certificates in Arabic and English, extracting SKU, supplier, quantity, and batch number with field-level confidence scores.",
      aAr: "نعم، محرك الفحص الضوئي الذكي (AI OCR) يدعم قراءة بوالص الشحن وأذون الاستلام باللغتين العربية والإنجليزية واستخراج الكميات والمورد ورقم الشحنة بنسب دقة تتجاوز 99%."
    }
  ];

  return (
    <div className={`min-h-screen bg-[#EEF2F6] text-[#0F172A] selection:bg-[#E85312] selection:text-white ${isAr ? 'font-arabic' : 'font-sans'}`}>
      
      {/* ============================================================== */}
      {/* 1. TOP GLOBAL NAVBAR (Light Enterprise Header) */}
      {/* ============================================================== */}
      <header className="border-b border-[#CBD5E1] bg-white/95 backdrop-blur-md sticky top-0 z-50 text-[#0F172A] shadow-xs">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 h-20 flex items-center justify-between gap-6">
          
          {/* Official IRAM Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group focus:outline-hidden"
            title={isAr ? "الرئيسية" : "Home"}
          >
            <IramLogo className="h-10 w-auto group-hover:opacity-90 transition-opacity" variant="light" />
          </button>

          {/* Navigation Links (Enhanced Legibility & Scale) */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8 text-sm font-bold text-[#334155]">
            <a href="#services" className="hover:text-[#E85312] transition-colors">
              {isAr ? "الحلول والخدمات" : "Solutions"}
            </a>
            <a href="#how-it-works" className="hover:text-[#E85312] transition-colors">
              {isAr ? "دورة حياة المواد" : "How It Works"}
            </a>
            <a href="#roi-calculator" className="hover:text-[#E85312] transition-colors flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-[#E85312]" />
              <span>{isAr ? "حاسبة التوفير (ROI)" : "Savings ROI"}</span>
            </a>
            <a href="#personas" className="hover:text-[#E85312] transition-colors">
              {isAr ? "أدوار النظام" : "Role Dashboards"}
            </a>
            <a href="#testimonials" className="hover:text-[#E85312] transition-colors">
              {isAr ? "آراء العملاء" : "Testimonials"}
            </a>
            <a href="#pricing" className="hover:text-[#E85312] transition-colors font-bold text-[#E85312]">
              {isAr ? "خريطة الاشتراكات" : "Pricing Plans"}
            </a>
            <a href="#faq" className="hover:text-[#E85312] transition-colors">
              {isAr ? "الأسئلة الشائعة" : "FAQ"}
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Dedicated Supplier Portal Quick Button */}
            <button
              onClick={() => onExploreDashboard('Supplier')}
              className="text-xs font-bold px-3.5 py-2.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              title={isAr ? "دخول بوابة الموردين المستقلة" : "Supplier Community Portal"}
            >
              <Truck className="w-3.5 h-3.5 text-amber-600" />
              <span>{isAr ? "بوابة الموردين" : "Supplier Portal"}</span>
            </button>

            {/* Quick Demo Launch Button */}
            <button
              onClick={() => onExploreDashboard('Company Admin')}
              className="text-xs font-bold px-3.5 py-2.5 rounded-lg bg-[#EEF2F6] hover:bg-[#E2E8F0] text-[#0F172A] border border-[#CBD5E1] transition-all flex items-center gap-1.5 cursor-pointer"
              title="Launch Live Workspace Directly"
            >
              <Play className="w-3.5 h-3.5 fill-[#E85312] text-[#E85312]" />
              <span className="hidden sm:inline">{isAr ? "النموذج المباشر" : "Live Workspace"}</span>
            </button>

            {/* Sign In Button */}
            <button
              onClick={() => onOpenAuth('login')}
              className="text-xs font-bold px-3.5 py-2.5 rounded-lg text-[#0F172A] hover:bg-[#EEF2F6] transition-colors border border-[#CBD5E1] cursor-pointer"
            >
              {isAr ? "تسجيل الدخول" : "Sign In"}
            </button>

            {/* Get Started Button */}
            <button
              onClick={() => onOpenAuth('register')}
              className="text-xs font-bold px-4 py-2.5 rounded-lg bg-[#E85312] hover:bg-[#CC490F] text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isAr ? "ابدأ الآن" : "Get Started"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. HERO SECTION (Light Enterprise Theme + Architectural Background) */}
      {/* ============================================================== */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-24 bg-gradient-to-b from-[#E2E8F0] via-[#EEF2F6] to-[#E2E8F0]">
        
        {/* Realistic Construction Material Staging Yard Background (From Figma Artboard 4) */}
        <div className="absolute top-0 right-0 bottom-0 w-full lg:w-3/5 overflow-hidden pointer-events-none opacity-40 rtl:right-auto rtl:left-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=1800&auto=format&fit=crop&q=85" 
            alt="IRAM Construction Material Staging Yard" 
            className="w-full h-full object-cover object-right-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#EEF2F6] via-[#EEF2F6]/85 to-transparent rtl:bg-gradient-to-l rtl:from-[#EEF2F6] rtl:via-[#EEF2F6]/85 rtl:to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#E2E8F0] via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#E2E8F0] via-transparent to-[#E2E8F0]"></div>
        </div>

        {/* Subtle Architectural Grid Pattern */}
        <div className="absolute inset-0 opacity-50 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="light-cad-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#CBD5E1" strokeWidth="0.85" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#light-cad-grid)" />
          </svg>
        </div>

        {/* Warm Subtle Accent Radial Glows */}
        <div className="absolute top-0 right-1/4 w-[32rem] h-[32rem] bg-[#FEECE5]/80 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-1/4 w-[28rem] h-[28rem] bg-orange-200/50 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Value Proposition & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* High-Tech Clean Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#CBD5E1] text-xs font-bold text-[#0F172A] shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#15803D] animate-ping"></span>
                <span className="tracking-wide">
                  {isAr ? "المنصة الذكية لإدارة دورة حياة مواد البناء" : "AI Construction Material Lifecycle Management"}
                </span>
              </div>


              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black leading-[1.3] text-[#0F172A]">
                {isAr ? (
                  <>
                    ما الذي يكلف مشاريعك أكثر: <br />
                    <span className="text-[#E85312]">
                      نقص المواد أم الفائض والهدر؟
                    </span>
                  </>
                ) : (
                  <>
                    What's Costing Your Projects More: <br />
                    <span className="text-[#E85312]">
                      Material Shortages or Surplus?
                    </span>
                  </>
                )}
              </h1>

              {/* Description Copy */}
              <p className="text-base sm:text-lg text-[#334155] max-w-3xl leading-[1.8] font-medium">
                {isAr
                  ? "منصة IRAM تربط التخطيط الهندسي، المشتريات، المخزون، والاستهلاك الفعلي عبر كافة مشاريع الشركة — لتتوقع النقص مبكراً، وتتحقق من توفر المواد داخلياً قبل الشراء، وتعيد استغلال الفائض وتتجنب الهدر لتوفير ملايين الجنيهات."
                  : "IRAM connects material planning, procurement, inventory, and consumption across your projects — helping you anticipate shortages, identify surplus, and make smarter decisions throughout the material lifecycle."}
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                
                {/* Launch Live Prototype Workspace */}
                <button
                  onClick={() => onExploreDashboard('Company Admin')}
                  className="px-6 py-3.5 rounded-lg bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
                  <span>{isAr ? "دخول صاحب الشركة (Contractor)" : "Contractor Portal"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Direct Dedicated Supplier Entry */}
                <button
                  onClick={() => onExploreDashboard('Supplier')}
                  className="px-6 py-3.5 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-amber-400 border border-amber-500/40 font-bold text-sm shadow-md transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <Truck className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>{isAr ? "دخول بوابة الموردين (Supplier Portal)" : "Supplier Portal"}</span>
                </button>

                {/* Register New Account */}
                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-5 py-3.5 rounded-lg bg-white hover:bg-[#EEF2F6] border border-[#CBD5E1] text-[#0F172A] font-bold text-xs transition-all flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>{isAr ? "تسجيل جديد" : "Register"}</span>
                </button>

              </div>

              {/* Key Metrics Strip */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-[#CBD5E1]">
                <div className="bg-white p-5 rounded-xl border border-[#CBD5E1] shadow-xs">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F172A]">98.4%</div>
                  <div className="text-xs text-[#475569] font-bold mt-1">
                    {isAr ? "دقة المخزون الميداني" : "Inventory Accuracy"}
                  </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-[#CBD5E1] shadow-xs">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#E85312]">-34%</div>
                  <div className="text-xs text-[#475569] font-bold mt-1">
                    {isAr ? "تقليل هدر المواد بالموقع" : "On-site Waste"}
                  </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-[#CBD5E1] shadow-xs">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#15803D]">100%</div>
                  <div className="text-xs text-[#475569] font-bold mt-1">
                    {isAr ? "تتبع كامل لمواقع العمل" : "Site Traceability"}
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Clean Enterprise BIM Command Center Card */}
            <div className="lg:col-span-5 relative">
              
              {/* Floating Top Badge */}
              <div className="absolute -top-4 -right-2 z-30 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-amber-300 shadow-md text-xs font-bold text-amber-900">
                <Sparkles className="w-4 h-4 text-[#E85312]" />
                <span>{isAr ? "توفير فوري: +45,550 $ بمناقلة ذكية" : "AI Surplus Match: +$45,550 Saved"}</span>
              </div>

              {/* Command Center Card Container */}
              <div className="rounded-2xl bg-white overflow-hidden border border-[#CBD5E1] shadow-xl">
                
                {/* Interactive Header & Switcher Tabs */}
                <div className="p-4 bg-[#EEF2F6] border-b border-[#CBD5E1] flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#15803D] animate-pulse"></span>
                    <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                      {isAr ? "مركز قيادة المواد (BIM Command)" : "BIM Command Core"}
                    </span>
                  </div>

                  {/* 4 Interactive Tabs */}
                  <div className="flex items-center gap-1 bg-[#E2E8F0] p-1 rounded-lg border border-[#CBD5E1] text-[11px] font-medium">
                    <button
                      onClick={() => setHeroTab('yard')}
                      className={`px-3 py-1.5 rounded-md transition-all ${
                        heroTab === 'yard'
                          ? 'bg-white text-[#E85312] shadow-xs font-bold'
                          : 'text-[#64748B] hover:text-[#0F172A]'
                      }`}
                    >
                      {isAr ? "ساحة التشوين" : "Site Yard"}
                    </button>
                    <button
                      onClick={() => setHeroTab('twin')}
                      className={`px-3 py-1.5 rounded-md transition-all ${
                        heroTab === 'twin'
                          ? 'bg-white text-[#E85312] shadow-xs font-bold'
                          : 'text-[#64748B] hover:text-[#0F172A]'
                      }`}
                    >
                      {isAr ? "التوأم الرقمي" : "BIM Twin"}
                    </button>
                    <button
                      onClick={() => setHeroTab('surplus')}
                      className={`px-3 py-1.5 rounded-md transition-all ${
                        heroTab === 'surplus'
                          ? 'bg-white text-[#E85312] shadow-xs font-bold'
                          : 'text-[#64748B] hover:text-[#0F172A]'
                      }`}
                    >
                      {isAr ? "شبكة الفائض" : "Surplus"}
                    </button>
                    <button
                      onClick={() => setHeroTab('waste')}
                      className={`px-3 py-1.5 rounded-md transition-all ${
                        heroTab === 'waste'
                          ? 'bg-white text-[#B91C1C] shadow-xs font-bold'
                          : 'text-[#64748B] hover:text-[#0F172A]'
                      }`}
                    >
                      {isAr ? "رادار الهدر" : "Waste AI"}
                    </button>
                  </div>
                </div>

                {/* Main Interactive Screen Area */}
                <div className="relative min-h-[420px] sm:h-[460px] bg-gradient-to-b from-[#F8FAFC] to-[#EEF2F6] overflow-hidden p-4 select-none">
                  
                  {/* Subtle Blueprint CAD Grid */}
                  <div className="absolute inset-0 opacity-40 pointer-events-none">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="card-cad-mesh" width="24" height="24" patternUnits="userSpaceOnUse">
                          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#CBD5E1" strokeWidth="0.6" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#card-cad-mesh)" />
                    </svg>
                  </div>

                  {/* TAB 0: REALISTIC STAGING YARD PHOTO VIEW (Figma Artboard 4) */}
                  {heroTab === 'yard' && (
                    <div className="relative h-full flex flex-col justify-between z-10 rounded-xl overflow-hidden p-1">
                      {/* Realistic Staging Yard Photo with Subtle Modern Overlay */}
                      <div className="absolute inset-0 z-0 rounded-xl overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=1200&auto=format&fit=crop&q=85" 
                          alt="IRAM Live Material Staging Yard" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/35 to-[#0F172A]/20"></div>
                      </div>

                      {/* Top Live Site Telemetry HUD Ribbon */}
                      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-[11px] shadow-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#15803D] animate-ping"></span>
                          <span className="font-extrabold text-[#0F172A]">
                            {isAr ? "ساحة تشوين المواد — كمبوند المنصورة" : "Active Staging Yard — Mansoura Sector B4"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-mono">
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                            {isAr ? "مخزون حي ومطابق" : "LIVE FEED"}
                          </span>
                        </div>
                      </div>

                      {/* Interactive Pinned Tags on the Realistic Yard */}
                      <div className="relative z-10 flex-1 flex flex-col justify-around py-2">
                        {/* Pin 1: Rebar Bundles */}
                        <div className="inline-flex items-center gap-2.5 bg-slate-900/90 backdrop-blur-md text-white px-3.5 py-2 rounded-xl border border-amber-400/60 shadow-lg text-xs max-w-[300px]">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shrink-0"></span>
                          <div>
                            <div className="font-bold text-amber-300">{isAr ? "تشوين حديد 16مم (ASTM A615)" : "Rebar Bundles 16mm"}</div>
                            <div className="text-[10px] text-slate-300 font-mono">140T Ready • QR Scan ID #IRAM-RB-90</div>
                          </div>
                        </div>

                        {/* Pin 2: Ready-Mix Pour Point */}
                        <div className="self-end inline-flex items-center gap-2.5 bg-slate-900/90 backdrop-blur-md text-white px-3.5 py-2 rounded-xl border border-emerald-400/60 shadow-lg text-xs max-w-[300px]">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                          <div>
                            <div className="font-bold text-emerald-300">{isAr ? "صب خرسانة سقف الدور الرابع" : "4th Floor Pour Scheduled"}</div>
                            <div className="text-[10px] text-slate-300 font-mono">320 m³ C35 • ETA 08:00 AM Tomorrow</div>
                          </div>
                        </div>

                        {/* Pin 3: Tower Crane */}
                        <div className="inline-flex items-center gap-2.5 bg-slate-900/90 backdrop-blur-md text-white px-3.5 py-2 rounded-xl border border-blue-400/60 shadow-lg text-xs max-w-[300px]">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shrink-0"></span>
                          <div>
                            <div className="font-bold text-blue-300">{isAr ? "رافعة برجية #02 (Liebherr 25T)" : "Tower Crane #02 (25T Limit)"}</div>
                            <div className="text-[10px] text-slate-300 font-mono">Operating Load: 18.4T (Safe Margin)</div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Real-time Telemetry Bar */}
                      <div className="relative z-10 grid grid-cols-3 gap-2 bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-[#CBD5E1] shadow-sm text-center">
                        <div>
                          <span className="text-[10px] text-[#475569] block font-bold">{isAr ? "حالة الساحة" : "Yard Status"}</span>
                          <span className="text-xs font-mono font-black text-[#15803D]">{isAr ? "تشوين منظم" : "Optimal Staged"}</span>
                        </div>
                        <div className="border-x border-slate-200">
                          <span className="text-[10px] text-[#475569] block font-bold">{isAr ? "فائض متاح للمناقلة" : "Surplus Match"}</span>
                          <span className="text-xs font-mono font-black text-[#E85312]">+90T {isAr ? "حديد" : "Rebar"}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#475569] block font-bold">{isAr ? "دقة الجرد" : "Accuracy"}</span>
                          <span className="text-xs font-mono font-black text-[#0F172A]">98.4%</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 1: DIGITAL TWIN VIEW */}
                  {heroTab === 'twin' && (
                    <div className="relative h-full flex flex-col justify-between z-10">
                      
                      {/* Top Live Site Telemetry HUD Ribbon */}
                      <div className="flex flex-wrap items-center justify-between gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-[11px] shadow-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#15803D] animate-ping"></span>
                          <span className="font-extrabold text-[#0F172A]">
                            {isAr ? "موقع العمل: كمبوند المنصورة السكني (Sector B4)" : "Site: Mansoura Residential Complex (Sector B4)"}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] font-mono text-[#475569]">
                          <span className="text-[#E85312] font-bold">Crane #02: 18.4T / 25T Limit</span>
                          <span className="hidden sm:inline">• Wind: 12 km/h (Safe)</span>
                        </div>
                      </div>

                      {/* Vector 3D Isometric Construction Site & Heavy Crane */}
                      <div className="relative flex-1 my-1">
                        <svg className="w-full h-full" viewBox="0 0 580 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            {/* Gradients */}
                            <linearGradient id="craneMastGrad" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#D97706" />
                              <stop offset="50%" stopColor="#F59E0B" />
                              <stop offset="100%" stopColor="#B45309" />
                            </linearGradient>
                            <linearGradient id="craneJibGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#EA580C" />
                              <stop offset="100%" stopColor="#C2410C" />
                            </linearGradient>
                            <linearGradient id="glassWallGrad" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.45" />
                            </linearGradient>
                            <linearGradient id="beamGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#3B82F6" />
                              <stop offset="100%" stopColor="#1D4ED8" />
                            </linearGradient>
                            <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#E2E8F0" />
                              <stop offset="100%" stopColor="#CBD5E1" />
                            </linearGradient>
                            <pattern id="rebarMesh" width="6" height="6" patternUnits="userSpaceOnUse">
                              <path d="M 6 0 L 0 0 0 6" fill="none" stroke="#F59E0B" strokeWidth="0.8" />
                            </pattern>
                          </defs>

                          {/* 1. Ground Surface & Staging Concrete Pad */}
                          <polygon points="0,230 580,230 580,260 0,260" fill="url(#groundGrad)" />
                          <line x1="0" y1="230" x2="580" y2="230" stroke="#94A3B8" strokeWidth="1.5" />
                          <rect x="20" y="232" width="220" height="24" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" rx="2" />
                          
                          {/* 2. Staged Rebar Bundles on Ground */}
                          <g transform="translate(30, 234)">
                            <rect x="0" y="16" width="6" height="4" fill="#78350F" />
                            <rect x="45" y="16" width="6" height="4" fill="#78350F" />
                            <rect x="2" y="10" width="50" height="3" rx="1.5" fill="#475569" />
                            <rect x="2" y="13" width="50" height="3" rx="1.5" fill="#64748B" />
                            <rect x="4" y="7" width="46" height="3" rx="1.5" fill="#E85312" />
                            <rect x="6" y="4" width="42" height="3" rx="1.5" fill="#475569" />
                            <line x1="12" y1="4" x2="12" y2="16" stroke="#F59E0B" strokeWidth="1" />
                            <line x1="38" y1="4" x2="38" y2="16" stroke="#F59E0B" strokeWidth="1" />
                            <text x="56" y="14" fill="#334155" fontSize="6.5" fontWeight="bold" fontFamily="monospace">REBAR BUNDLE 16mm (14T)</text>
                          </g>

                          {/* 3. Cement Pallet Staged on Ground */}
                          <g transform="translate(170, 235)">
                            <rect x="0" y="14" width="26" height="4" fill="#78350F" rx="1" />
                            <rect x="2" y="8" width="22" height="6" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="0.5" rx="1" />
                            <rect x="3" y="2" width="20" height="6" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.5" rx="1" />
                            <text x="5" y="7" fill="#E85312" fontSize="5" fontWeight="bold">CEM I</text>
                          </g>

                          {/* 4. Construction High-Rise Structure (Multi-Level 3D Slabs & Columns) */}
                          <polygon points="310,230 560,230 550,240 320,240" fill="#000000" opacity="0.08" />
                          <rect x="340" y="45" width="210" height="185" fill="#1E293B" rx="3" />
                          <rect x="440" y="20" width="110" height="210" fill="#0F172A" rx="3" />

                          {/* Floor 1 (Ground / Mezzanine) */}
                          <rect x="330" y="195" width="230" height="6" fill="#64748B" stroke="#475569" strokeWidth="1" rx="1" />
                          <rect x="350" y="201" width="10" height="29" fill="#334155" />
                          <rect x="400" y="201" width="10" height="29" fill="#334155" />
                          <rect x="460" y="201" width="10" height="29" fill="#334155" />
                          <rect x="520" y="201" width="10" height="29" fill="#334155" />
                          <rect x="362" y="203" width="36" height="25" fill="url(#glassWallGrad)" stroke="#38BDF8" strokeWidth="0.5" rx="1" />
                          <rect x="412" y="203" width="46" height="25" fill="url(#glassWallGrad)" stroke="#38BDF8" strokeWidth="0.5" rx="1" />

                          {/* Floor 2 Slab */}
                          <rect x="330" y="155" width="230" height="6" fill="#94A3B8" stroke="#475569" strokeWidth="1" rx="1" />
                          <rect x="350" y="161" width="10" height="34" fill="#475569" />
                          <rect x="400" y="161" width="10" height="34" fill="#475569" />
                          <rect x="460" y="161" width="10" height="34" fill="#475569" />
                          <rect x="520" y="161" width="10" height="34" fill="#475569" />
                          <rect x="362" y="163" width="36" height="30" fill="url(#glassWallGrad)" stroke="#38BDF8" strokeWidth="0.5" rx="1" />
                          <rect x="412" y="163" width="46" height="30" fill="url(#glassWallGrad)" stroke="#38BDF8" strokeWidth="0.5" rx="1" />
                          <rect x="472" y="163" width="46" height="30" fill="url(#glassWallGrad)" stroke="#38BDF8" strokeWidth="0.5" rx="1" />

                          {/* Floor 3 Slab (Active Pour & Curing Zone) */}
                          <rect x="330" y="115" width="230" height="7" fill="#CBD5E1" stroke="#64748B" strokeWidth="1" rx="1" />
                          <rect x="350" y="122" width="10" height="33" fill="#64748B" />
                          <rect x="400" y="122" width="10" height="33" fill="#64748B" />
                          <rect x="460" y="122" width="10" height="33" fill="#64748B" />
                          <rect x="520" y="122" width="10" height="33" fill="#64748B" />
                          {/* Safety Guardrails Floor 3 */}
                          <line x1="330" y1="110" x2="560" y2="110" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 2" />
                          <line x1="330" y1="106" x2="560" y2="106" stroke="#F59E0B" strokeWidth="1.5" />
                          <line x1="340" y1="106" x2="340" y2="115" stroke="#F59E0B" strokeWidth="1.5" />
                          <line x1="390" y1="106" x2="390" y2="115" stroke="#F59E0B" strokeWidth="1.5" />
                          <line x1="440" y1="106" x2="440" y2="115" stroke="#F59E0B" strokeWidth="1.5" />
                          <line x1="490" y1="106" x2="490" y2="115" stroke="#F59E0B" strokeWidth="1.5" />

                          {/* Floor 4 Slab (Top Active Pour Zone with Exposed Rebars & Formwork) */}
                          <rect x="330" y="75" width="230" height="7" fill="#E2E8F0" stroke="#E85312" strokeWidth="1.5" rx="1" />
                          <rect x="350" y="82" width="10" height="33" fill="#94A3B8" />
                          <rect x="400" y="82" width="10" height="33" fill="#94A3B8" />
                          <rect x="460" y="82" width="10" height="33" fill="#94A3B8" />
                          <rect x="520" y="82" width="10" height="33" fill="#94A3B8" />
                          {/* Exposed Starter Rebars Sticking Up */}
                          <path d="M 352 75 L 352 60 M 355 75 L 355 58 M 358 75 L 358 61" stroke="#E85312" strokeWidth="1.5" />
                          <path d="M 402 75 L 402 60 M 405 75 L 405 58 M 408 75 L 408 61" stroke="#E85312" strokeWidth="1.5" />
                          <path d="M 462 75 L 462 60 M 465 75 L 465 58 M 468 75 L 468 61" stroke="#E85312" strokeWidth="1.5" />
                          <path d="M 522 75 L 522 60 M 525 75 L 525 58 M 528 75 L 528 61" stroke="#E85312" strokeWidth="1.5" />
                          
                          {/* Slab 4 Rebar Cage Mesh Texture */}
                          <rect x="335" y="71" width="120" height="4" fill="url(#rebarMesh)" stroke="#F59E0B" strokeWidth="0.5" />
                          <rect x="460" y="71" width="95" height="4" fill="url(#rebarMesh)" stroke="#F59E0B" strokeWidth="0.5" />
                          {/* Formwork Shuttering Panels */}
                          <rect x="332" y="75" width="22" height="18" fill="#D97706" opacity="0.8" rx="1" />

                          {/* Core Tower Above Roof */}
                          <rect x="440" y="25" width="100" height="50" fill="#0F172A" stroke="#334155" strokeWidth="1.5" rx="2" />
                          <rect x="450" y="35" width="14" height="20" fill="#1E293B" rx="1" />
                          <rect x="475" y="35" width="14" height="20" fill="#1E293B" rx="1" />
                          <rect x="500" y="35" width="14" height="20" fill="#1E293B" rx="1" />
                          <rect x="525" y="35" width="10" height="20" fill="#38BDF8" opacity="0.6" rx="1" />

                          {/* 5. Heavy Tower Crane (Liebherr Architecture) */}
                          {/* Crane Foundation Base */}
                          <path d="M 85 230 L 145 230 L 135 225 L 95 225 Z" fill="#334155" />
                          <rect x="108" y="225" width="14" height="6" fill="#1E293B" />
                          {/* Mast Lattice Pillars */}
                          <rect x="108" y="16" width="4" height="210" fill="#D97706" />
                          <rect x="122" y="16" width="4" height="210" fill="#D97706" />
                          {/* Diagonal Cross Braces */}
                          <path d="M 108 225 L 122 205 M 122 225 L 108 205 M 108 205 L 122 185 M 122 205 L 108 185 M 108 185 L 122 165 M 122 185 L 108 165 M 108 165 L 122 145 M 122 165 L 108 145 M 108 145 L 122 125 M 122 145 L 108 125 M 108 125 L 122 105 M 122 125 L 108 105 M 108 105 L 122 85 M 122 105 L 108 85 M 108 85 L 122 65 M 122 85 L 108 65 M 108 65 L 122 45 M 122 65 L 108 45 M 108 45 L 122 25 M 122 45 L 108 25 M 108 25 L 122 16" stroke="#B45309" strokeWidth="1.5" />
                          <line x1="115" y1="20" x2="115" y2="225" stroke="#78350F" strokeWidth="0.75" strokeDasharray="2 2" />

                          {/* Slew Ring & Turntable */}
                          <rect x="104" y="13" width="26" height="5" rx="1.5" fill="#1E293B" stroke="#F59E0B" strokeWidth="1" />
                          {/* Operator Cabin */}
                          <polygon points="126,13 138,13 136,25 126,25" fill="#0F172A" stroke="#38BDF8" strokeWidth="1" />
                          <rect x="127" y="15" width="9" height="7" fill="#38BDF8" opacity="0.8" rx="1" />
                          <circle cx="131" cy="18" r="1.5" fill="#FFFFFF" />

                          {/* Crane Apex Peak */}
                          <polygon points="115,0 106,13 124,13" fill="#EA580C" stroke="#B45309" strokeWidth="1" />

                          {/* Counter-Jib & Weights */}
                          <polygon points="106,13 25,13 25,18 106,18" fill="#D97706" stroke="#92400E" strokeWidth="1" />
                          <rect x="27" y="15" width="18" height="12" fill="#475569" stroke="#1E293B" strokeWidth="1" rx="1" />
                          <rect x="47" y="15" width="14" height="12" fill="#64748B" stroke="#1E293B" strokeWidth="1" rx="1" />
                          <line x1="115" y1="0" x2="35" y2="13" stroke="#94A3B8" strokeWidth="1.5" />

                          {/* Main Front Jib Arm */}
                          <polygon points="124,13 540,13 540,16 124,18" fill="#EA580C" stroke="#B45309" strokeWidth="1.5" />
                          <path d="M 124 18 L 160 13 M 160 18 L 200 13 M 200 18 L 240 13 M 240 18 L 280 13 M 280 18 L 320 13 M 320 18 L 360 13 M 360 18 L 400 13 M 400 18 L 440 13 M 440 18 L 480 13 M 480 18 L 520 13 M 520 18 L 540 13" stroke="#D97706" strokeWidth="1" />
                          <line x1="115" y1="0" x2="260" y2="13" stroke="#94A3B8" strokeWidth="1.5" />
                          <line x1="115" y1="0" x2="420" y2="13" stroke="#94A3B8" strokeWidth="1.5" />
                          <circle cx="540" cy="13" r="2.5" fill="#EF4444" />
                          <circle cx="115" cy="0" r="2.5" fill="#EF4444" />

                          {/* Hoist Trolley */}
                          <rect x="272" y="16" width="18" height="6" fill="#1E293B" stroke="#F59E0B" strokeWidth="1" rx="1" />
                          <circle cx="275" cy="16" r="1.5" fill="#D97706" />
                          <circle cx="287" cy="16" r="1.5" fill="#D97706" />

                          {/* Hoist Cables */}
                          <line x1="277" y1="22" x2="277" y2="88" stroke="#475569" strokeWidth="1.2" strokeDasharray="3 1" />
                          <line x1="285" y1="22" x2="285" y2="88" stroke="#475569" strokeWidth="1.2" strokeDasharray="3 1" />

                          {/* Hook Assembly & Slings */}
                          <polygon points="274,88 288,88 284,100 278,100" fill="#F59E0B" stroke="#1E293B" strokeWidth="1" />
                          <path d="M 281 100 Q 281 110 275 108 Q 272 104 276 100" stroke="#1E293B" strokeWidth="2" fill="none" />
                          <line x1="278" y1="106" x2="225" y2="120" stroke="#64748B" strokeWidth="1.2" />
                          <line x1="284" y1="106" x2="335" y2="120" stroke="#64748B" strokeWidth="1.2" />

                          {/* 6. Hoisted Heavy Structural Steel Girder (HEB-400) */}
                          <g transform="translate(210, 118)">
                            <polygon points="0,0 140,0 145,3 5,3" fill="#60A5FA" />
                            <rect x="5" y="3" width="135" height="11" fill="url(#beamGrad)" stroke="#1D4ED8" strokeWidth="0.75" rx="1" />
                            <polygon points="5,14 140,14 135,17 0,17" fill="#1E3A8A" />
                            
                            {/* HUD Tag on Beam */}
                            <rect x="16" y="5" width="112" height="7.5" fill="#0F172A" fillOpacity="0.88" rx="1.5" />
                            <text x="20" y="11" fill="#38BDF8" fontSize="5.5" fontWeight="bold" fontFamily="monospace">
                              [BIM] HEB-400 GIRDER • 18.4T (SAFE)
                            </text>
                          </g>

                          {/* 7. Interactive Smart BIM Sensors */}
                          {/* SENSOR 1: Top Floor 4 (Pour Milestone) */}
                          <g className="cursor-pointer" onClick={() => setActiveZone('zone-a')}>
                            <circle cx="370" cy="78" r="16" fill="#15803D" fillOpacity="0.25" className="animate-ping" />
                            <circle cx="370" cy="78" r="8" fill="#15803D" stroke="#FFFFFF" strokeWidth="2" />
                            <circle cx="370" cy="78" r="3" fill="#DCFCE7" />
                          </g>

                          {/* SENSOR 2: Floor 2 (IoT Concrete Curing Sensor) */}
                          <g className="cursor-pointer" onClick={() => setActiveZone('zone-b')}>
                            <circle cx="480" cy="158" r="14" fill="#E85312" fillOpacity="0.25" className="animate-ping" />
                            <circle cx="480" cy="158" r="7" fill="#E85312" stroke="#FFFFFF" strokeWidth="2" />
                            <circle cx="480" cy="158" r="2.5" fill="#FEF3C7" />
                          </g>

                          {/* SENSOR 3: Ground Staging Yard (RFID Material Tag) */}
                          <g className="cursor-pointer">
                            <circle cx="65" cy="235" r="12" fill="#2563EB" fillOpacity="0.25" className="animate-ping" />
                            <circle cx="65" cy="235" r="6" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                            <circle cx="65" cy="235" r="2" fill="#DBEAFE" />
                          </g>
                        </svg>

                        {/* Interactive Floating Inspection Card when a Zone is Active */}
                        {activeZone === 'zone-a' && (
                          <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-emerald-300 shadow-md text-xs space-y-1.5 animate-in fade-in max-w-[260px]">
                            <div className="flex items-center justify-between text-emerald-800 font-bold">
                              <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span>{isAr ? "المنطقة B4: سقف الدور الرابع" : "Zone B4: 4th Floor Slab"}</span>
                              </span>
                              <span className="font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[11px] font-black">98% PASS</span>
                            </div>
                            <p className="text-[#334155] leading-relaxed font-medium">
                              {isAr ? "تم اعتماد فحص شبكة حديد التسليح وشهادات الشد. موعد صب 320 م³ خرسانة C35 غداً 08:00 ص." : "Rebar mesh inspected and passed. 320 m³ ready-mix pour scheduled."}
                            </p>
                          </div>
                        )}

                        {activeZone === 'zone-b' && (
                          <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-orange-300 shadow-md text-xs space-y-1.5 animate-in fade-in max-w-[260px]">
                            <div className="flex items-center justify-between text-orange-900 font-bold">
                              <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                                <span>{isAr ? "المنطقة A2: معالجة الأعمدة" : "Zone A2: Curing Columns"}</span>
                              </span>
                              <span className="font-mono bg-orange-100 text-orange-800 px-2 py-0.5 rounded text-[11px] font-black">31.5°C</span>
                            </div>
                            <p className="text-[#334155] leading-relaxed font-medium">
                              {isAr ? "مستشعر المعالجة الذكي: قوة كسر الخرسانة الحالية 28.4 MPa (جاهزة لفك الشدات غداً)." : "IoT maturity sensor: 28.4 MPa strength reached (ready for formwork stripping)."}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Bottom Stockpile Telemetry Gauges */}
                      <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-[#CBD5E1] bg-white p-3 rounded-xl shadow-xs">
                        <div className="bg-[#EEF2F6] p-2.5 rounded-lg border border-[#CBD5E1] text-center">
                          <span className="text-xs text-[#475569] font-bold block">{isAr ? "حديد التسليح 16مم" : "Rebar 16mm"}</span>
                          <span className="text-sm font-mono font-black text-[#15803D] block mt-0.5">92% {isAr ? "متوفر بالموقع" : "In Stock"}</span>
                          <span className="text-[11px] text-[#64748B] block font-mono mt-0.5 font-bold">48.5 Tons Ready</span>
                        </div>
                        <div className="bg-[#FEF3C7] p-2.5 rounded-lg border border-amber-300 text-center">
                          <span className="text-xs text-amber-900 font-bold block">{isAr ? "خرسانة جاهزة C35" : "Ready-Mix C35"}</span>
                          <span className="text-sm font-mono font-black text-amber-900 block mt-0.5">{isAr ? "صب خلال 4س" : "Pour in 4h"}</span>
                          <span className="text-[11px] text-amber-800 block font-mono mt-0.5 font-bold">320 m³ Ordered</span>
                        </div>
                        <div className="bg-[#EEF2F6] p-2.5 rounded-lg border border-[#CBD5E1] text-center">
                          <span className="text-xs text-[#475569] font-bold block">{isAr ? "الشدات المعدنية" : "Formwork System"}</span>
                          <span className="text-sm font-mono font-black text-[#1D4ED8] block mt-0.5">100% {isAr ? "معتمدة" : "Inspected"}</span>
                          <span className="text-[11px] text-[#64748B] block font-mono mt-0.5 font-bold">Safety Check Pass</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: SURPLUS REALLOCATION VISUALIZATION */}
                  {heroTab === 'surplus' && (
                    <div className="relative h-full flex flex-col justify-between z-10 py-1 space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold pb-2 border-b border-[#CBD5E1]">
                        <span className="text-[#E85312] flex items-center gap-1.5">
                          <ArrowRightLeft className="w-4 h-4" />
                          {isAr ? "محرك المناقلة الداخلي الذكي" : "Sister Site Surplus Engine"}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-[#15803D] border border-emerald-200 font-mono text-[10px]">
                          +$45,550 Net Saving
                        </span>
                      </div>

                      {/* Interactive Transfer Route Diagram */}
                      <div className="flex-1 flex flex-col justify-center space-y-4">
                        <div className="flex items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-[#CBD5E1] shadow-xs">
                          <div className="text-right">
                            <span className="text-[10px] text-[#E85312] font-bold block">{isAr ? "الموقع المصدر (فائض)" : "Origin Site (Surplus)"}</span>
                            <h4 className="font-bold text-xs text-[#0F172A]">{isAr ? "برج العاصمة الإدارية D04" : "New Capital Tower"}</h4>
                            <span className="text-[10px] font-mono text-[#15803D]">+90 Tons Rebar 16mm</span>
                          </div>

                          <div className="flex-1 flex flex-col items-center px-2">
                            <span className="text-[9px] font-mono text-[#64748B] mb-1">{isAr ? "نقل عبر أسطول الشركة" : "Internal Dispatch"}</span>
                            <div className="w-full h-1 bg-[#E2E8F0] relative rounded-full overflow-hidden">
                              <div className="absolute inset-y-0 left-0 bg-[#E85312] w-2/3 animate-pulse"></div>
                            </div>
                            <span className="text-[9px] font-mono text-[#E85312] mt-1">🚚 50 Tons In-Transit</span>
                          </div>

                          <div className="text-left">
                            <span className="text-[10px] text-[#B91C1C] font-bold block">{isAr ? "الموقع المستلم (عجز)" : "Destination Site (Shortage)"}</span>
                            <h4 className="font-bold text-xs text-[#0F172A]">{isAr ? "مستشفى المنصورة الجامعي" : "Mansoura Hospital"}</h4>
                            <span className="text-[10px] font-mono text-[#B91C1C]">-50 Tons Needed</span>
                          </div>
                        </div>

                        <div className="p-3 bg-white rounded-xl border border-[#CBD5E1] text-xs flex items-center justify-between shadow-xs">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-[#15803D]" />
                            <span className="text-[#0F172A] text-[11px]">
                              {isAr ? "تم تجنب أمر شراء خارجي جديد بقيمة 1,850,000 ج.م" : "Avoided redundant external PO of $45,550"}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-[#64748B]">{isAr ? "زمن التسليم: 3 ساعات" : "ETA: 3h"}</span>
                        </div>
                      </div>

                      <div className="text-[10px] text-center text-[#64748B] font-mono">
                        {isAr ? "تطابق تلقائي بنسبة 100% مع المواصفات الفنية ASTM A615" : "100% Technical Match with ASTM A615 Standard"}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: WASTE PREDICTION RADAR */}
                  {heroTab === 'waste' && (
                    <div className="relative h-full flex flex-col justify-between z-10 py-1 space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold pb-2 border-b border-[#CBD5E1]">
                        <span className="text-[#B91C1C] flex items-center gap-1.5">
                          <TrendingDown className="w-4 h-4" />
                          {isAr ? "تنبؤ الهدر الإنشائي (FR-WP-04)" : "Waste Anomaly Model FR-WP-04"}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-[#FEE2E2] text-[#B91C1C] border border-red-200 font-mono text-[10px] uppercase font-bold">
                          High Risk Flagged
                        </span>
                      </div>

                      <div className="flex-1 flex flex-col justify-center space-y-3">
                        <div className="bg-white p-3.5 rounded-xl border border-[#CBD5E1] space-y-2.5 shadow-xs">
                          <div className="flex justify-between text-xs">
                            <span className="text-[#0F172A] font-bold">{isAr ? "نشاط التفتيش: صب أعمدة الدور الرابع" : "Activity: 4th Floor Columns Fabrication"}</span>
                            <span className="text-[#B91C1C] font-mono font-bold">+3.5% {isAr ? "فوق المعيار" : "Over Baseline"}</span>
                          </div>

                          {/* Comparison Progress Bars */}
                          <div className="space-y-1.5 text-[10px] font-mono">
                            <div className="flex justify-between text-[#64748B]">
                              <span>{isAr ? "الهدر المتوقع بالذكاء الاصطناعي:" : "Predicted Waste:"}</span>
                              <span className="text-[#B91C1C] font-bold">11.2 Tons (8.0%)</span>
                            </div>
                            <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-amber-400 to-[#B91C1C] w-4/5"></div>
                            </div>

                            <div className="flex justify-between text-[#64748B] pt-1">
                              <span>{isAr ? "الحد الهندسي المقبول (Baseline):" : "Allowed Tolerance:"}</span>
                              <span className="text-[#0F172A]">4.5% Standard</span>
                            </div>
                            <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                              <div className="h-full bg-[#15803D] w-[45%]"></div>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 bg-[#FEF3C7] rounded-lg border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <span>
                            <strong>{isAr ? "توصية الـ AI:" : "AI Directive:"}</strong> {isAr ? "تفعيل برمجية BBS 1D واستغلال فضلات الحديد > 1.8م في تسليح السلالم لتفادي هدر 68,000 ج.م." : "Mandate BBS 1D cutting plan and reuse off-cuts >1.8m for stair reinforcement."}
                          </span>
                        </div>
                      </div>

                      <div className="text-[10px] text-center text-[#64748B] font-mono">
                        XGBoost Inference • Validated on 18,400 Historic Pours
                      </div>
                    </div>
                  )}

                </div>

                {/* Card Bottom Interactive Footer */}
                <div className="p-3 bg-[#EEF2F6] border-t border-[#CBD5E1] flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2 text-[#475569]">
                    <ShieldCheck className="w-4 h-4 text-[#15803D]" />
                    <span className="font-semibold">{isAr ? "حماية وتشفير بيانات المشاريع" : "Isolated Tenant Encryption"}</span>
                  </div>

                  <button
                    onClick={onExploreDashboard}
                    className="text-[#E85312] hover:text-[#CC490F] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>{isAr ? "افتح لوحة التحكم المباشرة" : "Open Live View"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* Floating Bottom Left Badge */}
              <div className="absolute -bottom-4 -left-2 z-30 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-blue-300 shadow-md text-xs font-bold text-blue-900">
                <Truck className="w-4 h-4 text-[#1D4ED8]" />
                <span>{isAr ? "3 شاحنات توريد في الطريق • تتبع GPS" : "3 Ready-Mix Trucks En Route • GPS Active"}</span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. SOLUTIONS & SERVICES (What We Offer - Comprehensive Grid) */}
      {/* ============================================================== */}
      <section id="services" className="py-20 bg-white border-t border-[#CBD5E1]">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E85312] px-3.5 py-1 rounded-full bg-[#FEECE5] border border-[#E85312]/30">
              {isAr ? "خدمات وحلول المنصة (WHAT WE DELIVER)" : "ENTERPRISE SOLUTIONS & SERVICES"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-3 text-[#0F172A]">
              {isAr ? "حلول ذكية تعيد هندسة إدارة مواد البناء عبر شركتك" : "Intelligent Lifecycle Solutions For Construction Contractors"}
            </h2>
            <p className="text-sm text-[#475569] font-medium mt-2">
              {isAr 
                ? "من لحظة اعتماد جداول الكميات وطرح المناقصات وحتى الصب الميداني وتدوير الفائض — منظومة رقمية تغلق دائرة الهدر المالي."
                : "From BOQ planning to site pour execution and circular surplus reuse — an integrated operating system."}
            </p>

            {/* Interactive Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
              {[
                { id: 'all', labelAr: 'جميع الحلول (6)', labelEn: 'All Solutions (6)' },
                { id: 'surplus', labelAr: 'مناقلة الفائض الداخلي', labelEn: 'Surplus Engine' },
                { id: 'waste', labelAr: 'التنبؤ بالهدر (FR-WP)', labelEn: 'AI Waste (FR-WP)' },
                { id: 'procurement', labelAr: 'المشتريات والموردين', labelEn: 'Procurement' },
                { id: 'warehouse', labelAr: 'المخازن والمطابقة الذكية', labelEn: 'Vision & Yard' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setServiceFilter(f.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    serviceFilter === f.id
                      ? 'bg-[#E85312] text-white shadow-xs font-bold'
                      : 'bg-[#EEF2F6] border border-[#CBD5E1] text-[#334155] hover:text-[#0F172A] hover:bg-[#E2E8F0]'
                  }`}
                >
                  {isAr ? f.labelAr : f.labelEn}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Surplus Reallocation */}
            {(serviceFilter === 'all' || serviceFilter === 'surplus') && (
              <div className="p-7 rounded-xl bg-[#EEF2F6] hover:bg-white border border-[#CBD5E1] hover:border-[#E85312] hover:shadow-card-hover transition-all duration-200 group flex flex-col justify-between shadow-xs">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FEECE5] text-[#E85312] flex items-center justify-center transition-transform group-hover:scale-105">
                    <ArrowRightLeft className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#E85312] transition-colors">
                    {isAr ? "محرك إعادة توزيع الفائض اللحظي" : "Internal Surplus Reallocation Engine"}
                  </h3>
                  <p className="text-sm text-[#334155] leading-[1.7] font-medium">
                    {isAr 
                      ? "فحص دوري لفوائض حديد التسليح والأسمنت والمواسير عبر المشروعات المنتهية ومطابقتها آلياً مع احتياجات المشروعات الجديدة قبل إصدار أوامر شراء جديدة."
                      : "Automatically match idle surplus from completed phases with active project demands before authorizing external procurement."}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[#CBD5E1] flex items-center justify-between text-xs">
                  <span className="text-[#15803D] font-bold">{isAr ? "توفير يصل إلى 28%" : "Up to 28% Savings"}</span>
                  <span className="text-[#475569] font-mono font-bold">Zero Idle Assets</span>
                </div>
              </div>
            )}

            {/* Card 2: AI Waste Prediction */}
            {(serviceFilter === 'all' || serviceFilter === 'waste') && (
              <div className="p-7 rounded-xl bg-[#EEF2F6] hover:bg-white border border-[#CBD5E1] hover:border-[#E85312] hover:shadow-card-hover transition-all duration-200 group flex flex-col justify-between shadow-xs">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FEECE5] text-[#E85312] flex items-center justify-center transition-transform group-hover:scale-105">
                    <TrendingDown className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#E85312] transition-colors">
                    {isAr ? "التنبؤ بهدر المواد بالذكاء الاصطناعي" : "AI Material Waste Prediction (FR-WP)"}
                  </h3>
                  <p className="text-sm text-[#334155] leading-[1.7] font-medium">
                    {isAr 
                      ? "نماذج تعلم آلي تحلل استهلاك صب الخرسانة وتفريد حديد التسليح وتكتشف انحرافات الاستهلاك الشاذة مبكراً مع توصيات هندسية لتقليل الهدر الميداني."
                      : "Machine learning models analyze concrete pours and rebar cutting schedules to flag abnormal consumption and prevent field losses."}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[#CBD5E1] flex items-center justify-between text-xs">
                  <span className="text-[#B91C1C] font-bold">{isAr ? "-34% هدر ميداني" : "-34% Field Waste"}</span>
                  <span className="text-[#475569] font-mono font-bold">SRS FR-WP-01/10</span>
                </div>
              </div>
            )}

            {/* Card 3: AI Procurement */}
            {(serviceFilter === 'all' || serviceFilter === 'procurement') && (
              <div className="p-7 rounded-xl bg-[#EEF2F6] hover:bg-white border border-[#CBD5E1] hover:border-[#E85312] hover:shadow-card-hover transition-all duration-200 group flex flex-col justify-between shadow-xs">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] text-[#15803D] flex items-center justify-center transition-transform group-hover:scale-105">
                    <Truck className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#15803D] transition-colors">
                    {isAr ? "المشتريات الذكية ومناقصات الموردين" : "AI Smart Procurement & Bidding"}
                  </h3>
                  <p className="text-sm text-[#334155] leading-[1.7] font-medium">
                    {isAr 
                      ? "طرح طلبات عروض الأسعار (RFQs) لمصانع التوريد المعتمدة، مقارنة العروض بذكاء متعدد المعايير (السعر، موعد الصب، الجودة، شروط الدفع)، وإصدار الـ POs."
                      : "Publish RFQs to verified suppliers, rank quotations using multi-criteria AI scoring, and dispatch binding Purchase Orders."}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[#CBD5E1] flex items-center justify-between text-xs">
                  <span className="text-[#15803D] font-bold">{isAr ? "تسريع البت بنسبة 80%" : "80% Faster Sourcing"}</span>
                  <span className="text-[#475569] font-mono font-bold">Direct PO Dispatch</span>
                </div>
              </div>
            )}

            {/* Card 4: AI Document OCR */}
            {(serviceFilter === 'all' || serviceFilter === 'warehouse') && (
              <div className="p-7 rounded-xl bg-[#EEF2F6] hover:bg-white border border-[#CBD5E1] hover:border-[#E85312] hover:shadow-card-hover transition-all duration-200 group flex flex-col justify-between shadow-xs">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#DBEAFE] text-[#1D4ED8] flex items-center justify-center transition-transform group-hover:scale-105">
                    <ScanLine className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#1D4ED8] transition-colors">
                    {isAr ? "المسح الضوئي الذكي لبوالص الشحن (OCR)" : "AI Document OCR Vision"}
                  </h3>
                  <p className="text-sm text-[#334155] leading-[1.7] font-medium">
                    {isAr 
                      ? "مسح بوالص الشحن وأذونات الاستلام الورقية بكاميرا الهاتف في ساحة التشوين واستخراج الكميات والمورد ورقم الشحنة ومطابقتها التلقائية مع أمر التوريد."
                      : "Scan physical delivery notes and weighbridge slips via mobile camera to extract quantities and instantly reconcile against POs."}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[#CBD5E1] flex items-center justify-between text-xs">
                  <span className="text-[#1D4ED8] font-bold">{isAr ? "دقة استخراج 99.4%" : "99.4% Accuracy"}</span>
                  <span className="text-[#475569] font-mono font-bold">Arabic & English OCR</span>
                </div>
              </div>
            )}

            {/* Card 5: BOQ Sync */}
            {(serviceFilter === 'all' || serviceFilter === 'waste') && (
              <div className="p-7 rounded-xl bg-[#EEF2F6] hover:bg-white border border-[#CBD5E1] hover:border-[#E85312] hover:shadow-card-hover transition-all duration-200 group flex flex-col justify-between shadow-xs">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FEECE5] text-[#E85312] flex items-center justify-center transition-transform group-hover:scale-105">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#E85312] transition-colors">
                    {isAr ? "مزامنة جداول الكميات والـ ERP" : "BOQ & Project Schedules Sync"}
                  </h3>
                  <p className="text-sm text-[#334155] leading-[1.7] font-medium">
                    {isAr 
                      ? "استيراد جداول الكميات (Excel / Primavera / SAP) ومزامنة الاستهلاك الفعلي لحظياً لاكتشاف أي اقتراب من حد الخطر قبل موعده بأسبوعين."
                      : "Ingest BOQs and sync consumption velocity with construction milestones to predict shortages 14 days ahead."}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[#CBD5E1] flex items-center justify-between text-xs">
                  <span className="text-[#E85312] font-bold">{isAr ? "إنذار مبكر 14 يوماً" : "14-Day Early Warning"}</span>
                  <span className="text-[#475569] font-mono font-bold">Excel & ERP API</span>
                </div>
              </div>
            )}

            {/* Card 6: Executive Analytics */}
            {(serviceFilter === 'all' || serviceFilter === 'surplus' || serviceFilter === 'procurement') && (
              <div className="p-7 rounded-xl bg-[#EEF2F6] hover:bg-white border border-[#CBD5E1] hover:border-[#E85312] hover:shadow-card-hover transition-all duration-200 group flex flex-col justify-between shadow-xs">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] text-amber-800 flex items-center justify-center transition-transform group-hover:scale-105">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#E85312] transition-colors">
                    {isAr ? "التحليلات المؤسسية والرقابة التنفيذية" : "Executive Multi-Site Analytics"}
                  </h3>
                  <p className="text-sm text-[#334155] leading-[1.7] font-medium">
                    {isAr 
                      ? "لوحة تحكم مركزية لصاحب الشركة والإدارة العليا لمتابعة مؤشرات أداء المشروعات، رصيد المواد بالملايين، وحجم الوفر المحقق في كل موقع."
                      : "Real-time visibility for owners and executives across all job sites, measuring avoided purchase fees and capital utilization."}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[#CBD5E1] flex items-center justify-between text-xs">
                  <span className="text-[#15803D] font-bold">{isAr ? "رؤية 360° لجميع المواقع" : "360° Portfolio View"}</span>
                  <span className="text-[#475569] font-mono font-bold">Executive KPIs</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. INTERACTIVE ROI & COST SAVINGS CALCULATOR */}
      {/* ============================================================== */}
      <section id="roi-calculator" className="py-20 bg-[#EEF2F6] border-t border-[#CBD5E1]">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E85312] px-3.5 py-1 rounded-full bg-[#FEECE5] border border-[#E85312]/30">
              {isAr ? "حاسبة العائد الاستثماري التفاعلية" : "INTERACTIVE VALUE ESTIMATOR"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-3 text-[#0F172A]">
              {isAr ? "كم ستوفر شركتك سنوياً مع IRAM؟" : "Calculate Your Annual Financial Savings"}
            </h2>
            <p className="text-sm text-[#475569] font-medium mt-2">
              {isAr 
                ? "حرك المؤشرات لاحتساب الوفورات التقديرية الناتجة عن استغلال الفائض وتفادي الشراء المكرر وضبط الهدر بالذكاء الاصطناعي."
                : "Adjust sliders to estimate capital recaptured from internal transfers, avoided rush purchases, and predictive waste reduction."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-2xl border border-[#CBD5E1] p-6 sm:p-10 shadow-sm">
            
            {/* Sliders Input Column */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Slider 1: Number of Active Construction Projects */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#E85312]" />
                    <span>{isAr ? "عدد مشاريع الشركة النشطة:" : "Number of Active Construction Projects:"}</span>
                  </label>
                  <span className="text-xl font-bold text-[#E85312] font-mono bg-[#FEECE5] px-3.5 py-1 rounded-lg border border-[#E85312]/20">
                    {calcProjectsCount} {isAr ? "مشاريع" : "Sites"}
                  </span>
                </div>
                <input 
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={calcProjectsCount}
                  onChange={(e) => setCalcProjectsCount(Number(e.target.value))}
                  className="w-full accent-[#E85312] cursor-pointer"
                />
                <div className="flex justify-between text-xs text-[#475569] font-mono font-bold mt-1">
                  <span>1 Project</span>
                  <span>10 Projects</span>
                  <span>20 Projects</span>
                </div>
              </div>

              {/* Slider 2: Annual Materials Budget per Project ($M) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-[#15803D]" />
                    <span>{isAr ? "متوسط ميزانية المواد السنوية لكل موقع:" : "Avg. Annual Materials Budget per Site:"}</span>
                  </label>
                  <span className="text-xl font-bold text-[#15803D] font-mono bg-[#DCFCE7] px-3.5 py-1 rounded-lg border border-emerald-200">
                    ${calcAnnualBudgetPerSite} Million
                  </span>
                </div>
                <input 
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={calcAnnualBudgetPerSite}
                  onChange={(e) => setCalcAnnualBudgetPerSite(Number(e.target.value))}
                  className="w-full accent-[#E85312] cursor-pointer"
                />
                <div className="flex justify-between text-xs text-[#475569] font-mono font-bold mt-1">
                  <span>$1M</span>
                  <span>$15M</span>
                  <span>$30M</span>
                </div>
              </div>

              {/* Breakdown List */}
              <div className="space-y-3 pt-4 border-t border-[#CBD5E1] text-sm">
                <div className="flex items-center justify-between text-[#334155] font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    {isAr ? "فائض مسترد بدلاً من شراء مكرر (4.8%):" : "Surplus Recovered (Internal Transfers):"}
                  </span>
                  <span className="font-mono font-bold text-[#0F172A]">${surplusSaved.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between text-[#334155] font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#15803D]"></span>
                    {isAr ? "تفادي تكاليف الشراء العاجل والتوقف (2.4%):" : "Avoided Emergency Purchasing Fees:"}
                  </span>
                  <span className="font-mono font-bold text-[#0F172A]">${emergencyProcurementAvoided.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between text-[#334155] font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#E85312]"></span>
                    {isAr ? "هدر تم تفاديه بالذكاء الاصطناعي (3.5%):" : "Predictive Waste Reduction (AI Models):"}
                  </span>
                  <span className="font-mono font-bold text-[#0F172A]">${wasteLossAvoided.toLocaleString()}</span>
                </div>
              </div>

            </div>

            {/* Total Results Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6 sm:p-8 rounded-xl text-center space-y-4 shadow-xl text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                {isAr ? "إجمالي العائد المالي السنوي المتوقع" : "PROJECTED ANNUAL NET SAVINGS"}
              </span>

              <div className="text-4xl sm:text-5xl font-bold text-white font-mono">
                ${totalNetSaving.toLocaleString()}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                {isAr
                  ? `بناءً على ${calcProjectsCount} مشاريع بميزانية إجمالية $${(totalBudget/1000000).toFixed(1)}M، تحقق منصة IRAM عائداً مالياً فورياً يفوق تكلفة الاشتراك بأضعاف مضاعفة.`
                  : `Across ${calcProjectsCount} active sites with a $${(totalBudget/1000000).toFixed(1)}M materials portfolio, IRAM delivers immediate ROI in the first quarter of deployment.`}
              </p>

              <button
                onClick={() => onOpenAuth('register')}
                className="w-full py-3.5 rounded-lg bg-[#E85312] hover:bg-[#CC490F] text-white font-medium text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isAr ? "ابدأ تجربة المشروع مع شركتك الآن" : "Start Corporate Pilot"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. THE 6-STEP CLOSED-LOOP LIFECYCLE (Interactive Step Showcase) */}
      {/* ============================================================== */}
      <section id="how-it-works" className="py-20 bg-white border-t border-[#CBD5E1]">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E85312] px-3.5 py-1 rounded-full bg-[#FEECE5] border border-[#E85312]/30">
              {isAr ? "منهجية إيرام المتكاملة (Core Value Proposition)" : "CORE VALUE PROPOSITION"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-3 text-[#0F172A]">
              {isAr ? "رؤية واحدة. قرارات أذكى لمواد البناء." : "One View. Smarter Material Decisions."}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-3 text-xs sm:text-sm font-black text-[#E85312]">
              <span className="px-3 py-1 rounded-full bg-[#EEF2F6] border border-[#CBD5E1] text-[#0F172A]">1. {isAr ? "توقع العجز مبكراً" : "Predict the shortage"}</span>
              <span>➔</span>
              <span className="px-3 py-1 rounded-full bg-[#EEF2F6] border border-[#CBD5E1] text-[#0F172A]">2. {isAr ? "فحص التوفر الداخلي أولاً" : "Check internal availability"}</span>
              <span>➔</span>
              <span className="px-3 py-1 rounded-full bg-[#EEF2F6] border border-[#CBD5E1] text-[#0F172A]">3. {isAr ? "شراء ما يلزم فقط" : "Procure what is needed"}</span>
              <span>➔</span>
              <span className="px-3 py-1 rounded-full bg-[#EEF2F6] border border-[#CBD5E1] text-[#0F172A]">4. {isAr ? "إعادة استغلال الفائض" : "Reuse the surplus"}</span>
            </div>
            <p className="text-xs text-[#475569] font-medium mt-3">
              {isAr ? "منظومة إيرام تجمع دورة حياة مواد البناء بالكامل في مسار قرارات موحد يمنع تكرار الشراء ويوقف الهدر الميداني." : "Iram connects shortage prediction, internal material allocation, external procurement, and surplus utilization into one decision-making process."}
            </p>
          </div>

          {/* Steps Horizontal Pill Selector */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8">
            {lifecycleSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveLifecycleStep(idx)}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  activeLifecycleStep === idx 
                    ? 'bg-[#E85312] text-white border-[#E85312] shadow-xs font-bold'
                    : 'bg-[#EEF2F6] border-[#CBD5E1] text-[#334155] hover:text-[#0F172A] hover:bg-[#E2E8F0] font-semibold'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-black">{step.num}</span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-md font-bold ${
                    activeLifecycleStep === idx ? 'bg-white/20 text-white' : 'bg-[#E2E8F0] text-[#0F172A]'
                  }`}>
                    {step.badge}
                  </span>
                </div>
                <div className="text-xs font-bold truncate">
                  {isAr ? step.titleAr : step.titleEn}
                </div>
              </button>
            ))}
          </div>

          {/* Active Step Showcase Card with Real Construction Photography */}
          <div className="bg-[#EEF2F6] rounded-2xl border border-[#CBD5E1] overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Step Details Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#CBD5E1] text-xs font-bold text-[#E85312]">
                <span>Phase {lifecycleSteps[activeLifecycleStep].num} of 06</span>
                <span>•</span>
                <span>{lifecycleSteps[activeLifecycleStep].metric}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
                {isAr ? lifecycleSteps[activeLifecycleStep].titleAr : lifecycleSteps[activeLifecycleStep].titleEn}
              </h3>

              <p className="text-sm text-[#334155] leading-relaxed font-medium">
                {isAr ? lifecycleSteps[activeLifecycleStep].descAr : lifecycleSteps[activeLifecycleStep].descEn}
              </p>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={onExploreDashboard}
                  className="px-5 py-2.5 rounded-lg bg-[#E85312] text-white text-xs font-bold hover:bg-[#CC490F] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>{isAr ? "معاينة هذا الموديول بالنظام" : "Explore in Workspace"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs text-[#475569] font-mono font-bold">
                  Compliant with SRS v2.0
                </span>
              </div>
            </div>

            {/* Step Photo Column */}
            <div className="lg:col-span-5 relative h-72 lg:h-96 bg-slate-900 overflow-hidden select-none">
              {/* Guaranteed Vector CAD Architectural Art */}
              <svg className="w-full h-full" viewBox="0 0 500 350" fill="none" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="step-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0F172A" />
                    <stop offset="100%" stopColor="#1E293B" />
                  </linearGradient>
                  <pattern id="step-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#step-bg)" />
                <rect width="100%" height="100%" fill="url(#step-grid)" opacity="0.4" />
                {/* Structural Concrete Beams & Steel Framework */}
                <line x1="80" y1="50" x2="80" y2="350" stroke="#E85312" strokeWidth="3" />
                <line x1="200" y1="50" x2="200" y2="350" stroke="#E85312" strokeWidth="3" />
                <line x1="320" y1="50" x2="320" y2="350" stroke="#E85312" strokeWidth="3" />
                <line x1="440" y1="50" x2="440" y2="350" stroke="#E85312" strokeWidth="3" />
                
                <rect x="40" y="90" width="440" height="14" rx="2" fill="#38BDF8" opacity="0.8" />
                <rect x="40" y="170" width="440" height="14" rx="2" fill="#38BDF8" opacity="0.8" />
                <rect x="40" y="250" width="440" height="14" rx="2" fill="#38BDF8" opacity="0.8" />
                
                {/* Tower Crane Top */}
                <line x1="360" y1="30" x2="360" y2="350" stroke="#F59E0B" strokeWidth="3" />
                <line x1="240" y1="40" x2="480" y2="40" stroke="#F59E0B" strokeWidth="2.5" />
                <line x1="360" y1="15" x2="390" y2="40" stroke="#F97316" strokeWidth="1.5" strokeDasharray="3 2" />
                <line x1="360" y1="15" x2="330" y2="40" stroke="#F97316" strokeWidth="1.5" strokeDasharray="3 2" />
                <line x1="420" y1="40" x2="420" y2="120" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="2 2" />
                <rect x="412" y="120" width="16" height="8" rx="2" fill="#E85312" />
              </svg>

              <img 
                src={lifecycleSteps[activeLifecycleStep].image} 
                alt="" 
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#F7F9FB] via-transparent to-transparent lg:block hidden"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#F7F9FB] via-transparent to-transparent lg:hidden block"></div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. LIVE MULTI-ROLE PERSONA EXPLORER (RBAC Dashboards) */}
      {/* ============================================================== */}
      <section id="personas" className="py-20 bg-[#EEF2F6] border-t border-[#CBD5E1]">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E85312] px-3.5 py-1 rounded-full bg-[#FEECE5] border border-[#E85312]/30">
              {isAr ? "الصلاحيات المحكمة وفصل الأدوار (RBAC)" : "ROLE-BASED ACCESS CONTROL (RBAC)"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-3 text-[#0F172A]">
              {isAr ? "شاشة مستقلة ومخصصة لكل مسؤول ومشرف" : "Dedicated Dashboards For Every Stakeholder"}
            </h2>
            <p className="text-sm text-[#475569] font-medium mt-2">
              {isAr
                ? "لا تداخل بين الصلاحيات؛ مسؤول الشركة، مدير المشروع، مهندس الموقع، مسؤول المشتريات، أمين المخزن، والموردون."
                : "Complete tenant isolation and site-level permissions — no mixed interfaces."}
            </p>
          </div>

          {/* Persona Tabs Row */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {personas.map(p => {
              const Icon = p.icon;
              const active = activePersonaTab === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePersonaTab(p.id)}
                  className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    active 
                      ? 'bg-[#E85312] text-white shadow-xs font-bold'
                      : 'bg-white border border-[#CBD5E1] text-[#334155] hover:text-[#0F172A] hover:bg-[#EEF2F6]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{p.role}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Persona Detail Banner */}
          {(() => {
            const currentP = personas.find(p => p.id === activePersonaTab) || personas[0];
            const Icon = currentP.icon;
            return (
              <div className="bg-white rounded-2xl border border-[#CBD5E1] p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-lg bg-[#FEECE5] text-[#E85312]">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-bold uppercase text-[#E85312] tracking-wider">
                      {currentP.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A] leading-snug">
                    {isAr ? currentP.titleAr : currentP.titleEn}
                  </h3>

                  <p className="text-sm sm:text-base text-[#334155] leading-[1.8] font-medium">
                    {isAr ? currentP.descAr : currentP.descEn}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => {
                        if (currentP.id === 'supplier') {
                          onExploreDashboard('Supplier');
                        } else if (currentP.id === 'pm') {
                          onExploreDashboard('Project Manager');
                        } else if (currentP.id === 'site') {
                          onExploreDashboard('Site Engineer');
                        } else if (currentP.id === 'procurement') {
                          onExploreDashboard('Procurement Officer');
                        } else if (currentP.id === 'warehouse') {
                          onExploreDashboard('Warehouse Officer');
                        } else {
                          onExploreDashboard('Company Admin');
                        }
                      }}
                      className="px-5 py-3 rounded-lg bg-[#E85312] hover:bg-[#CC490F] text-white text-sm font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>{isAr ? `تجربة دور (${currentP.role}) مباشرة` : `Test ${currentP.role} Workspace`}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => onOpenAuth('login')}
                      className="px-4 py-3 rounded-lg border border-[#CBD5E1] bg-[#EEF2F6] text-[#0F172A] hover:bg-[#E2E8F0] text-sm font-bold cursor-pointer"
                    >
                      {isAr ? "شاشة الدخول المستقلة" : "Open Dedicated Login"}
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-[#E2E8F0] bg-[#F8FAFC] p-4 shadow-xs select-none min-h-[260px] flex flex-col justify-between">
                  {/* Top Header of Simulated Mini-Screen */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse"></span>
                      <span className="font-bold text-[#0F172A] font-mono">{currentP.role} Workspace</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-[#FEECE5] text-[#E85312] border border-[#E85312]/20 text-[9px] font-bold uppercase font-mono">
                      LIVE SIMULATOR
                    </span>
                  </div>

                  {/* Dynamic Interactive Body Based on Selected Persona */}
                  <div className="py-3 flex-1 flex flex-col justify-center">
                    {currentP.id === 'admin' && (
                      <div className="space-y-2.5 text-xs">
                        <div className="flex justify-between items-center text-[11px] text-[#64748B] pb-1">
                          <span>{isAr ? "محفظة المشروعات المباشرة:" : "Active Enterprise Projects:"}</span>
                          <span className="text-[#15803D] font-bold font-mono">12 Sites • +3.8M EGP Saved</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white border border-[#E2E8F0] flex justify-between items-center shadow-xs">
                          <div>
                            <span className="font-bold text-[#0F172A] block">{isAr ? "برج العاصمة الإدارية D04" : "New Capital Tower"}</span>
                            <span className="text-[10px] text-[#64748B] font-mono">{isAr ? "نسبة الإنجاز 74% • وفورات 184k ج.م" : "Progress 74% • Saved $45.5k"}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded-md bg-[#DCFCE7] text-[#15803D] text-[10px] font-bold">Active</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white border border-[#E2E8F0] flex justify-between items-center shadow-xs">
                          <div>
                            <span className="font-bold text-[#0F172A] block">{isAr ? "مستشفى المنصورة التخصصي" : "Mansoura Hospital"}</span>
                            <span className="text-[10px] text-[#E85312] font-mono">{isAr ? "جاري استقبال مناقلة حديد 50 طن" : "Incoming 50T Rebar Transfer"}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded-md bg-[#FEECE5] text-[#E85312] text-[10px] font-bold">Syncing</span>
                        </div>
                      </div>
                    )}

                    {currentP.id === 'pm' && (
                      <div className="space-y-2.5 text-xs">
                        <div className="p-3 rounded-lg bg-white border border-amber-200 space-y-1.5 shadow-xs">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-amber-800 font-bold">{isAr ? "موعد الصب القادم (Milestone):" : "Next Milestone Pour:"}</span>
                            <span className="text-[#0F172A] font-mono">غداً 08:00 ص</span>
                          </div>
                          <div className="font-bold text-[#0F172A]">{isAr ? "سقف الدور الرابع - 320 م³ خرسانة جاهزة C35" : "4th Floor Slab - 320 m³ Ready-Mix C35"}</div>
                          <div className="flex items-center gap-1.5 text-[10px] text-[#15803D] font-mono">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{isAr ? "تم حجز 4 مضخات و16 خلاطة بالتنسيق الميداني" : "Allocated 4 pumps & 16 transit mixers"}</span>
                          </div>
                        </div>
                        <div className="p-2 bg-white rounded-lg border border-[#E2E8F0] text-[10px] text-[#64748B] font-mono text-center">
                          {isAr ? "ربط تلقائي مع جدول زمن المشروع في Primavera & Excel" : "Auto-synced with Primavera P6 project baseline"}
                        </div>
                      </div>
                    )}

                    {currentP.id === 'site' && (
                      <div className="space-y-2 text-xs">
                        <div className="p-2.5 rounded-lg bg-white border border-[#E2E8F0] shadow-xs">
                          <span className="text-[10px] text-[#64748B] block">{isAr ? "طلب احتياج مواد الموقع (Zone B):" : "Site Requisition (Zone B):"}</span>
                          <span className="font-bold text-[#0F172A] block mt-0.5">50 Tons High Tensile Rebar 16mm</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#DCFCE7] border border-emerald-200 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#15803D] shrink-0" />
                          <div className="text-[10px] text-emerald-900">
                            <strong>{isAr ? "تطابق فائض داخلي:" : "Sister Site Match:"}</strong> {isAr ? "تم العثور على 90 طن فائض بمشروع العاصمة! وفورات 140,000 ج.م" : "Found 90T surplus at Capital Tower! Saved $45.5k"}
                          </div>
                        </div>
                      </div>
                    )}

                    {currentP.id === 'procurement' && (
                      <div className="space-y-2 text-xs">
                        <div className="text-[10px] text-[#64748B] font-mono">{isAr ? "مقارنة عروض الأسعار (RFQ-0088):" : "Quotation Matrix (RFQ-0088):"}</div>
                        <div className="p-2 rounded-lg bg-[#DCFCE7] border border-emerald-200 flex justify-between items-center text-[11px]">
                          <div>
                            <span className="font-bold text-[#0F172A] block">{isAr ? "السويس للأسمنت (الفائز بالـ AI 🏆)" : "Suez Cement (AI Recommended 🏆)"}</span>
                            <span className="text-[9px] text-[#15803D] font-mono">{isAr ? "أفضل تكلفة واصلة • تسليم 24س" : "Lowest landed cost • 24h ETA"}</span>
                          </div>
                          <span className="font-mono font-bold text-[#15803D]">3,450 EGP/T</span>
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-[#E2E8F0] flex justify-between items-center text-[11px] opacity-70">
                          <span className="text-[#0F172A]">{isAr ? "لافارج هولسيم" : "Lafarge Holcim"}</span>
                          <span className="font-mono text-[#64748B]">3,580 EGP/T</span>
                        </div>
                      </div>
                    )}

                    {currentP.id === 'warehouse' && (
                      <div className="space-y-2 text-xs">
                        <div className="p-2.5 rounded-lg bg-white border border-blue-200 space-y-1 shadow-xs">
                          <div className="flex justify-between text-[10px] text-[#1D4ED8] font-bold">
                            <span className="flex items-center gap-1"><ScanLine className="w-3.5 h-3.5" /> AI Vision OCR</span>
                            <span className="font-mono">99.8% Match</span>
                          </div>
                          <div className="text-[11px] font-mono text-[#0F172A]">
                            Delivery Note #DN-9941 • 52.4 Tons Rebar
                          </div>
                          <div className="text-[10px] text-[#15803D] flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{isAr ? "مطابقة وزن البسكول مع أمر الشراء" : "Weighbridge weight reconciled"}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentP.id === 'supplier' && (
                      <div className="space-y-2 text-xs">
                        <div className="p-2.5 rounded-lg bg-white border border-amber-200 space-y-1.5 shadow-xs">
                          <div className="flex justify-between text-[10px] text-amber-800 font-bold">
                            <span>{isAr ? "مناقصة مفتوحة #RFQ-0091" : "Open Bid #RFQ-0091"}</span>
                            <span className="font-mono text-[#15803D]">{isAr ? "متبقي 6 ساعات" : "6h Left"}</span>
                          </div>
                          <div className="text-[#0F172A] font-bold text-[11px]">{isAr ? "توريد 120 طن حديد تسليح 16مم لموقع المنصورة" : "Supply 120T Rebar 16mm to Mansoura Site"}</div>
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[10px] text-[#64748B] font-mono">{isAr ? "عرضك المقترح:" : "Your Bid:"} 35,200 ج.م/طن</span>
                            <span className="px-2 py-0.5 bg-[#E85312] text-white font-bold text-[9px] rounded-md">
                              {isAr ? "إرسال العرض" : "Submit Bid"}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Footer of Mini-Screen */}
                  <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[10px] text-[#64748B] font-mono">
                    <span>Scope: {currentP.role}</span>
                    <span className="text-[#E85312] font-bold">{isAr ? "صلاحيات مشفرة" : "RBAC Secured"}</span>
                  </div>
                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. CUSTOMER TESTIMONIALS & SOCIAL PROOF */}
      {/* ============================================================== */}
      {/* ============================================================== */}
      {/* 7. VERIFIED CUSTOMER TESTIMONIALS */}
      {/* ============================================================== */}
      <section id="testimonials" className="py-20 bg-white border-t border-[#CBD5E1]">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E85312] px-3.5 py-1 rounded-full bg-[#FEECE5] border border-[#E85312]/30">
              {isAr ? "شهادات وثقة كبرى شركات المقاولات" : "VERIFIED CONTRACTOR TESTIMONIALS"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-3 text-[#0F172A]">
              {isAr ? "ماذا يقول قادة قطاع الإنشاءات عن منصة IRAM؟" : "Trusted By Leading General Contractors & Civil Developers"}
            </h2>
            <p className="text-sm text-[#475569] font-medium mt-2">
              {isAr
                ? "نتائج حقيقية ووفورات مالية ملموسة تحققت في مواقع العمل منذ الأسبوع الأول لتشغيل المنظومة."
                : "Real field results and verified capital savings delivered across multi-million dollar construction projects."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Testimonial 1 */}
            <div className="p-8 rounded-xl bg-[#EEF2F6] border border-[#CBD5E1] hover:border-[#E85312] hover:shadow-card-hover transition-all flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#E85312]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#E85312]" />
                    ))}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] border border-emerald-300 text-[10px] font-mono font-bold">
                    +4.8M EGP Saved
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#334155] leading-relaxed italic font-medium">
                  {isAr
                    ? "«منصة IRAM أحدثت نقلة نوعية في كفاءة مواقعنا؛ نجحنا في توفير ما يزيد عن 4.8 مليون جنيه خلال أول 6 أشهر فقط بفضل إعادة توجيه فوائض حديد التسليح بين المشروعات بدلاً من الشراء الخارجي الجديد.»"
                    : "\"IRAM transformed our job sites. We saved over $180,000 in 6 months simply by redeploying rebar surplus across phases instead of issuing redundant purchase orders.\""}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#CBD5E1] flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-lg bg-[#E85312] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  م.ش
                </div>
                <div>
                  <h4 className="font-bold text-[#0F172A] text-xs">
                    {isAr ? "م. شريف الجمل" : "Eng. Sherif El-Gammal"}
                  </h4>
                  <p className="text-[11px] text-[#475569] font-medium">
                    {isAr ? "رئيس قطاع المشروعات • السويدي للإنشاءات" : "VP of Projects • Major Contracting Group"}
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="p-8 rounded-xl bg-[#EEF2F6] border border-[#CBD5E1] hover:border-[#E85312] hover:shadow-card-hover transition-all flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#E85312]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#E85312]" />
                    ))}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#DBEAFE] text-[#1D4ED8] border border-blue-300 text-[10px] font-mono font-bold">
                    -80% Sourcing Time
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#334155] leading-relaxed italic font-medium">
                  {isAr
                    ? "«تقييم عروض أسعار الموردين بالذكاء الاصطناعي اختصر دورة البت المالي من أسبوع كامل إلى 4 ساعات فقط، مع مطابقة تامة لجدول صب الخرسانة وشروط دفع ائتمانية وفرت لنا تدفقات نقدية ممتازة.»"
                    : "\"The AI quotation evaluation reduced our tender review from 5 business days to 3 hours, strictly locking in delivery ahead of concrete pour dates with optimal 30-day credit terms.\""}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#CBD5E1] flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-lg bg-[#1D4ED8] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  م.ح
                </div>
                <div>
                  <h4 className="font-bold text-[#0F172A] text-xs">
                    {isAr ? "م. حسام الدين عبد الله" : "Eng. Hossam El-Din"}
                  </h4>
                  <p className="text-[11px] text-[#475569] font-medium">
                    {isAr ? "مدير المشتريات وسلاسل الإمداد المركزية" : "Head of Central Procurement & Supply"}
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="p-8 rounded-xl bg-[#EEF2F6] border border-[#CBD5E1] hover:border-[#E85312] hover:shadow-card-hover transition-all flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#E85312]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#E85312]" />
                    ))}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] border border-emerald-300 text-[10px] font-mono font-bold">
                    99.4% Stock Match
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#334155] leading-relaxed italic font-medium">
                  {isAr
                    ? "«المسح الضوئي بالـ OCR لبوالص الشحن قضى بنسبة 100% على أخطاء الجرد اليدوي في ساحات التشوين بالمواقع، وأصبح رصيد المواد الفعلي متطابقاً لحظياً مع المسجل بالنظام.»"
                    : "\"AI Document OCR eliminated tally errors at our staging yards. Weighbridge slips and delivery manifests now update the central stock balance in real-time.\""}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#CBD5E1] flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-lg bg-[#15803D] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  م.ك
                </div>
                <div>
                  <h4 className="font-bold text-[#0F172A] text-xs">
                    {isAr ? "م. كريم عبد الرحمن" : "Eng. Kareem Abdelrahman"}
                  </h4>
                  <p className="text-[11px] text-[#475569] font-medium">
                    {isAr ? "استشاري إدارة ساحات التشوين والمخازن" : "Quality & Warehouse Operations Director"}
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. PRICING PLANS & SUBSCRIPTIONS MAP */}
      {/* ============================================================== */}
      {/* ============================================================== */}
      {/* 8. PRICING PLANS & SUBSCRIPTIONS MAP */}
      {/* ============================================================== */}
      <section id="pricing" className="py-20 bg-[#EEF2F6] border-t border-[#CBD5E1]">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E85312] px-3.5 py-1 rounded-full bg-[#FEECE5] border border-[#E85312]/30">
              {isAr ? "خريطة وباقات الاشتراكات (SUBSCRIPTIONS MAP)" : "TRANSPARENT ENTERPRISE PRICING"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-3 text-[#0F172A]">
              {isAr ? "باقات اشتراك مرنة تناسب حجم أعمال ومشاريع شركتك" : "Simple, Predictable Plans Tailored For Construction Scale"}
            </h2>
            <p className="text-sm text-[#475569] font-medium mt-2">
              {isAr 
                ? "عائد استثمار مباشر (ROI) يسترد قيمة الاشتراك بالكامل من أول طن حديد أو فائض يتم توفيره."
                : "Proven ROI that offsets subscription fees in the very first material reallocation cycle."}
            </p>

            {/* Monthly / Yearly Billing Toggle */}
            <div className="mt-8 inline-flex items-center p-1 rounded-lg bg-[#E2E8F0] border border-[#CBD5E1]">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  billingCycle === 'monthly' ? 'bg-white text-[#0F172A] shadow-xs' : 'text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                {isAr ? "الدفع شهرياً" : "Monthly Billing"}
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-5 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  billingCycle === 'yearly' ? 'bg-[#E85312] text-white shadow-xs' : 'text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                <span>{isAr ? "الدفع سنوياً" : "Annual Billing"}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#E85312] font-black">
                  {isAr ? "وفر 20%" : "Save 20%"}
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* Plan 1: Starter */}
            <div className="p-8 rounded-xl bg-white border border-[#CBD5E1] flex flex-col justify-between hover:border-slate-400 transition-all shadow-sm">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A]">
                    {isAr ? "باقة المشاريع الأساسية" : "Project Starter"}
                  </h3>
                  <p className="text-xs text-[#475569] font-medium mt-1">
                    {isAr ? "مثالية لشركات المقاولات الناشئة حتى 3 مشاريع" : "For growing civil contractors managing up to 3 active job sites."}
                  </p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#0F172A] font-mono">
                    ${billingCycle === 'yearly' ? '390' : '490'}
                  </span>
                  <span className="text-xs text-[#475569] font-bold">
                    {isAr ? "/ شهرياً" : "/ month"}
                  </span>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#CBD5E1] text-xs text-[#334155] font-medium">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                    <span>{isAr ? "حتى 3 مشاريع إنشائية نشطة" : "Up to 3 Active Construction Sites"}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                    <span>{isAr ? "10 حسابات مستخدمين (RBAC)" : "10 User Accounts (RBAC Controls)"}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                    <span>{isAr ? "إدارة المخزون وتتبع الكميات الميدانية" : "Field Inventory Tracking & Balances"}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                    <span>{isAr ? "مطابقة الفائض الأساسية بين المواقع" : "Basic Cross-Project Surplus Match"}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                    <span>{isAr ? "دعم فني قياسي عبر البريد" : "Standard Email & Ticket Support"}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenAuth('register')}
                className="mt-8 w-full py-3.5 rounded-lg bg-[#EEF2F6] hover:bg-[#E2E8F0] text-[#0F172A] font-bold text-xs transition-all border border-[#CBD5E1] cursor-pointer"
              >
                {isAr ? "ابدأ تجربة الخطة الأساسية" : "Get Started with Starter"}
              </button>
            </div>

            {/* Plan 2: Professional / Growth (FEATURED) */}
            <div className="p-8 rounded-xl bg-white border-2 border-[#E85312] flex flex-col justify-between relative shadow-xl ring-2 ring-[#E85312]/20 transform lg:-translate-y-2">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#E85312] text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                {isAr ? "⭐ الخطة الأكثر اختياراً للمقاولين" : "⭐ MOST POPULAR FOR CONTRACTORS"}
              </div>

              <div className="space-y-6 pt-2">
                <div>
                  <h3 className="text-xl font-bold text-[#0F172A]">
                    {isAr ? "باقة الشركات التوسعية" : "Professional Growth"}
                  </h3>
                  <p className="text-xs text-[#475569] font-medium mt-1">
                    {isAr ? "المنظومة المتكاملة للشركات حتى 12 مشروعاً نشطاً" : "Complete intelligence suite for mid & large contractors up to 12 sites."}
                  </p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-[#E85312] font-mono">
                    ${billingCycle === 'yearly' ? '990' : '1,290'}
                  </span>
                  <span className="text-xs text-[#475569] font-bold">
                    {isAr ? "/ شهرياً" : "/ month"}
                  </span>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#CBD5E1] text-xs text-[#0F172A]">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                    <span className="font-bold">{isAr ? "حتى 12 مشروعاً إنشائياً نشطاً" : "Up to 12 Active Sites"}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                    <span className="font-bold">{isAr ? "عدد مستخدمين وصلاحيات غير محدود" : "Unlimited User Accounts & Roles"}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                    <span className="font-bold text-[#E85312]">{isAr ? "محرك التنبؤ بالهدر بالـ AI (FR-WP-01/10)" : "Full AI Waste Prediction (FR-WP-01/10)"}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                    <span className="font-medium text-[#334155]">{isAr ? "محرك النقل الداخلي للفائض واحتساب الوفر" : "Automated Surplus Reallocation Engine"}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                    <span className="font-medium text-[#334155]">{isAr ? "مسح ضوئي بالـ AI OCR غير محدود" : "Unlimited AI Document OCR Vision"}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                    <span className="font-medium text-[#334155]">{isAr ? "بوابة المشتريات ومناقصات الموردين (RFQs)" : "Supplier Bidding & AI RFQ Matrix"}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                    <span className="font-medium text-[#334155]">{isAr ? "مزامنة جداول الكميات (Excel & BOQ Sync)" : "BOQ Import & Excel Schedule Sync"}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenAuth('register')}
                className="mt-8 w-full py-3.5 rounded-lg bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                {isAr ? "ترقية واختيار باقة الشركات التوسعية" : "Subscribe to Professional Plan"}
              </button>
            </div>

            {/* Plan 3: Enterprise */}
            <div className="p-8 rounded-xl bg-white border border-[#CBD5E1] flex flex-col justify-between hover:border-slate-400 transition-all shadow-sm">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A]">
                    {isAr ? "باقة المؤسسات الكبرى" : "Unlimited Enterprise"}
                  </h3>
                  <p className="text-xs text-[#475569] font-medium mt-1">
                    {isAr ? "للمطورين العقاريين وكبرى شركات المقاولات العامة" : "For general contracting conglomerates and large real estate developers."}
                  </p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#0F172A] font-mono">
                    ${billingCycle === 'yearly' ? '2,390' : '2,890'}
                  </span>
                  <span className="text-xs text-[#475569] font-bold">
                    {isAr ? "/ شهرياً" : "/ month"}
                  </span>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#CBD5E1] text-xs text-[#334155] font-medium">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                    <span className="font-bold">{isAr ? "عدد مشاريع وساحات غير محدود" : "Unlimited Projects & Central Yards"}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                    <span>{isAr ? "ربط مباشر مع SAP / Oracle / ERP" : "Bi-Directional SAP / Oracle ERP Sync"}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                    <span>{isAr ? "نماذج ذكاء اصطناعي مدربة على بيانات الشركة" : "Custom Fine-Tuned AI Models"}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                    <span>{isAr ? "خادم سحابي معزول بالكامل (Dedicated Cloud)" : "Dedicated Isolated Cloud VPC"}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                    <span>{isAr ? "مدير حساب وتدريب ميداني لفرق المواقع" : "Dedicated Account Manager & On-Site Training"}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                    <span>{isAr ? "دعم فني مخصص على مدار الساعة 24/7" : "24/7 SLA Priority Phone Support"}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenAuth('register')}
                className="mt-8 w-full py-3.5 rounded-lg bg-[#EEF2F6] hover:bg-[#E2E8F0] text-[#0F172A] font-bold text-xs transition-all border border-[#CBD5E1] cursor-pointer"
              >
                {isAr ? "طلب تعاقد مؤسسي مخصص" : "Contact Enterprise Sales"}
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. FREQUENTLY ASKED QUESTIONS (Accordion) */}
      {/* ============================================================== */}
      <section id="faq" className="py-20 bg-white border-t border-[#CBD5E1]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E85312] px-3.5 py-1 rounded-full bg-[#FEECE5] border border-[#E85312]/30">
              {isAr ? "الأسئلة الشائعة" : "FREQUENTLY ASKED QUESTIONS"}
            </span>
            <h2 className="text-3xl font-black mt-3 text-[#0F172A]">
              {isAr ? "إجابات فورية لكل ما يهمك حول المنصة" : "Everything You Need To Know About IRAM"}
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="bg-[#EEF2F6] rounded-xl border border-[#CBD5E1] overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#0F172A] hover:text-[#E85312] transition-colors cursor-pointer"
                  >
                    <span>{isAr ? faq.qAr : faq.qEn}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#E85312]" /> : <ChevronDown className="w-4 h-4 text-[#64748B]" />}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-[#334155] leading-relaxed border-t border-[#CBD5E1] pt-3 font-medium animate-in fade-in">
                      {isAr ? faq.aAr : faq.aEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 10. CALL TO ACTION & FOOTER */}
      {/* ============================================================== */}
      <section className="py-20 bg-gradient-to-b from-[#EEF2F6] to-white border-t border-[#CBD5E1] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <IramLogo className="h-12 w-auto mx-auto" variant="light" />
          
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A]">
            {isAr ? "حوّل إدارة مواد البناء من فوضى إلى ميزة تنافسية" : "Transform Construction Materials Into Smarter Decisions"}
          </h2>

          <p className="text-sm text-[#334155] font-medium max-w-xl mx-auto">
            {isAr 
              ? "انضم لكبرى شركات المقاولات وشبكة موردي مواد البناء المعتمدين واختبر الفارق في أول أسبوع."
              : "Deploy IRAM across your sites, verify internal surplus before buying, and eliminate project material shortages."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onExploreDashboard}
              className="px-8 py-3.5 rounded-lg bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{isAr ? "الدخول للنموذج التفاعلي المباشر" : "Launch Interactive Prototype"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenAuth('register')}
              className="px-8 py-3.5 rounded-lg bg-white hover:bg-[#EEF2F6] text-[#0F172A] font-bold text-sm border border-[#CBD5E1] shadow-xs transition-all cursor-pointer"
            >
              {isAr ? "تسجيل شركة جديدة" : "Register Your Company"}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#CBD5E1] py-10 bg-white text-[#475569] text-xs font-medium">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <IramLogo className="h-6 w-auto" variant="light" />
            <span>© 2026 IRAM Platform. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <span>SRS v2.0 Architecture</span>
            <span>FR-WP-01 to FR-WP-10</span>
            <span className="text-[#E85312] font-bold">Multi-Tenant Construction SaaS</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
