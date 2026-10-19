// IRAM Mock In-Memory Database (SRS v2.0 Architecture)
// Multi-Tenant, Project Lifecycle, Waste Prediction & Surplus Matching

const database = {
  company: {
    id: "CMP-001",
    name: "El-Sewedy Construction & Contracting",
    nameAr: "مجموعة السويدي للمقاولات والإنشاءات",
    taxNumber: "300489214700003",
    crNumber: "1010482910",
    subscriptionPlan: "Enterprise Pro",
    renewalDate: "2027-01-15",
    activeProjectsCount: 3,
    totalSavedFromTransfers: 184500, // USD
    surplusValueActive: 92300, // USD
  },

  // Company Team & Role-Based Access Control (RBAC)
  users: [
    {
      id: "USR-001",
      name: "Eng. Ahmed Mansour",
      nameAr: "م. أحمد منصور",
      email: "admin@elsewedy-cc.com",
      role: "Company Admin",
      userType: "COMPANY",
      assignedProjects: ["ALL"],
      permissions: ["MANAGE_COMPANY", "ADD_PROJECTS", "MANAGE_USERS", "VIEW_FINANCIALS", "VIEW_ALL_PROJECTS"],
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
    },
    {
      id: "USR-002",
      name: "Eng. Tamer Khaled",
      nameAr: "م. تامر خالد",
      email: "pm.tamer@elsewedy-cc.com",
      role: "Project Manager",
      userType: "COMPANY",
      assignedProjects: ["PRJ-001"], // Only Al-Mansoura!
      permissions: ["MANAGE_ASSIGNED_PROJECT", "CREATE_REQUISITION", "APPROVE_TRANSFER", "VIEW_PROJECT_BOQ", "AUDIT_WASTE"],
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
    },
    {
      id: "USR-003",
      name: "Eng. Mostafa Salem",
      nameAr: "م. مصطفى سالم",
      email: "pm.mostafa@elsewedy-cc.com",
      role: "Project Manager",
      userType: "COMPANY",
      assignedProjects: ["PRJ-002"], // Only New Capital Tower!
      permissions: ["MANAGE_ASSIGNED_PROJECT", "CREATE_REQUISITION", "APPROVE_TRANSFER", "VIEW_PROJECT_BOQ"],
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
    },
    {
      id: "USR-004",
      name: "Kareem Refaat",
      nameAr: "أ. كريم رفعت",
      email: "procurement@elsewedy-cc.com",
      role: "Procurement Officer",
      userType: "COMPANY",
      assignedProjects: ["ALL"],
      permissions: ["MANAGE_RFQS", "EVALUATE_QUOTES", "SELECT_SUPPLIER", "ISSUE_PURCHASE_ORDERS", "COMMUNICATE_SUPPLIERS"],
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
    },
    {
      id: "USR-005",
      name: "Eng. Mohamed Fathy",
      nameAr: "م. محمد فتحي",
      email: "site.fathy@elsewedy-cc.com",
      role: "Site Engineer",
      userType: "COMPANY",
      assignedProjects: ["PRJ-001"],
      permissions: ["LOG_CONSUMPTION", "REPORT_WASTE", "REQUEST_INSPECTION"],
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150"
    },
    {
      id: "USR-006",
      name: "Hassan Al-Sayed",
      nameAr: "حسن السيد",
      email: "warehouse@elsewedy-cc.com",
      role: "Warehouse Officer",
      userType: "COMPANY",
      assignedProjects: ["PRJ-001", "PRJ-002"],
      permissions: ["RECEIVE_MATERIALS", "VERIFY_OCR", "DECLARE_SURPLUS", "MANAGE_SITE_INVENTORY"],
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150"
    }
  ],

  // Distinct Verified Construction Material Suppliers (SRS 10.10 & Supplier Community)
  suppliers: [
    {
      id: "SUP-001",
      name: "Ezz Steel Mills Egypt",
      nameAr: "مجموعة حديد عز",
      email: "sales@ezzsteel.com",
      userType: "SUPPLIER",
      contactPerson: "Eng. Tarek Ezzat",
      phone: "+20 100 882 1190",
      crNumber: "1029384756",
      taxNumber: "300182736400003",
      category: "Metals & Structural Steel",
      serviceAreas: ["Cairo", "Giza", "New Capital", "Alexandria", "Mansoura"],
      rating: 4.9,
      tier: "Verified Tier 1",
      submittedBidsCount: 14,
      wonContractsCount: 11,
      bankDetails: "CIB Egypt - Account: 1000-8849-2910",
      activeRfqs: ["RFQ-0084"]
    },
    {
      id: "SUP-002",
      name: "Misr Beni Suef Cement Co.",
      nameAr: "شركة مصر بني سويف للأسمنت",
      email: "bids@mbs-cement.com",
      userType: "SUPPLIER",
      contactPerson: "Amr Al-Banna",
      phone: "+20 111 445 6677",
      crNumber: "9988776655",
      taxNumber: "300445566700003",
      category: "Cement & Masonry",
      serviceAreas: ["Beni Suef", "Cairo", "Alexandria", "Delta"],
      rating: 4.8,
      tier: "Verified Partner",
      submittedBidsCount: 9,
      wonContractsCount: 7,
      bankDetails: "National Bank of Egypt - Account: 2000-1122-3344",
      activeRfqs: ["RFQ-0081"]
    },
    {
      id: "SUP-003",
      name: "Alexandria Portland Cement Co.",
      nameAr: "شركة أسمنت بورتلاند الإسكندرية",
      email: "tenders@alex-portland.com",
      userType: "SUPPLIER",
      contactPerson: "Sherif Younes",
      phone: "+20 122 334 5566",
      crNumber: "8877665544",
      taxNumber: "300887766500003",
      category: "Cement & Aggregates",
      serviceAreas: ["Alexandria", "Beheira", "Matrouh"],
      rating: 4.5,
      tier: "Verified Supplier",
      submittedBidsCount: 6,
      wonContractsCount: 3,
      bankDetails: "Banque Misr - Account: 3000-5566-7788",
      activeRfqs: ["RFQ-0081"]
    }
  ],

  projects: [
    {
      id: "PRJ-001",
      code: "AMRC-2026",
      name: "Al-Mansoura Residential Complex",
      nameAr: "كمبوند المنصورة السكني",
      location: "New Mansoura, Sector B4",
      city: "New Mansoura",
      managerId: "USR-002",
      manager: "Eng. Tamer Khaled",
      siteEngineerId: "USR-005",
      siteEngineer: "Eng. Mohamed Fathy",
      status: "Active",
      progress: 48,
      startDate: "2025-06-01",
      targetEndDate: "2027-04-30",
      value: 14500000,
      totalSpend: 6240000,
      shortageAlertsCount: 2,
      surplusCount: 1,
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=600"
    },
    {
      id: "PRJ-002",
      code: "NACT-2025",
      name: "New Capital Business Tower",
      nameAr: "برج الأعمال - العاصمة الإدارية",
      location: "Central Business District (CBD), Plot 12",
      city: "New Administrative Capital",
      managerId: "USR-003",
      manager: "Eng. Mostafa Salem",
      siteEngineerId: "USR-005",
      siteEngineer: "Eng. Rami Fawzy",
      status: "Active",
      progress: 74,
      startDate: "2024-09-15",
      targetEndDate: "2026-12-30",
      value: 38200000,
      totalSpend: 28400000,
      shortageAlertsCount: 0,
      surplusCount: 3,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600"
    },
    {
      id: "PRJ-003",
      code: "AWH-2026",
      name: "Alexandria Waterfront Heights",
      nameAr: "أبراج كورنيش الإسكندرية",
      location: "Corniche Road, San Stefano",
      city: "Alexandria",
      managerId: "USR-002",
      manager: "Eng. Sara Adel",
      siteEngineerId: "USR-005",
      siteEngineer: "Eng. Yasser Helmy",
      status: "Active",
      progress: 25,
      startDate: "2025-11-01",
      targetEndDate: "2027-09-30",
      value: 19800000,
      totalSpend: 4950000,
      shortageAlertsCount: 3,
      surplusCount: 0,
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600"
    }
  ],

  materials: [
    {
      id: "MAT-001",
      sku: "STL-RB-16",
      name: "High Tensile Steel Rebar 16mm",
      nameAr: "حديد تسليح عالي المقاومة 16 مم (مشرشر)",
      category: "Metals & Structural",
      unit: "Ton",
      specifications: "Grade 60 / B500B, High yield 500 N/mm², 12m length",
      reorderThreshold: 35,
      marketPrice: 940,
      shelfLifeDays: null,
      storageConditions: "Covered dry yard on wooden dunnage"
    },
    {
      id: "MAT-002",
      sku: "CMT-PORT-42",
      name: "Portland Cement 42.5N",
      nameAr: "أسمنت بورتلاندي عادي 42.5N",
      category: "Masonry & Binding",
      unit: "Bag (50kg)",
      specifications: "CEM I 42.5 N according to EN 197-1 standards",
      reorderThreshold: 200,
      marketPrice: 6.8,
      shelfLifeDays: 90,
      storageConditions: "Dry enclosed warehouse, pallets off floor, max 10 bags height"
    },
    {
      id: "MAT-003",
      sku: "CONC-RM-30",
      name: "Ready-Mix Concrete C30/37",
      nameAr: "خرسانة جاهزة رتبة 30 نيوتن",
      category: "Concrete & Aggregates",
      unit: "m³",
      specifications: "Characteristic strength 30 MPa, slump 140±20mm",
      reorderThreshold: 50,
      marketPrice: 78,
      shelfLifeDays: 0,
      storageConditions: "Direct pour from transit mixer"
    },
    {
      id: "MAT-004",
      sku: "BLK-CON-20",
      name: "Hollow Concrete Blocks 20x20x40",
      nameAr: "بلوك أسمنتي مفرغ 20×20×40 سم",
      category: "Masonry & Binding",
      unit: "Thousand Pcs",
      specifications: "Compressive strength >= 3.5 MPa",
      reorderThreshold: 15,
      marketPrice: 420,
      shelfLifeDays: null,
      storageConditions: "Open site stack, protected corners"
    },
    {
      id: "MAT-005",
      sku: "PIP-PVC-4IN",
      name: "Heavy Duty PVC Drainage Pipes 4 Inch",
      nameAr: "مواسير صرف بي في سي 4 بوصة رمادي ضغط عالي",
      category: "Plumbing & Piping",
      unit: "Meter",
      specifications: "Class 4, ISO 4435",
      reorderThreshold: 120,
      marketPrice: 12.5,
      shelfLifeDays: null,
      storageConditions: "Horizontal racks shaded from direct sunlight"
    },
    {
      id: "MAT-006",
      sku: "TIL-CER-60",
      name: "Vitrified Porcelain Floor Tiles 60x60",
      nameAr: "بورسلين أرضيات 60×60 نخب أول مط",
      category: "Finishing & Architectural",
      unit: "m²",
      specifications: "Full body rectified matte, PEI 5",
      reorderThreshold: 250,
      marketPrice: 18.0,
      shelfLifeDays: null,
      storageConditions: "Indoor carton boxes standing upright"
    }
  ],

  projectInventory: [
    {
      projectId: "PRJ-001",
      materialId: "MAT-001",
      plannedBOQ: 420,
      orderedQty: 280,
      receivedQty: 280,
      consumedQty: 254,
      remainingQty: 26,
      reservedQty: 10,
      availableQty: 16,
      dailyBurnRate: 2.8,
      daysOfSupplyLeft: 5.7,
      shortageRisk: "High"
    },
    {
      projectId: "PRJ-001",
      materialId: "MAT-002",
      plannedBOQ: 3500,
      orderedQty: 2200,
      receivedQty: 2200,
      consumedQty: 1850,
      remainingQty: 350,
      reservedQty: 50,
      availableQty: 300,
      dailyBurnRate: 45,
      daysOfSupplyLeft: 6.6,
      shortageRisk: "Medium"
    },
    {
      projectId: "PRJ-002",
      materialId: "MAT-001",
      plannedBOQ: 950,
      orderedQty: 950,
      receivedQty: 950,
      consumedQty: 840,
      remainingQty: 110,
      reservedQty: 20,
      availableQty: 90,
      dailyBurnRate: 0.2,
      daysOfSupplyLeft: 450,
      shortageRisk: "None",
      isSurplus: true
    },
    {
      projectId: "PRJ-002",
      materialId: "MAT-005",
      plannedBOQ: 1400,
      orderedQty: 1400,
      receivedQty: 1400,
      consumedQty: 1120,
      remainingQty: 280,
      reservedQty: 0,
      availableQty: 280,
      dailyBurnRate: 0,
      daysOfSupplyLeft: 999,
      shortageRisk: "None",
      isSurplus: true
    },
    {
      projectId: "PRJ-003",
      materialId: "MAT-001",
      plannedBOQ: 600,
      orderedQty: 200,
      receivedQty: 180,
      consumedQty: 160,
      remainingQty: 20,
      reservedQty: 5,
      availableQty: 15,
      dailyBurnRate: 3.5,
      daysOfSupplyLeft: 4.2,
      shortageRisk: "High"
    }
  ],

  requests: [
    {
      id: "REQ-00101",
      projectId: "PRJ-001",
      projectName: "Al-Mansoura Residential Complex",
      materialId: "MAT-001",
      materialName: "High Tensile Steel Rebar 16mm",
      quantity: 50,
      unit: "Ton",
      requiredDate: "2026-10-28",
      deliveryLocation: "Site Gate 2 - Storage Bay 4",
      priority: "Urgent",
      status: "Checked - Internal Match Found",
      createdBy: "Eng. Mohamed Fathy",
      createdAt: "2026-10-18T09:30:00Z",
      notes: "Needed for 4th floor columns and slab pouring schedule.",
      internalMatch: {
        sourceProjectId: "PRJ-002",
        sourceProjectName: "New Capital Business Tower",
        availableQty: 90,
        distanceKm: 145,
        estimatedTransportCost: 1450,
        estimatedPurchaseCost: 47000,
        netSavings: 45550,
        specsMatchPercentage: 100,
        recommendedAction: "Internal Transfer (TR-00101)"
      }
    },
    {
      id: "REQ-00102",
      projectId: "PRJ-003",
      projectName: "Alexandria Waterfront Heights",
      materialId: "MAT-002",
      materialName: "Portland Cement 42.5N",
      quantity: 600,
      unit: "Bag (50kg)",
      requiredDate: "2026-10-25",
      deliveryLocation: "Substructure Basement Bay",
      priority: "Very Urgent",
      status: "RFQ Issued",
      createdBy: "Eng. Sara Adel",
      createdAt: "2026-10-17T11:00:00Z",
      notes: "No internal stock available near Alex. RFQ dispatched to 3 certified suppliers.",
      internalMatch: null,
      rfqId: "RFQ-0081"
    }
  ],

  surplusListings: [
    {
      id: "SUR-0001",
      projectId: "PRJ-002",
      projectName: "New Capital Business Tower",
      materialId: "MAT-001",
      materialName: "High Tensile Steel Rebar 16mm",
      sku: "STL-RB-16",
      quantity: 90,
      unit: "Ton",
      condition: "Brand New - Mill Certified in Wrapped Bundles",
      marketValue: 84600,
      detectedDate: "2026-10-10",
      reason: "Structural core phase completed under initial structural steel allowance.",
      status: "Available for Reallocation",
      storageLocation: "Central Yard - Staging Area Alpha",
      shelfLifeDaysRemaining: "Permanent"
    },
    {
      id: "SUR-0002",
      projectId: "PRJ-002",
      projectName: "New Capital Business Tower",
      materialId: "MAT-005",
      materialName: "Heavy Duty PVC Drainage Pipes 4 Inch",
      sku: "PIP-PVC-4IN",
      quantity: 280,
      unit: "Meter",
      condition: "Pristine - Stored on Racks",
      marketValue: 3500,
      detectedDate: "2026-10-12",
      reason: "Plumbing risers design revision reduced total vertical runs.",
      status: "Available for Reallocation",
      storageLocation: "Basement Level 2 Storage Room",
      shelfLifeDaysRemaining: "Permanent"
    }
  ],

  transfers: [
    {
      id: "TR-00101",
      requestId: "REQ-00101",
      sourceProjectId: "PRJ-002",
      sourceProjectName: "New Capital Business Tower",
      targetProjectId: "PRJ-001",
      targetProjectName: "Al-Mansoura Residential Complex",
      materialId: "MAT-001",
      materialName: "High Tensile Steel Rebar 16mm",
      quantity: 50,
      unit: "Ton",
      transportCost: 1450,
      totalSaved: 45550,
      status: "Pending Source PM Approval",
      requestedBy: "Eng. Tamer Khaled (Target PM)",
      sourceApprover: "Eng. Mostafa Salem (Source PM)",
      createdAt: "2026-10-18T10:15:00Z"
    }
  ],

  // RFQs and Supplier Quotations with Contractor Response/Feedback
  rfqs: [
    {
      id: "RFQ-0081",
      requestId: "REQ-00102",
      projectId: "PRJ-003",
      projectName: "Alexandria Waterfront Heights",
      materialId: "MAT-002",
      materialName: "Portland Cement 42.5N",
      quantity: 600,
      unit: "Bag (50kg)",
      targetDeliveryDate: "2026-10-25",
      deadline: "2026-10-22T18:00:00Z",
      status: "Quotations Under Review",
      invitedSuppliersCount: 3,
      quotationsCount: 3,
      quotations: [
        {
          id: "QT-8101",
          supplierId: "SUP-002",
          supplierName: "Misr Beni Suef Cement Co.",
          unitPrice: 6.45,
          totalMaterialPrice: 3870,
          deliveryCost: 180,
          finalTotalPrice: 4050,
          deliveryLeadTimeDays: 2,
          warranty: "Factory Quality Certificate EN 197-1",
          supplierRating: 4.8,
          onTimeDeliveryRate: 98,
          aiScore: 94.5,
          isAiRecommended: true,
          aiRationale: "Lowest total price, 2-day delivery strictly matches urgent deadline.",
          status: "Accepted - PO Issued",
          contractorFeedback: "Congratulations! Your offer was selected. Purchase Order PO-0043 has been generated and issued.",
          respondedAt: "2026-10-19T14:10:00Z"
        },
        {
          id: "QT-8102",
          supplierId: "SUP-003",
          supplierName: "Alexandria Portland Cement Co.",
          unitPrice: 6.70,
          totalMaterialPrice: 4020,
          deliveryCost: 120,
          finalTotalPrice: 4140,
          deliveryLeadTimeDays: 1,
          warranty: "Standard Certificate",
          supplierRating: 4.5,
          onTimeDeliveryRate: 92,
          aiScore: 89.0,
          isAiRecommended: false,
          aiRationale: "Fastest 1-day delivery but 2.2% higher total cost than recommended option.",
          status: "Declined",
          contractorFeedback: "Thank you for bidding. Another competitive offer met our target unit budget.",
          respondedAt: "2026-10-19T14:10:00Z"
        }
      ]
    },
    {
      id: "RFQ-0084",
      requestId: "REQ-00108",
      projectId: "PRJ-002",
      projectName: "New Capital Business Tower",
      materialId: "MAT-001",
      materialName: "High Tensile Steel Rebar 12mm",
      quantity: 80,
      unit: "Ton",
      targetDeliveryDate: "2026-11-12",
      deadline: "2026-11-05T18:00:00Z",
      status: "Open for Supplier Bids",
      invitedSuppliersCount: 2,
      quotationsCount: 1,
      quotations: [
        {
          id: "QT-8401",
          supplierId: "SUP-001",
          supplierName: "Ezz Steel Mills Egypt",
          unitPrice: 920,
          totalMaterialPrice: 73600,
          deliveryCost: 1200,
          finalTotalPrice: 74800,
          deliveryLeadTimeDays: 3,
          warranty: "Mill Test Certificate B500B Grade 60",
          supplierRating: 4.9,
          onTimeDeliveryRate: 99,
          aiScore: 96.0,
          isAiRecommended: true,
          aiRationale: "Top-tier reliability and direct mill pricing.",
          status: "Under Evaluation",
          contractorFeedback: "Bid received and undergoing technical specification check by procurement team.",
          respondedAt: null
        }
      ]
    }
  ],

  purchaseOrders: [
    {
      id: "PO-0043",
      rfqId: "RFQ-0081",
      requestId: "REQ-00102",
      supplierName: "Misr Beni Suef Cement Co.",
      supplierId: "SUP-002",
      materialName: "Portland Cement 42.5N",
      quantity: 600,
      unit: "Bag (50kg)",
      unitPrice: 6.45,
      totalPrice: 4050,
      issueDate: "2026-10-19",
      expectedDeliveryDate: "2026-10-24",
      deliveryLocation: "Alexandria Waterfront Heights - Substructure Staging",
      status: "Issued - Awaiting Delivery",
      paymentTerms: "Standard Commercial Terms (Net 30)"
    }
  ],

  wastePredictions: [
    {
      id: "WP-001",
      projectId: "PRJ-001",
      projectName: "Al-Mansoura Residential Complex",
      activity: "Structural Columns & Beams Rebar Fabrication",
      activityAr: "تشكيل وتقطيع حديد أعمدة وكمرات الهيكل",
      materialId: "MAT-001",
      materialName: "High Tensile Steel Rebar 16mm",
      unit: "Ton",
      plannedBOQ: 140,
      actualConsumed: 148.5,
      predictedWasteQty: 11.2,
      predictedWastePercentage: 8.0,
      standardIndustryBaseline: 4.5,
      deviation: "+3.5% above baseline",
      abnormalConsumptionDetected: true,
      riskCategory: "High",
      contributingFactors: [
        "Inefficient cut-length optimization (off-cuts shorter than lap splice length)",
        "Frequent design revisions in column rebar detailing for Zone B",
        "Site rust oxidation from outdoor open yard staging without moisture barriers"
      ],
      aiRecommendations: [
        "Implement a Bar Bending Schedule (BBS) 1D cutting-stock optimization software immediately.",
        "Consolidate short off-cuts (>1.8m) for non-structural lintels and stair reinforcement.",
        "Elevate open storage rebar bundles on 15cm wooden dunnage with waterproof tarpaulins."
      ],
      humanReviewStatus: "Investigated by PM",
      humanNotes: "Meeting held with structural subcontractor. Cut optimization software mandated for Floor 5 onward.",
      investigatedBy: "Eng. Tamer Khaled",
      timestamp: "2026-10-17T14:20:00Z",
      modelVersion: "v2.4-XGBoost-ConstructML"
    }
  ]
};

module.exports = database;
