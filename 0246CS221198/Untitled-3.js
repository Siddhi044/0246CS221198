const Url = require('../models/Url');
const crypto = require('crypto');

// Generate a random 6-character code
function generateShortCode(length = 6) {
  return crypto.randomBytes(length / 2).toString('hex');
}

exports.shortenUrl = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  let code;
  let exists = true;

  // Ensure unique code
  while (exists) {
    code = generateShortCode();
    exists = await Url.exists({ code });
  }

  const newUrl = new Url({ code, originalUrl: url });
  await newUrl.save();
  res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${code}` });
};

exports.redirectUrl = async (req, res) => {
  const { code } = req.params;
  const found = await Url.findOne({ code });
  if (found) {
    res.redirect(found.originalUrl);
  } else {
    res.status(404).json({ error: 'Short URL not found' });
  }
};