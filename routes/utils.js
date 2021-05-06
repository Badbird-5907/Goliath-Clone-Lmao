const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('mongoose').model('User');

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports = router;
