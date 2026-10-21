import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft,
  CheckCircle, 
  CheckCircle2,
  Sparkles, 
  Building2, 
  HardHat, 
  Truck, 
  Boxes, 
  PackageCheck, 
  TrendingDown, 
  ShieldCheck, 
  DollarSign, 
  Calculator, 
  Globe, 
  ChevronRight, 
  X, 
  Search, 
  Check, 
  Layers, 
  ArrowRightLeft, 
  AlertTriangle, 
  Clock, 
  Eye, 
  Sliders, 
  Zap,
  BarChart3,
  ExternalLink,
  Menu
} from 'lucide-react';
import IramLogo, { RealEstateIconBox } from '../components/IramLogo';

export default function LandingPage({ onOpenAuth, onExploreDashboard, language, onLanguageToggle }) {
  const isAr = language === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Interactive Demo Modal State
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoFormData, setDemoFormData] = useState({
    name: '',
    email: '',
    company: '',
    projects: '6–15',
    phone: ''
  });
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  // Interactive ROI Calculator State
  const [projectsCount, setProjectsCount] = useState(6);
  const [budgetPerProject, setBudgetPerProject] = useState(12); // $ Millions

  // Calculations for Enterprise Savings
  const totalBudget = projectsCount * budgetPerProject * 1000000;
  const surplusSaved = Math.round(totalBudget * 0.048); // ~4.8% reallocated
  const delayCostsAvoided = Math.round(totalBudget * 0.027); // ~2.7% avoided stoppage & rush freight
  const totalSavings = surplusSaved + delayCostsAvoided;

  // Interactive Feature Tab ('visibility' | 'shortages' | 'transfers' | 'procurement')
  const [activeFeatureTab, setActiveFeatureTab] = useState('visibility');

  // Interactive Stock Table Filter
  const [stockFilter, setStockFilter] = useState('all'); // 'all' | 'shortages' | 'surplus'

  // Handle Demo Form Submit
  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setDemoSubmitted(true);
    setTimeout(() => {
      // Keep state visible for user confirmation
    }, 500);
  };

  const stockData = [
    { nameEn: "Rebar Ø16mm (Grade 60)", nameAr: "حديد تسليح 16 مم (مشرشر)", whA: "42 t", whB: "—", towerB: "6 t", villaC: "—", status: "shortage", statusEn: "Shortage at Tower B", statusAr: "عجز ببرج العاصمة" },
    { nameEn: "C30 Portland Cement", nameAr: "أسمنت بورتلاندي C30", whA: "120 bags", whB: "900 bags", towerB: "180 bags", villaC: "—", status: "covered", statusEn: "Covered across sites", statusAr: "مغطى بالكامل" },
    { nameEn: "PVC Pressure Pipes 110mm", nameAr: "مواسير ضغط PVC 110 مم", whA: "—", whB: "400 m", towerB: "120 m", villaC: "60 m", status: "covered", statusEn: "Balanced stock", statusAr: "رصيد كافٍ" },
    { nameEn: "Porcelain Floor Tiles 60x60", nameAr: "سيراميك وبورسلين 60×60", whA: "—", whB: "—", towerB: "—", villaC: "310 m²", status: "surplus", statusEn: "Surplus at Villa C", statusAr: "فائض بفيلا النرجس" },
    { nameEn: "Structural Steel I-Beams HEB 200", nameAr: "كمرات حديد HEB 200", whA: "28 t", whB: "14 t", towerB: "4 t", villaC: "—", status: "covered", statusEn: "Ready to transfer", statusAr: "متاح للنقل" }
  ];

  const filteredStock = stockFilter === 'all' 
    ? stockData 
    : stockFilter === 'shortages' 
      ? stockData.filter(i => i.status === 'shortage') 
      : stockData.filter(i => i.status === 'surplus');

  return (
    <div className={`min-h-screen bg-[#FFFDF9] text-[#26231F] selection:bg-[#E85312] selection:text-white ${isAr ? 'font-arabic' : 'font-sans'}`}>
      
      {/* ============================================================== */}
      {/* 1. TOP GLOBAL FLOATING HEADER (Floating with Elegant Spacing)   */}
      {/* ============================================================== */}
      <header className="sticky top-3 sm:top-5 z-50 px-4 sm:px-6 lg:px-8 w-full max-w-[1360px] mx-auto transition-all duration-200">
        <div className="w-full bg-[#FFFDF9]/95 backdrop-blur-md border border-[#EAE5DE] rounded-2xl shadow-sm hover:shadow-md transition-shadow px-5 sm:px-7 h-16 sm:h-18 flex items-center justify-between gap-4 sm:gap-6">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <RealEstateIconBox className="w-8 h-8" />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-[17px] font-black tracking-wider text-[#26231F] leading-none">
                  IRAM
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F5D4] animate-pulse"></span>
              </div>
              <span className="text-[8px] font-bold tracking-[0.2em] text-[#E85312] uppercase leading-tight mt-0.5">
                CONTECH SYSTEMS
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#6E6862]">
            <a href="#platform" className="hover:text-[#E85312] transition-colors">
              {isAr ? "المنصة" : "Platform"}
            </a>
            <a href="#solutions" className="hover:text-[#E85312] transition-colors">
              {isAr ? "الحلول" : "Solutions"}
            </a>
            <a href="#how" className="hover:text-[#E85312] transition-colors">
              {isAr ? "كيف تعمل المنظومة" : "How It Works"}
            </a>
            <a href="#teams" className="hover:text-[#E85312] transition-colors">
              {isAr ? "فرق العمل" : "Teams"}
            </a>
            <a href="#impact" className="hover:text-[#E85312] transition-colors">
              {isAr ? "العائد المالي" : "Impact & ROI"}
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Language Toggle Button */}
            <button 
              onClick={onLanguageToggle}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-bold text-[#6E6862] hover:text-[#26231F] hover:bg-[#EAE5DE]/40 transition-colors cursor-pointer border border-[#EAE5DE]"
              title={isAr ? "Switch to English" : "التبديل إلى العربية"}
            >
              <Globe className="w-3.5 h-3.5 text-[#E85312]" />
              <span className="uppercase">{isAr ? "EN" : "عربي"}</span>
            </button>

            {/* Sign In Trigger (Figma AuthModal) */}
            <button 
              onClick={() => onOpenAuth('login')}
              className="text-sm font-bold text-[#26231F] hover:text-[#E85312] transition-colors px-2 py-1.5 cursor-pointer"
            >
              {isAr ? "تسجيل الدخول" : "Sign In"}
            </button>

            {/* Request a Demo Button */}
            <button 
              onClick={() => setIsDemoModalOpen(true)}
              className="inline-flex items-center gap-2 bg-[#E85312] hover:bg-[#CC4509] text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2.5 rounded-md shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <span>{isAr ? "طلب عرض تجريبي" : "Request a Demo"}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>

            {/* Explore Live Prototype (Primary Sales Hook) */}
            <button 
              onClick={() => onExploreDashboard('Company Admin')}
              className="hidden lg:inline-flex items-center gap-1.5 bg-[#26231F] hover:bg-[#000000] text-white text-xs font-bold px-3.5 py-2.5 rounded-md transition-all cursor-pointer"
              title={isAr ? "الدخول المباشر للنموذج التفاعلي" : "Open Full Interactive Prototype"}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{isAr ? "تجربة المنصة حياً" : "Live Prototype"}</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md border border-[#EAE5DE] text-[#26231F] hover:bg-[#EAE5DE]/40"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2.5 border border-[#EAE5DE] rounded-2xl bg-[#FFFDF9]/98 backdrop-blur-md shadow-xl px-6 py-4 space-y-3 animate-in slide-in-from-top-2 duration-150">
            <nav className="flex flex-col space-y-2.5 text-sm font-semibold text-[#6E6862]">
              <a 
                href="#platform" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#E85312] transition-colors py-1"
              >
                {isAr ? "المنصة" : "Platform"}
              </a>
              <a 
                href="#solutions" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#E85312] transition-colors py-1"
              >
                {isAr ? "الحلول" : "Solutions"}
              </a>
              <a 
                href="#how" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#E85312] transition-colors py-1"
              >
                {isAr ? "كيف تعمل المنظومة" : "How It Works"}
              </a>
              <a 
                href="#teams" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#E85312] transition-colors py-1"
              >
                {isAr ? "فرق العمل" : "Teams"}
              </a>
              <a 
                href="#impact" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#E85312] transition-colors py-1"
              >
                {isAr ? "العائد المالي" : "Impact & ROI"}
              </a>
            </nav>
            <div className="pt-2 border-t border-[#EAE5DE] flex items-center justify-between gap-3">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onExploreDashboard('Company Admin');
                }}
                className="w-full py-2.5 px-4 rounded-md bg-[#26231F] text-white text-xs font-bold text-center flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{isAr ? "دخول النموذج الحي" : "Live Prototype"}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      <main>
        
        {/* ============================================================== */}
        {/* 2. HERO SECTION (Use What You Have. Buy What You Need.) */}
        {/* ============================================================== */}
        <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden border-b border-[#EAE5DE]">
          {/* Subtle peach warm geometric tint on right side */}
          <div className="absolute right-0 top-0 w-full lg:w-[46%] h-full bg-[#FEECE5]/55 -z-10 pointer-events-none"></div>

          <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Core Value Proposition */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.16em] uppercase text-[#E85312]">
                  <span className="w-7 h-[1px] bg-[#E85312]"></span>
                  <span>{isAr ? "حوكمة وإدارة مواد البناء الذكية" : "Intelligent construction material management"}</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black leading-[1.04] tracking-tight text-[#26231F]">
                  {isAr ? (
                    <>استخدم ما لديك أولاً. <br />واشترِ <span className="text-[#E85312]">ما تحتاجه فقط.</span></>
                  ) : (
                    <>Use What You Have. <br />Buy <span className="text-[#E85312]">What You Need.</span></>
                  )}
                </h1>

                {/* Subtitle */}
                <p className="text-lg text-[#6E6862] leading-relaxed max-w-[500px]">
                  {isAr 
                    ? "تربط منصة IRAM أرصدة المواد عبر كافة مشاريعك ومخازنك الإنشائية، تتنبأ بالعجز مبكراً، وتعيد توجيه الفائض قبل اتخاذ قرار الشراء الجديد."
                    : "IRAM connects material availability across your construction projects, helps you identify shortages earlier, and puts existing surplus to work before you purchase more."}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button 
                    onClick={() => onExploreDashboard('Company Admin')}
                    className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#E85312] via-[#F05C1C] to-[#E85312] hover:brightness-110 text-white text-base font-bold px-7 py-3.5 rounded-xl shadow-[0_12px_28px_-6px_rgba(232,83,18,0.55)] hover:-translate-y-1 active:scale-95 transition-all duration-200 cursor-pointer group"
                  >
                    <span>{isAr ? "الدخول للنموذج التفاعلي" : "Explore the Platform"}</span>
                    <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </button>

                  <button 
                    onClick={() => setIsDemoModalOpen(true)}
                    className="inline-flex items-center gap-2 text-[#26231F] hover:text-[#E85312] text-sm font-bold border-b border-[#26231F] hover:border-[#E85312] pb-0.5 hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer group"
                  >
                    <span>{isAr ? "طلب جلسة عرض تقديمي" : "Request a Demo"}</span>
                    <ArrowIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                </div>

                {/* Trust Statement */}
                <div className="pt-6 border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#E85312] pl-4 rtl:pl-0 rtl:pr-4 text-xs font-medium text-[#6E6862]">
                  {isAr 
                    ? "مصممة لشركات المقاولات الكبرى التي تدير مشاريع متعددة، ومخازن تشوين، وشبكات موردين."
                    : "Built for construction enterprises managing multiple projects, staging yards, and suppliers."}
                </div>

              </div>

              {/* Right Column: High-Fidelity Interactive App Window (.win) with Dynamic Motion */}
              <div className="lg:col-span-7 relative">
                
                {/* Ambient Soft Glowing Background Orbs */}
                <div className="absolute -top-12 -left-12 w-72 h-72 bg-gradient-to-tr from-orange-400/25 to-amber-300/20 rounded-full blur-3xl -z-10 animate-soft-pulse pointer-events-none"></div>
                <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-gradient-to-br from-amber-400/20 to-orange-500/25 rounded-full blur-3xl -z-10 animate-float-slow pointer-events-none"></div>

                {/* Floating Motion Badge 1: Instant Site Reallocation */}
                <div className="absolute -top-6 left-6 z-20 bg-white/95 backdrop-blur-md border border-[#EAE5DE] rounded-xl p-3 shadow-xl animate-float-slow hidden sm:flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shadow-xs">
                    <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
                  </div>
                  <div className="text-left rtl:text-right">
                    <div className="text-[11px] font-black text-[#26231F] flex items-center gap-1.5">
                      <span>{isAr ? "مناقلة فورية ناجحة" : "Instant Reallocation"}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    </div>
                    <div className="text-[9.5px] text-emerald-600 font-bold">{isAr ? "+40 طن حديد وفرت $36,800" : "+40T Rebar saved $36,800"}</div>
                  </div>
                </div>

                {/* Floating Motion Badge 2: AI Shortage Prevented */}
                <div className="absolute -bottom-5 right-6 z-20 bg-[#26231F] text-white rounded-xl p-3 shadow-2xl animate-float-reverse hidden sm:flex items-center gap-3 border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-[#E85312] text-white flex items-center justify-center font-bold shadow-xs">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left rtl:text-right">
                    <div className="text-[11px] font-black text-white">{isAr ? "رصد عجز بالذكاء الاصطناعي" : "AI Shortage Prevented"}</div>
                    <div className="text-[9.5px] text-amber-400 font-mono font-bold">{isAr ? "0 أيام توقف صب خرساني" : "0 Idle Pouring Days"}</div>
                  </div>
                </div>

                {/* Browser Frame Window */}
                <div className="bg-white border border-[#EAE5DE] rounded-xl shadow-[0_30px_70px_-20px_rgba(38,35,31,0.25),0_4px_12px_rgba(38,35,31,0.06)] overflow-hidden card-hover-lift">
                  
                  {/* Window Title Bar */}
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-[#F7F5F1] border-b border-[#EAE5DE]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EAE5DE]"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EAE5DE]"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EAE5DE]"></span>
                    <div className="mx-3 px-3 py-0.5 bg-white border border-[#EAE5DE] rounded text-[11px] font-mono text-[#6E6862] flex-1 max-w-[280px] truncate">
                      app.iram.systems/overview
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      LIVE TELEMETRY
                    </span>
                  </div>

                  {/* Window Body: Interactive Workspace Split */}
                  <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
                    
                    {/* Simulated Left Sidebar */}
                    <div className="hidden md:block md:col-span-3 bg-[#F7F5F1] border-r rtl:border-r-0 rtl:border-l border-[#EAE5DE] p-3 text-xs space-y-1 text-[#6E6862]">
                      <div className="px-2.5 py-1.5 rounded bg-white text-[#26231F] font-bold shadow-xs border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#E85312] flex items-center justify-between">
                        <span>{isAr ? "نظرة عامة" : "Overview"}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E85312]"></span>
                      </div>
                      <div className="px-2.5 py-1.5 rounded hover:bg-white/60 transition-colors cursor-pointer">
                        {isAr ? "أرصدة المواد" : "Materials"}
                      </div>
                      <div className="px-2.5 py-1.5 rounded hover:bg-white/60 transition-colors cursor-pointer flex items-center justify-between">
                        <span>{isAr ? "تنبيهات العجز" : "Requests"}</span>
                        <span className="text-[10px] font-bold text-[#E85312] bg-[#FEECE5] px-1 rounded">3</span>
                      </div>
                      <div className="px-2.5 py-1.5 rounded hover:bg-white/60 transition-colors cursor-pointer">
                        {isAr ? "نقل الفائض" : "Transfers"}
                      </div>
                      <div className="px-2.5 py-1.5 rounded hover:bg-white/60 transition-colors cursor-pointer">
                        {isAr ? "المشتريات" : "Procurement"}
                      </div>

                      <div className="pt-3 pb-1 px-2 text-[9px] font-bold uppercase tracking-wider text-[#A09A93]">
                        {isAr ? "المشاريع النشطة" : "ACTIVE SITES"}
                      </div>
                      <div className="px-2.5 py-1 text-[11px] hover:text-[#26231F] cursor-pointer">
                        • {isAr ? "كمبوند المنصورة" : "Al-Mansoura Complex"}
                      </div>
                      <div className="px-2.5 py-1 text-[11px] text-[#26231F] font-semibold cursor-pointer">
                        • {isAr ? "برج العاصمة B" : "Capital Tower B"}
                      </div>
                      <div className="px-2.5 py-1 text-[11px] hover:text-[#26231F] cursor-pointer">
                        • {isAr ? "فيلا النرجس C" : "Villa C"}
                      </div>
                    </div>

                    {/* Simulated Content Area */}
                    <div className="md:col-span-9 p-4 sm:p-5 space-y-4 bg-white">
                      
                      {/* Top Header */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-black text-[#26231F]">
                            {isAr ? "جاهزية وتوفر المواد عبر المواقع" : "Material Availability Matrix"}
                          </h4>
                          <span className="text-[10px] text-[#6E6862]">
                            {isAr ? "محدث آلياً قبل 4 دقائق • 12 مشروع و 4 مخازن" : "Auto-synced 4m ago • 12 projects · 4 yards"}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {isAr ? "البيانات متصلة" : "Telemetry Active"}
                        </span>
                      </div>

                      {/* Top KPI Grid */}
                      <div className="grid grid-cols-3 border border-[#EAE5DE] rounded-lg divide-x rtl:divide-x-reverse divide-[#EAE5DE] bg-[#FFFDF9]">
                        <div className="p-2.5 sm:p-3">
                          <span className="text-[10px] text-[#6E6862] font-semibold block">{isAr ? "مادة مرصودة" : "Tracked items"}</span>
                          <span className="text-base sm:text-xl font-black text-[#26231F]">1,284</span>
                        </div>
                        <div className="p-2.5 sm:p-3">
                          <span className="text-[10px] text-[#6E6862] font-semibold block">{isAr ? "تنبيهات نقص" : "Open shortages"}</span>
                          <span className="text-base sm:text-xl font-black text-[#E85312]">7</span>
                        </div>
                        <div className="p-2.5 sm:p-3">
                          <span className="text-[10px] text-[#6E6862] font-semibold block">{isAr ? "حصص فائض" : "Surplus lots"}</span>
                          <span className="text-base sm:text-xl font-black text-[#26231F]">38</span>
                        </div>
                      </div>

                      {/* Two Column Interactive Panel: Stock + Shortage Alert */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        
                        {/* Material Stock Table */}
                        <div className="sm:col-span-7 border border-[#EAE5DE] rounded-lg p-3 bg-white space-y-2">
                          <span className="text-[10px] font-bold text-[#6E6862] uppercase tracking-wider block">
                            {isAr ? "أرصدة المواقع الآنية" : "Project Stock"}
                          </span>
                          <div className="overflow-x-auto">
                            <table className="w-full text-[11px] text-left rtl:text-right">
                              <thead>
                                <tr className="border-b border-[#EAE5DE] text-[#A09A93] text-[9px] uppercase">
                                  <th className="pb-1 font-bold">{isAr ? "المادة" : "Item"}</th>
                                  <th className="pb-1 font-bold">{isAr ? "الموقع" : "Site"}</th>
                                  <th className="pb-1 font-bold text-right rtl:text-left">{isAr ? "الكمية" : "Qty"}</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-[#EAE5DE]/60 font-medium">
                                <tr>
                                  <td className="py-1 text-[#26231F]">Rebar Ø16</td>
                                  <td className="py-1 text-[#6E6862]">Yard A</td>
                                  <td className="py-1 text-right rtl:text-left font-bold text-[#26231F]">42 t</td>
                                </tr>
                                <tr>
                                  <td className="py-1 text-[#26231F]">Rebar Ø16</td>
                                  <td className="py-1 text-[#E85312] font-bold">Tower B</td>
                                  <td className="py-1 text-right rtl:text-left font-bold text-[#E85312]">6 t</td>
                                </tr>
                                <tr>
                                  <td className="py-1 text-[#26231F]">C30 Cement</td>
                                  <td className="py-1 text-[#6E6862]">Yard B</td>
                                  <td className="py-1 text-right rtl:text-left font-bold text-[#26231F]">900 b</td>
                                </tr>
                                <tr>
                                  <td className="py-1 text-[#26231F]">Tiles 60x60</td>
                                  <td className="py-1 text-emerald-700">Villa C</td>
                                  <td className="py-1 text-right rtl:text-left font-bold text-emerald-700">310 m²</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Shortage Warning Card (Orange Alert Accent) */}
                        <div className="sm:col-span-5 border border-[#E85312] border-l-4 rtl:border-l rtl:border-r-4 rounded-lg p-3 bg-[#FEECE5]/50 space-y-1.5 flex flex-col justify-between">
                          <div>
                            <div className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-[#E85312]">
                              <AlertTriangle className="w-3 h-3" />
                              <span>{isAr ? "إنذار نقص حرج" : "SHORTAGE WARNING"}</span>
                            </div>
                            <h5 className="text-xs font-black text-[#26231F] mt-1">
                              Rebar Ø16 · Tower B
                            </h5>
                            <p className="text-[10px] text-[#6E6862] mt-0.5">
                              {isAr ? "الاحتياج: 18 طن بحلول 14 نوفمبر" : "Need 18 t by 14 Nov 2026"}
                            </p>
                          </div>
                          
                          <div className="pt-2 border-t border-[#E85312]/20 flex items-center justify-between text-[10px]">
                            <span className="font-bold text-amber-800 bg-amber-100/80 px-1.5 py-0.5 rounded">
                              {isAr ? "خطر توقف بعد 24 يوم" : "Risk in 24 days"}
                            </span>
                            <span className="font-mono text-[#E85312] font-bold">PO-0182</span>
                          </div>
                        </div>

                      </div>

                      {/* Suggested Internal Match Card */}
                      <div className="border border-[#EAE5DE] rounded-lg p-3 bg-[#FFFDF9] space-y-1.5">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-[#6E6862]">
                            {isAr ? "اقتراح نقل داخلي ذكي (فائض ⬅ عجز)" : "Suggested internal match"}
                          </span>
                          <span className="font-bold text-[#E85312]">67% Coverage</span>
                        </div>
                        <div className="text-xs font-bold text-[#26231F]">
                          {isAr 
                            ? "12 طن حديد تسليح 16 مم متوفرة كفائض في مخزن Yard A"
                            : "12 t of Rebar Ø16 available at Warehouse A"}
                        </div>
                        <div className="w-full bg-[#EAE5DE] h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#E85312] h-full rounded-full" style={{ width: '67%' }}></div>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-[#6E6862]">
                          <span>{isAr ? "يوفر 45,500$ شراء خارجي فوري" : "Saves $45,500 external procurement"}</span>
                          <span className="text-[#E85312] font-semibold cursor-pointer hover:underline" onClick={() => onExploreDashboard('Company Admin')}>
                            {isAr ? "اعتماد النقل ⬅" : "Review Transfer →"}
                          </span>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>

                {/* Floating Animated Pill Alert */}
                <div className="hidden sm:block absolute -left-6 rtl:-left-auto rtl:-right-6 -bottom-6 w-72 bg-white border border-[#EAE5DE] border-l-4 rtl:border-l rtl:border-r-4 border-[#E85312] rounded-lg p-3.5 shadow-xl text-xs space-y-1 animate-bounce duration-1000">
                  <div className="text-[10px] font-black uppercase tracking-wider text-[#E85312] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E85312] animate-ping"></span>
                    <span>{isAr ? "تنبيه مطابقة ذكي" : "MATERIAL MATCH ALERT"}</span>
                  </div>
                  <div className="font-bold text-[#26231F]">
                    {isAr ? "تطابق فائض متاح مع طلب مفتوح" : "Surplus matches open request"}
                  </div>
                  <div className="text-[11px] text-[#6E6862]">
                    {isAr ? "سيراميك 60×60 • فيلا النرجس ⬅ مدخل برج B" : "Ceramic tile · Villa C → Tower B lobby"}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 3. THE CHALLENGE (Material decisions shouldn’t happen in silos) */}
        {/* ============================================================== */}
        <section id="solutions" className="py-24 border-b border-[#EAE5DE]">
          <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Headline Column */}
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.16em] uppercase text-[#E85312]">
                  <span className="w-7 h-[1px] bg-[#E85312]"></span>
                  <span>{isAr ? "التحدي الميداني" : "The challenge"}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#26231F] leading-tight tracking-tight">
                  {isAr ? (
                    <>قرارات توريد المواد <br />لا يجب أن تحدث في جزر منعزلة.</>
                  ) : (
                    <>Material decisions shouldn’t happen in silos.</>
                  )}
                </h2>
                <p className="text-lg text-[#6E6862] leading-relaxed max-w-[500px]">
                  {isAr 
                    ? "عندما تكون بيانات المواد مشتتة بين مواقع المشاريع، والمخازن، وإدارة المشتريات، تخسر الشركات وقتاً وأموالاً طائلة دون معرفة ما تملكه بالفعل."
                    : "When material information is scattered across projects, warehouses, and procurement teams, companies lose time and money without knowing what they already have."}
                </p>
              </div>

              {/* Right 3 Numbered Pain Points */}
              <div className="lg:col-span-6 space-y-6">
                
                <div className="grid grid-cols-12 gap-4 pb-6 border-b border-[#EAE5DE]">
                  <div className="col-span-2 text-base font-black text-[#E85312] pt-0.5">
                    01
                  </div>
                  <div className="col-span-10 space-y-1.5">
                    <h3 className="text-xl font-bold text-[#26231F]">
                      {isAr ? "عدم وضوح الأرصدة المتوفرة" : "Unseen Availability"}
                    </h3>
                    <p className="text-sm text-[#6E6862] leading-relaxed">
                      {isAr 
                        ? "قد تتواجد أطنان من المواد في موقع أو مخزن تابع للشركة، بينما يستعد مشروع آخر لشراء نفس المادة بأسعار طارئة وعمولات شحن مستعجلة."
                        : "Materials may exist elsewhere in the company while another project prepares to purchase more at rush rates."}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4 pb-6 border-b border-[#EAE5DE]">
                  <div className="col-span-2 text-base font-black text-[#E85312] pt-0.5">
                    02
                  </div>
                  <div className="col-span-10 space-y-1.5">
                    <h3 className="text-xl font-bold text-[#26231F]">
                      {isAr ? "اكتشاف العجز في وقت متأخر" : "Late Shortage Detection"}
                    </h3>
                    <p className="text-sm text-[#6E6862] leading-relaxed">
                      {isAr 
                        ? "يكتشف مهندس الموقع نقص الحديد أو الأسمنت قبل موعد الصب بـ 48 ساعة فقط، مما يربك الجدول الزمني ويفرض غرامات تأخير قاسية."
                        : "Material shortages surface when site teams are already under critical schedule pressure, leading to costly idle time."}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-2 text-base font-black text-[#E85312] pt-0.5">
                    03
                  </div>
                  <div className="col-span-10 space-y-1.5">
                    <h3 className="text-xl font-bold text-[#26231F]">
                      {isAr ? "تكدس الفائض وفقدان قيمته" : "Unmanaged Surplus"}
                    </h3>
                    <p className="text-sm text-[#6E6862] leading-relaxed">
                      {isAr 
                        ? "المواد المتبقية بعد انتهاء المراحل الإنشائية تهمل في ساحات الخردة وتتعرض للتلف والصدأ بدلاً من إعادة تدويرها أو بيعها بقيمتها السوقية."
                        : "Remaining materials lose substantial capital value when they are not identified, tracked, and prioritized for reuse."}
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 4. THE PLATFORM (One Clearer View - 4 Major Pillars) */}
        {/* ============================================================== */}
        <section id="platform" className="py-24 bg-[#FEECE5]/35 border-b border-[#EAE5DE]">
          <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 space-y-16">
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.16em] uppercase text-[#E85312]">
                  <span className="w-7 h-[1px] bg-[#E85312]"></span>
                  <span>{isAr ? "منظومة IRAM المتكاملة" : "The platform"}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#26231F] leading-tight tracking-tight">
                  {isAr ? (
                    <>رؤية واحدة أوضح <br />لكل مواد شركتك.</>
                  ) : (
                    <>One clearer view <br />of your materials.</>
                  )}
                </h2>
              </div>
              <p className="text-base text-[#6E6862] max-w-md leading-relaxed">
                {isAr 
                  ? "تربط المنصة جداول الكميات (BOQ)، الأرصدة الحالية، تنبؤات الهدر، والمشتريات في واجهة موحدة سهلة الاستخدام لكافة الإدارات."
                  : "IRAM connects material requirements, available inventory, surplus, and procurement decisions across your projects."}
              </p>
            </div>

            {/* Feature 01: Unified Material Visibility Window */}
            <div className="bg-white border border-[#EAE5DE] rounded-xl shadow-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#F7F5F1] border-b border-[#EAE5DE]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EAE5DE]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EAE5DE]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EAE5DE]"></span>
                  <span className="text-xs font-mono text-[#6E6862] ml-2">app.iram.systems/materials</span>
                </div>
                
                {/* Interactive Filter Pills */}
                <div className="flex items-center gap-1.5 text-xs">
                  <button 
                    onClick={() => setStockFilter('all')}
                    className={`px-2.5 py-1 rounded font-bold cursor-pointer transition-colors ${
                      stockFilter === 'all' ? 'bg-[#26231F] text-white' : 'text-[#6E6862] hover:bg-[#EAE5DE]'
                    }`}
                  >
                    {isAr ? "الكل" : "All Sites"}
                  </button>
                  <button 
                    onClick={() => setStockFilter('shortages')}
                    className={`px-2.5 py-1 rounded font-bold cursor-pointer transition-colors ${
                      stockFilter === 'shortages' ? 'bg-[#E85312] text-white' : 'text-[#6E6862] hover:bg-[#EAE5DE]'
                    }`}
                  >
                    {isAr ? "العجز فقط" : "Shortages"}
                  </button>
                  <button 
                    onClick={() => setStockFilter('surplus')}
                    className={`px-2.5 py-1 rounded font-bold cursor-pointer transition-colors ${
                      stockFilter === 'surplus' ? 'bg-emerald-700 text-white' : 'text-[#6E6862] hover:bg-[#EAE5DE]'
                    }`}
                  >
                    {isAr ? "الفائض فقط" : "Surplus"}
                  </button>
                </div>
              </div>

              <div className="p-5 sm:p-7 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#E85312]">01</span>
                    <h3 className="text-lg font-black text-[#26231F]">
                      {isAr ? "الرؤية الموحدة لتوفر المواد (Unified Material Visibility)" : "Unified Material Visibility"}
                    </h3>
                  </div>
                  <span className="text-xs text-[#6E6862]">
                    {isAr ? "جميع المخازن والمواقع نشطة" : "All 16 company locations reporting"}
                  </span>
                </div>

                <div className="overflow-x-auto border border-[#EAE5DE] rounded-lg">
                  <table className="w-full text-left rtl:text-right text-xs">
                    <thead>
                      <tr className="bg-[#F7F5F1] text-[#6E6862] uppercase text-[10px] font-bold border-b border-[#EAE5DE]">
                        <th className="py-3 px-4">{isAr ? "اسم المادة والمواصفة" : "Material"}</th>
                        <th className="py-3 px-4">{isAr ? "مخزن Yard A" : "Warehouse A"}</th>
                        <th className="py-3 px-4">{isAr ? "مخزن Yard B" : "Warehouse B"}</th>
                        <th className="py-3 px-4">{isAr ? "برج العاصمة B" : "Tower B"}</th>
                        <th className="py-3 px-4">{isAr ? "فيلا النرجس C" : "Villa C"}</th>
                        <th className="py-3 px-4">{isAr ? "حالة الرصيد" : "Status"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAE5DE] font-medium">
                      {filteredStock.map((row, idx) => (
                        <tr key={idx} className="hover:bg-[#FFFDF9] transition-colors">
                          <td className="py-3 px-4 font-bold text-[#26231F]">
                            {isAr ? row.nameAr : row.nameEn}
                          </td>
                          <td className="py-3 px-4 text-[#6E6862]">{row.whA}</td>
                          <td className="py-3 px-4 text-[#6E6862]">{row.whB}</td>
                          <td className="py-3 px-4 text-[#6E6862]">{row.towerB}</td>
                          <td className="py-3 px-4 text-[#6E6862]">{row.villaC}</td>
                          <td className="py-3 px-4">
                            {row.status === 'shortage' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#FEECE5] text-[#E85312] border border-[#E85312]/30">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#E85312]"></span>
                                {isAr ? row.statusAr : row.statusEn}
                              </span>
                            )}
                            {row.status === 'covered' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <Check className="w-3 h-3" />
                                {isAr ? row.statusAr : row.statusEn}
                              </span>
                            )}
                            {row.status === 'surplus' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                                {isAr ? row.statusAr : row.statusEn}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between text-xs text-[#6E6862] pt-2">
                  <span>{isAr ? "رصد آني متصل ببوالص الشحن وأذون الصرف المخزنية." : "See material availability across company projects and warehouses in one place."}</span>
                  <button 
                    onClick={() => onExploreDashboard('Company Admin')}
                    className="font-bold text-[#E85312] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isAr ? "فتح جدول المواد الكامل" : "Open Full Material Ledger"}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>

            {/* Feature 02 & 03: Split Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Feature 02: Early Shortage Alerts */}
              <div className="bg-white border border-[#EAE5DE] rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-4xl sm:text-5xl font-black text-[#EAE5DE] tracking-tighter block">02</span>
                    <h3 className="text-2xl font-black text-[#26231F]">
                      {isAr ? "التنبؤ المبكر بالعجز (Early Shortage Alerts)" : "Early Shortage Alerts"}
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FEECE5] text-[#E85312] border border-[#E85312]/30 uppercase">
                    {isAr ? "إنذار استباقي" : "14-Day Notice"}
                  </span>
                </div>

                <p className="text-sm text-[#6E6862] leading-relaxed">
                  {isAr 
                    ? "يقوم الذكاء الاصطناعي بمقارنة معدل الاستهلاك اليومي في الموقع مع الأرصدة المتبقية لاكتشاف العجز قبل حدوثه بأسبوعين."
                    : "Identify potential material shortages using project requirements, current stock, and daily consumption velocity."}
                </p>

                {/* Simulated Risk Card */}
                <div className="border border-[#EAE5DE] rounded-lg p-4 bg-[#FFFDF9] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#26231F]">C30 Cement · Tower B, Level 6 slab</span>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">Risk in 9 Days</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[#6E6862] text-[10px] block">{isAr ? "الكمية المطلوبة" : "Required Qty"}</span>
                      <span className="font-bold text-[#26231F]">600 bags</span>
                    </div>
                    <div>
                      <span className="text-[#6E6862] text-[10px] block">{isAr ? "الرصيد المتبقي بالموقع" : "Current Site Stock"}</span>
                      <span className="font-bold text-[#E85312]">180 bags</span>
                    </div>
                  </div>

                  {/* SVG Depletion Curve */}
                  <div className="pt-2">
                    <svg viewBox="0 0 400 60" className="w-full h-14" aria-hidden="true">
                      <path d="M0 12 L100 18 L200 30 L270 42 L400 55" fill="none" stroke="#E85312" strokeWidth="2.5" />
                      <line x1="0" y1="42" x2="400" y2="42" stroke="#EAE5DE" strokeDasharray="4 4" strokeWidth="1.5" />
                      <circle cx="270" cy="42" r="4.5" fill="#E85312" />
                      <text x="280" y="38" fontSize="10" fill="#6E6862" fontWeight="600">
                        {isAr ? "نفاد الرصيد الميداني" : "stock drops below safety threshold"}
                      </text>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Feature 03: Surplus Reallocation */}
              <div className="bg-white border border-[#EAE5DE] rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-4xl sm:text-5xl font-black text-[#EAE5DE] tracking-tighter block">03</span>
                    <h3 className="text-2xl font-black text-[#26231F]">
                      {isAr ? "إعادة توجيه ونقل الفائض (Surplus Reallocation)" : "Surplus Reallocation"}
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase">
                    {isAr ? "توفير فوري" : "Zero Cash Out"}
                  </span>
                </div>

                <p className="text-sm text-[#6E6862] leading-relaxed">
                  {isAr 
                    ? "فحص التوفر في المشاريع والمخازن الشقيقة واقتراح النقل الداخلي قبل اعتماد أي طلب شراء خارجي جديد."
                    : "Check existing availability and consider eligible surplus from another site before initiating a new external purchase."}
                </p>

                {/* Match Box Simulation */}
                <div className="border border-[#EAE5DE] rounded-lg p-4 bg-[#FFFDF9] space-y-4">
                  <div className="grid grid-cols-11 gap-2 items-center">
                    
                    <div className="col-span-5 p-3 rounded-md bg-white border border-[#EAE5DE] space-y-1">
                      <span className="text-[9px] font-bold text-[#6E6862] uppercase block">
                        {isAr ? "احتياج: برج العاصمة B" : "REQUIREMENT · Tower B"}
                      </span>
                      <div className="text-sm font-black text-[#26231F]">Rebar Ø16 · 18 t</div>
                      <span className="text-[10px] text-[#E85312] font-semibold block">{isAr ? "مطلوب قبل 14 نوفمبر" : "Needed by 14 Nov"}</span>
                    </div>

                    <div className="col-span-1 text-center font-bold text-[#E85312] text-lg">
                      {isAr ? "⬅" : "→"}
                    </div>

                    <div className="col-span-5 p-3 rounded-md bg-[#FEECE5] border border-[#E85312] space-y-1">
                      <span className="text-[9px] font-bold text-[#E85312] uppercase block">
                        {isAr ? "متاح: مخزن Yard A" : "AVAILABLE · Yard A"}
                      </span>
                      <div className="text-sm font-black text-[#26231F]">12 t eligible</div>
                      <span className="text-[10px] text-emerald-700 font-semibold block">{isAr ? "تطابق مواصفات 100%" : "Matching grade"}</span>
                    </div>

                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-[#EAE5DE]">
                    <span className="text-[#6E6862]">
                      {isAr ? "المتبقي للشراء الخارجي فقط: " : "Remaining gap to source: "}
                      <b className="text-[#26231F]">6 t</b>
                    </span>
                    <span className="text-amber-800 bg-amber-100 font-bold px-2 py-0.5 rounded text-[11px]">
                      {isAr ? "بانتظار اعتماد مدير المشروع" : "Transfer Pending Approval"}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Feature 04: Smarter Procurement Decisions */}
            <div className="bg-white border border-[#EAE5DE] rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl sm:text-5xl font-black text-[#EAE5DE] tracking-tighter">04</span>
                  <div>
                    <h3 className="text-2xl font-black text-[#26231F]">
                      {isAr ? "المشتريات ومصفوفة مقارنة عروض الأسعار" : "Smarter Procurement Decisions"}
                    </h3>
                    <p className="text-xs text-[#6E6862] mt-0.5">
                      {isAr 
                        ? "تقييم عروض الموردين آلياً بناءً على السعر النهائي، مطابقة المواصفة، سرعة التوريد، والتقييم التاريخي."
                        : "Help procurement teams compare supplier bids evaluating price, spec match, lead time, and reliability."}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => onExploreDashboard('Procurement Officer')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#26231F] hover:bg-black text-white text-xs font-bold rounded-md cursor-pointer transition-colors"
                >
                  <span>{isAr ? "تجربة بوابة المشتريات" : "Open Procurement Portal"}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Quotation Comparison Table */}
              <div className="overflow-x-auto border border-[#EAE5DE] rounded-lg">
                <table className="w-full text-left rtl:text-right text-xs">
                  <thead>
                    <tr className="bg-[#F7F5F1] text-[#6E6862] uppercase text-[10px] font-bold border-b border-[#EAE5DE]">
                      <th className="py-2.5 px-4">{isAr ? "المورد" : "Supplier"}</th>
                      <th className="py-2.5 px-4">{isAr ? "السعر / طن" : "Quoted Price"}</th>
                      <th className="py-2.5 px-4">{isAr ? "المطابقة الفنية" : "Specification Match"}</th>
                      <th className="py-2.5 px-4">{isAr ? "مدة التوريد" : "Delivery"}</th>
                      <th className="py-2.5 px-4">{isAr ? "تقييم الجودة" : "Quality Rating"}</th>
                      <th className="py-2.5 px-4">{isAr ? "القرار المقترح" : "Decision"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAE5DE] font-medium">
                    <tr>
                      <td className="py-3 px-4 font-bold text-[#26231F]">Ezz Steel (عز للصلب)</td>
                      <td className="py-3 px-4">$820 / t</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">100% ASTM A615</td>
                      <td className="py-3 px-4">5 days</td>
                      <td className="py-3 px-4">★ 4.8 / 5.0</td>
                      <td className="py-3 px-4"><span className="text-slate-500 font-bold">Runner-up</span></td>
                    </tr>
                    <tr className="bg-[#FEECE5]/70 font-semibold">
                      <td className="py-3 px-4 font-black text-[#26231F]">Suez Steel (صلب السويس)</td>
                      <td className="py-3 px-4 font-black text-[#E85312]">$795 / t</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">100% ASTM A615</td>
                      <td className="py-3 px-4 font-bold">3 days (Fastest)</td>
                      <td className="py-3 px-4">★ 4.6 / 5.0</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] font-black bg-[#E85312] text-white px-2 py-0.5 rounded shadow-xs">
                          {isAr ? "العرض الأنسب ★" : "Best Landed Value"}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-[#26231F]">Beshay Steel (بشاي)</td>
                      <td className="py-3 px-4">$835 / t</td>
                      <td className="py-3 px-4 text-amber-700">Partial Spec</td>
                      <td className="py-3 px-4">7 days</td>
                      <td className="py-3 px-4">★ 4.2 / 5.0</td>
                      <td className="py-3 px-4"><span className="text-slate-400">Higher Cost</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>

          </div>
        </section>

        {/* ============================================================== */}
        {/* 5. HOW IT WORKS (4 Step Connected Flow) */}
        {/* ============================================================== */}
        <section id="how" className="py-24 border-b border-[#EAE5DE] bg-white">
          <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 space-y-16">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.16em] uppercase text-[#E85312]">
                <span className="w-7 h-[1px] bg-[#E85312]"></span>
                <span>{isAr ? "آلية العمل خطوة بخطوة" : "How it works"}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#26231F] leading-tight tracking-tight max-w-[760px]">
                {isAr 
                  ? "من تحديد الاحتياج الهندسي إلى القرار الأذكى." 
                  : "From material need to a smarter decision."}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              
              {/* Step 1 */}
              <div className="space-y-4 relative group">
                <div className="w-12 h-12 rounded-full border-2 border-[#E85312] text-[#E85312] bg-white group-hover:bg-[#E85312] group-hover:text-white transition-all flex items-center justify-center font-black text-sm">
                  01
                </div>
                <h3 className="text-xl font-bold text-[#26231F]">
                  {isAr ? "تسجيل الاحتياج" : "Identify the Need"}
                </h3>
                <p className="text-sm text-[#6E6862] leading-relaxed">
                  {isAr 
                    ? "يقوم مهندس الموقع برفع طلب المواد مع المواصفة الهندسية وتاريخ الاحتياج والزون الإنشائي المحدد."
                    : "Project teams submit material requirements with exact technical specifications, quantities, and dates."}
                </p>
              </div>

              {/* Step 2 */}
              <div className="space-y-4 relative group">
                <div className="w-12 h-12 rounded-full border-2 border-[#E85312] text-[#E85312] bg-white group-hover:bg-[#E85312] group-hover:text-white transition-all flex items-center justify-center font-black text-sm">
                  02
                </div>
                <h3 className="text-xl font-bold text-[#26231F]">
                  {isAr ? "الفحص الداخلي الآلي" : "Check Availability"}
                </h3>
                <p className="text-sm text-[#6E6862] leading-relaxed">
                  {isAr 
                    ? "تفحص منصة IRAM أرصدة المواد في كافة مستودعات ومشاريع الشركة الشقيقة لاكتشاف أي فائض مطابق."
                    : "IRAM helps the company review eligible surplus materials already available across its corporate locations."}
                </p>
              </div>

              {/* Step 3 */}
              <div className="space-y-4 relative group">
                <div className="w-12 h-12 rounded-full border-2 border-[#E85312] text-[#E85312] bg-white group-hover:bg-[#E85312] group-hover:text-white transition-all flex items-center justify-center font-black text-sm">
                  03
                </div>
                <h3 className="text-xl font-bold text-[#26231F]">
                  {isAr ? "نقل الفائض أو الشراء" : "Reallocate or Procure"}
                </h3>
                <p className="text-sm text-[#6E6862] leading-relaxed">
                  {isAr 
                    ? "اعتماد النقل الداخلي الفوري لتوفير الكاش، أو طرح الكمية الناقصة فقط في مناقصة سريعة للموردين."
                    : "Review internal transfer options first before proceeding with external vendor procurement for any gap."}
                </p>
              </div>

              {/* Step 4 */}
              <div className="space-y-4 relative group">
                <div className="w-12 h-12 rounded-full border-2 border-[#E85312] text-[#E85312] bg-white group-hover:bg-[#E85312] group-hover:text-white transition-all flex items-center justify-center font-black text-sm">
                  04
                </div>
                <h3 className="text-xl font-bold text-[#26231F]">
                  {isAr ? "التتبع والتعلم المستمر" : "Track and Learn"}
                </h3>
                <p className="text-sm text-[#6E6862] leading-relaxed">
                  {isAr 
                    ? "تتبع حركة المواد، معدل الاستهلاك، وفواقد الصب والقص لتدريب نماذج الذكاء الاصطناعي على تقليل الهدر مستقبلاً."
                    : "Monitor material movements, consumption velocity, shortages, and remaining balances to optimize future projects."}
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ============================================================== */}
        {/* 6. BUILT FOR EVERY TEAM (Interactive Persona Cards) */}
        {/* ============================================================== */}
        <section id="teams" className="py-24 border-b border-[#EAE5DE] bg-[#FFFDF9]">
          <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 space-y-16">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.16em] uppercase text-[#E85312]">
                  <span className="w-7 h-[1px] bg-[#E85312]"></span>
                  <span>{isAr ? "صلاحيات ومحطات عمل مخصصة" : "Built for every team"}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#26231F] leading-tight tracking-tight">
                  {isAr ? (
                    <>منصة واحدة. <br />فرق عمل مترابطة.</>
                  ) : (
                    <>One platform. <br />Connected teams.</>
                  )}
                </h2>
                <p className="text-base text-[#6E6862] leading-relaxed">
                  {isAr 
                    ? "لكل دور في شركة المقاولات مساحة عمل مخصصة بصلاحيات RBAC محكمة تضمن تدفق البيانات بدون تداخل."
                    : "Each persona has an optimized view designed for their exact daily operational workflows."}
                </p>

                <div className="p-4 rounded-lg bg-[#FEECE5] border border-[#E85312]/30 space-y-1">
                  <span className="text-xs font-black text-[#E85312] uppercase block">
                    {isAr ? "بوابة مستقلة للموردين" : "Dedicated Supplier Portal"}
                  </span>
                  <p className="text-xs text-[#6E6862]">
                    {isAr 
                      ? "المصانع والموردون يمتلكون بوابة خارجية مستقلة لتلقي أوامر التوريد وتقديم عروض الأسعار ومتابعة الموافقات."
                      : "Suppliers enjoy an isolated vendor workspace to bid on open RFQs, review awards, and receive POs."}
                  </p>
                </div>
              </div>

              {/* Persona Interactive Launch Cards */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Project Managers */}
                <div 
                  onClick={() => onExploreDashboard('Project Manager')}
                  className="p-5 rounded-xl border border-[#EAE5DE] bg-white hover:border-[#E85312] hover:shadow-md transition-all cursor-pointer group space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-[#FEECE5] text-[#E85312] flex items-center justify-center font-bold">
                      <HardHat className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-[#E85312] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                      {isAr ? "دخول ⬅" : "Launch →"}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[#26231F] group-hover:text-[#E85312] transition-colors">
                    {isAr ? "مدراء المشاريع (PMs)" : "Project Managers"}
                  </h4>
                  <p className="text-xs text-[#6E6862] leading-relaxed">
                    {isAr ? "متابعة جداول كميات الموقع، تنبيهات العجز الحرج، واعتماد نقل الفائض الداخلي." : "Review site BOQs, critical shortage burn rates, and approve sister-site transfers."}
                  </p>
                </div>

                {/* Site Engineers */}
                <div 
                  onClick={() => onExploreDashboard('Site Engineer')}
                  className="p-5 rounded-xl border border-[#EAE5DE] bg-white hover:border-[#E85312] hover:shadow-md transition-all cursor-pointer group space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-[#FEECE5] text-[#E85312] flex items-center justify-center font-bold">
                      <TrendingDown className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-[#E85312] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                      {isAr ? "دخول ⬅" : "Launch →"}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[#26231F] group-hover:text-[#E85312] transition-colors">
                    {isAr ? "مهندسو الموقع (Site Engineers)" : "Site Engineers"}
                  </h4>
                  <p className="text-xs text-[#6E6862] leading-relaxed">
                    {isAr ? "تسجيل الاستهلاك الميداني الفعلي، رصد هدر القص والصب، ومراجعة توصيات الـ AI." : "Log daily consumption, record cutting/pour scrap, and review AI optimization tips."}
                  </p>
                </div>

                {/* Procurement Officers */}
                <div 
                  onClick={() => onExploreDashboard('Procurement Officer')}
                  className="p-5 rounded-xl border border-[#EAE5DE] bg-white hover:border-[#E85312] hover:shadow-md transition-all cursor-pointer group space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-[#FEECE5] text-[#E85312] flex items-center justify-center font-bold">
                      <PackageCheck className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-[#E85312] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                      {isAr ? "دخول ⬅" : "Launch →"}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[#26231F] group-hover:text-[#E85312] transition-colors">
                    {isAr ? "مسؤولو المشتريات" : "Procurement Officers"}
                  </h4>
                  <p className="text-xs text-[#6E6862] leading-relaxed">
                    {isAr ? "طرح طلبات عروض الأسعار، مصفوفة المقارنة الذكية، وإصدار أوامر الشراء (POs)." : "Issue RFQs, analyze landed-cost matrices, evaluate supplier bids, and issue POs."}
                  </p>
                </div>

                {/* Warehouse Officers */}
                <div 
                  onClick={() => onExploreDashboard('Warehouse Officer')}
                  className="p-5 rounded-xl border border-[#EAE5DE] bg-white hover:border-[#E85312] hover:shadow-md transition-all cursor-pointer group space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-[#FEECE5] text-[#E85312] flex items-center justify-center font-bold">
                      <Boxes className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-[#E85312] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                      {isAr ? "دخول ⬅" : "Launch →"}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[#26231F] group-hover:text-[#E85312] transition-colors">
                    {isAr ? "أمناء المخازن والـ OCR" : "Warehouse & AI OCR"}
                  </h4>
                  <p className="text-xs text-[#6E6862] leading-relaxed">
                    {isAr ? "مسح بوالص الشحن ضوئياً بالـ OCR، إدارة أرصدة ساحات التشوين، وإعلان الفائض." : "Scan paper manifests via AI OCR, manage yard balances, and declare surplus lots."}
                  </p>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* ============================================================== */}
        {/* 7. BUSINESS IMPACT & INTERACTIVE ROI CALCULATOR */}
        {/* ============================================================== */}
        <section id="impact" className="py-24 bg-[#FEECE5]/40 border-b border-[#EAE5DE]">
          <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 space-y-16">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.16em] uppercase text-[#E85312]">
                <span className="w-7 h-[1px] bg-[#E85312]"></span>
                <span>{isAr ? "الأثر المالي والعائد الاستثماري" : "Business impact"}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#26231F] leading-tight tracking-tight max-w-[800px]">
                {isAr 
                  ? "مشتريات أقل غير ضرورية. تأخيرات أقل يمكن تجنبها." 
                  : "Less unnecessary purchasing. Less avoidable delay."}
              </h2>
              <p className="text-base text-[#6E6862] max-w-xl leading-relaxed">
                {isAr 
                  ? "إتاحة رؤية فورية للأرصدة المتوفرة، والتحرك الاستباقي قبل نفاد المخزون، وتنسيق قرارات المواد عبر كافة مشاريع الشركة."
                  : "Make existing material availability visible, act on shortages earlier, and coordinate material decisions across sites."}
              </p>
            </div>

            {/* 3 Large KPI Outlined Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="border-t-2 border-[#E85312] pt-6 space-y-3">
                <span className="text-5xl lg:text-6xl font-black text-[#E85312] tracking-tight block">
                  01
                </span>
                <p className="text-lg font-bold text-[#26231F] leading-snug">
                  {isAr 
                    ? "تقليل الشراء الخارجي بنسبة 4.8% عبر فحص التوفر الداخلي أولاً." 
                    : "Reduce avoidable purchases by checking internal availability first."}
                </p>
              </div>

              <div className="border-t-2 border-[#E85312] pt-6 space-y-3">
                <span className="text-5xl lg:text-6xl font-black text-[#E85312] tracking-tight block">
                  02
                </span>
                <p className="text-lg font-bold text-[#26231F] leading-snug">
                  {isAr 
                    ? "تقليل مخاطر تأخير الجدول الزمني عبر التنبؤ بالعجز قبل أسبوعين." 
                    : "Reduce project delays through earlier 14-day shortage visibility."}
                </p>
              </div>

              <div className="border-t-2 border-[#E85312] pt-6 space-y-3">
                <span className="text-5xl lg:text-6xl font-black text-[#E85312] tracking-tight block">
                  03
                </span>
                <p className="text-lg font-bold text-[#26231F] leading-snug">
                  {isAr 
                    ? "استرداد قيمة رأس المال المحتجز في الفائض عبر النقل أو البيع B2B." 
                    : "Recover maximum value from remaining materials via smart reallocation."}
                </p>
              </div>

            </div>

            {/* Interactive Enterprise ROI Calculator Widget */}
            <div className="bg-white border border-[#EAE5DE] rounded-2xl p-6 sm:p-10 shadow-lg space-y-8">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE5DE] pb-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E85312] uppercase tracking-wider mb-1">
                    <Calculator className="w-4 h-4" />
                    <span>{isAr ? "حاسبة التوفير المالي التقديري لشركتك" : "Interactive Enterprise Savings Calculator"}</span>
                  </div>
                  <h3 className="text-2xl font-black text-[#26231F]">
                    {isAr ? "كم ستوفر شركتك سنوياً مع منصة IRAM؟" : "Estimate your annual capital recovery"}
                  </h3>
                </div>
                <div className="text-right rtl:text-left">
                  <span className="text-xs text-[#6E6862] block">{isAr ? "إجمالي التوفير السنوي الصافي" : "Estimated Annual Net Savings"}</span>
                  <span className="text-2xl sm:text-3xl font-black text-[#E85312] font-mono">
                    ${totalSavings.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Sliders Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Slider 1: Projects Count */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-[#26231F]">
                      {isAr ? "عدد المشاريع النشطة المتزامنة" : "Active Construction Projects"}
                    </span>
                    <span className="font-black text-[#E85312] text-base bg-[#FEECE5] px-3 py-1 rounded">
                      {projectsCount} {isAr ? "مشاريع" : "Sites"}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="25" 
                    value={projectsCount}
                    onChange={(e) => setProjectsCount(Number(e.target.value))}
                    className="w-full accent-[#E85312] cursor-pointer h-2 bg-[#EAE5DE] rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-[#6E6862]">
                    <span>1 site</span>
                    <span>12 sites</span>
                    <span>25 sites</span>
                  </div>
                </div>

                {/* Slider 2: Average Budget Per Project */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-[#26231F]">
                      {isAr ? "متوسط ميزانية المواد لكل مشروع سنوياً" : "Annual Material Budget Per Site"}
                    </span>
                    <span className="font-black text-[#E85312] text-base bg-[#FEECE5] px-3 py-1 rounded">
                      ${budgetPerProject}M
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="2" 
                    max="40" 
                    value={budgetPerProject}
                    onChange={(e) => setBudgetPerProject(Number(e.target.value))}
                    className="w-full accent-[#E85312] cursor-pointer h-2 bg-[#EAE5DE] rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-[#6E6862]">
                    <span>$2M</span>
                    <span>$20M</span>
                    <span>$40M</span>
                  </div>
                </div>

              </div>

              {/* Output Metrics Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-xl bg-[#FFFDF9] border border-[#EAE5DE]">
                <div>
                  <span className="text-xs text-[#6E6862] block">{isAr ? "إجمالي إنفاق المواد السنوي" : "Total Annual Material Spend"}</span>
                  <span className="text-xl font-bold text-[#26231F] font-mono">${(totalBudget / 1000000).toFixed(1)}M</span>
                </div>
                <div>
                  <span className="text-xs text-[#6E6862] block">{isAr ? "توفير من نقل الفائض الداخلي (~4.8%)" : "Internal Surplus Recovered (~4.8%)"}</span>
                  <span className="text-xl font-bold text-emerald-700 font-mono">+${surplusSaved.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-xs text-[#6E6862] block">{isAr ? "غرامات تأخير وشحن طارئ تم تفاديها" : "Avoided Rush Freight & Penalties"}</span>
                  <span className="text-xl font-bold text-emerald-700 font-mono">+${delayCostsAvoided.toLocaleString()}</span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ============================================================== */}
        {/* 8. FINAL CALL TO ACTION (Make Every Material Decision Count) */}
        {/* ============================================================== */}
        <section className="py-28 bg-[#E85312] text-white relative overflow-hidden">
          {/* Subtle geometric circle accent */}
          <div className="absolute -right-20 -top-20 w-[520px] h-[520px] rounded-full border border-white/20 pointer-events-none"></div>

          <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 space-y-8 relative z-10">
            <h2 className="text-4xl sm:text-5xl lg:text-[68px] font-black leading-tight tracking-tight max-w-[850px]">
              {isAr 
                ? "اجعل كل قرار توريد لمشاريعك ذا قيمة حقيقية." 
                : "Make every material decision count."}
            </h2>
            <p className="text-lg sm:text-xl text-white/90 max-w-[550px] leading-relaxed">
              {isAr 
                ? "اكتشف كيف تساعد منصة IRAM شركات الإنشاءات الرائدة في ربط احتياجات المواد، والأرصدة المركزية، وقرارات المشتريات بدقة لا تقبل الخطأ."
                : "Discover how IRAM can help your construction teams connect material needs, company-wide availability, and procurement decisions."}
            </p>

            <div className="flex flex-wrap items-center gap-5 pt-4">
              <button 
                onClick={() => setIsDemoModalOpen(true)}
                className="inline-flex items-center gap-2.5 bg-white text-[#26231F] hover:bg-[#26231F] hover:text-white text-base font-bold px-8 py-4 rounded-md shadow-lg transition-all cursor-pointer"
              >
                <span>{isAr ? "طلب جلسة عرض تجريبي" : "Request a Demo"}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>

              <button 
                onClick={() => onExploreDashboard('Company Admin')}
                className="inline-flex items-center gap-2 text-white border-b-2 border-white pb-1 text-sm font-bold hover:text-amber-200 hover:border-amber-200 transition-colors cursor-pointer"
              >
                <span>{isAr ? "استكشاف لوحة التحكم حياً" : "Explore Live Dashboard"}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* ============================================================== */}
      {/* 9. GLOBAL FOOTER (Editorial & Clean) */}
      {/* ============================================================== */}
      <footer className="py-16 bg-[#FFFDF9] border-t border-[#EAE5DE] text-xs text-[#6E6862]">
        <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Brand Column */}
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <RealEstateIconBox className="w-7 h-7" />
                <span className="font-black text-sm text-[#26231F] tracking-wider">
                  IRAM CONTECH SYSTEMS
                </span>
              </div>
              <p className="text-xs text-[#6E6862] leading-relaxed max-w-sm">
                {isAr 
                  ? "منظومة إدارة وحوكمة دورة حياة مواد البناء الذكية لشركات المقاولات المتصلة."
                  : "Intelligent material lifecycle management for connected construction enterprises."}
              </p>
              <div className="text-[11px] text-[#A09A93] font-mono pt-2">
                ISO 27001 Certified • Multi-tenant RBAC Enterprise Architecture
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-3 space-y-2">
              <h5 className="font-bold text-[#26231F] text-xs uppercase tracking-wider">
                {isAr ? "المنصة والأنظمة" : "Platform Modules"}
              </h5>
              <div className="space-y-1.5 flex flex-col">
                <a href="#platform" className="hover:text-[#E85312] transition-colors">{isAr ? "جاهزية المواد الموحدة" : "Unified Visibility"}</a>
                <a href="#platform" className="hover:text-[#E85312] transition-colors">{isAr ? "التنبؤ بالعجز والهدر" : "Shortage & Waste Prediction"}</a>
                <a href="#platform" className="hover:text-[#E85312] transition-colors">{isAr ? "نقل الفائض بين المواقع" : "Surplus Reallocation"}</a>
                <a href="#platform" className="hover:text-[#E85312] transition-colors">{isAr ? "مقارنة عروض الموردين" : "Smart Procurement & RFQs"}</a>
                <a href="#teams" className="hover:text-[#E85312] transition-colors">{isAr ? "فحص البوالص ضوئياً (OCR)" : "Delivery Notes AI OCR"}</a>
              </div>
            </div>

            {/* Roles Prototype Column */}
            <div className="md:col-span-2 space-y-2">
              <h5 className="font-bold text-[#26231F] text-xs uppercase tracking-wider">
                {isAr ? "استكشاف الأدوار" : "Interactive Views"}
              </h5>
              <div className="space-y-1.5 flex flex-col">
                <button onClick={() => onExploreDashboard('Company Admin')} className="text-left rtl:text-right hover:text-[#E85312] cursor-pointer">
                  {isAr ? "مسؤول الشركة" : "Company Admin"}
                </button>
                <button onClick={() => onExploreDashboard('Project Manager')} className="text-left rtl:text-right hover:text-[#E85312] cursor-pointer">
                  {isAr ? "مدير المشروع" : "Project Manager"}
                </button>
                <button onClick={() => onExploreDashboard('Site Engineer')} className="text-left rtl:text-right hover:text-[#E85312] cursor-pointer">
                  {isAr ? "مهندس الموقع" : "Site Engineer"}
                </button>
                <button onClick={() => onExploreDashboard('Supplier')} className="text-left rtl:text-right hover:text-[#E85312] cursor-pointer text-[#E85312] font-semibold">
                  {isAr ? "بوابة الموردين" : "Supplier Portal"}
                </button>
              </div>
            </div>

            {/* Account Column */}
            <div className="md:col-span-2 space-y-2">
              <h5 className="font-bold text-[#26231F] text-xs uppercase tracking-wider">
                {isAr ? "الحساب والدعم" : "Account"}
              </h5>
              <div className="space-y-1.5 flex flex-col">
                <button onClick={() => onOpenAuth('login')} className="text-left rtl:text-right hover:text-[#E85312] cursor-pointer font-bold text-[#26231F]">
                  {isAr ? "تسجيل الدخول" : "Sign In"}
                </button>
                <button onClick={() => setIsDemoModalOpen(true)} className="text-left rtl:text-right hover:text-[#E85312] cursor-pointer">
                  {isAr ? "طلب تجربة للنظام" : "Request Demo"}
                </button>
                <a href="mailto:support@iram.systems" className="hover:text-[#E85312] cursor-pointer">
                  {isAr ? "فريق الدعم الفني" : "Enterprise Support"}
                </a>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-[#EAE5DE] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A09A93]">
            <span>© 2026 IRAM Resource Systems. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <span className="hover:text-[#26231F] cursor-pointer">{isAr ? "سياسة الخصوصية" : "Privacy Policy"}</span>
              <span className="hover:text-[#26231F] cursor-pointer">{isAr ? "شروط الخدمة" : "Terms of Service"}</span>
              <span className="hover:text-[#26231F] cursor-pointer">{isAr ? "الأمان والامتثال" : "Security"}</span>
            </div>
          </div>

        </div>
      </footer>

      {/* ============================================================== */}
      {/* 10. ENTERPRISE REQUEST A DEMO MODAL */}
      {/* ============================================================== */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#FFFDF9] border border-[#EAE5DE] rounded-xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-5">
            
            {/* Close Button */}
            <button 
              onClick={() => {
                setIsDemoModalOpen(false);
                setDemoSubmitted(false);
              }}
              className="absolute top-5 right-5 rtl:right-auto rtl:left-5 text-[#6E6862] hover:text-[#26231F] p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!demoSubmitted ? (
              <form onSubmit={handleDemoSubmit} className="space-y-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E85312] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isAr ? "عرض تجريبي مخصص" : "Enterprise Demo Session"}</span>
                  </div>
                  <h3 className="text-2xl font-black text-[#26231F]">
                    {isAr ? "طلب استعراض حي للمنصة" : "Request an Executive Walkthrough"}
                  </h3>
                  <p className="text-xs text-[#6E6862]">
                    {isAr 
                      ? "سنوضح لك كيفية ربط مشاريع شركتك ومخازنها ومقدار التوفير المالي المحقق."
                      : "See how IRAM integrates with your current sites and calculate your direct capital savings."}
                  </p>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  <div>
                    <label className="block font-bold text-[#26231F] mb-1">
                      {isAr ? "الاسم بالكامل" : "Full Name"}
                    </label>
                    <input 
                      type="text" 
                      required
                      value={demoFormData.name}
                      onChange={(e) => setDemoFormData({...demoFormData, name: e.target.value})}
                      placeholder={isAr ? "م. أحمد عبد الرحمن" : "Eng. Ahmed Mahmoud"}
                      className="w-full px-3.5 py-2.5 rounded-md border border-[#EAE5DE] bg-white text-[#26231F] text-xs focus:outline-hidden focus:border-[#E85312] focus:ring-1 focus:ring-[#E85312]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#26231F] mb-1">
                      {isAr ? "البريد الإلكتروني للعمل" : "Work Email"}
                    </label>
                    <input 
                      type="email" 
                      required
                      value={demoFormData.email}
                      onChange={(e) => setDemoFormData({...demoFormData, email: e.target.value})}
                      placeholder="ahmed@contractor-corp.com"
                      className="w-full px-3.5 py-2.5 rounded-md border border-[#EAE5DE] bg-white text-[#26231F] text-xs focus:outline-hidden focus:border-[#E85312] focus:ring-1 focus:ring-[#E85312]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-[#26231F] mb-1">
                        {isAr ? "اسم شركة المقاولات" : "Company"}
                      </label>
                      <input 
                        type="text" 
                        required
                        value={demoFormData.company}
                        onChange={(e) => setDemoFormData({...demoFormData, company: e.target.value})}
                        placeholder={isAr ? "السويدي للإنشاءات" : "Al-Bayan Construction"}
                        className="w-full px-3.5 py-2.5 rounded-md border border-[#EAE5DE] bg-white text-[#26231F] text-xs focus:outline-hidden focus:border-[#E85312] focus:ring-1 focus:ring-[#E85312]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#26231F] mb-1">
                        {isAr ? "عدد المشاريع النشطة" : "Active Projects"}
                      </label>
                      <select 
                        value={demoFormData.projects}
                        onChange={(e) => setDemoFormData({...demoFormData, projects: e.target.value})}
                        className="w-full px-3.5 py-2.5 rounded-md border border-[#EAE5DE] bg-white text-[#26231F] text-xs focus:outline-hidden focus:border-[#E85312] focus:ring-1 focus:ring-[#E85312]"
                      >
                        <option value="1–5">1–5 projects</option>
                        <option value="6–15">6–15 projects</option>
                        <option value="16+">16+ projects</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <button 
                    type="submit"
                    className="w-full bg-[#E85312] hover:bg-[#CC4509] text-white font-bold py-3 rounded-md text-sm shadow-md transition-all cursor-pointer"
                  >
                    {isAr ? "إرسال طلب العرض التجريبي ⬅" : "Submit Demo Request →"}
                  </button>
                </div>

                <div className="text-[10px] text-center text-[#6E6862]">
                  {isAr ? "🔒 بياناتك محمية بموجب معايير الخصوصية الصارمة." : "🔒 Your data is protected under strict enterprise NDA."}
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-[#26231F]">
                  {isAr ? "تم استلام طلبك بنجاح!" : "Demo Request Confirmed!"}
                </h3>
                <p className="text-xs text-[#6E6862] max-w-sm mx-auto leading-relaxed">
                  {isAr 
                    ? `شكراً م. ${demoFormData.name || ''}، سيتواصل معك أحد مستشاري حلول IRAM لحجز موعد الجلسة المخصصة.` 
                    : `Thank you ${demoFormData.name || ''}, an IRAM Solutions Architect will contact you shortly to schedule your session.`}
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => {
                      setIsDemoModalOpen(false);
                      onExploreDashboard('Company Admin');
                    }}
                    className="px-6 py-2.5 rounded-md bg-[#26231F] text-white text-xs font-bold hover:bg-black transition-colors cursor-pointer"
                  >
                    {isAr ? "تجربة النموذج الحي الآن" : "Explore Interactive Prototype Now"}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
