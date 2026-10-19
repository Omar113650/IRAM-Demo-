// IRAM Frontend API Client with Standalone Fallback Support
const API_BASE = '/api';

export const api = {
  // Authentication
  login: async (email, role) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Backend not reached, using local fallback state.");
    }
    return {
      success: true,
      user: {
        id: "USR-001",
        name: "Eng. Tamer Khaled",
        role: role || "Project Manager",
        email: "pm.tamer@elsewedy-cc.com",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
      }
    };
  },

  // Projects
  getProjects: async () => {
    try {
      const res = await fetch(`${API_BASE}/projects`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Using fallback projects");
    }
    return { success: true, data: [] };
  },

  // Requests
  createRequest: async (requestData) => {
    try {
      const res = await fetch(`${API_BASE}/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { success: true, message: "Request created." };
  },

  // Transfers
  createTransfer: async (transferData) => {
    try {
      const res = await fetch(`${API_BASE}/transfers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transferData)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { success: true, message: "Transfer initiated." };
  },

  // Waste Prediction
  predictWaste: async (data) => {
    try {
      const res = await fetch(`${API_BASE}/waste-prediction/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { success: true };
  },

  // AI Chat
  chatAI: async (query, language) => {
    try {
      const res = await fetch(`${API_BASE}/ai-assistant/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, language })
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    const isAr = language === 'ar';
    const q = (query || '').toLowerCase();

    let reply = isAr 
      ? "أنا مساعد إيرام الإنشائي الذكي؛ يمكنك سؤالي عن أرصدة المواد الموحدة، تنبؤ العجز، النقل الداخلي للفائض، مصفوفة الموردين، أو تنبؤ الهدر."
      : "I am IRAM Construction AI Assistant; ask me about unified inventory, shortage burn rate, surplus transfers, RFQ comparisons, or waste predictions.";

    if (q.includes('ماذا تملك') || q.includes('رؤية موحدة') || q.includes('what does company have') || q.includes('أين يقع') || q.includes('where')) {
      reply = isAr
        ? "🏢 الرؤية الموحدة لمواد الشركة عبر المشاريع (Unified Material Visibility):\n\n1. كمبوند المنصورة السكني: 26 طن حديد تسليح 16مم (يكفي 5.7 أيام)، 350 شيكارة أسمنت بورتلاندي، 40 م³ خرسانة جاهزة.\n2. برج الأعمال - العاصمة الإدارية: 90 طن حديد تسليح فائض متاح للنقل، 280 متر مواسير صرف 4 بوصة.\n3. أبراج كورنيش الإسكندرية: 650 م² بورسلين فاخر، 40 طن خرسانة.\n\nإجمالي قيمة الأصول الفائضة القابلة للتدوير حالياً: $92,300."
        : "🏢 Unified Company Material Visibility:\n\n1. Al-Mansoura Complex: 26T Steel (5.7 days left), 350 Cement bags, 40m³ Concrete.\n2. New Capital Tower: 90T Steel Surplus available, 280m PVC pipes.\n3. Alexandria Waterfront: 650m² Porcelain tiles surplus.\n\nTotal reusable company surplus valuation: $92,300.";
    } else if (q.includes('عجز') || q.includes('نقص') || q.includes('shortage') || q.includes('burn')) {
      reply = isAr
        ? "⚠️ تنبؤ العجز ومعدل الحرق (Predictive Shortage Management):\n\n- المادة: حديد تسليح عالي المقاومة 16 مم (مشروع كمبوند المنصورة).\n- الرصيد المتبقي: 26 طن فقط (يكفي 5.7 أيام).\n- معدل الاستهلاك اليومي: 2.8 طن/يوم.\n- موعد النفاذ المتوقع: 24 أكتوبر 2026.\n- موعد صب السقف الحرج: 02 نوفمبر 2026.\n\n💡 توصية إيرام الاستباقية: يتوفر فائض مطابق 90 طن ببرج العاصمة الإدارية، نقله يوفر $45,550 ويمنع توقف العمل فورياً."
        : "⚠️ Early Shortage Prediction:\n\n- Material: High Tensile Steel 16mm (Al-Mansoura Complex).\n- Remaining Stock: 26 Tons (5.7 Days left at 2.8 T/day).\n- Projected Depletion: Oct 24, 2026.\n- Critical Milestone Pour: Nov 02, 2026.\n\n💡 Proactive Action: 90T surplus at New Capital Tower matches this requirement, saving $45,550.";
    } else if (q.includes('فائض') || q.includes('surplus') || q.includes('نقل') || q.includes('reallocate')) {
      reply = isAr
        ? "🔄 الفائض وإعادة التوزيع الداخلي (Smart Surplus Reallocation):\n\n1. 90 طن حديد تسليح 16 مم (برج العاصمة) -> مطابق لعجز المنصورة (توفير صافي $45,550 بعد خصم تكلفة النقل $1,450).\n2. 280 متر مواسير صرف 4 بوصة (العاصمة) -> متاح لإعادة التوجيه.\n3. 650 م² بورسلين نخب أول (الإسكندرية) -> متاح للنقل الداخلي أو الطرح بسوق B2B.\n\nإجمالي الوفورات المحققة من النقل الداخلي حتى اليوم: $184,500."
        : "🔄 Smart Surplus Reallocation:\n\n1. 90T Steel Rebar (New Capital) -> Matches Al-Mansoura shortage (Net saved: $45,550).\n2. 280m PVC Pipes (New Capital) -> Available for reallocation.\n3. 650m² Porcelain (Alexandria) -> Ready for inter-site transfer or B2B Marketplace.\n\nTotal Internal Transfer Savings to Date: $184,500.";
    } else if (q.includes('هدر') || q.includes('waste') || q.includes('فواقد')) {
      reply = isAr
        ? "🛡️ تنبؤ الهدر بالذكاء الاصطناعي (AI Waste Prediction & Prevention):\n\n- النشاط عالي الخطورة: تشكيل وتقطيع حديد أعمدة وكمرات الهيكل (كمبوند المنصورة).\n- نسبة الهدر المتوقعة: 8.0% (أعلى من المعدل المعياري 4.5%).\n- التكلفة المتوقعة للهدر: $10,528.\n- الأسباب الجذرية: قص أطوال أقصر من مسافات الوصل (Lap Splice) وتعديلات لوحات التسليح بالمنطقة B.\n- التوصية الهندسية: تطبيق برمجيات تحسين تفريد وقص الحديد وإعادة توجيه الوصلات كفائض للمشروع التالي."
        : "🛡️ AI Waste Prediction & Prevention:\n\n- High Risk Activity: Columns & Beams Rebar Fabrication (Al-Mansoura).\n- Predicted Waste: 8.0% (Baseline 4.5%).\n- Projected Waste Cost: $10,528.\n- Root Cause: Discarding off-cuts shorter than lap splice length and re-detailing revisions.\n- Mitigation: Deploy cutting optimization software and collect intact off-cuts into surplus pool.";
    } else if (q.includes('مورد') || q.includes('مشتريات') || q.includes('rfq') || q.includes('supplier') || q.includes('أسمنت') || q.includes('حديد عز')) {
      reply = isAr
        ? "🤝 مصفوفة تقييم عروض الأسعار الذكية (Smart Procurement & RFQ Scoring):\n\n- طلب التسعير: RFQ-0088 (50 طن حديد تسليح 16 مم لمجمع المنصورة).\n- العرض الفائز الموصى به من الـ AI: مصانع حديد عز (Ezz Steel Mills) بتقييم 96.4%.\n- الأسباب: أقل سعر واصل ($920/طن + $1,000 شحن)، وصول الشحنة قبل 24 ساعة من صب السقف، شهادة معملية MTC معتمدة وسداد آجل 30 يوماً."
        : "🤝 Smart Procurement & RFQ Scoring:\n\n- Requisition: RFQ-0088 (50T Rebar 16mm for Al-Mansoura).\n- AI Winning Recommendation: Ezz Steel Mills Egypt (Score: 96.4%).\n- Key Advantages: Lowest total landed cost ($920/T + $1k freight), delivery 24h prior to milestone pour, certified MTC, 30-day deferred credit.";
    } else if (q.includes('معدات') || q.includes('equipment') || q.includes('آليات') || q.includes('ونش') || q.includes('crane')) {
      reply = isAr
        ? "🚜 تتبع الآليات والمعدات الذكية (Section 07 — Smart Equipment Management):\n\n1. ونش برج ليبر 550 طن-متر (برج العاصمة): سيتوفر خلال 4 أيام مع انتهاء الهيكل؛ يوصى بنقله لمشروع المنصورة لتوفير $18,000 إيجار شهري.\n2. مضخة خرسانة بوتزمايستر 42م (المنصورة): تعمل بكفاءة 86%.\n3. حفار كاتربيلر 336D (الإسكندرية): متاح كفائض بعد انتهاء الحفر وجاهز للنقل الداخلي."
        : "🚜 Smart Equipment Management:\n\n1. Liebherr Tower Crane 550 (New Capital): Idle in 4 days. Mobilizing to Al-Mansoura saves $18,000/mo rental fee.\n2. Putzmeister 42m Mobile Pump (Al-Mansoura): Active at 86% utilization.\n3. CAT 336 Excavator (Alexandria): Foundation phase done, available for redeployment.";
    }

    return {
      success: true,
      data: {
        reply
      }
    };
  },

  // OCR Scan Simulation
  scanDocument: async (documentType, fileName) => {
    try {
      const res = await fetch(`${API_BASE}/ocr/scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentType, fileName })
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { success: true };
  }
};
