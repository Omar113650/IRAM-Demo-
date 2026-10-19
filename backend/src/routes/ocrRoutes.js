const express = require('express');
const router = express.Router();

// Document OCR and AI Extraction Simulation (SRS 10.8)
router.post('/scan', (req, res) => {
  const { documentType, fileName } = req.body;

  // Mock extraction response with realistic confidence scores
  const extractedData = {
    documentId: `DOC-${Date.now().toString().slice(-5)}`,
    documentType: documentType || "Delivery Receipt Note (إذن استلام)",
    fileName: fileName || "Delivery_Note_Steel_Batch_88.pdf",
    processedAt: new Date().toISOString(),
    overallConfidence: 0.94,
    fields: [
      { name: "Supplier Name", value: "Ezz Steel Mills Egypt", confidence: 0.99, flagged: false },
      { name: "Delivery Note No.", value: "DN-2026-9042", confidence: 0.98, flagged: false },
      { name: "Project Delivery Site", value: "Al-Mansoura Residential Complex - Gate 2", confidence: 0.96, flagged: false },
      { name: "Material Item", value: "Steel Rebar Grade 60 16mm", confidence: 0.95, flagged: false },
      { name: "Delivered Quantity", value: "50.00 Tons", confidence: 0.98, flagged: false },
      { name: "Truck Plate / Transporter", value: "Trans-Nile Logistics (7428-د ن ق)", confidence: 0.88, flagged: false },
      { name: "Mill Test Heat Number", value: "HT-8921-B", confidence: 0.72, flagged: true, flagReason: "Low optical confidence, please verify manually" },
      { name: "Unit Weight Verification", value: "1.58 kg/m", confidence: 0.93, flagged: false }
    ],
    mismatchChecks: {
      hasDiscrepancy: false,
      poMatchStatus: "PO-0041 Confirmed - Exact Quantity Match",
      discrepancyDetails: null
    },
    humanReviewRequired: true
  };

  res.json({
    success: true,
    data: extractedData,
    message: "Document processed via OCR & AI parsing. Extracted fields ready for site engineer verification."
  });
});

module.exports = router;
