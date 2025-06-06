import express from 'express';
import { engine } from 'express-handlebars';
import routers from './routes/index.js';
import session from 'express-session';
import './config/mongoose.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const methodOverride = require('method-override');

const app = express();
const port = 3000;

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(session({ secret: 'iphone', resave: false, saveUninitialized: true }));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(routers);

app.listen(port, () => {
  console.log(`Express server is listen now: http://localhost:${port}`);
});
