const express = require('express');
const app = express();
const port = 8080;

app.use(express.static(__dirname));
app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/', (req, res) => {
	res.render('index');
})

app.listen(port, (err) => {
	if (err) console.log(err);
 	console.log(`App listening at http://localhost:${port}`)
})
