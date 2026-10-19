const express = require('express');
const router = express.Router();
const db = require('../data/mockDatabase');

// Unified Login Endpoint (Separates Company accounts from Supplier accounts)
router.post('/login', (req, res) => {
  const { email, role, userType } = req.body;

  let authenticatedEntity = null;

  // 1. If Supplier Portal Login
  if (userType === 'SUPPLIER' || role === 'Supplier') {
    if (email) {
      authenticatedEntity = db.suppliers.find(s => s.email.toLowerCase() === email.toLowerCase());
    }
    if (!authenticatedEntity) {
      authenticatedEntity = db.suppliers[0]; // fallback to Ezz Steel
    }

    return res.json({
      success: true,
      userType: "SUPPLIER",
      account: authenticatedEntity,
      token: `iram-supplier-token-${authenticatedEntity.id}`,
      message: `Welcome back ${authenticatedEntity.name}!`
    });
  }

  // 2. Company Accounts Login (Admin, PM, Site Engineer, Procurement, Warehouse)
  if (email) {
    authenticatedEntity = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  } else if (role) {
    authenticatedEntity = db.users.find(u => u.role.toLowerCase() === role.toLowerCase());
  }

  if (!authenticatedEntity) {
    authenticatedEntity = db.users[0]; // fallback to Company Admin
  }

  // Determine accessible projects based on RBAC (SRS BR-01 & BR-02)
  let accessibleProjects = [];
  if (authenticatedEntity.assignedProjects.includes("ALL")) {
    accessibleProjects = db.projects;
  } else {
    accessibleProjects = db.projects.filter(p => authenticatedEntity.assignedProjects.includes(p.id));
  }

  return res.json({
    success: true,
    userType: "COMPANY",
    account: authenticatedEntity,
    accessibleProjects,
    company: db.company,
    token: `iram-company-token-${authenticatedEntity.id}`,
    message: `Logged in as ${authenticatedEntity.role}`
  });
});

// Dedicated Supplier Registration (SRS 10.10)
router.post('/supplier/register', (req, res) => {
  const { 
    name, 
    nameAr, 
    contactPerson, 
    email, 
    phone, 
    crNumber, 
    taxNumber, 
    category, 
    serviceAreas, 
    bankDetails 
  } = req.body;

  const newSupplier = {
    id: `SUP-${String(db.suppliers.length + 1).padStart(3, '0')}`,
    name: name || "New Partner Supplier Ltd",
    nameAr: nameAr || name,
    email: email || `supplier${Date.now().toString().slice(-4)}@supply.com`,
    userType: "SUPPLIER",
    contactPerson: contactPerson || "Representative",
    phone: phone || "+20 100 000 0000",
    crNumber: crNumber || "1234567890",
    taxNumber: taxNumber || "300000000000003",
    category: category || "General Construction Materials",
    serviceAreas: serviceAreas ? serviceAreas.split(',') : ["Cairo", "Giza"],
    rating: 5.0,
    tier: "Pending Verification",
    submittedBidsCount: 0,
    wonContractsCount: 0,
    bankDetails: bankDetails || "Bank Account Pending",
    activeRfqs: []
  };

  db.suppliers.unshift(newSupplier);

  res.status(201).json({
    success: true,
    data: newSupplier,
    message: "Supplier registered successfully in IRAM Supplier Community!"
  });
});

// Dedicated Company Registration (SRS 10.2.2)
router.post('/company/register', (req, res) => {
  const { companyName, companyType, crNumber, taxNumber, adminName, adminEmail, adminPhone } = req.body;

  const newCompany = {
    id: `CMP-${Date.now().toString().slice(-4)}`,
    name: companyName || "National Contracting Corp",
    type: companyType || "General Contractor",
    crNumber: crNumber || "1010998877",
    taxNumber: taxNumber || "300998877600003",
    status: "Active",
    adminUser: {
      name: adminName,
      email: adminEmail,
      phone: adminPhone,
      role: "Company Admin"
    }
  };

  res.status(201).json({
    success: true,
    data: newCompany,
    message: "Company registered. OTP dispatched to admin email."
  });
});

// Company Admin: Get all company users & RBAC roles
router.get('/company/users', (req, res) => {
  res.json({
    success: true,
    data: db.users
  });
});

// Company Admin: Add new user & assign role + specific project (RBAC)
router.post('/company/users', (req, res) => {
  const { name, email, role, assignedProjectId, permissions } = req.body;

  const targetProj = db.projects.find(p => p.id === assignedProjectId);

  const newUser = {
    id: `USR-${String(db.users.length + 1).padStart(3, '0')}`,
    name,
    nameAr: name,
    email,
    role: role || "Site Engineer",
    userType: "COMPANY",
    assignedProjects: assignedProjectId ? [assignedProjectId] : ["ALL"],
    permissions: permissions || ["LOG_CONSUMPTION", "REPORT_WASTE"],
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
  };

  db.users.push(newUser);

  // If assigned as manager to project, update project record
  if (role === 'Project Manager' && targetProj) {
    targetProj.manager = newUser.name;
    targetProj.managerId = newUser.id;
  } else if (role === 'Site Engineer' && targetProj) {
    targetProj.siteEngineer = newUser.name;
    targetProj.siteEngineerId = newUser.id;
  }

  res.status(201).json({
    success: true,
    data: newUser,
    message: `User ${name} created and assigned to ${targetProj ? targetProj.name : 'All Projects'} as ${role}.`
  });
});

module.exports = router;
