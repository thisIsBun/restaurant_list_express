const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routers = require('./routes')
require('./config/mongoose')

const app = express();
const port = 3000;

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routers)

app.listen(port, () => {
  console.log(`Express server is listen now: http://localhost:${port}`);
});
