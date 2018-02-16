
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');

const app = express();
app.use(bodyParser.json())
app.use(cookieParser());
app.use(session({
        secret: 'instacart-challenge',
        resave: true,
        saveUninitialized: true
    }
));

const cookieNames = ["fname", "lname", "email", "number", "zipcode"];

app.use( "/build", express.static(path.resolve('build')));
app.use( "/client", express.static(path.resolve('client')));

app.get('/', (req, res, next)=>{
    if(req.cookies && req.cookies.email && req.cookies.email.length ) {
        res.redirect("/background");
    } else {
        res.sendFile(path.resolve("index.html"));
    }
});

app.get('/background', (req, res, next)=> {
    if (!req.cookies || !req.cookies.email || !req.cookies.email.length) {
        res.redirect("/");
    }  else {
        res.sendFile(path.resolve("index.html"));
    }
});

app.post('/save-shopper', (req, res, next)=>{

    const config = { maxAge :60*60*1000, httpOnly:false};
    for( let cookieName of cookieNames ){
        res.cookie(cookieName,  req.body[cookieName], config);
    }

    res.sendStatus(200);
});

app.post('/add-shopper', (req, res, next)=>{
    console.info("Shopper info: " + JSON.stringify(req.body) );
    const config = { expires : new Date(0), httpOnly:false};
    for( let cookieName of cookieNames ){
        res.cookie(cookieName,  "", config);
    }


    res.sendStatus(200);
});

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});

