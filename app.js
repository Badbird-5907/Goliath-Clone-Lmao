const express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    User                    = require("./models/user"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    logger = require('morgan'),
    path = require('path'),
    createError = require('http-errors'),
    status = require('./util/status'),
    flash = require('express-flash')
status.init();
require('dotenv').config();
const app = express();
const indexRouter = require('./routes/index');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/OctoControl");

app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
  secret:process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.set('view engine','ejs');
//
app.use(passport.initialize());
app.use(passport.session());
//
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
try{
  app.use(flash())
}catch(e){
  console.log(e)
}
app.use('/',indexRouter);
app.use('/util',indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server = app.listen(80, () => {
  console.log(`OctoControl running on http://localhost:${server.address().port}`);
});
module.exports = app;
