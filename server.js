const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('.html', require('ejs').renderFile);

const router = express.Router();

// get home page
router.get('/', (req, res) =>
{
	try
	{
		res.render('index');
	}
	catch
	{
		res.end('something went wrong');
	}
});

// get portfolio page
router.get('/portfolio/', (req, res) =>
{
	console.log('asfasdf');
	try
	{
		res.render('portfolio', {ACCESS_KEY: process.env.ACCESS_KEY});
	}
	catch
	{
		res.end('something went wrong');
	}
});

const port = process.env.PORT || 8080;
const server = app.listen(port, () =>
{
	console.log('listening on port ' + port);
});
