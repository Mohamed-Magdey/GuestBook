require('dotenv').config();
const express       = require('express'),
      app           = express(),
      cors          = require('cors'),
      bodyParser    = require('body-parser'),
      db            = require('./models'),
      errorHandler  = require('./controllers/error'),
      authRoutes    = require('./routes/auth'),
      messageRoutes = require('./routes/messages');

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/users/:id/messages', messageRoutes);

app.get('/api/messages', async function(req, res, next) {
   try {
       let messages = await db.Message.find()
           .sort({createdAt: -1})
           .populate("user", {
               username: true,
           });
       return res.status(200).json(messages);
   } catch (err) {
       next(err);
   }
});

app.use((req, res, next) => {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
});