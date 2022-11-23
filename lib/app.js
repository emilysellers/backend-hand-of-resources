const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/colors', require('./controllers/colors'));
app.use('/sharks', require('./controllers/sharks'));
app.use('/cities', require('./controllers/cities'));
app.use('/pets', require('./controllers/pets'));
app.use('/parks', require('./controllers/parks'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
