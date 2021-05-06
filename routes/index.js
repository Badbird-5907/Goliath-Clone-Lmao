const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('mongoose').model('User');
const flash = require('express-flash');
const path = require('path');
router.get("/",isLoggedIn,function(req,res){
  res.render('home',{'nav': 'asdf'});
});
router.get('/status',isLoggedIn,function (req,res){
  res.render('status',{authServer: sessionServer,mojangAPI: mojangApi,textures: textures,flash: req.flash('flash'),alertMessage: '', alertTitle: '',username: req.user.username});
});

router.get("/secret",isLoggedIn, function(req, res){
  res.send("pog");
});
router.get('/users',isLoggedIn,function (req,res){
  //TODO: user roles to also allow other staff
  res.render('home')
});

// Auth Routes

router.get("/register", function(req, res){
  res.render("register");
});
//handling user sign up
router.post("/register", function(req, res){
  try{
    User.register(new User({username:req.body.username}),req.body.password, function(err, user){
      if(err){
        console.log(err);
        return res.render('register');
      } //user strategy
      passport.authenticate("local")(req, res, function(){
        res.redirect("/home");
      });
    });
  }catch (e) {
    console.log(e)
    res.redirect('/login');
  }
});

// Login Routes

router.get("/login", function(req, res){
  req.flash('flash','');
  if(isLoggedInBool(req))
    res.redirect('/home')
  res.render("login",{ flash: req.flash('flash'),alertMessage: '', alertTitle: ''});
})
router.get("/loginFail",(req,res)=>{
  res.status(401);
  incorrectInfo(req,res);
})
router.post("/login", function (req,res,next){
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.render('login',{ flash: 'Incorrect Login Details!',alertTitle: '',alertMessage: ''}); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/home');
    });
  })(req, res, ()=>{

  });
});
router.post('/token',function (req,res){
  //res.redirect('/login');
  res.render('login',{flash: 'Incorrect Login Details!'})
})
router.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});
router.get('/home',isLoggedIn,function (req,res){
  res.render('home',{ flash: req.flash('flash'),alertMessage: '', alertTitle: '',username: req.user.username})
});
router.get('/nav',isLoggedIn,function (req,res){
  res.render('nav',{username: req.user.username,onlinePlayers: 100,uniquePlayers:150,proxyStatus: 'Online',mojangStatus: mojangOverall});
  //res.sendFile('../html/nav.html',{username: req.user.username})
})
router.get('/flash',isLoggedIn,function (req,res){
  req.flash('flash','flash');
  res.redirect('/home')
})
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}
function isLoggedInBool(req){
  if(req.isAuthenticated()){
    return true;
  }
  return false;
}
function incorrectInfo(req,res){
  // set locals, only providing error in development
  res.locals.message = 'Incorrect Username/Password/Token';
  res.locals.error = req.app.get('env') === 'development' ? '' : {};

  // render the error page
  res.status(401);
  res.render('error');
}
module.exports = router;
