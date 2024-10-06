const express = require('express');
const celestialService = require('../../frontend/services/celestialService');

const router = express.Router();

// Route to fetch NEO data
router.get('/bodies', async (req, res) => {
    try {
        const data = await celestialService.getCelestialData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch celestial data' });
    }
});

module.exports = router;
