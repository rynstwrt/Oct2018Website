const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const path = require('path');
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.engine('.html', require('ejs').renderFile);

app.locals.key.ACCESS_KEY = process.env.ACCESS_KEY;

// get home page
app.get('/', (req, res) =>
{
	res.render('index');
});

app.get('/portfolio/', (req, res) =>
{
	res.render('portfolio', {ACCESS_KEY: process.env.ACCESS_KEY});
});

const port = process.env.PORT || 8080;
const server = app.listen(port, () =>
{
	console.log('listening on port ' + port);
});
