import React, { useState } from 'react';
import { 
  Building, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRightLeft, 
  Plus, 
  Clock, 
  Calendar, 
  TrendingDown, 
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Sparkles,
  Search,
  Filter,
  FileText,
  Users,
  CheckCircle,
  ChevronRight,
  Download,
  Share2,
  LayoutGrid,
  List,
  AlertCircle,
  FolderOpen,
  MapPin,
  TrendingUp,
  Package,
  Layers,
  HardHat,
  Truck
} from 'lucide-react';

export default function ProjectManagersView({ 
  selectedProjectId = "PRJ-001", 
  onOpenTransferModal, 
  onBack,
  language 
}) {
  const isAr = language === 'ar';

  // Sub-view: 'dashboard' (Figma Screen 1) | 'projects' (Figma Screen 2 & 3) | 'detail' (Deep BOQ & Shortage View)
  const [currentViewMode, setCurrentViewMode] = useState('dashboard');
  
  // Projects display mode: 'table' (Figma Screen 2) | 'grid' (Figma Screen 3)
  const [projectDisplayMode, setProjectDisplayMode] = useState('table');

  // Active selected project for detail view
  const [activeProjectId, setActiveProjectId] = useState(selectedProjectId || 'PRJ-001');

  // Search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');

  // Deep detail tabs
  const [detailTab, setDetailTab] = useState('overview'); // 'overview' | 'shortages' | 'boq' | 'requisitions'
  const [showRequestModal, setShowRequestModal] = useState(false);

  // New Request Form state
  const [reqMaterial, setReqMaterial] = useState('MAT-001');
  const [reqQty, setReqQty] = useState(50);
  const [reqPriority, setReqPriority] = useState('Urgent');
  const [reqDate, setReqDate] = useState('2026-10-28');
  const [requestSubmittedSuccess, setRequestSubmittedSuccess] = useState(null);

  // 6 Projects matching Figma "new project manager"
  const [projectsList, setProjectsList] = useState([
    {
      id: "PRJ-001",
      code: "AMRC-2026",
      name: "New Mansoura Towers - Sector B",
      nameAr: "أبراج المنصورة السكنية - قطاع B",
      location: "New Mansoura, Sector B4",
      locationAr: "المنصورة الجديدة، قطاع B4",
      manager: "Eng. Eman El-Sayed",
      siteEngineer: "Eng. Mohamed Fathy",
      progress: 48,
      materialStatus: "Shortage Risk",
      materialStatusAr: "خطر نقص مواد",
      statusClass: "bg-rose-50 text-rose-700 border-rose-200",
      totalBudget: "$14,500,000",
      totalSpend: "$6,240,000",
      activeRequirements: 42,
      alertsCount: 2,
      expectedCompletion: "Dec 2026",
      daysLeft: 42
    },
    {
      id: "PRJ-002",
      code: "NACT-2025",
      name: "New Capital Business Complex",
      nameAr: "مجمع أعمال العاصمة الإدارية (CBD)",
      location: "CBD Plot 12, New Capital",
      locationAr: "حي المال والأعمال، العاصمة الإدارية",
      manager: "Eng. Mostafa Salem",
      siteEngineer: "Eng. Rami Fawzy",
      progress: 62,
      materialStatus: "On Track",
      materialStatusAr: "منتظم ومستقر",
      statusClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      totalBudget: "$38,200,000",
      totalSpend: "$28,400,000",
      activeRequirements: 64,
      alertsCount: 0,
      expectedCompletion: "Feb 2027",
      daysLeft: 104
    },
    {
      id: "PRJ-003",
      code: "AWH-2026",
      name: "Alexandria Waterfront Heights",
      nameAr: "أبراج كورنيش الإسكندرية (San Stefano)",
      location: "Corniche Road, San Stefano",
      locationAr: "طريق الكورنيش، سان ستيفانو، الإسكندرية",
      manager: "Eng. Sara Adel",
      siteEngineer: "Eng. Yasser Helmy",
      progress: 77,
      materialStatus: "Surplus Available",
      materialStatusAr: "يوجد فائض تشويني",
      statusClass: "bg-blue-50 text-blue-700 border-blue-200",
      totalBudget: "$19,800,000",
      totalSpend: "$14,950,000",
      activeRequirements: 28,
      alertsCount: 1,
      expectedCompletion: "Nov 2026",
      daysLeft: 18
    },
    {
      id: "PRJ-004",
      code: "CBC-2026",
      name: "Commercial Business Center",
      nameAr: "المركز التجاري الإداري (التجمع الخامس)",
      location: "New Cairo, District 5",
      locationAr: "القاهرة الجديدة، التجمع الخامس",
      manager: "Eng. Tamer Khaled",
      siteEngineer: "Eng. Ahmed Shawky",
      progress: 35,
      materialStatus: "On Track",
      materialStatusAr: "منتظم ومستقر",
      statusClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      totalBudget: "$11,200,000",
      totalSpend: "$3,800,000",
      activeRequirements: 18,
      alertsCount: 0,
      expectedCompletion: "Apr 2027",
      daysLeft: 165
    },
    {
      id: "PRJ-005",
      code: "SLP-2026",
      name: "Sadat City Logistics Park",
      nameAr: "المنطقة اللوجستية بمدينة السادات",
      location: "Industrial Zone 4, Sadat City",
      locationAr: "المنطقة الصناعية الرابعة، مدينة السادات",
      manager: "Eng. Eman El-Sayed",
      siteEngineer: "Eng. Mahmoud Eid",
      progress: 88,
      materialStatus: "Surplus Available",
      materialStatusAr: "يوجد فائض تشويني",
      statusClass: "bg-blue-50 text-blue-700 border-blue-200",
      totalBudget: "$22,400,000",
      totalSpend: "$19,600,000",
      activeRequirements: 15,
      alertsCount: 0,
      expectedCompletion: "Oct 2026",
      daysLeft: 9
    },
    {
      id: "PRJ-006",
      code: "RSR-2027",
      name: "Red Sea Resort Phase 2",
      nameAr: "منتجع البحر الأحمر - المرحلة الثانية",
      location: "El Gouna, Hurghada",
      locationAr: "الجونة، الغردقة",
      manager: "Eng. Kareem Fahmy",
      siteEngineer: "Eng. Nader Zaki",
      progress: 15,
      materialStatus: "Shortage Risk",
      materialStatusAr: "خطر نقص مواد",
      statusClass: "bg-rose-50 text-rose-700 border-rose-200",
      totalBudget: "$27,000,000",
      totalSpend: "$4,100,000",
      activeRequirements: 35,
      alertsCount: 3,
      expectedCompletion: "Aug 2027",
      daysLeft: 290
    }
  ]);

  // Material Alerts matching Figma Screen 1
  const materialAlerts = [
    {
      id: "ALT-01",
      material: "High Tensile Steel Rebar 16mm",
      materialAr: "حديد تسليح 16 مم عالي المقاومة",
      project: "New Mansoura Towers - Sector B",
      projectAr: "أبراج المنصورة - قطاع B",
      date: "02 Nov 2026",
      priority: "Critical",
      priorityAr: "حرج جداً",
      priorityClass: "bg-red-50 text-red-700 border-red-200",
      actionAr: "مناقلة فائض متاحة فوراً من برج العاصمة (+90T)"
    },
    {
      id: "ALT-02",
      material: "Portland Cement 42.5N (CEM I)",
      materialAr: "أسمنت بورتلاندي 42.5N (شيكارة 50كجم)",
      project: "Alexandria Waterfront Heights",
      projectAr: "أبراج كورنيش الإسكندرية",
      date: "28 Oct 2026",
      priority: "High",
      priorityAr: "أولوية عالية",
      priorityClass: "bg-orange-50 text-orange-700 border-orange-200",
      actionAr: "أمر شراء معتمد PO-2026-0392 في الطريق"
    },
    {
      id: "ALT-03",
      material: "Ready-Mix Concrete C35",
      materialAr: "خرسانة جاهزة رتبة 35 نيوتن",
      project: "New Capital Business Complex",
      projectAr: "مجمع أعمال العاصمة الإدارية",
      date: "Tomorrow 08:00 AM",
      priority: "Urgent",
      priorityAr: "عاجل للصب",
      priorityClass: "bg-amber-50 text-amber-700 border-amber-200",
      actionAr: "تم فحص الشدات وجاهز لصب 320 م³"
    },
    {
      id: "ALT-04",
      material: "Bituminous Waterproofing Membrane",
      materialAr: "لفائف عزل مائي بيتوميني 4 مم",
      project: "Sadat City Logistics Park",
      projectAr: "المنطقة اللوجستية بمدينة السادات",
      date: "08 Nov 2026",
      priority: "Medium",
      priorityAr: "متوسط",
      priorityClass: "bg-blue-50 text-blue-700 border-blue-200",
      actionAr: "مخزون كافٍ لمدة 14 يوماً"
    }
  ];

  // Recent Activity Feed matching Figma Screen 1
  const recentActivities = [
    {
      id: "ACT-01",
      titleAr: "تم تنفيذ مناقلة داخلية: نقل 40 طن حديد 16مم من برج العاصمة إلى المنصورة",
      titleEn: "Transfer initiated: 40 Tons 16mm Rebar sent from New Capital to Mansoura",
      time: isAr ? "منذ ساعتين" : "2 hours ago",
      type: "transfer",
      badge: "TR-00101"
    },
    {
      id: "ACT-02",
      titleAr: "تم اعتماد أمر الشراء PO-2026-0418 بقيمة $47,000 مع مصانع حديد عز",
      titleEn: "PO approved: $47,000 to Ezz Steel Mills for Mansoura Slab Pour",
      time: isAr ? "منذ 4 ساعات" : "4 hours ago",
      type: "po",
      badge: "PO-0418"
    },
    {
      id: "ACT-03",
      titleAr: "تم تأكيد الاستلام الميداني: صب 320 م³ خرسانة في سقف المنطقة B4",
      titleEn: "Site delivery confirmed: 320 m³ concrete poured at Zone B4",
      time: isAr ? "أمس 18:30" : "Yesterday",
      type: "site",
      badge: "DEL-882"
    },
    {
      id: "ACT-04",
      titleAr: "رصد فائض بالذكاء الاصطناعي: تم اكتشاف +90 طن حديد مطابق في مخزن العاصمة",
      titleEn: "Surplus detected: +90 Tons 16mm rebar flagged at New Capital Tower",
      time: isAr ? "أمس 14:15" : "Yesterday",
      type: "surplus",
      badge: "AI-SURPLUS"
    }
  ];

  // Filtered projects
  const filteredProjects = projectsList.filter(proj => {
    const matchSearch = proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        proj.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        proj.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        proj.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'all' || 
                        (statusFilter === 'shortage' && proj.materialStatus.includes('Shortage')) ||
                        (statusFilter === 'ontrack' && proj.materialStatus.includes('On Track')) ||
                        (statusFilter === 'surplus' && proj.materialStatus.includes('Surplus'));
    return matchSearch && matchStatus;
  });

  const currentProj = projectsList.find(p => p.id === activeProjectId) || projectsList[0];

  // Material BOQ Table for deep view
  const inventoryItems = [
    {
      id: "MAT-001",
      sku: "STL-RB-16",
      name: "High Tensile Steel Rebar 16mm",
      nameAr: "حديد تسليح عالي المقاومة 16 مم (مشرشر)",
      unit: "Ton",
      plannedBOQ: 420,
      orderedQty: 280,
      receivedQty: 280,
      consumedQty: 254,
      remainingQty: 26,
      reservedQty: 10,
      availableQty: 16,
      dailyBurnRate: 2.8,
      daysLeft: 5.7,
      risk: "High",
      hasInternalMatch: true,
      matchSource: "New Capital Business Complex (90T Surplus)"
    },
    {
      id: "MAT-002",
      sku: "CMT-PORT-42",
      name: "Portland Cement 42.5N",
      nameAr: "أسمنت بورتلاندي عادي 42.5N",
      unit: "Bag (50kg)",
      plannedBOQ: 3500,
      orderedQty: 2200,
      receivedQty: 2200,
      consumedQty: 1850,
      remainingQty: 350,
      reservedQty: 50,
      availableQty: 300,
      dailyBurnRate: 45,
      daysLeft: 6.6,
      risk: "Medium",
      hasInternalMatch: false
    },
    {
      id: "MAT-003",
      sku: "CONC-RM-30",
      name: "Ready-Mix Concrete C30/37",
      nameAr: "خرسانة جاهزة رتبة 30 نيوتن",
      unit: "m³",
      plannedBOQ: 950,
      orderedQty: 520,
      receivedQty: 520,
      consumedQty: 480,
      remainingQty: 40,
      reservedQty: 0,
      availableQty: 40,
      dailyBurnRate: 15,
      daysLeft: 2.6,
      risk: "Normal",
      hasInternalMatch: false
    },
    {
      id: "MAT-004",
      sku: "BLK-CON-20",
      name: "Hollow Concrete Blocks 20x20x40",
      nameAr: "بلوك أسمنتي مفرغ 20×20×40",
      unit: "Thousand Pcs",
      plannedBOQ: 120,
      orderedQty: 60,
      receivedQty: 60,
      consumedQty: 35,
      remainingQty: 25,
      reservedQty: 5,
      availableQty: 20,
      dailyBurnRate: 1.2,
      daysLeft: 16.6,
      risk: "Safe",
      hasInternalMatch: false
    }
  ];

  const handleOpenProjectDetail = (projId) => {
    setActiveProjectId(projId);
    setCurrentViewMode('detail');
  };

  return (
    <div className="space-y-6">

      {/* ============================================================== */}
      {/* 1. TOP HEADER & SUB-VIEW SWITCHER (Matching Figma Board) */}
      {/* ============================================================== */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#CBD5E1] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-xl border border-[#CBD5E1] hover:border-[#E85312] text-[#0F172A] hover:text-[#E85312] transition-colors cursor-pointer"
              title={isAr ? "العودة" : "Back"}
            >
              {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            </button>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E85312]"></span>
              <span className="text-xs font-black uppercase tracking-wider text-[#E85312]">
                {isAr ? "إدارة المشاريع الإنشائية (Project Manager)" : "Project Manager Workspace"}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0F172A] mt-0.5">
              {currentViewMode === 'dashboard' && (isAr ? "لوحة القيادة الميدانية للمشاريع" : "Project Manager Overview")}
              {currentViewMode === 'projects' && (isAr ? "مشاريعي المخصصة (My Projects)" : "My Assigned Projects")}
              {currentViewMode === 'detail' && (isAr ? `مشروع: ${currentProj.nameAr}` : `Project: ${currentProj.name}`)}
            </h1>
          </div>
        </div>

        {/* View Switcher Pills matching Figma Screen 1, 2, 3 */}
        <div className="flex items-center gap-1.5 bg-[#EEF2F6] p-1.5 rounded-xl border border-[#CBD5E1] text-xs font-bold">
          <button
            onClick={() => setCurrentViewMode('dashboard')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              currentViewMode === 'dashboard'
                ? 'bg-white text-[#E85312] shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#E85312]" />
            <span>{isAr ? "الرئيسية (Dashboard)" : "Dashboard"}</span>
          </button>

          <button
            onClick={() => setCurrentViewMode('projects')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              currentViewMode === 'projects'
                ? 'bg-white text-[#E85312] shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building className="w-3.5 h-3.5 text-[#E85312]" />
            <span>{isAr ? "قائمة المشاريع (My Projects)" : "My Projects"}</span>
          </button>

          {currentViewMode === 'detail' && (
            <button
              onClick={() => setCurrentViewMode('detail')}
              className="px-3 py-1.5 rounded-lg bg-white text-[#E85312] shadow-xs font-black flex items-center gap-1.5"
            >
              <Package className="w-3.5 h-3.5 text-[#E85312]" />
              <span>{isAr ? "تفاصيل الـ BOQ" : "Project Detail"}</span>
            </button>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. SCREEN 1: PROJECT MANAGER DASHBOARD (Figma Screen 1) */}
      {/* ============================================================== */}
      {currentViewMode === 'dashboard' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Welcome Greeting Banner matching Figma Screen 1 ("Good morning, Eman") */}
          <div className="bg-gradient-to-r from-white via-orange-50/20 to-white p-6 rounded-2xl border border-[#CBD5E1] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black uppercase text-[#E85312] tracking-wider block">
                {isAr ? "مرحباً بك مجدداً" : "ACTIVE SESSION"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] mt-1">
                {isAr ? "صباح الخير، م. إيمان السيد" : "Good morning, Eman"}
              </h2>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {isAr 
                  ? "إليك نظرة عامة فورية على احتياجات المواد، تنبؤات النقص، وحالة أوامر التوريد لمشاريعك اليوم."
                  : "Here's your projects' material overview for today across all active sites."}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-mono text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>{isAr ? "تحديث مباشر من المواقع" : "Live Telemetry Connected"}</span>
              </span>
              <button
                onClick={() => setCurrentViewMode('projects')}
                className="px-4 py-2 bg-[#E85312] hover:bg-[#CC490F] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
              >
                {isAr ? "عرض كل المشاريع ←" : "View All Projects →"}
              </button>
            </div>
          </div>

          {/* 4 Top KPI Cards matching Figma Screen 1 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Card 1: My Active Projects */}
            <div className="bg-white p-5 rounded-2xl border border-[#CBD5E1] shadow-2xs">
              <span className="text-xs font-bold text-slate-500 block">{isAr ? "مشاريعي النشطة" : "My Active Projects"}</span>
              <div className="text-3xl font-black text-[#0F172A] mt-1.5">5</div>
              <span className="text-[11px] text-emerald-700 font-bold block mt-1">
                {isAr ? "5 نشطة • 2 تسير وفق الجدول" : "5 active, 2 on schedule"}
              </span>
            </div>

            {/* Card 2: Material Requirements */}
            <div className="bg-white p-5 rounded-2xl border border-[#CBD5E1] shadow-2xs">
              <span className="text-xs font-bold text-slate-500 block">{isAr ? "بنود المواد المطلوبة" : "Material Requirements"}</span>
              <div className="text-3xl font-black text-[#E85312] mt-1.5">148</div>
              <span className="text-[11px] text-slate-500 font-bold block mt-1">
                {isAr ? "حسب الجدول الأسبوعي" : "quantities by week"}
              </span>
            </div>

            {/* Card 3: Materials with Shortage Risk */}
            <div className="bg-white p-5 rounded-2xl border border-[#CBD5E1] shadow-2xs">
              <span className="text-xs font-bold text-slate-500 block">{isAr ? "مواد معرضة لخطر النقص" : "Materials with Shortage Risk"}</span>
              <div className="text-3xl font-black text-rose-600 mt-1.5">9</div>
              <span className="text-[11px] text-rose-700 font-bold block mt-1">
                {isAr ? "3 بنود بعجز حرج قبل الصب" : "3 critical deficit items"}
              </span>
            </div>

            {/* Card 4: Pending Orders */}
            <div className="bg-white p-5 rounded-2xl border border-[#CBD5E1] shadow-2xs">
              <span className="text-xs font-bold text-slate-500 block">{isAr ? "أوامر الشراء المعلقة" : "Pending Orders"}</span>
              <div className="text-3xl font-black text-[#2563EB] mt-1.5">7</div>
              <span className="text-[11px] text-blue-700 font-bold block mt-1">
                {isAr ? "4 قيد التوريد والشحن" : "4 pending approval"}
              </span>
            </div>
          </div>

          {/* Middle Table: "My Projects" matching Figma Screen 1 */}
          <div className="bg-white rounded-2xl border border-[#CBD5E1] shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-[#0F172A]">
                  {isAr ? "مشاريعي (المشاريع المسندة إليك)" : "My Projects (Projects assigned to you)"}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isAr ? "متابعة نسب الإنجاز، مؤشرات النقص والفائض، وميزانيات المواد" : "Track progress, material risks, and budget health"}
                </p>
              </div>

              <button
                onClick={() => setCurrentViewMode('projects')}
                className="text-xs font-bold text-[#E85312] hover:underline cursor-pointer"
              >
                {isAr ? "عرض كافة المشاريع الـ 6 ←" : "View All 6 Projects →"}
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right border-collapse">
                <thead>
                  <tr className="bg-[#EEF2F6] text-[11px] font-black uppercase text-[#475569] border-b border-[#CBD5E1]">
                    <th className="py-3 px-4">{isAr ? "اسم المشروع والكود" : "Project Name"}</th>
                    <th className="py-3 px-4">{isAr ? "الموقع الجغرافي" : "Location"}</th>
                    <th className="py-3 px-4">{isAr ? "نسبة الإنجاز" : "Progress"}</th>
                    <th className="py-3 px-4">{isAr ? "حالة المواد بالذكاء الاصطناعي" : "Material Status"}</th>
                    <th className="py-3 px-4">{isAr ? "ميزانية المشروع" : "Project Budget"}</th>
                    <th className="py-3 px-4 text-center">{isAr ? "الإجراء" : "Action"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {projectsList.slice(0, 5).map(proj => (
                    <tr 
                      key={proj.id} 
                      onClick={() => handleOpenProjectDetail(proj.id)}
                      className="hover:bg-orange-50/30 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-black text-[#0F172A] group-hover:text-[#E85312] transition-colors">
                          {isAr ? proj.nameAr : proj.name}
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">{proj.code}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {isAr ? proj.locationAr : proj.location}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${proj.progress > 70 ? 'bg-emerald-500' : proj.progress > 40 ? 'bg-amber-500' : 'bg-blue-500'}`}
                              style={{ width: `${proj.progress}%` }}
                            ></div>
                          </div>
                          <span className="font-mono font-bold text-slate-800 text-[11px]">{proj.progress}%</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border inline-flex items-center gap-1 ${proj.statusClass}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          <span>{isAr ? proj.materialStatusAr : proj.materialStatus}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        {proj.totalBudget}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenProjectDetail(proj.id);
                          }}
                          className="px-3 py-1.5 bg-[#0F172A] group-hover:bg-[#E85312] text-white rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          {isAr ? "عرض المشروع" : "View Project"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Section: Material Alerts & Recent Activity matching Figma Screen 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left Column: Material Alerts */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#CBD5E1] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#E85312]" />
                  <h3 className="text-sm font-black text-[#0F172A]">
                    {isAr ? "تنبيهات المواد والمخاطر (Material Alerts)" : "Material Alerts"}
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-slate-400">4 Active Flags</span>
              </div>

              <div className="space-y-3">
                {materialAlerts.map(alert => (
                  <div key={alert.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 hover:border-[#E85312]/50 transition-all space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#0F172A]">{isAr ? alert.materialAr : alert.material}</span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black border uppercase ${alert.priorityClass}`}>
                        {isAr ? alert.priorityAr : alert.priority}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>{isAr ? alert.projectAr : alert.project}</span>
                      <span className="font-mono text-[#E85312] font-bold">{alert.date}</span>
                    </div>
                    <div className="text-[10px] text-slate-600 bg-white p-2 rounded-lg border border-slate-100 font-medium">
                      💡 {alert.actionAr}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Recent Activity Feed */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#CBD5E1] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-sm font-black text-[#0F172A]">
                    {isAr ? "النشاط الميداني الأخير (Recent Activity)" : "Recent Activity"}
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">Real-time</span>
              </div>

              <div className="space-y-3">
                {recentActivities.map(act => (
                  <div key={act.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#E85312]/10 text-[#E85312] flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                      {act.type === 'transfer' ? '🚚' : act.type === 'po' ? '📄' : act.type === 'site' ? '🏗️' : '⚡'}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-xs font-bold text-slate-800 leading-snug">
                        {isAr ? act.titleAr : act.titleEn}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span className="px-1.5 py-0.5 bg-slate-200 text-slate-700 rounded font-bold">{act.badge}</span>
                        <span>{act.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* 3. SCREEN 2 & 3: "MY PROJECTS" (Table & Grid Views) */}
      {/* ============================================================== */}
      {currentViewMode === 'projects' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* 3 Top KPI Cards matching Figma Screen 2 & 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#CBD5E1] shadow-2xs">
              <span className="text-xs font-bold text-slate-500 block">{isAr ? "المشاريع النشطة المسندة إليك" : "Active Projects"}</span>
              <div className="text-3xl font-black text-[#0F172A] mt-1.5">{projectsList.length}</div>
              <span className="text-[11px] text-emerald-700 font-bold block mt-1">
                {isAr ? "جميعها مسندة لمهندسي موقع معتمدين" : "All assigned / 2 on track"}
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#CBD5E1] shadow-2xs">
              <span className="text-xs font-bold text-slate-500 block">{isAr ? "مشاريع بها مخاطر نقص مواد" : "Projects with Material Shortages"}</span>
              <div className="text-3xl font-black text-rose-600 mt-1.5">3</div>
              <span className="text-[11px] text-rose-700 font-bold block mt-1">
                {isAr ? "2 عجز حرج • 1 عجز قيد المتابعة" : "Critical / 1 at risk"}
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#CBD5E1] shadow-2xs">
              <span className="text-xs font-bold text-slate-500 block">{isAr ? "مشاريع تتطلب اتخاذ قرار" : "Projects Requiring Attention"}</span>
              <div className="text-3xl font-black text-[#E85312] mt-1.5">4</div>
              <span className="text-[11px] text-amber-700 font-bold block mt-1">
                {isAr ? "2 تنبيه نشط • 1 بحاجة لاعتماد أمر شراء" : "2 active alerts / 1 for review"}
              </span>
            </div>
          </div>

          {/* Filter Toolbar & View Switcher (Table vs Grid) matching Figma */}
          <div className="bg-white p-4 rounded-xl border border-[#CBD5E1] shadow-2xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? "بحث باسم المشروع، الموقع، أو الكود..." : "Search project name, location, code..."}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-hidden focus:border-[#E85312]"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-bold focus:outline-hidden focus:border-[#E85312]"
              >
                <option value="all">{isAr ? "حالة المواد: الكل" : "Material Status: All"}</option>
                <option value="shortage">{isAr ? "خطر نقص مواد" : "Shortage Risk"}</option>
                <option value="ontrack">{isAr ? "منتظم ومستقر" : "On Track"}</option>
                <option value="surplus">{isAr ? "يوجد فائض تشويني" : "Surplus Available"}</option>
              </select>

              {/* View Switcher Toggle: Table View vs Grid View */}
              <div className="flex items-center gap-1 bg-[#EEF2F6] p-1 rounded-lg border border-[#CBD5E1]">
                <button
                  onClick={() => setProjectDisplayMode('table')}
                  className={`p-1.5 rounded-md transition-all cursor-pointer ${
                    projectDisplayMode === 'table' ? 'bg-white text-[#E85312] shadow-xs' : 'text-slate-400 hover:text-slate-700'
                  }`}
                  title={isAr ? "عرض الجدول" : "Table View"}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setProjectDisplayMode('grid')}
                  className={`p-1.5 rounded-md transition-all cursor-pointer ${
                    projectDisplayMode === 'grid' ? 'bg-white text-[#E85312] shadow-xs' : 'text-slate-400 hover:text-slate-700'
                  }`}
                  title={isAr ? "عرض البطاقات" : "Card Grid View"}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* SCREEN 4: EMPTY STATE (Figma Screen 4) */}
          {filteredProjects.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#CBD5E1] shadow-xs p-12 text-center space-y-4 max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-orange-50 text-[#E85312] flex items-center justify-center mx-auto border border-orange-200">
                <FolderOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-[#0F172A]">
                {isAr ? "لا توجد مشاريع مسندة حالياً" : "No projects assigned yet"}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                {isAr 
                  ? "المشاريع المسندة إليك ستظهر هنا فور إضافتها. تواصل مع مسؤول الشركة الرئيسي إذا كنت تتوقع مشروعاً جديداً."
                  : "Projects assigned to you will appear here, along with their progress and material status. Contact your company administrator if you expected a new project."}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setCurrentViewMode('dashboard');
                }}
                className="px-5 py-2.5 bg-[#0F172A] hover:bg-[#E85312] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                {isAr ? "العودة للوحة القيادة" : "Back to Dashboard"}
              </button>
            </div>
          ) : projectDisplayMode === 'table' ? (
            
            /* SCREEN 2: TABLE VIEW (Figma Screen 2) */
            <div className="bg-white rounded-2xl border border-[#CBD5E1] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left rtl:text-right border-collapse">
                  <thead>
                    <tr className="bg-[#EEF2F6] text-[11px] font-black uppercase text-[#475569] border-b border-[#CBD5E1]">
                      <th className="py-3.5 px-4">{isAr ? "المشروع" : "Project Name"}</th>
                      <th className="py-3.5 px-4">{isAr ? "الموقع" : "Location"}</th>
                      <th className="py-3.5 px-4">{isAr ? "نسبة الإنجاز" : "Progress"}</th>
                      <th className="py-3.5 px-4">{isAr ? "حالة المواد" : "Material Status"}</th>
                      <th className="py-3.5 px-4">{isAr ? "الموعد المتوقع" : "Expected End"}</th>
                      <th className="py-3.5 px-4">{isAr ? "ميزانية المشروع" : "Budget / Spend"}</th>
                      <th className="py-3.5 px-4 text-center">{isAr ? "الإجراء" : "Action"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filteredProjects.map(proj => (
                      <tr 
                        key={proj.id}
                        onClick={() => handleOpenProjectDetail(proj.id)}
                        className="hover:bg-orange-50/30 transition-colors cursor-pointer group"
                      >
                        <td className="py-4 px-4">
                          <div className="font-black text-[#0F172A] group-hover:text-[#E85312] transition-colors">
                            {isAr ? proj.nameAr : proj.name}
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">{proj.code}</span>
                        </td>
                        <td className="py-4 px-4 text-slate-600 font-medium">
                          {isAr ? proj.locationAr : proj.location}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${proj.progress > 70 ? 'bg-emerald-500' : proj.progress > 40 ? 'bg-amber-500' : 'bg-blue-500'}`}
                                style={{ width: `${proj.progress}%` }}
                              ></div>
                            </div>
                            <span className="font-mono font-bold text-slate-800 text-[11px]">{proj.progress}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border inline-flex items-center gap-1 ${proj.statusClass}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                            <span>{isAr ? proj.materialStatusAr : proj.materialStatus}</span>
                          </span>
                        </td>
                        <td className="py-4 px-4 font-mono text-slate-600">
                          {proj.expectedCompletion}
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-mono font-black text-slate-900">{proj.totalBudget}</div>
                          <div className="text-[10px] text-slate-400 font-mono">Spend: {proj.totalSpend}</div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenProjectDetail(proj.id);
                            }}
                            className="px-3.5 py-2 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
                          >
                            {isAr ? "فتح المشروع" : "Open Project"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            
            /* SCREEN 3: CARD GRID VIEW (Figma Screen 3) */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.map(proj => (
                <div 
                  key={proj.id}
                  onClick={() => handleOpenProjectDetail(proj.id)}
                  className="bg-white rounded-2xl border-2 border-[#CBD5E1] hover:border-[#E85312] p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400 font-bold">{proj.code}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${proj.statusClass}`}>
                        {isAr ? proj.materialStatusAr : proj.materialStatus}
                      </span>
                    </div>

                    <h4 className="font-black text-base text-[#0F172A] group-hover:text-[#E85312] transition-colors">
                      {isAr ? proj.nameAr : proj.name}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{isAr ? proj.locationAr : proj.location}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-bold">{isAr ? "نسبة إنجاز المشروع:" : "Overall Progress:"}</span>
                      <span className="font-mono font-black text-slate-900">{proj.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${proj.progress > 70 ? 'bg-emerald-500' : proj.progress > 40 ? 'bg-amber-500' : 'bg-blue-500'}`}
                        style={{ width: `${proj.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono text-right rtl:text-left pt-0.5">
                      {proj.daysLeft} {isAr ? "يوم متبقي" : "days remaining"}
                    </div>
                  </div>

                  {/* Bottom Metrics Pill */}
                  <div className="grid grid-cols-2 gap-2 text-center text-xs pt-1 border-t border-slate-100">
                    <div className="bg-[#EEF2F6] p-2 rounded-lg">
                      <span className="text-[10px] text-slate-500 block font-bold">{isAr ? "المتطلبات" : "Reqs"}</span>
                      <span className="font-mono font-black text-slate-900">{proj.activeRequirements}</span>
                    </div>
                    <div className="bg-[#EEF2F6] p-2 rounded-lg">
                      <span className="text-[10px] text-slate-500 block font-bold">{isAr ? "التنبيهات" : "Alerts"}</span>
                      <span className={`font-mono font-black ${proj.alertsCount > 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
                        {proj.alertsCount}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenProjectDetail(proj.id);
                    }}
                    className="w-full py-2.5 bg-[#0F172A] group-hover:bg-[#E85312] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{isAr ? "فتح المشروع (Open Project)" : "Open Project"}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* ============================================================== */}
      {/* 4. DEEP PROJECT DETAIL VIEW (BOQ & Material Shortages) */}
      {/* ============================================================== */}
      {currentViewMode === 'detail' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Project Header Bar with Return to Projects */}
          <div className="bg-white p-5 rounded-2xl border border-[#CBD5E1] shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <button 
                  onClick={() => setCurrentViewMode('projects')} 
                  className="hover:text-[#E85312] font-bold"
                >
                  {isAr ? "← العودة إلى قائمة المشاريع" : "← Back to Projects List"}
                </button>
                <ChevronRight className="w-3 h-3" />
                <span className="text-slate-900 font-bold">{isAr ? currentProj.nameAr : currentProj.name}</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                {isAr ? currentProj.nameAr : currentProj.name}
              </h2>
              <div className="text-xs text-slate-500 font-mono mt-0.5">
                Code: {currentProj.code} • {isAr ? currentProj.locationAr : currentProj.location}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowRequestModal(true)}
                className="px-4 py-2.5 rounded-xl bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{isAr ? "طلب مواد جديد (REQ)" : "New Material Requisition"}</span>
              </button>
            </div>
          </div>

          {/* BOQ Material Inventory & Shortage Radar */}
          <div className="bg-white rounded-2xl border border-[#CBD5E1] shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-[#0F172A]">
                  {isAr ? "جدول حصر الكميات والمخزون الميداني (Site BOQ & Real-time Stock)" : "Site BOQ & Real-time Stock"}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isAr ? "مقارنة المخطط الهندسي، التوريدات المستلمة، الاستهلاك الفعلي، ومطابقة الفائض الداخلي" : "Planned vs Received vs Consumed with AI Surplus Matching"}
                </p>
              </div>

              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Auto Sync: 100%
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right border-collapse text-xs">
                <thead>
                  <tr className="bg-[#EEF2F6] text-[11px] font-black uppercase text-[#475569] border-b border-[#CBD5E1]">
                    <th className="py-3.5 px-4">{isAr ? "المادة" : "Material Item"}</th>
                    <th className="py-3.5 px-4 text-center">{isAr ? "المخطط (BOQ)" : "Planned BOQ"}</th>
                    <th className="py-3.5 px-4 text-center">{isAr ? "المستلم" : "Received"}</th>
                    <th className="py-3.5 px-4 text-center">{isAr ? "المستهلك" : "Consumed"}</th>
                    <th className="py-3.5 px-4 text-center">{isAr ? "المتبقي بالموقع" : "Stock Balance"}</th>
                    <th className="py-3.5 px-4 text-center">{isAr ? "المعدل اليومي" : "Daily Burn"}</th>
                    <th className="py-3.5 px-4 text-center">{isAr ? "أيام الكفاية" : "Days Left"}</th>
                    <th className="py-3.5 px-4 text-center">{isAr ? "مطابقة الفائض" : "AI Surplus Match"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inventoryItems.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#0F172A]">{isAr ? item.nameAr : item.name}</div>
                        <span className="text-[10px] text-slate-400 font-mono">{item.sku}</span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-bold">{item.plannedBOQ} {item.unit}</td>
                      <td className="py-3.5 px-4 text-center font-mono text-blue-700">{item.receivedQty}</td>
                      <td className="py-3.5 px-4 text-center font-mono text-slate-700">{item.consumedQty}</td>
                      <td className="py-3.5 px-4 text-center font-mono font-black text-slate-900">{item.remainingQty} {item.unit}</td>
                      <td className="py-3.5 px-4 text-center font-mono text-slate-600">{item.dailyBurnRate} /day</td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded-full font-mono font-black text-xs ${
                          item.daysLeft < 6 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {item.daysLeft} d
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {item.hasInternalMatch ? (
                          <button
                            onClick={onOpenTransferModal}
                            className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-[10px] font-bold flex items-center gap-1 mx-auto transition-colors cursor-pointer"
                          >
                            <Sparkles className="w-3 h-3 text-emerald-600" />
                            <span>{isAr ? "فائض متاح (مناقلة)" : "Surplus Match"}</span>
                          </button>
                        ) : (
                          <span className="text-slate-400 text-[10px] font-mono">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* New Requisition Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="p-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">
                  {isAr ? "طلب مواد إنشائية جديد (Material Requisition)" : "New Material Requisition"}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {isAr ? "سيتم التحقق من الفائض الداخلي لدى مشاريع الشركة قبل الشراء الخارجي" : "Internal availability will be checked before external procurement"}
                </p>
              </div>
              <button onClick={() => setShowRequestModal(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={handleCreateRequest} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">{isAr ? "المادة المطلوبة" : "Material Item"}</label>
                <select 
                  value={reqMaterial}
                  onChange={(e) => setReqMaterial(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                >
                  <option value="MAT-001">High Tensile Steel Rebar 16mm (ASTM A615)</option>
                  <option value="MAT-002">Portland Cement 42.5N (CEM I)</option>
                  <option value="MAT-003">Ready-Mix Concrete C30/37</option>
                  <option value="MAT-004">Hollow Concrete Blocks 20x20x40</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">{isAr ? "الكمية المطلوبة (بالطن/م³)" : "Quantity"}</label>
                  <input 
                    type="number"
                    value={reqQty}
                    onChange={(e) => setReqQty(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">{isAr ? "درجة الأولوية" : "Priority"}</label>
                  <select 
                    value={reqPriority}
                    onChange={(e) => setReqPriority(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-[#E85312]"
                  >
                    <option>Critical (قبل موعد الصب)</option>
                    <option>Urgent</option>
                    <option>Normal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">{isAr ? "تاريخ التوريد المستهدف بالموقع" : "Target Delivery Date"}</label>
                <input 
                  type="date"
                  value={reqDate}
                  onChange={(e) => setReqDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                />
              </div>

              {requestSubmittedSuccess && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-300 text-emerald-800 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>تم التحقق من الفائض الداخلي بنجاح!</span>
                  </div>
                  <p className="text-[11px]">
                    وجد النظام <strong>90 طن فائض مطابق</strong> في مشروع "مجمع أعمال العاصمة". وفرت الشركة <strong>$45,550</strong> بتجنب الشراء الخارجي.
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
              >
                {isAr ? "تأكيد الطلب والتحقق التلقائي من الفائض" : "Submit Requisition & Check Internal Surplus"}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
