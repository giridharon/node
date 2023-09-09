const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5500;
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.listen(port, function() {
    console.log("Listening on port: " + port);
});

const userroute = require('./server/routes/user');
app.use('/', userroute);
