const express = require('express');
const router = express.Router();
const db = require('../data/mockDatabase');

// Get all RFQs
router.get('/rfqs', (req, res) => {
  res.json({ success: true, data: db.rfqs });
});

// Get single RFQ
router.get('/rfqs/:id', (req, res) => {
  const rfq = db.rfqs.find(r => r.id === req.params.id);
  if (!rfq) {
    return res.status(404).json({ success: false, message: 'RFQ not found' });
  }
  res.json({ success: true, data: rfq });
});

// Contractor responds to a quotation (Accept / Decline / Request Revision)
router.post('/rfqs/:id/respond-quote', (req, res) => {
  const { quoteId, decision, feedbackNotes, issuePO } = req.body;
  const rfq = db.rfqs.find(r => r.id === req.params.id);
  if (!rfq) {
    return res.status(404).json({ success: false, message: 'RFQ not found' });
  }

  const quote = rfq.quotations.find(q => q.id === quoteId);
  if (!quote) {
    return res.status(404).json({ success: false, message: 'Quotation not found' });
  }

  quote.status = decision; // "Accepted - PO Issued", "Declined", "Revision Requested"
  quote.contractorFeedback = feedbackNotes || "Thank you for your proposal.";
  quote.respondedAt = new Date().toISOString();

  let generatedPO = null;

  if (decision.includes("Accepted") || issuePO) {
    // Generate Purchase Order (PO)
    generatedPO = {
      id: `PO-${String(db.purchaseOrders.length + 44).padStart(4, '0')}`,
      rfqId: rfq.id,
      requestId: rfq.requestId,
      supplierName: quote.supplierName,
      supplierId: quote.supplierId,
      materialName: rfq.materialName,
      quantity: rfq.quantity,
      unit: rfq.unit,
      unitPrice: quote.unitPrice,
      totalPrice: quote.finalTotalPrice,
      issueDate: new Date().toISOString().split('T')[0],
      expectedDeliveryDate: new Date(Date.now() + quote.deliveryLeadTimeDays * 86400000).toISOString().split('T')[0],
      deliveryLocation: `${rfq.projectName} - Gate 1`,
      status: "Issued - Awaiting Delivery",
      paymentTerms: "Standard Commercial Terms (Net 30)"
    };

    db.purchaseOrders.unshift(generatedPO);
    rfq.status = "PO Generated & Closed";
  }

  res.json({
    success: true,
    data: {
      quotation: quote,
      purchaseOrder: generatedPO
    },
    message: `Contractor decision (${decision}) sent to ${quote.supplierName}.`
  });
});

// Supplier: Get all bids submitted by a specific supplier with contractor replies
router.get('/supplier/:supplierId/bids', (req, res) => {
  const { supplierId } = req.params;

  const supplierBids = [];
  db.rfqs.forEach(rfq => {
    const matchingQuote = rfq.quotations.find(q => q.supplierId === supplierId);
    if (matchingQuote) {
      supplierBids.push({
        rfqId: rfq.id,
        project: rfq.projectName,
        material: rfq.materialName,
        quantity: `${rfq.quantity} ${rfq.unit}`,
        deliveryDeadline: rfq.targetDeliveryDate,
        quoteDetails: matchingQuote
      });
    }
  });

  res.json({
    success: true,
    data: supplierBids
  });
});

// Supplier submits a quotation (SRS 10.10)
router.post('/rfqs/:id/submit-quote', (req, res) => {
  const { supplierId, supplierName, unitPrice, deliveryCost, deliveryLeadTimeDays, warranty } = req.body;
  const rfq = db.rfqs.find(r => r.id === req.params.id);
  if (!rfq) {
    return res.status(404).json({ success: false, message: 'RFQ not found' });
  }

  const uPrice = Number(unitPrice);
  const delCost = Number(deliveryCost) || 0;
  const totalMat = uPrice * rfq.quantity;
  const finalTotal = totalMat + delCost;

  const newQuote = {
    id: `QT-${Date.now().toString().slice(-4)}`,
    supplierId: supplierId || "SUP-001",
    supplierName: supplierName || "Verified Supplier Partner",
    unitPrice: uPrice,
    totalMaterialPrice: totalMat,
    deliveryCost: delCost,
    finalTotalPrice: finalTotal,
    deliveryLeadTimeDays: Number(deliveryLeadTimeDays) || 3,
    warranty: warranty || "Standard Factory Certification",
    supplierRating: 4.8,
    onTimeDeliveryRate: 97,
    aiScore: 91.0,
    isAiRecommended: false,
    status: "Under Evaluation",
    contractorFeedback: "Bid received and queued for procurement review.",
    submittedAt: new Date().toISOString()
  };

  rfq.quotations.push(newQuote);
  rfq.quotationsCount = rfq.quotations.length;

  res.status(201).json({
    success: true,
    data: newQuote,
    message: "Quotation dispatched to Contractor Procurement Board."
  });
});

// Purchase orders
router.get('/purchase-orders', (req, res) => {
  res.json({ success: true, data: db.purchaseOrders });
});

module.exports = router;
