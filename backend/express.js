const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

const urlDatabase = {};

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Generate a random 6-character short code
function generateShortCode() {
    return crypto.randomBytes(3).toString('hex');
}

// Endpoint to shorten a URL
app.post('/shorten', (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'Missing url in body' });
    }
    const code = generateShortCode();
    urlDatabase[code] = url;
    res.json({ shortUrl: `http://localhost:${PORT}/${code}` });
});

// Endpoint to redirect using code
app.get('/:code', (req, res) => {
    const { code } = req.params;
    const url = urlDatabase[code];
    if (url) {
        return res.redirect(url);
    }
    res.status(404).json({ error: 'Short URL not found' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`URL Shortener running at http://localhost:${PORT}`);
});