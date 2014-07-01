var fs = require('fs');
var path = require('path');
var express = require('express');
var app = module.exports = express();

// middleware
app.use(express.compress());
app.use(express.favicon());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(app.router); // prioritize routes over public folder
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Router requests
 */

// Index page
app.get('/', function(req, res) {
    fs.readFile(path.join(__dirname, '/public/index.html'), function (err, html) {
        if (err) throw err;

        // send index page
        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();
    });
});

console.log('Listening at 8000');
app.listen(8000);