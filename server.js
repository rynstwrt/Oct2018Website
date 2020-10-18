const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname));


app.get('/', (req, res) =>
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

app.get('/portfolio/', (req, res) =>
{
	try
	{
		console.log('access key before send' + process.env.ACCESS_KEY);
		res.render('/portfolio/portfolio', {ACCESS_KEY: process.env.ACCESS_KEY});
	}
	catch
	{
		res.end('something went wrong');
	}
});

const server = app.listen(process.env.PORT || 8080, () =>
{
	console.log('listening');
});
