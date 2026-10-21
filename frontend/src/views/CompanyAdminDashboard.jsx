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
  FolderPlus,
  Clock,
  Mail,
  FolderOpen,
  Folder,
  Check,
  ChevronDown,
  UserPlus,
  X,
  Settings,
  FileText,
  MapPin,
  Phone,
  CheckCircle,
  Briefcase,
  Bell,
  MoreVertical,
  ExternalLink,
  Sliders,
  CheckSquare,
  Square,
  PauseCircle,
  Zap,
  ArrowUpDown,
  Lock,
  ArrowRight,
  LayoutDashboard,
  Globe,
  Calendar,
  DollarSign,
  HelpCircle,
  Send,
  Eye,
  EyeOff
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

  // Master Active Navigation Tab matching Figma Canvas (media_1792615463928_266e32ac)
  // 'dashboard' | 'profile' | 'users-team' | 'projects-mgmt' | 'analytics' | 'audit-log'
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Dashboard Sub-View: 'overview' (Screen 2) | 'welcome' (Screen 1)
  const [dashboardSubMode, setDashboardSubMode] = useState('overview');

  // Users & Team View Mode: 'populated' (Screen 3) | 'initial' (Screen 2)
  const [usersViewMode, setUsersViewMode] = useState('populated');
  const [openProjectPopoverUserId, setOpenProjectPopoverUserId] = useState(null);

  // Modals state
  const [showCompanyProfileModal, setShowCompanyProfileModal] = useState(false);
  const [showSelectYardModal, setShowSelectYardModal] = useState(false);
  const [showCreateMaterialModal, setShowCreateMaterialModal] = useState(false);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showInviteAcceptanceModal, setShowInviteAcceptanceModal] = useState(false);
  const [selectedStagingYardId, setSelectedStagingYardId] = useState('YD-001');

  // Projects Overview Mode: 'populated' (Active 5 Projects) | 'empty' (Figma Frame 4: No projects yet)
  const [projectsOverviewState, setProjectsOverviewState] = useState('populated');

  // Invitee Acceptance Screen Data (Figma Frame 3)
  const [inviteeData, setInviteeData] = useState({
    name: 'Mustafa Barkat',
    email: 'mustafa.barkat@albayan.example',
    role: 'Site Engineer',
    project: 'Central Cairo Logistics Warehouse',
    expires: 'Jan 25, 2026'
  });

  // Company Settings State (Figma Frame 8)
  const [companySettings, setCompanySettings] = useState({
    legalName: 'Al-Bayan Construction Co. S.A.E.',
    displayName: 'Al-Bayan Construction Co.',
    crNumber: '1010482910',
    crStatus: 'Active',
    taxId: '300489214700003',
    industry: 'General Contracting & Infrastructure',
    primaryEmail: 'admin@albayan.example',
    address: 'Building 14, Sector 1, North Choueifat, New Cairo, Cairo Governorate, Egypt',
    defaultLanguage: 'English (US) / Arabic (العربية)',
    timezone: 'Cairo, Egypt (UTC+02:00)',
    currency: 'EGP - Egyptian Pound (LE)',
    dateFormat: 'DD/MM/YYYY (e.g. 21/01/2026)',
    fiscalYearStart: 'January 1st',
    notifyShortage: true,
    notifySurplus: true,
    notifyDigest: false
  });

  // Projects Display Mode: 'cards' (Figma Grid) | 'table' (Figma Screen 1)
  const [projectDisplayMode, setProjectDisplayMode] = useState('table');
  const [projectStatusFilter, setProjectStatusFilter] = useState('ALL');
  const [selectedPMFilter, setSelectedPMFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [projectsListPage, setProjectsListPage] = useState(1);

  // Warehouses State (Figma Screens 2, 3, 4 in media_1792615496668_11280829)
  const [warehousesViewMode, setWarehousesViewMode] = useState('populated'); // 'populated' | 'empty' | 'details'
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [showAddWarehouseModal, setShowAddWarehouseModal] = useState(false);
  const [newWarehouseName, setNewWarehouseName] = useState('East Cairo Regional Logistics Hub');
  const [newWarehouseCode, setNewWarehouseCode] = useState('ECLH-05');
  const [newWarehouseLocation, setNewWarehouseLocation] = useState('Suez Road, New Cairo');
  const [newWarehouseType, setNewWarehouseType] = useState('Regional Yard');
  const [newWarehouseManager, setNewWarehouseManager] = useState('Tarek Mansour');

  // Warehouses List matching Figma Screen 3 & 4
  const [warehousesList, setWarehousesList] = useState([
    {
      id: "WH-001",
      code: "MCW-01",
      name: "Main Central Warehouse (Cairo)",
      nameAr: "المستودع الرئيسي المركزي (القاهرة)",
      location: "Plot 14, Industrial Zone, New Cairo",
      type: "Central Warehouse",
      associatedProjects: "Multiple Projects (5)",
      manager: "Tarek Mansour",
      status: "Active",
      capacity: "12,500 m²",
      totalItems: 1248,
      assignedEmployees: [
        { name: "Tarek Mansour", role: "Warehouse Manager", status: "Active" },
        { name: "Ahmed Zaki", role: "Inventory Controller", status: "Active" },
        { name: "Hossam Saad", role: "Facility Supervisor", status: "Active" },
        { name: "Bilal Youssef", role: "Safety Officer", status: "Active" }
      ],
      recentActivity: [
        { text: "Items received from Elsewedy Steel (+50 Tons Rebar)", time: "Today, 11:20 AM" },
        { text: "Material transfer to New Mansoura Site (-20 Tons)", time: "Yesterday, 03:45 PM" },
        { text: "Quarterly stock audit verified by Eng. Eman", time: "Oct 18, 2026" }
      ]
    },
    {
      id: "WH-002",
      code: "WCY-02",
      name: "West Cairo Regional Yard",
      nameAr: "ساحة غرب القاهرة الإقليمية (أكتوبر)",
      location: "6th of October Industrial City",
      type: "Regional Yard",
      associatedProjects: "West Capital Business Tower",
      manager: "Nadia Fathy",
      status: "Active",
      capacity: "8,200 m²",
      totalItems: 480,
      assignedEmployees: [
        { name: "Nadia Fathy", role: "Yard Supervisor", status: "Active" },
        { name: "Karim Safwat", role: "Receiving Specialist", status: "Active" }
      ],
      recentActivity: [
        { text: "Cement bags delivery logged (400 Bags)", time: "Today, 09:15 AM" }
      ]
    },
    {
      id: "WH-003",
      code: "SLF-03",
      name: "Sadat City Logistics Facility",
      nameAr: "منشأة مدينة السادات اللوجستية",
      location: "Sector 4, Sadat City",
      type: "Regional Yard",
      associatedProjects: "Sadat Logistics Park",
      manager: "Ehab Samy",
      status: "Active",
      capacity: "9,600 m²",
      totalItems: 610,
      assignedEmployees: [
        { name: "Ehab Samy", role: "Logistics Lead", status: "Active" },
        { name: "Samy Refaat", role: "Storekeeper", status: "Active" }
      ],
      recentActivity: [
        { text: "Surplus electrical conduit dispatch", time: "Oct 19, 2026" }
      ]
    },
    {
      id: "WH-004",
      code: "PMY-04",
      name: "Port Said Marine Yard",
      nameAr: "ساحة بورسعيد البحرية التشوينية",
      location: "Port Said Port Area",
      type: "Regional Yard",
      associatedProjects: "Port Said Expansion",
      manager: "Mahmoud Eid",
      status: "Inactive",
      capacity: "4,500 m²",
      totalItems: 110,
      assignedEmployees: [
        { name: "Mahmoud Eid", role: "Yard Caretaker", status: "On Leave" }
      ],
      recentActivity: [
        { text: "Facility maintenance and inventory hold", time: "Oct 10, 2026" }
      ]
    }
  ]);

  // Materials Catalog State (Figma Screen 5 in media_1792615496668_11280829)
  const [catalogSearchTerm, setCatalogSearchTerm] = useState('');
  const [catalogCategoryFilter, setCatalogCategoryFilter] = useState('ALL');
  const [catalogItemsList, setCatalogItemsList] = useState([
    { id: "MAT-01", name: "High Tensile Steel Rebar 16mm", category: "Steel & Metals", sku: "STL-RB-16", uom: "Ton", standardCost: "$780 / Ton", specs: "ASTM A615 Grade 60, high yield deformed bars", autoSurplus: true },
    { id: "MAT-02", name: "Portland Cement 42.5N (Standard Bags)", category: "Cement & Aggregates", sku: "CEM-PRT-42", uom: "Bag (50kg)", standardCost: "$8.50 / Bag", specs: "EN 197-1 CEM I 42.5 N high early strength", autoSurplus: true },
    { id: "MAT-03", name: "Ready-Mix Concrete 350 kg/cm²", category: "Ready Mix Concrete", sku: "CONC-RMC-350", uom: "m³", standardCost: "$85 / m³", specs: "OPC with silica fume, slump 160±20mm", autoSurplus: false },
    { id: "MAT-04", name: "Marine Grade Plywood 18mm", category: "Wood & Formwork", sku: "PLY-MRN-18", uom: "Sheet (1.22x2.44m)", standardCost: "$38 / Sheet", specs: "BS 1088 waterproof phenolic glued hardwood core", autoSurplus: true },
    { id: "MAT-05", name: "Autoclaved Aerated Concrete Blocks (AAC)", category: "Masonry & Blocks", sku: "BLK-AAC-20", uom: "m³", standardCost: "$65 / m³", specs: "Density 550 kg/m³, thermal conductivity 0.12 W/mK", autoSurplus: true },
    { id: "MAT-06", name: "UPVC Drainage Pipes Ø110mm Class 4", category: "Plumbing & Drainage", sku: "PIP-PVC-110", uom: "6m Pipe", standardCost: "$24 / Length", specs: "DIN 8062 / EN 1401-1 underground sewage grade", autoSurplus: true },
    { id: "MAT-07", name: "High Tensile Steel Rebar 12mm", category: "Steel & Metals", sku: "STL-RB-12", uom: "Ton", standardCost: "$790 / Ton", specs: "ASTM A615 Grade 60, high yield deformed bars", autoSurplus: true },
    { id: "MAT-08", name: "Crushed Dolomite Aggregate Size 1 (10-20mm)", category: "Cement & Aggregates", sku: "AGG-DOL-01", uom: "m³", standardCost: "$18 / m³", specs: "Abrasion loss < 25%, impact value < 20%", autoSurplus: true }
  ]);

  // Filters for Users & Team
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('ALL');
  const [userStatusFilter, setUserStatusFilter] = useState('ALL');

  // Filters for Audit Log
  const [auditSearchTerm, setAuditSearchTerm] = useState('');
  const [auditCategoryFilter, setAuditCategoryFilter] = useState('ALL');

  // Success Notification
  const [toastMessage, setToastMessage] = useState(null);

  // Company Profile Settings (Figma Screen 3)
  const [companyProfile, setCompanyProfile] = useState({
    name: 'Al-Bayan Contracting & Engineering Co.',
    type: 'General Contractor',
    taxRegNumber: '300489214700003',
    crNumber: '1010482910',
    email: 'info@albayan-group.com',
    billingEmail: 'billing@albayan-group.com',
    hotline: '19842',
    phone: '+20 2 2795 4400',
    address: 'Plot 14, North Choueifat, Sector 1, New Cairo, Egypt',
    postalCode: '11835',
    country: 'Egypt',
    city: 'New Cairo',
    annualVolume: '$45,000,000+',
    workforce: '250 - 500 Employees',
    yearIncorporated: '2011',
    sectors: ['Commercial', 'Residential', 'Infrastructure'],
    yards: ['Main Central Warehouse (Cairo)', 'Central Alexandria Yard', 'Suez Canal Supply Staging']
  });

  // Master Material form state (Screen 6)
  const [masterMatName, setMasterMatName] = useState('High Tensile Steel Rebar 16mm');
  const [masterMatCategory, setMasterMatCategory] = useState('Steel & Metals');
  const [masterMatUOM, setMasterMatUOM] = useState('Ton');
  const [masterMatSKU, setMasterMatSKU] = useState('STL-RB-16');
  const [masterMatMinReorder, setMasterMatMinReorder] = useState('25');
  const [masterMatCost, setMasterMatCost] = useState('780');
  const [masterMatSpecs, setMasterMatSpecs] = useState('ASTM A615 Grade 60, high yield strength deformed steel bars.');
  const [masterMatAutoSurplus, setMasterMatAutoSurplus] = useState(true);

  // Staging Yards List (Screen 5)
  const [stagingYardsList, setStagingYardsList] = useState([
    { id: "YD-001", code: "YD-001", name: "Main Central Warehouse (Cairo)", location: "New Cairo - Dedicated staging / Regional", status: "Active", itemsCount: 420 },
    { id: "YD-002", code: "YD-002", name: "Central Alexandria Yard", location: "Borg El Arab Industrial Area", status: "Active", itemsCount: 285 },
    { id: "YD-003", code: "YD-003", name: "Suez Canal Supply Staging", location: "Ain Sokhna Logistics Hub", status: "Active", itemsCount: 140 },
    { id: "YD-004", code: "YD-004", name: "West Giza Staging Facility", location: "6th of October City", status: "Active", itemsCount: 67 }
  ]);

  // Projects list matching Figma Screen 1 in media_1792615496668_11280829.png (12 Total: 8 Active, 3 Completed, 1 On Hold)
  const [projectsList, setProjectsList] = useState([
    {
      id: "PRJ-001",
      code: "CCLY-2026",
      name: "Central Cairo Logistics Yard",
      nameAr: "ساحة القاهرة اللوجستية المركزية",
      location: "Cairo, Egypt",
      manager: "Eng. Ahmed Sabri",
      startDate: "15 Jan 2026",
      targetEndDate: "30 Nov 2027",
      status: "Active",
      shortages: 2,
      surplus: 1,
      spend: "$12.4M / $18.5M",
      progress: 42,
      hasUrgentShortage: true
    },
    {
      id: "PRJ-002",
      code: "ABT-2025",
      name: "Al-Bayan Business Tower",
      nameAr: "برج البيان للأعمال الإدارية",
      location: "Giza, Egypt",
      manager: "Eng. Sara Adel",
      startDate: "01 Mar 2025",
      targetEndDate: "28 Feb 2027",
      status: "Active",
      shortages: 0,
      surplus: 2,
      spend: "$24.8M / $32.0M",
      progress: 74,
      hasUrgentShortage: false
    },
    {
      id: "PRJ-003",
      code: "APLC-2024",
      name: "Alexandria Port Logistics Center",
      nameAr: "مركز ميناء الإسكندرية اللوجستي",
      location: "Alexandria, Egypt",
      manager: "Eng. Tamer Khaled",
      startDate: "10 Oct 2024",
      targetEndDate: "15 Aug 2026",
      status: "On Hold",
      shortages: 0,
      surplus: 0,
      spend: "$14.9M / $19.8M",
      progress: 48,
      hasUrgentShortage: false
    },
    {
      id: "PRJ-004",
      code: "NMRC-2025",
      name: "New Mansoura Residential Complex",
      nameAr: "مجمع المنصورة الجديدة السكني",
      location: "New Mansoura, Egypt",
      manager: "Eng. Mostafa Salem",
      startDate: "01 Jun 2025",
      targetEndDate: "30 Dec 2027",
      status: "Active",
      shortages: 1,
      surplus: 3,
      spend: "$18.2M / $26.0M",
      progress: 60,
      hasUrgentShortage: false
    },
    {
      id: "PRJ-005",
      code: "RSR-2025",
      name: "Red Sea Resort Phase 2",
      nameAr: "منتجع البحر الأحمر - المرحلة الثانية",
      location: "Ain Sokhna / Red Sea, Egypt",
      manager: "Eng. Eman El-Sayed",
      startDate: "15 Sep 2025",
      targetEndDate: "20 Mar 2027",
      status: "Completed",
      shortages: 0,
      surplus: 0,
      spend: "$35.0M / $35.0M",
      progress: 100,
      hasUrgentShortage: false
    },
    {
      id: "PRJ-006",
      code: "NCFH-2025",
      name: "New Capital Financial Hub",
      nameAr: "المركز المالي بالعاصمة الإدارية",
      location: "New Capital, Egypt",
      manager: "Eng. Mostafa Salem",
      startDate: "10 Jan 2025",
      targetEndDate: "15 Dec 2026",
      status: "Active",
      shortages: 0,
      surplus: 1,
      spend: "$28.4M / $38.2M",
      progress: 82,
      hasUrgentShortage: false
    },
    {
      id: "PRJ-007",
      code: "SIP-2026",
      name: "Sadat Industrial Park Zone 4",
      nameAr: "المنطقة الصناعية بالسادات - زون 4",
      location: "Sadat City, Egypt",
      manager: "Eng. Eman El-Sayed",
      startDate: "01 Feb 2026",
      targetEndDate: "20 Oct 2027",
      status: "Active",
      shortages: 0,
      surplus: 2,
      spend: "$19.6M / $22.4M",
      progress: 54,
      hasUrgentShortage: false
    },
    {
      id: "PRJ-008",
      code: "NCHV-2026",
      name: "North Coast Hospitality Village",
      nameAr: "قرية الساحل الشمالي الفندقية",
      location: "Sahel, Egypt",
      manager: "Eng. Tamer Khaled",
      startDate: "01 May 2026",
      targetEndDate: "30 Jun 2028",
      status: "Active",
      shortages: 0,
      surplus: 0,
      spend: "$8.5M / $42.0M",
      progress: 20,
      hasUrgentShortage: false
    },
    {
      id: "PRJ-009",
      code: "OCT-2025",
      name: "6th of October Logistics Hub",
      nameAr: "المركز اللوجستي بالسادس من أكتوبر",
      location: "6th of October, Egypt",
      manager: "Eng. Sara Adel",
      startDate: "15 Jul 2025",
      targetEndDate: "10 Jan 2027",
      status: "Active",
      shortages: 0,
      surplus: 1,
      spend: "$11.8M / $16.0M",
      progress: 70,
      hasUrgentShortage: false
    },
    {
      id: "PRJ-010",
      code: "CBC-2024",
      name: "Commercial Business Center",
      nameAr: "المركز التجاري الإداري",
      location: "New Cairo, Egypt",
      manager: "Eng. Tamer Khaled",
      startDate: "01 Aug 2024",
      targetEndDate: "15 May 2026",
      status: "Completed",
      shortages: 0,
      surplus: 0,
      spend: "$11.2M / $11.2M",
      progress: 100,
      hasUrgentShortage: false
    },
    {
      id: "PRJ-011",
      code: "SCLF-2024",
      name: "Suez Canal Logistics Facility",
      nameAr: "منشأة قناة السويس اللوجستية",
      location: "Suez, Egypt",
      manager: "Eng. Eman El-Sayed",
      startDate: "12 Nov 2024",
      targetEndDate: "05 Apr 2026",
      status: "Completed",
      shortages: 0,
      surplus: 0,
      spend: "$16.5M / $16.5M",
      progress: 100,
      hasUrgentShortage: false
    },
    {
      id: "PRJ-012",
      code: "ASIS-2025",
      name: "Aswan Solar Infrastructure Site",
      nameAr: "موقع البنية التحتية للطاقة بأسوان",
      location: "Aswan, Egypt",
      manager: "Eng. Mostafa Salem",
      startDate: "20 Feb 2025",
      targetEndDate: "15 Sep 2026",
      status: "Active",
      shortages: 0,
      surplus: 2,
      spend: "$22.0M / $28.0M",
      progress: 65,
      hasUrgentShortage: false
    }
  ]);

  // Company Team Users list (Matching Figma Screen 2 & 3)
  const [usersList, setUsersList] = useState([
    {
      id: "USR-001",
      name: "Eman Gabr (You)",
      isSelf: true,
      email: "admin@albayan-group.com",
      role: "Company Admin",
      assignedProjects: ["PRJ-001", "PRJ-002", "PRJ-003", "PRJ-004", "PRJ-005"],
      companyWide: true,
      status: "Active",
      invitation: "—",
      avatarInitials: "EG",
      avatarBg: "bg-slate-900 text-white",
      joinedDate: "Jan 12, 2026"
    },
    {
      id: "USR-002",
      name: "Eng. Eman El-Sayed",
      isSelf: false,
      email: "eman.sayed@albayan-group.com",
      role: "Project Manager",
      assignedProjects: ["PRJ-001", "PRJ-005"],
      companyWide: false,
      status: "Active",
      invitation: "Accepted",
      avatarInitials: "EE",
      avatarBg: "bg-orange-100 text-[#E85312]",
      joinedDate: "Feb 01, 2026"
    },
    {
      id: "USR-003",
      name: "Eng. Mohamed Fathy",
      isSelf: false,
      email: "m.fathy@albayan-group.com",
      role: "Site Engineer",
      assignedProjects: ["PRJ-001"],
      companyWide: false,
      status: "Active",
      invitation: "Accepted",
      avatarInitials: "MF",
      avatarBg: "bg-blue-100 text-blue-700",
      joinedDate: "Feb 14, 2026"
    },
    {
      id: "USR-004",
      name: "Ahmed Hassan",
      isSelf: false,
      email: "a.hassan@albayan-group.com",
      role: "Procurement Officer",
      assignedProjects: ["PRJ-001", "PRJ-002", "PRJ-003", "PRJ-004", "PRJ-005"],
      companyWide: true,
      status: "Active",
      invitation: "Accepted",
      avatarInitials: "AH",
      avatarBg: "bg-emerald-100 text-emerald-700",
      joinedDate: "Mar 05, 2026"
    },
    {
      id: "USR-005",
      name: "Mahmoud Eid",
      isSelf: false,
      email: "m.eid@albayan-group.com",
      role: "Warehouse Officer",
      assignedProjects: ["PRJ-001", "PRJ-005"],
      companyWide: false,
      status: "Pending",
      invitation: "Sent",
      avatarInitials: "ME",
      avatarBg: "bg-purple-100 text-purple-700",
      joinedDate: "Apr 20, 2026"
    }
  ]);

  // Audit Log items (Figma Screen 8)
  const [auditLogsList, setAuditLogsList] = useState([
    {
      id: "AUD-1248",
      timestamp: "Today, 14:32:10",
      actor: "Eng. Eman El-Sayed",
      role: "Project Manager",
      action: "Surplus Reallocation Approved",
      project: "New Mansoura Towers",
      details: "+90T Steel Rebar transferred from CBD Complex. Cost avoided: $45,550.",
      verified: true
    },
    {
      id: "AUD-1247",
      timestamp: "Today, 11:15:04",
      actor: "Eman Gabr",
      role: "Company Admin",
      action: "Project Created & Initialized",
      project: "Red Sea Resort Phase 2",
      details: "Digital BOQ provisioned with 14 days early shortage warning buffer.",
      verified: true
    },
    {
      id: "AUD-1246",
      timestamp: "Today, 09:40:22",
      actor: "Ahmed Hassan",
      role: "Procurement Officer",
      action: "AI Quotation Award Issued",
      project: "Alexandria Waterfront Heights",
      details: "PO-2026-0392 awarded to Apex Steel ($48,200). AI Confidence 94.6%.",
      verified: true
    },
    {
      id: "AUD-1245",
      timestamp: "Yesterday, 18:20:15",
      actor: "Eng. Mohamed Fathy",
      role: "Site Engineer",
      action: "Daily Concrete Pour Confirmed",
      project: "New Mansoura Towers",
      details: "320 m³ ready mix poured at Sector B4. Scrap waste within 3.2% limit.",
      verified: true
    },
    {
      id: "AUD-1244",
      timestamp: "Yesterday, 14:05:50",
      actor: "Mahmoud Eid",
      role: "Warehouse Officer",
      action: "Digital OCR Delivery Receipt Verified",
      project: "Sadat City Logistics Park",
      details: "Delivery Note #DN-8819 logged automatically via AI Vision OCR.",
      verified: true
    }
  ]);

  // Recent Requisitions list (Screen 2)
  const recentRequisitions = [
    { id: "REQ-041", material: "Ready Mix Concrete 350kg/cm²", project: "New Mansoura Towers", qty: "320 m³", status: "In Transit", date: "Today, 10:15" },
    { id: "REQ-040", material: "High Tensile Rebar Ø16mm Grade 60", project: "CBD Complex", qty: "45 Tons", status: "Transferred (Internal)", date: "Today, 08:30" },
    { id: "REQ-039", material: "Portland Cement 42.5N (Bags)", project: "Alexandria Waterfront", qty: "600 Bags", status: "Delivered", date: "Yesterday, 16:45" },
    { id: "REQ-038", material: "Marine Grade Plywood 18mm", project: "Commercial Business Center", qty: "180 Sheets", status: "Approved", date: "Yesterday, 11:20" }
  ];

  // Financial Analytics Chart Data (Figma Screen 7)
  const spendVsSavingsData = [
    { project: 'Mansoura', externalSpend: 6240, internalSaved: 1250 },
    { project: 'New Capital', externalSpend: 28400, internalSaved: 3800 },
    { project: 'Alexandria', externalSpend: 14950, internalSaved: 2100 },
    { project: 'New Cairo', externalSpend: 3800, internalSaved: 680 },
    { project: 'Sadat Park', externalSpend: 19600, internalSaved: 2950 }
  ];

  const categoryData = [
    { name: "Concrete & Ready Mix", value: 45, color: "#E85312" },
    { name: "Steel & Rebar", value: 25, color: "#3B82F6" },
    { name: "Masonry & Blocks", value: 15, color: "#64748B" },
    { name: "Plumbing & PVC", value: 10, color: "#F59E0B" },
    { name: "Finishing & Tiles", value: 5, color: "#10B981" }
  ];

  // Forms state for Add Project & Add User
  const [projWizardStep, setProjWizardStep] = useState(1);
  const [newProjName, setNewProjName] = useState('New Giza Residences & Towers');
  const [newProjCode, setNewProjCode] = useState('NGR-2027');
  const [newProjClient, setNewProjClient] = useState('Elsewedy Developments');
  const [newProjType, setNewProjType] = useState('Residential Compound');
  const [newProjLocation, setNewProjLocation] = useState('New Cairo, Zone 5');
  const [newProjBudget, setNewProjBudget] = useState('24500000');
  const [newProjManager, setNewProjManager] = useState('Eng. Tamer Khaled');
  const [newProjSiteEngineer, setNewProjSiteEngineer] = useState('Eng. Mohamed Fathy');
  const [newProjStagingYard, setNewProjStagingYard] = useState('Main Central Warehouse (Cairo)');

  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('Site Engineer');
  const [newUserAssignedProject, setNewUserAssignedProject] = useState('PRJ-001');

  // Toggle Project assignment for a user in real-time
  const handleToggleUserProject = (userId, projId) => {
    setUsersList(prev => prev.map(u => {
      if (u.id !== userId) return u;
      const exists = u.assignedProjects.includes(projId);
      const nextProjects = exists 
        ? u.assignedProjects.filter(p => p !== projId)
        : [...u.assignedProjects, projId];
      return { ...u, assignedProjects: nextProjects };
    }));
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    const newP = {
      id: `PRJ-${String(projectsList.length + 1).padStart(3, '0')}`,
      code: newProjCode,
      name: newProjName,
      nameAr: newProjName,
      sampleName: `[Sample Project ${String.fromCharCode(65 + projectsList.length)}]`,
      location: newProjLocation,
      manager: newProjManager,
      managerShort: newProjManager,
      progress: 5,
      shortages: 0,
      surplus: 0,
      spend: `$0.0M / $${(Number(newProjBudget) / 1000000).toFixed(1)}M`,
      status: "Active",
      startDate: "Nov 2026",
      expectedCompletion: "Jun 2028"
    };
    setProjectsList([...projectsList, newP]);
    setShowAddProjectModal(false);
    setProjWizardStep(1);
    setToastMessage(`Project "${newP.name}" created and assigned to ${newP.manager}!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const candidateName = newUserName.trim() || "Mustafa Barkat";
    const candidateEmail = newUserEmail.trim() || "mustafa.barkat@albayan.example";
    const assignedProjObj = projectsList.find(p => p.id === newUserAssignedProject) || { name: "Central Cairo Logistics Warehouse" };

    const newU = {
      id: `USR-${String(usersList.length + 1).padStart(3, '0')}`,
      name: candidateName,
      isSelf: false,
      email: candidateEmail,
      role: newUserRole,
      assignedProjects: [newUserAssignedProject],
      companyWide: false,
      status: "Pending",
      invitation: "Sent",
      avatarInitials: candidateName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || "MB",
      avatarBg: "bg-blue-100 text-blue-700",
      joinedDate: "Today"
    };

    setInviteeData({
      name: candidateName,
      email: candidateEmail,
      role: newUserRole,
      project: assignedProjObj.name,
      expires: "Jan 25, 2026"
    });

    setUsersList([...usersList, newU]);
    setShowAddUserModal(false);
    setNewUserName('');
    setNewUserEmail('');
    setShowInviteAcceptanceModal(true);
    setToastMessage(isAr ? `تم إرسال الدعوة إلى "${candidateName}"، شاشة قبول الدعوة مفتوحة للمعاينة!` : `Invitation sent to "${candidateName}"! Previewing acceptance screen...`);
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Filtered projects
  const filteredProjects = projectsList.filter(p => {
    if (projectStatusFilter !== 'ALL' && p.status !== projectStatusFilter) return false;
    if (selectedPMFilter !== 'ALL' && !p.manager.includes(selectedPMFilter)) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return p.name.toLowerCase().includes(term) || 
             (p.sampleName && p.sampleName.toLowerCase().includes(term)) ||
             p.code.toLowerCase().includes(term) ||
             p.location.toLowerCase().includes(term) ||
             p.manager.toLowerCase().includes(term);
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
          <button onClick={() => setToastMessage(null)} className="cursor-pointer">✕</button>
        </div>
      )}

      {/* Top Banner & Header matching Figma Screen 1 & 2 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {activeTab === 'profile'
                ? (isAr ? "ملف الشركة والبيانات القانونية" : "Company Profile")
                : activeTab === 'users-team' 
                ? (isAr ? "إدارة المستخدمين وفريق العمل" : "User Management")
                : activeTab === 'projects-mgmt'
                ? (isAr ? "نظرة عامة على المشاريع (Projects Overview)" : "Projects Overview")
                : activeTab === 'warehouses'
                ? (isAr ? "المستودعات وساحات التشوين (Warehouses)" : "Warehouses")
                : activeTab === 'materials-catalog'
                ? (isAr ? "كتالوج المواد المعتمدة (Materials Catalog)" : "Materials Catalog")
                : activeTab === 'analytics'
                ? (isAr ? "التقارير والتحليلات المالية (Reports & Analytics)" : "Reports & Analytics")
                : activeTab === 'audit-log'
                ? (isAr ? "سجل التدقيق والحوكمة (Audit Log)" : "Audit Log")
                : activeTab === 'settings'
                ? (isAr ? "إعدادات الشركة (Company Settings)" : "Company Settings")
                : (isAr ? "لوحة تحكم الشركة (Company Dashboard)" : "Company Dashboard")
              }
            </h1>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
              IRAM Enterprise
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            {activeTab === 'profile'
              ? (isAr ? "إدارة هوية الشركة، السجل التجاري، وبيانات الاتصال والتشوين." : "Manage your company's core identity, registration details, and enterprise scale.")
              : activeTab === 'users-team'
              ? (isAr ? "إدارة أعضاء شركتك، الدعوات، والأدوار والصلاحيات المسندة لكل مشروع." : "Manage your company members, invitations, and assigned roles.")
              : activeTab === 'projects-mgmt'
              ? (isAr ? "متابعة حالة كافة المشاريع الجارية والمكتملة وإدارة جدول الكميات والتوريد." : "Track the status of all active, upcoming, and completed projects across your company.")
              : activeTab === 'warehouses'
              ? (isAr ? "إدارة المستودعات المركزية لشركتك والمرافق الإقليمية وساحات التشوين بالمواقع." : "Manage your company's central warehouses, regional facilities, and site yards.")
              : activeTab === 'materials-catalog'
              ? (isAr ? "مكتبة المواصفات القياسية المعتمدة للمواد الإنشائية لتوحيد جداول الكميات (BOQ)." : "Standardized construction materials specification library across all company projects.")
              : activeTab === 'audit-log'
              ? (isAr ? "سجل تدقيق زمني غير قابل للتعديل لكافة العمليات والاعتمادات." : "Real-time immutable audit trail for compliance and material transactions.")
              : activeTab === 'settings'
              ? (isAr ? "إدارة الهوية القانونية للشركة، تفضيلات التوطين واللغة، وإعدادات تنبيهات الحوكمة وتوزيع الفائض." : "Manage legal identity, enterprise localization, notification rules, and system governance.")
              : (isAr ? "إدارة شركتك، تنظيم فرق العمل، ومتابعة المشاريع والتوريد في منصة إرم." : "Manage your company and organize your teams in IRAM.")
            }
          </p>
        </div>

        {/* Master Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          {activeTab === 'warehouses' ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => { setWarehousesViewMode('populated'); setSelectedWarehouse(null); }}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    warehousesViewMode === 'populated' && !selectedWarehouse ? 'bg-[#E85312] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isAr ? "المستودعات (4)" : "Populated (4)"}
                </button>
                <button
                  type="button"
                  onClick={() => { setWarehousesViewMode('empty'); setSelectedWarehouse(null); }}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    warehousesViewMode === 'empty' ? 'bg-[#E85312] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isAr ? "فارغة (Screen 2)" : "Empty State"}
                </button>
              </div>
              <button
                type="button"
                onClick={() => setShowAddWarehouseModal(true)}
                className="px-4 py-2.5 bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{isAr ? "+ إضافة مستودع" : "+ Add Warehouse"}</span>
              </button>
            </div>
          ) : activeTab === 'materials-catalog' ? (
            <button
              type="button"
              onClick={() => setShowCreateMaterialModal(true)}
              className="px-4 py-2.5 bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{isAr ? "+ تسجيل مادة جديدة" : "+ Create Material"}</span>
            </button>
          ) : activeTab === 'settings' ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setToastMessage(isAr ? "تم إلغاء التغييرات واستعادة الإعدادات الأصلية." : "Changes discarded.");
                  setTimeout(() => setToastMessage(null), 3000);
                }}
                className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
              >
                {isAr ? "تراجع (Discard)" : "Discard"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setToastMessage(isAr ? "تم حفظ إعدادات الشركة وتفضيلات النظام بنجاح!" : "Company settings saved and synced successfully!");
                  setTimeout(() => setToastMessage(null), 3500);
                }}
                className="px-5 py-2.5 bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
              >
                {isAr ? "حفظ التغييرات" : "Save Changes"}
              </button>
            </div>
          ) : activeTab === 'users-team' ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowInviteAcceptanceModal(true)}
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                title="Preview Acceptance Screen (Frame 3)"
              >
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span>{isAr ? "معاينة شاشة القبول" : "Preview Acceptance"}</span>
              </button>
              <button 
                onClick={() => setShowAddUserModal(true)}
                className="px-4 py-2.5 rounded-xl bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-xs shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>{isAr ? "دعوة عضو جديد" : "Invite Team Member"}</span>
              </button>
            </div>
          ) : activeTab === 'profile' ? (
            <button
              onClick={() => {
                setToastMessage(isAr ? "تم حفظ جميع بيانات ملف الشركة بنجاح!" : "Company profile updated and synced successfully!");
                setTimeout(() => setToastMessage(null), 3500);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              {isAr ? "حفظ التغييرات" : "Save Changes"}
            </button>
          ) : (
            <>
              <button 
                onClick={() => setShowSelectYardModal(true)}
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-800 font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <FolderOpen className="w-3.5 h-3.5 text-slate-500" />
                <span>{isAr ? "ساحات التشوين" : "Staging Yards"}</span>
              </button>

              <button 
                onClick={() => setShowAddProjectModal(true)}
                className="px-4 py-2.5 rounded-xl bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-xs shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <FolderPlus className="w-4 h-4" />
                <span>{isAr ? "+ إضافة مشروع جديد" : "+ Create Project"}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Sub Tabs matching Figma Navigation from media_1792615463928_266e32ac */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 gap-4">
        <div className="flex gap-5 text-xs sm:text-sm font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`pb-3 transition-colors relative cursor-pointer whitespace-nowrap ${
              activeTab === 'dashboard' 
                ? 'text-[#E85312] border-b-2 border-[#E85312] font-black' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {isAr ? "لوحة التحكم (Dashboard)" : "Dashboard"}
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 transition-colors relative cursor-pointer whitespace-nowrap ${
              activeTab === 'profile' 
                ? 'text-[#E85312] border-b-2 border-[#E85312] font-black' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {isAr ? "ملف الشركة (Company Profile)" : "Company Profile"}
          </button>

          <button
            onClick={() => setActiveTab('users-team')}
            className={`pb-3 transition-colors relative cursor-pointer whitespace-nowrap ${
              activeTab === 'users-team' 
                ? 'text-[#E85312] border-b-2 border-[#E85312] font-black' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {isAr ? `إدارة المستخدمين (${usersList.length})` : `User Management (${usersList.length})`}
          </button>

          <button
            onClick={() => setActiveTab('projects-mgmt')}
            className={`pb-3 transition-colors relative cursor-pointer whitespace-nowrap ${
              activeTab === 'projects-mgmt' 
                ? 'text-[#E85312] border-b-2 border-[#E85312] font-black' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {isAr ? `نظرة عامة على المشاريع (${projectsList.length})` : `Projects Overview (${projectsList.length})`}
          </button>

          <button
            onClick={() => { setActiveTab('warehouses'); setSelectedWarehouse(null); }}
            className={`pb-3 transition-colors relative cursor-pointer whitespace-nowrap ${
              activeTab === 'warehouses' 
                ? 'text-[#E85312] border-b-2 border-[#E85312] font-black' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {isAr ? `المستودعات والساحات (${warehousesList.length})` : `Warehouses (${warehousesList.length})`}
          </button>

          <button
            onClick={() => setActiveTab('materials-catalog')}
            className={`pb-3 transition-colors relative cursor-pointer whitespace-nowrap ${
              activeTab === 'materials-catalog' 
                ? 'text-[#E85312] border-b-2 border-[#E85312] font-black' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {isAr ? `كتالوج المواد (${catalogItemsList.length})` : `Materials Catalog (${catalogItemsList.length})`}
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`pb-3 transition-colors relative cursor-pointer whitespace-nowrap ${
              activeTab === 'analytics' 
                ? 'text-[#E85312] border-b-2 border-[#E85312] font-black' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {isAr ? "التقارير والتحليلات (Reports & Analytics)" : "Reports & Analytics"}
          </button>

          <button
            onClick={() => setActiveTab('audit-log')}
            className={`pb-3 transition-colors relative cursor-pointer whitespace-nowrap ${
              activeTab === 'audit-log' 
                ? 'text-[#E85312] border-b-2 border-[#E85312] font-black' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {isAr ? "سجل التدقيق (Audit Log)" : "Audit Log"}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 transition-colors relative cursor-pointer whitespace-nowrap ${
              activeTab === 'settings' 
                ? 'text-[#E85312] border-b-2 border-[#E85312] font-black' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {isAr ? "إعدادات الشركة (Company Settings)" : "Company Settings"}
          </button>
        </div>

        {/* Quick Modal Triggers matching Screen 5 & 6 */}
        <div className="flex items-center gap-2 pb-2.5">
          <button
            type="button"
            onClick={() => setShowSelectYardModal(true)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-[#E85312] hover:bg-orange-50/20 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <FolderOpen className="w-3.5 h-3.5 text-[#E85312]" />
            <span>{isAr ? "ساحات التشوين" : "Staging Yards"}</span>
          </button>
          <button
            type="button"
            onClick={() => setShowCreateMaterialModal(true)}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-orange-400" />
            <span>{isAr ? "+ مادة معتمدة" : "+ Master Material"}</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. SCREEN 1 & 2: COMPANY DASHBOARD (Figma Canvas Screen 1 & 2) */}
      {/* ============================================================== */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Sub-view Switcher for Figma Screen 1 vs Screen 2 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">
                {isAr ? "معاينة تصميم لوحة القيادة:" : "Dashboard View Mode:"}
              </span>
              <div className="inline-flex rounded-xl bg-white p-1 border border-slate-200 text-xs font-bold shadow-xs">
                <button
                  type="button"
                  onClick={() => setDashboardSubMode('overview')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    dashboardSubMode === 'overview' ? 'bg-[#E85312] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isAr ? "نظرة عامة على الشركة (Screen 2)" : "Company Overview (Screen 2)"}
                </button>
                <button
                  type="button"
                  onClick={() => setDashboardSubMode('welcome')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    dashboardSubMode === 'welcome' ? 'bg-[#E85312] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isAr ? "التهيئة الأولية ونسبة الإنجاز (Screen 1)" : "Welcome to IRAM (Screen 1)"}
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowAddProjectModal(true)}
              className="px-3.5 py-1.5 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-lg text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isAr ? "+ إنشاء مشروع جديد" : "+ Create New Project"}</span>
            </button>
          </div>

          {/* SCREEN 2: COMPANY OVERVIEW */}
          {dashboardSubMode === 'overview' ? (
            <div className="space-y-6">
              
              {/* 4 KPI Cards matching Figma Screen 2 with Smooth Hover Lift */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs card-hover-lift cursor-pointer hover:border-orange-300">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-bold text-slate-600">{isAr ? "أعضاء الفريق" : "Team Members"}</span>
                    <Users className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="text-3xl font-black text-slate-900 font-mono">24</div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {isAr ? "21 نشطون، 3 دعوات معلقة" : "21 active, 3 pending"}
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs card-hover-lift cursor-pointer hover:border-emerald-300">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-bold text-slate-600">{isAr ? "المشاريع النشطة" : "Active Projects"}</span>
                    <FolderOpen className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-3xl font-black text-slate-900 font-mono">21</div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-1">
                    {isAr ? "مواقع متزامنة ومسندة" : "Sites under live supervision"}
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs card-hover-lift cursor-pointer hover:border-amber-300">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-bold text-slate-600">{isAr ? "دعوات قيد الانتظار" : "Pending Invitations"}</span>
                    <Mail className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-3xl font-black text-slate-900 font-mono">3</div>
                  <div className="text-[11px] text-amber-600 font-semibold mt-1">
                    {isAr ? "بانتظار قبول الدعوة" : "Awaiting user onboarding"}
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs card-hover-lift cursor-pointer hover:border-orange-400">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-bold text-slate-600">{isAr ? "إجراءات مطلوبة" : "Action Required"}</span>
                    <AlertTriangle className="w-4 h-4 text-[#E85312] animate-bounce" />
                  </div>
                  <div className="text-3xl font-black text-[#E85312] font-mono">5</div>
                  <div className="text-[11px] text-rose-600 font-semibold mt-1">
                    {isAr ? "تنبيهات نقص ومناقلات فائض" : "Shortage & surplus actions"}
                  </div>
                </div>
              </div>

              {/* Two Column Layout matching Figma Screen 2 */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left 2 Cols: Projects & Recent Requisitions */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Projects Overview List */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div>
                        <h3 className="font-bold text-base text-slate-900">
                          {isAr ? "المشاريع الرئيسية" : "Projects Overview"}
                        </h3>
                        <p className="text-xs text-slate-400">
                          {isAr ? "متابعة نسب الإنجاز وحالة التوريدات" : "Monitor execution progress & material health"}
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab('projects-mgmt')}
                        className="text-xs font-bold text-[#E85312] hover:underline cursor-pointer"
                      >
                        {isAr ? "عرض الكل ←" : "View All →"}
                      </button>
                    </div>

                    <div className="space-y-3">
                      {projectsList.map(proj => (
                        <div
                          key={proj.id}
                          onClick={() => onSelectProject(proj.id)}
                          className="p-3.5 rounded-xl border border-slate-100 hover:border-[#E85312] hover:bg-orange-50/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-slate-900 group-hover:text-[#E85312] transition-colors">
                                {isAr ? proj.nameAr : proj.name}
                              </span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                proj.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                              }`}>
                                {proj.status}
                              </span>
                            </div>
                            <div className="text-xs text-slate-400">
                              {proj.location} • PM: {proj.managerShort || proj.manager}
                            </div>
                          </div>

                          <div className="flex items-center gap-4 sm:text-right">
                            <div className="w-28">
                              <div className="flex justify-between text-[11px] font-bold mb-1">
                                <span>Progress</span>
                                <span>{proj.progress}%</span>
                              </div>
                              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-[#E85312] h-1.5 rounded-full" style={{ width: `${proj.progress}%` }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Requisitions Table */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div>
                        <h3 className="font-bold text-base text-slate-900">
                          {isAr ? "طلبات المواد والتوريد الحديثة" : "Recent Material Requisitions"}
                        </h3>
                        <p className="text-xs text-slate-400">
                          {isAr ? "طلبات المواقع وفحص الفائض الداخلي" : "Live site demand & surplus matching"}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-slate-500">Live Sync</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left rtl:text-right text-xs">
                        <thead className="bg-slate-50 text-slate-400 font-bold border-b border-slate-200 uppercase text-[10px]">
                          <tr>
                            <th className="px-4 py-2.5">REQ ID & MATERIAL</th>
                            <th className="px-3 py-2.5">PROJECT</th>
                            <th className="px-3 py-2.5">QUANTITY</th>
                            <th className="px-3 py-2.5 text-right rtl:text-left">STATUS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {recentRequisitions.map(req => (
                            <tr key={req.id} className="hover:bg-slate-50/60">
                              <td className="px-4 py-3">
                                <span className="font-bold text-slate-900 block">{req.material}</span>
                                <span className="text-[10px] text-slate-400 font-mono">{req.id} • {req.date}</span>
                              </td>
                              <td className="px-3 py-3 text-slate-700">{req.project}</td>
                              <td className="px-3 py-3 font-mono font-bold text-slate-900">{req.qty}</td>
                              <td className="px-3 py-3 text-right rtl:text-left">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-[#E85312] border border-orange-200">
                                  {req.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>

                {/* Right Col: Notifications, Yards, and Quick Catalog */}
                <div className="space-y-6">
                  
                  {/* Notifications */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                        <Bell className="w-4 h-4 text-[#E85312]" />
                        <span>{isAr ? "التنبيهات والإشعارات" : "Recent Notifications"}</span>
                      </h3>
                      <span className="w-2 h-2 rounded-full bg-[#E85312] animate-pulse"></span>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="p-3 rounded-xl bg-orange-50/50 border border-orange-100 space-y-1">
                        <span className="font-bold text-slate-900 block">Surplus Match Detected</span>
                        <p className="text-slate-500 text-[11px] leading-relaxed">
                          +90T Steel Rebar available in New Capital to cover Mansoura shortage.
                        </p>
                        <span className="text-[10px] text-slate-400 block pt-0.5">15 mins ago</span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                        <span className="font-bold text-slate-900 block">AI PO Approval Required</span>
                        <p className="text-slate-500 text-[11px] leading-relaxed">
                          PO-0418 for 320 m³ ready mix awaiting executive signoff.
                        </p>
                        <span className="text-[10px] text-slate-400 block pt-0.5">2 hours ago</span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                        <span className="font-bold text-slate-900 block">New Team Member Joined</span>
                        <p className="text-slate-500 text-[11px] leading-relaxed">
                          Eng. Mohamed Fathy accepted invitation for New Mansoura.
                        </p>
                        <span className="text-[10px] text-slate-400 block pt-0.5">Yesterday</span>
                      </div>
                    </div>
                  </div>

                  {/* Warehouses & Yards Widget */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                        <FolderOpen className="w-4 h-4 text-[#E85312]" />
                        <span>{isAr ? "المستودعات وساحات التشوين" : "Warehouses & Yards"}</span>
                      </h3>
                      <button
                        type="button"
                        onClick={() => setShowSelectYardModal(true)}
                        className="text-xs font-bold text-[#E85312] hover:underline cursor-pointer"
                      >
                        Manage
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-2xl font-black text-slate-900 font-mono">4</span>
                        <span className="text-[10px] text-slate-500 block mt-0.5">Active Yards</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-2xl font-black text-slate-900 font-mono">912</span>
                        <span className="text-[10px] text-slate-500 block mt-0.5">Tracked Items</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowSelectYardModal(true)}
                      className="w-full py-2 bg-slate-100 hover:bg-orange-50 hover:text-[#E85312] text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>{isAr ? "تصفح ساحات التشوين" : "Browse Staging Yards"}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </button>
                  </div>

                  {/* Master Material Quick Registration */}
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-xs space-y-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-orange-400 block">
                      BOQ Master Catalog
                    </span>
                    <h4 className="font-bold text-base">
                      {isAr ? "كتالوج المواد المعتمدة الموحد" : "Master Materials Catalog"}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {isAr 
                        ? "سجل أصناف موحدة مع كود SKU وسعر قياسي لتفعيل المقارنة الآلية للفائض."
                        : "Register standardized SKUs and benchmark unit costs to power internal matching."}
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowCreateMaterialModal(true)}
                      className="w-full py-2.5 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isAr ? "+ تسجيل مادة معتمدة" : "+ Create Company Material"}</span>
                    </button>
                  </div>

                </div>

              </div>

            </div>
          ) : (
            
            /* SCREEN 1: WELCOME TO IRAM & CHECKLIST (50% Setup Completed) */
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-orange-500 via-[#E85312] to-amber-600 text-white p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black">
                    {isAr ? "مرحباً بك في إرم (Welcome to IRAM)" : "Welcome to IRAM"}
                  </h2>
                  <p className="text-xs text-orange-100 max-w-xl">
                    {isAr 
                      ? "دعنا نجهز مساحة عمل شركتك للانطلاق وتفعيل المقارنة الذكية للمواد وحوكمة التوريد."
                      : "Get your company workspace set up and invite your team to start managing materials."}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className="px-4 py-2 bg-white text-slate-900 hover:bg-orange-50 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Complete Profile
                  </button>
                  <button
                    onClick={() => setActiveTab('users-team')}
                    className="px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Invite Team
                  </button>
                </div>
              </div>

              {/* Setup Progress Bar (50%) */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800">Setup Progress: 50% Completed</span>
                  <span className="text-[#E85312]">2 of 4 tasks finished</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-[#E85312] h-2 rounded-full w-1/2"></div>
                </div>
              </div>

              {/* 4 Checklist Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm shrink-0">
                    ✓
                  </div>
                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] font-black uppercase text-emerald-600 block">COMPLETED</span>
                    <h3 className="font-bold text-sm text-slate-900">1. Complete Company Profile</h3>
                    <p className="text-xs text-slate-500">Corporate registration, address, and license data saved.</p>
                    <button
                      onClick={() => setActiveTab('profile')}
                      className="text-xs font-bold text-[#E85312] hover:underline pt-1 block cursor-pointer"
                    >
                      Edit Profile →
                    </button>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#E85312] flex items-center justify-center font-bold text-sm shrink-0">
                    2
                  </div>
                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] font-black uppercase text-orange-600 block">IN PROGRESS</span>
                    <h3 className="font-bold text-sm text-slate-900">2. Invite Team Members</h3>
                    <p className="text-xs text-slate-500">Assign project managers, site engineers, and warehouse officers.</p>
                    <button
                      onClick={() => setActiveTab('users-team')}
                      className="text-xs font-bold text-[#E85312] hover:underline pt-1 block cursor-pointer"
                    >
                      Invite Team →
                    </button>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm shrink-0">
                    3
                  </div>
                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] font-black uppercase text-slate-400 block">STEP 3</span>
                    <h3 className="font-bold text-sm text-slate-900">3. Set Up Staging Yards</h3>
                    <p className="text-xs text-slate-500">Link designated regional yards for central inventory holding.</p>
                    <button
                      onClick={() => setShowSelectYardModal(true)}
                      className="text-xs font-bold text-[#E85312] hover:underline pt-1 block cursor-pointer"
                    >
                      Configure Yards →
                    </button>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm shrink-0">
                    4
                  </div>
                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] font-black uppercase text-slate-400 block">STEP 4</span>
                    <h3 className="font-bold text-sm text-slate-900">4. Create First Project & Digital BOQ</h3>
                    <p className="text-xs text-slate-500">Enable real-time shortage forecasting and material burn tracking.</p>
                    <button
                      onClick={() => setShowAddProjectModal(true)}
                      className="text-xs font-bold text-[#E85312] hover:underline pt-1 block cursor-pointer"
                    >
                      Create Project →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ============================================================== */}
      {/* 2. SCREEN 3: COMPANY PROFILE (Matching Figma Screen 3)         */}
      {/* ============================================================== */}
      {activeTab === 'profile' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  {isAr ? "ملف الشركة والبيانات القانونية" : "Company Profile"}
                </h2>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  Verified Contractor
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {isAr ? "إدارة هوية الشركة، السجل التجاري، وبيانات الاتصال والتشوين." : "Manage your company's core identity, registration details, and enterprise scale."}
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setActiveTab('dashboard')}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer"
              >
                {isAr ? "إلغاء" : "Cancel"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setToastMessage(isAr ? "تم حفظ جميع بيانات ملف الشركة بنجاح!" : "Company profile updated and synced successfully!");
                  setTimeout(() => setToastMessage(null), 3500);
                }}
                className="px-5 py-2 rounded-xl bg-[#E85312] hover:bg-[#CC490F] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
              >
                {isAr ? "حفظ التغييرات" : "Save Changes"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Col (2 Cols Wide): Core Details */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Section 1: Company Identity */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#E85312]" />
                  <span>{isAr ? "هوية الكيان والشركة (Company Identity)" : "Company Identity"}</span>
                </h3>

                <div className="flex flex-col sm:flex-row items-start gap-4 pt-1">
                  {/* Upload Logo Box */}
                  <div className="w-28 h-28 rounded-2xl border-2 border-dashed border-slate-200 hover:border-[#E85312] bg-slate-50 flex flex-col items-center justify-center p-2 text-center shrink-0 cursor-pointer transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center text-slate-400 group-hover:text-[#E85312] mb-1">
                      <FolderOpen className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 group-hover:text-[#E85312]">
                      Upload Logo
                    </span>
                    <span className="text-[8px] text-slate-400 mt-0.5">PNG, JPG up to 5MB</span>
                  </div>

                  <div className="flex-1 w-full space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isAr ? "الاسم القانوني للشركة" : "Company Legal Name"} *
                      </label>
                      <input
                        type="text"
                        value={companyProfile.name}
                        onChange={(e) => setCompanyProfile({...companyProfile, name: e.target.value})}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:border-[#E85312] transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isAr ? "رقم السجل التجاري (CR)" : "Business Registration (CR)"} *
                        </label>
                        <input
                          type="text"
                          value={companyProfile.crNumber}
                          onChange={(e) => setCompanyProfile({...companyProfile, crNumber: e.target.value})}
                          className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isAr ? "نوع الكيان والتصنيف" : "Company Type"}
                        </label>
                        <select
                          value={companyProfile.type}
                          onChange={(e) => setCompanyProfile({...companyProfile, type: e.target.value})}
                          className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                        >
                          <option>General Contractor (Class A)</option>
                          <option>Infrastructure & Heavy Civil</option>
                          <option>Commercial Real Estate Developer</option>
                          <option>Specialized Concrete & Steel Works</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sector Experience Checkboxes */}
                <div className="pt-2">
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {isAr ? "مجالات وسوابق الخبرة الإنشائية" : "Sector Experience & Portfolios"}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {['Commercial', 'Residential', 'Infrastructure', 'Industrial'].map(sec => {
                      const isChecked = companyProfile.sectors.includes(sec);
                      return (
                        <label 
                          key={sec}
                          className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                            isChecked ? 'border-[#E85312] bg-orange-50/30 font-bold text-slate-900' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              const next = isChecked ? companyProfile.sectors.filter(s => s !== sec) : [...companyProfile.sectors, sec];
                              setCompanyProfile({...companyProfile, sectors: next});
                            }}
                            className="rounded text-[#E85312] focus:ring-[#E85312]"
                          />
                          <span>{sec}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Section 2: Contact Information */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#E85312]" />
                  <span>{isAr ? "بيانات الاتصال والتواصل الرسمي" : "Contact Information"}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAr ? "البريد الإلكتروني المعتمد" : "Corporate Email"}
                    </label>
                    <input
                      type="email"
                      value={companyProfile.email}
                      onChange={(e) => setCompanyProfile({...companyProfile, email: e.target.value})}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAr ? "الهاتف الرئيسي" : "Primary Phone"}
                    </label>
                    <input
                      type="text"
                      value={companyProfile.phone}
                      onChange={(e) => setCompanyProfile({...companyProfile, phone: e.target.value})}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAr ? "بريد الفواتير والتحصيل" : "Billing Contact Email"}
                    </label>
                    <input
                      type="email"
                      value={companyProfile.billingEmail}
                      onChange={(e) => setCompanyProfile({...companyProfile, billingEmail: e.target.value})}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAr ? "الخط الساخن للطوارئ / العمليات" : "Hotline Number"}
                    </label>
                    <input
                      type="text"
                      value={companyProfile.hotline}
                      onChange={(e) => setCompanyProfile({...companyProfile, hotline: e.target.value})}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Company Address */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#E85312]" />
                  <span>{isAr ? "عنوان المقر الرئيسي" : "Company Address"}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAr ? "الدولة" : "Country"}
                    </label>
                    <input
                      type="text"
                      value={companyProfile.country}
                      onChange={(e) => setCompanyProfile({...companyProfile, country: e.target.value})}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAr ? "المدينة" : "City"}
                    </label>
                    <input
                      type="text"
                      value={companyProfile.city}
                      onChange={(e) => setCompanyProfile({...companyProfile, city: e.target.value})}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAr ? "الرمز البريدي" : "Postal Code"}
                    </label>
                    <input
                      type="text"
                      value={companyProfile.postalCode}
                      onChange={(e) => setCompanyProfile({...companyProfile, postalCode: e.target.value})}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isAr ? "العنوان التفصيلي" : "Full Street Address"}
                  </label>
                  <input
                    type="text"
                    value={companyProfile.address}
                    onChange={(e) => setCompanyProfile({...companyProfile, address: e.target.value})}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
              </div>

            </div>

            {/* Right Col: Company Scale & Registered Staging Yards */}
            <div className="space-y-6">
              
              {/* Enterprise Scale Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#E85312]" />
                  <span>{isAr ? "حجم ونطاق العمليات" : "Company Scale"}</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {isAr ? "حجم الأعمال السنوي التقريبي" : "Annual Construction Volume"}
                    </label>
                    <input
                      type="text"
                      value={companyProfile.annualVolume}
                      onChange={(e) => setCompanyProfile({...companyProfile, annualVolume: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {isAr ? "حجم القوة العاملة والمهندسين" : "Active Workforce Size"}
                    </label>
                    <input
                      type="text"
                      value={companyProfile.workforce}
                      onChange={(e) => setCompanyProfile({...companyProfile, workforce: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {isAr ? "سنة التأسيس" : "Year of Incorporation"}
                    </label>
                    <input
                      type="text"
                      value={companyProfile.yearIncorporated}
                      onChange={(e) => setCompanyProfile({...companyProfile, yearIncorporated: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Registered Staging Yards */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-[#E85312]" />
                    <span>{isAr ? "ساحات التخزين المعتمدة" : "Registered Yards"}</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowSelectYardModal(true)}
                    className="text-xs font-bold text-[#E85312] hover:underline cursor-pointer"
                  >
                    + Manage
                  </button>
                </div>

                <div className="space-y-2">
                  {stagingYardsList.map(yard => (
                    <div key={yard.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-900">{yard.name}</div>
                        <div className="text-[10px] text-slate-400">{yard.location}</div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                        {yard.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* 3. SCREEN 4: USER MANAGEMENT (Figma Canvas Screen 4)           */}
      {/* ============================================================== */}
      {activeTab === 'users-team' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Header Controls: View Mode Switcher for Demo Preview */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">
                {isAr ? "معاينة تصميم فيجما:" : "Figma Design State:"}
              </span>
              <div className="inline-flex rounded-xl bg-white p-1 border border-slate-200 text-xs font-bold shadow-xs">
                <button
                  type="button"
                  onClick={() => setUsersViewMode('populated')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    usersViewMode === 'populated' ? 'bg-[#E85312] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isAr ? "الجدول المكتمل ومناقلة المشاريع (Screen 3)" : "Populated Table & Popover (Screen 3)"}
                </button>
                <button
                  type="button"
                  onClick={() => setUsersViewMode('initial')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    usersViewMode === 'initial' ? 'bg-[#E85312] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isAr ? "الحالة الأولية ودعوة الأعضاء (Screen 2)" : "Initial State & Guide (Screen 2)"}
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowAddUserModal(true)}
              className="px-3.5 py-1.5 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-lg text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{isAr ? "+ دعوة عضو جديد" : "+ Invite Team Member"}</span>
            </button>
          </div>

          {/* 4 KPI Cards matching Figma Screen 4 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                {isAr ? "إجمالي الأعضاء" : "TOTAL MEMBERS"}
              </span>
              <div className="text-2xl font-black text-slate-900 mt-2 font-mono">
                {usersViewMode === 'initial' ? 1 : 24}
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                {usersViewMode === 'initial' ? "1 member" : "24 registered enterprise users"}
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                {isAr ? "المستخدمون النشطون" : "ACTIVE USERS"}
              </span>
              <div className="text-2xl font-black text-emerald-600 mt-2 font-mono">
                {usersViewMode === 'initial' ? 1 : 18}
              </div>
              <span className="text-[11px] text-emerald-600/80 mt-1 block">
                {isAr ? "صلاحيات مفعلة" : "Active logged-in accounts"}
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                {isAr ? "دعوات قيد الانتظار" : "PENDING INVITATIONS"}
              </span>
              <div className="text-2xl font-black text-amber-500 mt-2 font-mono">
                {usersViewMode === 'initial' ? 0 : 4}
              </div>
              <span className="text-[11px] text-amber-600/80 mt-1 block">
                {isAr ? "بانتظار قبول الدعوة" : "Awaiting onboarding acceptance"}
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                {isAr ? "صلاحيات مقيدة" : "RESTRICTED ACCESS"}
              </span>
              <div className="text-2xl font-black text-slate-600 mt-2 font-mono">
                {usersViewMode === 'initial' ? 0 : 2}
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                {isAr ? "صلاحيات موقع محددة" : "Single-site restricted view"}
              </span>
            </div>
          </div>

          {/* User Management Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-visible">
            
            {/* Filter Bar */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3" />
                  <input
                    type="text"
                    value={userSearchTerm}
                    onChange={(e) => setUserSearchTerm(e.target.value)}
                    placeholder={isAr ? "بحث بالاسم أو البريد..." : "Search users by name, email..."}
                    className="w-full pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#E85312] transition-all"
                  />
                </div>

                <select
                  value={userRoleFilter}
                  onChange={(e) => setUserRoleFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold"
                >
                  <option value="ALL">{isAr ? "جميع الأدوار" : "All Roles"}</option>
                  <option value="Company Admin">Company Admin</option>
                  <option value="Project Manager">Project Manager</option>
                  <option value="Site Engineer">Site Engineer</option>
                  <option value="Procurement Officer">Procurement Officer</option>
                  <option value="Warehouse Officer">Warehouse Officer</option>
                </select>

                <select
                  value={userStatusFilter}
                  onChange={(e) => setUserStatusFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold"
                >
                  <option value="ALL">{isAr ? "جميع الحالات" : "All Status"}</option>
                  <option value="Active">{isAr ? "نشط" : "Active"}</option>
                  <option value="Pending">{isAr ? "معلق" : "Pending"}</option>
                </select>
              </div>

              <div className="text-xs text-slate-400 font-medium">
                {isAr ? `عرض ${usersViewMode === 'initial' ? 1 : usersList.length} من الأعضاء` : `Showing ${usersViewMode === 'initial' ? 1 : usersList.length} members`}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto overflow-y-visible">
              <table className="w-full text-left rtl:text-right text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="px-5 py-3.5">{isAr ? "المستخدم والبريد" : "NAME & EMAIL"}</th>
                    <th className="px-4 py-3.5">{isAr ? "الدور والصلاحية" : "ROLE"}</th>
                    <th className="px-4 py-3.5">{isAr ? "المشاريع المسندة" : "ASSIGNED PROJECTS"}</th>
                    <th className="px-4 py-3.5">{isAr ? "الحالة" : "STATUS"}</th>
                    <th className="px-4 py-3.5">{isAr ? "تاريخ الانضمام" : "JOINED DATE"}</th>
                    <th className="px-4 py-3.5 text-right rtl:text-left">{isAr ? "الإجراء" : "ACTIONS"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  {(usersViewMode === 'initial' ? usersList.slice(0, 1) : usersList)
                    .filter(u => {
                      const matchSearch = !userSearchTerm || 
                        u.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
                        u.email.toLowerCase().includes(userSearchTerm.toLowerCase());
                      const matchRole = userRoleFilter === 'ALL' || u.role === userRoleFilter;
                      const matchStatus = userStatusFilter === 'ALL' || u.status === userStatusFilter;
                      return matchSearch && matchRole && matchStatus;
                    })
                    .map(u => {
                      const isPopoverOpen = openProjectPopoverUserId === u.id;
                      let assignedLabel = "No Projects";
                      if (u.assignedProjects.length === projectsList.length) {
                        assignedLabel = "All Company Projects";
                      } else if (u.assignedProjects.length === 1) {
                        const pr = projectsList.find(p => p.id === u.assignedProjects[0]);
                        assignedLabel = pr ? (isAr ? pr.nameAr : pr.name) : "1 Project";
                      } else if (u.assignedProjects.length > 1) {
                        assignedLabel = `${u.assignedProjects.length} Projects`;
                      }

                      return (
                        <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full ${u.avatarBg || 'bg-[#E85312] text-white'} font-bold flex items-center justify-center text-xs shrink-0`}>
                                {u.avatarInitials}
                              </div>
                              <div>
                                <div className="font-bold text-slate-900 text-sm">{u.name}</div>
                                <div className="text-[11px] text-slate-400 font-mono">{u.email}</div>
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#E85312]"></span>
                              <span>{u.role}</span>
                            </span>
                          </td>

                          {/* ASSIGNED PROJECTS POPOVER */}
                          <td className="px-4 py-4 relative">
                            {u.isSelf ? (
                              <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs inline-block">
                                All Company Projects
                              </span>
                            ) : (
                              <>
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
                                          setUsersList(prev => prev.map(user => user.id === u.id ? { ...user, assignedProjects: projectsList.map(p => p.id) } : user));
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
                              </>
                            )}
                          </td>

                          <td className="px-4 py-4">
                            {u.status === 'Active' ? (
                              <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-xs">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Active</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-amber-700 font-bold text-xs bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                                <Clock className="w-3.5 h-3.5 text-amber-600" />
                                <span>Pending</span>
                              </span>
                            )}
                          </td>

                          <td className="px-4 py-4 font-mono text-slate-500 text-xs">
                            {u.joinedDate || "Feb 2026"}
                          </td>

                          <td className="px-4 py-4 text-right rtl:text-left">
                            <button
                              onClick={() => {
                                setNewUserName(u.name);
                                setNewUserEmail(u.email);
                                setNewUserRole(u.role);
                                setShowAddUserModal(true);
                              }}
                              className="text-xs text-[#E85312] font-bold hover:underline cursor-pointer"
                            >
                              Edit Role
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

            {/* Empty State Guide (Screen 2) */}
            {usersViewMode === 'initial' && (
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
                      ? "أنت العضو الوحيد في مساحة العمل حالياً. دعوة زملائك تمنح منصة إرم قوتها الحقيقية: توزيع الصلاحيات المناسبة لكل دور لضمان حوكمة التوريد والاستهلاك."
                      : "You're the only member of your workspace. Inviting your teammates gives IRAM real power: create roles that match your team: supervisor, site, procurement, and warehouse."}
                  </p>
                </div>

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
                    onClick={() => setShowAddUserModal(true)}
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

      {/* ============================================================== */}
      {/* 4. SCREEN: PROJECTS OVERVIEW (Figma Cards Grid)                 */}
      {/* ============================================================== */}
      {activeTab === 'projects-mgmt' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Top Header matching Figma Screen */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  {isAr ? "نظرة عامة على المشاريع (Projects Overview)" : "Projects Overview"}
                </h2>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#FEECE5] text-[#E85312] font-bold border border-orange-200">
                  Layout preview - placeholder data
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {isAr ? "عرض ومتابعة مشاريع شركتك في مكان واحد موحد." : "View and monitor your company's projects in one place."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* State Toggle: Populated vs Empty (Frame 4) */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
                <button
                  onClick={() => setProjectsOverviewState('populated')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    projectsOverviewState === 'populated' ? 'bg-[#E85312] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isAr ? `المشاريع الحالية (${projectsList.length})` : `Projects (${projectsList.length})`}
                </button>
                <button
                  onClick={() => setProjectsOverviewState('empty')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    projectsOverviewState === 'empty' ? 'bg-[#E85312] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isAr ? "الحالة الفارغة (Figma Frame 4)" : "Empty State (Frame 4)"}
                </button>
              </div>

              {projectsOverviewState === 'populated' && (
                <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
                  <button
                    onClick={() => setProjectDisplayMode('cards')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      projectDisplayMode === 'cards' ? 'bg-[#E85312] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {isAr ? "بطاقات (Grid)" : "Cards"}
                  </button>
                  <button
                    onClick={() => setProjectDisplayMode('table')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      projectDisplayMode === 'table' ? 'bg-[#E85312] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {isAr ? "جدول" : "Table"}
                  </button>
                </div>
              )}

              <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l border-slate-200">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                  EG
                </div>
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block leading-tight">Eman Gabr</span>
                  <span className="text-[10px] text-slate-400">Company Admin</span>
                </div>
              </div>
            </div>
          </div>

          {/* FIGMA FRAME 4: EMPTY STATE (No projects yet) */}
          {projectsOverviewState === 'empty' ? (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-10 sm:p-14 text-center max-w-3xl mx-auto space-y-6">
                {/* Crane and Blueprint Graphic */}
                <div className="w-24 h-24 mx-auto rounded-3xl bg-linear-to-tr from-[#FFF7ED] to-[#FEECE5] border border-orange-200/70 flex items-center justify-center text-[#E85312] shadow-inner relative group">
                  <div className="absolute inset-0 bg-[#E85312]/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
                  <svg className="w-12 h-12 relative z-10" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="38" width="36" height="4" rx="2" fill="#E85312" />
                    <path d="M14 38V12L24 6V38" stroke="#E85312" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M24 10H42L36 18H24" fill="#FEECE5" stroke="#E85312" strokeWidth="2.5" strokeLinejoin="round" />
                    <path d="M38 18V28M36 28H40M38 28V32" stroke="#E85312" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="38" cy="34" r="2" fill="#E85312" />
                    <line x1="14" y1="20" x2="24" y2="28" stroke="#E85312" strokeWidth="2" strokeDasharray="2 2" />
                    <line x1="14" y1="28" x2="24" y2="20" stroke="#E85312" strokeWidth="2" strokeDasharray="2 2" />
                  </svg>
                </div>

                <div className="space-y-2 max-w-lg mx-auto">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    {isAr ? "لا توجد مشاريع مضافة بعد" : "No projects yet"}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {isAr
                      ? "المشاريع التي ينشئها مديرو المشاريع ستظهر هنا. ادعُ مدير مشروع للبدء أو افتح إدارة المستخدمين."
                      : "Projects created by your Project Managers will appear here. Invite one to get started or create an initial project below."}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setNewUserRole('Project Manager');
                      setShowAddUserModal(true);
                    }}
                    className="px-5 py-2.5 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>{isAr ? "+ دعوة مدير مشروع" : "+ Invite Project Manager"}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('users-team')}
                    className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold shadow-xs transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Users className="w-4 h-4 text-slate-500" />
                    <span>{isAr ? "فتح إدارة المستخدمين" : "Open User Management"}</span>
                  </button>
                </div>
              </div>

              {/* 3 Feature Cards (Figma Frame 4 bottom) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#E85312] flex items-center justify-center font-bold">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <h4 className="font-black text-slate-900 text-sm">
                    {isAr ? "حالة المشاريع (Project status)" : "Project status"}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {isAr 
                      ? "تتبع مباشر لمعدلات استهلاك جدول الكميات (BOQ)، نسب الإنجاز، والتنبيه المبكر بالعجز." 
                      : "Track active sites, BOQ consumption velocity, and milestones in one unified view."}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Users className="w-4 h-4" />
                  </div>
                  <h4 className="font-black text-slate-900 text-sm">
                    {isAr ? "إسناد المهندسين (Assign engineers)" : "Assign engineers"}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {isAr 
                      ? "تخصيص مديري المشاريع ومهندسي الموقع مع صلاحيات تحكم دقيقة لكل موقع على حدة." 
                      : "Allocate project managers, site engineers, and storekeepers with granular RBAC permissions."}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <ArrowRightLeft className="w-4 h-4" />
                  </div>
                  <h4 className="font-black text-slate-900 text-sm">
                    {isAr ? "رؤية شاملة للشركة (Company-wide view)" : "Company-wide view"}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {isAr 
                      ? "شفافية مركزية للأرصدة بين كافة المشاريع واقتراحات تلقائية لنقل الفائض قبل الشراء." 
                      : "Real-time cross-site material transparency and automated surplus reallocation recommendations."}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>

          {/* URGENT SHORTAGE ALERT BANNER (Matching Figma Screen 1) */}
          <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <span className="font-black text-amber-950 block">
                  {isAr 
                    ? "مشروع واحد يواجه نقصاً حرجاً في المواد يتطلب تدخلاً عاجلاً من المشتريات: ساحة القاهرة اللوجستية المركزية."
                    : "1 project has urgent material shortages that need procurement attention: Central Cairo Logistics Yard."}
                </span>
                <span className="text-[11px] text-amber-800">
                  {isAr ? "حديد تسليح 16 مم متبقي لأقل من 5.7 أيام عمل." : "Steel Rebar 16mm burn rate indicates < 5.7 days inventory remaining."}
                </span>
              </div>
            </div>
            <button
              onClick={() => onSelectProject('PRJ-001')}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-all cursor-pointer shrink-0 self-start sm:self-auto"
            >
              {isAr ? "فحص النقص بالموقع ←" : "View Shortage →"}
            </button>
          </div>

          {/* 4 KPI Cards + Circular Donut Chart matching Screen 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* 4 Cards Grid on left (span 2) */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold text-slate-500">
                    {isAr ? "إجمالي المشاريع" : "Total Projects"}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center">
                    <FolderOpen className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-3xl font-black text-slate-900">{projectsList.length}</div>
                  <span className="text-xs text-emerald-600 font-bold mt-0.5 block">
                    {isAr ? "+2 هذا الشهر" : "+2 from last month"}
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold text-slate-500">
                    {isAr ? "المشاريع الجارية" : "Active Projects"}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Zap className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-3xl font-black text-slate-900">
                    {projectsList.filter(p => p.status === 'Active').length}
                  </div>
                  <span className="text-xs text-slate-400 mt-0.5 block">
                    67% of total
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold text-slate-500">
                    {isAr ? "المشاريع المكتملة" : "Completed Projects"}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-3xl font-black text-slate-900">
                    {projectsList.filter(p => p.status === 'Completed').length}
                  </div>
                  <span className="text-xs text-slate-400 mt-0.5 block">
                    25% of total
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold text-slate-500">
                    {isAr ? "المشاريع المعلقة" : "On Hold"}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <PauseCircle className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-3xl font-black text-slate-900">
                    {projectsList.filter(p => p.status === 'On Hold').length}
                  </div>
                  <span className="text-xs text-slate-400 mt-0.5 block">
                    8% of total
                  </span>
                </div>
              </div>
            </div>

            {/* Circular Donut Chart Card on right (span 1) matching Screen 1 */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
                <span className="text-xs font-black text-slate-900">
                  {isAr ? "توزيع حالات المشاريع" : "Project status breakdown"}
                </span>
                <span className="text-[10px] text-slate-400 font-bold">12 Total</span>
              </div>

              <div className="flex items-center justify-center py-2 relative">
                <div className="w-32 h-32 relative flex items-center justify-center">
                  <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#E2E8F0" strokeWidth="12" />
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#10B981" strokeWidth="12" strokeDasharray="160 239" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#3B82F6" strokeWidth="12" strokeDasharray="60 239" strokeDashoffset="-160" />
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#F59E0B" strokeWidth="12" strokeDasharray="19 239" strokeDashoffset="-220" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-black text-slate-900">12</span>
                    <span className="text-[9px] text-slate-400 uppercase font-bold">Projects</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center text-[10px]">
                <div className="p-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mb-0.5"></span>
                  <div className="font-bold text-slate-900">Active (8)</div>
                  <span className="text-slate-400">67%</span>
                </div>
                <div className="p-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mb-0.5"></span>
                  <div className="font-bold text-slate-900">Done (3)</div>
                  <span className="text-slate-400">25%</span>
                </div>
                <div className="p-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mb-0.5"></span>
                  <div className="font-bold text-slate-900">Hold (1)</div>
                  <span className="text-slate-400">8%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Toolbar matching Screen 1 */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex-1 max-w-md relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isAr ? "بحث باسم المشروع، الكود، أو الموقع..." : "Search by project name, code, or location"}
                className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#E85312] transition-all font-medium"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <select
                value={projectStatusFilter}
                onChange={(e) => setProjectStatusFilter(e.target.value)}
                className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold cursor-pointer"
              >
                <option value="ALL">{isAr ? "جميع الحالات (All Statuses)" : "All Statuses"}</option>
                <option value="Active">Active (8)</option>
                <option value="On Hold">On Hold (1)</option>
                <option value="Completed">Completed (3)</option>
              </select>

              <select
                value={selectedPMFilter}
                onChange={(e) => setSelectedPMFilter(e.target.value)}
                className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold cursor-pointer"
              >
                <option value="ALL">{isAr ? "جميع مديري المشاريع" : "All Project Managers"}</option>
                <option value="Ahmed Sabri">Eng. Ahmed Sabri</option>
                <option value="Sara Adel">Eng. Sara Adel</option>
                <option value="Tamer Khaled">Eng. Tamer Khaled</option>
                <option value="Mostafa Salem">Eng. Mostafa Salem</option>
                <option value="Eman El-Sayed">Eng. Eman El-Sayed</option>
              </select>

              <button
                onClick={() => setShowAddProjectModal(true)}
                className="px-4 py-2 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isAr ? "+ مشروع جديد" : "+ New Project"}</span>
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          {projectDisplayMode === 'cards' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.map(proj => (
                <div 
                  key={proj.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-[#E85312] hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      proj.status === 'Active' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : proj.status === 'On Hold'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        proj.status === 'Active' ? 'bg-emerald-500' : proj.status === 'On Hold' ? 'bg-amber-500' : 'bg-blue-500'
                      }`}></span>
                      <span>{proj.status}</span>
                    </span>
                    {proj.hasUrgentShortage && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-black bg-rose-50 text-rose-700 border border-rose-200 animate-pulse">
                        Urgent Shortage
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#E85312] transition-colors">
                      {proj.name}
                      <span className="block text-[11px] text-slate-500 font-normal mt-0.5">
                        {isAr ? proj.nameAr : proj.code}
                      </span>
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{proj.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 pt-1">
                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-bold flex items-center justify-center text-xs shrink-0">
                      PM
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block leading-none">Project Manager</span>
                      <span className="text-xs font-bold text-slate-800 mt-0.5 block">{proj.manager}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <div className="relative w-full bg-slate-100 rounded-full h-1.5">
                      <div 
                        className="bg-[#E85312] h-1.5 rounded-full relative" 
                        style={{ width: `${proj.progress}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#E85312] ring-2 ring-white shadow-xs"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium pt-0.5">
                      <div>
                        <span className="block font-bold text-slate-400 uppercase tracking-wider text-[9px]">START DATE</span>
                        <span className="text-slate-600 font-semibold">{proj.startDate}</span>
                      </div>
                      <div className="text-right">
                        <span className="block font-bold text-slate-400 uppercase tracking-wider text-[9px]">TARGET END DATE</span>
                        <span className="text-slate-600 font-semibold">{proj.targetEndDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => onSelectProject(proj.id)}
                      className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-[#E85312] hover:bg-orange-50/20 text-slate-800 hover:text-[#E85312] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                    >
                      <span>{isAr ? "عرض التفاصيل" : "View Details"}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* FIGMA SCREEN 1: PROJECTS OVERVIEW DATA TABLE */
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left rtl:text-right text-xs">
                  <thead className="bg-slate-50 text-slate-400 font-black border-b border-slate-200 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="px-5 py-3.5">PROJECT NAME</th>
                      <th className="px-4 py-3.5">PROJECT CODE</th>
                      <th className="px-4 py-3.5">PROJECT MANAGER</th>
                      <th className="px-4 py-3.5">LOCATION</th>
                      <th className="px-4 py-3.5">START DATE</th>
                      <th className="px-4 py-3.5">TARGET END DATE</th>
                      <th className="px-4 py-3.5">STATUS</th>
                      <th className="px-4 py-3.5 text-right rtl:text-left">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                    {filteredProjects
                      .slice((projectsListPage - 1) * 5, projectsListPage * 5)
                      .map(proj => (
                      <tr key={proj.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-xs sm:text-sm">
                              {proj.name}
                            </span>
                            {proj.hasUrgentShortage && (
                              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" title="Urgent Material Shortage"></span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 block sm:hidden">{proj.code}</span>
                        </td>
                        <td className="px-4 py-4 font-mono font-bold text-slate-700 text-xs">{proj.code}</td>
                        <td className="px-4 py-4 font-bold text-slate-900 text-xs">{proj.manager}</td>
                        <td className="px-4 py-4 text-slate-600 text-xs">{proj.location}</td>
                        <td className="px-4 py-4 font-mono text-slate-600 text-xs">{proj.startDate}</td>
                        <td className="px-4 py-4 font-mono text-slate-600 text-xs">{proj.targetEndDate}</td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold ${
                            proj.status === 'Active' 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                              : proj.status === 'On Hold'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              proj.status === 'Active' ? 'bg-emerald-500' : proj.status === 'On Hold' ? 'bg-amber-500' : 'bg-blue-500'
                            }`}></span>
                            <span>{proj.status}</span>
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right rtl:text-left">
                          <button 
                            onClick={() => onSelectProject(proj.id)}
                            className="text-xs font-bold text-[#E85312] hover:text-[#CC490F] hover:underline inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>{isAr ? "عرض التفاصيل ←" : "View Details →"}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Bar (Matching Screen 1: Showing 1-5 of 12 projects) */}
              <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <span className="text-slate-500 font-medium">
                  {isAr 
                    ? `عرض ${(projectsListPage - 1) * 5 + 1}-${Math.min(projectsListPage * 5, filteredProjects.length)} من إجمالي ${filteredProjects.length} مشاريع`
                    : `Showing ${(projectsListPage - 1) * 5 + 1}-${Math.min(projectsListPage * 5, filteredProjects.length)} of ${filteredProjects.length} projects`}
                </span>
                
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map(page => (
                    <button
                      key={page}
                      onClick={() => setProjectsListPage(page)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        projectsListPage === page 
                          ? 'bg-[#E85312] text-white shadow-xs' 
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setProjectsListPage(p => Math.min(p + 1, 3))}
                    disabled={projectsListPage === 3}
                    className="px-2.5 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold disabled:opacity-40 cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
          </>
        )}

        </div>
      )}

      {/* ============================================================== */}
      {/* 5. SCREEN: WAREHOUSES & REGIONAL YARDS (Figma Screens 2, 3, 4) */}
      {/* ============================================================== */}
      {activeTab === 'warehouses' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  {selectedWarehouse 
                    ? selectedWarehouse.name 
                    : (isAr ? "المستودعات والساحات (Warehouses)" : "Warehouses")}
                </h2>
                {selectedWarehouse ? (
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                    {selectedWarehouse.status}
                  </span>
                ) : (
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-orange-50 text-[#E85312] font-bold border border-orange-200">
                    {warehousesList.length} Facilities
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {selectedWarehouse
                  ? `${selectedWarehouse.code} • ${selectedWarehouse.type} • ${selectedWarehouse.location}`
                  : (isAr 
                    ? "إدارة المستودعات المركزية لشركتك والمرافق الإقليمية وساحات التشوين بالمواقع."
                    : "Manage your company's central warehouses, regional facilities, and site yards.")}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {selectedWarehouse ? (
                <>
                  <button
                    type="button"
                    onClick={() => setSelectedWarehouse(null)}
                    className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    {isAr ? "← العودة لكافة المستودعات" : "← Back to Warehouses"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setToastMessage(isAr ? "جاري تصدير جرد المستودع بصيغة Excel / PDF..." : "Exporting warehouse inventory report...");
                      setTimeout(() => setToastMessage(null), 3500);
                    }}
                    className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    <span>{isAr ? "تحميل سجل الجرد" : "Download Inventory"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setToastMessage(isAr ? "تم فتح إذن إضافة رصيد للمستودع!" : "Inventory receiving entry initialized!");
                      setTimeout(() => setToastMessage(null), 3500);
                    }}
                    className="px-4 py-2 bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isAr ? "+ إضافة رصيد" : "+ Add Inventory"}</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setWarehousesViewMode('populated')}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        warehousesViewMode === 'populated' ? 'bg-[#E85312] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {isAr ? "المستودعات (Screen 3)" : "Populated (Screen 3)"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setWarehousesViewMode('empty')}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        warehousesViewMode === 'empty' ? 'bg-[#E85312] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {isAr ? "فارغة (Screen 2)" : "Empty State (Screen 2)"}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAddWarehouseModal(true)}
                    className="px-4 py-2.5 bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isAr ? "+ إضافة مستودع" : "+ Add Warehouse"}</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* VIEW MODE 1: DETAILS (Screen 4: Warehouse Details - Main Warehouse MCW-01) */}
          {selectedWarehouse ? (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Breadcrumb path */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <button 
                  onClick={() => setSelectedWarehouse(null)} 
                  className="hover:text-[#E85312] font-bold cursor-pointer"
                >
                  {isAr ? "المستودعات" : "Warehouses"}
                </button>
                <span>/</span>
                <span className="text-slate-900 font-bold">{selectedWarehouse.name}</span>
              </div>

              {/* Warehouse Information Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900">
                    {isAr ? "بيانات المستودع والمرفق (Warehouse Information)" : "Warehouse Information"}
                  </h3>
                  <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {selectedWarehouse.code}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">FACILITY TYPE</span>
                    <span className="font-black text-slate-900">{selectedWarehouse.type}</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">STORAGE CAPACITY</span>
                    <span className="font-black text-slate-900">{selectedWarehouse.capacity}</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">TOTAL ITEMS TRACKED</span>
                    <span className="font-black text-[#E85312]">{selectedWarehouse.totalItems} Items</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">FACILITY MANAGER</span>
                    <span className="font-black text-slate-900">{selectedWarehouse.manager}</span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5 text-xs">
                  <MapPin className="w-4 h-4 text-[#E85312] shrink-0" />
                  <div>
                    <span className="text-slate-500 font-medium">{isAr ? "الموقع الجغرافي المعتمد: " : "Physical Location: "}</span>
                    <span className="font-bold text-slate-900">{selectedWarehouse.location}</span>
                  </div>
                </div>
              </div>

              {/* Two Column Section: Assigned Employees & Recent Inventory Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Left Card: Assigned Employees */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
                  <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-slate-900 text-sm">
                        {isAr ? "الموظفون المسندون (Assigned Employees)" : `Assigned Employees (${selectedWarehouse.assignedEmployees.length})`}
                      </h4>
                      <p className="text-[11px] text-slate-400">Team members with on-site inventory custody permissions</p>
                    </div>
                    <button 
                      onClick={() => setShowAddUserModal(true)}
                      className="text-xs font-bold text-[#E85312] hover:underline cursor-pointer"
                    >
                      + Assign
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100 text-xs">
                    {selectedWarehouse.assignedEmployees.map((emp, i) => (
                      <div key={i} className="py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs">
                            {emp.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block leading-tight">{emp.name}</span>
                            <span className="text-[11px] text-slate-400">{emp.role}</span>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          <span>{emp.status}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Card: Recent Inventory Activity */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
                  <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-slate-900 text-sm">
                        {isAr ? "النشاط المخزني الأخير (Recent Activity)" : "Recent Inventory Activity"}
                      </h4>
                      <p className="text-[11px] text-slate-400">Real-time receipts, site transfers, and audit logs</p>
                    </div>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      Live Feed
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    {selectedWarehouse.recentActivity.map((act, i) => (
                      <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                        <div className="w-6 h-6 rounded-lg bg-[#FEECE5] text-[#E85312] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          ✓
                        </div>
                        <div className="flex-1">
                          <span className="font-bold text-slate-800 block leading-snug">{act.text}</span>
                          <span className="text-[10px] text-slate-400 font-mono mt-1 block">{act.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          ) : warehousesViewMode === 'empty' ? (
            /* VIEW MODE 2: FIGMA SCREEN 2: NO WAREHOUSES YET */
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-12 sm:p-16 text-center max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
              {/* Warehouse Building Outline Illustration */}
              <div className="w-24 h-24 mx-auto rounded-3xl bg-orange-50 border border-orange-200/80 flex items-center justify-center text-[#E85312] shadow-inner relative">
                <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 18L24 6L42 18V42H6V18Z" stroke="#E85312" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M18 42V26H30V42" stroke="#E85312" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="24" y1="26" x2="24" y2="42" stroke="#E85312" strokeWidth="2" strokeDasharray="2 2" />
                  <line x1="6" y1="18" x2="42" y2="18" stroke="#E85312" strokeWidth="2" />
                </svg>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  {isAr ? "لا توجد مستودعات مضافة بعد" : "No Warehouses Yet"}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
                  {isAr
                    ? "أضف مستودعك المركزي أو الإقليمي الأول لبدء تتبع وإدارة أرصدة المواد عبر كافة المواقع الإنشائية."
                    : "Add your first central or regional warehouse to start tracking inventory across locations."}
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddWarehouseModal(true)}
                  className="px-6 py-3 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAr ? "+ إضافة مستودع الآن" : "+ Add Warehouse"}</span>
                </button>
              </div>
            </div>
          ) : (
            /* VIEW MODE 3: FIGMA SCREEN 3: POPULATED WAREHOUSES TABLE */
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* 3 Top KPI Cards matching Screen 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">TOTAL WAREHOUSES</span>
                    <span className="text-3xl font-black text-slate-900 mt-1 block font-mono">04</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold">
                    <FolderOpen className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">ACTIVE</span>
                    <span className="text-3xl font-black text-slate-900 mt-1 block font-mono">03</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">INACTIVE</span>
                    <span className="text-3xl font-black text-slate-900 mt-1 block font-mono">01</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center font-bold">
                    <PauseCircle className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Table of 4 Warehouses matching Screen 3 */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h3 className="font-black text-slate-900 text-sm">
                    {isAr ? "كافة ساحات ومستودعات الشركة" : "All Warehouses & Yards"}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-bold">{warehousesList.length} Facilities</span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left rtl:text-right text-xs">
                    <thead className="bg-slate-50 text-slate-400 font-black border-b border-slate-200 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="px-5 py-3.5">WAREHOUSE NAME</th>
                        <th className="px-4 py-3.5">CODE</th>
                        <th className="px-4 py-3.5">LOCATION</th>
                        <th className="px-4 py-3.5">TYPE</th>
                        <th className="px-4 py-3.5">ASSOCIATED PROJECTS</th>
                        <th className="px-4 py-3.5">ASSIGNED MANAGER</th>
                        <th className="px-4 py-3.5">STATUS</th>
                        <th className="px-4 py-3.5 text-right rtl:text-left">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {warehousesList.map(wh => (
                        <tr key={wh.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-lg bg-orange-50 text-[#E85312] flex items-center justify-center shrink-0">
                                <Building2 className="w-3.5 h-3.5" />
                              </div>
                              <span className="font-bold text-slate-900 text-xs sm:text-sm">{wh.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 font-mono font-bold text-slate-700 text-xs">{wh.code}</td>
                          <td className="px-4 py-4 text-slate-600 text-xs">{wh.location}</td>
                          <td className="px-4 py-4">
                            <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700">
                              {wh.type}
                            </span>
                          </td>
                          <td className="px-4 py-4 font-bold text-slate-800 text-xs">{wh.associatedProjects}</td>
                          <td className="px-4 py-4 font-bold text-slate-900 text-xs">{wh.manager}</td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold ${
                              wh.status === 'Active'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${wh.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                              <span>{wh.status}</span>
                            </span>
                          </td>
                          <td className="px-4 py-4 text-right rtl:text-left">
                            <button
                              onClick={() => setSelectedWarehouse(wh)}
                              className="text-xs font-bold text-[#E85312] hover:text-[#CC490F] hover:underline inline-flex items-center gap-1 cursor-pointer"
                            >
                              <span>{isAr ? "عرض التفاصيل ←" : "View Details →"}</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Showing 1-4 of 4 warehouses</span>
                  <span className="font-mono font-bold text-slate-700">Page 1 of 1</span>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* ============================================================== */}
      {/* 6. SCREEN: MATERIALS CATALOG (Figma Screen 5)                   */}
      {/* ============================================================== */}
      {activeTab === 'materials-catalog' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  {isAr ? "كتالوج المواد المعتمدة (Materials Catalog)" : "Materials Catalog"}
                </h2>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  Standardized BOQ Library
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {isAr
                  ? "مكتبة المواصفات القياسية للمواد الإنشائية المعتمدة لتوحيد جداول الكميات عبر كافة المشاريع."
                  : "Standardized construction materials specification library across all company projects."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowCreateMaterialModal(true)}
              className="px-4 py-2.5 bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{isAr ? "+ تسجيل مادة جديدة" : "+ Create Material"}</span>
            </button>
          </div>

          {/* Top KPI Card matching Screen 5 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">TOTAL MASTER ITEMS</span>
                <span className="text-3xl font-black text-slate-900 mt-1 block font-mono">48</span>
                <span className="text-xs text-slate-400 mt-0.5 block">Standardized specs across BOQs</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#E85312] flex items-center justify-center font-bold">
                <Layers className="w-6 h-6" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">ACTIVE CATEGORIES</span>
                <span className="text-3xl font-black text-slate-900 mt-1 block font-mono">06</span>
                <span className="text-xs text-slate-400 mt-0.5 block">Steel, Concrete, Timber, MEP</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <FolderOpen className="w-6 h-6" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">AUTO-SURPLUS ENABLED</span>
                <span className="text-3xl font-black text-emerald-600 mt-1 block font-mono">100%</span>
                <span className="text-xs text-slate-400 mt-0.5 block">Cross-site transfer ready</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <ArrowRightLeft className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Filter Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex-1 max-w-md relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3.5" />
              <input
                type="text"
                value={catalogSearchTerm}
                onChange={(e) => setCatalogSearchTerm(e.target.value)}
                placeholder={isAr ? "بحث عن مادة، كود SKU، أو مواصفة..." : "Search material name, SKU, or specs..."}
                className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#E85312] transition-all font-medium"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <select
                value={catalogCategoryFilter}
                onChange={(e) => setCatalogCategoryFilter(e.target.value)}
                className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold cursor-pointer"
              >
                <option value="ALL">{isAr ? "جميع الفئات (All Categories)" : "All Categories"}</option>
                <option value="Steel & Metals">Steel & Metals</option>
                <option value="Cement & Aggregates">Cement & Aggregates</option>
                <option value="Ready Mix Concrete">Ready Mix Concrete</option>
                <option value="Wood & Formwork">Wood & Formwork</option>
                <option value="Masonry & Blocks">Masonry & Blocks</option>
                <option value="Plumbing & Drainage">Plumbing & Drainage</option>
              </select>
            </div>
          </div>

          {/* Grid of Standard Materials Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {catalogItemsList
              .filter(item => {
                if (catalogCategoryFilter !== 'ALL' && item.category !== catalogCategoryFilter) return false;
                if (catalogSearchTerm) {
                  const t = catalogSearchTerm.toLowerCase();
                  return item.name.toLowerCase().includes(t) || item.sku.toLowerCase().includes(t) || item.specs.toLowerCase().includes(t);
                }
                return true;
              })
              .map(item => (
                <div key={item.id} className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-[#E85312] hover:shadow-md transition-all flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {item.category}
                    </span>
                    <span className="font-mono font-bold text-xs text-slate-500">{item.sku}</span>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900 text-sm">{item.name}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{item.specs}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">STANDARD COST</span>
                      <span className="font-mono font-black text-slate-900">{item.standardCost}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      UOM: {item.uom}
                    </span>
                  </div>

                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setToastMessage(isAr ? `تم إدراج ${item.name} في بنود جدول الكميات!` : `Material "${item.name}" added to project BOQ template!`);
                        setTimeout(() => setToastMessage(null), 3500);
                      }}
                      className="w-full py-2 bg-slate-50 hover:bg-orange-50 hover:text-[#E85312] text-slate-700 rounded-xl font-bold text-xs border border-slate-200 transition-colors cursor-pointer"
                    >
                      {isAr ? "إدراج في الـ BOQ" : "Add to Project BOQ"}
                    </button>
                  </div>
                </div>
              ))}
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* 5. SCREEN 7: REPORTS & ANALYTICS (Matching Figma Screen 7)     */}
      {/* ============================================================== */}
      {activeTab === 'analytics' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {isAr ? "التقارير والتحليلات المالية (Reports & Analytics)" : "Reports & Analytics"}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {isAr ? "متابعة الإنفاق المالي وتوفير المناقلات الداخلية ونسب وفورات المشتريات." : "Monitor company-wide material spend, surplus reallocation, and financial savings."}
              </p>
            </div>

            <button
              onClick={() => {
                setToastMessage(isAr ? "تم تصدير تقرير التحليلات المالية بنجاح!" : "Executive analytics report exported!");
                setTimeout(() => setToastMessage(null), 3500);
              }}
              className="px-4 py-2 bg-[#E85312] hover:bg-[#CC490F] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Export Report</span>
            </button>
          </div>

          {/* 4 Financial KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">TOTAL MATERIAL SPEND</span>
              <div className="text-2xl font-black text-slate-900 mt-2 font-mono">$28,400,000</div>
              <span className="text-[11px] text-slate-400 mt-1 block">Active across 21 projects</span>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-white to-emerald-50/50 border border-emerald-200 shadow-xs">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">COST SAVED VIA REALLOCATION</span>
              <div className="text-2xl font-black text-emerald-600 mt-2 font-mono">$184,500</div>
              <span className="text-[11px] text-emerald-600 font-bold mt-1 block">+12.4% vs last quarter</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">INTERNAL TRANSFERS</span>
              <div className="text-2xl font-black text-[#E85312] mt-2 font-mono">28</div>
              <span className="text-[11px] text-slate-400 mt-1 block">Completed zero-waste dispatches</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">AVG PROCUREMENT SAVINGS</span>
              <div className="text-2xl font-black text-blue-600 mt-2 font-mono">14.8%</div>
              <span className="text-[11px] text-slate-400 mt-1 block">Via AI supplier quotation bidding</span>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Bar Chart (2 cols) */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">SPEND VS SAVINGS (BY PROJECT)</h3>
                  <p className="text-xs text-slate-400">External procurement vs capital saved by internal transfers ($ in thousands)</p>
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={spendVsSavingsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="project" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="externalSpend" name="Spend ($K)" fill="#0F172A" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="internalSaved" name="Saved via Match ($K)" fill="#E85312" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Donut Chart (1 col) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900">SPEND BY MATERIAL CATEGORY</h3>
                <p className="text-xs text-slate-400">Company-wide procurement allocation</p>
                <div className="h-44 w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={categoryData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
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

        </div>
      )}

      {/* ============================================================== */}
      {/* 6. SCREEN 8: AUDIT LOG (Matching Figma Screen 8)               */}
      {/* ============================================================== */}
      {activeTab === 'audit-log' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  {isAr ? "سجل التدقيق والحوكمة (Audit Log)" : "Audit Log"}
                </h2>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
                  Immutable Blockchain-Style Hash
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {isAr ? "سجل تدقيق زمني غير قابل للتعديل لكافة العمليات المالية ونقل المواد وإصدار أوامر التوريد." : "Real-time immutable audit trail for compliance, material transactions, and governance."}
              </p>
            </div>

            <button
              onClick={() => {
                setToastMessage(isAr ? "تم تصدير سجل التدقيق (CSV / PDF) بنجاح!" : "Audit log exported to CSV / PDF successfully!");
                setTimeout(() => setToastMessage(null), 3500);
              }}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{isAr ? "تصدير السجل" : "Export Log"}</span>
            </button>
          </div>

          {/* 3 Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">TOTAL AUDITED EVENTS</span>
              <div className="text-3xl font-black text-slate-900 mt-2 font-mono">1,248</div>
              <span className="text-[11px] text-slate-400 mt-1 block">Cryptographically signed events</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">MATERIAL TRANSFERS</span>
              <div className="text-3xl font-black text-emerald-600 mt-2 font-mono">84</div>
              <span className="text-[11px] text-emerald-600/80 mt-1 block">Avoided surplus waste</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">AI PROCUREMENT AWARDS</span>
              <div className="text-3xl font-black text-[#E85312] mt-2 font-mono">152</div>
              <span className="text-[11px] text-[#E85312]/80 mt-1 block">Automated quotation scoring</span>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex-1 max-w-md relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3.5" />
              <input
                type="text"
                value={auditSearchTerm}
                onChange={(e) => setAuditSearchTerm(e.target.value)}
                placeholder={isAr ? "بحث في الأحداث بالاسم أو الإجراء..." : "Search events by actor, action, or details..."}
                className="w-full pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#E85312] transition-all"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={auditCategoryFilter}
                onChange={(e) => setAuditCategoryFilter(e.target.value)}
                className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold"
              >
                <option value="ALL">All Event Types</option>
                <option value="Surplus">Surplus Reallocations</option>
                <option value="PO">Purchase Orders</option>
                <option value="Delivery">Site Deliveries</option>
              </select>

              <div className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Last 30 Days</span>
              </div>
            </div>
          </div>

          {/* Audit Trail Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs">
                <thead className="bg-slate-50 text-slate-400 font-black border-b border-slate-200 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-5 py-3.5">TIMESTAMP & ID</th>
                    <th className="px-4 py-3.5">ACTOR & ROLE</th>
                    <th className="px-4 py-3.5">ACTION</th>
                    <th className="px-4 py-3.5">PROJECT</th>
                    <th className="px-4 py-3.5">DETAILS & FINANCIAL IMPACT</th>
                    <th className="px-4 py-3.5 text-right rtl:text-left">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  {auditLogsList
                    .filter(log => {
                      if (!auditSearchTerm) return true;
                      const term = auditSearchTerm.toLowerCase();
                      return log.actor.toLowerCase().includes(term) ||
                             log.action.toLowerCase().includes(term) ||
                             log.details.toLowerCase().includes(term) ||
                             log.project.toLowerCase().includes(term);
                    })
                    .map(log => (
                      <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-5 py-4">
                          <div className="font-bold text-slate-900 font-mono">{log.timestamp}</div>
                          <span className="text-[10px] text-slate-400 font-mono">{log.id}</span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="font-bold text-slate-900">{log.actor}</div>
                          <span className="text-[10px] text-slate-400">{log.role}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                            {log.action}
                          </span>
                        </td>
                        <td className="px-4 py-4 font-bold text-slate-800">{log.project}</td>
                        <td className="px-4 py-4 text-xs text-slate-600 max-w-sm">{log.details}</td>
                        <td className="px-4 py-4 text-right rtl:text-left">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Verified</span>
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
      {/* 6. FIGMA FRAME 8: COMPANY SETTINGS                             */}
      {/* ============================================================== */}
      {activeTab === 'settings' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  {isAr ? "إعدادات الشركة (Company Settings)" : "Company Settings"}
                </h2>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  {companySettings.crStatus}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {isAr 
                  ? "إدارة الهوية القانونية، التوطين واللغة، وتنبيهات حوكمة الاستهلاك ونقل الفائض."
                  : "Manage legal identity, enterprise localization, notification rules, and system governance."}
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setToastMessage(isAr ? "تم التراجع عن التغييرات." : "Changes discarded.");
                  setTimeout(() => setToastMessage(null), 3000);
                }}
                className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
              >
                {isAr ? "تراجع (Discard)" : "Discard"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setToastMessage(isAr ? "تم حفظ إعدادات الشركة وتفضيلات النظام بنجاح!" : "Company settings saved successfully!");
                  setTimeout(() => setToastMessage(null), 3500);
                }}
                className="px-5 py-2.5 bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
              >
                {isAr ? "حفظ التغييرات" : "Save Changes"}
              </button>
            </div>
          </div>

          {/* Section 1: General Information */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                {isAr ? "المعلومات العامة (General Information)" : "General Information"}
              </h3>
              <p className="text-xs text-slate-400">
                {isAr ? "الهوية التجارية وبيانات التسجيل الضريبي والاتصال المعتمدة" : "Legal entity name, commercial records, and primary contact"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {isAr ? "الاسم القانوني للشركة (Legal Company Name)" : "Legal Company Name"}
                </label>
                <input
                  type="text"
                  value={companySettings.legalName}
                  onChange={(e) => setCompanySettings({...companySettings, legalName: e.target.value})}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:border-[#E85312] transition-colors"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {isAr ? "الاسم التجاري للعرض (Public Display Name)" : "Public Display Name"}
                </label>
                <input
                  type="text"
                  value={companySettings.displayName}
                  onChange={(e) => setCompanySettings({...companySettings, displayName: e.target.value})}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:border-[#E85312] transition-colors"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {isAr ? "رقم السجل التجاري (Commercial Registration - CR)" : "Commercial Registration (CR)"}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={companySettings.crNumber}
                    onChange={(e) => setCompanySettings({...companySettings, crNumber: e.target.value})}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold focus:bg-white focus:border-[#E85312] transition-colors"
                  />
                  <span className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Active
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {isAr ? "الرقم الضريبي (Tax Identification - TIN)" : "Tax Identification Number (TIN)"}
                </label>
                <input
                  type="text"
                  value={companySettings.taxId}
                  onChange={(e) => setCompanySettings({...companySettings, taxId: e.target.value})}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold focus:bg-white focus:border-[#E85312] transition-colors"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {isAr ? "قطاع العمل الرئيسي (Primary Industry)" : "Primary Industry"}
                </label>
                <input
                  type="text"
                  value={companySettings.industry}
                  onChange={(e) => setCompanySettings({...companySettings, industry: e.target.value})}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:border-[#E85312] transition-colors"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {isAr ? "البريد الإلكتروني للإدارة (Primary Email)" : "Primary Email"}
                </label>
                <input
                  type="email"
                  value={companySettings.primaryEmail}
                  onChange={(e) => setCompanySettings({...companySettings, primaryEmail: e.target.value})}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold focus:bg-white focus:border-[#E85312] transition-colors"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold text-slate-700 mb-1.5">
                  {isAr ? "عنوان المقر الرئيسي (Headquarters Address)" : "Headquarters Address"}
                </label>
                <input
                  type="text"
                  value={companySettings.address}
                  onChange={(e) => setCompanySettings({...companySettings, address: e.target.value})}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:bg-white focus:border-[#E85312] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Preferences & Localization */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                {isAr ? "التفضيلات والتوطين (Preferences & Localization)" : "Preferences & Localization"}
              </h3>
              <p className="text-xs text-slate-400">
                {isAr ? "إعدادات اللغة، المنطقة الزمنية، العملة وصيغ التواريخ" : "Regional settings, default operating currency, and date formats"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {isAr ? "اللغة الافتراضية" : "Default Language"}
                </label>
                <select
                  value={companySettings.defaultLanguage}
                  onChange={(e) => setCompanySettings({...companySettings, defaultLanguage: e.target.value})}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:border-[#E85312]"
                >
                  <option>English (US) / Arabic (العربية)</option>
                  <option>Arabic (العربية) - الأساسية</option>
                  <option>English (US) Only</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {isAr ? "المنطقة الزمنية" : "Timezone"}
                </label>
                <select
                  value={companySettings.timezone}
                  onChange={(e) => setCompanySettings({...companySettings, timezone: e.target.value})}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:border-[#E85312]"
                >
                  <option>Cairo, Egypt (UTC+02:00)</option>
                  <option>Riyadh, Saudi Arabia (UTC+03:00)</option>
                  <option>Dubai, UAE (UTC+04:00)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {isAr ? "العملة الأساسية" : "Primary Currency"}
                </label>
                <select
                  value={companySettings.currency}
                  onChange={(e) => setCompanySettings({...companySettings, currency: e.target.value})}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:border-[#E85312]"
                >
                  <option>EGP - Egyptian Pound (LE)</option>
                  <option>USD - United States Dollar ($)</option>
                  <option>SAR - Saudi Riyal (SAR)</option>
                  <option>AED - UAE Dirham (AED)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {isAr ? "صيغة التاريخ" : "Date Format"}
                </label>
                <select
                  value={companySettings.dateFormat}
                  onChange={(e) => setCompanySettings({...companySettings, dateFormat: e.target.value})}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:border-[#E85312]"
                >
                  <option>DD/MM/YYYY (e.g. 21/01/2026)</option>
                  <option>YYYY-MM-DD (ISO)</option>
                  <option>MM/DD/YYYY (US)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {isAr ? "بداية السنة المالية" : "Fiscal Year Start"}
                </label>
                <select
                  value={companySettings.fiscalYearStart}
                  onChange={(e) => setCompanySettings({...companySettings, fiscalYearStart: e.target.value})}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:border-[#E85312]"
                >
                  <option>January 1st</option>
                  <option>July 1st</option>
                  <option>April 1st</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Notification Settings with interactive toggles */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                {isAr ? "إعدادات الإشعارات والتنبيهات (Notification Settings)" : "Notification Settings"}
              </h3>
              <p className="text-xs text-slate-400">
                {isAr ? "قواعد الإرسال الآلي لتنبيهات العجز ومناقلات الفائض والملخص التنفيذي" : "Automated email and SMS triggers for site material events"}
              </p>
            </div>

            <div className="space-y-4">
              {/* Toggle 1: Project Shortage Alerts */}
              <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="font-black text-slate-900 text-xs sm:text-sm">
                    {isAr ? "تنبيهات نقص المواد بالمشاريع (Project Shortage Alerts)" : "Project Shortage Alerts"}
                  </div>
                  <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                    {isAr 
                      ? "إرسال تنبيهات SMS وبريد إلكتروني فوري عندما يصل مخزون المواد إلى حد الاستهلاك الحرج (أقل من 7 أيام)."
                      : "Real-time SMS and email alerts when material supply reaches critical burn threshold (< 7 days)"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCompanySettings({...companySettings, notifyShortage: !companySettings.notifyShortage})}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                    companySettings.notifyShortage ? 'bg-[#E85312]' : 'bg-slate-300'
                  }`}
                >
                  <span className={`block w-4 h-4 rounded-full bg-white shadow-xs transition-transform transform ${
                    companySettings.notifyShortage ? 'translate-x-7 rtl:-translate-x-7' : 'translate-x-1 rtl:-translate-x-1'
                  }`} />
                </button>
              </div>

              {/* Toggle 2: Surplus Reallocation Recommendations */}
              <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="font-black text-slate-900 text-xs sm:text-sm">
                    {isAr ? "توصيات إعادة تخصيص الفائض (Surplus Reallocation Recommendations)" : "Surplus Reallocation Recommendations"}
                  </div>
                  <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                    {isAr
                      ? "مقترحات معتمدة من الذكاء الاصطناعي لنقل المواد الفائضة بين مشاريع الشركة النشطة قبل إصدار أوامر شراء خارجية."
                      : "AI-powered suggestions to transfer excess materials between active company sites before issuing POs"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCompanySettings({...companySettings, notifySurplus: !companySettings.notifySurplus})}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                    companySettings.notifySurplus ? 'bg-[#E85312]' : 'bg-slate-300'
                  }`}
                >
                  <span className={`block w-4 h-4 rounded-full bg-white shadow-xs transition-transform transform ${
                    companySettings.notifySurplus ? 'translate-x-7 rtl:-translate-x-7' : 'translate-x-1 rtl:-translate-x-1'
                  }`} />
                </button>
              </div>

              {/* Toggle 3: Daily Executive Digest */}
              <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="font-black text-slate-900 text-xs sm:text-sm">
                    {isAr ? "الملخص التنفيذي اليومي (Daily Executive Digest)" : "Daily Executive Digest"}
                  </div>
                  <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                    {isAr
                      ? "تقرير صباحي يلخص كافة طلبات المواد بالمشاريع، المناقلات الجارية، وموافقات الشراء المعلقة."
                      : "Morning summary of all project requisitions, active transfers, and pending procurement approvals"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCompanySettings({...companySettings, notifyDigest: !companySettings.notifyDigest})}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                    companySettings.notifyDigest ? 'bg-[#E85312]' : 'bg-slate-300'
                  }`}
                >
                  <span className={`block w-4 h-4 rounded-full bg-white shadow-xs transition-transform transform ${
                    companySettings.notifyDigest ? 'translate-x-7 rtl:-translate-x-7' : 'translate-x-1 rtl:-translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* 7. FIGMA CANVAS MODAL 5: SELECT WAREHOUSE / STAGING YARD       */}
      {/* ============================================================== */}
      {showSelectYardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="p-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#E85312] flex items-center justify-center font-bold">
                  <FolderOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">
                    {isAr ? "اختيار ساحة التشوين / المخزن المعتمد" : "Select Warehouse / Staging Yard"}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {isAr ? "حدد موقع التشوين المركزي للمشروع" : "Select designated central yard for project inventory"}
                  </p>
                </div>
              </div>
              <button onClick={() => setShowSelectYardModal(false)} className="cursor-pointer text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3" />
                <input
                  type="text"
                  placeholder={isAr ? "بحث في ساحات ومستودعات الشركة..." : "Search Yard / Staging..."}
                  className="w-full pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                {stagingYardsList.map(yard => (
                  <label
                    key={yard.id}
                    onClick={() => setSelectedStagingYardId(yard.id)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      selectedStagingYardId === yard.id 
                        ? 'border-[#E85312] bg-orange-50/30 shadow-xs' 
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="selected_yard"
                        checked={selectedStagingYardId === yard.id}
                        onChange={() => setSelectedStagingYardId(yard.id)}
                        className="text-[#E85312] focus:ring-[#E85312]"
                      />
                      <div>
                        <div className="font-bold text-slate-900">{yard.name}</div>
                        <div className="text-[11px] text-slate-500">{yard.location}</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {yard.itemsCount} Items
                    </span>
                  </label>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowSelectYardModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  {isAr ? "إلغاء" : "Cancel"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowSelectYardModal(false);
                    setToastMessage(isAr ? "تم تحديد ساحة التشوين بنجاح!" : "Warehouse / Staging yard selected successfully!");
                    setTimeout(() => setToastMessage(null), 3500);
                  }}
                  className="px-5 py-2 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  {isAr ? "تأكيد اختيار الساحة" : "Select Yard / Staging"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 8. FIGMA CANVAS MODAL 6: CREATE COMPANY MASTER MATERIAL        */}
      {/* ============================================================== */}
      {showCreateMaterialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="p-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#E85312] flex items-center justify-center font-bold">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">
                    {isAr ? "إضافة مادة معتمدة لكتالوج الشركة" : "Create Company Material"}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {isAr ? "تسجيل صنف موحد في جدول الكميات (BOQ)" : "Register a standardized master material item for digital BOQ catalog"}
                  </p>
                </div>
              </div>
              <button onClick={() => setShowCreateMaterialModal(false)} className="cursor-pointer text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              setShowCreateMaterialModal(false);
              setToastMessage(isAr ? `تمت إضافة "${masterMatName}" إلى كتالوج المواد المعتمدة!` : `Material "${masterMatName}" registered to company catalog!`);
              setTimeout(() => setToastMessage(null), 4000);
            }} className="p-6 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {isAr ? "اسم المادة" : "Material Name"} *
                </label>
                <input
                  type="text"
                  required
                  value={masterMatName}
                  onChange={(e) => setMasterMatName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">{isAr ? "التصنيف" : "Category"}</label>
                  <select
                    value={masterMatCategory}
                    onChange={(e) => setMasterMatCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  >
                    <option>Steel & Metals</option>
                    <option>Cement & Ready-Mix</option>
                    <option>Aggregates & Sand</option>
                    <option>Finishing & Tiles</option>
                    <option>MEP & Electrical</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">{isAr ? "وحدة القياس (UOM)" : "Unit of Measure"}</label>
                  <select
                    value={masterMatUOM}
                    onChange={(e) => setMasterMatUOM(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  >
                    <option>Ton</option>
                    <option>m³ (Cubic Meter)</option>
                    <option>Bag (50kg)</option>
                    <option>Linear Meter</option>
                    <option>Pcs / Units</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">{isAr ? "كود الصنف الموحد (SKU)" : "Standard SKU / Code"}</label>
                  <input
                    type="text"
                    value={masterMatSKU}
                    onChange={(e) => setMasterMatSKU(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">{isAr ? "سعر الوحدة التقديري ($ / EGP)" : "Standard Unit Cost"}</label>
                  <input
                    type="text"
                    value={masterMatCost}
                    onChange={(e) => setMasterMatCost(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {isAr ? "المواصفات الفنية ومعايير الجودة" : "Technical Specifications & Quality Standards"}
                </label>
                <textarea
                  rows={2}
                  value={masterMatSpecs}
                  onChange={(e) => setMasterMatSpecs(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={masterMatAutoSurplus}
                  onChange={(e) => setMasterMatAutoSurplus(e.target.checked)}
                  className="text-[#E85312] focus:ring-[#E85312] rounded cursor-pointer"
                />
                <span className="text-[11px] font-bold text-slate-700">
                  {isAr ? "تفعيل الفحص الذكي التلقائي للفائض والمناقلة بين المواقع" : "Auto-detect surplus and enable instant site-to-site reallocation"}
                </span>
              </label>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateMaterialModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  {isAr ? "إلغاء" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  {isAr ? "حفظ المادة بالكتالوج" : "Save Material"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE NEW ENTERPRISE PROJECT WIZARD MODAL */}
      {showAddProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FFFDF9] rounded-2xl shadow-2xl border border-[#EAE5DE] w-full max-w-3xl max-h-[92vh] overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-white border-b border-[#EAE5DE] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FEECE5] text-[#E85312] flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-[#26231F] text-base sm:text-lg">
                    {isAr ? "إضافة مشروع إنشائي جديد وتفعيل تتبع المواد" : "Create Construction Project & Enable Material Tracking"}
                  </h3>
                  <p className="text-xs text-[#6E6862]">
                    {isAr 
                      ? "تهيئة منظومة إدارة المواد، جدول الكميات (BOQ)، وتعيين الصلاحيات والمخزن المسند."
                      : "Initializes digital BOQ, assigns site team roles, and links staging yard inventory."}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setShowAddProjectModal(false);
                  setProjWizardStep(1);
                }}
                className="w-8 h-8 rounded-full bg-[#F7F5F1] hover:bg-[#EAE5DE] flex items-center justify-center text-[#6E6862] hover:text-[#26231F] transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Stepper Tabs */}
            <div className="px-6 py-3 bg-[#F7F5F1] border-b border-[#EAE5DE] flex items-center justify-between text-xs font-bold text-[#6E6862] overflow-x-auto">
              {[
                { step: 1, labelAr: "1. بيانات المشروع", labelEn: "1. Core Details" },
                { step: 2, labelAr: "2. الميزانية والجدول", labelEn: "2. Budget & Timeline" },
                { step: 3, labelAr: "3. المهندسين والمخزن", labelEn: "3. Team & Staging" },
                { step: 4, labelAr: "4. حوكمة الهدر والفائض", labelEn: "4. Surplus Governance" },
              ].map(s => (
                <div 
                  key={s.step}
                  onClick={() => setProjWizardStep(s.step)}
                  className={`flex items-center gap-2 cursor-pointer pb-1 border-b-2 transition-all ${
                    projWizardStep === s.step 
                      ? 'border-[#E85312] text-[#E85312]' 
                      : projWizardStep > s.step 
                        ? 'border-emerald-500 text-emerald-700'
                        : 'border-transparent hover:text-[#26231F]'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    projWizardStep === s.step 
                      ? 'bg-[#E85312] text-white' 
                      : projWizardStep > s.step 
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white border border-[#CBD5E1]'
                  }`}>
                    {projWizardStep > s.step ? "✓" : s.step}
                  </span>
                  <span>{isAr ? s.labelAr : s.labelEn}</span>
                </div>
              ))}
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleCreateProject} className="p-6 overflow-y-auto space-y-5 text-xs flex-1">
              
              {/* STEP 1: GENERAL INFO */}
              {projWizardStep === 1 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div>
                    <label className="block font-bold text-[#26231F] mb-1.5">
                      {isAr ? "اسم المشروع الإنشائي" : "Project Name"} *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={newProjName}
                      onChange={(e) => setNewProjName(e.target.value)}
                      placeholder="e.g. New Mansoura Towers - Sector B"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#EAE5DE] rounded-xl text-[#26231F] font-bold focus:outline-hidden focus:border-[#E85312]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-[#26231F] mb-1.5">
                        {isAr ? "كود المشروع المالي (Project Code)" : "Project Code"} *
                      </label>
                      <input 
                        type="text" 
                        required
                        value={newProjCode}
                        onChange={(e) => setNewProjCode(e.target.value)}
                        placeholder="e.g. AMRC-2026"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#EAE5DE] rounded-xl text-[#26231F] font-mono font-bold focus:outline-hidden focus:border-[#E85312]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#26231F] mb-1.5">
                        {isAr ? "نوع المشروع" : "Project Type"}
                      </label>
                      <select 
                        value={newProjType}
                        onChange={(e) => setNewProjType(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#EAE5DE] rounded-xl text-[#26231F] focus:outline-hidden focus:border-[#E85312]"
                      >
                        <option>High-Rise Towers</option>
                        <option>Residential Compound</option>
                        <option>Commercial Center</option>
                        <option>Infrastructure & Roads</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#26231F] mb-1.5">
                      {isAr ? "الموقع الجغرافي / المدينة" : "Project Location"} *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={newProjLocation}
                      onChange={(e) => setNewProjLocation(e.target.value)}
                      placeholder="e.g. New Mansoura, Sector B4"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#EAE5DE] rounded-xl text-[#26231F] focus:outline-hidden focus:border-[#E85312]"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: BUDGET & SCHEDULE */}
              {projWizardStep === 2 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div>
                    <label className="block font-bold text-[#26231F] mb-1.5">
                      {isAr ? "إجمالي ميزانية المشروع التقديرية ($)" : "Total Project Budget ($)"} *
                    </label>
                    <input 
                      type="number" 
                      required
                      value={newProjBudget}
                      onChange={(e) => setNewProjBudget(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#EAE5DE] rounded-xl text-[#26231F] font-mono font-bold focus:outline-hidden focus:border-[#E85312]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-[#26231F] mb-1.5">
                        {isAr ? "مدير المشروع المسؤول" : "Project Manager"}
                      </label>
                      <select 
                        value={newProjManager}
                        onChange={(e) => setNewProjManager(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#EAE5DE] rounded-xl text-[#26231F] font-bold"
                      >
                        <option>Eng. Eman El-Sayed</option>
                        <option>Eng. Mostafa Salem</option>
                        <option>Eng. Sara Adel</option>
                        <option>Eng. Tamer Khaled</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-[#26231F] mb-1.5">
                        {isAr ? "ساحة التشوين الإقليمية" : "Staging Yard"}
                      </label>
                      <select 
                        value={newProjStagingYard}
                        onChange={(e) => setNewProjStagingYard(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#EAE5DE] rounded-xl text-[#26231F]"
                      >
                        {stagingYardsList.map(y => (
                          <option key={y.id} value={y.name}>{y.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 & 4 Controls */}
              <div className="pt-4 border-t border-[#EAE5DE] flex items-center justify-between">
                {projWizardStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setProjWizardStep(projWizardStep - 1)}
                    className="px-4 py-2 border border-[#CBD5E1] rounded-xl font-bold text-[#26231F] hover:bg-[#F7F5F1] transition-all cursor-pointer"
                  >
                    {isAr ? "السابق" : "Back"}
                  </button>
                ) : (
                  <div></div>
                )}

                {projWizardStep < 2 ? (
                  <button
                    type="button"
                    onClick={() => setProjWizardStep(projWizardStep + 1)}
                    className="px-5 py-2 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-xl font-bold shadow-xs transition-all cursor-pointer"
                  >
                    {isAr ? "التالي: الميزانية والفريق" : "Next: Budget & Team"}
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-xl font-bold shadow-xs transition-all cursor-pointer"
                  >
                    {isAr ? "اعتماد وإنشاء المشروع بالمنظومة 🚀" : "Create Project & Initialize BOQ 🚀"}
                  </button>
                )}
              </div>

            </form>

          </div>
        </div>
      )}

      {/* FIGMA FRAME 2: INVITE TEAM MEMBER MODAL */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="p-6 bg-white border-b border-slate-100 flex items-start justify-between">
              <div>
                <h3 className="font-black text-slate-900 text-base">
                  {isAr ? "دعوة عضو جديد (Invite Team Member)" : "Invite Team Member"}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {isAr 
                    ? "إرسال دعوة عبر البريد الإلكتروني للانضمام إلى مساحة عمل شركتك على إرم."
                    : "Send an email invitation to join your company workspace on IRAM."}
                </p>
              </div>
              <button onClick={() => setShowAddUserModal(false)} className="cursor-pointer text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={handleAddUser} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {isAr ? "الاسم الكامل (Full Name)" : "Full Name"} *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Mustafa Barkat"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:border-[#E85312] transition-colors"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {isAr ? "البريد الإلكتروني للعمل (Work Email)" : "Work Email"} *
                </label>
                <input 
                  type="email" 
                  required
                  placeholder="mustafa.barkat@albayan.example"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:bg-white focus:border-[#E85312] transition-colors"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {isAr ? "الدور الوظيفي (Role)" : "Role"} *
                </label>
                <select 
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:border-[#E85312]"
                >
                  <option value="Site Engineer">Site Engineer (مهندس موقع)</option>
                  <option value="Project Manager">Project Manager (مدير مشروع)</option>
                  <option value="Procurement Officer">Procurement Officer (مسؤول مشتريات)</option>
                  <option value="Warehouse Officer">Warehouse Officer (أمين مخزن)</option>
                  <option value="Company Admin">Company Admin (مسؤول نظام الشركة)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {isAr ? "المشروع المسند (Assigned Project)" : "Assigned Project"} *
                </label>
                <select 
                  value={newUserAssignedProject}
                  onChange={(e) => setNewUserAssignedProject(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:border-[#E85312]"
                >
                  <option value="PRJ-LOG">Central Cairo Logistics Warehouse</option>
                  {projectsList.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                  {isAr
                    ? "اختر المشروع الأساسي. يمكن منح صلاحيات إضافية لاحقاً من إعدادات المشروع."
                    : "Choose the primary project. Additional access can be granted in project settings."}
                </p>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2.5 border border-slate-300 rounded-xl text-slate-700 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  {isAr ? "إلغاء" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-xl font-bold shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isAr ? "إرسال الدعوة" : "Send Invitation"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FIGMA FRAME 3: INVITATION ACCEPTANCE SCREEN MODAL */}
      {showInviteAcceptanceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden my-8">
            
            {/* Top Brand Bar */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#E85312] text-white font-black text-xs flex items-center justify-center">
                  I
                </div>
                <span className="text-[10px] tracking-wider uppercase font-black text-slate-600">
                  IRAM RESOURCE SYSTEMS
                </span>
              </div>
              <button 
                onClick={() => setShowInviteAcceptanceModal(false)} 
                className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 text-xs font-bold transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Header Title & Subtitle */}
              <div className="text-center space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {isAr 
                    ? `تمت دعوتك للانضمام إلى ${companySettings.displayName}`
                    : `You're invited to join ${companySettings.displayName}`}
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  {isAr
                    ? "قام أحمد صبري (مسؤول الشركة) بدعوتك للتعاون في منصة إرم لإدارة دورة حياة المواد الإنشائية."
                    : "Ahmed Sabri (Company Admin) has invited you to collaborate on the IRAM materials intelligence platform."}
                </p>
              </div>

              {/* Assignment Summary Card (3 Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-center">
                <div className="p-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    ROLE ASSIGNED
                  </span>
                  <span className="text-xs font-black text-[#E85312] block">
                    {inviteeData.role}
                  </span>
                </div>

                <div className="p-2 sm:border-x sm:border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    ASSIGNED PROJECT
                  </span>
                  <span className="text-xs font-black text-slate-800 block truncate" title={inviteeData.project}>
                    {inviteeData.project}
                  </span>
                </div>

                <div className="p-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    INVITATION EXPIRES
                  </span>
                  <span className="text-xs font-black text-slate-600 block">
                    {inviteeData.expires}
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={(e) => {
                e.preventDefault();
                setShowInviteAcceptanceModal(false);
                setToastMessage(isAr 
                  ? `مرحباً بك في مساحة عمل ${companySettings.displayName}! تم تفعيل حسابك كـ ${inviteeData.role}.`
                  : `Welcome to ${companySettings.displayName} workspace! Account activated.`);
                setTimeout(() => setToastMessage(null), 4500);
              }} className="space-y-4 text-xs">
                
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    {isAr ? "الاسم بالكامل" : "Full name"}
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue={inviteeData.name}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:border-[#E85312]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    {isAr ? "كلمة المرور" : "Password"}
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    defaultValue="SecurePass2026!"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:border-[#E85312]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    {isAr ? "تأكيد كلمة المرور" : "Confirm password"}
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    defaultValue="SecurePass2026!"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:border-[#E85312]"
                  />
                </div>

                <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    required
                    className="mt-0.5 text-[#E85312] focus:ring-[#E85312] rounded cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-600 leading-tight">
                    {isAr
                      ? "أوافق على شروط خدمة وسياسة خصوصية منصة إرم (IRAM Terms & Privacy)."
                      : "I agree to the IRAM Terms of Service and Privacy Policy"}
                  </span>
                </label>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{isAr ? "قبول الدعوة والانضمام لمساحة العمل" : "Accept & Join Workspace"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-center pt-2">
                  <span className="text-[11px] text-slate-400">
                    {isAr ? "لديك حساب بالفعل؟ " : "Already have an account? "}
                    <button 
                      type="button" 
                      onClick={() => setShowInviteAcceptanceModal(false)}
                      className="text-[#E85312] font-bold hover:underline cursor-pointer"
                    >
                      {isAr ? "تسجيل الدخول" : "Sign In"}
                    </button>
                  </span>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}

      {/* FIGMA MODAL: ADD WAREHOUSE */}
      {showAddWarehouseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="p-6 bg-white border-b border-slate-100 flex items-start justify-between">
              <div>
                <h3 className="font-black text-slate-900 text-base">
                  {isAr ? "إضافة مستودع أو ساحة تشوين" : "Add Warehouse or Staging Yard"}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {isAr ? "تسجيل مرفق تخزيني جديد لربطه بالمشاريع وتتبع الأرصدة." : "Register a new storage facility to track materials across sites."}
                </p>
              </div>
              <button onClick={() => setShowAddWarehouseModal(false)} className="cursor-pointer text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const newWh = {
                id: `WH-00${warehousesList.length + 1}`,
                code: newWarehouseCode,
                name: newWarehouseName,
                nameAr: newWarehouseName,
                location: newWarehouseLocation,
                type: newWarehouseType,
                associatedProjects: "All Assigned Projects",
                manager: newWarehouseManager,
                status: "Active",
                capacity: "10,000 m²",
                totalItems: 0,
                assignedEmployees: [{ name: newWarehouseManager, role: "Warehouse Lead", status: "Active" }],
                recentActivity: [{ text: "Facility initialized on IRAM Platform", time: "Just now" }]
              };
              setWarehousesList([...warehousesList, newWh]);
              setShowAddWarehouseModal(false);
              setWarehousesViewMode('populated');
              setToastMessage(isAr ? `تمت إضافة ${newWarehouseName} بنجاح!` : `Warehouse "${newWarehouseName}" added successfully!`);
              setTimeout(() => setToastMessage(null), 4000);
            }} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">{isAr ? "اسم المستودع / المرفق" : "Warehouse Name"} *</label>
                <input
                  type="text"
                  required
                  value={newWarehouseName}
                  onChange={(e) => setNewWarehouseName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">{isAr ? "الكود المرجعي" : "Facility Code"} *</label>
                  <input
                    type="text"
                    required
                    value={newWarehouseCode}
                    onChange={(e) => setNewWarehouseCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">{isAr ? "نوع المرفق" : "Facility Type"}</label>
                  <select
                    value={newWarehouseType}
                    onChange={(e) => setNewWarehouseType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  >
                    <option>Central Warehouse</option>
                    <option>Regional Yard</option>
                    <option>Site Staging Facility</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">{isAr ? "الموقع الجغرافي" : "Physical Location"} *</label>
                <input
                  type="text"
                  required
                  value={newWarehouseLocation}
                  onChange={(e) => setNewWarehouseLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">{isAr ? "المسؤول عن المستودع" : "Warehouse Manager"}</label>
                <select
                  value={newWarehouseManager}
                  onChange={(e) => setNewWarehouseManager(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                >
                  <option>Tarek Mansour</option>
                  <option>Nadia Fathy</option>
                  <option>Ehab Samy</option>
                  <option>Mahmoud Eid</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddWarehouseModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  {isAr ? "إلغاء" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  {isAr ? "حفظ وإضافة المستودع" : "Save & Add Warehouse"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
