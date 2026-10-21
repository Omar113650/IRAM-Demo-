import React, { useState } from 'react';
import { 
  Warehouse, 
  PackageCheck, 
  AlertOctagon, 
  Plus, 
  FileSearch, 
  CheckCircle2, 
  Boxes,
  QrCode,
  ArrowRightLeft, 
  ArrowRight, 
  ArrowLeft, 
  Search, 
  Filter, 
  Check, 
  AlertTriangle, 
  Download, 
  Building2, 
  MapPin, 
  Layers, 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  ScanLine,
  Clock,
  Printer,
  Eye,
  X,
  ChevronDown,
  Calendar,
  DollarSign,
  Camera,
  User,
  CheckCircle,
  ExternalLink,
  FileText,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Lock,
  PauseCircle,
  Zap,
  Sliders
} from 'lucide-react';

export default function WarehouseView({ onOpenOCR, onOpenSurplusLog, onBack, language }) {
  const isAr = language === 'ar';
  const BackIcon = isAr ? ArrowRight : ArrowLeft;

  // Master Active Tab matching Figma screens in media_1792615527405_93725e73
  // 'dashboard' | 'inventory' | 'receiving' | 'dispatches' | 'requisitions'
  const [activeTab, setActiveTab] = useState('inventory');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [toastMessage, setToastMessage] = useState(null);

  // Selected Material for Drill-down Details View (Figma Screen 2)
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  // Modals state matching Figma top row
  const [showQRScanModal, setShowQRScanModal] = useState(false);
  const [showQuickIssueModal, setShowQuickIssueModal] = useState(false);
  const [showStockAdjustModal, setShowStockAdjustModal] = useState(false);
  const [showPrintQRModal, setShowPrintQRModal] = useState(false);
  const [showSurplusModal, setShowSurplusModal] = useState(false);
  const [showGatePassModal, setShowGatePassModal] = useState(false);

  // Active target item for modals
  const [modalTargetItem, setModalTargetItem] = useState(null);

  // Quick Issue Form State
  const [issueTargetProject, setIssueTargetProject] = useState('New Mansoura Towers - Sector B');
  const [issueRecipientEngineer, setIssueRecipientEngineer] = useState('Eng. Mohamed Fathy');
  const [issueQuantity, setIssueQuantity] = useState('5.0');
  const [issueGatePassNo, setIssueGatePassNo] = useState('GP-2026-0894');

  // Stock Adjustment Form State
  const [adjustType, setAdjustType] = useState('Recount / Audit Discrepancy');
  const [adjustQty, setAdjustQty] = useState('1.5');
  const [adjustDirection, setAdjustDirection] = useState('add'); // 'add' | 'subtract'
  const [adjustReason, setAdjustReason] = useState('Physical stock count reconciliation vs ERP ledger');
  const [adjustInspector, setAdjustInspector] = useState('Tarek Mansour (Warehouse Lead)');

  // Manual QR input fallback in QR Scanner
  const [manualQRInput, setManualQRInput] = useState('QR-STL-RB-16-092');

  // Warehouse Inventory Materials List (Matching 218 total items scale)
  const [materialsList, setMaterialsList] = useState([
    {
      id: "MAT-001",
      sku: "STL-RB-16",
      nameEn: "High Tensile Steel Rebar 16mm",
      nameAr: "حديد تسليح عالي المقاومة 16 مم",
      category: "Steel & Metals",
      categoryAr: "معادن وهياكل تسليح",
      onHand: 26.0,
      reserved: 10.0,
      available: 16.0,
      unit: isAr ? "طن" : "Tons",
      unitCost: "$780",
      location: "Zone B - Rack 04",
      status: "Low Stock",
      burnRateDays: "5.7 Days",
      isShortageRisk: true,
      lastAudit: "Oct 18, 2026",
      batches: [
        { heatNo: "HT-2026-9021", mill: "Elsewedy Steel", qty: "16.0 Tons", date: "Oct 10, 2026", qc: "Verified" },
        { heatNo: "HT-2026-8812", mill: "Ezz Steel", qty: "10.0 Tons", date: "Sep 28, 2026", qc: "Verified" }
      ],
      ledger: [
        { type: "Receipt (GRN)", qty: "+50.0 Tons", ref: "GRN-8819", actor: "Ahmed Zaki", date: "Today, 11:20 AM" },
        { type: "Material Issue", qty: "-20.0 Tons", ref: "GP-2026-0880", actor: "Eng. Mohamed Fathy", date: "Yesterday, 03:45 PM" },
        { type: "Audit Verified", qty: "Stock Ok", ref: "AUD-1240", actor: "Tarek Mansour", date: "Oct 18, 2026" }
      ]
    },
    {
      id: "MAT-002",
      sku: "CMT-PORT-42",
      nameEn: "Portland Cement 42.5N (Bags)",
      nameAr: "أسمنت بورتلاندي 42.5N فاخر",
      category: "Cement & Aggregates",
      categoryAr: "خرسانة ومونة",
      onHand: 350.0,
      reserved: 50.0,
      available: 300.0,
      unit: isAr ? "شيكارة" : "Bags",
      unitCost: "$8.50",
      location: "Shed A - Bay 02",
      status: "In Stock",
      burnRateDays: "18.2 Days",
      isShortageRisk: false,
      lastAudit: "Oct 19, 2026",
      batches: [
        { heatNo: "LOT-CEM-891", mill: "Suez Cement", qty: "350 Bags", date: "Oct 12, 2026", qc: "Verified" }
      ],
      ledger: [
        { type: "Receipt (GRN)", qty: "+400 Bags", ref: "GRN-8790", actor: "Ahmed Zaki", date: "Today, 09:15 AM" },
        { type: "Material Issue", qty: "-50 Bags", ref: "GP-2026-0875", actor: "Eng. Sameh", date: "Yesterday, 01:10 PM" }
      ]
    },
    {
      id: "MAT-003",
      sku: "STL-RB-12",
      nameEn: "High Tensile Steel Rebar 12mm",
      nameAr: "حديد تسليح عالي المقاومة 12 مم",
      category: "Steel & Metals",
      categoryAr: "معادن وهياكل تسليح",
      onHand: 4.5,
      reserved: 4.0,
      available: 0.5,
      unit: isAr ? "طن" : "Tons",
      unitCost: "$790",
      location: "Zone B - Rack 02",
      status: "Critical",
      burnRateDays: "1.2 Days",
      isShortageRisk: true,
      lastAudit: "Oct 20, 2026",
      batches: [
        { heatNo: "HT-2026-8801", mill: "Ezz Steel", qty: "4.5 Tons", date: "Sep 20, 2026", qc: "Verified" }
      ],
      ledger: [
        { type: "Issue Note", qty: "-12.0 Tons", ref: "GP-2026-0860", actor: "Eng. Mohamed Fathy", date: "Oct 19, 2026" }
      ]
    },
    {
      id: "MAT-004",
      sku: "PLY-MRN-18",
      nameEn: "Marine Grade Plywood 18mm",
      nameAr: "خشب بليوود بحري عازل 18 مم",
      category: "Wood & Formwork",
      categoryAr: "أخشاب وشدات",
      onHand: 180.0,
      reserved: 30.0,
      available: 150.0,
      unit: isAr ? "لوح" : "Sheets",
      unitCost: "$38",
      location: "Warehouse Shed C",
      status: "In Stock",
      burnRateDays: "24.0 Days",
      isShortageRisk: false,
      lastAudit: "Oct 15, 2026",
      batches: [
        { heatNo: "WD-2026-440", mill: "Al-Ahram Timber", qty: "180 Sheets", date: "Oct 05, 2026", qc: "Verified" }
      ],
      ledger: [
        { type: "Issue Note", qty: "-20 Sheets", ref: "GP-2026-0850", actor: "Eng. Mostafa", date: "Oct 18, 2026" }
      ]
    },
    {
      id: "MAT-005",
      sku: "PIP-PVC-110",
      nameEn: "UPVC Drainage Pipes Ø110mm",
      nameAr: "مواسير صرف UPVC قطر 110 مم فئة 4",
      category: "Plumbing & Drainage",
      categoryAr: "صرف وتغذية سباكة",
      onHand: 280.0,
      reserved: 0.0,
      available: 280.0,
      unit: isAr ? "متر طولي" : "Meters",
      unitCost: "$24",
      location: "Open Staging Yard 3",
      status: "In Stock",
      burnRateDays: "Surplus Pool",
      isSurplus: true,
      lastAudit: "Oct 17, 2026",
      batches: [
        { heatNo: "PVC-8902", mill: "Egypt Pipes Co.", qty: "280 Meters", date: "Sep 15, 2026", qc: "Verified" }
      ],
      ledger: [
        { type: "Surplus Declared", qty: "+280 Meters", ref: "SUR-004", actor: "Tarek Mansour", date: "Oct 17, 2026" }
      ]
    },
    {
      id: "MAT-006",
      sku: "BLK-AAC-20",
      nameEn: "AAC Lightweight Blocks 20x20x60cm",
      nameAr: "طوب خرساني خفيف معقم بالبخار AAC",
      category: "Masonry & Blocks",
      categoryAr: "بلوك وطوب",
      onHand: 85.0,
      reserved: 15.0,
      available: 70.0,
      unit: isAr ? "م³" : "m³",
      unitCost: "$65",
      location: "Zone A - Outdoor Pad",
      status: "In Stock",
      burnRateDays: "14.5 Days",
      isShortageRisk: false,
      lastAudit: "Oct 19, 2026",
      batches: [
        { heatNo: "AAC-LOT-11", mill: "ACC Blocks Egypt", qty: "85 m³", date: "Oct 08, 2026", qc: "Verified" }
      ],
      ledger: [
        { type: "Receipt (GRN)", qty: "+85 m³", ref: "GRN-8740", actor: "Ahmed Zaki", date: "Oct 15, 2026" }
      ]
    }
  ]);

  // Site Material Requests (Requisitions Screen in Row 3)
  const [requisitionsList, setRequisitionsList] = useState([
    { id: "REQ-094", project: "New Mansoura Towers", zone: "Sector B4", engineer: "Eng. Mohamed Fathy", material: "High Tensile Steel Rebar 16mm", qty: "10.0 Tons", date: "Today, 08:30 AM", status: "Approved", urgency: "High" },
    { id: "REQ-093", project: "New Capital Business Complex", zone: "Podium Floor", engineer: "Eng. Mostafa Salem", material: "Portland Cement 42.5N", qty: "120 Bags", date: "Today, 09:15 AM", status: "Approved", urgency: "Normal" },
    { id: "REQ-092", project: "Alexandria Waterfront Heights", zone: "Basement 2", engineer: "Eng. Sara Adel", material: "Marine Grade Plywood 18mm", qty: "40 Sheets", date: "Yesterday, 04:20 PM", status: "Pending", urgency: "Medium" },
    { id: "REQ-091", project: "Sadat Logistics Park", zone: "Warehouse 1", engineer: "Eng. Eman El-Sayed", material: "UPVC Pipes Ø110mm", qty: "90 Meters", date: "Yesterday, 02:10 PM", status: "Issued", urgency: "Normal" }
  ]);

  // Gate Passes & Dispatches List
  const [gatePassesList, setGatePassesList] = useState([
    { id: "GP-2026-0894", recipient: "New Mansoura Site", vehicle: "أ ب ج 1 9 4 2", driver: "Ibrahim Saad", items: "10T Steel Rebar 16mm", status: "Dispatched", time: "Today, 10:15 AM", qr: "GP-894-MNSR" },
    { id: "GP-2026-0893", recipient: "New Capital CBD", vehicle: "د هـ و 7 8 2 1", driver: "Mohamed Samir", items: "120 Bags Portland Cement", status: "Ready for Pickup", time: "Today, 09:40 AM", qr: "GP-893-CBD" },
    { id: "GP-2026-0892", recipient: "Alexandria Waterfront", vehicle: "س ص ع 3 3 1 0", driver: "Khaled Ali", items: "30T Steel Rebar 12mm", status: "Delivered", time: "Yesterday, 05:20 PM", qr: "GP-892-ALX" }
  ]);

  // Handle Quick Issue Form Submission
  const handleConfirmQuickIssue = (e) => {
    e.preventDefault();
    if (!modalTargetItem) return;

    const issueNum = parseFloat(issueQuantity) || 0;
    if (issueNum > modalTargetItem.available) {
      alert(isAr ? "الكمية المطلوبة تتجاوز الرصيد المتاح للصرف!" : "Requested quantity exceeds available stock!");
      return;
    }

    setMaterialsList(prev => prev.map(m => {
      if (m.id !== modalTargetItem.id) return m;
      const nextAvailable = Math.max(0, m.available - issueNum);
      const nextOnHand = Math.max(0, m.onHand - issueNum);
      const nextLedger = [
        { type: "Material Issue", qty: `-${issueNum} ${m.unit}`, ref: issueGatePassNo, actor: issueRecipientEngineer, date: "Just now" },
        ...m.ledger
      ];
      return { ...m, available: nextAvailable, onHand: nextOnHand, ledger: nextLedger };
    }));

    // Add new gate pass
    const newGP = {
      id: issueGatePassNo,
      recipient: issueTargetProject,
      vehicle: "س ر ق 4 5 1 2",
      driver: "Hassan Mahmoud",
      items: `${issueNum} ${modalTargetItem.unit} ${modalTargetItem.nameEn}`,
      status: "Dispatched",
      time: "Just now",
      qr: `GP-${Math.floor(Math.random()*900+100)}`
    };
    setGatePassesList([newGP, ...gatePassesList]);

    setShowQuickIssueModal(false);
    setToastMessage(isAr ? `تم صرف ${issueNum} ${modalTargetItem.unit} وإصدار إذن خروج ${issueGatePassNo} بنجاح!` : `Issued ${issueNum} ${modalTargetItem.unit}. Gate pass ${issueGatePassNo} generated!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Handle Stock Adjustment Submission
  const handleConfirmAdjustment = (e) => {
    e.preventDefault();
    if (!modalTargetItem) return;

    const delta = parseFloat(adjustQty) || 0;
    const isAdd = adjustDirection === 'add';

    setMaterialsList(prev => prev.map(m => {
      if (m.id !== modalTargetItem.id) return m;
      const nextOnHand = isAdd ? (m.onHand + delta) : Math.max(0, m.onHand - delta);
      const nextAvailable = isAdd ? (m.available + delta) : Math.max(0, m.available - delta);
      const nextLedger = [
        { type: `Adjustment (${adjustType})`, qty: `${isAdd ? '+' : '-'}${delta} ${m.unit}`, ref: `ADJ-${Math.floor(Math.random()*9000+1000)}`, actor: adjustInspector, date: "Just now" },
        ...m.ledger
      ];
      return { ...m, onHand: nextOnHand, available: nextAvailable, ledger: nextLedger };
    }));

    setShowStockAdjustModal(false);
    setToastMessage(isAr ? `تم تعديل وتدقيق رصيد ${modalTargetItem.nameAr} بنجاح!` : `Stock adjustment recorded for ${modalTargetItem.nameEn}!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Filtered materials
  const filteredMaterials = materialsList.filter(item => {
    if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;
    if (selectedStatusFilter !== 'ALL' && item.status !== selectedStatusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return item.nameEn.toLowerCase().includes(q) || 
             item.nameAr.toLowerCase().includes(q) || 
             item.sku.toLowerCase().includes(q) ||
             item.location.toLowerCase().includes(q);
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

      {/* Top Banner & Header matching Figma Canvas */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-3">
            {onBack && (
              <button 
                onClick={onBack}
                className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                title={isAr ? "رجوع" : "Back"}
              >
                <BackIcon className="w-4 h-4" />
              </button>
            )}
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  {selectedMaterial 
                    ? (isAr ? `تفاصيل المادة: ${selectedMaterial.nameAr}` : `Material Details: ${selectedMaterial.nameEn}`)
                    : (isAr ? "إدارة المستودع وساحة التشوين (Warehouse Portal)" : "Warehouse & Yard Management")}
                </h1>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-orange-50 text-[#E85312] font-bold border border-orange-200">
                  WMS Officer
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
                {isAr 
                  ? "متابعة المخزون الفعلي، أذون الصرف اللحظية، فحص كود الـ QR، وإدارة أذون خروج البوابات والمناقلات بين المواقع."
                  : "Track physical staging stock, execute quick material issues, scan QR barcodes, and issue security gate passes."}
              </p>
            </div>
          </div>
        </div>

        {/* Master Action Controls matching Figma top toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button 
            type="button"
            onClick={() => setShowQRScanModal(true)}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Camera className="w-4 h-4 text-[#E85312]" />
            <span>{isAr ? "مسح كود QR (Scanner)" : "Scan QR Code"}</span>
          </button>

          <button 
            type="button"
            onClick={() => {
              setModalTargetItem(materialsList[0]);
              setShowQuickIssueModal(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-[#E85312] hover:bg-[#CC490F] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{isAr ? "+ صرف مواد للموقع" : "+ Quick Issue"}</span>
          </button>

          <button 
            type="button"
            onClick={() => setShowSurplusModal(true)}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-[#E85312] text-slate-700 hover:text-[#E85312] text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{isAr ? "إعلان فائض" : "Declare Surplus"}</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs matching Figma Views in media_1792615527405_93725e73 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 gap-4">
        <div className="flex gap-5 text-xs sm:text-sm font-bold overflow-x-auto">
          <button
            onClick={() => { setActiveTab('overview'); setSelectedMaterial(null); }}
            className={`pb-3 transition-colors relative cursor-pointer whitespace-nowrap ${
              activeTab === 'overview' 
                ? 'text-[#E85312] border-b-2 border-[#E85312] font-black' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {isAr ? "نظرة عامة (Overview Dashboard)" : "Warehouse Dashboard"}
          </button>

          <button
            onClick={() => { setActiveTab('inventory'); setSelectedMaterial(null); }}
            className={`pb-3 transition-colors relative cursor-pointer whitespace-nowrap ${
              activeTab === 'inventory' 
                ? 'text-[#E85312] border-b-2 border-[#E85312] font-black' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {isAr ? `مخزون المواد (${materialsList.length})` : `Materials Inventory (${materialsList.length})`}
          </button>

          <button
            onClick={() => { setActiveTab('requisitions'); setSelectedMaterial(null); }}
            className={`pb-3 transition-colors relative cursor-pointer whitespace-nowrap ${
              activeTab === 'requisitions' 
                ? 'text-[#E85312] border-b-2 border-[#E85312] font-black' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {isAr ? `طلبات الموقع (${requisitionsList.length})` : `Site Requests (${requisitionsList.length})`}
          </button>

          <button
            onClick={() => { setActiveTab('dispatches'); setSelectedMaterial(null); }}
            className={`pb-3 transition-colors relative cursor-pointer whitespace-nowrap ${
              activeTab === 'dispatches' 
                ? 'text-[#E85312] border-b-2 border-[#E85312] font-black' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {isAr ? `أذون الصرف والبوابات (${gatePassesList.length})` : `Gate Passes (${gatePassesList.length})`}
          </button>

          <button
            onClick={() => { setActiveTab('receiving'); setSelectedMaterial(null); }}
            className={`pb-3 transition-colors relative cursor-pointer whitespace-nowrap ${
              activeTab === 'receiving' 
                ? 'text-[#E85312] border-b-2 border-[#E85312] font-black' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {isAr ? "استلام وفحص الشحنات (GRN)" : "Goods Receiving (GRN)"}
          </button>
        </div>

        {onOpenOCR && (
          <div className="pb-2.5">
            <button
              onClick={onOpenOCR}
              className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-[#E85312] hover:bg-orange-50/20 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ScanLine className="w-3.5 h-3.5 text-[#E85312]" />
              <span>{isAr ? "فحص بوليصة بالذكاء الاصطناعي (AI OCR)" : "AI Delivery OCR"}</span>
            </button>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* TAB 1: WAREHOUSE OVERVIEW DASHBOARD (Screen 6 in Row 3)        */}
      {/* ============================================================== */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* 4 Master KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">TOTAL MATERIALS</span>
                <span className="text-3xl font-black text-slate-900 mt-1 block font-mono">218</span>
                <span className="text-xs text-slate-400 mt-0.5 block">Cataloged items across yards</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#E85312] flex items-center justify-center font-bold">
                <Boxes className="w-6 h-6" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">IN STOCK</span>
                <span className="text-3xl font-black text-emerald-600 mt-1 block font-mono">164</span>
                <span className="text-xs text-slate-400 mt-0.5 block">Healthy operating buffers</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">SHORTAGE ALERTS</span>
                <span className="text-3xl font-black text-rose-600 mt-1 block font-mono">12</span>
                <span className="text-xs text-rose-600 font-bold mt-0.5 block">Immediate PO trigger required</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                <AlertOctagon className="w-6 h-6" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">PENDING GATE PASSES</span>
                <span className="text-3xl font-black text-blue-600 mt-1 block font-mono">08</span>
                <span className="text-xs text-slate-400 mt-0.5 block">Ready for security sign-off</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Truck className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Two Columns: Category Stock Distribution & Fast Moving Items */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Category Stock Distribution */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-black text-slate-900 text-sm">
                    {isAr ? "توزيع أرصدة المواد حسب الفئة" : "Stock Volume by Category"}
                  </h3>
                  <p className="text-[11px] text-slate-400">Total physical staging volume across central facility</p>
                </div>
                <span className="text-xs font-bold text-[#E85312]">100% Audited</span>
              </div>

              <div className="space-y-4 text-xs">
                {[
                  { cat: "Steel & Rebar", count: "48 Items", pct: 82, color: "bg-[#E85312]" },
                  { cat: "Cement & Aggregates", count: "34 Items", pct: 68, color: "bg-blue-600" },
                  { cat: "Plumbing & Infrastructure", count: "52 Items", pct: 90, color: "bg-emerald-600" },
                  { cat: "Wood & Formwork", count: "28 Items", pct: 45, color: "bg-amber-500" },
                  { cat: "Electrical & MEP", count: "56 Items", pct: 75, color: "bg-purple-600" }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-800">{item.cat}</span>
                      <span className="text-slate-500 font-mono">{item.count} ({item.pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Gate Passes Live Feed */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-black text-slate-900 text-sm">
                    {isAr ? "أذون الصرف وحركة الشاحنات الحية" : "Recent Gate Passes & Dispatches"}
                  </h3>
                  <p className="text-[11px] text-slate-400">Live outbound staging trucks with security QR signatures</p>
                </div>
                <button 
                  onClick={() => setActiveTab('dispatches')}
                  className="text-xs font-bold text-[#E85312] hover:underline cursor-pointer"
                >
                  View All →
                </button>
              </div>

              <div className="space-y-3 text-xs">
                {gatePassesList.map(gp => (
                  <div key={gp.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#E85312] flex items-center justify-center font-bold">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 flex items-center gap-2">
                          <span>{gp.id}</span>
                          <span className="text-[10px] text-slate-400 font-normal">({gp.vehicle})</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{gp.items} • {gp.recipient}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {gp.status}
                      </span>
                      <span className="block text-[10px] text-slate-400 font-mono mt-0.5">{gp.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: MATERIALS INVENTORY LIST (Figma Screen 1 & Screen 2)     */}
      {/* ============================================================== */}
      {activeTab === 'inventory' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* If Material Details View is Active (Figma Screen 2 in Middle Row) */}
          {selectedMaterial ? (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Back breadcrumb */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <button 
                    onClick={() => setSelectedMaterial(null)}
                    className="hover:text-[#E85312] font-bold cursor-pointer"
                  >
                    {isAr ? "مخزون المواد" : "Materials Inventory"}
                  </button>
                  <span>/</span>
                  <span className="text-slate-900 font-mono font-bold">{selectedMaterial.sku}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setModalTargetItem(selectedMaterial);
                      setShowPrintQRModal(true);
                    }}
                    className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <QrCode className="w-3.5 h-3.5 text-slate-600" />
                    <span>{isAr ? "طباعة ملصق QR" : "Print QR Label"}</span>
                  </button>
                  <button
                    onClick={() => {
                      setModalTargetItem(selectedMaterial);
                      setShowStockAdjustModal(true);
                    }}
                    className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Sliders className="w-3.5 h-3.5 text-slate-600" />
                    <span>{isAr ? "تسوية رصيد" : "Stock Adjustment"}</span>
                  </button>
                  <button
                    onClick={() => {
                      setModalTargetItem(selectedMaterial);
                      setShowQuickIssueModal(true);
                    }}
                    className="px-4 py-1.5 rounded-xl bg-[#E85312] hover:bg-[#CC490F] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isAr ? "صرف للموقع" : "Quick Issue"}</span>
                  </button>
                </div>
              </div>

              {/* Material Overview Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-black text-slate-900">
                        {isAr ? selectedMaterial.nameAr : selectedMaterial.nameEn}
                      </h2>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        selectedMaterial.status === 'Critical' 
                          ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                          : selectedMaterial.status === 'Low Stock'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {selectedMaterial.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 font-mono">
                      SKU: {selectedMaterial.sku} • {selectedMaterial.category} • Location: {selectedMaterial.location}
                    </p>
                  </div>

                  <div className="text-right rtl:text-left">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">STANDARD UNIT COST</span>
                    <span className="text-2xl font-black text-slate-900 font-mono">{selectedMaterial.unitCost}</span>
                    <span className="text-[11px] text-slate-400">per {selectedMaterial.unit}</span>
                  </div>
                </div>

                {/* 3 Metric Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">PHYSICAL ON HAND</span>
                    <span className="text-2xl font-black text-slate-900 font-mono">{selectedMaterial.onHand} {selectedMaterial.unit}</span>
                    <span className="text-[11px] text-slate-400 mt-1 block">Full verified inventory</span>
                  </div>

                  <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                    <span className="text-[10px] uppercase font-bold text-amber-600 block mb-1">RESERVED FOR POURS</span>
                    <span className="text-2xl font-black text-amber-800 font-mono">{selectedMaterial.reserved} {selectedMaterial.unit}</span>
                    <span className="text-[11px] text-amber-700 mt-1 block">Allocated to scheduled works</span>
                  </div>

                  <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                    <span className="text-[10px] uppercase font-bold text-emerald-600 block mb-1">AVAILABLE TO ISSUE</span>
                    <span className="text-2xl font-black text-emerald-700 font-mono">{selectedMaterial.available} {selectedMaterial.unit}</span>
                    <span className="text-[11px] text-emerald-700 mt-1 block">Ready for gate pass dispatch</span>
                  </div>
                </div>
              </div>

              {/* Two Columns: Batches & Heat Numbers + Movement Ledger */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Batches & Heat Numbers */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
                  <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-black text-slate-900 text-sm">
                        {isAr ? "أرقام الصب والشحنات المعتمدة (Heat / Mill Batches)" : "Heat Numbers & Mill Certificates"}
                      </h3>
                      <p className="text-[11px] text-slate-400">Quality-inspected mill batches with MTC traceability</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-500">{selectedMaterial.batches.length} Batches</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    {selectedMaterial.batches.map((b, i) => (
                      <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900 font-mono text-sm">{b.heatNo}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">Mill: {b.mill} • Date: {b.date}</div>
                        </div>
                        <div className="text-right">
                          <span className="font-black text-slate-900 font-mono">{b.qty}</span>
                          <span className="block mt-0.5 text-[10px] font-bold text-emerald-600">✓ {b.qc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Movement Ledger */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
                  <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-black text-slate-900 text-sm">
                        {isAr ? "سجل الحركات والأذون (Stock Ledger)" : "Transaction & Movement Ledger"}
                      </h3>
                      <p className="text-[11px] text-slate-400">Real-time receipts, issues, and audit adjustments</p>
                    </div>
                    <span className="text-xs font-bold text-[#E85312]">Immutable</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    {selectedMaterial.ledger.map((l, i) => (
                      <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900 flex items-center gap-2">
                            <span>{l.type}</span>
                            <span className="text-[10px] font-mono text-slate-400">({l.ref})</span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">By: {l.actor} • {l.date}</div>
                        </div>
                        <span className={`font-mono font-black text-sm ${l.qty.startsWith('+') ? 'text-emerald-600' : l.qty.startsWith('-') ? 'text-[#E85312]' : 'text-slate-800'}`}>
                          {l.qty}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          ) : (
            /* Main Inventory Table View (Figma Screen 1 in Row 1) */
            <div className="space-y-6">
              
              {/* 4 KPI Cards matching Figma Screen 1 Top */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">TOTAL ITEMS</span>
                    <span className="text-3xl font-black text-slate-900 mt-1 block font-mono">218</span>
                    <span className="text-xs text-slate-400 mt-0.5 block">Cataloged SKUs</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                    <Boxes className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">IN STOCK</span>
                    <span className="text-3xl font-black text-emerald-600 mt-1 block font-mono">165</span>
                    <span className="text-xs text-emerald-600 font-bold mt-0.5 block">Healthy operating level</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">LOW STOCK</span>
                    <span className="text-3xl font-black text-amber-600 mt-1 block font-mono">12</span>
                    <span className="text-xs text-amber-600 font-bold mt-0.5 block">Reorder threshold reached</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">CRITICAL</span>
                    <span className="text-3xl font-black text-rose-600 mt-1 block font-mono">04</span>
                    <span className="text-xs text-rose-600 font-bold mt-0.5 block">Immediate shortage risk</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                    <AlertOctagon className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Filter Toolbar & Category Tabs */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex-1 max-w-md relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3.5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={isAr ? "بحث باسم المادة، كود SKU، أو الموقع..." : "Search item name, SKU, or location..."}
                      className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#E85312] transition-all font-medium"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <select
                      value={selectedStatusFilter}
                      onChange={(e) => setSelectedStatusFilter(e.target.value)}
                      className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold cursor-pointer"
                    >
                      <option value="ALL">{isAr ? "جميع الحالات (All Statuses)" : "All Statuses"}</option>
                      <option value="In Stock">In Stock</option>
                      <option value="Low Stock">Low Stock</option>
                      <option value="Critical">Critical</option>
                    </select>

                    <button
                      onClick={() => setShowQRScanModal(true)}
                      className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Camera className="w-3.5 h-3.5 text-[#E85312]" />
                      <span>{isAr ? "مسح كود QR" : "Scan QR"}</span>
                    </button>
                  </div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex gap-2 overflow-x-auto pt-2 border-t border-slate-100 text-xs font-bold">
                  {[
                    { id: 'ALL', label: 'All Items' },
                    { id: 'Steel & Metals', label: 'Steel & Metals' },
                    { id: 'Cement & Aggregates', label: 'Cement & Concrete' },
                    { id: 'Wood & Formwork', label: 'Wood & Formwork' },
                    { id: 'Plumbing & Drainage', label: 'Plumbing' },
                    { id: 'Masonry & Blocks', label: 'Masonry' }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                        selectedCategory === cat.id 
                          ? 'bg-[#E85312] text-white shadow-xs' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inventory Table matching Figma Screen 1 */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left rtl:text-right text-xs">
                    <thead className="bg-slate-50 text-slate-400 font-black border-b border-slate-200 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="px-5 py-3.5">MATERIAL NAME</th>
                        <th className="px-4 py-3.5">SKU / CODE</th>
                        <th className="px-4 py-3.5">LOCATION / BIN</th>
                        <th className="px-4 py-3.5 text-center">ON HAND</th>
                        <th className="px-4 py-3.5 text-center">RESERVED</th>
                        <th className="px-4 py-3.5 text-center">AVAILABLE</th>
                        <th className="px-4 py-3.5">STATUS</th>
                        <th className="px-4 py-3.5 text-right rtl:text-left">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {filteredMaterials.map(item => (
                        <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="px-5 py-4">
                            <div className="font-bold text-slate-900 text-xs sm:text-sm">
                              {isAr ? item.nameAr : item.nameEn}
                            </div>
                            <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                              {item.category}
                            </span>
                          </td>
                          <td className="px-4 py-4 font-mono font-bold text-slate-700 text-xs">
                            {item.sku}
                          </td>
                          <td className="px-4 py-4 text-slate-600 text-xs flex items-center gap-1.5 pt-5">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>{item.location}</span>
                          </td>
                          <td className="px-4 py-4 text-center font-mono font-bold text-slate-900 text-xs">
                            {item.onHand} {item.unit}
                          </td>
                          <td className="px-4 py-4 text-center font-mono text-amber-700 font-bold text-xs">
                            {item.reserved} {item.unit}
                          </td>
                          <td className="px-4 py-4 text-center font-mono text-emerald-700 font-bold text-xs">
                            {item.available} {item.unit}
                          </td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold ${
                              item.status === 'Critical' 
                                ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                                : item.status === 'Low Stock'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                item.status === 'Critical' ? 'bg-rose-500' : item.status === 'Low Stock' ? 'bg-amber-500' : 'bg-emerald-500'
                              }`}></span>
                              <span>{item.status}</span>
                            </span>
                          </td>
                          <td className="px-4 py-4 text-right rtl:text-left">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setSelectedMaterial(item)}
                                className="px-2.5 py-1 rounded-lg border border-slate-200 hover:border-[#E85312] text-slate-700 hover:text-[#E85312] font-bold text-xs transition-colors cursor-pointer"
                                title="View Details"
                              >
                                {isAr ? "تفاصيل" : "Details"}
                              </button>
                              <button
                                onClick={() => {
                                  setModalTargetItem(item);
                                  setShowQuickIssueModal(true);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                                title="Quick Issue"
                              >
                                {isAr ? "صرف" : "Issue"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Showing {filteredMaterials.length} of {materialsList.length} materials</span>
                  <span className="font-mono font-bold text-slate-700">All locations synchronized</span>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: SITE REQUISITIONS MANAGEMENT (Figma Screen 3 in Row 3)   */}
      {/* ============================================================== */}
      {activeTab === 'requisitions' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* 4 KPIs matching Screen 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">TOTAL REQUESTS</span>
              <span className="text-3xl font-black text-slate-900 mt-1 block font-mono">54</span>
              <span className="text-xs text-slate-400 mt-0.5 block">Logged this month</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">PENDING APPROVAL</span>
              <span className="text-3xl font-black text-amber-600 mt-1 block font-mono">05</span>
              <span className="text-xs text-amber-600 font-bold mt-0.5 block">Awaiting PM sign-off</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">READY TO ISSUE</span>
              <span className="text-3xl font-black text-emerald-600 mt-1 block font-mono">11</span>
              <span className="text-xs text-emerald-600 font-bold mt-0.5 block">Approved by site engineers</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">TOTAL VALUE</span>
              <span className="text-3xl font-black text-[#E85312] mt-1 block font-mono">EGP 184,500</span>
              <span className="text-xs text-slate-400 mt-0.5 block">Fulfillment budget allocated</span>
            </div>
          </div>

          {/* Requisitions Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-black text-slate-900 text-sm">
                {isAr ? "طلبات المواد الميدانية من مهندسي الموقع" : "Field Material Requisitions"}
              </h3>
              <span className="text-xs font-bold text-slate-400">{requisitionsList.length} Requisitions</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs">
                <thead className="bg-slate-50 text-slate-400 font-black border-b border-slate-200 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-5 py-3.5">REQ ID & DATE</th>
                    <th className="px-4 py-3.5">PROJECT & ZONE</th>
                    <th className="px-4 py-3.5">REQUESTING ENGINEER</th>
                    <th className="px-4 py-3.5">REQUESTED MATERIAL</th>
                    <th className="px-4 py-3.5">STATUS</th>
                    <th className="px-4 py-3.5 text-right rtl:text-left">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  {requisitionsList.map(req => (
                    <tr key={req.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-900 font-mono text-sm">{req.id}</div>
                        <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">{req.date}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-bold text-slate-900">{req.project}</div>
                        <span className="text-[11px] text-slate-500 font-medium">{req.zone}</span>
                      </td>
                      <td className="px-4 py-4 font-bold text-slate-900">{req.engineer}</td>
                      <td className="px-4 py-4">
                        <div className="font-bold text-slate-900">{req.material}</div>
                        <span className="font-mono text-xs text-[#E85312] font-black">{req.qty}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold ${
                          req.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : req.status === 'Pending'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}>
                          <span>{req.status}</span>
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right rtl:text-left">
                        {req.status === 'Approved' ? (
                          <button
                            onClick={() => {
                              setModalTargetItem(materialsList[0]);
                              setIssueTargetProject(req.project);
                              setIssueRecipientEngineer(req.engineer);
                              setShowQuickIssueModal(true);
                            }}
                            className="px-3.5 py-1.5 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
                          >
                            {isAr ? "صرف المواد الآن" : "Issue Materials"}
                          </button>
                        ) : (
                          <span className="text-slate-400 font-mono text-xs">Waiting PM</span>
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

      {/* ============================================================== */}
      {/* TAB 4: GATE PASSES & DISPATCHES (Screen 4 in Row 3)            */}
      {/* ============================================================== */}
      {activeTab === 'dispatches' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                {isAr ? "أذون خروج البوابة وأوامر الشحن (Gate Passes & Transfers)" : "Gate Passes & Dispatches"}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {isAr ? "تتبع الشاحنات المغادرة، مطابقة أرقام اللوحات، والتحقق المشفر من حمولة المستودع." : "Security gate authorization, driver sign-off, and cross-site outbound manifests."}
              </p>
            </div>

            <button
              onClick={() => {
                setModalTargetItem(materialsList[0]);
                setShowQuickIssueModal(true);
              }}
              className="px-4 py-2 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{isAr ? "+ إذن خروج جديد" : "+ Create Gate Pass"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {gatePassesList.map(gp => (
              <div key={gp.id} className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4 flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#E85312]" />
                    <span className="font-mono font-black text-slate-900 text-sm">{gp.id}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {gp.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">DESTINATION PROJECT</span>
                    <span className="font-bold text-slate-900">{gp.recipient}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">ITEMS LOADED</span>
                    <span className="font-bold text-slate-800">{gp.items}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 block">VEHICLE PLATE</span>
                      <span className="font-mono font-bold text-slate-800">{gp.vehicle}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">DRIVER</span>
                      <span className="font-bold text-slate-800">{gp.driver}</span>
                    </div>
                  </div>
                </div>

                {/* QR Code Barcode Representation */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-slate-700" />
                    <div>
                      <span className="font-mono font-bold text-slate-900 block leading-none">{gp.qr}</span>
                      <span className="text-[10px] text-slate-400">Security Verified</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setToastMessage(`Printing thermal Gate Pass ${gp.id}...`);
                      setTimeout(() => setToastMessage(null), 3000);
                    }}
                    className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 cursor-pointer"
                    title="Print Gate Pass"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 5: GOODS RECEIVING & GRN (Screen 5 in Middle Row)           */}
      {/* ============================================================== */}
      {activeTab === 'receiving' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6 max-w-4xl mx-auto">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <h3 className="font-black text-slate-900 text-lg">
                  {isAr ? "فحص واستلام شحنة واردة (Goods Receiving Note - GRN)" : "Goods Receiving & Quality Inspection (GRN)"}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Verify incoming supplier delivery against purchase order and quality specifications
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 bg-slate-100 text-slate-700 rounded-lg">
                GRN-2026-9042
              </span>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              setToastMessage(isAr ? "تم اعتماد استلام الشحنة وإضافتها للأرصدة الفعلية بنجاح!" : "Goods received and added to physical stock ledger!");
              setTimeout(() => setToastMessage(null), 4000);
            }} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Purchase Order (PO Matching) *</label>
                  <select className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold">
                    <option>PO-2026-0392 - Elsewedy Steel ($48,200)</option>
                    <option>PO-2026-0388 - Suez Cement Co. ($12,400)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Supplier Delivery Note (DN #) *</label>
                  <input
                    type="text"
                    required
                    defaultValue="DN-8819"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Material SKU</label>
                  <input
                    type="text"
                    readOnly
                    defaultValue="STL-RB-16"
                    className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Received Quantity *</label>
                  <input
                    type="text"
                    required
                    defaultValue="50.0 Tons"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Quality Inspection (QC) *</label>
                  <select className="w-full px-3.5 py-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl font-bold">
                    <option>Passed • Meets Technical Standards</option>
                    <option>Quarantine • Laboratory Test Pending</option>
                    <option>Rejected • Damage / Non-compliant</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Assigned Storage Zone & Bay</label>
                <input
                  type="text"
                  defaultValue="Main Central Warehouse - Zone B, Rack 04"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveTab('inventory')}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  Confirm Receipt & Update Inventory
                </button>
              </div>

            </form>
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* FIGMA MODAL 1: SCAN QR CODE (Top Row in Canvas)               */}
      {/* ============================================================== */}
      {showQRScanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
            
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#E85312]" />
                <h3 className="font-black text-slate-900 text-sm">
                  {isAr ? "ماسح كود QR للمواد (Scan QR Code)" : "Scan Material QR Code"}
                </h3>
              </div>
              <button onClick={() => setShowQRScanModal(false)} className="cursor-pointer text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div className="p-6 space-y-5 text-xs text-center">
              
              {/* Camera Scanner Viewport with Reticle */}
              <div className="w-full h-56 bg-slate-950 rounded-2xl relative overflow-hidden flex items-center justify-center border-2 border-slate-800 shadow-inner">
                {/* Simulated Camera feed subtle grid */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FFF_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                {/* Target Reticle */}
                <div className="w-40 h-40 border-2 border-[#E85312] rounded-2xl relative flex items-center justify-center shadow-lg">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-white -translate-x-1 -translate-y-1"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-white translate-x-1 -translate-y-1"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-white -translate-x-1 translate-y-1"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-white translate-x-1 translate-y-1"></div>
                  
                  {/* Animated laser scan line */}
                  <div className="w-full h-0.5 bg-[#E85312] shadow-[0_0_8px_#E85312] animate-pulse"></div>
                  
                  <QrCode className="w-12 h-12 text-white/30" />
                </div>

                <div className="absolute bottom-3 text-[11px] text-white/80 font-bold bg-black/60 px-3 py-1 rounded-full">
                  Align camera with material tag QR
                </div>
              </div>

              {/* Manual Input Fallback */}
              <div className="space-y-1.5 text-left rtl:text-right">
                <label className="block font-bold text-slate-700">
                  {isAr ? "أو أدخل كود الصنف يدوياً:" : "Or enter QR / Barcode ID manually:"}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={manualQRInput}
                    onChange={(e) => setManualQRInput(e.target.value)}
                    placeholder="e.g. QR-STL-RB-16-092"
                    className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-900"
                  />
                  <button
                    onClick={() => {
                      const matched = materialsList[0];
                      setSelectedMaterial(matched);
                      setShowQRScanModal(false);
                      setToastMessage(`Scanned material "${matched.nameEn}" successfully!`);
                      setTimeout(() => setToastMessage(null), 3500);
                    }}
                    className="px-4 py-2.5 bg-[#E85312] hover:bg-[#CC490F] text-white font-bold rounded-xl shadow-xs cursor-pointer shrink-0"
                  >
                    Verify
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* FIGMA MODAL 2: QUICK MATERIAL ISSUE (Top Row in Canvas)        */}
      {/* ============================================================== */}
      {showQuickIssueModal && modalTargetItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-start justify-between">
              <div>
                <h3 className="font-black text-slate-900 text-base">
                  {isAr ? "إذن صرف مواد سريع للموقع (Quick Material Issue)" : "Quick Material Issue"}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Authorize direct staging yard dispatch and generate security gate pass
                </p>
              </div>
              <button onClick={() => setShowQuickIssueModal(false)} className="cursor-pointer text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={handleConfirmQuickIssue} className="p-6 space-y-4 text-xs">
              
              {/* Selected Material Card */}
              <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-200/80 flex items-center justify-between">
                <div>
                  <span className="font-black text-slate-900 text-sm block">
                    {isAr ? modalTargetItem.nameAr : modalTargetItem.nameEn}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    SKU: {modalTargetItem.sku} • Location: {modalTargetItem.location}
                  </span>
                </div>
                <div className="text-right rtl:text-left">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">AVAILABLE</span>
                  <span className="text-base font-black text-emerald-600 font-mono">
                    {modalTargetItem.available} {modalTargetItem.unit}
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {isAr ? "المشروع المستلم ومكان الصب" : "Target Project & Sector"} *
                </label>
                <select
                  value={issueTargetProject}
                  onChange={(e) => setIssueTargetProject(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                >
                  <option>New Mansoura Towers - Sector B4</option>
                  <option>New Capital CBD - Plot 12</option>
                  <option>Alexandria Waterfront Heights - Sector 1</option>
                  <option>Sadat City Logistics Park</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    {isAr ? "مهندس الموقع المستلم" : "Recipient Engineer"} *
                  </label>
                  <input
                    type="text"
                    required
                    value={issueRecipientEngineer}
                    onChange={(e) => setIssueRecipientEngineer(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    {isAr ? "الكمية المصروفة" : "Quantity to Issue"} *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={issueQuantity}
                      onChange={(e) => setIssueQuantity(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold"
                    />
                    <span className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-[11px]">
                      {modalTargetItem.unit}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {isAr ? "رقم إذن الخروج (Gate Pass #)" : "Gate Pass Reference"}
                </label>
                <input
                  type="text"
                  readOnly
                  value={issueGatePassNo}
                  className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl font-mono font-bold text-slate-600"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowQuickIssueModal(false)}
                  className="px-4 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  {isAr ? "إلغاء" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-xl font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>{isAr ? "تأكيد الصرف وإصدار الإذن" : "Confirm Issue & Generate Pass"}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* FIGMA MODAL 3: STOCK ADJUSTMENT (Top Row in Canvas)            */}
      {/* ============================================================== */}
      {showStockAdjustModal && modalTargetItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-start justify-between">
              <div>
                <h3 className="font-black text-slate-900 text-base">
                  {isAr ? "تسوية وتدقيق رصيد المخزن (Stock Adjustment)" : "Stock Adjustment"}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Reconcile physical yard inventory discrepancies with audit verification
                </p>
              </div>
              <button onClick={() => setShowStockAdjustModal(false)} className="cursor-pointer text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={handleConfirmAdjustment} className="p-6 space-y-4 text-xs">
              
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-black text-slate-900 block">{modalTargetItem.nameEn}</span>
                  <span className="text-[11px] font-mono text-slate-500">Current On Hand: {modalTargetItem.onHand} {modalTargetItem.unit}</span>
                </div>
                <span className="text-xs font-mono font-bold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  {modalTargetItem.sku}
                </span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Adjustment Type *</label>
                <select
                  value={adjustType}
                  onChange={(e) => setAdjustType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                >
                  <option>Recount / Audit Discrepancy</option>
                  <option>Damaged / Spoiled in Yard</option>
                  <option>Scrap & Cutting Loss</option>
                  <option>Internal Yard Reallocation</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Adjustment Direction *</label>
                  <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setAdjustDirection('add')}
                      className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                        adjustDirection === 'add' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      + Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setAdjustDirection('subtract')}
                      className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                        adjustDirection === 'subtract' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      - Subtract
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Quantity *</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={adjustQty}
                      onChange={(e) => setAdjustQty(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold"
                    />
                    <span className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-[11px]">
                      {modalTargetItem.unit}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Audit Reason / Justification *</label>
                <textarea
                  rows={2}
                  required
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Authorized Inspector / Approver</label>
                <input
                  type="text"
                  required
                  value={adjustInspector}
                  onChange={(e) => setAdjustInspector(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowStockAdjustModal(false)}
                  className="px-4 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  Confirm Stock Adjustment
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* FIGMA MODAL 4: PRINT QR LABEL (Top Row in Canvas)              */}
      {/* ============================================================== */}
      {showPrintQRModal && modalTargetItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-sm overflow-hidden">
            
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-[#E85312]" />
                <h3 className="font-black text-slate-900 text-sm">Print Thermal QR Label</h3>
              </div>
              <button onClick={() => setShowPrintQRModal(false)} className="cursor-pointer text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div className="p-6 space-y-5 text-center text-xs">
              
              {/* Thermal Label Card Representation */}
              <div className="p-5 bg-white border-2 border-dashed border-slate-300 rounded-2xl shadow-inner space-y-3 mx-auto">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-black text-[11px] text-[#E85312]">IRAM RESOURCE SYSTEMS</span>
                  <span className="font-mono font-bold text-[10px] text-slate-500">TAG #9921</span>
                </div>

                <div className="w-32 h-32 mx-auto bg-slate-900 rounded-xl flex items-center justify-center text-white relative">
                  <QrCode className="w-24 h-24 text-white" />
                </div>

                <div className="space-y-0.5 text-slate-900">
                  <div className="font-black text-sm">{modalTargetItem.nameEn}</div>
                  <div className="font-mono font-bold text-xs text-[#E85312]">{modalTargetItem.sku}</div>
                  <div className="text-[10px] text-slate-500 font-mono">Location: {modalTargetItem.location}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setToastMessage(`Sent label for "${modalTargetItem.sku}" to Zebra Thermal Printer!`);
                    setShowPrintQRModal(false);
                    setTimeout(() => setToastMessage(null), 3500);
                  }}
                  className="flex-1 py-2.5 bg-[#E85312] hover:bg-[#CC490F] text-white font-bold rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Label</span>
                </button>
                <button
                  onClick={() => setShowPrintQRModal(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* FIGMA MODAL 5: DECLARE SURPLUS (Section 06 Smart Surplus)       */}
      {/* ============================================================== */}
      {showSurplusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-start justify-between">
              <div>
                <h3 className="font-black text-slate-900 text-base">
                  {isAr ? "تسجيل فائض مواد رسمي بالساحة" : "Declare Site Surplus Material"}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Enables automated AI surplus transfer matching across sister project sites
                </p>
              </div>
              <button onClick={() => setShowSurplusModal(false)} className="cursor-pointer text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              setShowSurplusModal(false);
              setToastMessage(isAr ? "تم تسجيل الفائض في شبكة الشركة وإتاحته للمشاريع الشقيقة فورياً!" : "Surplus material pool updated and broadcasted to project network!");
              setTimeout(() => setToastMessage(null), 4000);
            }} className="p-6 space-y-4 text-xs">
              
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Surplus Material Item *</label>
                <select className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold">
                  {materialsList.map(m => (
                    <option key={m.id} value={m.sku}>{m.nameEn} ({m.sku})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Surplus Quantity *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    defaultValue="25.0"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Unit of Measure</label>
                  <input
                    type="text"
                    defaultValue="Tons"
                    className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl font-bold text-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Physical Storage & Packaging Condition</label>
                <input
                  type="text"
                  defaultValue="Bundles wrapped on wooden dunnage with MTC tags intact"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowSurplusModal(false)}
                  className="px-4 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  Confirm Surplus Declaration
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
