require('dotenv').config();
const express                            = require('express'),
      path                               = require('path'),
      https                              = require('https'),
      fs                                 = require('fs'),
      app                                = express(),
      cors                               = require('cors'),
      bodyParser                         = require('body-parser'),
      helmet                             = require('helmet'),
      db                                 = require('./models'),
      errorHandler                       = require('./controllers/error'),
      authRoutes                         = require('./routes/auth'),
      messageRoutes                      = require('./routes/messages'),
      replyRoutes                       = require('./routes/replies'),
      {loginRequired, ensureCorrectUser} = require('./middleware/auth');

const PORT = process.env.PORT || 8080;

app.use(helmet({
    hidePoweredBy: {
        setTo: 'PHP 7.4.5'
    }
}));
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "build")));

app.use('/api/auth', authRoutes);
app.use(
    '/api/users/:id/messages',
    loginRequired,
    ensureCorrectUser,
    messageRoutes
);

app.use(
    '/api/users/:id/messages/:message_id/replies',
    loginRequired,
    ensureCorrectUser,
    replyRoutes
);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get('/api/messages', loginRequired, async function(req, res, next) {
   try {
       let messages = await db.Message.find()
           .sort({createdAt: -1})
           .populate("user", {
               username: true,
           }).populate({
               path: "replies",
               populate: {path: "user", select: "username"}
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

// https.createServer({
//     key: fs.readFileSync(path.resolve('cert/server.key')),
//     cert: fs.readFileSync(path.resolve('cert/server.crt'))
// }, app)
    app.listen(PORT, () => {
        console.log(`Server is starting on port ${PORT}`);
    });