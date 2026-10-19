const express = require('express');
const router = express.Router();
const db = require('../data/mockDatabase');

// Get all internal transfers
router.get('/', (req, res) => {
  res.json({ success: true, data: db.transfers });
});

// Create new Transfer Request from an internal match
router.post('/', (req, res) => {
  const { requestId, sourceProjectId, targetProjectId, materialId, quantity, transportCost, totalSaved } = req.body;

  const sourceProj = db.projects.find(p => p.id === sourceProjectId);
  const targetProj = db.projects.find(p => p.id === targetProjectId);
  const material = db.materials.find(m => m.id === materialId);

  const newTransfer = {
    id: `TR-${String(db.transfers.length + 102).padStart(5, '0')}`,
    requestId: requestId || "REQ-AUTO",
    sourceProjectId,
    sourceProjectName: sourceProj ? sourceProj.name : "Source Project",
    targetProjectId,
    targetProjectName: targetProj ? targetProj.name : "Target Project",
    materialId,
    materialName: material ? material.name : "Material",
    quantity: Number(quantity),
    unit: material ? material.unit : "Ton",
    transportCost: Number(transportCost) || 1200,
    totalSaved: Number(totalSaved) || 25000,
    status: "Pending Source PM Approval",
    requestedBy: "Project Manager",
    sourceApprover: sourceProj ? sourceProj.manager : "Source PM",
    createdAt: new Date().toISOString()
  };

  db.transfers.unshift(newTransfer);

  res.status(201).json({
    success: true,
    data: newTransfer,
    message: `Internal Transfer ${newTransfer.id} created and dispatched to ${newTransfer.sourceApprover} for authorization.`
  });
});

// Approve transfer (SRS BR-08)
router.patch('/:id/approve', (req, res) => {
  const transfer = db.transfers.find(t => t.id === req.params.id);
  if (!transfer) {
    return res.status(404).json({ success: false, message: 'Transfer not found' });
  }

  transfer.status = "Approved & In Transit";
  transfer.approvedAt = new Date().toISOString();

  // Deduct from surplus in source
  const surplusItem = db.surplusListings.find(s => s.projectId === transfer.sourceProjectId && s.materialId === transfer.materialId);
  if (surplusItem) {
    surplusItem.quantity = Math.max(0, surplusItem.quantity - transfer.quantity);
  }

  // Update company total saved
  db.company.totalSavedFromTransfers += transfer.totalSaved;

  res.json({
    success: true,
    data: transfer,
    message: `Transfer ${transfer.id} approved! Materials are now marked in-transit.`
  });
});

module.exports = router;
