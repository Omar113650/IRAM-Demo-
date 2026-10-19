import React, { useState } from 'react';
import { 
  FileSearch, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Sparkles, 
  Eye, 
  ShieldCheck,
  Check,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { api } from '../services/api';

export default function DocumentOCRView({ language, onBack }) {
  const isAr = language === 'ar';

  const [scanning, setScanning] = useState(false);
  const [extractedResult, setExtractedResult] = useState({
    documentId: "DOC-9042",
    documentType: "Delivery Receipt Note (إذن استلام)",
    fileName: "Delivery_Note_Steel_Batch_88.pdf",
    overallConfidence: 94.2,
    fields: [
      { name: "Supplier Name", value: "Ezz Steel Mills Egypt", confidence: 99, flagged: false },
      { name: "Delivery Note No.", value: "DN-2026-9042", confidence: 98, flagged: false },
      { name: "Project Delivery Site", value: "Al-Mansoura Residential Complex - Gate 2", confidence: 96, flagged: false },
      { name: "Material Item", value: "Steel Rebar Grade 60 16mm", confidence: 95, flagged: false },
      { name: "Delivered Quantity", value: "50.00 Tons", confidence: 98, flagged: false },
      { name: "Truck Plate / Transporter", value: "Trans-Nile Logistics (7428-د ن ق)", confidence: 88, flagged: false },
      { name: "Mill Test Heat Number", value: "HT-8921-B", confidence: 72, flagged: true, reason: "Low optical resolution, please confirm" },
      { name: "Unit Weight Verification", value: "1.58 kg/m", confidence: 93, flagged: false }
    ],
    poMatchStatus: "PO-0041 Confirmed - Exact Quantity Match",
    humanVerified: false
  });

  const handleSimulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setExtractedResult(prev => ({
        ...prev,
        documentId: `DOC-${Math.floor(1000 + Math.random() * 9000)}`,
        humanVerified: false
      }));
    }, 1200);
  };

  const handleVerify = () => {
    setExtractedResult(prev => ({
      ...prev,
      humanVerified: true
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Contextual Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="px-3.5 py-1.5 rounded-lg bg-white border border-[#CBD5E1] hover:border-[#E85312] text-[#0F172A] hover:text-[#E85312] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
        >
          {isAr ? <ArrowRight className="w-3.5 h-3.5 text-[#E85312]" /> : <ArrowLeft className="w-3.5 h-3.5 text-[#E85312]" />}
          <span>{isAr ? "← العودة إلى إدارة المستودع والمخازن" : "← Back to Warehouse & Receiving"}</span>
        </button>
      )}

      {/* Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900">
              {isAr ? "معالجة المستندات والفحص الضوئي بالذكاء الاصطناعي (AI Document OCR)" : "AI Construction Document OCR & Parsing"}
            </h1>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-bold border border-purple-200">
              SRS 10.8 (BR-11)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            {isAr
              ? "استخراج تلقائي لبيانات أذون الاستلام والفواتير ومطابقتها بأوامر الشراء (POs)، مع درجات الثقة (Confidence Scores) والتحقق البشري الإلزامي."
              : "Automated OCR extraction of delivery notes, material receipts, and POs with field-level confidence scores and discrepancy reconciliation."}
          </p>
        </div>

        <button
          onClick={handleSimulateScan}
          disabled={scanning}
          className="px-4 py-2.5 rounded-xl bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-xs shadow-md shadow-[#E85312]/20 transition-all flex items-center gap-2 shrink-0 disabled:opacity-50"
        >
          <Upload className="w-4 h-4" />
          <span>{scanning ? (isAr ? "جاري الفحص بالـ OCR..." : "Scanning Document...") : (isAr ? "رفع وفحص إذن جديد" : "Upload & Parse Document")}</span>
        </button>
      </div>

      {/* Main OCR Grid: Document Preview on Left, Extracted Fields on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Simulated Scanned PDF Delivery Note */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#E85312]" />
                {extractedResult.fileName}
              </span>
              <span className="text-[10px] px-2 py-0.5 bg-slate-100 rounded-md font-mono text-slate-500">
                PDF Scan (300 DPI)
              </span>
            </div>

            {/* Visual Paper Simulation */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 font-mono text-[11px] text-slate-700 space-y-3 shadow-inner">
              <div className="text-center pb-2 border-b border-dashed border-slate-300">
                <div className="font-black text-slate-900 text-xs">EZZ STEEL MILLS EGYPT</div>
                <div className="text-[10px] text-slate-500">OFFICIAL DELIVERY RECEIPT NOTE</div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div>Date: 18-OCT-2026</div>
                <div>DN#: DN-2026-9042</div>
                <div>Customer: El-Sewedy CC</div>
                <div>PO#: PO-0041</div>
              </div>
              <div className="pt-2 border-t border-dashed border-slate-300">
                <div className="font-bold">Item: Rebar High-Tensile 16mm (12m)</div>
                <div>Quantity: 50.00 MT (Bundles: 25)</div>
                <div>Heat No: HT-8921-B</div>
              </div>
              <div className="pt-2 border-t border-dashed border-slate-300 text-[10px] text-slate-500">
                Transporter: Trans-Nile Truck (7428-د ن ق)
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted cloud storage archive compliant with ISO 9001.</span>
          </div>
        </div>

        {/* Right: AI Field Extraction & Confidence Scores */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">
                {isAr ? "البيانات المستخرجة بالذكاء الاصطناعي (AI Extracted Entities)" : "AI Extracted Key Fields"}
              </h3>
              <p className="text-[11px] text-slate-400">
                Overall Optical Confidence: <strong className="text-emerald-600">{extractedResult.overallConfidence}%</strong>
              </p>
            </div>

            {/* PO Match Badge */}
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{extractedResult.poMatchStatus}</span>
            </span>
          </div>

          {/* Fields Table */}
          <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
            {extractedResult.fields.map((field, idx) => (
              <div 
                key={idx} 
                className={`p-3 flex items-center justify-between text-xs transition-colors ${
                  field.flagged ? 'bg-amber-50/50' : 'hover:bg-slate-50'
                }`}
              >
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block">{field.name}</span>
                  <span className="font-bold text-slate-900 text-xs">{field.value}</span>
                  {field.flagged && (
                    <span className="text-[10px] text-amber-700 flex items-center gap-1 font-medium mt-0.5">
                      <AlertTriangle className="w-3 h-3" />
                      {field.reason}
                    </span>
                  )}
                </div>

                <div className="text-right">
                  <div className={`font-mono font-bold text-xs ${
                    field.confidence >= 95 ? 'text-emerald-600' : field.confidence >= 80 ? 'text-blue-600' : 'text-amber-600'
                  }`}>
                    {field.confidence}%
                  </div>
                  <span className="text-[9px] text-slate-400 uppercase">Confidence</span>
                </div>
              </div>
            ))}
          </div>

          {/* Verification Action Bar (BR-11) */}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              {isAr ? "يتطلب النظام اعتماد المهندس لتحديث أرصدة المخازن" : "Human review required to commit quantities to live ledger"}
            </span>

            {extractedResult.humanVerified ? (
              <span className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>{isAr ? "تم التحقق واعتماد المخزون" : "Verified & Committed to Inventory"}</span>
              </span>
            ) : (
              <button
                onClick={handleVerify}
                className="px-5 py-2.5 rounded-xl bg-[#E85312] hover:bg-[#CC490F] text-white font-bold text-xs shadow-md shadow-[#E85312]/20 transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isAr ? "تأكيد صحة البيانات وتحديث المخزون" : "Confirm Data & Update Stock (BR-11)"}</span>
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
