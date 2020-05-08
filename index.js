require('dotenv').config();
const express      = require('express'),
      app          = express(),
      cors         = require('cors'),
      bodyParser   = require('body-parser'),
      errorHandler = require('./controllers/error'),
      authRoutes   = require('./routes/auth');

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

app.use((req, res, next) => {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
});