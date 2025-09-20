const express = require('express');
const loggingMiddleware = require('./loggingMiddleware');
const app = express();

// Use logging middleware globally
app.use(loggingMiddleware);

// ...your URL shortener routes here...

app.listen(3000, () => {
  console.log('URL Shortener microservice running on port 3000');
});