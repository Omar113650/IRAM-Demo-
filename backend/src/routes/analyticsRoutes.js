const express = require('express');
const router = express.Router();
const db = require('../data/mockDatabase');

// Company Admin Executive Dashboard Metrics (SRS 10.2.2)
router.get('/company-overview', (req, res) => {
  const totalProjects = db.projects.length;
  const activeMaterials = db.materials.length;
  const totalSurplusValue = db.surplusListings.reduce((sum, s) => sum + s.marketValue, 0);
  const totalSaved = db.company.totalSavedFromTransfers;
  const activeRequests = db.requests.length;
  const pendingTransfers = db.transfers.filter(t => t.status.includes('Pending')).length;

  // Monthly trends mock data
  const monthlySavingsTrends = [
    { month: "May", externalPurchases: 120000, internalTransfersSaved: 22000 },
    { month: "Jun", externalPurchases: 145000, internalTransfersSaved: 38000 },
    { month: "Jul", externalPurchases: 98000, internalTransfersSaved: 41000 },
    { month: "Aug", externalPurchases: 180000, internalTransfersSaved: 52000 },
    { month: "Sep", externalPurchases: 165000, internalTransfersSaved: 64000 },
    { month: "Oct", externalPurchases: 110000, internalTransfersSaved: 73500 }
  ];

  // Material category allocation
  const categoryDistribution = [
    { name: "Metals & Structural", value: 45, color: "#F95738" },
    { name: "Concrete & Aggregates", value: 25, color: "#1E293B" },
    { name: "Masonry & Binding", value: 15, color: "#64748B" },
    { name: "Plumbing & Piping", value: 10, color: "#F59E0B" },
    { name: "Finishing", value: 5, color: "#10B981" }
  ];

  // AI Waste Risk Breakdown
  const wasteRiskStats = {
    highRiskActivities: db.wastePredictions.filter(w => w.riskCategory === "High").length,
    mediumRiskActivities: db.wastePredictions.filter(w => w.riskCategory === "Medium").length,
    lowRiskActivities: db.wastePredictions.filter(w => w.riskCategory === "Low").length,
    estimatedScrapLossPreventedUSD: 34200
  };

  res.json({
    success: true,
    data: {
      company: db.company,
      kpis: {
        totalProjects,
        activeMaterials,
        totalSurplusValue,
        totalSaved,
        activeRequests,
        pendingTransfers
      },
      monthlySavingsTrends,
      categoryDistribution,
      wasteRiskStats,
      projects: db.projects
    }
  });
});

module.exports = router;
