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
  FileCheck
} from 'lucide-react';

export default function ProcurementView({ onBack, language }) {
  const isAr = language === 'ar';

  // Sub-view flow matching Figma Board:
  // 'worklist' | 'rfq-details' | 'comparison' | 'po-list' | 'po-details'
  const [activeSubView, setActiveSubView] = useState('worklist');

  // Selected entities for drill-down
  const [activeRfqId, setActiveRfqId] = useState('RFQ-2026-0042');
  const [activePoId, setActivePoId] = useState('PO-2026-0418');

  // Filter state in Worklist
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Decision Modal State
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [targetQuoteForAction, setTargetQuoteForAction] = useState(null);
  const [contractorDecision, setContractorDecision] = useState('Accepted - PO Issued');
  const [feedbackNote, setFeedbackNote] = useState('');

  // RFQ Database matching Figma
  const [rfqsList, setRfqsList] = useState([
    {
      id: "RFQ-2026-0042",
      projectName: "Al-Mansoura Residential Complex",
      projectNameAr: "كمبوند المنصورة السكني (Sector B4)",
      material: "High Tensile Steel Rebar 16mm (ASTM A615)",
      materialAr: "حديد تسليح عالي المقاومة 16 مم (Grade 60)",
      category: "steel",
      quantity: "50 Tons",
      allocatedBudget: "$48,000",
      deliveryTargetDate: "Nov 02, 2026",
      milestone: "Critical Slab Pour (سقف الدور الرابع - B4)",
      status: "3 Quotations Received",
      statusAr: "3 عروض أسعار مستلمة (جاهز للتقييم)",
      statusBadge: "bg-blue-50 text-blue-700 border-blue-200",
      urgency: "high",
      createdAt: "2026-10-18",
      quotationsCount: 3,
      aiBestScore: 98.4,
      aiRecommendation: {
        winnerSupplier: "Ezz Steel Mills Egypt",
        winnerSupplierAr: "مصانع حديد عز مصر",
        matchScore: "98.4%",
        techCompliance: "100%",
        landedCost: "$920 / Ton ($47,000 Total)",
        deliveryLeadTime: "2 Days (Arrival: Nov 01)",
        aiRating: "4.9 / 5.0",
        summaryAr: "العرض الفائز الموصى به: يضمن التوريد قبل موعد صب السقف بيوم كامل، معتمد بشهادة فحص معملية (MTC) بنسبة 100%، وسداد آجل 30 يوماً يوفر $1,000 عن ميزانية المشروع.",
        summaryEn: "Optimal proposal: 100% ASTM technical compliance, arrives 24h ahead of pour date, 30-day deferred payment."
      },
      quotations: [
        {
          id: "QT-8801",
          supplier: "Ezz Steel Mills Egypt",
          supplierAr: "مصانع حديد عز مصر",
          unitPrice: "$920 / Ton",
          deliveryCost: "$1,000",
          totalLanded: "$47,000",
          deliveryTime: "2 Days (Nov 01)",
          leadTimeDays: 2,
          qualityStandard: "ASTM A615 Grade 60 (Certified MTC)",
          paymentTerms: "Net 30 Days (Deferred)",
          slaScore: "99.2%",
          rating: 4.9,
          aiScore: 98.4,
          isRecommended: true,
          status: "Recommended",
          pros: [
            isAr ? "وصول مؤكد قبل موعد صب السقف بـ 24 ساعة" : "Guaranteed delivery 24h prior to pour",
            isAr ? "شهادة فحص معملية MTC معتمدة من استشاري المشروع" : "Verified consultant-approved MTC",
            isAr ? "سداد آجل 30 يوماً يحفظ سيولة المشروع" : "Net 30 deferred payment terms"
          ],
          cons: [
            isAr ? "سعر النقل ثابت بدون خصم كميات إضافية" : "Fixed freight rate"
          ]
        },
        {
          id: "QT-8802",
          supplier: "Suez Steel Industry",
          supplierAr: "شركة السويس للصلب",
          unitPrice: "$945 / Ton",
          deliveryCost: "$850",
          totalLanded: "$48,100",
          deliveryTime: "1 Day (Nov 01)",
          leadTimeDays: 1,
          qualityStandard: "ISO 9001 / ES 262-2",
          paymentTerms: "Cash on Delivery (COD)",
          slaScore: "94.0%",
          rating: 4.6,
          aiScore: 88.5,
          isRecommended: false,
          status: "Under Review",
          pros: [
            isAr ? "شحن فوري سريع خلال 24 ساعة" : "24-hour rapid fulfillment"
          ],
          cons: [
            isAr ? "أعلى تكلفة إجمالية واصلة للموقع" : "$1,100 higher than optimal quote",
            isAr ? "سداد نقدي عند الاستلام يضغط السيولة" : "Strict Cash On Delivery terms"
          ]
        },
        {
          id: "QT-8803",
          supplier: "Al-Ashry Steel Group",
          supplierAr: "مجموعة العشري للصلب",
          unitPrice: "$890 / Ton",
          deliveryCost: "$1,600",
          totalLanded: "$46,100",
          deliveryTime: "5 Days (Nov 05 - DELAY)",
          leadTimeDays: 5,
          qualityStandard: "Commercial Quality Warranty",
          paymentTerms: "50% Advance, 50% on Delivery",
          slaScore: "87.5%",
          rating: 4.2,
          aiScore: 74.0,
          isRecommended: false,
          status: "Delayed Risk",
          pros: [
            isAr ? "أقل سعر اسمي للطن ($890)" : "Lowest nominal unit price"
          ],
          cons: [
            isAr ? "خطر حرج: يتأخر 3 أيام بعد موعد الصب الإنشائي الحرج" : "Critical schedule delay past pour date",
            isAr ? "تكلفة النقل مرتفعة وتتطلب دفعة مقدمة 50%" : "50% upfront payment demanded"
          ]
        }
      ]
    },
    {
      id: "RFQ-2026-0081",
      projectName: "Alexandria Waterfront Heights",
      projectNameAr: "أبراج كورنيش الإسكندرية (San Stefano)",
      material: "Sulfate Resistant Portland Cement 42.5N (CEM I)",
      materialAr: "أسمنت بورتلاندي مقاوم للكبريتات 42.5N (شيكارة 50كجم)",
      category: "cement",
      quantity: "800 Bags (40 Tons)",
      allocatedBudget: "$5,400",
      deliveryTargetDate: "Oct 29, 2026",
      milestone: "Basement Waterproof Retaining Wall",
      status: "3 Quotations Received",
      statusAr: "3 عروض أسعار مستلمة (جاهز للتقييم)",
      statusBadge: "bg-blue-50 text-blue-700 border-blue-200",
      urgency: "high",
      createdAt: "2026-10-17",
      quotationsCount: 3,
      aiBestScore: 95.8,
      aiRecommendation: {
        winnerSupplier: "Misr Beni Suef Cement Co.",
        winnerSupplierAr: "شركة مصر بني سويف للأسمنت",
        matchScore: "95.8%",
        techCompliance: "100%",
        landedCost: "$6.45 / Bag ($5,160 Total)",
        deliveryLeadTime: "2 Days (Oct 28)",
        aiRating: "4.8 / 5.0",
        summaryAr: "أفضل تكلفة واصلة للموقع مع ضمان الوفاء بصب الحائط الساند المقاوم للكبريتات وتوفير $240 عن الميزانية.",
        summaryEn: "Lowest landed cost strictly honoring urgent waterproof pour milestone."
      },
      quotations: []
    },
    {
      id: "RFQ-2026-0092",
      projectName: "New Capital Business Tower",
      projectNameAr: "برج الأعمال - العاصمة الإدارية (CBD Plot 12)",
      material: "High Tensile Steel Rebar 12mm & 10mm",
      materialAr: "حديد تسليح 12 مم و 10 مم عالي الإجهاد",
      category: "steel",
      quantity: "120 Tons",
      allocatedBudget: "$115,000",
      deliveryTargetDate: "Nov 05, 2026",
      milestone: "Core Wall Shear Reinforcement",
      status: "Open for Suppliers",
      statusAr: "مفتوح لاستقبال العروض",
      statusBadge: "bg-amber-50 text-amber-700 border-amber-200",
      urgency: "medium",
      createdAt: "2026-10-18",
      quotationsCount: 2,
      aiBestScore: 92.0,
      aiRecommendation: null,
      quotations: []
    },
    {
      id: "RFQ-2026-0101",
      projectName: "Sadat City Industrial Logistics Park",
      projectNameAr: "المنطقة اللوجستية بمدينة السادات",
      material: "Ductile Iron Infrastructure Pipes 400mm (Class C40)",
      materialAr: "مواسير مياه زهر مرن 400 مم فئة C40",
      category: "infrastructure",
      quantity: "240 Meters",
      allocatedBudget: "$29,000",
      deliveryTargetDate: "Nov 10, 2026",
      milestone: "Main Stormwater Drainage Line",
      status: "PO Awarded",
      statusAr: "تمت الترسية وإصدار أمر الشراء",
      statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-200",
      urgency: "normal",
      createdAt: "2026-10-14",
      quotationsCount: 4,
      aiBestScore: 97.0,
      aiRecommendation: null,
      quotations: []
    }
  ]);

  // Purchase Orders Database matching Figma Screen 4 & 5
  const [purchaseOrders, setPurchaseOrders] = useState([
    {
      poNumber: "PO-2026-0418",
      rfqRef: "RFQ-2026-0042",
      supplierName: "Ezz Steel Mills Egypt",
      supplierNameAr: "مصانع حديد عز مصر",
      vendorId: "VND-2026-EZ",
      project: "Al-Mansoura Residential Complex",
      projectAr: "كمبوند المنصورة السكني (Sector B4)",
      stagingBay: "Staging Bay 4 (West Gate)",
      stagingBayAr: "ساحة تشوين رقم 4 (البوابة الغربية)",
      materialDescription: "High Tensile Deformed Steel Rebar 16mm (ASTM A615 Grade 60)",
      materialDescriptionAr: "حديد تسليح عالي المقاومة 16 مم (Grade 60 مشرشر)",
      quantity: "50.00 Tons",
      unitPrice: "$920.00 / Ton",
      freightCost: "$1,000.00",
      totalAmount: "$47,000.00",
      issueDate: "Oct 19, 2026",
      deliveryTargetDate: "Nov 01, 2026",
      status: "Approved & Sent to Vendor",
      statusAr: "معتمد ومُرسل للمورد • قيد التجهيز بالمصنع",
      statusBadge: "bg-emerald-50 text-emerald-800 border-emerald-300",
      paymentTerms: "Net 30 Days Credit (Deferred)",
      qcChecklist: [
        { label: "Mill Test Certificate (MTC) attached", pass: true },
        { label: "Heat number embossing verified", pass: true },
        { label: "Tensile & yield strength certified ASTM A615", pass: true },
        { label: "Site gate weighbridge OCR check mandatory", pass: true }
      ]
    },
    {
      poNumber: "PO-2026-0392",
      rfqRef: "RFQ-2026-0081",
      supplierName: "Misr Beni Suef Cement Co.",
      supplierNameAr: "شركة مصر بني سويف للأسمنت",
      vendorId: "VND-2026-MBS",
      project: "Alexandria Waterfront Heights",
      projectAr: "أبراج كورنيش الإسكندرية (San Stefano)",
      stagingBay: "Covered Bay 1",
      stagingBayAr: "مخزن جاف رقم 1",
      materialDescription: "Sulfate Resistant Portland Cement 42.5N (CEM I)",
      materialDescriptionAr: "أسمنت بورتلاندي مقاوم للكبريتات 42.5N",
      quantity: "800 Bags (40 Tons)",
      unitPrice: "$6.45 / Bag",
      freightCost: "$200.00",
      totalAmount: "$5,360.00",
      issueDate: "Oct 18, 2026",
      deliveryTargetDate: "Oct 28, 2026",
      status: "In-Transit to Site",
      statusAr: "في الطريق إلى الموقع (وصول خلال 4 ساعات)",
      statusBadge: "bg-blue-50 text-blue-800 border-blue-300",
      paymentTerms: "Net 15 Days",
      qcChecklist: [
        { label: "Factory production date < 14 days", pass: true },
        { label: "Moisture-proof wrapping intact", pass: true }
      ]
    },
    {
      poNumber: "PO-2026-0284",
      rfqRef: "RFQ-2026-0101",
      supplierName: "Egyptian German Industrial Pipes Co.",
      supplierNameAr: "الشركة المصرية الألمانية للمواسير",
      vendorId: "VND-2026-EGIP",
      project: "Sadat City Industrial Logistics Park",
      projectAr: "المنطقة اللوجستية بمدينة السادات",
      stagingBay: "Heavy Pipe Yard Bay C",
      stagingBayAr: "ساحة التشوين الثقيل C",
      materialDescription: "Ductile Iron Infrastructure Pipes 400mm (Class C40)",
      materialDescriptionAr: "مواسير مياه زهر مرن 400 مم فئة C40",
      quantity: "240 Meters",
      unitPrice: "$110.00 / Meter",
      freightCost: "$800.00",
      totalAmount: "$27,200.00",
      issueDate: "Oct 15, 2026",
      deliveryTargetDate: "Oct 20, 2026",
      status: "Received & QA Inspected",
      statusAr: "تم الاستلام واعتماد الفحص الفني",
      statusBadge: "bg-slate-100 text-slate-800 border-slate-300",
      paymentTerms: "Paid",
      qcChecklist: [
        { label: "Hydrostatic test certificate 40 bar", pass: true },
        { label: "Bitumen external coating verified", pass: true }
      ]
    }
  ]);

  const currentRfq = rfqsList.find(r => r.id === activeRfqId) || rfqsList[0];
  const currentPo = purchaseOrders.find(p => p.poNumber === activePoId) || purchaseOrders[0];

  // Action: Award PO from AI Recommendation
  const handleAwardRecommendation = (rfq) => {
    const winner = rfq.quotations.find(q => q.isRecommended) || rfq.quotations[0];
    const newPoNumber = `PO-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const newPo = {
      poNumber: newPoNumber,
      rfqRef: rfq.id,
      supplierName: winner.supplier,
      supplierNameAr: winner.supplierAr,
      vendorId: "VND-2026-EZ",
      project: rfq.projectName,
      projectAr: rfq.projectNameAr,
      stagingBay: "Staging Bay 4 (West Gate)",
      stagingBayAr: "ساحة تشوين رقم 4 (البوابة الغربية)",
      materialDescription: rfq.material,
      materialDescriptionAr: rfq.materialAr,
      quantity: rfq.quantity,
      unitPrice: winner.unitPrice,
      freightCost: winner.deliveryCost,
      totalAmount: winner.totalLanded,
      issueDate: "Oct 19, 2026",
      deliveryTargetDate: winner.deliveryTime.split('(')[1]?.replace(')', '') || "Nov 01, 2026",
      status: "Approved & Sent to Vendor",
      statusAr: "معتمد ومُرسل للمورد • قيد التجهيز بالمصنع",
      statusBadge: "bg-emerald-50 text-emerald-800 border-emerald-300",
      paymentTerms: winner.paymentTerms,
      qcChecklist: [
        { label: "Mill Test Certificate (MTC) attached", pass: true },
        { label: "Heat number embossing verified", pass: true },
        { label: "Site gate weighbridge OCR check mandatory", pass: true }
      ]
    };

    setPurchaseOrders([newPo, ...purchaseOrders]);
    setActivePoId(newPoNumber);

    // Update RFQ status
    setRfqsList(prev => prev.map(r => r.id === rfq.id ? { ...r, status: "PO Awarded", statusAr: "تمت الترسية وإصدار أمر الشراء", statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-200" } : r));

    // Navigate to PO Details screen (Screen 5)
    setActiveSubView('po-details');
  };

  // Filtered RFQs in worklist
  const filteredRfqs = rfqsList.filter(item => {
    const matchStatus = statusFilter === 'all' || item.status.toLowerCase().includes(statusFilter);
    const matchSearch = item.material.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">

      {/* ============================================================== */}
      {/* 1. TOP HEADER & FIGMA SUB-VIEW STEPPER NAVIGATION */}
      {/* ============================================================== */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#CBD5E1] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
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
                {isAr ? "إدارة المشتريات الإنشائية (Procurement Officer)" : "Procurement Operations Workflow"}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0F172A] mt-0.5">
              {isAr ? "منظومة المناقصات، عروض الموردين وأوامر الشراء" : "Smart Procurement & Supplier Decision Matrix"}
            </h1>
          </div>
        </div>

        {/* 5-Screen Breadcrumb / Stepper Navigation matching Figma Board */}
        <div className="flex items-center gap-1 bg-[#EEF2F6] p-1.5 rounded-xl border border-[#CBD5E1] overflow-x-auto text-xs font-bold select-none">
          
          <button
            onClick={() => setActiveSubView('worklist')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeSubView === 'worklist'
                ? 'bg-white text-[#E85312] shadow-xs font-black'
                : 'text-[#475569] hover:text-[#0F172A]'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-[#E85312]/10 text-[#E85312] flex items-center justify-center text-[10px] font-black">1</span>
            <span>{isAr ? "قائمة العمل (Worklist)" : "Worklist"}</span>
          </button>

          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 rtl:rotate-180" />

          <button
            onClick={() => setActiveSubView('rfq-details')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeSubView === 'rfq-details'
                ? 'bg-white text-[#E85312] shadow-xs font-black'
                : 'text-[#475569] hover:text-[#0F172A]'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-[#E85312]/10 text-[#E85312] flex items-center justify-center text-[10px] font-black">2</span>
            <span>{isAr ? "تفاصيل الطلب (RFQ Details)" : "RFQ Details"}</span>
          </button>

          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 rtl:rotate-180" />

          <button
            onClick={() => setActiveSubView('comparison')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeSubView === 'comparison'
                ? 'bg-white text-[#E85312] shadow-xs font-black'
                : 'text-[#475569] hover:text-[#0F172A]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E85312]" />
            <span>{isAr ? "المقارنة والـ AI" : "Comparison & AI"}</span>
          </button>

          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 rtl:rotate-180" />

          <button
            onClick={() => setActiveSubView('po-list')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeSubView === 'po-list'
                ? 'bg-white text-[#E85312] shadow-xs font-black'
                : 'text-[#475569] hover:text-[#0F172A]'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#E85312]" />
            <span>{isAr ? "سجل أوامر الشراء (POs)" : "Purchase Orders"}</span>
          </button>

          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 rtl:rotate-180" />

          <button
            onClick={() => setActiveSubView('po-details')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeSubView === 'po-details'
                ? 'bg-white text-[#E85312] shadow-xs font-black'
                : 'text-[#475569] hover:text-[#0F172A]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isAr ? "وثيقة أمر الشراء (PO Details)" : "PO Document"}</span>
          </button>

        </div>
      </div>

      {/* ============================================================== */}
      {/* SCREEN 1: PROCUREMENT WORKLIST (Figma Screen 1) */}
      {/* ============================================================== */}
      {activeSubView === 'worklist' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          
          {/* Top KPI Ribbon matching Figma Screen 1 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-[#CBD5E1] shadow-2xs">
              <span className="text-[11px] font-bold text-[#64748B] block">{isAr ? "طلبات قيد المراجعة" : "Pending RFQs"}</span>
              <div className="text-2xl sm:text-3xl font-black text-[#0F172A] mt-1">4</div>
              <span className="text-[10px] text-amber-700 font-bold block mt-0.5">{isAr ? "تحتاج قرارات ترسية" : "Action required"}</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#CBD5E1] shadow-2xs">
              <span className="text-[11px] font-bold text-[#64748B] block">{isAr ? "عروض مستلمة من الموردين" : "Active Bids Received"}</span>
              <div className="text-2xl sm:text-3xl font-black text-[#E85312] mt-1">8</div>
              <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">{isAr ? "مقارنة فورية بالذكاء الاصطناعي" : "AI Evaluated"}</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#CBD5E1] shadow-2xs">
              <span className="text-[11px] font-bold text-[#64748B] block">{isAr ? "طلبات قيد التقييم" : "Under Evaluation"}</span>
              <div className="text-2xl sm:text-3xl font-black text-[#2563EB] mt-1">2</div>
              <span className="text-[10px] text-slate-500 font-bold block mt-0.5">{isAr ? "فحص شهادات MTC" : "Lab tests pending"}</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#CBD5E1] shadow-2xs">
              <span className="text-[11px] font-bold text-[#64748B] block">{isAr ? "أوامر الشراء المعتمدة" : "Total Orders Issued"}</span>
              <div className="text-2xl sm:text-3xl font-black text-[#15803D] mt-1">19</div>
              <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">{isAr ? "توفير 1.4M ج.م هذا الشهر" : "+$94k saved"}</span>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="bg-white p-4 rounded-xl border border-[#CBD5E1] shadow-2xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? "بحث بكود المناقصة، المادة، أو اسم المشروع..." : "Search RFQ ID, material, or project..."}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-hidden focus:border-[#E85312]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">{isAr ? "الحالة:" : "Status:"}</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-bold focus:outline-hidden focus:border-[#E85312]"
              >
                <option value="all">{isAr ? "جميع الطلبات" : "All RFQs"}</option>
                <option value="received">{isAr ? "عروض مستلمة" : "Quotations Received"}</option>
                <option value="open">{isAr ? "مفتوح للموردين" : "Open for Suppliers"}</option>
                <option value="awarded">{isAr ? "تمت الترسية" : "PO Awarded"}</option>
              </select>

              <button 
                onClick={() => {
                  setActiveRfqId('RFQ-2026-0042');
                  setActiveSubView('rfq-details');
                }}
                className="px-4 py-2 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <span>+</span>
                <span>{isAr ? "إنشاء طلب عرض سعر جديد" : "Create New RFQ"}</span>
              </button>
            </div>
          </div>

          {/* Worklist Table matching Figma Screen 1 */}
          <div className="bg-white rounded-2xl border border-[#CBD5E1] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right border-collapse">
                <thead>
                  <tr className="bg-[#EEF2F6] border-b border-[#CBD5E1] text-[11px] font-black uppercase text-[#475569]">
                    <th className="py-3 px-4">{isAr ? "كود الطلب (RFQ)" : "RFQ Code"}</th>
                    <th className="py-3 px-4">{isAr ? "المادة والمواصفة الفنية" : "Material & Specs"}</th>
                    <th className="py-3 px-4">{isAr ? "المشروع وموقع التسليم" : "Project Site"}</th>
                    <th className="py-3 px-4 text-center">{isAr ? "الكمية المطلوبة" : "Required Qty"}</th>
                    <th className="py-3 px-4">{isAr ? "الموعد الحرج للصب" : "Target Date"}</th>
                    <th className="py-3 px-4">{isAr ? "حالة العروض" : "Status & Bids"}</th>
                    <th className="py-3 px-4 text-center">{isAr ? "الإجراء" : "Action"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredRfqs.map(rfq => (
                    <tr 
                      key={rfq.id}
                      onClick={() => {
                        setActiveRfqId(rfq.id);
                        setActiveSubView('rfq-details');
                      }}
                      className="hover:bg-orange-50/30 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4 font-mono font-black text-[#E85312]">
                        {rfq.id}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#0F172A]">
                        <div>{isAr ? rfq.materialAr : rfq.material}</div>
                        <div className="text-[10px] text-slate-400 font-mono font-normal">Budget: {rfq.allocatedBudget}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        <div className="font-semibold">{isAr ? rfq.projectNameAr : rfq.projectName}</div>
                        <div className="text-[10px] text-slate-400">{rfq.milestone}</div>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-black text-slate-900">
                        {rfq.quantity}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-600">
                        {rfq.deliveryTargetDate}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border inline-flex items-center gap-1 ${rfq.statusBadge}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          <span>{isAr ? rfq.statusAr : rfq.status}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveRfqId(rfq.id);
                            setActiveSubView('rfq-details');
                          }}
                          className="px-3 py-1.5 bg-[#0F172A] group-hover:bg-[#E85312] text-white rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          {isAr ? "مراجعة الطلب ←" : "Review RFQ →"}
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
      {/* SCREEN 2: RFQ DETAILS (Figma Screen 2) */}
      {/* ============================================================== */}
      {activeSubView === 'rfq-details' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Header Card with Key Metrics matching Figma Screen 2 */}
          <div className="bg-white p-6 rounded-2xl border border-[#CBD5E1] shadow-xs space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black text-[#E85312] bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                    {currentRfq.id}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${currentRfq.statusBadge}`}>
                    {isAr ? currentRfq.statusAr : currentRfq.status}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] mt-1.5">
                  {isAr ? currentRfq.materialAr : currentRfq.material}
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#E85312]" />
                  <span>{isAr ? currentRfq.projectNameAr : currentRfq.projectName}</span>
                  <span>•</span>
                  <span>{currentRfq.milestone}</span>
                </div>
              </div>

              {/* Action: Open Comparison Matrix */}
              <button
                onClick={() => setActiveSubView('comparison')}
                className="px-5 py-3 rounded-xl bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{isAr ? "مقارنة العروض وتوصيات الـ AI (Screen 3)" : "Compare Quotations & AI Recommendation"}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>

            {/* 4 Summary Specs Cards matching Figma */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
              <div className="bg-[#EEF2F6] p-3.5 rounded-xl border border-[#CBD5E1]">
                <span className="text-[10px] text-slate-500 font-bold block">{isAr ? "الكمية المطلوبة" : "Required Quantity"}</span>
                <span className="text-lg font-black font-mono text-[#0F172A] mt-0.5 block">{currentRfq.quantity}</span>
              </div>
              <div className="bg-[#EEF2F6] p-3.5 rounded-xl border border-[#CBD5E1]">
                <span className="text-[10px] text-slate-500 font-bold block">{isAr ? "الميزانية المعتمدة" : "Budget Allocation"}</span>
                <span className="text-lg font-black font-mono text-[#15803D] mt-0.5 block">{currentRfq.allocatedBudget}</span>
              </div>
              <div className="bg-[#EEF2F6] p-3.5 rounded-xl border border-[#CBD5E1]">
                <span className="text-[10px] text-slate-500 font-bold block">{isAr ? "الموعد الحرج بالموقع" : "Delivery Deadline"}</span>
                <span className="text-lg font-black font-mono text-[#E85312] mt-0.5 block">{currentRfq.deliveryTargetDate}</span>
              </div>
              <div className="bg-[#EEF2F6] p-3.5 rounded-xl border border-[#CBD5E1]">
                <span className="text-[10px] text-slate-500 font-bold block">{isAr ? "أعلى مطابقة AI" : "Best AI Match"}</span>
                <span className="text-lg font-black font-mono text-emerald-700 mt-0.5 block">{currentRfq.aiBestScore}%</span>
              </div>
            </div>
          </div>

          {/* Quotations Received Table matching Figma Screen 2 */}
          <div className="bg-white rounded-2xl border border-[#CBD5E1] shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-[#0F172A]">
                  {isAr ? "العروض المستلمة من مصانع وموردي المنظومة (3 عروض)" : "Eligible Supplier Quotations Received (3 Bids)"}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isAr ? "تم التحقق من مطابقة المواصفات الفنية ASTM A615 واعتماد أرقام السجل التجاري" : "Verified ASTM A615 technical specs and supplier ISO credentials"}
                </p>
              </div>

              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                AI Auto-Scored: Complete
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-black uppercase text-[#475569] border-y border-slate-200">
                    <th className="py-3 px-4">{isAr ? "المورد والمصنع" : "Supplier"}</th>
                    <th className="py-3 px-4">{isAr ? "سعر الطن" : "Unit Price"}</th>
                    <th className="py-3 px-4">{isAr ? "النقل" : "Freight"}</th>
                    <th className="py-3 px-4">{isAr ? "الإجمالي الواصل" : "Total Landed"}</th>
                    <th className="py-3 px-4">{isAr ? "زمن التوريد" : "Lead Time"}</th>
                    <th className="py-3 px-4">{isAr ? "شروط الدفع" : "Payment"}</th>
                    <th className="py-3 px-4 text-center">{isAr ? "تقييم الـ AI" : "AI Score"}</th>
                    <th className="py-3 px-4 text-center">{isAr ? "الإجراء" : "Action"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {currentRfq.quotations.map(q => (
                    <tr key={q.id} className={`hover:bg-slate-50 transition-colors ${q.isRecommended ? 'bg-emerald-50/40' : ''}`}>
                      <td className="py-3.5 px-4">
                        <div className="font-black text-slate-900 flex items-center gap-1.5">
                          {q.isRecommended && <span className="text-amber-500">👑</span>}
                          <span>{isAr ? q.supplierAr : q.supplier}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">{q.id}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{q.unitPrice}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-600">{q.deliveryCost}</td>
                      <td className="py-3.5 px-4 font-mono font-black text-emerald-800 text-sm">{q.totalLanded}</td>
                      <td className="py-3.5 px-4 text-slate-700 font-medium">{q.deliveryTime}</td>
                      <td className="py-3.5 px-4 text-[11px] text-slate-600 font-medium">{q.paymentTerms}</td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`font-mono font-black text-xs px-2 py-0.5 rounded-full ${
                          q.aiScore >= 95 ? 'bg-emerald-100 text-emerald-800' : q.aiScore >= 85 ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {q.aiScore}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => setActiveSubView('comparison')}
                          className="px-3 py-1.5 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                        >
                          {isAr ? "مقارنة العرض" : "Compare"}
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
      {/* SCREEN 3: SUPPLIER QUOTATIONS COMPARISON & AI RECOMMENDATION (Figma Screen 3) */}
      {/* ============================================================== */}
      {activeSubView === 'comparison' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Top KPI Ribbon matching Figma Screen 3 */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="bg-white p-4 rounded-xl border border-[#CBD5E1] shadow-2xs text-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">{isAr ? "نسبة التطابق" : "Match Score"}</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-[#15803D] mt-1 block">98.4%</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#CBD5E1] shadow-2xs text-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">{isAr ? "المطابقة الفنية" : "Technical Compliance"}</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-emerald-700 mt-1 block">100%</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#CBD5E1] shadow-2xs text-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">{isAr ? "التكلفة الواصلة" : "Landed Cost"}</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-[#0F172A] mt-1 block">$920 / T</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#CBD5E1] shadow-2xs text-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">{isAr ? "زمن التوريد" : "Delivery Lead Time"}</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-[#E85312] mt-1 block">2 Days</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#CBD5E1] shadow-2xs text-center col-span-2 sm:col-span-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">{isAr ? "تقييم الثقة" : "AI Rating"}</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-amber-500 mt-1 block">4.9 / 5.0</span>
            </div>
          </div>

          {/* SIDE-BY-SIDE MATRIX COMPARISON TABLE MATCHING FIGMA SCREEN 3 */}
          <div className="bg-white rounded-2xl border border-[#CBD5E1] shadow-md overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-base sm:text-lg font-black">
                  {isAr ? "مصفوفة المقارنة الفنية والمالية المتعددة المعايير" : "Multi-Criteria Decision Matrix (AI Scored)"}
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-300">
                Weights: 40% Cost • 30% Schedule • 15% Quality MTC • 15% Credit Terms
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-xs font-black text-[#0F172A] border-b border-slate-200">
                    <th className="py-4 px-5 w-1/4 bg-slate-50">{isAr ? "معيار التقييم" : "Evaluation Criteria"}</th>
                    {currentRfq.quotations.map(q => (
                      <th 
                        key={q.id} 
                        className={`py-4 px-5 text-center ${q.isRecommended ? 'bg-orange-50/80 border-x-2 border-[#E85312]' : ''}`}
                      >
                        <div className="flex flex-col items-center gap-1">
                          {q.isRecommended && (
                            <span className="px-2.5 py-0.5 rounded-full bg-[#E85312] text-white text-[10px] font-black uppercase tracking-wider">
                              👑 AI Recommended
                            </span>
                          )}
                          <span className="text-sm font-black text-[#0F172A]">{isAr ? q.supplierAr : q.supplier}</span>
                          <span className="text-[10px] font-mono text-slate-400">{q.id}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs">
                  {/* Row 1: Unit Price */}
                  <tr>
                    <td className="py-3.5 px-5 font-bold text-slate-600 bg-slate-50">{isAr ? "سعر الطن (FOB)" : "Unit Price (FOB)"}</td>
                    {currentRfq.quotations.map(q => (
                      <td key={q.id} className={`py-3.5 px-5 text-center font-mono font-bold ${q.isRecommended ? 'bg-orange-50/40 border-x-2 border-[#E85312]' : ''}`}>
                        {q.unitPrice}
                      </td>
                    ))}
                  </tr>

                  {/* Row 2: Landed Total */}
                  <tr className="bg-slate-50/50">
                    <td className="py-3.5 px-5 font-bold text-slate-900 bg-slate-100/70">{isAr ? "التكلفة الإجمالية الواصلة للموقع" : "Total Landed Cost"}</td>
                    {currentRfq.quotations.map(q => (
                      <td key={q.id} className={`py-3.5 px-5 text-center font-mono font-black text-sm ${q.isRecommended ? 'text-[#E85312] bg-orange-50/60 border-x-2 border-[#E85312]' : 'text-slate-900'}`}>
                        {q.totalLanded}
                      </td>
                    ))}
                  </tr>

                  {/* Row 3: Freight Cost */}
                  <tr>
                    <td className="py-3.5 px-5 font-bold text-slate-600 bg-slate-50">{isAr ? "تكلفة الشحن والتعتيق" : "Freight & Offloading"}</td>
                    {currentRfq.quotations.map(q => (
                      <td key={q.id} className={`py-3.5 px-5 text-center font-mono text-slate-600 ${q.isRecommended ? 'bg-orange-50/40 border-x-2 border-[#E85312]' : ''}`}>
                        {q.deliveryCost}
                      </td>
                    ))}
                  </tr>

                  {/* Row 4: Delivery Lead Time */}
                  <tr className="bg-slate-50/50">
                    <td className="py-3.5 px-5 font-bold text-slate-600 bg-slate-100/70">{isAr ? "موعد الوصول للموقع" : "Arrival & Schedule"}</td>
                    {currentRfq.quotations.map(q => (
                      <td key={q.id} className={`py-3.5 px-5 text-center font-bold ${q.isRecommended ? 'text-emerald-700 bg-orange-50/40 border-x-2 border-[#E85312]' : q.leadTimeDays > 3 ? 'text-rose-600' : 'text-slate-700'}`}>
                        {q.deliveryTime}
                      </td>
                    ))}
                  </tr>

                  {/* Row 5: Quality MTC */}
                  <tr>
                    <td className="py-3.5 px-5 font-bold text-slate-600 bg-slate-50">{isAr ? "شهادة الجودة المعملية (MTC)" : "Mill Test Certificate (MTC)"}</td>
                    {currentRfq.quotations.map(q => (
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
                    <td className="py-3.5 px-5 font-bold text-slate-600 bg-slate-100/70">{isAr ? "تسهيلات وشروط السداد" : "Payment Terms"}</td>
                    {currentRfq.quotations.map(q => (
                      <td key={q.id} className={`py-3.5 px-5 text-center font-semibold ${q.isRecommended ? 'text-emerald-800 bg-orange-50/40 border-x-2 border-[#E85312]' : 'text-slate-600'}`}>
                        {q.paymentTerms}
                      </td>
                    ))}
                  </tr>

                  {/* Row 7: AI Score */}
                  <tr className="bg-slate-100">
                    <td className="py-4 px-5 font-black text-slate-900 bg-slate-200/80">{isAr ? "المحصلة النهائية للذكاء الاصطناعي" : "Final AI Multi-Criteria Score"}</td>
                    {currentRfq.quotations.map(q => (
                      <td key={q.id} className={`py-4 px-5 text-center font-mono font-black text-base ${q.isRecommended ? 'text-[#E85312] bg-orange-100/90 border-x-2 border-[#E85312]' : 'text-slate-700'}`}>
                        {q.aiScore}%
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Bottom Recommendation Directive Card matching Figma */}
            {currentRfq.aiRecommendation && (
              <div className="p-6 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border-t-2 border-[#E85312] flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E85312] animate-ping"></span>
                    <span className="text-xs font-black uppercase text-[#E85312]">
                      {isAr ? "قرار الترسية الموصى به رسمياً" : "Official Procurement Recommendation"}
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-[#0F172A]">
                    {isAr ? "اعتماد العرض المقدم من: " : "Award to: "}
                    <span className="text-[#E85312]">{isAr ? currentRfq.aiRecommendation.winnerSupplierAr : currentRfq.aiRecommendation.winnerSupplier}</span>
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {isAr ? currentRfq.aiRecommendation.summaryAr : currentRfq.aiRecommendation.summaryEn}
                  </p>
                </div>

                {/* Big Orange Button matching Figma: "Award & Generate Purchase Order" */}
                <button
                  onClick={() => handleAwardRecommendation(currentRfq)}
                  className="px-8 py-4 rounded-xl bg-[#E85312] hover:bg-[#CC490F] text-white font-black text-sm shadow-xl transition-all flex items-center gap-2.5 cursor-pointer shrink-0 hover:scale-102"
                >
                  <CheckCircle2 className="w-5 h-5 text-white" />
                  <span>{isAr ? "اعتماد الترسية وإصدار أمر الشراء (Generate PO)" : "Award & Generate Purchase Order"}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            )}
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* SCREEN 4: PURCHASE ORDERS LIST (Figma Screen 4) */}
      {/* ============================================================== */}
      {activeSubView === 'po-list' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Top PO Stats matching Figma Screen 4 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-[#CBD5E1] shadow-2xs">
              <span className="text-[11px] font-bold text-[#64748B] block">{isAr ? "إجمالي أوامر الشراء" : "Total Purchase Orders"}</span>
              <div className="text-2xl sm:text-3xl font-black text-[#0F172A] mt-1">{purchaseOrders.length}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#CBD5E1] shadow-2xs">
              <span className="text-[11px] font-bold text-[#64748B] block">{isAr ? "قيد التجهيز بالمصنع" : "In Production / Awaiting"}</span>
              <div className="text-2xl sm:text-3xl font-black text-[#E85312] mt-1">1</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#CBD5E1] shadow-2xs">
              <span className="text-[11px] font-bold text-[#64748B] block">{isAr ? "في الطريق للموقع" : "In-Transit to Site"}</span>
              <div className="text-2xl sm:text-3xl font-black text-[#2563EB] mt-1">1</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#CBD5E1] shadow-2xs">
              <span className="text-[11px] font-bold text-[#64748B] block">{isAr ? "تم الاستلام والفحص" : "Received & Inspected"}</span>
              <div className="text-2xl sm:text-3xl font-black text-[#15803D] mt-1">1</div>
            </div>
          </div>

          {/* PO Table matching Figma Screen 4 */}
          <div className="bg-white rounded-2xl border border-[#CBD5E1] shadow-xs overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-sm font-black text-[#0F172A]">
                {isAr ? "سجل أوامر الشراء الصادرة لمشاريع الشركة" : "Official Project Purchase Orders Log"}
              </h3>
              <span className="text-xs text-slate-500 font-mono">ERP Synced</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right border-collapse">
                <thead>
                  <tr className="bg-[#EEF2F6] text-[11px] font-black uppercase text-[#475569] border-b border-[#CBD5E1]">
                    <th className="py-3 px-4">{isAr ? "رقم أمر الشراء (PO)" : "PO Number"}</th>
                    <th className="py-3 px-4">{isAr ? "المورد المعتمد" : "Vendor"}</th>
                    <th className="py-3 px-4">{isAr ? "المشروع وساحة التشوين" : "Project Destination"}</th>
                    <th className="py-3 px-4 text-center">{isAr ? "القيمة الإجمالية" : "Total Value"}</th>
                    <th className="py-3 px-4">{isAr ? "تاريخ الإصدار" : "Issue Date"}</th>
                    <th className="py-3 px-4">{isAr ? "حالة التوريد" : "Delivery Status"}</th>
                    <th className="py-3 px-4 text-center">{isAr ? "الإجراء" : "Action"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {purchaseOrders.map(po => (
                    <tr 
                      key={po.poNumber} 
                      onClick={() => {
                        setActivePoId(po.poNumber);
                        setActiveSubView('po-details');
                      }}
                      className="hover:bg-orange-50/30 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4 font-mono font-black text-[#E85312]">
                        {po.poNumber}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#0F172A]">
                        <div>{isAr ? po.supplierNameAr : po.supplierName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{po.vendorId}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        <div className="font-semibold">{isAr ? po.projectAr : po.project}</div>
                        <div className="text-[10px] text-slate-500">{isAr ? po.stagingBayAr : po.stagingBay}</div>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-black text-emerald-800 text-sm">
                        {po.totalAmount}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-600">
                        {po.issueDate}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border inline-flex items-center gap-1 ${po.statusBadge}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          <span>{isAr ? po.statusAr : po.status}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePoId(po.poNumber);
                            setActiveSubView('po-details');
                          }}
                          className="px-3 py-1.5 bg-[#0F172A] group-hover:bg-[#E85312] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
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
      {/* SCREEN 5: PURCHASE ORDER DETAILS (Figma Screen 5) */}
      {/* ============================================================== */}
      {activeSubView === 'po-details' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* PO Actions Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#CBD5E1] shadow-xs">
            <button
              onClick={() => setActiveSubView('po-list')}
              className="text-xs font-bold text-slate-600 hover:text-[#E85312] flex items-center gap-1 cursor-pointer"
            >
              <span>←</span>
              <span>{isAr ? "العودة إلى سجل أوامر الشراء" : "Back to Purchase Orders List"}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => alert(`Official Purchase Order ${currentPo.poNumber} PDF exported.`)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>{isAr ? "تحميل أمر الشراء PDF" : "Download Official PO (PDF)"}</span>
              </button>

              <button
                onClick={() => alert(`Tracking live delivery GPS for ${currentPo.poNumber}. Truck ETA: Nov 01, 09:30 AM.`)}
                className="px-4 py-2 bg-[#E85312] hover:bg-[#CC490F] text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Truck className="w-4 h-4" />
                <span>{isAr ? "تتبع الشحنة على الخريطة" : "Track Delivery GPS"}</span>
              </button>
            </div>
          </div>

          {/* OFFICIAL PURCHASE ORDER DOCUMENT MATCHING FIGMA SCREEN 5 */}
          <div className="bg-white rounded-3xl border border-[#CBD5E1] shadow-xl p-8 sm:p-12 space-y-8 relative overflow-hidden">
            
            {/* Document Header & Watermark */}
            <div className="flex flex-wrap items-start justify-between gap-6 pb-6 border-b border-slate-200">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#E85312]"></span>
                  <span className="font-mono text-xs font-black uppercase text-[#E85312]">OFFICIAL PURCHASE ORDER</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                  {currentPo.poNumber}
                </h2>
                <div className="text-xs text-slate-500 font-mono">
                  Ref RFQ: <strong>{currentPo.rfqRef}</strong> • Date Issued: <strong>{currentPo.issueDate}</strong>
                </div>
              </div>

              <div className="text-right rtl:text-left space-y-1">
                <span className={`px-3 py-1 rounded-full text-xs font-black border inline-block ${currentPo.statusBadge}`}>
                  {isAr ? currentPo.statusAr : currentPo.status}
                </span>
                <div className="text-xs font-mono text-slate-400">IRAM Verified Digital PO</div>
              </div>
            </div>

            {/* Parties: Contractor vs Supplier */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Buyer Contractor */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                  {isAr ? "المشتري (طرف أول - المقاول):" : "BUYER / CONTRACTOR:"}
                </span>
                <h4 className="font-black text-slate-900 text-sm">
                  {isAr ? "شركة السويدي للتطوير والمقاولات" : "El-Sewedy Construction & Contracting"}
                </h4>
                <div className="text-xs text-slate-600 space-y-0.5">
                  <div>Commercial Reg: <strong>1010482910</strong></div>
                  <div>Tax ID: <strong>300489214700003</strong></div>
                  <div>HQ: New Cairo, District 5, Cairo, Egypt</div>
                </div>
              </div>

              {/* Vendor Supplier */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                  {isAr ? "المورد المعتمد (طرف ثان):" : "AWARDED VENDOR / SUPPLIER:"}
                </span>
                <h4 className="font-black text-slate-900 text-sm">
                  {isAr ? currentPo.supplierNameAr : currentPo.supplierName}
                </h4>
                <div className="text-xs text-slate-600 space-y-0.5">
                  <div>Vendor ID: <strong className="font-mono text-[#E85312]">{currentPo.vendorId}</strong></div>
                  <div>Commercial Reg: <strong>1020498112</strong></div>
                  <div>Plant Location: Ain Sokhna Industrial Rolling Mills</div>
                </div>
              </div>
            </div>

            {/* Delivery Destination & Schedule */}
            <div className="p-5 bg-orange-50/50 rounded-2xl border border-orange-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-500 font-bold block">{isAr ? "موقع التسليم المعتمد:" : "Delivery Destination Site:"}</span>
                <strong className="text-slate-900 mt-0.5 block">{isAr ? currentPo.projectAr : currentPo.project}</strong>
              </div>
              <div>
                <span className="text-slate-500 font-bold block">{isAr ? "ساحة التشوين بالموقع:" : "Assigned Staging Bay:"}</span>
                <strong className="text-[#E85312] mt-0.5 block">{isAr ? currentPo.stagingBayAr : currentPo.stagingBay}</strong>
              </div>
              <div>
                <span className="text-slate-500 font-bold block">{isAr ? "الموعد الأقصى للوصول:" : "Target Delivery Deadline:"}</span>
                <strong className="text-slate-900 mt-0.5 block">{currentPo.deliveryTargetDate}</strong>
              </div>
            </div>

            {/* PO Line Items Table matching Figma Screen 5 */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                {isAr ? "بيان المواد والكميات المعتمدة" : "Material Line Items"}
              </h4>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
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
                        <div>{isAr ? currentPo.materialDescriptionAr : currentPo.materialDescription}</div>
                        <div className="text-[10px] text-slate-400 font-mono">Standard ASTM A615 / ES 262-2 Certified</div>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-bold">{currentPo.quantity}</td>
                      <td className="py-3.5 px-4 text-center font-mono">{currentPo.unitPrice}</td>
                      <td className="py-3.5 px-4 text-right rtl:text-left font-mono font-black text-slate-900">
                        $46,000.00
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono font-bold text-slate-400">02</td>
                      <td className="py-3 px-4 text-slate-700">
                        {isAr ? "تكلفة الشحن والتفريغ بالرافعة في ساحة التشوين" : "Heavy Transport Freight & Crane Yard Placement"}
                      </td>
                      <td className="py-3 px-4 text-center font-mono">1 Lot</td>
                      <td className="py-3 px-4 text-center font-mono">{currentPo.freightCost}</td>
                      <td className="py-3 px-4 text-right rtl:text-left font-mono font-bold text-slate-700">
                        {currentPo.freightCost}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-slate-50 font-black text-slate-900 border-t border-slate-200">
                    <tr>
                      <td colSpan={4} className="py-4 px-4 text-right rtl:text-left text-sm">
                        {isAr ? "الإجمالي الصافي لأمر الشراء (Landed Total):" : "Total Landed Purchase Order Value:"}
                      </td>
                      <td className="py-4 px-4 text-right rtl:text-left font-mono text-xl text-[#E85312]">
                        {currentPo.totalAmount}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* QA/QC & Site Gate Receiving Conditions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-black uppercase text-slate-500 block">
                  {isAr ? "اشتراطات الفحص والجودة (QA/QC Checklist):" : "QA/QC Mandatory Checklist:"}
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {currentPo.qcChecklist.map((qc, qIdx) => (
                    <li key={qIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{qc.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-black uppercase text-slate-500 block">
                  {isAr ? "شروط الاستحقاق المالي (Payment Terms):" : "Financial Terms:"}
                </span>
                <div className="text-xs text-slate-700 space-y-1">
                  <div>Term: <strong>{currentPo.paymentTerms}</strong></div>
                  <div>Invoice submission: Automated via IRAM Supplier Portal</div>
                  <div>Release condition: Site Engineer electronic receiving sign-off</div>
                </div>
              </div>
            </div>

            {/* Authorized Signatures Strip */}
            <div className="pt-8 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs text-slate-500">
              <div>
                <span className="block text-[10px] text-slate-400 font-bold">{isAr ? "مسؤول المشتريات:" : "Procurement Officer:"}</span>
                <span className="font-bold text-slate-800 block mt-1">Eng. Kareem Al-Saeed</span>
                <span className="text-[10px] font-mono text-emerald-600">✓ Digital Signature Verified</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 font-bold">{isAr ? "المدير المالي والاعتماد:" : "Finance Approval:"}</span>
                <span className="font-bold text-slate-800 block mt-1">Hassan El-Ghandour</span>
                <span className="text-[10px] font-mono text-emerald-600">✓ Budget Allocation Passed</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 font-bold">{isAr ? "استلام المورد وتأكيد المصنع:" : "Vendor Acceptance:"}</span>
                <span className="font-bold text-slate-800 block mt-1">Ezz Steel Dispatch Board</span>
                <span className="text-[10px] font-mono text-blue-600">✓ In Production (Batch #941)</span>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
