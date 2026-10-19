import React, { useState } from 'react';
import { 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Cpu, 
  ShieldAlert, 
  ClipboardCheck, 
  FileText, 
  Filter, 
  Play, 
  HelpCircle,
  Clock,
  UserCheck,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { api } from '../services/api';

export default function AIWastePredictionView({ language, onBack }) {
  const isAr = language === 'ar';

  const [filterRisk, setFilterRisk] = useState('ALL');
  const [showSimulateModal, setShowSimulateModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState(null);

  // Review Form State
  const [reviewNotes, setReviewNotes] = useState('');
  const [reviewerName, setReviewerName] = useState('Eng. Tamer Khaled (PM)');
  const [actionLoggedSuccess, setActionLoggedSuccess] = useState(false);

  // Simulation Form State
  const [simProject, setSimProject] = useState('PRJ-001');
  const [simActivity, setSimActivity] = useState('Slab Cast Concreting');
  const [simMaterial, setSimMaterial] = useState('MAT-001');
  const [simPlanned, setSimPlanned] = useState(120);
  const [simActual, setSimActual] = useState(136);

  // Mock initial predictions matching backend
  const [predictions, setPredictions] = useState([
    {
      id: "WP-001",
      projectId: "PRJ-001",
      projectName: "Al-Mansoura Residential Complex",
      activity: "Structural Columns & Beams Rebar Fabrication",
      activityAr: "تشكيل وتقطيع حديد أعمدة وكمرات الهيكل الخرساني",
      materialName: "High Tensile Steel Rebar 16mm",
      unit: "Ton",
      plannedBOQ: 140,
      actualConsumed: 148.5,
      predictedWasteQty: 11.2,
      predictedWastePercentage: 8.0,
      standardBaseline: 4.5,
      deviation: "+3.5% above baseline",
      abnormalFlag: true,
      riskCategory: "High",
      image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=300&auto=format&fit=crop&q=80",
      contributingFactors: [
        "Inefficient cut-length optimization (off-cuts shorter than lap splice length discarded)",
        "Frequent design revisions in column rebar detailing for Zone B",
        "Site rust oxidation from outdoor open yard staging without moisture barriers"
      ],
      aiRecommendations: [
        "Implement a Bar Bending Schedule (BBS) 1D cutting-stock optimization software immediately.",
        "Consolidate short off-cuts (>1.8m) for non-structural lintels and stair reinforcement.",
        "Elevate open storage rebar bundles on 15cm wooden dunnage with waterproof tarpaulins."
      ],
      humanReviewStatus: "Investigated by PM",
      humanNotes: "Meeting held with structural subcontractor. Cut optimization software mandated for Floor 5 onward.",
      investigatedBy: "Eng. Tamer Khaled",
      modelVersion: "v2.4-XGBoost-ConstructML"
    },
    {
      id: "WP-002",
      projectId: "PRJ-001",
      projectName: "Al-Mansoura Residential Complex",
      activity: "Ready-Mix Concrete Slabs Pouring (Zone A)",
      activityAr: "صب خرسانة جاهزة لبلاطات الدور الأرضي (زون A)",
      materialName: "Ready-Mix Concrete C30/37",
      unit: "m³",
      plannedBOQ: 320,
      actualConsumed: 334,
      predictedWasteQty: 14.5,
      predictedWastePercentage: 4.5,
      standardBaseline: 3.0,
      deviation: "+1.5% within acceptable tolerance",
      abnormalFlag: false,
      riskCategory: "Medium",
      image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=300&auto=format&fit=crop&q=80",
      contributingFactors: [
        "Formwork slight bulging under hydrostatic concrete head pressure",
        "Pump line priming and washout residual concrete in mixer chute"
      ],
      aiRecommendations: [
        "Inspect formwork ties spacing before pour authorization.",
        "Re-route pump line residual washout to precast foundation mud-slab area."
      ],
      humanReviewStatus: "Pending Review",
      humanNotes: "",
      investigatedBy: null,
      modelVersion: "v2.4-XGBoost-ConstructML"
    },
    {
      id: "WP-003",
      projectId: "PRJ-002",
      projectName: "New Capital Business Tower",
      activity: "Commercial Lobby Vitrified Tile Installation",
      activityAr: "تركيب بورسلين أرضيات لوبي البرج التجاري",
      materialName: "Vitrified Porcelain Floor Tiles 60x60",
      unit: "m²",
      plannedBOQ: 850,
      actualConsumed: 865,
      predictedWasteQty: 17.0,
      predictedWastePercentage: 2.0,
      standardBaseline: 6.0,
      deviation: "-4.0% Excellent performance",
      abnormalFlag: false,
      riskCategory: "Low",
      image: "https://images.unsplash.com/photo-1584463699042-4f01481a1796?w=300&auto=format&fit=crop&q=80",
      contributingFactors: [
        "Dry-cut wet diamond blade saws minimized edge chipping",
        "Pre-approved architectural tiling layout plan reduced diagonal border cuts"
      ],
      aiRecommendations: [
        "Maintain current masonry team best practice and wet blade inspection schedule."
      ],
      humanReviewStatus: "Approved & Commended",
      humanNotes: "Exceptional cutting precision by subcontractor.",
      investigatedBy: "Eng. Mostafa Salem",
      modelVersion: "v2.4-XGBoost-ConstructML"
    }
  ]);

  const filteredPredictions = predictions.filter(p => {
    if (filterRisk === 'ALL') return true;
    return p.riskCategory === filterRisk;
  });

  const handleOpenReview = (pred) => {
    setSelectedPrediction(pred);
    setReviewNotes(pred.humanNotes || '');
    setActionLoggedSuccess(false);
    setShowReviewModal(true);
  };

  const handleSaveReview = (e) => {
    e.preventDefault();
    if (!selectedPrediction) return;

    setPredictions(prev => prev.map(p => {
      if (p.id === selectedPrediction.id) {
        return {
          ...p,
          humanReviewStatus: "Reviewed & Action Logged",
          humanNotes: reviewNotes,
          investigatedBy: reviewerName
        };
      }
      return p;
    }));

    setActionLoggedSuccess(true);
    setTimeout(() => {
      setShowReviewModal(false);
    }, 1200);
  };

  const handleRunSimulation = (e) => {
    e.preventDefault();
    const planned = Number(simPlanned);
    const actual = Number(simActual);
    const diff = actual - planned;
    const wasteQty = Math.max(0, diff > 0 ? diff * 0.8 : planned * 0.045);
    const wastePct = Number(((wasteQty / planned) * 100).toFixed(1));
    const baseline = 4.5;
    const abnormal = wastePct > baseline * 1.4;
    const risk = wastePct > baseline * 1.4 ? "High" : wastePct > baseline ? "Medium" : "Low";

    const newPred = {
      id: `WP-00${predictions.length + 1}`,
      projectId: simProject,
      projectName: simProject === 'PRJ-001' ? "Al-Mansoura Residential Complex" : "New Capital Tower",
      activity: simActivity,
      activityAr: simActivity,
      materialName: simMaterial === 'MAT-001' ? "High Tensile Steel Rebar 16mm" : "Portland Cement 42.5N",
      unit: "Ton",
      plannedBOQ: planned,
      actualConsumed: actual,
      predictedWasteQty: Number(wasteQty.toFixed(1)),
      predictedWastePercentage: wastePct,
      standardBaseline: baseline,
      deviation: `${wastePct > baseline ? '+' : ''}${(wastePct - baseline).toFixed(1)}% vs baseline`,
      abnormalFlag: abnormal,
      riskCategory: risk,
      contributingFactors: [
        "Real-time consumption rate exceeds theoretical engineering schedule.",
        "Manual on-site cutting operations without automated nesting algorithm."
      ],
      aiRecommendations: [
        "Audit subcontractor cut-length registers.",
        "Issue corrective action notice to on-site quality control engineer."
      ],
      humanReviewStatus: "Pending Review",
      humanNotes: "",
      investigatedBy: null,
      modelVersion: "v2.4-XGBoost-ConstructML"
    };

    setPredictions([newPred, ...predictions]);
    setShowSimulateModal(false);
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
          <span>{isAr ? "← العودة إلى لوحة التحكم" : "← Back to Dashboard"}</span>
        </button>
      )}

      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900">
              {isAr ? "نظام التنبؤ بهدر مواد البناء بالذكاء الاصطناعي" : "AI Construction Material Waste Prediction"}
            </h1>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-extrabold border border-purple-200">
              FR-WP-01 to FR-WP-10
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
            {isAr
              ? "تحليل أنشطة التنفيذ، جداول الكميات (BOQ)، والاستهلاك الفعلي للتنبؤ بكميات ونسب الهدر، واكتشاف الأنماط غير الطبيعية، وتقديم توصيات هندسية لتقليل الفواقد وتوثيق المراجعة البشرية."
              : "Analyzes construction activities, planned BOQ, and real consumption to forecast material waste, flag abnormal patterns, provide engineering mitigations, and log human reviews."}
          </p>
        </div>

        <button 
          onClick={() => setShowSimulateModal(true)}
          className="px-4 py-2.5 rounded-lg bg-[#E85312] hover:bg-[#CC490F] text-white font-medium text-xs shadow-xs transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>{isAr ? "محاكاة تنبؤ جديد (Run AI Model)" : "Simulate New Prediction"}</span>
        </button>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400">
            {isAr ? "الأنشطة تحت الرقابة" : "Monitored Activities"}
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">{predictions.length}</div>
          <span className="text-[10px] text-slate-500">Live BOQ tracking</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-rose-200 bg-rose-50/20 shadow-xs">
          <span className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            {isAr ? "أنشطة هدر حرج (High Risk)" : "High Waste Risk Flags"}
          </span>
          <div className="text-2xl font-black text-rose-600 mt-1">
            {predictions.filter(p => p.riskCategory === 'High').length}
          </div>
          <span className="text-[10px] text-rose-500 font-medium">Requires PM Investigation</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400">
            {isAr ? "أنماط استهلاك غير طبيعية" : "Abnormal Consumptions"}
          </span>
          <div className="text-2xl font-black text-amber-600 mt-1">
            {predictions.filter(p => p.abnormalFlag).length}
          </div>
          <span className="text-[10px] text-slate-500">Exceeding +2.5% tolerance</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-200 bg-emerald-50/20 shadow-xs">
          <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {isAr ? "خسائر تم تفاديها" : "Avoided Scrap Loss"}
          </span>
          <div className="text-2xl font-black text-emerald-700 mt-1">$34,200</div>
          <span className="text-[10px] text-emerald-600 font-medium">Via cutting optimization</span>
        </div>
      </div>

      {/* Filter and Predictions List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        
        {/* Controls */}
        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-700">
              {isAr ? "تصفية حسب مستوى المخاطرة:" : "Filter by Risk Level:"}
            </span>
            <div className="flex gap-1">
              {['ALL', 'High', 'Medium', 'Low'].map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setFilterRisk(lvl)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    filterRisk === lvl 
                      ? 'bg-slate-900 text-white' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <span className="text-[11px] text-slate-400 font-mono">
            Model: v2.4-XGBoost-ConstructML (MAE 0.42%)
          </span>
        </div>

        {/* Prediction Cards */}
        <div className="divide-y divide-slate-100">
          {filteredPredictions.map(pred => (
            <div key={pred.id} className="p-5 hover:bg-slate-50/50 transition-colors">
              
              {/* Row 1: Activity & Risk Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl border border-slate-200 overflow-hidden shrink-0 shadow-2xs relative flex items-center justify-center bg-slate-900 select-none">
                    {pred.materialName?.toLowerCase().includes('steel') || pred.materialName?.toLowerCase().includes('rebar') ? (
                      <svg className="w-full h-full p-2" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="8" fill="#0F172A" />
                        <rect x="6" y="10" width="28" height="5" rx="2.5" fill="#64748B" />
                        <line x1="10" y1="10" x2="14" y2="15" stroke="#E85312" strokeWidth="1.5" />
                        <line x1="18" y1="10" x2="22" y2="15" stroke="#E85312" strokeWidth="1.5" />
                        <line x1="26" y1="10" x2="30" y2="15" stroke="#E85312" strokeWidth="1.5" />
                        <rect x="6" y="18" width="28" height="5" rx="2.5" fill="#94A3B8" />
                        <line x1="10" y1="18" x2="14" y2="23" stroke="#E85312" strokeWidth="1.5" />
                        <line x1="18" y1="18" x2="22" y2="23" stroke="#E85312" strokeWidth="1.5" />
                        <line x1="26" y1="18" x2="30" y2="23" stroke="#E85312" strokeWidth="1.5" />
                        <rect x="6" y="26" width="28" height="5" rx="2.5" fill="#475569" />
                        <line x1="10" y1="26" x2="14" y2="31" stroke="#E85312" strokeWidth="1.5" />
                        <line x1="18" y1="26" x2="22" y2="31" stroke="#E85312" strokeWidth="1.5" />
                        <line x1="26" y1="26" x2="30" y2="31" stroke="#E85312" strokeWidth="1.5" />
                      </svg>
                    ) : pred.materialName?.toLowerCase().includes('concrete') ? (
                      <svg className="w-full h-full p-2" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="8" fill="#1E293B" />
                        <ellipse cx="20" cy="22" rx="12" ry="8" fill="#E85312" />
                        <path d="M12 22 L20 12 L28 22 Z" fill="#CC490F" />
                        <circle cx="20" cy="22" r="4" fill="#FFFFFF" />
                      </svg>
                    ) : (
                      <svg className="w-full h-full p-2" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="8" fill="#0F172A" />
                        <rect x="8" y="8" width="11" height="11" rx="1.5" fill="#CBD5E1" stroke="#E85312" strokeWidth="1" />
                        <rect x="21" y="8" width="11" height="11" rx="1.5" fill="#94A3B8" stroke="#E85312" strokeWidth="1" />
                        <rect x="8" y="21" width="11" height="11" rx="1.5" fill="#94A3B8" stroke="#E85312" strokeWidth="1" />
                        <rect x="21" y="21" width="11" height="11" rx="1.5" fill="#CBD5E1" stroke="#E85312" strokeWidth="1" />
                      </svg>
                    )}
                    {pred.image && (
                      <img 
                        src={pred.image} 
                        alt="" 
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#E85312]">{pred.id}</span>
                      <h3 className="font-extrabold text-sm text-slate-900">
                        {isAr ? pred.activityAr : pred.activity}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {pred.projectName} • Material: <strong>{pred.materialName}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {pred.abnormalFlag && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Abnormal Anomaly (FR-WP-04)
                    </span>
                  )}
                  <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide border ${
                    pred.riskCategory === 'High' 
                      ? 'bg-rose-50 text-rose-700 border-rose-200' 
                      : pred.riskCategory === 'Medium'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    {pred.riskCategory} Risk
                  </span>
                </div>
              </div>

              {/* Row 2: Quantities & Deviation Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 bg-slate-50 p-3.5 rounded-xl my-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Planned BOQ</span>
                  <div className="font-bold font-mono text-slate-900 mt-0.5">
                    {pred.plannedBOQ} {pred.unit}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Actual Consumed</span>
                  <div className="font-bold font-mono text-slate-900 mt-0.5">
                    {pred.actualConsumed} {pred.unit}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Predicted Waste</span>
                  <div className="font-extrabold font-mono text-rose-600 mt-0.5">
                    {pred.predictedWasteQty} {pred.unit} ({pred.predictedWastePercentage}%)
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Standard Baseline</span>
                  <div className="font-mono text-slate-600 mt-0.5">
                    {pred.standardBaseline}%
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Deviation</span>
                  <div className={`font-bold font-mono mt-0.5 ${pred.deviation.includes('+') ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {pred.deviation}
                  </div>
                </div>
              </div>

              {/* Row 3: Contributing Factors & AI Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mt-2">
                
                {/* Contributing factors */}
                <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200/60">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5 text-[11px] mb-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-slate-500" />
                    {isAr ? "الأسباب والعوامل المؤثرة (Contributing Factors):" : "Model Explanatory Factors (FR-WP-06):"}
                  </span>
                  <ul className="list-disc list-inside text-slate-600 space-y-1 text-[11px]">
                    {pred.contributingFactors.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>

                {/* AI Recommendations */}
                <div className="bg-orange-50/50 p-3 rounded-xl border border-orange-200/80">
                  <span className="font-bold text-[#E85312] flex items-center gap-1.5 text-[11px] mb-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {isAr ? "توصيات الذكاء الاصطناعي لتقليل الهدر (AI Action Plan):" : "AI Mitigation Recommendations (FR-WP-07):"}
                  </span>
                  <ul className="list-disc list-inside text-slate-700 space-y-1 text-[11px] font-medium">
                    {pred.aiRecommendations.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Row 4: Human Review & Audit Status (FR-WP-09) */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-500">
                    {isAr ? "حالة التحقق البشري:" : "Human Review Status:"}
                  </span>
                  <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                    pred.humanReviewStatus.includes('Reviewed') || pred.humanReviewStatus.includes('Investigated')
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {pred.humanReviewStatus}
                  </span>
                  {pred.investigatedBy && (
                    <span className="text-[10px] text-slate-500">
                      by <strong>{pred.investigatedBy}</strong>
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleOpenReview(pred)}
                  className="px-3 py-1 rounded-lg border border-slate-200 hover:border-[#E85312] hover:text-[#E85312] font-bold text-[11px] text-slate-700 transition-colors flex items-center gap-1.5 self-end sm:self-auto"
                >
                  <ClipboardCheck className="w-3.5 h-3.5" />
                  <span>{isAr ? "توثيق المراجعة والإجراء (Log Review)" : "Audit Review & Log Action"}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* SIMULATE PREDICTION MODAL */}
      {showSimulateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="p-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">
                  {isAr ? "تشغيل نموذج التنبؤ بالهدر (AI Waste Simulation)" : "Run AI Waste Prediction Model"}
                </h3>
                <p className="text-[11px] text-slate-500">
                  FR-WP-01 to FR-WP-05 Machine Learning Inference
                </p>
              </div>
              <button onClick={() => setShowSimulateModal(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={handleRunSimulation} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Project Site</label>
                <select 
                  value={simProject}
                  onChange={(e) => setSimProject(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                >
                  <option value="PRJ-001">Al-Mansoura Residential Complex</option>
                  <option value="PRJ-002">New Capital Business Tower</option>
                  <option value="PRJ-003">Alexandria Waterfront Heights</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Construction Activity</label>
                <input 
                  type="text" 
                  value={simActivity}
                  onChange={(e) => setSimActivity(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                  placeholder="e.g. 5th Floor Slab Formwork & Rebar Pouring"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Material</label>
                <select 
                  value={simMaterial}
                  onChange={(e) => setSimMaterial(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                >
                  <option value="MAT-001">High Tensile Steel Rebar 16mm (Grade 60)</option>
                  <option value="MAT-002">Portland Cement 42.5N</option>
                  <option value="MAT-003">Ready-Mix Concrete C30/37</option>
                  <option value="MAT-006">Vitrified Floor Tiles 60x60</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Planned BOQ Quantity</label>
                  <input 
                    type="number" 
                    value={simPlanned}
                    onChange={(e) => setSimPlanned(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Actual Consumed to Date</label>
                  <input 
                    type="number" 
                    value={simActual}
                    onChange={(e) => setSimActual(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-[#E85312] hover:bg-[#CC490F] text-white font-medium text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Compute AI Waste & Anomaly Forecast</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* HUMAN REVIEW MODAL (FR-WP-09) */}
      {showReviewModal && selectedPrediction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="p-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">
                  {isAr ? "توثيق المراجعة الهندسية (Human Review - FR-WP-09)" : "Engineering Review & Corrective Action"}
                </h3>
                <p className="text-[11px] text-slate-500">
                  Prediction ID: {selectedPrediction.id} • {selectedPrediction.activity}
                </p>
              </div>
              <button onClick={() => setShowReviewModal(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={handleSaveReview} className="p-6 space-y-4 text-xs">
              {actionLoggedSuccess ? (
                <div className="text-center py-6 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {isAr ? "تم حفظ نتائج المراجعة والإجراء في سجل التدقيق!" : "Review & Corrective Action Saved to Audit Log!"}
                  </h4>
                </div>
              ) : (
                <>
                  <div className="p-3 bg-slate-50 rounded-xl text-slate-700 space-y-1">
                    <div className="font-bold text-slate-900">
                      Waste Risk: <span className="text-rose-600">{selectedPrediction.riskCategory}</span> ({selectedPrediction.predictedWastePercentage}%)
                    </div>
                    <div>Deviation: {selectedPrediction.deviation}</div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {isAr ? "اسم المهندس المراجع" : "Investigator / Project Manager"}
                    </label>
                    <input 
                      type="text" 
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {isAr ? "ملاحظات الفحص الميداني والإجراء التصحيحي" : "Investigation Findings & Corrective Action"}
                    </label>
                    <textarea 
                      rows={4}
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                      placeholder={isAr ? "اكتب الإجراء المتخذ مع المقاول أو تعليمات تحسين التخزين والقص..." : "Document actions taken, cutting software implemented, or subcontractor instructions..."}
                      className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-hidden focus:border-[#E85312] focus:ring-1 focus:ring-[#E85312]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-[#E85312] hover:bg-[#CC490F] text-white font-medium text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ClipboardCheck className="w-4 h-4" />
                    <span>{isAr ? "حفظ التقرير وسجل الإجراء" : "Confirm & Save to Audit History"}</span>
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
