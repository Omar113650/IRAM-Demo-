const express = require('express');
const router = express.Router();
const db = require('../data/mockDatabase');

// AI Assistant Chat endpoint (SRS 10.9)
router.post('/chat', (req, res) => {
  const { query, language, userRole } = req.body;
  const q = (query || "").toLowerCase();
  const isArabic = language === 'ar' || /[\u0600-\u06FF]/.test(query);

  let responseText = "";
  let structuredData = null;

  if (q.includes("steel") || q.includes("rebar") || q.includes("حديد") || q.includes("تسليح")) {
    if (isArabic) {
      responseText = "تحليل مخزون حديد التسليح عبر الشركة:\n• يتوفر فائض قدره 90 طن في برج العاصمة الإدارية (PRJ-002).\n• يوجد عجز حرج بمخزون 16 طن فقط بكمبوند المنصورة (PRJ-001) يكفي 5.7 أيام فقط.\n• توصية النظام: تم تجهيز طلب نقل داخلي TR-00101 يوفر حوالي 45,550$ بدلاً من الشراء الخارجي.";
    } else {
      responseText = "Steel Rebar Inventory Analysis:\n• Surplus of 90 Tons identified at New Capital Tower (PRJ-002).\n• Critical shortage at Al-Mansoura Complex (PRJ-001) with only 16 Tons (5.7 days of supply remaining).\n• Recommendation: Approve Transfer TR-00101 to save $45,550.";
    }
    structuredData = {
      type: "TRANSFER_RECOMMENDATION",
      transferId: "TR-00101",
      potentialSaving: 45550,
      material: "High Tensile Steel Rebar 16mm",
      quantity: "50 Tons"
    };
  } else if (q.includes("waste") || q.includes("هدر") || q.includes("خسارة") || q.includes("فقد")) {
    if (isArabic) {
      responseText = "تقرير تنبؤ الهدر بالذكاء الاصطناعي (AI Waste Prediction):\n• تم رصد نسبة هدر مرتفعة (8.0%) في تقطيع حديد تسليح كمبوند المنصورة أعلى من المعدل القياسي (4.5%).\n• السبب الرئيسي: عدم استخدام برمجيات تحسين القص (Bar Bending Schedule).\n• الإجراء المقترح: إلزام المقاول ببرنامج قص رقمي واستغلال الفضلات الأطول من 1.8م في الأعتاب.";
    } else {
      responseText = "AI Waste Prediction Alert:\n• High risk detected (8.0% waste) in structural steel cutting at Al-Mansoura Complex (standard baseline is 4.5%).\n• Root cause: Inefficient cut-length optimization and off-cut discards.\n• Action: Deploy BBS cutting-stock optimization software immediately.";
    }
    structuredData = {
      type: "WASTE_ALERT",
      wasteId: "WP-001",
      risk: "High",
      deviation: "+3.5% above baseline"
    };
  } else if (q.includes("surplus") || q.includes("فائض") || q.includes("المتبقي")) {
    if (isArabic) {
      responseText = `إجمالي قيمة الفائض المتاح حالياً بالشركة: $${db.company.surplusValueActive.toLocaleString()}.\n• حديد تسليح (90 طن) في برج العاصمة.\n• مواسير صرف 4 بوصة (280 متر) في برج العاصمة.\n• إجمالي المبالغ الموفرة تاريخياً من النقل الداخلي: $${db.company.totalSavedFromTransfers.toLocaleString()}.`;
    } else {
      responseText = `Active Surplus Valuation: $${db.company.surplusValueActive.toLocaleString()}.\n• Steel Rebar (90 Tons) at New Capital Tower.\n• Heavy Duty PVC Pipes (280m) at New Capital Tower.\n• Cumulative savings achieved via internal reallocation: $${db.company.totalSavedFromTransfers.toLocaleString()}.`;
    }
    structuredData = {
      type: "SURPLUS_SUMMARY",
      totalSurplusValue: db.company.surplusValueActive,
      totalSaved: db.company.totalSavedFromTransfers
    };
  } else if (q.includes("cement") || q.includes("أسمنت") || q.includes("اسمنت")) {
    if (isArabic) {
      responseText = "حالة الأسمنت البورتلاندي 42.5N:\n• كمبوند المنصورة يمتلك 300 كيس متاح (يكفي 6.6 أيام).\n• تم إصدار طلب عروض أسعار RFQ-0081 لمشروع الإسكندرية لطلب 600 كيس، وعرض 'مصر بني سويف' هو الموصى به من الـ AI بسعر 6.45$ للكيس وتوريد خلال يومين.";
    } else {
      responseText = "Portland Cement 42.5N Status:\n• Al-Mansoura has 300 bags available (6.6 days supply).\n• Alexandria Waterfront has RFQ-0081 out for 600 bags. AI recommends Misr Beni Suef at $6.45/bag with 2-day delivery.";
    }
  } else {
    if (isArabic) {
      responseText = `مرحباً بك! أنا مساعد IRAM الذكي لمواد البناء. يمكنك سؤالي عن:
• توفر المواد والكميات في أي مشروع.
• تنبؤات النقص أو الهدر (Waste Prediction).
• فرص إعادة تدوير الفائض والتوفير المالي.
• مقارنة عروض أسعار الموردين (RFQs).`;
    } else {
      responseText = `Hello! I am your IRAM Construction Material AI Assistant. You can ask me about:
• Material availability and inventory across projects.
• AI shortage predictions and waste forecasts.
• Surplus reallocation opportunities and dollar savings.
• Supplier RFQ quotations and AI recommendations.`;
    }
  }

  res.json({
    success: true,
    data: {
      reply: responseText,
      structuredData,
      timestamp: new Date().toISOString()
    }
  });
});

module.exports = router;
