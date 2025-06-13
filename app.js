import express from 'express';
import { engine } from 'express-handlebars';
import routers from './routes/index.js';
import session from 'express-session';
import './config/mongoose.js';
import usePassport from './config/passport.js';
import { createRequire } from 'module';
import flash from 'connect-flash';
import 'dotenv/config';

const require = createRequire(import.meta.url);
const methodOverride = require('method-override');

const app = express();
const port = process.env.PORT;

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
usePassport(app);
app.use(flash());

// setup variables by res.locals
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.warning_msg = req.flash('warning_msg');
  res.locals.success_msg = req.flash('success_msg');
  next();
});

app.use(routers);

app.listen(port, () => {
  console.log(`Express server is listen now: http://localhost:${port}`);
});
