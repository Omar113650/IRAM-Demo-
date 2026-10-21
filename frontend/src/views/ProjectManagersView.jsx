import React, { useState } from 'react';
import { 
  Building, 
  Building2,
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
  UserPlus,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  Check,
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

  // Sub-view: 'dashboard' (Figma Screen 1) | 'projects' (Figma Screen 2 & 3) | 'team' (Users & Team) | 'detail' (Deep BOQ & Shortage View)
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

  // Users & Team states matching Figma Screen 2 & Screen 3 ("دول بردوا عند البروجيكن مانجر")
  const [teamViewMode, setTeamViewMode] = useState('populated'); // 'populated' (Screen 3) | 'initial' (Screen 2)
  const [teamSearch, setTeamSearch] = useState('');
  const [teamRoleFilter, setTeamRoleFilter] = useState('ALL');
  const [teamStatusFilter, setTeamStatusFilter] = useState('ALL');
  const [openProjectPopoverUserId, setOpenProjectPopoverUserId] = useState(null);
  const [showInviteUserModal, setShowInviteUserModal] = useState(false);
  const [teamToast, setTeamToast] = useState(null);

  // Invite modal form state
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Site Engineer');
  const [inviteProjects, setInviteProjects] = useState(['PRJ-001']);

  const [teamUsers, setTeamUsers] = useState([
    {
      id: "USR-001",
      name: "Eng. Eman El-Sayed",
      nameAr: "م. إيمان السيد",
      email: "eman@iram-platform.com",
      role: "Project Manager",
      roleAr: "مدير المشروع",
      status: "Active",
      statusAr: "نشط",
      assignedProjects: ["PRJ-001", "PRJ-005"],
      initials: "EE"
    },
    {
      id: "USR-002",
      name: "Eng. Mohamed Fathy",
      nameAr: "م. محمد فتحي",
      email: "m.fathy@iram-platform.com",
      role: "Site Engineer",
      roleAr: "مهندس موقع",
      status: "Active",
      statusAr: "نشط",
      assignedProjects: ["PRJ-001"],
      initials: "MF"
    },
    {
      id: "USR-003",
      name: "Eng. Rami Fawzy",
      nameAr: "م. رامي فوزي",
      email: "rami.fawzy@iram-platform.com",
      role: "Site Engineer",
      roleAr: "مهندس موقع",
      status: "Active",
      statusAr: "نشط",
      assignedProjects: ["PRJ-002"],
      initials: "RF"
    },
    {
      id: "USR-004",
      name: "Ahmed Hassan",
      nameAr: "أحمد حسن",
      email: "a.hassan@iram-platform.com",
      role: "Procurement Officer",
      roleAr: "مسؤول مشتريات وتوريد",
      status: "Active",
      statusAr: "نشط",
      assignedProjects: ["PRJ-001", "PRJ-002", "PRJ-003", "PRJ-004", "PRJ-005", "PRJ-006"],
      initials: "AH"
    },
    {
      id: "USR-005",
      name: "Mahmoud Eid",
      nameAr: "محمود عيد",
      email: "m.eid@iram-platform.com",
      role: "Warehouse Officer",
      roleAr: "أمين مخزن وتشوينات",
      status: "Pending Invitation",
      statusAr: "في انتظار قبول الدعوة",
      assignedProjects: ["PRJ-001", "PRJ-005"],
      initials: "ME"
    }
  ]);

  const handleToggleUserProject = (userId, projId) => {
    setTeamUsers(prev => prev.map(u => {
      if (u.id !== userId) return u;
      const exists = u.assignedProjects.includes(projId);
      const nextProjects = exists 
        ? u.assignedProjects.filter(p => p !== projId)
        : [...u.assignedProjects, projId];
      return { ...u, assignedProjects: nextProjects };
    }));
  };

  const handleInviteUserSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: `USR-${String(teamUsers.length + 1).padStart(3, '0')}`,
      name: inviteName,
      nameAr: inviteName,
      email: inviteEmail,
      role: inviteRole,
      roleAr: inviteRole,
      status: "Pending Invitation",
      statusAr: "في انتظار قبول الدعوة",
      assignedProjects: inviteProjects.length > 0 ? inviteProjects : ["PRJ-001"],
      initials: inviteName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || "TU"
    };
    setTeamUsers(prev => [...prev, newUser]);
    setShowInviteUserModal(false);
    setInviteName('');
    setInviteEmail('');
    setTeamToast(isAr ? `تم إرسال دعوة بنجاح إلى ${newUser.name}` : `Invitation sent successfully to ${newUser.name}`);
    setTimeout(() => setTeamToast(null), 4000);
  };

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
              {currentViewMode === 'team' && (isAr ? "فريق العمل والمستخدمين (Users & Team)" : "Users & Team")}
              {currentViewMode === 'detail' && (isAr ? `مشروع: ${currentProj.nameAr}` : `Project: ${currentProj.name}`)}
            </h1>
          </div>
        </div>

        {/* View Switcher Pills matching Figma Screen 1, 2, 3 */}
        <div className="flex items-center gap-1.5 bg-[#EEF2F6] p-1.5 rounded-xl border border-[#CBD5E1] text-xs font-bold overflow-x-auto whitespace-nowrap">
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

          <button
            onClick={() => setCurrentViewMode('team')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              currentViewMode === 'team'
                ? 'bg-white text-[#E85312] shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-[#E85312]" />
            <span>{isAr ? "فريق العمل (Users & Team)" : "Users & Team"}</span>
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
      {/* 3. SCREEN: USERS & TEAM (Figma Screen 2 & 3 - media_1792615423079_ae540f75) */}
      {/* ============================================================== */}
      {currentViewMode === 'team' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Toast Notification */}
          {teamToast && (
            <div className="p-4 bg-emerald-600 text-white rounded-2xl shadow-xl text-xs font-bold flex items-center justify-between animate-in fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{teamToast}</span>
              </div>
              <button onClick={() => setTeamToast(null)}>✕</button>
            </div>
          )}

          {/* Sub-header & Figma Demo State Toggle */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900">
                  {isAr ? "فريق العمل وتعيين صلاحيات المشاريع (Users & Team)" : "Users & Project Team Management"}
                </h2>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-orange-50 text-[#E85312] font-bold border border-orange-200">
                  Figma Layout
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
                {isAr 
                  ? "إدارة مهندسي الموقع، مسؤولي التوريد، وأمناء المخازن المسندين لمشاريعك، مع إمكانية تعديل المشاريع المسندة عبر القائمة التفاعلية."
                  : "Manage site engineers, procurement officers, and warehouse staff assigned to projects with interactive assignment popovers."}
              </p>
            </div>

            {/* Demo State Switcher */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold">
                <button
                  onClick={() => setTeamViewMode('populated')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    teamViewMode === 'populated'
                      ? 'bg-[#E85312] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title={isAr ? "عرض الجدول المكتمل مع القائمة المنسدلة للمشاريع" : "Populated Table & Popover"}
                >
                  {isAr ? "الجدول المكتمل (Screen 3)" : "Populated (Screen 3)"}
                </button>
                <button
                  onClick={() => setTeamViewMode('initial')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    teamViewMode === 'initial'
                      ? 'bg-[#E85312] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title={isAr ? "عرض الحالة الأولية مع كارت إرشادات الدعوة" : "Initial State & Guide"}
                >
                  {isAr ? "الحالة الأولية (Screen 2)" : "Initial (Screen 2)"}
                </button>
              </div>

              <button
                onClick={() => setShowInviteUserModal(true)}
                className="px-3.5 py-2 rounded-lg bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{isAr ? "+ دعوة عضو جديد" : "+ Invite Member"}</span>
              </button>
            </div>
          </div>

          {/* 3 KPI Metric Cards matching Figma Screen 2 & 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                {isAr ? "إجمالي المستخدمين" : "TOTAL USERS"}
              </span>
              <div className="text-2xl font-black text-slate-900 mt-2">
                {teamViewMode === 'initial' ? 1 : teamUsers.length}
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                {isAr ? "الأعضاء المسجلين في النظام" : "Registered workspace members"}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                {isAr ? "المستخدمون النشطون" : "ACTIVE USERS"}
              </span>
              <div className="text-2xl font-black text-emerald-600 mt-2">
                {teamViewMode === 'initial' ? 1 : teamUsers.filter(u => u.status === 'Active').length}
              </div>
              <span className="text-[11px] text-emerald-600/80 mt-1 block">
                {isAr ? "صلاحيات مفعلة وجاهزون للمهام" : "Active operational access"}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                {isAr ? "دعوات معلقة" : "PENDING INVITATIONS"}
              </span>
              <div className="text-2xl font-black text-amber-500 mt-2">
                {teamViewMode === 'initial' ? 0 : teamUsers.filter(u => u.status === 'Pending Invitation').length}
              </div>
              <span className="text-[11px] text-amber-600/80 mt-1 block">
                {isAr ? "بانتظار قبول الدعوة" : "Awaiting invite confirmation"}
              </span>
            </div>
          </div>

          {/* Table Container with Filter Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-visible">
            
            {/* Filter Bar */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3" />
                  <input
                    type="text"
                    value={teamSearch}
                    onChange={(e) => setTeamSearch(e.target.value)}
                    placeholder={isAr ? "بحث بالاسم أو البريد..." : "Search users by name, email..."}
                    className="w-full pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#E85312] transition-all"
                  />
                </div>

                {/* Role Filter */}
                <select
                  value={teamRoleFilter}
                  onChange={(e) => setTeamRoleFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold"
                >
                  <option value="ALL">{isAr ? "جميع الأدوار" : "All Roles"}</option>
                  <option value="Project Manager">Project Manager</option>
                  <option value="Site Engineer">Site Engineer</option>
                  <option value="Procurement Officer">Procurement Officer</option>
                  <option value="Warehouse Officer">Warehouse Officer</option>
                </select>

                {/* Status Filter */}
                <select
                  value={teamStatusFilter}
                  onChange={(e) => setTeamStatusFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold"
                >
                  <option value="ALL">{isAr ? "جميع الحالات" : "All Status"}</option>
                  <option value="Active">{isAr ? "نشط" : "Active"}</option>
                  <option value="Pending Invitation">{isAr ? "قيد الانتظار" : "Pending"}</option>
                </select>
              </div>

              <div className="text-xs text-slate-400 font-medium">
                {isAr ? `عرض ${teamViewMode === 'initial' ? 1 : teamUsers.length} من الأعضاء` : `Showing ${teamViewMode === 'initial' ? 1 : teamUsers.length} members`}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto overflow-y-visible">
              <table className="w-full text-left rtl:text-right text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="px-5 py-3.5">{isAr ? "المستخدم والبريد" : "USER & EMAIL"}</th>
                    <th className="px-4 py-3.5">{isAr ? "الدور والصلاحية" : "ROLE"}</th>
                    <th className="px-4 py-3.5">{isAr ? "المشاريع المسندة" : "ASSIGNED PROJECTS"}</th>
                    <th className="px-4 py-3.5">{isAr ? "الحالة" : "STATUS"}</th>
                    <th className="px-4 py-3.5 text-right rtl:text-left">{isAr ? "الإجراء" : "ACTIONS"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  {(teamViewMode === 'initial' ? teamUsers.slice(0, 1) : teamUsers)
                    .filter(u => {
                      const matchSearch = !teamSearch || 
                        u.name.toLowerCase().includes(teamSearch.toLowerCase()) ||
                        u.nameAr.toLowerCase().includes(teamSearch.toLowerCase()) ||
                        u.email.toLowerCase().includes(teamSearch.toLowerCase());
                      const matchRole = teamRoleFilter === 'ALL' || u.role === teamRoleFilter;
                      const matchStatus = teamStatusFilter === 'ALL' || u.status === teamStatusFilter;
                      return matchSearch && matchRole && matchStatus;
                    })
                    .map(u => {
                      const isPopoverOpen = openProjectPopoverUserId === u.id;
                      
                      // Calculate label for assigned projects
                      let assignedLabel = "No Projects";
                      if (u.assignedProjects.length === projectsList.length) {
                        assignedLabel = "All Projects";
                      } else if (u.assignedProjects.length === 1) {
                        const pr = projectsList.find(p => p.id === u.assignedProjects[0]);
                        assignedLabel = pr ? (isAr ? pr.nameAr : pr.name) : "1 Project";
                      } else if (u.assignedProjects.length > 1) {
                        assignedLabel = `${u.assignedProjects.length} Projects`;
                      }

                      return (
                        <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                          {/* User & Email */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#E85312] text-white font-bold flex items-center justify-center text-xs shrink-0">
                                {u.initials}
                              </div>
                              <div>
                                <div className="font-bold text-slate-900 text-sm">
                                  {isAr ? u.nameAr : u.name}
                                </div>
                                <div className="text-[11px] text-slate-400 font-mono">
                                  {u.email}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Role Badge */}
                          <td className="px-4 py-4">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#E85312]"></span>
                              <span>{isAr ? u.roleAr : u.role}</span>
                            </span>
                          </td>

                          {/* Assigned Projects Popover (Figma Screen 3 Interactive Dropdown) */}
                          <td className="px-4 py-4 relative">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenProjectPopoverUserId(isPopoverOpen ? null : u.id);
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-[#E85312] bg-white text-slate-800 text-xs font-bold shadow-2xs hover:bg-orange-50/30 transition-all cursor-pointer"
                            >
                              <span className="max-w-[150px] truncate">{assignedLabel}</span>
                              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isPopoverOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Interactive Popover Dropdown with Real-Time Checkboxes */}
                            {isPopoverOpen && (
                              <div 
                                onClick={(e) => e.stopPropagation()}
                                className="absolute z-50 top-full mt-1.5 left-4 rtl:left-auto rtl:right-4 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-3 space-y-2 animate-in fade-in"
                              >
                                <div className="text-[11px] font-bold text-slate-500 border-b border-slate-100 pb-1.5 flex items-center justify-between">
                                  <span>{isAr ? "تعيين المشاريع لهذا العضو:" : "Assign Projects:"}</span>
                                  <button
                                    onClick={() => setOpenProjectPopoverUserId(null)}
                                    className="text-slate-400 hover:text-slate-800 text-xs font-bold"
                                  >
                                    ✕
                                  </button>
                                </div>

                                <div className="space-y-1 max-h-48 overflow-y-auto">
                                  {projectsList.map(proj => {
                                    const isAssigned = u.assignedProjects.includes(proj.id);
                                    return (
                                      <label
                                        key={proj.id}
                                        className="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded-lg cursor-pointer text-xs transition-colors"
                                      >
                                        <input
                                          type="checkbox"
                                          checked={isAssigned}
                                          onChange={() => handleToggleUserProject(u.id, proj.id)}
                                          className="rounded text-[#E85312] focus:ring-[#E85312] cursor-pointer"
                                        />
                                        <span className={`truncate ${isAssigned ? 'font-bold text-slate-900' : 'text-slate-600'}`}>
                                          {isAr ? proj.nameAr : proj.name}
                                        </span>
                                      </label>
                                    );
                                  })}
                                </div>

                                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      // Assign all projects
                                      setTeamUsers(prev => prev.map(user => user.id === u.id ? { ...user, assignedProjects: projectsList.map(p => p.id) } : user));
                                    }}
                                    className="text-[10px] text-[#E85312] font-bold hover:underline"
                                  >
                                    {isAr ? "تحديد الكل" : "Select All"}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setOpenProjectPopoverUserId(null)}
                                    className="px-2.5 py-1 bg-slate-900 text-white rounded text-[10px] font-bold hover:bg-slate-800"
                                  >
                                    {isAr ? "تم" : "Done"}
                                  </button>
                                </div>
                              </div>
                            )}
                          </td>

                          {/* Status Badge */}
                          <td className="px-4 py-4">
                            {u.status === 'Active' ? (
                              <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-xs">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{isAr ? u.statusAr : u.status}</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-amber-700 font-bold text-xs bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                                <Clock className="w-3.5 h-3.5 text-amber-600" />
                                <span>{isAr ? u.statusAr : u.status}</span>
                              </span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-4 text-right rtl:text-left">
                            <button
                              onClick={() => {
                                setOpenProjectPopoverUserId(isPopoverOpen ? null : u.id);
                              }}
                              className="text-xs text-[#E85312] font-bold hover:underline cursor-pointer"
                            >
                              {isAr ? "تعديل الصلاحيات" : "Edit Role"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

            {/* Figma Screen 2: Empty State Guide (Invite your first team member) */}
            {teamViewMode === 'initial' && (
              <div className="p-8 bg-white border-t border-slate-100 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FEECE5] text-[#E85312] flex items-center justify-center mx-auto">
                  <UserPlus className="w-6 h-6" />
                </div>
                <div className="max-w-md mx-auto space-y-1.5">
                  <h4 className="text-base font-black text-slate-900">
                    {isAr ? "دعوة أول عضو في فريق العمل" : "Invite your first team member"}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {isAr 
                      ? "أنت العضو الوحيد في مساحة العمل حالياً. دعوة زملائك تمنح منصة إرم قوتها الحقيقية: توزيع الصلاحيات المناسبة لكل دور (مدير مشروع، مهندس موقع، مشتريات، مخازن) لضمان حوكمة التوريد والاستهلاك."
                      : "You're the only member of your workspace. Inviting your teammates gives IRAM real power: create roles that match your team: supervisor, site, procurement, and warehouse. Responsibilities are set up from the start."}
                  </p>
                </div>

                {/* 4 Role Badges */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold">
                    Project Manager
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold">
                    Site Engineer
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold">
                    Procurement Officer
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold">
                    Warehouse Officer
                  </span>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setShowInviteUserModal(true)}
                    className="px-5 py-2.5 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-xl text-xs font-bold shadow-xs transition-all inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>{isAr ? "دعوة عضو جديد" : "Invite User"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      )}
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

      {/* INVITE TEAM MEMBER MODAL */}
      {showInviteUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="p-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#E85312] flex items-center justify-center font-bold">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">
                    {isAr ? "دعوة عضو جديد لفريق المشروع" : "Invite Team Member"}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {isAr ? "حدد الدور والمشاريع المسندة له في المنظومة" : "Assign project scope and permissions"}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowInviteUserModal(false)}
                className="text-slate-400 hover:text-slate-800 text-sm font-bold"
              >✕</button>
            </div>

            <form onSubmit={handleInviteUserSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {isAr ? "الاسم الكامل" : "Full Name"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isAr ? "م. سامح عبد المنعم" : "e.g. Eng. Sameh Abdelmonem"}
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold focus:bg-white focus:border-[#E85312] transition-all"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {isAr ? "البريد الإلكتروني للعمل" : "Work Email"}
                </label>
                <input
                  type="email"
                  required
                  placeholder="s.abdelmonem@contracting.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:bg-white focus:border-[#E85312] transition-all"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {isAr ? "الدور الوظيفي" : "Role"}
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800"
                >
                  <option value="Site Engineer">{isAr ? "Site Engineer (مهندس موقع)" : "Site Engineer"}</option>
                  <option value="Project Manager">{isAr ? "Project Manager (مدير مشروع)" : "Project Manager"}</option>
                  <option value="Procurement Officer">{isAr ? "Procurement Officer (مسؤول مشتريات)" : "Procurement Officer"}</option>
                  <option value="Warehouse Officer">{isAr ? "Warehouse Officer (أمين مخزن)" : "Warehouse Officer"}</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {isAr ? "المشاريع المسندة" : "Assign Projects"}
                </label>
                <div className="space-y-1.5 max-h-36 overflow-y-auto border border-slate-100 rounded-lg p-2 bg-slate-50/50">
                  {projectsList.map(p => {
                    const checked = inviteProjects.includes(p.id);
                    return (
                      <label key={p.id} className="flex items-center gap-2 text-[11px] text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            if (checked) {
                              setInviteProjects(inviteProjects.filter(id => id !== p.id));
                            } else {
                              setInviteProjects([...inviteProjects, p.id]);
                            }
                          }}
                          className="rounded text-[#E85312] focus:ring-[#E85312]"
                        />
                        <span className={checked ? "font-bold text-slate-900" : ""}>
                          {isAr ? p.nameAr : p.name}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowInviteUserModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 font-bold hover:bg-slate-50 transition-all cursor-pointer"
                >
                  {isAr ? "إلغاء" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-xl font-bold shadow-xs transition-all cursor-pointer"
                >
                  {isAr ? "إرسال الدعوة الآن" : "Send Invitation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
