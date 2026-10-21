import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Truck, 
  Clock, 
  DollarSign, 
  Star, 
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  Send,
  Eye,
  Download,
  MapPin,
  ShieldCheck,
  Layers,
  Calendar,
  Filter,
  Search,
  Building2,
  Printer,
  ChevronRight,
  Check,
  Building,
  FileCheck,
  Plus,
  AlertTriangle,
  Users,
  Coins,
  ArrowRightLeft,
  FolderOpen,
  User,
  Phone,
  Mail,
  CheckCircle,
  Sliders,
  ExternalLink,
  ChevronDown,
  X,
  FileSpreadsheet,
  Zap,
  Tag,
  BarChart3
} from 'lucide-react';

export default function ProcurementView({ onBack, language }) {
  const isAr = language === 'ar';
  const BackIcon = isAr ? ArrowRight : ArrowLeft;

  // Master Active Sub-View matching Figma "Procurement Officer" Canvas:
  // 'dashboard' | 'requests' | 'req-details' | 'create-rfq' | 'compare-quotes' | 'generate-po' | 'purchase-orders' | 'po-details' | 'materials-catalog' | 'my-account'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Selected entities for deep drill-down
  const [selectedReqId, setSelectedReqId] = useState('REQ-2026-0814');
  const [selectedRfqId, setSelectedRfqId] = useState('RFQ-2026-0042');
  const [selectedPoId, setSelectedPoId] = useState('PO-2026-0043');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [projectFilter, setProjectFilter] = useState('ALL');
  const [toastMessage, setToastMessage] = useState(null);

  // New RFQ Form State
  const [rfqMaterial, setRfqMaterial] = useState('High Tensile Steel Rebar 16mm (ASTM A615 Grade 60)');
  const [rfqQuantity, setRfqQuantity] = useState('50.0');
  const [rfqUnit, setRfqUnit] = useState('Tons');
  const [rfqProject, setRfqProject] = useState('Al-Mansoura Residential Complex');
  const [rfqTargetDate, setRfqTargetDate] = useState('2026-11-02');
  const [rfqDeliveryYard, setRfqDeliveryYard] = useState('Central Cairo Logistics Yard - Staging Bay 4');
  const [rfqPaymentTerms, setRfqPaymentTerms] = useState('Net 30 Days Credit');
  const [rfqNotes, setRfqNotes] = useState('Mill Test Certificate (MTC) required prior to site gate entry. Batch heat numbers must match delivery note.');
  const [selectedSuppliersToInvite, setSelectedSuppliersToInvite] = useState(['Ezz Steel Mills Egypt', 'Suez Steel Industry', 'Al-Ashry Steel Group']);

  // PO Generation Form State
  const [poTerms, setPoTerms] = useState('Delivered to site, unhitched at Staging Bay 4');
  const [poPaymentMilestone, setPoPaymentMilestone] = useState('100% on QA/QC sign-off (30 Days credit)');
  const [poInspector, setPoInspector] = useState('Eng. Mohamed Fathy (Site QA/QC Engineer)');
  const [poSpecialClause, setPoSpecialClause] = useState('Penalty of 1.5% per day for delay beyond Nov 02, 2026 pour schedule.');

  // Notification Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Requisitions Data matching Figma Screen 1 & 2
  const [requisitionsList, setRequisitionsList] = useState([
    {
      id: "REQ-2026-0814",
      project: "Al-Mansoura Residential Complex",
      projectAr: "كمبوند المنصورة السكني",
      requestedBy: "Eng. Tamer Khaled",
      date: "2026-10-20",
      targetDate: "2026-11-02",
      material: "High Tensile Steel Rebar 16mm",
      materialAr: "حديد تسليح عالي المقاومة 16 مم",
      spec: "ASTM A615 Grade 60, 12m length bundles",
      quantity: 50.0,
      unit: "Tons",
      status: "Awaiting RFQ",
      statusAr: "بانتظار طرح مناقصة",
      urgency: "Critical Shortage",
      hasSurplusMatch: true,
      surplusSourceSite: "New Capital Business Tower",
      surplusAvailableQty: "40.0 Tons"
    },
    {
      id: "REQ-2026-0815",
      project: "New Capital Business Tower",
      projectAr: "برج الأعمال - العاصمة الإدارية",
      requestedBy: "Eng. Sara Adel",
      date: "2026-10-19",
      targetDate: "2026-10-29",
      material: "Sulfate Resistant Portland Cement 42.5N",
      materialAr: "أسمنت بورتلاندي مقاوم للكبريتات 42.5N",
      spec: "CEM I 42.5N SR-5 (50kg bags moisture proof)",
      quantity: 800.0,
      unit: "Bags",
      status: "3 Quotes Received",
      statusAr: "3 عروض مستلمة (جاهز للتقييم)",
      urgency: "Critical Shortage",
      hasSurplusMatch: false
    },
    {
      id: "REQ-2026-0816",
      project: "Central Cairo Logistics Yard",
      projectAr: "ساحة القاهرة اللوجستية المركزية",
      requestedBy: "Eng. Mostafa Salem",
      date: "2026-10-18",
      targetDate: "2026-11-08",
      material: "Heavy Duty UPVC Drainage Pipes 110mm",
      materialAr: "مواسير صرف UPVC قطر 110 مم فئة 4",
      spec: "Class 4 (SN8) Rubber Ring Joint, 6m length",
      quantity: 320.0,
      unit: "Meters",
      status: "PO Created",
      statusAr: "تم إصدار أمر الشراء",
      urgency: "Normal",
      hasSurplusMatch: false
    },
    {
      id: "REQ-2026-0817",
      project: "Alexandria Waterfront Heights",
      projectAr: "أبراج كورنيش الإسكندرية",
      requestedBy: "Eng. Eman El-Sayed",
      date: "2026-10-17",
      targetDate: "2026-11-12",
      material: "Ready Mix Concrete C35 Silica Fume",
      materialAr: "خرسانة جاهزة رتبة 350 كجم/سم² مضاف سيليكا",
      spec: "C35/45, Slump 180mm, with retarder & silica fume",
      quantity: 450.0,
      unit: "m³",
      status: "Awaiting RFQ",
      statusAr: "بانتظار طرح مناقصة",
      urgency: "Approaching Milestone",
      hasSurplusMatch: false
    },
    {
      id: "REQ-2026-0818",
      project: "Al-Mansoura Residential Complex",
      projectAr: "كمبوند المنصورة السكني",
      requestedBy: "Eng. Tamer Khaled",
      date: "2026-10-16",
      targetDate: "2026-11-05",
      material: "Marine Waterproof Plywood 18mm",
      materialAr: "خشب بليوود بحري عازل 18 مم",
      spec: "BS 1088 Marine Grade Phenolic Coated, 1220x2440mm",
      quantity: 600.0,
      unit: "Sheets",
      status: "3 Quotes Received",
      statusAr: "3 عروض مستلمة (جاهز للتقييم)",
      urgency: "Normal",
      hasSurplusMatch: true,
      surplusSourceSite: "Central Cairo Logistics Yard",
      surplusAvailableQty: "250 Sheets"
    }
  ]);

  // Quotations Comparison Matrix Data matching Screen 4
  const [quotationsMatrix, setQuotationsMatrix] = useState([
    {
      id: "QT-8801",
      supplier: "Ezz Steel Mills Egypt",
      supplierAr: "مصانع حديد عز مصر",
      rating: 4.9,
      unitPrice: 28200, // EGP
      deliveryCost: 15000,
      totalLandedEgp: 1425000,
      deliveryTime: "2 Days (Nov 01)",
      leadTimeDays: 2,
      qualityStandard: "ASTM A615 Grade 60 (Certified MTC)",
      paymentTerms: "Net 30 Days Deferred",
      slaScore: 99.2,
      aiScore: 98.4,
      isRecommended: true,
      status: "Recommended",
      pros: isAr ? ["وصول مؤكد قبل موعد صب السقف بـ 24 ساعة", "شهادة فحص معملية MTC معتمدة من الاستشاري", "سداد آجل 30 يوماً يحفظ سيولة المشروع"] : ["Guaranteed delivery 24h prior to pour milestone", "Verified consultant-approved MTC certificate", "Net 30 deferred payment terms preserve liquidity"],
      cons: isAr ? ["سعر النقل ثابت بدون خصم كميات إضافية"] : ["Fixed freight rate with no additional volume tiered rebate"]
    },
    {
      id: "QT-8802",
      supplier: "Suez Steel Industry",
      supplierAr: "شركة السويس للصلب",
      rating: 4.6,
      unitPrice: 28800,
      deliveryCost: 12000,
      totalLandedEgp: 1452000,
      deliveryTime: "1 Day (Nov 01)",
      leadTimeDays: 1,
      qualityStandard: "ISO 9001 / ES 262-2",
      paymentTerms: "Cash on Delivery (COD)",
      slaScore: 94.0,
      aiScore: 88.5,
      isRecommended: false,
      status: "Under Review",
      pros: isAr ? ["شحن سريع جداً خلال 24 ساعة"] : ["24-hour ultra rapid dispatch"],
      cons: isAr ? ["أعلى تكلفة إجمالية واصلة للموقع (+27,000 ج.م)", "سداد نقدي عند الاستلام يضغط السيولة"] : ["Higher total landed cost (+EGP 27,000)", "Cash on Delivery payment pressures cash flow"]
    },
    {
      id: "QT-8803",
      supplier: "Al-Ashry Steel Group",
      supplierAr: "مجموعة العشري للصلب",
      rating: 4.2,
      unitPrice: 27500,
      deliveryCost: 25000,
      totalLandedEgp: 1400000,
      deliveryTime: "5 Days (Nov 05 - DELAY)",
      leadTimeDays: 5,
      qualityStandard: "Commercial Quality Warranty",
      paymentTerms: "50% Advance, 50% on Delivery",
      slaScore: 87.5,
      aiScore: 74.0,
      isRecommended: false,
      status: "Delayed Risk",
      pros: isAr ? ["أقل سعر اسمي للطن (27,500 ج.م)"] : ["Lowest nominal price per ton (EGP 27,500)"],
      cons: isAr ? ["خطر حرج: يتأخر 3 أيام بعد موعد الصب الإنشائي الحرج", "تكلفة نقل مرتفعة وتتطلب دفعة مقدمة 50%"] : ["Critical risk: Arrives 3 days after scheduled structural pour milestone", "Demands 50% upfront payment deposit"]
    }
  ]);

  // Purchase Orders Database matching Screen 7 & 8
  const [purchaseOrders, setPurchaseOrders] = useState([
    {
      poNumber: "PO-2026-0043",
      rfqRef: "RFQ-2026-0042",
      reqRef: "REQ-2026-0814",
      supplierName: "Ezz Steel Mills Egypt",
      supplierNameAr: "مصانع حديد عز مصر",
      vendorId: "VND-2026-EZ",
      project: "Al-Mansoura Residential Complex",
      projectAr: "كمبوند المنصورة السكني",
      stagingBay: "Staging Bay 4 (West Gate)",
      stagingBayAr: "ساحة تشوين رقم 4 (البوابة الغربية)",
      materialDescription: "High Tensile Steel Rebar 16mm (ASTM A615 Grade 60)",
      materialDescriptionAr: "حديد تسليح عالي المقاومة 16 مم (Grade 60)",
      quantity: "50.00 Tons",
      unitPrice: "EGP 28,200 / Ton",
      freightCost: "EGP 15,000",
      totalAmountEgp: "EGP 1,425,000",
      issueDate: "2026-10-21",
      deliveryTargetDate: "2026-11-01",
      status: "In Production",
      statusAr: "قيد التجهيز بالمصنع",
      statusBadge: "bg-amber-50 text-amber-800 border-amber-300",
      paymentTerms: "Net 30 Days Credit from GRN",
      deliveryETA: "Nov 01, 10:00 AM",
      driverName: "Mahmoud Hassan",
      plateNumber: "ق س ر 9284"
    },
    {
      poNumber: "PO-2026-0042",
      rfqRef: "RFQ-2026-0038",
      reqRef: "REQ-2026-0816",
      supplierName: "Egyptian German Industrial Pipes Co.",
      supplierNameAr: "الشركة المصرية الألمانية للمواسير",
      vendorId: "VND-2026-EGIP",
      project: "Central Cairo Logistics Yard",
      projectAr: "ساحة القاهرة اللوجستية المركزية",
      stagingBay: "Covered Bay C",
      stagingBayAr: "جمالون التخزين المغطى C",
      materialDescription: "Heavy Duty UPVC Drainage Pipes 110mm",
      materialDescriptionAr: "مواسير صرف UPVC قطر 110 مم فئة 4",
      quantity: "320.00 Meters",
      unitPrice: "EGP 380 / Meter",
      freightCost: "EGP 4,500",
      totalAmountEgp: "EGP 126,100",
      issueDate: "2026-10-18",
      deliveryTargetDate: "2026-10-25",
      status: "In-Transit to Site",
      statusAr: "في الطريق إلى الموقع",
      statusBadge: "bg-blue-50 text-blue-800 border-blue-300",
      paymentTerms: "Net 15 Days",
      deliveryETA: "Today, 02:30 PM",
      driverName: "Ibrahim El-Sayed",
      plateNumber: "ط ع د 5129"
    },
    {
      poNumber: "PO-2026-0041",
      rfqRef: "RFQ-2026-0031",
      reqRef: "REQ-2026-0792",
      supplierName: "Misr Beni Suef Cement Co.",
      supplierNameAr: "شركة مصر بني سويف للأسمنت",
      vendorId: "VND-2026-MBS",
      project: "Alexandria Waterfront Heights",
      projectAr: "أبراج كورنيش الإسكندرية",
      stagingBay: "Shed 1 Dry Storage",
      stagingBayAr: "مخزن جاف رقم 1",
      materialDescription: "Sulfate Resistant Portland Cement 42.5N",
      materialDescriptionAr: "أسمنت بورتلاندي مقاوم للكبريتات 42.5N",
      quantity: "800.00 Bags",
      unitPrice: "EGP 245 / Bag",
      freightCost: "EGP 8,000",
      totalAmountEgp: "EGP 204,000",
      issueDate: "2026-10-14",
      deliveryTargetDate: "2026-10-20",
      status: "Delivered & Inspected",
      statusAr: "تم الاستلام والفحص بالكامل (GRN Passed)",
      statusBadge: "bg-emerald-50 text-emerald-800 border-emerald-300",
      paymentTerms: "Net 30 Days (Paid)",
      deliveryETA: "Oct 19, 2026 (Delivered)",
      driverName: "Sameh Abdel-Alim",
      plateNumber: "ي ن م 7741"
    }
  ]);

  // Materials & Suppliers Catalog Data matching Screen 9
  const [catalogMaterials, setCatalogMaterials] = useState([
    {
      sku: "STL-RB-16",
      nameEn: "High Tensile Steel Rebar 16mm",
      nameAr: "حديد تسليح عالي المقاومة 16 مم",
      category: "Steel & Metals",
      unit: "Ton",
      referencePrice: "EGP 28,200",
      preferredSupplier: "Ezz Steel Mills Egypt",
      leadTimeDays: "2-3 Days",
      rating: 4.9,
      spec: "ASTM A615 Grade 60 (ES 262-2)"
    },
    {
      sku: "CMT-PORT-42",
      nameEn: "Portland Cement 42.5N High Quality",
      nameAr: "أسمنت بورتلاندي 42.5N فاخر",
      category: "Concrete & Binders",
      unit: "Bag (50kg)",
      referencePrice: "EGP 240",
      preferredSupplier: "Misr Beni Suef Cement Co.",
      leadTimeDays: "1-2 Days",
      rating: 4.8,
      spec: "EN 197-1 CEM I 42.5N"
    },
    {
      sku: "CONC-C35-SF",
      nameEn: "Ready Mix Concrete C35 Silica Fume",
      nameAr: "خرسانة جاهزة رتبة 350 كجم/سم² مضاف سيليكا",
      category: "Ready Mix",
      unit: "m³",
      referencePrice: "EGP 1,950",
      preferredSupplier: "ReadyMix Egypt Co.",
      leadTimeDays: "Same Day Dispatch",
      rating: 4.7,
      spec: "C35/45, Slump 180mm"
    },
    {
      sku: "PLY-MRN-18",
      nameEn: "Marine Waterproof Plywood 18mm",
      nameAr: "خشب بليوود بحري عازل 18 مم",
      category: "Formwork & Timber",
      unit: "Sheet",
      referencePrice: "EGP 1,450",
      preferredSupplier: "Delta Wood Imports",
      leadTimeDays: "3-4 Days",
      rating: 4.6,
      spec: "BS 1088 Phenolic Coated"
    },
    {
      sku: "PIP-PVC-110",
      nameEn: "UPVC Drainage Pipes 110mm Class 4",
      nameAr: "مواسير صرف UPVC قطر 110 مم فئة 4",
      category: "Plumbing Infrastructure",
      unit: "Meter",
      referencePrice: "EGP 380",
      preferredSupplier: "Egyptian German Pipes Co.",
      leadTimeDays: "2 Days",
      rating: 4.8,
      spec: "DIN 8062 Class 4 (SN8)"
    }
  ]);

  // Selected Requisition object
  const activeRequisition = requisitionsList.find(r => r.id === selectedReqId) || requisitionsList[0];
  const activePo = purchaseOrders.find(p => p.poNumber === selectedPoId) || purchaseOrders[0];

  // Action: Handle Create RFQ Submit
  const handlePublishRfq = (e) => {
    e.preventDefault();
    const newRfqId = `RFQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    showToast(isAr ? `تم طرح مناقصة الشراء بنجاح (${newRfqId}) وإرسال إشعارات فورية لـ 3 موردين مؤهلين!` : `RFQ ${newRfqId} published successfully! 3 qualified suppliers notified.`);
    // Update requisition status
    setRequisitionsList(prev => prev.map(r => r.id === selectedReqId ? { ...r, status: "RFQ Published", statusAr: "تم طرح المناقصة للموردين" } : r));
    setActiveTab('compare-quotes');
  };

  // Action: Handle Award PO
  const handleConfirmAwardAndGeneratePo = (awardedQuote) => {
    const newPoNum = `PO-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const createdPo = {
      poNumber: newPoNum,
      rfqRef: "RFQ-2026-0042",
      reqRef: activeRequisition.id,
      supplierName: awardedQuote.supplier,
      supplierNameAr: awardedQuote.supplierAr,
      vendorId: "VND-2026-EZ",
      project: activeRequisition.project,
      projectAr: activeRequisition.projectAr,
      stagingBay: "Staging Bay 4 (West Gate)",
      stagingBayAr: "ساحة تشوين رقم 4 (البوابة الغربية)",
      materialDescription: activeRequisition.material,
      materialDescriptionAr: activeRequisition.materialAr,
      quantity: `${activeRequisition.quantity} Tons`,
      unitPrice: `EGP ${awardedQuote.unitPrice.toLocaleString()} / Ton`,
      freightCost: `EGP ${awardedQuote.deliveryCost.toLocaleString()}`,
      totalAmountEgp: `EGP ${awardedQuote.totalLandedEgp.toLocaleString()}`,
      issueDate: "2026-10-21",
      deliveryTargetDate: "2026-11-01",
      status: "In Production",
      statusAr: "قيد التجهيز بالمصنع (معتمد)",
      statusBadge: "bg-emerald-50 text-emerald-800 border-emerald-300",
      paymentTerms: awardedQuote.paymentTerms,
      deliveryETA: "Nov 01, 10:00 AM",
      driverName: "Pending Dispatch",
      plateNumber: "Pending Registration"
    };

    setPurchaseOrders([createdPo, ...purchaseOrders]);
    setSelectedPoId(newPoNum);
    showToast(isAr ? `تم اعتماد الترسية وإصدار أمر الشراء الرسمي ${newPoNum} بنجاح!` : `Award confirmed and PO ${newPoNum} generated successfully!`);
    setActiveTab('po-details');
  };

  // Filtered Requisitions
  const filteredRequisitions = requisitionsList.filter(item => {
    const matchStatus = statusFilter === 'ALL' || item.status === statusFilter || item.urgency === statusFilter;
    const matchProj = projectFilter === 'ALL' || item.project === projectFilter;
    const matchSearch = item.material.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.materialAr.includes(searchQuery) ||
                        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.project.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchProj && matchSearch;
  });

  return (
    <div className="space-y-6">

      {/* ============================================================== */}
      {/* 1. TOP HEADER & BREADCRUMBS NAVIGATION                           */}
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
                {isAr ? "بوابة مسؤول المشتريات (Procurement Officer)" : "IRAM Procurement Operations"}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 border border-slate-200">
                Figma Specs 100%
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {isAr ? "إدارة طلبات الشراء، عروض الأسعار، والمقارنة الذكية" : "Requisitions, RFQs & AI Quotations Matrix"}
            </h1>
          </div>
        </div>

        {/* Action Controls & Navigation Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs font-bold select-none overflow-x-auto">
          
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-white text-[#E85312] shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{isAr ? "لوحة المشتريات" : "Dashboard"}</span>
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'requests' || activeTab === 'req-details'
                ? 'bg-white text-[#E85312] shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{isAr ? "طلبات المواد (5)" : "Requests (5)"}</span>
          </button>

          <button
            onClick={() => setActiveTab('create-rfq')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'create-rfq'
                ? 'bg-white text-[#E85312] shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Plus className="w-3.5 h-3.5 text-[#E85312]" />
            <span>{isAr ? "طرح مناقصة (Create RFQ)" : "Create RFQ"}</span>
          </button>

          <button
            onClick={() => setActiveTab('compare-quotes')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'compare-quotes'
                ? 'bg-white text-[#E85312] shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{isAr ? "مقارنة العروض والـ AI" : "Compare Quotes"}</span>
          </button>

          <button
            onClick={() => setActiveTab('purchase-orders')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'purchase-orders' || activeTab === 'po-details'
                ? 'bg-white text-[#E85312] shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isAr ? "أوامر الشراء (POs)" : "Purchase Orders"}</span>
          </button>

          <button
            onClick={() => setActiveTab('materials-catalog')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'materials-catalog'
                ? 'bg-white text-[#E85312] shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isAr ? "دليل المواد والموردين" : "Catalog"}</span>
          </button>

          <button
            onClick={() => setActiveTab('my-account')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'my-account'
                ? 'bg-white text-[#E85312] shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>{isAr ? "حسابي" : "My Account"}</span>
          </button>

        </div>
      </div>

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-lg border border-slate-700 flex items-center justify-between animate-in fade-in duration-200 text-xs font-bold">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. SCREEN 1: PROCUREMENT DASHBOARD (Figma Screen 1)            */}
      {/* ============================================================== */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Top 4 KPI Cards matching Figma Screen 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {isAr ? "طلبات بحاجة لطرح RFQ" : "Requisitions Needing RFQ"}
                </span>
                <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#E85312] flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-black text-slate-900">4</div>
                <div className="flex items-center gap-1.5 text-xs text-amber-600 font-bold mt-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{isAr ? "مادتان في حالة نقص حرج" : "2 items in critical shortage"}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {isAr ? "عروض أسعار الموردين المعلقة" : "Pending Supplier Quotes"}
                </span>
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-black text-slate-900">14</div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold mt-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{isAr ? "جاهزة للتقييم الآلي بالـ AI" : "Ready for AI evaluation"}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {isAr ? "أوامر الشراء النشطة" : "Active Purchase Orders"}
                </span>
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-black text-slate-900">8</div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold mt-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{isAr ? "3 شحنات في الطريق للموقع" : "3 en-route to site"}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {isAr ? "الإنفاق المعتمد هذا الشهر" : "Monthly Spend"}
                </span>
                <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                  <Coins className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl sm:text-3xl font-black text-slate-900">EGP 3.45M</div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold mt-1">
                  <span>{isAr ? "توفير 8.4% بفضل تفاوض الـ AI" : "8.4% savings via AI bids"}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Main 2-Column Split: Requisitions Need Attention vs Urgent Purchase Orders */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left 2 Cols: Requisitions Need Attention Table */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <div>
                  <h3 className="font-black text-slate-900 text-base">
                    {isAr ? "طلبات مواد بالموقع تحتاج تدخلاً عاجلاً" : "Requisitions Needing Attention"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isAr ? "تم تحديد الأولويات بحسب موعد الصب الخرساني الحرج بالموقع" : "Ranked by pour milestone deadline and site burn rates"}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('requests')}
                  className="text-xs font-bold text-[#E85312] hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                >
                  <span>{isAr ? "عرض جميع الطلبات ←" : "View all requisitions →"}</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left rtl:text-right border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-[11px] font-black uppercase text-slate-500 border-y border-slate-200">
                      <th className="py-3 px-3.5">{isAr ? "المشروع" : "Project"}</th>
                      <th className="py-3 px-3.5">{isAr ? "المادة المطلوبة" : "Material"}</th>
                      <th className="py-3 px-3.5 text-center">{isAr ? "الكمية" : "Quantity"}</th>
                      <th className="py-3 px-3.5">{isAr ? "الموعد الحرج" : "Target Date"}</th>
                      <th className="py-3 px-3.5">{isAr ? "الحالة" : "Status"}</th>
                      <th className="py-3 px-3.5 text-center">{isAr ? "الإجراء" : "Action"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {requisitionsList.slice(0, 4).map(req => (
                      <tr key={req.id} className="hover:bg-orange-50/30 transition-colors">
                        <td className="py-3.5 px-3.5">
                          <div className="font-bold text-slate-900">{isAr ? req.projectAr : req.project}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{req.id} • {req.requestedBy}</div>
                        </td>
                        <td className="py-3.5 px-3.5">
                          <div className="font-bold text-slate-900">{isAr ? req.materialAr : req.material}</div>
                          <div className="text-[10px] text-slate-500">{req.spec}</div>
                        </td>
                        <td className="py-3.5 px-3.5 text-center font-mono font-black text-slate-900">
                          {req.quantity} {req.unit}
                        </td>
                        <td className="py-3.5 px-3.5 font-mono text-slate-700">
                          {req.targetDate}
                        </td>
                        <td className="py-3.5 px-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border inline-block ${
                            req.urgency === 'Critical Shortage' 
                              ? 'bg-rose-50 text-rose-700 border-rose-200' 
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}>
                            {req.urgency}
                          </span>
                        </td>
                        <td className="py-3.5 px-3.5 text-center">
                          <button
                            onClick={() => {
                              setSelectedReqId(req.id);
                              setActiveTab('req-details');
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-[11px] shadow-xs transition-all cursor-pointer"
                          >
                            {isAr ? "فحص الطلب" : "Create RFQ"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right 1 Col: Urgent Purchase Orders Summary Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-black text-slate-900 text-base">
                    {isAr ? "أوامر التوريد الجارية" : "Urgent Purchase Orders"}
                  </h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
                    Live Tracking
                  </span>
                </div>

                <div className="mt-4 space-y-3.5">
                  {purchaseOrders.map(po => (
                    <div 
                      key={po.poNumber}
                      onClick={() => {
                        setSelectedPoId(po.poNumber);
                        setActiveTab('po-details');
                      }}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-[#E85312] transition-all cursor-pointer space-y-2 group"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-black text-[#E85312]">{po.poNumber}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${po.statusBadge}`}>
                          {isAr ? po.statusAr : po.status}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-slate-900">
                        {isAr ? po.materialDescriptionAr : po.materialDescription}
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                        <span>{isAr ? po.supplierNameAr : po.supplierName}</span>
                        <span className="font-mono font-bold text-slate-800">{po.totalAmountEgp}</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200/60 font-mono">
                        <span>ETA: {po.deliveryETA}</span>
                        <span className="text-[#E85312] font-bold group-hover:underline">View PO →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setActiveTab('purchase-orders')}
                className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer text-center"
              >
                {isAr ? "فتح سجل أوامر الشراء الكامل" : "Open Full Purchase Orders Registry"}
              </button>
            </div>

          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* 3. SCREEN 2: PROCUREMENT REQUESTS LIST (Figma Screen 2)        */}
      {/* ============================================================== */}
      {activeTab === 'requests' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Header & Filter Ribbon */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                {isAr ? "طلبات الشراء واحتياجات المواقع (Procurement Requests)" : "Procurement Requests"}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {isAr ? "مراجعة متطلبات المهندسين الميدانيين والمطابقة مع الفائض الداخلي قبل الشراء الخارجي." : "Manage site requisitions, initiate RFQs, and auto-match against sister sites surplus."}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('create-rfq')}
                className="px-4 py-2 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{isAr ? "طرح طلب تسعير (RFQ)" : "Create RFQ"}</span>
              </button>
            </div>
          </div>

          {/* Search, Status Pills & Filter Strip */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            
            <div className="flex-1 max-w-md relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? "بحث بالمادة، كود الطلب، أو المشروع..." : "Search material, REQ code, project..."}
                className="w-full pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-hidden focus:border-[#E85312]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 cursor-pointer"
              >
                <option value="ALL">{isAr ? "جميع المشاريع" : "All Projects"}</option>
                <option value="Al-Mansoura Residential Complex">Al-Mansoura Residential Complex</option>
                <option value="New Capital Business Tower">New Capital Business Tower</option>
                <option value="Central Cairo Logistics Yard">Central Cairo Logistics Yard</option>
                <option value="Alexandria Waterfront Heights">Alexandria Waterfront Heights</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 cursor-pointer"
              >
                <option value="ALL">{isAr ? "جميع الحالات" : "All Statuses"}</option>
                <option value="Awaiting RFQ">Awaiting RFQ</option>
                <option value="3 Quotes Received">3 Quotes Received</option>
                <option value="PO Created">PO Created</option>
                <option value="Critical Shortage">Critical Shortage</option>
              </select>
            </div>
          </div>

          {/* Requisitions Table matching Screen 2 */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black uppercase text-slate-500">
                    <th className="py-3.5 px-4">{isAr ? "رقم الطلب (REQ)" : "Req Code"}</th>
                    <th className="py-3.5 px-4">{isAr ? "المادة والمواصفة الفنية" : "Material & Specs"}</th>
                    <th className="py-3.5 px-4 text-center">{isAr ? "الكمية المطلوبة" : "Quantity"}</th>
                    <th className="py-3.5 px-4">{isAr ? "المشروع والمهندس" : "Project Site"}</th>
                    <th className="py-3.5 px-4">{isAr ? "الموعد المطلوب بالموقع" : "Required Date"}</th>
                    <th className="py-3.5 px-4">{isAr ? "حالة الطلب" : "Status"}</th>
                    <th className="py-3.5 px-4 text-center">{isAr ? "الإجراء" : "Action"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRequisitions.map(req => (
                    <tr 
                      key={req.id}
                      onClick={() => {
                        setSelectedReqId(req.id);
                        setActiveTab('req-details');
                      }}
                      className="hover:bg-orange-50/40 transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-4 font-mono font-black text-[#E85312]">
                        {req.id}
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-900">{isAr ? req.materialAr : req.material}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{req.spec}</div>
                        {req.hasSurplusMatch && (
                          <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-black text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            <span>{isAr ? `تطابق فائض داخلي متاح (${req.surplusAvailableQty})` : `Internal surplus match: ${req.surplusAvailableQty}`}</span>
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center font-mono font-black text-slate-900">
                        {req.quantity} {req.unit}
                      </td>
                      <td className="py-4 px-4 text-slate-700">
                        <div className="font-bold">{isAr ? req.projectAr : req.project}</div>
                        <div className="text-[10px] text-slate-400">{req.requestedBy}</div>
                      </td>
                      <td className="py-4 px-4 font-mono text-slate-700">
                        {req.targetDate}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border inline-block ${
                          req.status === '3 Quotes Received'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : req.status === 'PO Created'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {isAr ? req.statusAr : req.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedReqId(req.id);
                            if (req.status === '3 Quotes Received') {
                              setActiveTab('compare-quotes');
                            } else {
                              setActiveTab('req-details');
                            }
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-[#0F172A] group-hover:bg-[#E85312] text-white font-bold text-xs transition-colors cursor-pointer"
                        >
                          {req.status === '3 Quotes Received' 
                            ? (isAr ? "مقارنة العروض" : "Compare Quotes") 
                            : (isAr ? "تفاصيل الطلب ←" : "View Details →")}
                        </button>
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
      {/* 4. SCREEN 3: REQUEST DETAILS (Figma Screen 3 - REQ-2026-0814)   */}
      {/* ============================================================== */}
      {activeTab === 'req-details' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Top Breadcrumb & Actions Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <button
              onClick={() => setActiveTab('requests')}
              className="text-xs font-bold text-slate-600 hover:text-[#E85312] flex items-center gap-1.5 cursor-pointer"
            >
              <span>←</span>
              <span>{isAr ? "العودة لقائمة طلبات الشراء" : "Back to Procurement Requests"}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('create-rfq')}
                className="px-4 py-2 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{isAr ? "طرح طلب تسعير لهذه المادة (Create RFQ)" : "Create RFQ for Item"}</span>
              </button>
            </div>
          </div>

          {/* Main Requisition Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            
            <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-sm font-black text-[#E85312] bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">
                    {activeRequisition.id}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    {isAr ? activeRequisition.statusAr : activeRequisition.status}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  {isAr ? activeRequisition.materialAr : activeRequisition.material}
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 font-medium">
                  <Building2 className="w-3.5 h-3.5 text-[#E85312]" />
                  <span>{isAr ? activeRequisition.projectAr : activeRequisition.project}</span>
                  <span>•</span>
                  <span>Requested by {activeRequisition.requestedBy}</span>
                </div>
              </div>

              <div className="text-right rtl:text-left">
                <span className="text-[11px] text-slate-400 font-bold block">{isAr ? "الكمية المطلوبة" : "Required Quantity"}</span>
                <span className="text-3xl font-black font-mono text-slate-900 mt-0.5 block">
                  {activeRequisition.quantity} <span className="text-base text-slate-500">{activeRequisition.unit}</span>
                </span>
              </div>
            </div>

            {/* SURPLUS CHECK ALERT BANNER (Matching Figma Section 06 Integration) */}
            {activeRequisition.hasSurplusMatch && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-black text-amber-950 text-sm">
                        {isAr ? "تم العثور على فائض مطابق في موقع شقيق بالشركة!" : "IRAM Smart Surplus Match Found!"}
                      </h4>
                      <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                        {isAr
                          ? `يمتلك موقع "${activeRequisition.surplusSourceSite}" رصيداً فائضاً معتمداً قدره ${activeRequisition.surplusAvailableQty} من نفس المواصفة الفنية. المناقلة الداخلية توفر على الشركة ما يقارب 180,000 ج.م وتختصر وقت التوريد لـ 24 ساعة فقط.`
                          : `Project "${activeRequisition.surplusSourceSite}" currently reports ${activeRequisition.surplusAvailableQty} of verified surplus matching ASTM A615 Grade 60. Internal transfer saves an estimated EGP 180,000 with next-day availability.`}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      showToast(isAr ? "تم تحويل طلب المناقلة الداخلية لفريق اللوجستيات والموافقة الفورية!" : "Internal surplus transfer request dispatched to logistics team!");
                      setActiveTab('requests');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-auto"
                  >
                    {isAr ? "بدء المناقلة الداخلية (وفر 180K)" : "Initiate Surplus Transfer (Save 180K)"}
                  </button>
                </div>
              </div>
            )}

            {/* 4 Detailed Specs Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">{isAr ? "الموعد الحرج بالموقع" : "Target Pour Date"}</span>
                <span className="text-base font-black font-mono text-slate-900 mt-1 block">{activeRequisition.targetDate}</span>
                <span className="text-[11px] text-rose-600 font-bold block mt-0.5">12 Days Remaining</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">{isAr ? "ساحة الاستلام المحددة" : "Staging Yard"}</span>
                <span className="text-base font-bold text-slate-900 mt-1 block">Central Cairo Yard (Bay 4)</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Offloading Crane Available</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">{isAr ? "المواصفة والكود الهندسي" : "Specification Code"}</span>
                <span className="text-base font-bold font-mono text-slate-900 mt-1 block">ASTM A615 / ES 262-2</span>
                <span className="text-[11px] text-emerald-700 font-bold block mt-0.5">Grade 60 High Tensile</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">{isAr ? "الميزانية المخصصة" : "Allocated Budget"}</span>
                <span className="text-base font-black font-mono text-emerald-700 mt-1 block">EGP 1,450,000</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">EGP 29,000 / Ton Cap</span>
              </div>
            </div>

            {/* Requisition Verification & Timeline Audit Trail */}
            <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                {isAr ? "سجل توثيق الطلب والموافقات" : "Requisition Audit Trail & Approval Log"}
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span><strong>{activeRequisition.date} 09:15 AM:</strong> Requisition raised by Site Engineer ({activeRequisition.requestedBy}) matched to BOQ Milestones.</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span><strong>{activeRequisition.date} 11:30 AM:</strong> Project Manager electronic verification & budget sign-off passed.</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span><strong>Current Status:</strong> Assigned to Procurement Operations for RFQ supplier invitations.</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* 5. SCREEN 4: COMPARE QUOTES MATRIX (Figma Screen 4)             */}
      {/* ============================================================== */}
      {activeTab === 'compare-quotes' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Header Card with Key Metrics */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black text-[#E85312] bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                    RFQ-2026-0042
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    3 Quotations Received
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1.5">
                  {isAr ? "مقارنة عروض أسعار: حديد تسليح عالي المقاومة 16 مم (50 طن)" : "RFQ-2026-0042: High Tensile Steel Rebar 16mm (50 Tons)"}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Destination: Al-Mansoura Residential Complex (Sector B4) • Target Pour Date: Nov 02, 2026
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  AI Auto-Scored: Complete
                </span>
              </div>
            </div>

            {/* 5 KPI Ribbon matching Screen 4 */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">{isAr ? "أعلى مطابقة AI" : "Match Score"}</span>
                <span className="text-xl sm:text-2xl font-black font-mono text-[#15803D] mt-1 block">98.4%</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">{isAr ? "المطابقة الفنية" : "Tech Compliance"}</span>
                <span className="text-xl sm:text-2xl font-black font-mono text-emerald-700 mt-1 block">100%</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">{isAr ? "التكلفة الواصلة" : "Landed Cost"}</span>
                <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 mt-1 block">28,200/T</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">{isAr ? "زمن التوريد" : "Lead Time"}</span>
                <span className="text-xl sm:text-2xl font-black font-mono text-[#E85312] mt-1 block">2 Days</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center col-span-2 sm:col-span-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">{isAr ? "تقييم الثقة" : "Supplier Trust"}</span>
                <span className="text-xl sm:text-2xl font-black font-mono text-amber-500 mt-1 block">4.9 / 5.0</span>
              </div>
            </div>
          </div>

          {/* OFFICIAL MULTI-CRITERIA DECISION MATRIX TABLE */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-base sm:text-lg font-black">
                  {isAr ? "مصفوفة مقارنة عروض الأسعار والمفاضلة الذكية" : "Multi-Criteria Supplier Evaluation Matrix"}
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-300">
                Weights: 40% Cost • 30% Schedule • 15% Quality MTC • 15% Credit Terms
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-xs font-black text-slate-900 border-b border-slate-200">
                    <th className="py-4 px-5 w-1/4 bg-slate-50">{isAr ? "معيار التقييم الفني والمالي" : "Evaluation Criteria"}</th>
                    {quotationsMatrix.map(q => (
                      <th 
                        key={q.id} 
                        className={`py-4 px-5 text-center ${q.isRecommended ? 'bg-orange-50/80 border-x-2 border-[#E85312]' : ''}`}
                      >
                        <div className="flex flex-col items-center gap-1">
                          {q.isRecommended && (
                            <span className="px-2.5 py-0.5 rounded-full bg-[#E85312] text-white text-[10px] font-black uppercase tracking-wider">
                              👑 AI Recommended Winner
                            </span>
                          )}
                          <span className="text-sm font-black text-slate-900">{isAr ? q.supplierAr : q.supplier}</span>
                          <span className="text-[10px] font-mono text-slate-400">{q.id} • Rating {q.rating}★</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  
                  {/* Row 1: Unit Price */}
                  <tr>
                    <td className="py-3.5 px-5 font-bold text-slate-600 bg-slate-50">{isAr ? "سعر الطن من أرض المصنع (FOB)" : "Unit Price (FOB)"}</td>
                    {quotationsMatrix.map(q => (
                      <td key={q.id} className={`py-3.5 px-5 text-center font-mono font-bold ${q.isRecommended ? 'bg-orange-50/40 border-x-2 border-[#E85312]' : ''}`}>
                        EGP {q.unitPrice.toLocaleString()}
                      </td>
                    ))}
                  </tr>

                  {/* Row 2: Landed Total */}
                  <tr className="bg-slate-50/50">
                    <td className="py-3.5 px-5 font-bold text-slate-900 bg-slate-100/70">{isAr ? "التكلفة الإجمالية الواصلة للموقع" : "Total Landed Cost (50 Tons)"}</td>
                    {quotationsMatrix.map(q => (
                      <td key={q.id} className={`py-3.5 px-5 text-center font-mono font-black text-sm ${q.isRecommended ? 'text-[#E85312] bg-orange-50/60 border-x-2 border-[#E85312]' : 'text-slate-900'}`}>
                        EGP {q.totalLandedEgp.toLocaleString()}
                      </td>
                    ))}
                  </tr>

                  {/* Row 3: Freight Cost */}
                  <tr>
                    <td className="py-3.5 px-5 font-bold text-slate-600 bg-slate-50">{isAr ? "تكلفة الشحن والتعتيق بالرافعة" : "Freight & Offloading"}</td>
                    {quotationsMatrix.map(q => (
                      <td key={q.id} className={`py-3.5 px-5 text-center font-mono text-slate-600 ${q.isRecommended ? 'bg-orange-50/40 border-x-2 border-[#E85312]' : ''}`}>
                        EGP {q.deliveryCost.toLocaleString()}
                      </td>
                    ))}
                  </tr>

                  {/* Row 4: Lead Time */}
                  <tr className="bg-slate-50/50">
                    <td className="py-3.5 px-5 font-bold text-slate-600 bg-slate-100/70">{isAr ? "موعد الوصول للموقع" : "Arrival & Schedule"}</td>
                    {quotationsMatrix.map(q => (
                      <td key={q.id} className={`py-3.5 px-5 text-center font-bold ${q.isRecommended ? 'text-emerald-700 bg-orange-50/40 border-x-2 border-[#E85312]' : q.leadTimeDays > 3 ? 'text-rose-600' : 'text-slate-700'}`}>
                        {q.deliveryTime}
                      </td>
                    ))}
                  </tr>

                  {/* Row 5: Quality MTC */}
                  <tr>
                    <td className="py-3.5 px-5 font-bold text-slate-600 bg-slate-50">{isAr ? "شهادة الجودة المعملية (MTC)" : "Mill Test Certificate (MTC)"}</td>
                    {quotationsMatrix.map(q => (
                      <td key={q.id} className={`py-3.5 px-5 text-center ${q.isRecommended ? 'bg-orange-50/40 border-x-2 border-[#E85312]' : ''}`}>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{q.qualityStandard}</span>
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Row 6: Payment Terms */}
                  <tr className="bg-slate-50/50">
                    <td className="py-3.5 px-5 font-bold text-slate-600 bg-slate-100/70">{isAr ? "شروط وتسهيلات السداد" : "Payment Terms"}</td>
                    {quotationsMatrix.map(q => (
                      <td key={q.id} className={`py-3.5 px-5 text-center font-semibold ${q.isRecommended ? 'text-emerald-800 bg-orange-50/40 border-x-2 border-[#E85312]' : 'text-slate-600'}`}>
                        {q.paymentTerms}
                      </td>
                    ))}
                  </tr>

                  {/* Row 7: AI Score */}
                  <tr className="bg-slate-100">
                    <td className="py-4 px-5 font-black text-slate-900 bg-slate-200/80">{isAr ? "الدرجة الكلية للذكاء الاصطناعي" : "Final AI Multi-Criteria Score"}</td>
                    {quotationsMatrix.map(q => (
                      <td key={q.id} className={`py-4 px-5 text-center font-mono font-black text-base ${q.isRecommended ? 'text-[#E85312] bg-orange-100/90 border-x-2 border-[#E85312]' : 'text-slate-700'}`}>
                        {q.aiScore}%
                      </td>
                    ))}
                  </tr>

                  {/* Row 8: Actions */}
                  <tr>
                    <td className="py-4 px-5 font-bold text-slate-600 bg-slate-50">{isAr ? "قرار الترسية" : "Award Decision"}</td>
                    {quotationsMatrix.map(q => (
                      <td key={q.id} className={`py-4 px-5 text-center ${q.isRecommended ? 'bg-orange-50/40 border-x-2 border-[#E85312]' : ''}`}>
                        <button
                          onClick={() => handleConfirmAwardAndGeneratePo(q)}
                          className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-xs ${
                            q.isRecommended
                              ? 'bg-[#E85312] hover:bg-[#CC490F] text-white shadow-md'
                              : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {q.isRecommended 
                            ? (isAr ? "اعتماد وإصدار PO ←" : "Award PO Now →")
                            : (isAr ? "اختيار وترسية" : "Select Award")}
                        </button>
                      </td>
                    ))}
                  </tr>

                </tbody>
              </table>
            </div>

            {/* AI Award Directive Box */}
            <div className="p-6 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border-t-2 border-[#E85312] flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E85312]"></span>
                  <span className="text-xs font-black uppercase text-[#E85312]">
                    {isAr ? "توصية نظام إرم الذكي المعتمدة" : "Official Procurement Decision Summary"}
                  </span>
                </div>
                <h4 className="text-base font-black text-slate-900">
                  {isAr ? "يوصى بترسية العرض على مصانع حديد عز مصر (Ezz Steel Mills Egypt)" : "Recommended Award: Ezz Steel Mills Egypt (QT-8801)"}
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {isAr 
                    ? "يحقق أعلى درجة كفاءة إجمالية (98.4%)، مع ضمان التسليم الفعلي قبل موعد صب السقف بـ 24 ساعة، وتوفير 25,000 ج.م عن سقف الميزانية مع سداد آجل 30 يوماً."
                    : "Achieves optimal composite score (98.4%), guarantees site arrival 24 hours prior to structural pour milestone, saves EGP 25,000 vs budget ceiling, and preserves liquidity with Net 30 terms."}
                </p>
              </div>

              <button
                onClick={() => handleConfirmAwardAndGeneratePo(quotationsMatrix[0])}
                className="px-8 py-3.5 rounded-xl bg-[#E85312] hover:bg-[#CC490F] text-white font-black text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer shrink-0"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isAr ? "اعتماد الترسية وإصدار أمر الشراء (PO)" : "Confirm Award & Generate PO"}</span>
              </button>
            </div>

          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* 6. SCREEN 5: CREATE RFQ FORM (Figma Screen 5)                  */}
      {/* ============================================================== */}
      {activeTab === 'create-rfq' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs max-w-4xl mx-auto space-y-6">
            
            <div className="border-b border-slate-100 pb-5">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {isAr ? "طرح طلب تسعير جديد (Create Request for Quotation - RFQ)" : "Create Request for Quotation (RFQ)"}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {isAr ? "حدد المواصفات الفنية والشروط التجارية لدعوة الموردين المعتمدين وتلقي عروضهم آلياً." : "Specify technical standards, delivery dates, and select verified suppliers to invite."}
              </p>
            </div>

            <form onSubmit={handlePublishRfq} className="space-y-6 text-xs">
              
              {/* Section 1: Item & Specifications */}
              <div className="space-y-4">
                <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#E85312]/10 text-[#E85312] flex items-center justify-center text-[10px]">1</span>
                  <span>{isAr ? "المادة والمواصفة الفنية المطلوبة" : "Material & Technical Specifications"}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1.5">{isAr ? "اسم المادة القياسي *" : "Material Name & Grade *"}</label>
                    <input
                      type="text"
                      required
                      value={rfqMaterial}
                      onChange={(e) => setRfqMaterial(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:border-[#E85312]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">{isAr ? "الكمية المطلوبة *" : "Required Quantity *"}</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={rfqQuantity}
                      onChange={(e) => setRfqQuantity(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">{isAr ? "وحدة القياس *" : "Unit of Measure *"}</label>
                    <select
                      value={rfqUnit}
                      onChange={(e) => setRfqUnit(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                    >
                      <option value="Tons">Tons (طن)</option>
                      <option value="Bags">Bags (شكائر)</option>
                      <option value="m³">m³ (متر مكعب)</option>
                      <option value="Meters">Meters (متر طولي)</option>
                      <option value="Sheets">Sheets (ألواح)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Project Destination & Schedule */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#E85312]/10 text-[#E85312] flex items-center justify-center text-[10px]">2</span>
                  <span>{isAr ? "المشروع وموقع التسليم والجدول الزمني" : "Project Destination & Timeline"}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">{isAr ? "المشروع المستلم *" : "Target Project *"}</label>
                    <select
                      value={rfqProject}
                      onChange={(e) => setRfqProject(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                    >
                      <option value="Al-Mansoura Residential Complex">Al-Mansoura Residential Complex</option>
                      <option value="New Capital Business Tower">New Capital Business Tower</option>
                      <option value="Central Cairo Logistics Yard">Central Cairo Logistics Yard</option>
                      <option value="Alexandria Waterfront Heights">Alexandria Waterfront Heights</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">{isAr ? "الموعد الحرج للوصول *" : "Delivery Deadline (Site Pour) *"}</label>
                    <input
                      type="date"
                      required
                      value={rfqTargetDate}
                      onChange={(e) => setRfqTargetDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-900"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1.5">{isAr ? "ساحة التشوين بالموقع وتسهيلات التفريغ" : "Site Staging Yard & Offloading"}</label>
                    <input
                      type="text"
                      value={rfqDeliveryYard}
                      onChange={(e) => setRfqDeliveryYard(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Suppliers Selection */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#E85312]/10 text-[#E85312] flex items-center justify-center text-[10px]">3</span>
                  <span>{isAr ? "اختيار الموردين لدعوتهم تلقائياً" : "Select Qualified Suppliers to Invite"}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['Ezz Steel Mills Egypt', 'Suez Steel Industry', 'Al-Ashry Steel Group', 'Beshay Steel', 'Egyptian Steel Group', 'Delta Steel Mills'].map(sup => (
                    <label key={sup} className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white cursor-pointer transition-all">
                      <input
                        type="checkbox"
                        checked={selectedSuppliersToInvite.includes(sup)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSuppliersToInvite([...selectedSuppliersToInvite, sup]);
                          } else {
                            setSelectedSuppliersToInvite(selectedSuppliersToInvite.filter(s => s !== sup));
                          }
                        }}
                        className="text-[#E85312] focus:ring-[#E85312] rounded cursor-pointer"
                      />
                      <span className="font-bold text-slate-800 text-[11px]">{sup}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('requests')}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  {isAr ? "إلغاء" : "Cancel"}
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#E85312] hover:bg-[#CC490F] text-white font-bold shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isAr ? "طرح الـ RFQ وإرسال الدعوات" : "Publish RFQ & Invite Suppliers"}</span>
                </button>
              </div>

            </form>

          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* 7. SCREEN 6 & 7: PURCHASE ORDERS LIST & DOCUMENT (Figma 7 & 8)  */}
      {/* ============================================================== */}
      {activeTab === 'purchase-orders' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Top PO Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">{isAr ? "إجمالي أوامر الشراء" : "Total Purchase Orders"}</span>
              <div className="text-3xl font-black text-slate-900 mt-1">{purchaseOrders.length}</div>
              <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">Across 4 Active Projects</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">{isAr ? "قيد التجهيز بالمصنع" : "In Production"}</span>
              <div className="text-3xl font-black text-amber-600 mt-1">1</div>
              <span className="text-[10px] text-amber-700 font-bold mt-0.5 block">Batch QA Inspection Passed</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">{isAr ? "في الطريق للموقع" : "In-Transit (GPS)"}</span>
              <div className="text-3xl font-black text-blue-600 mt-1">1</div>
              <span className="text-[10px] text-blue-700 font-bold mt-0.5 block">Arrival within 4 hours</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">{isAr ? "تم الاستلام والفحص" : "Delivered & Inspected"}</span>
              <div className="text-3xl font-black text-emerald-600 mt-1">1</div>
              <span className="text-[10px] text-emerald-700 font-bold mt-0.5 block">GRN Stamped & Archived</span>
            </div>
          </div>

          {/* PO Table matching Screen 8 */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-black text-slate-900 text-base">
                  {isAr ? "سجل أوامر الشراء الرسمية المعتمدة" : "Official Purchase Orders Registry"}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Synchronized with ERP and Field Warehouse Goods Receiving Notes (GRN)
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-black uppercase text-slate-500 border-b border-slate-200">
                    <th className="py-3.5 px-4">{isAr ? "رقم أمر الشراء (PO)" : "PO Code"}</th>
                    <th className="py-3.5 px-4">{isAr ? "المورد المعتمد" : "Vendor"}</th>
                    <th className="py-3.5 px-4">{isAr ? "المشروع وساحة التشوين" : "Project Destination"}</th>
                    <th className="py-3.5 px-4 text-center">{isAr ? "القيمة الإجمالية" : "Total Landed"}</th>
                    <th className="py-3.5 px-4">{isAr ? "تاريخ الإصدار" : "Issue Date"}</th>
                    <th className="py-3.5 px-4">{isAr ? "حالة الشحنة" : "Delivery Status"}</th>
                    <th className="py-3.5 px-4 text-center">{isAr ? "الإجراء" : "Action"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {purchaseOrders.map(po => (
                    <tr 
                      key={po.poNumber}
                      onClick={() => {
                        setSelectedPoId(po.poNumber);
                        setActiveTab('po-details');
                      }}
                      className="hover:bg-orange-50/30 transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-4 font-mono font-black text-[#E85312]">
                        {po.poNumber}
                      </td>
                      <td className="py-4 px-4 font-bold text-slate-900">
                        <div>{isAr ? po.supplierNameAr : po.supplierName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{po.vendorId}</div>
                      </td>
                      <td className="py-4 px-4 text-slate-700">
                        <div className="font-bold">{isAr ? po.projectAr : po.project}</div>
                        <div className="text-[10px] text-slate-500">{isAr ? po.stagingBayAr : po.stagingBay}</div>
                      </td>
                      <td className="py-4 px-4 text-center font-mono font-black text-emerald-800 text-sm">
                        {po.totalAmountEgp}
                      </td>
                      <td className="py-4 px-4 font-mono text-slate-600">
                        {po.issueDate}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border inline-block ${po.statusBadge}`}>
                          {isAr ? po.statusAr : po.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPoId(po.poNumber);
                            setActiveTab('po-details');
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-[#0F172A] group-hover:bg-[#E85312] text-white font-bold text-xs transition-colors cursor-pointer"
                        >
                          {isAr ? "عرض الوثيقة" : "View PO"}
                        </button>
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
      {/* 8. SCREEN 7 (Drill-down): OFFICIAL PO DOCUMENT (Figma Screen 7) */}
      {/* ============================================================== */}
      {activeTab === 'po-details' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <button
              onClick={() => setActiveTab('purchase-orders')}
              className="text-xs font-bold text-slate-600 hover:text-[#E85312] flex items-center gap-1.5 cursor-pointer"
            >
              <span>←</span>
              <span>{isAr ? "العودة إلى سجل أوامر الشراء" : "Back to Purchase Orders"}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => showToast(isAr ? `تم تنزيل نسخة الـ PDF الرسمية لأمر الشراء ${activePo.poNumber}` : `Official PO ${activePo.poNumber} PDF exported!`)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>{isAr ? "تحميل أمر الشراء PDF" : "Export Official PDF"}</span>
              </button>

              <button
                onClick={() => showToast(isAr ? `تتبع الشاحنة: لوحة ${activePo.plateNumber} للسائق ${activePo.driverName} - الوصول المتوقع: ${activePo.deliveryETA}` : `Tracking vehicle ${activePo.plateNumber} (ETA: ${activePo.deliveryETA})`)}
                className="px-4 py-2 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Truck className="w-4 h-4" />
                <span>{isAr ? "تتبع الشحنة الميداني" : "Track Delivery GPS"}</span>
              </button>
            </div>
          </div>

          {/* OFFICIAL PURCHASE ORDER DOCUMENT */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 space-y-8 relative">
            
            {/* Document Header */}
            <div className="flex flex-wrap items-start justify-between gap-6 pb-6 border-b border-slate-200">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#E85312]"></span>
                  <span className="font-mono text-xs font-black uppercase text-[#E85312]">IRAM OFFICIAL PURCHASE ORDER</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                  {activePo.poNumber}
                </h2>
                <div className="text-xs text-slate-500 font-mono">
                  Ref RFQ: <strong>{activePo.rfqRef}</strong> • Req Ref: <strong>{activePo.reqRef}</strong> • Date Issued: <strong>{activePo.issueDate}</strong>
                </div>
              </div>

              <div className="text-right rtl:text-left space-y-1">
                <span className={`px-3 py-1 rounded-full text-xs font-black border inline-block ${activePo.statusBadge}`}>
                  {isAr ? activePo.statusAr : activePo.status}
                </span>
                <div className="text-xs font-mono text-slate-400">Digitally Verified & Signed</div>
              </div>
            </div>

            {/* Buyer vs Vendor Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5 text-xs">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                  {isAr ? "المشتري (المقاول الرئيسي):" : "BUYER / MAIN CONTRACTOR:"}
                </span>
                <h4 className="font-black text-slate-900 text-sm">
                  {isAr ? "شركة السويدي للتطوير والمقاولات" : "El-Sewedy Construction & Contracting"}
                </h4>
                <div className="text-slate-600">CR: <strong>1010482910</strong> • Tax ID: <strong>300489214700003</strong></div>
                <div className="text-slate-600">Project: <strong>{isAr ? activePo.projectAr : activePo.project}</strong></div>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5 text-xs">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                  {isAr ? "المورد المعتمد (الطرف الثاني):" : "AWARDED VENDOR / SUPPLIER:"}
                </span>
                <h4 className="font-black text-slate-900 text-sm">
                  {isAr ? activePo.supplierNameAr : activePo.supplierName}
                </h4>
                <div className="text-slate-600">Vendor ID: <strong className="font-mono text-[#E85312]">{activePo.vendorId}</strong></div>
                <div className="text-slate-600">Payment: <strong>{activePo.paymentTerms}</strong></div>
              </div>
            </div>

            {/* Destination & Offloading Site */}
            <div className="p-5 bg-orange-50/50 rounded-2xl border border-orange-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-500 font-bold block">{isAr ? "موقع التسليم المعتمد:" : "Delivery Destination Site:"}</span>
                <strong className="text-slate-900 mt-0.5 block">{isAr ? activePo.projectAr : activePo.project}</strong>
              </div>
              <div>
                <span className="text-slate-500 font-bold block">{isAr ? "ساحة التشوين بالموقع:" : "Assigned Staging Bay:"}</span>
                <strong className="text-[#E85312] mt-0.5 block">{isAr ? activePo.stagingBayAr : activePo.stagingBay}</strong>
              </div>
              <div>
                <span className="text-slate-500 font-bold block">{isAr ? "الموعد الأقصى للتسليم:" : "Target Delivery Deadline:"}</span>
                <strong className="text-slate-900 mt-0.5 block">{activePo.deliveryTargetDate}</strong>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                {isAr ? "بيان المواد والكميات المعتمدة" : "Material Line Items & Value"}
              </h4>
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left rtl:text-right border-collapse text-xs">
                  <thead className="bg-slate-100 text-[11px] font-black text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">#</th>
                      <th className="py-3 px-4">{isAr ? "الوصف الفني للمادة" : "Technical Description"}</th>
                      <th className="py-3 px-4 text-center">{isAr ? "الكمية" : "Quantity"}</th>
                      <th className="py-3 px-4 text-center">{isAr ? "سعر الوحدة" : "Unit Price"}</th>
                      <th className="py-3 px-4 text-right rtl:text-left">{isAr ? "الإجمالي" : "Total Amount"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-400">01</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        <div>{isAr ? activePo.materialDescriptionAr : activePo.materialDescription}</div>
                        <div className="text-[10px] text-slate-400 font-mono">ASTM A615 / ES 262-2 Verified MTC</div>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-bold">{activePo.quantity}</td>
                      <td className="py-3.5 px-4 text-center font-mono">{activePo.unitPrice}</td>
                      <td className="py-3.5 px-4 text-right rtl:text-left font-mono font-black text-slate-900">
                        {activePo.totalAmountEgp}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono font-bold text-slate-400">02</td>
                      <td className="py-3 px-4 text-slate-700">
                        {isAr ? "تكلفة الشحن والتفريغ بالرافعة في ساحة التشوين 4" : "Heavy Freight Transport & Crane Staging Placement"}
                      </td>
                      <td className="py-3 px-4 text-center font-mono">1 Lot</td>
                      <td className="py-3 px-4 text-center font-mono">{activePo.freightCost}</td>
                      <td className="py-3 px-4 text-right rtl:text-left font-mono font-bold text-slate-700">
                        {activePo.freightCost}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-slate-50 font-black text-slate-900 border-t border-slate-200">
                    <tr>
                      <td colSpan={4} className="py-4 px-4 text-right rtl:text-left text-sm">
                        {isAr ? "الإجمالي الصافي لأمر الشراء (Landed Total):" : "Total Landed Purchase Order Value:"}
                      </td>
                      <td className="py-4 px-4 text-right rtl:text-left font-mono text-xl text-[#E85312]">
                        {activePo.totalAmountEgp}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Signatures Strip */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-500">
              <div>
                <span className="block text-[10px] text-slate-400 font-bold">{isAr ? "مسؤول المشتريات:" : "Procurement Officer:"}</span>
                <span className="font-bold text-slate-800 block mt-1">Eng. Tarek Mahmoud</span>
                <span className="text-[10px] font-mono text-emerald-600">✓ Digital Signature Verified</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 font-bold">{isAr ? "الاعتماد المالي:" : "Finance Approval:"}</span>
                <span className="font-bold text-slate-800 block mt-1">Hassan El-Ghandour</span>
                <span className="text-[10px] font-mono text-emerald-600">✓ Budget Allocation Passed</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 font-bold">{isAr ? "تأكيد المصنع والمورد:" : "Vendor Acceptance:"}</span>
                <span className="font-bold text-slate-800 block mt-1">{isAr ? activePo.supplierNameAr : activePo.supplierName}</span>
                <span className="text-[10px] font-mono text-blue-600">✓ In Production (Batch #941)</span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* 9. SCREEN 8: MATERIALS & SUPPLIERS CATALOG (Figma Screen 9)     */}
      {/* ============================================================== */}
      {activeTab === 'materials-catalog' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                {isAr ? "دليل المواد والموردين المعتمدين (Master Catalog)" : "Materials & Preferred Suppliers Catalog"}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Standardized construction specifications with benchmark market pricing and pre-qualified suppliers.
              </p>
            </div>

            <button
              onClick={() => showToast(isAr ? "تم تحديث أسعار الكتالوج المرجعية من مؤشرات البورصة والأسواق!" : "Catalog prices synchronized with current market benchmarks!")}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:border-[#E85312] text-xs font-bold text-slate-700 hover:text-[#E85312] transition-colors cursor-pointer"
            >
              {isAr ? "تحديث الأسعار المرجعية" : "Sync Market Rates"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {catalogMaterials.map(mat => (
              <div 
                key={mat.sku}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-[#E85312] hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] font-bold text-slate-400">{mat.sku}</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px]">
                      {mat.category}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900 mt-2">
                    {isAr ? mat.nameAr : mat.nameEn}
                  </h3>

                  <div className="text-xs text-slate-500 mt-1">
                    Standard: <strong className="text-slate-800 font-mono">{mat.spec}</strong>
                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">{isAr ? "السعر المرجعي:" : "Benchmark Price:"}</span>
                      <strong className="font-mono font-black text-[#E85312] text-sm">{mat.referencePrice} / {mat.unit}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">{isAr ? "المورد الموصى به:" : "Preferred Supplier:"}</span>
                      <strong className="text-slate-800">{mat.preferredSupplier}</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">{isAr ? "متوسط التوريد:" : "Avg Lead Time:"}</span>
                      <span className="text-emerald-700 font-bold">{mat.leadTimeDays}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setRfqMaterial(`${mat.nameEn} (${mat.sku})`);
                    setActiveTab('create-rfq');
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-900 group-hover:bg-[#E85312] text-white font-bold text-xs transition-colors cursor-pointer text-center"
                >
                  {isAr ? "طرح طلب تسعير لهذه المادة" : "Initiate RFQ for Material"}
                </button>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* 10. SCREEN 9: MY ACCOUNT / PROFILE (Figma Screen 10)           */}
      {/* ============================================================== */}
      {activeTab === 'my-account' && (
        <div className="space-y-6 animate-in fade-in duration-150 max-w-4xl mx-auto">
          
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
              <div className="w-16 h-16 rounded-2xl bg-[#E85312] text-white font-black text-2xl flex items-center justify-center shadow-md">
                TM
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Eng. Tarek Mahmoud
                </h2>
                <div className="text-xs text-slate-500 font-bold">
                  {isAr ? "رئيس قسم المشتريات والعقود • شركة السويدي للمقاولات" : "Procurement Operations Lead • El-Sewedy Construction"}
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-emerald-700 font-bold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Authorized PO Signatory (Level 3 - Up to EGP 5,000,000)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Email Address</span>
                <strong className="text-slate-900 block font-mono">tarek.mahmoud@elsewedy.com</strong>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Direct Mobile</span>
                <strong className="text-slate-900 block font-mono">+20 100 892 4192</strong>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Assigned Projects</span>
                <strong className="text-slate-900 block">4 Enterprise Sites in Greater Cairo & Delta</strong>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 font-bold uppercase text-[10px]">ERP Integration Key</span>
                <strong className="text-[#E85312] block font-mono">SAP-CONTECH-IRAM-0982</strong>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">IRAM ConTech Platform Version 2.0.0</span>
              <button 
                onClick={() => showToast(isAr ? "تم حفظ إعدادات الحساب والتوقيع الرقمي بنجاح!" : "Profile & Digital Signature preferences updated!")}
                className="px-5 py-2.5 rounded-xl bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-xs shadow-xs cursor-pointer"
              >
                {isAr ? "حفظ التفضيلات والتوقيع" : "Save Preferences & Signature"}
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
