"use strict";

var _          = require("lodash");
var express    = require("express");
var request    = require("request");
var http       = require("http");
var handlebars = require("express3-handlebars");
var browserify = require('browserify');
var literalify = require('literalify');
var open       = require('open');

var app = express();
var server = http.createServer(app);

app.engine("handlebars", handlebars.create({}).engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin', "*");
    next();
});

app.use("/public", express.static(__dirname + "/static"));

app.get("/bundle.js", function(req, res) {
    res.setHeader('Content-Type', 'text/javascript');
    browserify()
        .transform({
            global: true,
            ignore: [
                '**/js/exercises/**/usrcode.js'
            ]
        }, 'uglifyify')
        .require('./js/main.js')
        .bundle()
        .pipe(res);
});

app.get("/code/*", function(req, res) {
    res.setHeader('Content-Type', 'text/javascript');
    res.send('200', decodeURI(req.url.slice(6).replace('$HASH$', '#')))
});

app.get("/", function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.render('main', {
        levelsAmount: 1
    });
});

server.listen(5555, 'localhost');
console.log("open http://localhost:5555");
open("http://localhost:5555");
