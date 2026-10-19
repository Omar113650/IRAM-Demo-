import React, { useState } from 'react';
import { 
  Building2, 
  ArrowRightLeft, 
  TrendingUp, 
  Coins, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  ArrowUpRight,
  TrendingDown,
  Layers,
  Sparkles,
  Filter,
  Search,
  Users,
  ShieldCheck,
  UserCheck,
  FolderPlus
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export default function CompanyAdminDashboard({ 
  onSelectProject, 
  onOpenTransfers, 
  onOpenWaste, 
  onOpenProcurement,
  language 
}) {
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'projects-mgmt', 'users-rbac'
  
  const [projectStatusFilter, setProjectStatusFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  // New Project Form
  const [newProjName, setNewProjName] = useState('');
  const [newProjCode, setNewProjCode] = useState('');
  const [newProjLocation, setNewProjLocation] = useState('New Cairo, Zone 5');
  const [newProjBudget, setNewProjBudget] = useState('16500000');
  const [newProjManager, setNewProjManager] = useState('Eng. Tamer Khaled');

  // New User Form (RBAC)
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('Project Manager');
  const [newUserAssignedProject, setNewUserAssignedProject] = useState('PRJ-001');

  // Success Notification
  const [toastMessage, setToastMessage] = useState(null);

  // Top KPI Data (Figma `new_companyAdmin`)
  const kpis = [
    {
      titleEn: "Total Active Projects",
      titleAr: "المشاريع الإنشائية النشطة",
      value: "6",
      subEn: "$132.1M portfolio on cloud",
      subAr: "6 مواقع متزامنة سحابياً ($132.1M)",
      icon: Building2,
      color: "bg-blue-50 text-blue-600"
    },
    {
      titleEn: "Cost Saved via Internal Matching",
      titleAr: "التوفير من النقل الداخلي",
      value: "$184,500",
      subEn: "+$45,550 pending authorization",
      subAr: "+$45,550 بانتظار الاعتماد",
      icon: ArrowRightLeft,
      color: "bg-emerald-50 text-emerald-600",
      highlight: true
    },
    {
      titleEn: "Active Surplus Asset Valuation",
      titleAr: "قيمة الفائض المتاح حالياً",
      value: "$92,300",
      subEn: "90T Steel + 240m Pipes",
      subAr: "90 طن حديد + مواسير",
      icon: Coins,
      color: "bg-orange-50 text-[#E85312]"
    },
    {
      titleEn: "AI Waste Loss Avoided",
      titleAr: "هدر تم تفاديه بالذكاء الاصطناعي",
      value: "$42,800",
      subEn: "Cut optimization software",
      subAr: "تحسين قص حديد التسليح BBS 1D",
      icon: TrendingDown,
      color: "bg-purple-50 text-purple-600"
    }
  ];

  // Financial Chart Data
  const monthlyData = [
    { month: "May", purchases: 120, savings: 22 },
    { month: "Jun", purchases: 145, savings: 38 },
    { month: "Jul", purchases: 98, savings: 41 },
    { month: "Aug", purchases: 180, savings: 52 },
    { month: "Sep", purchases: 165, savings: 64 },
    { month: "Oct", purchases: 110, savings: 73 }
  ];

  const categoryData = [
    { name: "Structural Steel", value: 45, color: "#E85312" },
    { name: "Concrete & Cement", value: 25, color: "#1E293B" },
    { name: "Masonry & Blocks", value: 15, color: "#64748B" },
    { name: "Plumbing & PVC", value: 10, color: "#F59E0B" },
    { name: "Finishing & Tiles", value: 5, color: "#10B981" }
  ];

  // Projects list matching Figma 6 projects
  const [projectsList, setProjectsList] = useState([
    {
      id: "PRJ-001",
      code: "AMRC-2026",
      name: "New Mansoura Towers - Sector B",
      nameAr: "أبراج المنصورة السكنية - قطاع B",
      location: "New Mansoura, Sector B4",
      manager: "Eng. Eman El-Sayed",
      progress: 48,
      shortages: 2,
      surplus: 1,
      spend: "$6.24M / $14.5M",
      status: "Shortage Risk"
    },
    {
      id: "PRJ-002",
      code: "NACT-2025",
      name: "New Capital Business Complex",
      nameAr: "مجمع أعمال العاصمة الإدارية (CBD)",
      location: "CBD Plot 12, New Capital",
      manager: "Eng. Mostafa Salem",
      progress: 62,
      shortages: 0,
      surplus: 3,
      spend: "$28.4M / $38.2M",
      status: "Active"
    },
    {
      id: "PRJ-003",
      code: "AWH-2026",
      name: "Alexandria Waterfront Heights",
      nameAr: "أبراج كورنيش الإسكندرية (San Stefano)",
      location: "Corniche Road, San Stefano",
      manager: "Eng. Sara Adel",
      progress: 77,
      shortages: 3,
      surplus: 1,
      spend: "$14.95M / $19.8M",
      status: "Active"
    },
    {
      id: "PRJ-004",
      code: "CBC-2026",
      name: "Commercial Business Center",
      nameAr: "المركز التجاري الإداري (التجمع الخامس)",
      location: "New Cairo, District 5",
      manager: "Eng. Tamer Khaled",
      progress: 35,
      shortages: 0,
      surplus: 0,
      spend: "$3.8M / $11.2M",
      status: "Active"
    },
    {
      id: "PRJ-005",
      code: "SLP-2026",
      name: "Sadat City Logistics Park",
      nameAr: "المنطقة اللوجستية بمدينة السادات",
      location: "Industrial Zone 4, Sadat City",
      manager: "Eng. Eman El-Sayed",
      progress: 88,
      shortages: 0,
      surplus: 2,
      spend: "$19.6M / $22.4M",
      status: "Active"
    },
    {
      id: "PRJ-006",
      code: "RSR-2027",
      name: "Red Sea Resort Phase 2",
      nameAr: "منتجع البحر الأحمر - المرحلة الثانية",
      location: "El Gouna, Hurghada",
      manager: "Eng. Kareem Fahmy",
      progress: 15,
      shortages: 3,
      surplus: 0,
      spend: "$4.1M / $27.0M",
      status: "Shortage Risk"
    }
  ]);

  // Company Team Users list (RBAC)
  const [usersList, setUsersList] = useState([
    {
      id: "USR-001",
      name: "Eng. Ahmed Mansour",
      email: "admin@elsewedy-cc.com",
      role: "Company Admin",
      assignedProject: "All Company Projects",
      scope: "Full Master Access, Financials, Project Creation",
      status: "Active"
    },
    {
      id: "USR-002",
      name: "Eng. Tamer Khaled",
      email: "pm.tamer@elsewedy-cc.com",
      role: "Project Manager",
      assignedProject: "Al-Mansoura Residential Complex",
      scope: "Site Scope Only, Requisitions, Internal Transfer Approval",
      status: "Active"
    },
    {
      id: "USR-003",
      name: "Eng. Mostafa Salem",
      email: "pm.mostafa@elsewedy-cc.com",
      role: "Project Manager",
      assignedProject: "New Capital Business Tower",
      scope: "Site Scope Only, Surplus Reallocation Authorization",
      status: "Active"
    },
    {
      id: "USR-004",
      name: "Kareem Refaat",
      email: "procurement@elsewedy-cc.com",
      role: "Procurement Officer",
      assignedProject: "All Company Projects",
      scope: "RFQ Dispatch, Supplier Bids Comparison, PO Awards",
      status: "Active"
    },
    {
      id: "USR-005",
      name: "Eng. Mohamed Fathy",
      email: "site.fathy@elsewedy-cc.com",
      role: "Site Engineer",
      assignedProject: "Al-Mansoura Residential Complex",
      scope: "Daily Consumption Logs, Material Waste Reporting",
      status: "Active"
    },
    {
      id: "USR-006",
      name: "Hassan Al-Sayed",
      email: "warehouse@elsewedy-cc.com",
      role: "Warehouse Officer",
      assignedProject: "Al-Mansoura & New Capital Yards",
      scope: "Material Receiving, OCR Inspections, Surplus Declaration",
      status: "Active"
    }
  ]);

  const handleAddProject = (e) => {
    e.preventDefault();
    const newP = {
      id: `PRJ-${String(projectsList.length + 1).padStart(3, '0')}`,
      code: newProjCode || `PRJ-${Date.now().toString().slice(-4)}`,
      name: newProjName,
      nameAr: newProjName,
      location: newProjLocation,
      manager: newProjManager,
      progress: 0,
      shortages: 0,
      surplus: 0,
      spend: `$0 / $${(Number(newProjBudget)/1000000).toFixed(1)}M`,
      status: "Active"
    };

    setProjectsList([...projectsList, newP]);
    setShowAddProjectModal(false);
    setToastMessage(`Project "${newP.name}" created and assigned to ${newP.manager}!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const assignedProjObj = projectsList.find(p => p.id === newUserAssignedProject);
    const assignedLabel = newUserAssignedProject === 'ALL' 
      ? "All Company Projects" 
      : (assignedProjObj ? assignedProjObj.name : "Assigned Site");

    const newU = {
      id: `USR-${String(usersList.length + 1).padStart(3, '0')}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      assignedProject: assignedLabel,
      scope: `${newUserRole} scoped to ${assignedLabel}`,
      status: "Active"
    };

    setUsersList([...usersList, newU]);
    setShowAddUserModal(false);
    setToastMessage(`User "${newU.name}" invited with role "${newU.role}" for ${assignedLabel}!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredProjects = projectsList.filter(p => {
    if (projectStatusFilter !== 'ALL' && p.status !== projectStatusFilter) return false;
    if (searchTerm) {
      return p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
             p.code.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
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

      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-slate-900">
              {isAr ? "لوحة تحكم إدارة الشركة (Company Admin)" : "Company Admin Executive Portal"}
            </h1>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
              Multi-Project & RBAC
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            {isAr 
              ? "إدارة المشاريع، تعيين الصلاحيات والأدوار للمهندسين ومديري المشاريع، ومتابعة التوفير المالي الشامل عبر الشركة."
              : "Create projects, configure role-based access control (RBAC), and monitor company-wide surplus reuse."}
          </p>
        </div>

        {/* Master Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button 
            onClick={() => setShowAddProjectModal(true)}
            className="px-3.5 py-2 rounded-lg bg-white border border-[#CBD5E1] hover:bg-[#EEF2F6] text-[#0F172A] font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <FolderPlus className="w-3.5 h-3.5 text-[#E85312]" />
            <span>{isAr ? "+ إضافة مشروع جديد" : "+ Create Project"}</span>
          </button>

          <button 
            onClick={() => setShowAddUserModal(true)}
            className="px-3.5 py-2 rounded-lg bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Users className="w-3.5 h-3.5" />
            <span>{isAr ? "+ تعيين عضو وصلاحية" : "+ Add Member & Role"}</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs: Overview vs Projects Management vs Team RBAC */}
      <div className="flex border-b border-[#CBD5E1] gap-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 transition-colors relative cursor-pointer ${activeTab === 'overview' ? 'text-[#E85312] border-b-2 border-[#E85312] font-black' : 'text-[#475569] hover:text-[#0F172A]'}`}
        >
          {isAr ? "نظرة عامة والتحليلات المالية" : "Executive Overview & Analytics"}
        </button>
        <button
          onClick={() => setActiveTab('projects-mgmt')}
          className={`pb-3 transition-colors relative cursor-pointer ${activeTab === 'projects-mgmt' ? 'text-[#E85312] border-b-2 border-[#E85312] font-black' : 'text-[#475569] hover:text-[#0F172A]'}`}
        >
          {isAr ? `إدارة المشاريع (${projectsList.length})` : `Projects Management (${projectsList.length})`}
        </button>
        <button
          onClick={() => setActiveTab('users-rbac')}
          className={`pb-3 transition-colors relative cursor-pointer ${activeTab === 'users-rbac' ? 'text-[#E85312] border-b-2 border-[#E85312] font-black' : 'text-[#475569] hover:text-[#0F172A]'}`}
        >
          {isAr ? `فريق العمل والصلاحيات (${usersList.length})` : `Team Members & RBAC (${usersList.length})`}
        </button>
      </div>

      {/* TAB 1: EXECUTIVE OVERVIEW */}
      {activeTab === 'overview' && (
        <>
          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi, idx) => {
              const Icon = kpi.icon;
              const handleCardClick = () => {
                if (idx === 0) setActiveTab('projects-mgmt');
                else if (idx === 1 || idx === 2) onOpenTransfers && onOpenTransfers();
                else if (idx === 3) onOpenWaste && onOpenWaste();
              };

              return (
                <div 
                  key={idx}
                  onClick={handleCardClick}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer hover:scale-[1.01] hover:border-[#E85312]/60 ${
                    kpi.highlight 
                      ? 'bg-gradient-to-br from-white to-emerald-50/50 border-emerald-200 shadow-card hover:shadow-md' 
                      : 'bg-white border-slate-200/80 shadow-card hover:shadow-md'
                  }`}
                  title={isAr ? "اضغط لفتح التفاصيل والنظام الفرعي" : "Click to open details"}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">
                      {isAr ? kpi.titleAr : kpi.titleEn}
                    </span>
                    <div className={`p-2 rounded-xl ${kpi.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900 mt-2">
                    {kpi.value}
                  </div>
                  <div className="text-xs font-medium text-slate-500 mt-1 flex items-center justify-between">
                    <span>{isAr ? kpi.subAr : kpi.subEn}</span>
                    <span className="text-[#E85312] text-[11px] font-bold">
                      {isAr ? "عرض ←" : "View →"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    {isAr ? "المشتريات الخارجية مقابل التوفير من النقل الداخلي ($k)" : "Purchases vs Reallocation Savings ($k)"}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Demonstrating purchase avoidance through cross-project surplus reuse
                  </p>
                </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
                    <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderRadius: '10px', color: '#fff', fontSize: '12px' }} />
                    <Bar dataKey="purchases" fill="#1E293B" radius={[4, 4, 0, 0]} name="External ($k)" />
                    <Bar dataKey="savings" fill="#E85312" radius={[4, 4, 0, 0]} name="Saved ($k)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">
                  {isAr ? "توزيع بنود المواد عبر المواقع" : "Material Category Breakdown"}
                </h3>
                <p className="text-[11px] text-slate-400 mb-2">Capital allocation by material class</p>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={categoryData} cx="50%" cy="50%" innerRadius={48} outerRadius={68} paddingAngle={3} dataKey="value">
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-1.5 border-t border-slate-100 pt-3">
                {categoryData.slice(0, 3).map((cat, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }}></span>
                      {cat.name}
                    </span>
                    <span className="font-bold text-slate-900">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Executive AI Supplier Quotations Summary */}
          <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] text-[#0F172A] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#FEECE5] text-[#E85312] font-bold text-[10px] uppercase">
                  AI Procurement Intelligence
                </span>
                <span className="text-xs text-[#64748B]">
                  {isAr ? "ردود الموردين الجاهزة للاعتماد المالي" : "Supplier RFQ Proposals Scored by AI"}
                </span>
              </div>
              <h3 className="font-bold text-lg text-[#0F172A]">
                {isAr 
                  ? "توصية الذكاء الاصطناعي: حديد عز (Ezz Steel) هو العرض الفائز لمشروع مجمع المنصورة" 
                  : "AI Top Pick: Ezz Steel Mills is optimal for Al-Mansoura Complex"}
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed max-w-2xl">
                {isAr
                  ? "تم فحص 3 عروض أسعار متنافسة؛ يوفر عرض حديد عز $1,100، يلتزم بموعد صب السقف قبل 02 نوفمبر، مع شهادة اختبار معملية MTC وسداد آجل 30 يوماً."
                  : "Out of 3 competing bids, Ezz Steel fulfills arrival 24h prior to milestone pour, attaches certified MTC, and offers 30-day deferred credit."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <div className="text-right">
                <span className="text-[10px] text-[#64748B] block uppercase font-bold">AI Match Score</span>
                <span className="text-2xl font-bold text-[#E85312] font-mono">96.4%</span>
              </div>
              {onOpenProcurement && (
                <button
                  onClick={onOpenProcurement}
                  className="px-3.5 py-2 rounded-lg bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{isAr ? "فحص عروض الأسعار والاعتماد" : "Review RFQs & Award"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {/* TAB 2: PROJECTS MANAGEMENT TABLE */}
      {(activeTab === 'overview' || activeTab === 'projects-mgmt') && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Filter Projects:</span>
              <div className="flex gap-1">
                {['ALL', 'Active', 'Under Review', 'Completed'].map(status => (
                  <button
                    key={status}
                    onClick={() => setProjectStatusFilter(status)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      projectStatusFilter === status ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full sm:w-64 relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search projects..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Project & Code</th>
                  <th className="px-4 py-3.5">Assigned PM</th>
                  <th className="px-4 py-3.5">Progress</th>
                  <th className="px-4 py-3.5">Shortage Alerts</th>
                  <th className="px-4 py-3.5">Surplus</th>
                  <th className="px-4 py-3.5">Budget</th>
                  <th className="px-4 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {filteredProjects.map(proj => (
                  <tr key={proj.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-900 text-sm">
                        {isAr ? proj.nameAr : proj.name}
                      </div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">
                        {proj.code} • {proj.location}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-900 font-bold text-sm">{proj.manager}</td>
                    <td className="px-4 py-4">
                      <div className="w-28">
                        <span className="text-xs font-bold block mb-1 text-slate-900">{proj.progress}%</span>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-[#E85312] h-1.5 rounded-full" style={{ width: `${proj.progress}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {proj.shortages > 0 ? (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          {proj.shortages} Shortages
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700">
                          Optimal
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {proj.surplus > 0 ? (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-orange-50 text-[#E85312]">
                          {proj.surplus} Items to Transfer
                        </span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-4 font-mono text-xs text-slate-900 font-bold">{proj.spend}</td>
                    <td className="px-4 py-4 text-right">
                      <button 
                        onClick={() => onSelectProject(proj.id)}
                        className="px-3.5 py-1.5 rounded-lg border border-slate-300 hover:border-[#E85312] hover:text-[#E85312] text-slate-800 text-xs font-bold transition-all inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Open Site</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: TEAM MEMBERS & PROJECT RBAC MATRIX */}
      {activeTab === 'users-rbac' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">
                {isAr ? "مصفوفة الصلاحيات وتعيين الأدوار للمشاريع (RBAC)" : "Company Roles & Project Assignment Matrix"}
              </h3>
              <p className="text-[11px] text-slate-400">
                Enforcing tenant isolation and site-level authorization (SRS Section 7 & BR-02)
              </p>
            </div>
            <button 
              onClick={() => setShowAddUserModal(true)}
              className="px-3.5 py-2 bg-[#E85312] text-white rounded-xl text-xs font-bold shadow-xs hover:bg-[#CC490F]"
            >
              + Invite Team Member
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">User & Email</th>
                  <th className="px-4 py-3.5">Company Role</th>
                  <th className="px-4 py-3.5">Assigned Project Scope</th>
                  <th className="px-4 py-3.5">Access Scope</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right">Settings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {usersList.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-900 text-sm">{u.name}</div>
                      <span className="text-xs text-slate-500 font-mono">{u.email}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-slate-100 text-slate-800 border border-slate-200">
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-bold text-slate-900 text-sm">
                      {u.assignedProject}
                    </td>
                    <td className="px-4 py-4 text-slate-600 text-xs max-w-xs truncate">
                      {u.scope}
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-emerald-700 font-bold flex items-center gap-1 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {u.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button className="text-xs text-[#E85312] font-bold hover:underline cursor-pointer">
                        Edit Role
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE NEW PROJECT MODAL */}
      {showAddProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="p-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">
                  {isAr ? "إضافة مشروع إنشائي جديد" : "Create Construction Project"}
                </h3>
                <p className="text-[11px] text-slate-500">
                  Initializes project inventory and links to company material pool
                </p>
              </div>
              <button onClick={() => setShowAddProjectModal(false)}>✕</button>
            </div>

            <form onSubmit={handleAddProject} className="p-6 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Project Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. New Giza Heights Phase 2"
                  value={newProjName}
                  onChange={(e) => setNewProjName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Project Code</label>
                  <input 
                    type="text" 
                    placeholder="NGH-2027"
                    value={newProjCode}
                    onChange={(e) => setNewProjCode(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Budget (USD)</label>
                  <input 
                    type="number" 
                    value={newProjBudget}
                    onChange={(e) => setNewProjBudget(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assigned Project Manager (PM)</label>
                <select 
                  value={newProjManager}
                  onChange={(e) => setNewProjManager(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                >
                  <option>Eng. Tamer Khaled</option>
                  <option>Eng. Mostafa Salem</option>
                  <option>Eng. Sara Adel</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all mt-2"
              >
                Create Project & Enable BOQ Tracking
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADD USER & ASSIGN ROLE MODAL (RBAC) */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="p-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">
                  {isAr ? "تعيين عضو وتحديد صلاحيات المشروع" : "Assign User Role to Project (RBAC)"}
                </h3>
                <p className="text-[11px] text-slate-500">
                  Controls which site data and operations this user can access
                </p>
              </div>
              <button onClick={() => setShowAddUserModal(false)}>✕</button>
            </div>

            <form onSubmit={handleAddUser} className="p-6 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Engineer / User Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Eng. Hany Zaki"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Official Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="hany.zaki@elsewedy-cc.com"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Role</label>
                  <select 
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  >
                    <option>Project Manager</option>
                    <option>Site Engineer</option>
                    <option>Procurement Officer</option>
                    <option>Warehouse Officer</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assigned Project</label>
                  <select 
                    value={newUserAssignedProject}
                    onChange={(e) => setNewUserAssignedProject(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  >
                    <option value="PRJ-001">Al-Mansoura Residential</option>
                    <option value="PRJ-002">New Capital Business Tower</option>
                    <option value="PRJ-003">Alexandria Waterfront</option>
                    <option value="ALL">All Company Projects</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-orange-50/70 rounded-xl border border-orange-200/80 text-[11px] text-orange-900">
                <strong>Access Rule:</strong> This user will only be able to view and manage requisitions, shortages, and logs within the assigned project scope.
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-xs shadow-md shadow-[#E85312]/20 transition-all mt-2"
              >
                Confirm Role & Dispatch Project Authorization
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
