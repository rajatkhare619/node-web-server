const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    let t = new Date().toString();
    let log = `${t}: ${req.method}, ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        console.log(error);
    });

    next();
});

/*app.use((req, res, next) => {
    res.render('maintenance');
   // next();
});*/

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
   // res.send("<h1>yo nigga</h1>");
    res.render('home', {
        pageTitle: "Home page",
        welcomeMessage: "welcome to rajat's website"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: "About page",
    });
});

app.get('/projects', (req, res) => {
    res.render('projects', {
        pageTitle: "projects page"
    });
});

app.listen(port, () => {
    console.log("server started on port ", port);
});