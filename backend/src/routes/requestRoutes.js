const express = require('express');
const router = express.Router();
const db = require('../data/mockDatabase');

// Get all requests
router.get('/', (req, res) => {
  const { projectId, status } = req.query;
  let filtered = [...db.requests];
  if (projectId) {
    filtered = filtered.filter(r => r.projectId === projectId);
  }
  if (status) {
    filtered = filtered.filter(r => r.status.toLowerCase().includes(status.toLowerCase()));
  }
  res.json({ success: true, data: filtered });
});

// Create new Material Request with AI Internal Availability Check (SRS 10.3 & 10.4)
router.post('/', (req, res) => {
  const { projectId, materialId, quantity, unit, requiredDate, deliveryLocation, priority, notes } = req.body;

  const project = db.projects.find(p => p.id === projectId) || db.projects[0];
  const material = db.materials.find(m => m.id === materialId) || db.materials[0];

  // 1. Search across other company projects for surplus or available quantities
  let internalMatch = null;
  const potentialSurplus = db.surplusListings.find(s => 
    s.projectId !== projectId && s.materialId === materialId && s.quantity >= Number(quantity)
  );

  if (potentialSurplus) {
    const estPurchaseCost = Number(quantity) * material.marketPrice;
    const estTransportCost = 1200; // estimated freight
    const netSavings = Math.max(0, estPurchaseCost - estTransportCost);

    internalMatch = {
      sourceProjectId: potentialSurplus.projectId,
      sourceProjectName: potentialSurplus.projectName,
      availableQty: potentialSurplus.quantity,
      distanceKm: 130,
      estimatedTransportCost: estTransportCost,
      estimatedPurchaseCost: estPurchaseCost,
      netSavings: netSavings,
      specsMatchPercentage: 98,
      recommendedAction: "Internal Transfer (TR-AutoMatch)"
    };
  }

  const newRequest = {
    id: `REQ-${String(db.requests.length + 101).padStart(5, '0')}`,
    projectId: project.id,
    projectName: project.name,
    materialId: material.id,
    materialName: material.name,
    quantity: Number(quantity),
    unit: unit || material.unit,
    requiredDate: requiredDate || "2026-11-01",
    deliveryLocation: deliveryLocation || `${project.name} - Site Storage`,
    priority: priority || "Normal",
    status: internalMatch ? "Checked - Internal Match Found" : "New - Direct Sourcing",
    createdBy: "Eng. Tamer Khaled",
    createdAt: new Date().toISOString(),
    notes: notes || "Standard procurement schedule requisition.",
    internalMatch
  };

  db.requests.unshift(newRequest);

  res.status(201).json({
    success: true,
    data: newRequest,
    message: internalMatch 
      ? `Internal match found at ${internalMatch.sourceProjectName}! Potential saving: $${internalMatch.netSavings.toLocaleString()}`
      : "Request created. No internal stock available; proceeding to external sourcing."
  });
});

module.exports = router;
