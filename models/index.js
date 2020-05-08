const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;
const DB_URI = process.env.DB || 'mongodb://localhost/GuestBook';
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});