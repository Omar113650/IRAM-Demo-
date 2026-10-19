const express = require('express');
const router = express.Router();
const db = require('../data/mockDatabase');

// Get all projects (or filtered by user assigned projects)
router.get('/', (req, res) => {
  const { userId } = req.query;

  let projectList = [...db.projects];
  if (userId) {
    const user = db.users.find(u => u.id === userId);
    if (user && !user.assignedProjects.includes("ALL")) {
      projectList = projectList.filter(p => user.assignedProjects.includes(p.id));
    }
  }

  const projectsWithMetrics = projectList.map(proj => {
    const inv = db.projectInventory.filter(i => i.projectId === proj.id);
    const shortages = inv.filter(i => i.shortageRisk === "High" || i.shortageRisk === "Medium");
    const surpluses = db.surplusListings.filter(s => s.projectId === proj.id);
    
    return {
      ...proj,
      inventoryItemsCount: inv.length,
      shortagesCount: shortages.length,
      surplusCount: surpluses.length,
      inventoryDetails: inv.map(item => {
        const mat = db.materials.find(m => m.id === item.materialId);
        return { ...item, material: mat };
      })
    };
  });

  res.json({ success: true, data: projectsWithMetrics });
});

// Company Admin: Create New Project & Assign Personnel (SRS 10.2.3)
router.post('/', (req, res) => {
  const { name, nameAr, code, location, city, value, managerName, siteEngineerName, startDate, targetEndDate } = req.body;

  const newProjId = `PRJ-${String(db.projects.length + 1).padStart(3, '0')}`;
  const newProject = {
    id: newProjId,
    code: code || `PRJ-${Date.now().toString().slice(-4)}`,
    name,
    nameAr: nameAr || name,
    location: location || "Greater Cairo Construction Hub",
    city: city || "Cairo",
    manager: managerName || "Eng. Tamer Khaled",
    siteEngineer: siteEngineerName || "Eng. Mohamed Fathy",
    status: "Active",
    progress: 5,
    startDate: startDate || new Date().toISOString().split('T')[0],
    targetEndDate: targetEndDate || "2027-12-31",
    value: Number(value) || 12000000,
    totalSpend: 0,
    shortageAlertsCount: 0,
    surplusCount: 0,
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=600"
  };

  db.projects.push(newProject);
  db.company.activeProjectsCount = db.projects.length;

  // Initialize standard starter inventory for project
  db.materials.forEach(mat => {
    db.projectInventory.push({
      projectId: newProjId,
      materialId: mat.id,
      plannedBOQ: 100,
      orderedQty: 20,
      receivedQty: 20,
      consumedQty: 5,
      remainingQty: 15,
      reservedQty: 0,
      availableQty: 15,
      dailyBurnRate: 1.0,
      daysOfSupplyLeft: 15.0,
      shortageRisk: "Safe"
    });
  });

  res.status(201).json({
    success: true,
    data: newProject,
    message: `Project ${name} created and integrated into company inventory view!`
  });
});

// Get single project
router.get('/:id', (req, res) => {
  const project = db.projects.find(p => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }

  const inventory = db.projectInventory
    .filter(i => i.projectId === project.id)
    .map(item => {
      const mat = db.materials.find(m => m.id === item.materialId);
      return { ...item, material: mat };
    });

  const requests = db.requests.filter(r => r.projectId === project.id);
  const surplus = db.surplusListings.filter(s => s.projectId === project.id);
  const waste = db.wastePredictions.filter(w => w.projectId === project.id);

  res.json({
    success: true,
    data: {
      ...project,
      inventory,
      requests,
      surplus,
      wastePredictions: waste
    }
  });
});

module.exports = router;
