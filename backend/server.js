const express = require('express');
const cors = require('cors');

const authRoutes = require('./src/routes/authRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const materialRoutes = require('./src/routes/materialRoutes');
const requestRoutes = require('./src/routes/requestRoutes');
const transferRoutes = require('./src/routes/transferRoutes');
const procurementRoutes = require('./src/routes/procurementRoutes');
const surplusRoutes = require('./src/routes/surplusRoutes');
const wastePredictionRoutes = require('./src/routes/wastePredictionRoutes');
const aiAssistantRoutes = require('./src/routes/aiAssistantRoutes');
const ocrRoutes = require('./src/routes/ocrRoutes');
const analyticsRoutes = require('./src/routes/analyticsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/procurement', procurementRoutes);
app.use('/api/surplus', surplusRoutes);
app.use('/api/waste-prediction', wastePredictionRoutes);
app.use('/api/ai-assistant', aiAssistantRoutes);
app.use('/api/ocr', ocrRoutes);
app.use('/api/analytics', analyticsRoutes);

// Root & Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'IRAM Intelligent Construction Material Lifecycle API',
    version: '2.0.0',
    timestamp: new Date().toISOString()
  });
});

// Start Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[IRAM API] Server running on http://localhost:${PORT}`);
    console.log(`[IRAM API] Endpoints ready for Company Admin, PM, Procurement, Warehouse & Suppliers.`);
  });
}

module.exports = app;
