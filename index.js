const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      cors       = require('cors');

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
})