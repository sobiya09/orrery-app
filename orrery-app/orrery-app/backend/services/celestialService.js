const axios = require('axios');

const API_KEY = 'hFT9WFLUqf4vrrLqInLfPIr6P7WCPbyO6a7CZLZj';
const NEO_API_URL = `https://api.nasa.gov/neo/rest/v1/feed?api_key=${API_KEY}`;

async function getCelestialData() {
    try {
        const response = await axios.get(NEO_API_URL);
        return response.data.near_earth_objects; 
    } catch (error) {
        console.error("Error fetching NEO data:", error);
        throw error; 
    }
}

module.exports = { getCelestialData };
