const express = require('express');
const router = express.Router();
const db = require('../data/mockDatabase');

// Get all surplus listings
router.get('/', (req, res) => {
  res.json({ success: true, data: db.surplusListings });
});

// Register new material surplus (SRS 10.6.2)
router.post('/', (req, res) => {
  const { projectId, materialId, quantity, unit, condition, reason, storageLocation } = req.body;

  const project = db.projects.find(p => p.id === projectId) || db.projects[0];
  const material = db.materials.find(m => m.id === materialId) || db.materials[0];
  const qty = Number(quantity);
  const marketVal = qty * material.marketPrice;

  // Search for matching demands across sister projects (SRS 10.7.2)
  const matchedDemands = [];
  db.projects
    .filter(p => p.id !== project.id)
    .forEach(sisterProj => {
      const sisterInv = db.projectInventory.find(i => i.projectId === sisterProj.id && i.materialId === material.id);
      if (sisterInv && sisterInv.shortageRisk === "High") {
        matchedDemands.push({
          targetProjectId: sisterProj.id,
          targetProjectName: sisterProj.name,
          demandQuantity: Math.min(qty, sisterInv.reorderThreshold),
          potentialSaving: Math.round(Math.min(qty, sisterInv.reorderThreshold) * material.marketPrice * 0.92)
        });
      }
    });

  const newSurplus = {
    id: `SUR-${String(db.surplusListings.length + 1).padStart(4, '0')}`,
    projectId: project.id,
    projectName: project.name,
    materialId: material.id,
    materialName: material.name,
    sku: material.sku,
    quantity: qty,
    unit: unit || material.unit,
    condition: condition || "Good Condition - Wrapped & Staged",
    marketValue: marketVal,
    detectedDate: new Date().toISOString().split('T')[0],
    reason: reason || "Project phase finished with unused balance",
    status: "Available for Reallocation",
    storageLocation: storageLocation || "Central Site Yard",
    shelfLifeDaysRemaining: material.shelfLifeDays ? `${material.shelfLifeDays} days` : "Permanent",
    matchedDemands
  };

  db.surplusListings.unshift(newSurplus);
  db.company.surplusValueActive += marketVal;

  res.status(201).json({
    success: true,
    data: newSurplus,
    message: matchedDemands.length > 0
      ? `Surplus registered! Found ${matchedDemands.length} matching demands in other projects.`
      : "Surplus registered in company catalog."
  });
});

module.exports = router;
