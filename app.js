const express = require('express');
const engine = require('express-handlebars');
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
require('dotenv').config()

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then((data) => res.render('index', { restaurantData: data }))
    .catch(error => console.log(error))
});

app.get('/search', (req, res) => {
  const { keyword } = req.query;
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const results = restaurants.filter((data) => {
        return (
          data.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) ||
          data.category.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
        );
      });
      res.render('index', { restaurantData: results, keyword });
    })

});

app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.get('/restaurants/:id', (req, res) => {
  const { id } = req.params
  Restaurant.findById(id)
    .lean()
    .then(data => res.render('show', { restaurant: data }))
    .catch(error => console.log(error))
});

app.post('/restaurants', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express server is listen now: http://localhost:${port}`);
});
