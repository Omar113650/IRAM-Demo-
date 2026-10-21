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
  ArrowLeft,
  Search,
  Filter,
  Check,
  Building2,
  Clock,
  Download,
  QrCode,
  FileText,
  AlertTriangle,
  ChevronRight,
  Zap,
  BarChart3,
  Layers,
  ChevronDown,
  Activity,
  Maximize2,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  PieChart as PieIcon,
  Navigation,
  Globe,
  Sliders,
  CheckCircle,
  Info
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line
} from 'recharts';

export default function InternalTransferView({ language, onBack }) {
  const isAr = language === 'ar';
  const BackIcon = isAr ? ArrowRight : ArrowLeft;

  // Selected Sidebar Tab in the telemetry window:
  // 'overview' (نظرة عامة) | 'stocks' (أرصدة المواد) | 'shortages' (تنبيهات العجز) | 'transfers' (نقل الفائض) | 'procurement' (المشتريات)
  const [telemetryTab, setTelemetryTab] = useState('overview');

  // Selected Active Project in sidebar:
  const [selectedProject, setSelectedProject] = useState('ALL');

  // Interactive Transfer Simulation State
  const [isTransferApproved, setIsTransferApproved] = useState(false);
  const [towerBStock, setTowerBStock] = useState(6); // starts at 6t
  const [yardAStock, setYardAStock] = useState(42);  // starts at 42t
  const [coveragePct, setCoveragePct] = useState(67);
  const [activeMatchIndex, setActiveMatchIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);

  // Chart Timeframe Filter
  const [chartMetric, setChartMetric] = useState('volume'); // 'volume' | 'value'

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Handle Interactive Instant Transfer Approval
  const handleExecuteTransfer = () => {
    if (isTransferApproved) return;
    setIsTransferApproved(true);
    setTowerBStock(24); // 6 + 18 = 24 Tons (100% covered!)
    setYardAStock(24);  // 42 - 18 = 24 Tons remaining
    setCoveragePct(100);
    showToast(isAr 
      ? "تم اعتماد النقل الداخلي لـ 18 طن حديد فورياً! تم رفع التغطية إلى 100% وتوفير 489,600 ج.م على المشروع." 
      : "18-Ton Rebar transfer authorized! Deficit coverage reached 100% with EGP 489,600 cost avoidance."
    );
  };

  // Telemetry KPIs
  const telemetryStats = {
    monitoredMaterials: 1284,
    shortageAlerts: isTransferApproved ? 6 : 7,
    surplusShares: 38,
    activeSites: 12,
    activeWarehouses: 4,
    totalAvoidedEgp: isTransferApproved ? 2539600 : 2050000,
    carbonOffsetTons: 14.8
  };

  // Multi-Site Inventory Balances (matching mockup table + reactive to project filter)
  const allBalances = [
    { id: 1, material: "Rebar Ø16", materialAr: "حديد تسليح Ø16", location: "Yard A", locationAr: "مخزن Yard A", qtyNum: yardAStock, qty: `${yardAStock} t`, project: "Central Cairo Logistics Yard", type: "Surplus Pool", isSurplus: true },
    { id: 2, material: "Rebar Ø16", materialAr: "حديد تسليح Ø16", location: "Tower B", locationAr: "برج العاصمة B", qtyNum: towerBStock, qty: `${towerBStock} t`, project: "New Capital Business Tower", type: isTransferApproved ? "Secured Stock" : "Critical Deficit", isShortage: !isTransferApproved },
    { id: 3, material: "C30 Cement", materialAr: "أسمنت C30", location: "Yard B", locationAr: "ساحة تشوين B", qtyNum: 900, qty: "900 b", project: "Al-Mansoura Residential Complex", type: "Healthy Stock" },
    { id: 4, material: "Tiles 60x60", materialAr: "سيراميك 60×60", location: "Villa C", locationAr: "فيلا النرجس C", qtyNum: 310, qty: "310 m²", project: "Al-Mansoura Residential Complex", type: "Surplus Available", isSurplus: true },
    { id: 5, material: "Plywood 18mm", materialAr: "بليوود 18 مم", location: "Yard C", locationAr: "مخزن الإسكندرية", qtyNum: 250, qty: "250 sh", project: "Alexandria Waterfront Heights", type: "Surplus Available", isSurplus: true },
    { id: 6, material: "UPVC Pipes 110", materialAr: "مواسير 110 مم", location: "Yard A", locationAr: "مخزن Yard A", qtyNum: 280, qty: "280 m", project: "Central Cairo Logistics Yard", type: "Surplus Pool", isSurplus: true }
  ];

  const displayedBalances = allBalances.filter(item => {
    if (selectedProject === 'ALL') return true;
    if (selectedProject === 'mansoura') return item.project.includes('Mansoura');
    if (selectedProject === 'capital') return item.project.includes('Capital');
    if (selectedProject === 'villa') return item.locationAr.includes('فيلا');
    return true;
  });

  // Recharts Chart Data: Inter-Site Surplus vs Deficit Distribution
  const crossSiteChartData = [
    { site: isAr ? "ساحة القاهرة A" : "Yard A Cairo", surplus: 42, deficit: 0, balance: 42 },
    { site: isAr ? "برج العاصمة B" : "Tower B Capital", surplus: 0, deficit: isTransferApproved ? 0 : 18, balance: towerBStock },
    { site: isAr ? "كمبوند المنصورة" : "Al-Mansoura", surplus: 28, deficit: 5, balance: 23 },
    { site: isAr ? "أبراج الإسكندرية" : "Alexandria Heights", surplus: 15, deficit: 8, balance: 7 },
    { site: isAr ? "فيلا النرجس C" : "Villa C Yard", surplus: 12, deficit: 0, balance: 12 }
  ];

  // Recharts Chart Data: Steel Rebar Ø16 Stock Depletion Timeline (Days to Stoppage)
  const burnRateForecastData = [
    { day: "Oct 21", baselineWithoutTransfer: 12.0, withTransferIntervention: 12.0, safetyStock: 10.0 },
    { day: "Oct 26", baselineWithoutTransfer: 9.5, withTransferIntervention: 27.5, safetyStock: 10.0 },
    { day: "Oct 31", baselineWithoutTransfer: 7.0, withTransferIntervention: 25.0, safetyStock: 10.0 },
    { day: "Nov 05", baselineWithoutTransfer: 4.2, withTransferIntervention: 22.2, safetyStock: 10.0 },
    { day: "Nov 10", baselineWithoutTransfer: 1.8, withTransferIntervention: 19.8, safetyStock: 10.0 },
    { day: "Nov 14", baselineWithoutTransfer: 0.0, withTransferIntervention: 18.0, safetyStock: 10.0 }
  ];

  // Health Donut Chart Data
  const stockHealthPieData = [
    { name: isAr ? "مخزون آمن" : "Safe Stock", value: 68, color: "#10B981" },
    { name: isAr ? "فائض متاح" : "Surplus Pool", value: 22, color: "#E85312" },
    { name: isAr ? "نقص حرج" : "Critical Deficit", value: isTransferApproved ? 2 : 7, color: "#EF4444" },
    { name: isAr ? "منخفض" : "Low Stock", value: 3, color: "#F59E0B" }
  ];

  // Carousel of Smart Matches
  const smartMatches = [
    {
      id: "M-01",
      title: isAr ? "سيراميك 60×60 • فيلا النرجس ⬅ مدخل برج B" : "Porcelain Tiles 60x60 • Villa C ➔ Tower B Entrance",
      material: "Vitrified Porcelain 60x60",
      qty: "310 m²",
      savings: "EGP 178,500",
      distance: "45 km",
      source: "Villa C Yard",
      target: "Tower B Entrance"
    },
    {
      id: "M-02",
      title: isAr ? "حديد تسليح 16 مم • مخزن Yard A ⬅ برج العاصمة B" : "Steel Rebar 16mm • Yard A ➔ Tower B",
      material: "High Tensile Steel Rebar 16mm",
      qty: "18.0 Tons",
      savings: "EGP 489,600",
      distance: "65 km",
      source: "Central Cairo Yard A",
      target: "Capital Tower B"
    },
    {
      id: "M-03",
      title: isAr ? "بليوود 18 مم عازل • كمبوند المنصورة ⬅ أبراج الإسكندرية" : "Marine Plywood 18mm • Al-Mansoura ➔ Alexandria",
      material: "Marine Plywood BS 1088",
      qty: "250 Sheets",
      savings: "EGP 112,000",
      distance: "110 km",
      source: "Mansoura Yard 1",
      target: "Alexandria Staging Yard"
    }
  ];

  const currentMatch = smartMatches[activeMatchIndex];

  return (
    <div className="space-y-6">

      {/* ============================================================== */}
      {/* 1. TOP HEADER & BREADCRUMBS                                     */}
      {/* ============================================================== */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-xl border border-slate-200 hover:border-[#E85312] text-slate-800 hover:text-[#E85312] transition-colors cursor-pointer"
              title={isAr ? "العودة" : "Back"}
            >
              <BackIcon className="w-4 h-4" />
            </button>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-700">
                {isAr ? "نظام الرصد التليميتري الفوري وإعادة التوجيه (Section 06 Smart Telemetry)" : "IRAM Real-Time Telemetry & Inter-Site Reallocation"}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-orange-50 text-[10px] font-bold text-[#E85312] border border-orange-200">
                Figma High-Fidelity
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {isAr ? "منظومة توفر المواد، تنبؤ العجز، والمناقلات الداخلية" : "Cross-Project Material Readiness & Autonomous Transfers"}
            </h1>
          </div>
        </div>

        {/* Global Reset / Sync Actions */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => {
              setIsTransferApproved(false);
              setTowerBStock(6);
              setYardAStock(42);
              setCoveragePct(67);
              showToast(isAr ? "تم إعادة ضبط المحاكاة اللحظية للمخازن." : "Telemetry simulation reset to initial state.");
            }}
            className="px-3.5 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reset Simulation"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>{isAr ? "إعادة الضبط" : "Reset Demo"}</span>
          </button>

          <div className="px-3 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-xs font-black flex items-center gap-1.5">
            <Coins className="w-4 h-4 text-emerald-600" />
            <span>{isAr ? `توفير كلي: EGP ${telemetryStats.totalAvoidedEgp.toLocaleString()}` : `Saved: EGP ${telemetryStats.totalAvoidedEgp.toLocaleString()}`}</span>
          </div>
        </div>
      </div>

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-xl border border-slate-700 flex items-center justify-between text-xs font-bold animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="leading-relaxed">{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white cursor-pointer px-2">✕</button>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. THE EXACT MACOS / FIGMA BROWSER WINDOW VIEWPORT CONTAINER    */}
      {/* ============================================================== */}
      <div className="bg-slate-100/80 p-3 sm:p-5 rounded-3xl border border-slate-300 shadow-2xl relative overflow-hidden">
        
        {/* Browser Top Window Bar matching Figma media_1792615583974_4db032c7.png */}
        <div className="bg-white rounded-t-2xl border-b border-slate-200 px-4 py-3 flex items-center justify-between gap-3 shadow-2xs">
          
          {/* Left Window Control Dots (macOS style) */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-400 inline-block shadow-2xs"></span>
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block shadow-2xs"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block shadow-2xs"></span>
          </div>

          {/* Center Address URL Bar */}
          <div className="flex-1 max-w-lg mx-auto flex items-center justify-center">
            <div className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-1.5 flex items-center justify-center gap-2 text-xs font-mono text-slate-600 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="font-semibold text-slate-800">app.iram.systems/overview</span>
            </div>
          </div>

          {/* Right Live Telemetry Badge */}
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[10px] font-black border border-emerald-300 shadow-2xs">
              LIVE TELEMETRY
            </span>
          </div>
        </div>

        {/* Browser Inner Body: Sidebar (right for RTL, left for LTR) + Main Content */}
        <div className="bg-white rounded-b-2xl border-x border-b border-slate-200 shadow-inner flex flex-col lg:flex-row overflow-hidden">
          
          {/* Main Dashboard Canvas on the left/center */}
          <div className="flex-1 p-5 sm:p-8 space-y-6 order-2 lg:order-1">
            
            {/* Top Telemetry Heading matching Figma */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {isAr ? "جاهزية وتوفر المواد عبر المواقع" : "Material Readiness & Site Availability"}
                </h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  {isAr 
                    ? `محدث آلياً قبل 4 دقائق • ${telemetryStats.activeSites} مشروع و ${telemetryStats.activeWarehouses} مخازن مركزية` 
                    : `Auto-updated 4 mins ago • ${telemetryStats.activeSites} Projects & ${telemetryStats.activeWarehouses} Central Warehouses`}
                </p>
              </div>

              {/* Status Pill matching mockup */}
              <div className="self-start sm:self-auto">
                <span className="px-3.5 py-1.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 font-bold text-xs flex items-center gap-1.5 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>{isAr ? "البيانات متصلة" : "Data Connected"}</span>
                </span>
              </div>
            </div>

            {/* 3 Large KPI Summary Cards Container matching Figma mockup */}
            <div className="bg-slate-50/70 p-5 rounded-3xl border border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              
              <div className="p-3">
                <span className="text-xs font-bold text-slate-500 block">
                  {isAr ? "مادة مرصودة" : "Monitored Items"}
                </span>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 mt-1.5 font-mono">
                  {telemetryStats.monitoredMaterials.toLocaleString()}
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 block">100% ERP Synchronized</span>
              </div>

              <div className="p-3 border-y sm:border-y-0 sm:border-x border-slate-200">
                <span className="text-xs font-bold text-rose-600 block">
                  {isAr ? "تنبيهات نقص" : "Shortage Alerts"}
                </span>
                <div className="text-3xl sm:text-4xl font-black text-rose-600 mt-1.5 font-mono">
                  {telemetryStats.shortageAlerts}
                </div>
                <span className="text-[10px] text-rose-500 mt-0.5 block font-bold">
                  {isTransferApproved ? (isAr ? "تم حل عجز برج B بنجاح" : "Tower B Deficit Resolved") : (isAr ? "تهدد مواعيد الصب الإنشائي" : "Critical pour date risks")}
                </span>
              </div>

              <div className="p-3">
                <span className="text-xs font-bold text-emerald-700 block">
                  {isAr ? "حصص فائض" : "Surplus Allocations"}
                </span>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 mt-1.5 font-mono">
                  {telemetryStats.surplusShares}
                </div>
                <span className="text-[10px] text-emerald-600 mt-0.5 block font-bold">
                  {isAr ? "جاهزة للنقل الفوري" : "Ready for next-day haul"}
                </span>
              </div>

            </div>

            {/* 2 Main Visual Cards Row matching Figma: Critical Shortage Card vs Live Inventory Table */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Card 1: Critical Alert Card (Box with orange border) */}
              <div className={`p-6 rounded-3xl border-2 transition-all flex flex-col justify-between space-y-5 ${
                isTransferApproved 
                  ? 'bg-emerald-50/50 border-emerald-300' 
                  : 'bg-orange-50/40 border-[#E85312] shadow-sm'
              }`}>
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {isTransferApproved ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600 animate-in zoom-in duration-300" />
                      ) : (
                        <div className="relative flex items-center justify-center">
                          <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-orange-400 opacity-75"></span>
                          <AlertTriangle className="w-5 h-5 text-[#E85312] relative z-10" />
                        </div>
                      )}
                      <span className={`text-xs font-black uppercase tracking-wider ${
                        isTransferApproved ? 'text-emerald-700' : 'text-[#E85312]'
                      }`}>
                        {isTransferApproved 
                          ? (isAr ? "تم تأمين الاحتياج من الفائض" : "Shortage Secured via Transfer") 
                          : (isAr ? "إنذار نقص حرج" : "Critical Shortage Warning")}
                      </span>
                    </div>

                    <span className="font-mono text-xs font-bold text-slate-500">
                      PO-0182
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 font-mono mt-3">
                    Rebar Ø16 - Tower B
                  </h3>

                  <p className="text-xs text-slate-700 mt-1.5 leading-relaxed font-medium">
                    {isAr 
                      ? "الاحتياج: 18 طن بحلول 14 نوفمبر لصب سقف الدور الرابع" 
                      : "Required: 18 Tons by Nov 14 for 4th floor structural slab pour"}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    {isAr ? "معدل الحرق اليومي: 0.8 طن/يوم" : "Burn rate: 0.8 Tons/day"}
                  </span>

                  <span className={`px-3 py-1.5 rounded-xl font-bold text-xs border ${
                    isTransferApproved
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border-amber-300 font-black'
                  }`}>
                    {isTransferApproved 
                      ? (isAr ? "مخزون آمن يكفي 45 يوماً" : "Safe 45-day supply") 
                      : (isAr ? "خطر توقف بعد 24 يوم" : "Work stoppage in 24 days")}
                  </span>
                </div>
              </div>

              {/* Card 2: Live Site Balances Table matching Figma */}
              <div className="p-6 rounded-3xl border border-slate-200 bg-slate-50/60 shadow-xs flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#E85312]" />
                      <h4 className="font-black text-slate-900 text-sm">
                        {isAr ? "أرصدة المواقع الآنية" : "Live Site Inventory Balances"}
                      </h4>
                    </div>

                    <span className="text-[10px] font-mono text-slate-400">
                      Telemetry: 100% Synced
                    </span>
                  </div>

                  <div className="overflow-x-auto mt-2">
                    <table className="w-full text-left rtl:text-right text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-400 text-[10px] uppercase font-bold">
                          <th className="py-2">{isAr ? "المادة" : "Material"}</th>
                          <th className="py-2">{isAr ? "الموقع" : "Location"}</th>
                          <th className="py-2 text-right rtl:text-left">{isAr ? "الكمية" : "Quantity"}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-bold">
                        {displayedBalances.slice(0, 4).map(item => (
                          <tr key={item.id} className="text-slate-800 hover:bg-white/80 transition-colors">
                            <td className="py-2.5 font-mono">
                              <div>{isAr ? item.materialAr : item.material}</div>
                            </td>
                            <td className={`py-2.5 ${item.isShortage ? 'text-[#E85312] font-black' : 'text-slate-600'}`}>
                              {isAr ? item.locationAr : item.location}
                            </td>
                            <td className={`py-2.5 text-right rtl:text-left font-mono font-black ${
                              item.isShortage ? 'text-[#E85312] text-sm' : item.isSurplus ? 'text-emerald-700' : 'text-slate-900'
                            }`}>
                              {item.qty}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 font-mono text-center pt-1 border-t border-slate-200/60">
                  Showing top telemetry streams for Greater Cairo & Delta projects
                </div>
              </div>

            </div>

            {/* Bottom Card: Smart Internal Transfer Suggestion (Progress Bar & Action) */}
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-orange-50/90 via-amber-50/80 to-orange-50/90 border border-orange-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                    <span className="text-xs font-black uppercase text-[#E85312]">
                      {isAr ? "اقتراح نقل داخلي ذكي (فائض ← عجز)" : "Smart Inter-Site Transfer Recommendation"}
                    </span>
                  </div>

                  <h4 className="text-lg font-black text-slate-900 mt-1">
                    {isAr 
                      ? "حديد تسليح 16 مم متوفرة كفائض في مخزن Yard A"
                      : "High Tensile Steel Rebar 16mm available as surplus in Yard A"}
                  </h4>

                  <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                    {isAr 
                      ? (isTransferApproved 
                          ? "تم اعتماد ونقل 18 طن بنجاح! تم حجز الشحنة للشحن الميداني وسد العجز بنسبة 100%." 
                          : "المناقلة الداخلية من Yard A تسد 67% من العجز الحرج لبرج B مباشرة، وتوفر 489,600 ج.م على الميزانية وتختصر وقت التوريد إلى 24 ساعة فقط.")
                      : (isTransferApproved 
                          ? "Transfer executed! 18 Tons reserved for immediate dispatch. Deficit fully resolved." 
                          : "Transferring from Yard A directly satisfies 67% of Tower B deficit, avoiding EGP 489,600 in spot buy premiums.")}
                  </p>
                </div>

                {/* Actions Buttons */}
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={handleExecuteTransfer}
                    disabled={isTransferApproved}
                    className={`px-7 py-3.5 rounded-2xl font-black text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer ${
                      isTransferApproved
                        ? 'bg-emerald-600 text-white shadow-emerald-200 cursor-default'
                        : 'bg-[#E85312] hover:bg-[#CC490F] text-white hover:scale-102 active:scale-98'
                    }`}
                  >
                    {isTransferApproved ? <Check className="w-4 h-4" /> : null}
                    <span>{isTransferApproved ? (isAr ? "تم اعتماد النقل ✓" : "Transfer Authorized ✓") : (isAr ? "اعتماد النقل ←" : "Authorize Transfer →")}</span>
                  </button>

                  <button
                    onClick={() => showToast(isAr ? "تم توجيه العجز المتبقي لقسم المشتريات لطرح RFQ تكميلي." : "Residual shortage routed to Procurement Officer for spot RFQ.")}
                    className="px-4 py-3.5 rounded-2xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                  >
                    {isAr ? "شراء خارجي فوري" : "Spot External Buy"}
                  </button>
                </div>
              </div>

              {/* Dynamic Animated Progress Bar matching Coverage 67% in mockup */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700">
                    {isAr ? "نسبة تغطية العجز من الفائض الداخلي:" : "Deficit Coverage Ratio from Internal Surplus:"}
                  </span>
                  <span className="font-mono text-sm font-black text-[#E85312]">
                    Coverage {coveragePct}%
                  </span>
                </div>
                
                <div className="w-full h-3.5 bg-slate-200/90 rounded-full overflow-hidden p-0.5">
                  <div 
                    className={`h-full rounded-full transition-all duration-700 ${
                      isTransferApproved ? 'bg-emerald-500' : 'bg-[#E85312]'
                    }`}
                    style={{ width: `${coveragePct}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-0.5">
                  <span>Available in Yard A: <strong>{yardAStock} Tons</strong></span>
                  <span>Required by Tower B: <strong>18.0 Tons</strong></span>
                  <span>Status: <strong>{isTransferApproved ? "Fully Covered" : "Action Needed"}</strong></span>
                </div>
              </div>
            </div>

            {/* ============================================================== */}
            {/* 3. NEW ENHANCED CHARTS SECTION (Requested by User)            */}
            {/* ============================================================== */}
            <div className="pt-4 space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#E85312]" />
                    <span>{isAr ? "التحليلات البيانية للأرصدة والفائض عبر المواقع" : "Cross-Site Telemetry Analytics & Forecasting"}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Real-time visualizations comparing surplus reserves, deficit risks, and inventory runout curves.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                  <button
                    onClick={() => setChartMetric('volume')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      chartMetric === 'volume' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                    }`}
                  >
                    {isAr ? "بالكميات (Tons)" : "Volume (Tons)"}
                  </button>
                  <button
                    onClick={() => setChartMetric('value')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      chartMetric === 'value' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                    }`}
                  >
                    {isAr ? "بالقيمة (EGP)" : "Value (EGP)"}
                  </button>
                </div>
              </div>

              {/* 2 Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Chart 1: Cross-Site Surplus vs Deficit Bar Chart */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-slate-900 text-sm">
                        {isAr ? "مقارنة الفائض والعجز بين مواقع الشركة" : "Surplus vs Deficit Across Project Sites"}
                      </h4>
                      <span className="text-[11px] text-slate-400">Green: Available Surplus • Red: Shortage Risk</span>
                    </div>
                  </div>

                  <div className="h-64 w-full pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={crossSiteChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="site" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
                        <Tooltip 
                          formatter={(value, name) => [`${value} Tons`, name === 'surplus' ? (isAr ? 'فائض متاح' : 'Surplus') : (isAr ? 'عجز مطلوب' : 'Deficit')]}
                          contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '12px', fontSize: '11px' }}
                        />
                        <Bar dataKey="surplus" fill="#10B981" radius={[6, 6, 0, 0]} name="surplus" />
                        <Bar dataKey="deficit" fill="#EF4444" radius={[6, 6, 0, 0]} name="deficit" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart 2: Inventory Burn Rate & Runout Forecast (Area / Line Chart) */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-slate-900 text-sm">
                        {isAr ? "منحنى استهلاك حديد 16 مم وتفادي التوقف بالصب" : "Rebar Ø16 Depletion Curve: Without vs With Transfer"}
                      </h4>
                      <span className="text-[11px] text-slate-400">Orange: With Internal Transfer (Safe) • Red: Without Transfer (Stoppage)</span>
                    </div>
                  </div>

                  <div className="h-64 w-full pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={burnRateForecastData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorWithTransfer" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#E85312" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#E85312" stopOpacity={0.0}/>
                          </linearGradient>
                          <linearGradient id="colorWithoutTransfer" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
                        <Tooltip 
                          formatter={(value, name) => [`${value} Tons`, name === 'withTransferIntervention' ? (isAr ? 'مع النقل الداخلي' : 'With Transfer') : (isAr ? 'بدون نقل (خطر)' : 'Without Transfer')]}
                          contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '12px', fontSize: '11px' }}
                        />
                        <Area type="monotone" dataKey="withTransferIntervention" stroke="#E85312" strokeWidth={2.5} fillOpacity={1} fill="url(#colorWithTransfer)" name="withTransferIntervention" />
                        <Line type="monotone" dataKey="baselineWithoutTransfer" stroke="#EF4444" strokeWidth={2} strokeDasharray="4 4" name="baselineWithoutTransfer" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>

              {/* Donut Chart: Inventory Health Breakdown across 12 Projects */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 max-w-sm">
                  <h4 className="font-black text-slate-900 text-base">
                    {isAr ? "مؤشر صحة المخزون الإجمالي للشركة" : "Company-Wide Stock Health Score"}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {isAr 
                      ? "توزيع أرصدة المواد عبر 12 مشروعاً: 68% مخزون آمن ومطابق لمراحل التنفيذ، 22% فائض قابل لإعادة التوجيه، و 2% فقط عجز حرج تحت المعالجة." 
                      : "Multi-project breakdown: 68% in safe operational buffer, 22% declared as surplus pool for brother sites, and 2% active critical deficits under mitigation."}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-bold">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                      <span>Safe Stock (68%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#E85312]"></span>
                      <span>Surplus Pool (22%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                      <span>Critical (2%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                      <span>Low Stock (3%)</span>
                    </div>
                  </div>
                </div>

                <div className="w-48 h-48 relative shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stockHealthPieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {stockHealthPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-black text-slate-900">95%</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Ready</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom-Right Floating Smart Reallocation Notification Popup matching Mockup */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xl flex items-center justify-between gap-4 max-w-lg">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#E85312] flex items-center justify-center shrink-0 shadow-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-[#E85312] block">
                    {isAr ? "تنبيه مطابقة ذكي (Smart Match)" : "Autonomous Reallocation Match"}
                  </span>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">
                    {currentMatch.title}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    Qty: {currentMatch.qty} • Distance: {currentMatch.distance} • Net Saved: <strong className="text-emerald-700">{currentMatch.savings}</strong>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => setActiveMatchIndex((prev) => (prev + 1) % smartMatches.length)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  title="Next Match"
                >
                  Next
                </button>
                <button
                  onClick={() => {
                    showToast(isAr ? `تم تحويل ${currentMatch.title} للاعتماد الفوري!` : `Transfer for ${currentMatch.material} submitted!`);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-bold text-[11px] hover:bg-[#E85312] transition-colors cursor-pointer"
                >
                  {isAr ? "اعتماد" : "Match"}
                </button>
              </div>
            </div>

          </div>

          {/* Dedicated Right Sidebar matching Figma media_1792615583974_4db032c7.png */}
          <div className="w-full lg:w-64 bg-slate-50/90 border-t lg:border-t-0 lg:border-l border-slate-200 p-5 space-y-6 order-1 lg:order-2 shrink-0">
            
            {/* Navigation Tabs in Sidebar matching Mockup */}
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-2 px-2">
                {isAr ? "التنقل التليميتري" : "Telemetry Views"}
              </span>

              <button
                onClick={() => setTelemetryTab('overview')}
                className={`w-full px-3 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between transition-all cursor-pointer ${
                  telemetryTab === 'overview'
                    ? 'bg-white text-[#E85312] border-r-4 border-[#E85312] shadow-xs font-black'
                    : 'text-slate-700 hover:bg-slate-200/60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E85312]"></span>
                  <span>{isAr ? "نظرة عامة" : "Overview"}</span>
                </div>
              </button>

              <button
                onClick={() => setTelemetryTab('stocks')}
                className={`w-full px-3 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between transition-all cursor-pointer ${
                  telemetryTab === 'stocks'
                    ? 'bg-white text-[#E85312] border-r-4 border-[#E85312] shadow-xs font-black'
                    : 'text-slate-700 hover:bg-slate-200/60'
                }`}
              >
                <span>{isAr ? "أرصدة المواد" : "Material Stocks"}</span>
              </button>

              <button
                onClick={() => setTelemetryTab('shortages')}
                className={`w-full px-3 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between transition-all cursor-pointer ${
                  telemetryTab === 'shortages'
                    ? 'bg-white text-[#E85312] border-r-4 border-[#E85312] shadow-xs font-black'
                    : 'text-slate-700 hover:bg-slate-200/60'
                }`}
              >
                <span>{isAr ? "تنبيهات العجز" : "Shortage Alerts"}</span>
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white font-mono text-[10px] font-black flex items-center justify-center">
                  3
                </span>
              </button>

              <button
                onClick={() => setTelemetryTab('transfers')}
                className={`w-full px-3 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between transition-all cursor-pointer ${
                  telemetryTab === 'transfers'
                    ? 'bg-white text-[#E85312] border-r-4 border-[#E85312] shadow-xs font-black'
                    : 'text-slate-700 hover:bg-slate-200/60'
                }`}
              >
                <span>{isAr ? "نقل الفائض" : "Surplus Transfer"}</span>
              </button>

              <button
                onClick={() => setTelemetryTab('procurement')}
                className={`w-full px-3 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between transition-all cursor-pointer ${
                  telemetryTab === 'procurement'
                    ? 'bg-white text-[#E85312] border-r-4 border-[#E85312] shadow-xs font-black'
                    : 'text-slate-700 hover:bg-slate-200/60'
                }`}
              >
                <span>{isAr ? "المشتريات" : "Procurement"}</span>
              </button>
            </div>

            {/* Active Projects List matching Mockup */}
            <div className="space-y-2 pt-4 border-t border-slate-200">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block px-2">
                {isAr ? "المشاريع النشطة" : "Active Projects"}
              </span>

              <div className="space-y-1">
                <button
                  onClick={() => setSelectedProject('ALL')}
                  className={`w-full text-left rtl:text-right px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedProject === 'ALL'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200/60'
                  }`}
                >
                  {isAr ? "• جميع المشاريع (12)" : "• All Projects (12)"}
                </button>

                <button
                  onClick={() => setSelectedProject('mansoura')}
                  className={`w-full text-left rtl:text-right px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedProject === 'mansoura'
                      ? 'bg-[#E85312] text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-200/60'
                  }`}
                >
                  {isAr ? "• كمبوند المنصورة" : "• Al-Mansoura Complex"}
                </button>

                <button
                  onClick={() => setSelectedProject('capital')}
                  className={`w-full text-left rtl:text-right px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedProject === 'capital'
                      ? 'bg-[#E85312] text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-200/60'
                  }`}
                >
                  {isAr ? "• برج العاصمة B" : "• New Capital Tower B"}
                </button>

                <button
                  onClick={() => setSelectedProject('villa')}
                  className={`w-full text-left rtl:text-right px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedProject === 'villa'
                      ? 'bg-[#E85312] text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-200/60'
                  }`}
                >
                  {isAr ? "• فيلا النرجس C" : "• Narjis Villa C"}
                </button>
              </div>
            </div>

            {/* Quick Live Weather / Site Conditions */}
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-1 text-xs">
              <div className="flex items-center justify-between text-slate-500 font-bold text-[10px]">
                <span>Logistics Haul Weather</span>
                <span className="text-emerald-700">Clear Skies</span>
              </div>
              <div className="text-slate-800 font-bold">Ring Road & Axis: Normal Traffic</div>
              <div className="text-[10px] text-slate-400 font-mono">Avg Transit Speed: 62 km/h</div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
