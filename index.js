require('dotenv').config();
const express      = require('express'),
      app          = express(),
      cors         = require('cors'),
      bodyParser   = require('body-parser'),
      errorHandler = require('./controllers/error');

const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
});