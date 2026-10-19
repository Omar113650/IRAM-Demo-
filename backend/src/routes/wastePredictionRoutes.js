const express = require('express');
const router = express.Router();
const db = require('../data/mockDatabase');

// Get all AI Waste Predictions (FR-WP-08)
router.get('/', (req, res) => {
  const { projectId, riskCategory } = req.query;
  let list = [...db.wastePredictions];
  if (projectId) {
    list = list.filter(w => w.projectId === projectId);
  }
  if (riskCategory) {
    list = list.filter(w => w.riskCategory.toLowerCase() === riskCategory.toLowerCase());
  }
  res.json({ success: true, data: list });
});

// Run AI Waste Prediction on on-demand input (FR-WP-01 to FR-WP-05)
router.post('/predict', (req, res) => {
  const { projectId, activity, materialId, plannedBOQ, actualConsumed } = req.body;

  const project = db.projects.find(p => p.id === projectId) || db.projects[0];
  const material = db.materials.find(m => m.id === materialId) || db.materials[0];

  const planned = Number(plannedBOQ) || 100;
  const consumed = Number(actualConsumed) || planned;
  
  // Baseline industry standard for material waste:
  // Metals/Steel: 4.5%, Concrete: 3.0%, Tiles/Ceramics: 6.0%, Blocks: 5.0%, General: 4.0%
  let baseline = 4.0;
  if (material.category?.includes("Metals") || material.name?.includes("Steel")) baseline = 4.5;
  if (material.category?.includes("Concrete")) baseline = 3.0;
  if (material.category?.includes("Finishing") || material.name?.includes("Tiles")) baseline = 6.0;
  if (material.category?.includes("Masonry")) baseline = 5.0;

  // Waste prediction formula based on actual consumption vs planned execution progress
  const diff = consumed - planned;
  let estimatedWasteQty = Math.max(0, diff > 0 ? diff * 0.75 : planned * (baseline / 100));
  const wastePercentage = Number(((estimatedWasteQty / planned) * 100).toFixed(1));

  // Risk Classification (FR-WP-05)
  let riskCategory = "Low";
  let abnormal = false;
  if (wastePercentage > baseline * 1.5) {
    riskCategory = "High";
    abnormal = true;
  } else if (wastePercentage > baseline) {
    riskCategory = "Medium";
  }

  // AI Explanations and Recommendations (FR-WP-07)
  const contributingFactors = [];
  const aiRecommendations = [];

  if (riskCategory === "High") {
    contributingFactors.push("Consumption rate significantly exceeds planned engineering tolerance.");
    contributingFactors.push("Subcontractor cutting and off-cut recovery procedures need immediate calibration.");
    aiRecommendations.push("Audit on-site cutting logs and mandate digital 1D/2D cutting optimization.");
    aiRecommendations.push("Schedule site supervisor inspection before authorizing further material release.");
  } else if (riskCategory === "Medium") {
    contributingFactors.push("Slight deviations due to site staging weather exposure or handling transfers.");
    aiRecommendations.push("Ensure moisture protective tarpaulins and proper stacking heights.");
  } else {
    contributingFactors.push("Consumption aligns closely with industry best practice benchmarks.");
    aiRecommendations.push("Maintain current site team operational protocols.");
  }

  const predictionRecord = {
    id: `WP-${String(db.wastePredictions.length + 1).padStart(3, '0')}`,
    projectId: project.id,
    projectName: project.name,
    activity: activity || "Standard Structural Activity",
    activityAr: "نشاط إنشائي عام",
    materialId: material.id,
    materialName: material.name,
    unit: material.unit,
    plannedBOQ: planned,
    actualConsumed: consumed,
    predictedWasteQty: Number(estimatedWasteQty.toFixed(2)),
    predictedWastePercentage: wastePercentage,
    standardIndustryBaseline: baseline,
    deviation: `${wastePercentage > baseline ? '+' : ''}${(wastePercentage - baseline).toFixed(1)}% vs baseline`,
    abnormalConsumptionDetected: abnormal,
    riskCategory,
    contributingFactors,
    aiRecommendations,
    humanReviewStatus: "Pending Review",
    humanNotes: "",
    investigatedBy: null,
    timestamp: new Date().toISOString(),
    modelVersion: "v2.4-XGBoost-ConstructML"
  };

  db.wastePredictions.unshift(predictionRecord);

  res.status(201).json({
    success: true,
    data: predictionRecord,
    message: `Waste prediction computed: ${wastePercentage}% waste estimated (${riskCategory} Risk).`
  });
});

// Human Review & Document Actions (FR-WP-09)
router.patch('/:id/review', (req, res) => {
  const { humanNotes, reviewerName, actionTaken } = req.body;
  const prediction = db.wastePredictions.find(w => w.id === req.params.id);
  if (!prediction) {
    return res.status(404).json({ success: false, message: 'Prediction not found' });
  }

  prediction.humanReviewStatus = "Reviewed & Action Logged";
  prediction.humanNotes = humanNotes || "Review recorded and preventative action executed.";
  prediction.investigatedBy = reviewerName || "Eng. Tamer Khaled (PM)";
  prediction.actionTaken = actionTaken || "On-site inspection completed";
  prediction.reviewedAt = new Date().toISOString();

  res.json({
    success: true,
    data: prediction,
    message: "Human review and investigation actions recorded in audit log."
  });
});

module.exports = router;
