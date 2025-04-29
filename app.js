const express = require('express');
const engine = require('express-handlebars');
const restaurantData = require('./restaurants.json').results;
const app = express();
const port = 3000;

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { restaurantData });
});

app.get('/search', (req, res) => {
  const keyword = req.query.keyword;
  const results = restaurantData.filter((data) => {
    return (
      data.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) ||
      data.category.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
    );
  });
  res.render('index', { restaurantData: results, keyword });
});

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantData.find(
    (restaurant) => restaurant.id === Number(req.params.id)
  );
  res.render('show', { restaurant });
});

app.listen(port, () => {
  console.log(`Express server is listen now: http://localhost:${port}`);
});
