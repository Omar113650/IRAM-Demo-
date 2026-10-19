const express = require('express');
const router = express.Router();
const db = require('../data/mockDatabase');

// Get all materials
router.get('/', (req, res) => {
  res.json({ success: true, data: db.materials });
});

// Add new material SKU
router.post('/', (req, res) => {
  const { name, nameAr, sku, category, unit, specifications, reorderThreshold, marketPrice } = req.body;
  const newMat = {
    id: `MAT-00${db.materials.length + 1}`,
    sku: sku || `SKU-${Date.now().toString().slice(-4)}`,
    name,
    nameAr: nameAr || name,
    category: category || "General Materials",
    unit: unit || "Unit",
    specifications: specifications || "Standard construction grade",
    reorderThreshold: Number(reorderThreshold) || 10,
    marketPrice: Number(marketPrice) || 100,
    shelfLifeDays: null,
    storageConditions: "Standard site warehouse"
  };

  db.materials.push(newMat);
  res.status(201).json({ success: true, data: newMat });
});

module.exports = router;
