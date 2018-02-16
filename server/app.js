
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

app.use( "/build", express.static(path.resolve('build')));
app.use( "/client", express.static(path.resolve('client')));

app.get('/', (req, res, next)=>{
    res.sendFile(path.resolve("index.html"));
});

app.get('/background', (req, res, next)=>{
    res.sendFile(path.resolve("index.html"));
});

app.post('/save-shopper', (req, res, next)=>{

    const config = { maxAge :60*60*1000*24, httpOnly:false};
    res.cookie("name", req.body.name, config);
    res.cookie("email", req.body.email,config);
    res.cookie("number", req.body.number, config);
    res.cookie("zipcode", req.body.zipcode, config);
    res.send();
});



const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});

