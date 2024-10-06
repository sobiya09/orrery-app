const express = require('express');
const path = require('path');
const celestialRoutes = require('./routes/celestialRoutes');

const app = express();
const PORT = 5000;

app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/api/celestial', celestialRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
