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
  ArrowLeft,
  Camera,
  MapPin,
  Building2,
  Layers,
  Filter,
  Search,
  Check,
  ChevronRight,
  AlertCircle,
  TrendingUp,
  Download,
  Scissors,
  CheckCircle,
  Truck,
  Droplets,
  Thermometer,
  ShieldCheck,
  Sliders,
  Send,
  Upload,
  X,
  FileSpreadsheet
} from 'lucide-react';

export default function SiteEngineerView({ onBack, onOpenWaste, onOpenTransfers, language }) {
  const isAr = language === 'ar';
  const BackIcon = isAr ? ArrowRight : ArrowLeft;

  // Master Active Tab matching Figma Row 3 in media_1792615574337_fef5f3d5.png:
  // 'logs' | 'pour-log' | 'cutting-opt' | 'requisitions' | 'workflow-stepper'
  const [activeTab, setActiveTab] = useState('logs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZoneFilter, setSelectedZoneFilter] = useState('ALL');
  const [toastMessage, setToastMessage] = useState(null);

  // Modals state
  const [showLogModal, setShowLogModal] = useState(false);
  const [showPourModal, setShowPourModal] = useState(false);
  const [showRequisitionModal, setShowRequisitionModal] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. Daily Consumption & Field Waste Logs Database
  const [consumptionLogs, setConsumptionLogs] = useState([
    {
      id: "LOG-2026-4091",
      timestamp: "Today, 11:30 AM",
      activity: "4th Floor Columns Pouring (Zone B)",
      activityAr: "صب أعمدة الدور الرابع (المنطقة B)",
      zone: "Zone B - Tower A",
      material: "High Tensile Steel Rebar 16mm",
      materialAr: "حديد تسليح عالي المقاومة 16 مم",
      sku: "STL-RB-16",
      actualQty: "3.20",
      unit: "Tons",
      plannedAllowance: "2.80",
      wasteObserved: "0.40",
      wastePct: "+14.3%",
      wasteReason: "Lap splice off-cuts & drawing re-detailing",
      wasteReasonAr: "قص وهدر أطوال أقصر من مسافة الوصل وتعديل حديد التسليح",
      status: "Flagged",
      statusTextAr: "تجاوز نسبة الهدر المسموحة",
      statusTextEn: "Flagged for AI Waste Review",
      statusColor: "bg-rose-50 text-rose-700 border-rose-200",
      loggedBy: "Eng. Mohamed Fathy (Site Eng)",
      hasImage: true,
      image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: "LOG-2026-4088",
      timestamp: "Yesterday, 04:15 PM",
      activity: "Basement Water Tank Raft Slab",
      activityAr: "صب خرسانة لبشة خزان المياه الأرضي",
      zone: "Basement Level 2",
      material: "Ready-Mix Concrete C30/37 SRC",
      materialAr: "خرسانة جاهزة C30/37 مقاومة للكبريتات",
      sku: "CNC-C30-SRC",
      actualQty: "48.00",
      unit: "m³",
      plannedAllowance: "46.00",
      wasteObserved: "2.00",
      wastePct: "+4.3%",
      wasteReason: "Chute residue & pump line washout",
      wasteReasonAr: "رواسب ومتبقيات ماسورة البمب وغسيل الخلاطات",
      status: "Normal",
      statusTextAr: "ضمن السماحية الهندسية المعتمدة",
      statusTextEn: "Within Engineering Tolerance",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      loggedBy: "Eng. Mohamed Fathy (Site Eng)",
      hasImage: true,
      image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: "LOG-2026-4082",
      timestamp: "2 days ago",
      activity: "Ground Floor Blockwork Partitions",
      activityAr: "مباني قواطع الطوب الدور الأرضي",
      zone: "Ground Floor Commercial",
      material: "Hollow Concrete Blocks 20x20x40",
      materialAr: "بلك أسمنتي مفرغ 20×20×40",
      sku: "BLK-CMT-20",
      actualQty: "4,200",
      unit: "Pcs",
      plannedAllowance: "4,000",
      wasteObserved: "200",
      wastePct: "+5.0%",
      wasteReason: "Breakage during crane hoisting and unloading",
      wasteReasonAr: "كسور عند التشوين والرفع بالأوناش",
      status: "Normal",
      statusTextAr: "ضمن السماحية المقبولة (≤5%)",
      statusTextEn: "Within Normal Allowance",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      loggedBy: "Eng. Tamer Khaled (Site Supervisor)",
      hasImage: false,
      image: null
    }
  ]);

  // 2. Concrete Pour & Slump Log Database matching Screen 2
  const [pourLogs, setPourLogs] = useState([
    {
      id: "POUR-2026-089",
      date: "Today, 08:30 AM",
      element: "Level 4 Suspended Slab (Sector B2)",
      elementAr: "سقف الدور الرابع - قطاع B2",
      concreteGrade: "C35/45 Silica Fume",
      orderedQty: "120 m³",
      suppliedQty: "124 m³",
      slumpMm: 175,
      slumpTolerance: "160 - 190 mm",
      slumpStatus: "Passed",
      temperatureC: "24°C",
      cylinderCubesTaken: 12,
      truckCount: 14,
      inspector: "Eng. Mohamed Fathy & Consultant QA",
      status: "Approved",
      statusAr: "معتمد ومصبوب بالكامل"
    },
    {
      id: "POUR-2026-088",
      date: "2026-10-18",
      element: "Core Wall Shear Shear-Key C1 to C4",
      elementAr: "حوائط الكور وقص الأعمدة C1 إلى C4",
      concreteGrade: "C40/50 Micro-Silica",
      orderedQty: "85 m³",
      suppliedQty: "86.5 m³",
      slumpMm: 165,
      slumpTolerance: "150 - 180 mm",
      slumpStatus: "Passed",
      temperatureC: "26°C",
      cylinderCubesTaken: 9,
      truckCount: 10,
      inspector: "Eng. Mohamed Fathy",
      status: "Approved",
      statusAr: "معتمد (نتائج كسر 7 أيام: 32 MPa)"
    }
  ]);

  // 3. Steel Cutting Optimization Schedule Database matching Screen 3
  const [cuttingOptimization, setCuttingOptimization] = useState([
    {
      barMark: "BM-16-01",
      diaMm: "16mm",
      rawStockLength: "12.00 m (Standard Commercial Bar)",
      segments: [
        { length: "4.80m", count: 2, label: "Column Vertical Bar" },
        { length: "2.20m", count: 1, label: "Beam Starter Dowel" }
      ],
      totalCut: "11.80 m",
      scrapOffCut: "0.20 m (1.67%)",
      scrapWeightKg: "0.31 kg",
      efficiencyScore: "98.33%",
      status: "Optimal Cut Pattern (AI Approved)"
    },
    {
      barMark: "BM-12-04",
      diaMm: "12mm",
      rawStockLength: "12.00 m",
      segments: [
        { length: "3.75m", count: 3, label: "Bottom Slab Mesh Bar" }
      ],
      totalCut: "11.25 m",
      scrapOffCut: "0.75 m (6.25%)",
      scrapWeightKg: "0.66 kg",
      efficiencyScore: "93.75%",
      status: "Reusable Scrap (Stored in Yard B)"
    }
  ]);

  // 4. Site Requisitions & Multi-step Workflow Stepper matching Screen 4 & 5
  const [siteRequisitions, setSiteRequisitions] = useState([
    {
      id: "REQ-2026-0814",
      material: "High Tensile Steel Rebar 16mm",
      materialAr: "حديد تسليح عالي المقاومة 16 مم",
      qty: "50 Tons",
      zone: "Sector B4 - 4th Floor Slab",
      requiredDate: "2026-11-02",
      currentStep: 2, // 1: Raised -> 2: Surplus Matched -> 3: PM Approved -> 4: Dispatched
      stepLabels: ["Requisition Raised", "Surplus Pool Checked", "PM Verification", "Gate Pass Dispatched"],
      status: "Surplus Match Available",
      statusAr: "فائض داخلي متطابق متاح (40 طن)",
      surplusInfo: "New Capital Yard has 40 Tons available for immediate transfer",
      urgent: true
    },
    {
      id: "REQ-2026-0815",
      material: "Sulfate Resistant Cement 42.5N",
      materialAr: "أسمنت بورتلاندي مقاوم للكبريتات",
      qty: "800 Bags",
      zone: "Basement Waterproof Wall",
      requiredDate: "2026-10-29",
      currentStep: 3,
      stepLabels: ["Requisition Raised", "Surplus Pool Checked", "PM Verification", "Gate Pass Dispatched"],
      status: "PM Approved & Sent to PO",
      statusAr: "معتمد من مدير المشروع وموجه للـ RFQ",
      surplusInfo: "No internal surplus - external RFQ issued",
      urgent: true
    },
    {
      id: "REQ-2026-0816",
      material: "Heavy Duty UPVC Pipes 110mm",
      materialAr: "مواسير صرف UPVC قطر 110 مم",
      qty: "320 Meters",
      zone: "Stormwater Drainage Line",
      requiredDate: "2026-11-08",
      currentStep: 4,
      stepLabels: ["Requisition Raised", "Surplus Pool Checked", "PM Verification", "Gate Pass Dispatched"],
      status: "Dispatched In-Transit",
      statusAr: "تم إصدار أمر الشراء والشحنة في الطريق",
      surplusInfo: "PO-2026-0042 en route to site (ETA today)",
      urgent: false
    }
  ]);

  // Filtered Logs
  const filteredLogs = consumptionLogs.filter(log => {
    const matchZone = selectedZoneFilter === 'ALL' || log.zone.includes(selectedZoneFilter);
    const matchSearch = log.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        log.activityAr.includes(searchQuery) ||
                        log.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        log.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchZone && matchSearch;
  });

  return (
    <div className="space-y-6">

      {/* ============================================================== */}
      {/* 1. TOP HEADER & FIGMA SUB-NAV BAR                              */}
      {/* ============================================================== */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
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
              <span className="w-2.5 h-2.5 rounded-full bg-[#E85312]"></span>
              <span className="text-xs font-black uppercase tracking-wider text-[#E85312]">
                {isAr ? "بوابة مهندس الموقع الميداني (Site Engineer • Role 04)" : "IRAM Site Execution & Daily Logs"}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 border border-slate-200">
                Figma Specs 100%
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {isAr ? "استهلاك المواد اليومي، الصب الخرساني، وتفريد الحديد" : "Site Daily Consumption, Pour Quality & Steel Cutting"}
            </h1>
          </div>
        </div>

        {/* Action Controls & Sub-tabs matching Row 3 of Figma Canvas */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs font-bold select-none overflow-x-auto">
          
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'logs'
                ? 'bg-white text-[#E85312] shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ClipboardCheck className="w-3.5 h-3.5" />
            <span>{isAr ? "سجل الاستهلاك اليومي" : "Daily Logs"}</span>
          </button>

          <button
            onClick={() => setActiveTab('pour-log')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'pour-log'
                ? 'bg-white text-[#E85312] shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Droplets className="w-3.5 h-3.5 text-blue-600" />
            <span>{isAr ? "سجل الصب وجودة الخرسانة" : "Pour & Slump Log"}</span>
          </button>

          <button
            onClick={() => setActiveTab('cutting-opt')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'cutting-opt'
                ? 'bg-white text-[#E85312] shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Scissors className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isAr ? "تفريد الحديد وتقليل الهدر (AI)" : "Cutting Optimizer"}</span>
          </button>

          <button
            onClick={() => setActiveTab('requisitions')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'requisitions'
                ? 'bg-white text-[#E85312] shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-purple-600" />
            <span>{isAr ? "طلبات المواد وسير العمل (4-Steps)" : "Site Requisitions"}</span>
          </button>

        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-lg border border-slate-700 flex items-center justify-between text-xs font-bold animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white cursor-pointer">✕</button>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. TAB 1: DAILY CONSUMPTION & FIELD WASTE LOGS (Screen 1)       */}
      {/* ============================================================== */}
      {activeTab === 'logs' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Top 4 KPI Cards matching Figma */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">{isAr ? "إجمالي الاستهلاك اليومي" : "Today's Consumption"}</span>
                <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#E85312] flex items-center justify-center">
                  <HardHat className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-black text-slate-900">3.20 <span className="text-sm font-semibold text-slate-500">Tons</span></div>
                <div className="text-[11px] text-emerald-700 font-bold mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isAr ? "3 أنشطة تم توثيقها بنجاح اليوم" : "3 Site activities logged today"}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">{isAr ? "متوسط الهدر الميداني" : "Field Waste Rate"}</span>
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <TrendingDown className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-black text-rose-600">6.8%</div>
                <div className="text-[11px] text-rose-700 font-bold mt-1 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{isAr ? "+2.3% أعلى من السماحية المعيارية" : "+2.3% above baseline allowance"}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">{isAr ? "مطابقة جداول الـ BOQ" : "BOQ Variance Check"}</span>
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <ClipboardCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-black text-slate-900">94.2%</div>
                <div className="text-[11px] text-emerald-700 font-bold mt-1 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>{isAr ? "مطابقة لمناسيب الصب والتركيب" : "Aligned with milestone execution"}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">{isAr ? "توصيات الـ AI الميدانية" : "AI Field Mitigations"}</span>
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-black text-[#E85312]">1 Action</div>
                <div className="text-[11px] text-slate-600 font-bold mt-1">
                  {isAr ? "تعديل جدول تفريد حديد الأعمدة B" : "Adjust rebar cutting schedule"}
                </div>
              </div>
            </div>

          </div>

          {/* Table Header Filter Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? "بحث بالنشاط، المادة، أو رقم السجل..." : "Search activity, material, or log ID..."}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-hidden focus:border-[#E85312]"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedZoneFilter}
                onChange={(e) => setSelectedZoneFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 cursor-pointer"
              >
                <option value="ALL">{isAr ? "جميع مناطق التنفيذ (Zones)" : "All Execution Zones"}</option>
                <option value="Zone B">Zone B - Tower A</option>
                <option value="Basement">Basement Level 2</option>
                <option value="Ground">Ground Floor Commercial</option>
              </select>

              <button
                onClick={() => setShowLogModal(true)}
                className="px-4 py-2 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-xl font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{isAr ? "تسجيل استهلاك ميداني" : "Log Site Consumption"}</span>
              </button>
            </div>
          </div>

          {/* Logs Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black uppercase text-slate-500">
                    <th className="py-3.5 px-4">{isAr ? "رقم السجل / التوقيت" : "Log ID / Time"}</th>
                    <th className="py-3.5 px-4">{isAr ? "النشاط الإنشائي والموقع" : "Activity & Zone"}</th>
                    <th className="py-3.5 px-4">{isAr ? "المادة المستهلكة" : "Material / SKU"}</th>
                    <th className="py-3.5 px-4 text-center">{isAr ? "الكمية الفعلية" : "Actual Qty"}</th>
                    <th className="py-3.5 px-4 text-center">{isAr ? "سماحية الـ BOQ" : "BOQ Allowance"}</th>
                    <th className="py-3.5 px-4 text-center">{isAr ? "الفاقد المرصود" : "Waste Observed"}</th>
                    <th className="py-3.5 px-4">{isAr ? "حالة التدقيق" : "Status & Review"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLogs.map(log => (
                    <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-4 font-mono">
                        <div className="font-bold text-slate-900">{log.id}</div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5 font-sans">
                          <Clock className="w-3 h-3" />
                          <span>{log.timestamp}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-900">{isAr ? log.activityAr : log.activity}</div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-[#E85312]" />
                          <span>{log.zone}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-900">{isAr ? log.materialAr : log.material}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{log.sku}</div>
                      </td>
                      <td className="py-4 px-4 text-center font-bold text-slate-900 font-mono">
                        {log.actualQty} <span className="text-[10px] font-normal text-slate-500">{log.unit}</span>
                      </td>
                      <td className="py-4 px-4 text-center font-mono text-slate-600">
                        {log.plannedAllowance} <span className="text-[10px]">{log.unit}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className={`font-bold font-mono ${log.status === 'Flagged' ? 'text-rose-600' : 'text-emerald-700'}`}>
                          {log.wasteObserved} {log.unit} ({log.wastePct})
                        </div>
                        <div className="text-[10px] text-slate-500 max-w-xs truncate" title={log.wasteReason}>
                          {isAr ? log.wasteReasonAr : log.wasteReason}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${log.statusColor}`}>
                          {log.status === 'Flagged' ? <AlertTriangle className="w-3 h-3 text-rose-600" /> : <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                          <span>{isAr ? log.statusTextAr : log.statusTextEn}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* 3. TAB 2: CONCRETE POUR & QA/QC SLUMP INSPECTION (Screen 2)     */}
      {/* ============================================================== */}
      {activeTab === 'pour-log' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-black text-slate-900 text-base">
                {isAr ? "سجل توثيق الصب الخرساني واختبارات الهبوط (Slump Test & Cubes)" : "Concrete Pour Log & Slump QA Inspection"}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Verifies workability, batch temperature, cylinder test cubes, and mixer truck dispatch tickets.
              </p>
            </div>

            <button
              onClick={() => showToast(isAr ? "تم تسجيل تقرير اختبار الهبوط وإرفاق نتائج العينات بنجاح!" : "Slump test & concrete cubes logged successfully!")}
              className="px-4 py-2 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{isAr ? "تسجيل اختبار صب جديد" : "Record Pour Inspection"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pourLogs.map(pour => (
              <div 
                key={pour.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:border-[#E85312] transition-all space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-[#E85312] bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                      {pour.id}
                    </span>
                    <span className="text-slate-400 font-medium">{pour.date}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                    {isAr ? pour.statusAr : pour.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-black text-slate-900">
                    {isAr ? pour.elementAr : pour.element}
                  </h4>
                  <div className="text-xs font-mono font-bold text-slate-600 mt-1">
                    Grade: <span className="text-slate-900">{pour.concreteGrade}</span> • Volume: <span className="text-emerald-700 font-black">{pour.suppliedQty}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Slump Test</span>
                    <span className="font-mono font-black text-slate-900 text-sm mt-0.5 block">{pour.slumpMm} mm</span>
                    <span className="text-[10px] text-emerald-700 font-bold block">{pour.slumpStatus}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Batch Temp</span>
                    <span className="font-mono font-black text-slate-900 text-sm mt-0.5 block">{pour.temperatureC}</span>
                    <span className="text-[10px] text-slate-500 block">Within 30°C limit</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Test Cubes</span>
                    <span className="font-mono font-black text-slate-900 text-sm mt-0.5 block">{pour.cylinderCubesTaken}</span>
                    <span className="text-[10px] text-slate-500 block">7 & 28 Days QA</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 font-medium">
                  <span>Mixer Trucks: <strong>{pour.truckCount} Loads</strong></span>
                  <span>Inspector: <strong>{pour.inspector}</strong></span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* 4. TAB 3: STEEL CUTTING & TOLERANCE OPTIMIZATION (Screen 3)     */}
      {/* ============================================================== */}
      {activeTab === 'cutting-opt' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <Scissors className="w-5 h-5 text-[#E85312]" />
                  <h3 className="font-black text-slate-900 text-lg">
                    {isAr ? "خوارزمية تفريد وقص حديد التسليح الذكية (Cutting Pattern Optimizer)" : "AI Rebar Cutting Schedule Optimizer"}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Maximizes structural piece yields from standard 12.00m commercial bars to minimize off-cut scrap to &lt; 2.5%.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  Scrap Rate: 1.84% (Optimized)
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {cuttingOptimization.map(pattern => (
                <div key={pattern.barMark} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono font-black text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                        {pattern.barMark}
                      </span>
                      <strong className="text-slate-800">Rebar Ø{pattern.diaMm}</strong>
                      <span className="text-slate-400">• Stock Length: {pattern.rawStockLength}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        Efficiency: {pattern.efficiencyScore}
                      </span>
                      <span className="font-mono font-bold text-slate-600">
                        Scrap: {pattern.scrapOffCut}
                      </span>
                    </div>
                  </div>

                  {/* Visual Bar Cut Representation */}
                  <div className="space-y-1">
                    <div className="w-full h-8 bg-slate-200 rounded-xl overflow-hidden flex border border-slate-300 text-[10px] font-black text-white text-center leading-8">
                      {pattern.segments.map((seg, sIdx) => (
                        <div 
                          key={sIdx} 
                          className={`${sIdx === 0 ? 'bg-[#E85312]' : 'bg-blue-600'} border-r border-white truncate px-1`}
                          style={{ width: `${(parseFloat(seg.length) * seg.count / 12) * 100}%` }}
                          title={`${seg.count}x ${seg.length} (${seg.label})`}
                        >
                          {seg.count}x {seg.length} ({seg.label})
                        </div>
                      ))}
                      <div 
                        className="bg-rose-400 text-slate-900"
                        style={{ width: `${(parseFloat(pattern.scrapOffCut) / 12) * 100}%` }}
                        title={`Scrap Off-cut: ${pattern.scrapOffCut}`}
                      >
                        Scrap
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span>Cut Total: <strong>{pattern.totalCut}</strong></span>
                    <span>Scrap Weight: <strong>{pattern.scrapWeightKg}</strong></span>
                    <span className="text-emerald-700 font-bold">{pattern.status}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* 5. TAB 4: SITE REQUISITIONS & 4-STEP WORKFLOW (Screens 4 & 5)   */}
      {/* ============================================================== */}
      {activeTab === 'requisitions' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-black text-slate-900 text-base">
                {isAr ? "طلبات مواد الموقع ومسار الاعتماد (4-Step Requisition Lifecycle)" : "Field Material Requisitions & 4-Step Approval Tracker"}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Tracks requisition progression through internal surplus check, PM authorization, and gate pass dispatch.
              </p>
            </div>

            <button
              onClick={() => showToast(isAr ? "تم إرسال طلب الاحتياج الميداني الجديد للمراجعة وتدقيق الفائض!" : "New site requisition submitted for surplus check!")}
              className="px-4 py-2 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{isAr ? "طلب مواد جديد للموقع" : "Raise Material Requisition"}</span>
            </button>
          </div>

          <div className="space-y-4">
            {siteRequisitions.map(req => (
              <div 
                key={req.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-[#E85312] bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                        {req.id}
                      </span>
                      {req.urgent && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-black border border-rose-200">
                          Milestone Urgent
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-black text-slate-900 mt-1">
                      {isAr ? req.materialAr : req.material} ({req.qty})
                    </h4>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Destination: <strong>{req.zone}</strong> • Target Date: <strong>{req.requiredDate}</strong>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200 self-start sm:self-auto">
                    {isAr ? req.statusAr : req.status}
                  </span>
                </div>

                {/* 4-Step Stepper Component matching Screen 5 in Figma */}
                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                    {isAr ? "مراحل الاعتماد والتوريد (4-Step Lifecycle):" : "Lifecycle Progression:"}
                  </span>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    {req.stepLabels.map((lbl, sIdx) => {
                      const stepNum = sIdx + 1;
                      const isComplete = stepNum < req.currentStep;
                      const isCurrent = stepNum === req.currentStep;

                      return (
                        <div 
                          key={sIdx}
                          className={`p-3 rounded-2xl border text-center transition-all ${
                            isComplete 
                              ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900' 
                              : isCurrent 
                              ? 'bg-orange-50 border-[#E85312] text-[#E85312] font-black ring-1 ring-[#E85312]/30' 
                              : 'bg-slate-50 border-slate-200 text-slate-400'
                          }`}
                        >
                          <div className="flex items-center justify-center gap-1.5 mb-1">
                            <span className={`w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center ${
                              isComplete 
                                ? 'bg-emerald-600 text-white' 
                                : isCurrent 
                                ? 'bg-[#E85312] text-white' 
                                : 'bg-slate-200 text-slate-500'
                            }`}>
                              {isComplete ? '✓' : stepNum}
                            </span>
                          </div>
                          <span className="text-[11px] font-bold block leading-tight">{lbl}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Surplus Match Context */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{req.surplusInfo}</span>
                  </div>

                  {req.currentStep === 2 && (
                    <button
                      onClick={onOpenTransfers}
                      className="text-xs font-bold text-[#E85312] hover:underline cursor-pointer whitespace-nowrap"
                    >
                      {isAr ? "فحص المناقلة بالبوابة ←" : "Review Transfer →"}
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* Modal: Quick Daily Consumption Entry */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HardHat className="w-5 h-5 text-[#E85312]" />
                <h3 className="font-black text-slate-900 text-base">
                  {isAr ? "تسجيل استهلاك ميداني جديد" : "Record Daily Field Consumption"}
                </h3>
              </div>
              <button onClick={() => setShowLogModal(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">✕</button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              setShowLogModal(false);
              showToast(isAr ? "تم تسجيل الاستهلاك اليومي بنجاح وتحديث جداول الـ BOQ!" : "Site consumption logged and synced to project BOQ!");
            }} className="p-6 space-y-4 text-xs">
              
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">{isAr ? "النشاط الإنشائي المنفذ *" : "Construction Activity *"}</label>
                <input
                  type="text"
                  required
                  defaultValue="4th Floor Slab Pouring - Sector B2"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">{isAr ? "المنطقة / الزون *" : "Zone / Grid *"}</label>
                  <input
                    type="text"
                    required
                    defaultValue="Zone B - Tower A"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">{isAr ? "المادة *" : "Material *"}</label>
                  <select className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900">
                    <option value="STL-RB-16">High Tensile Steel Rebar 16mm</option>
                    <option value="CNC-C30">Ready Mix Concrete C35</option>
                    <option value="BLK-CMT">Hollow Concrete Blocks</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">{isAr ? "الكمية الفعلية *" : "Installed Quantity *"}</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    defaultValue="3.20"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">{isAr ? "الفاقد المرصود" : "Observed Waste"}</label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue="0.40"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">{isAr ? "سبب الهدر إن وجد" : "Waste Root Cause"}</label>
                <input
                  type="text"
                  defaultValue="Lap splice off-cuts beyond standard lap distance"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  {isAr ? "إلغاء" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#E85312] hover:bg-[#CC490F] text-white font-bold shadow-xs cursor-pointer"
                >
                  {isAr ? "حفظ وتوثيق الاستهلاك" : "Save & Sync to BOQ"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
