import express from 'express';
import Restaurant from '../../models/restaurant.js';
const router = express.Router();

router.get('/', (req, res) => {
  const userId = req.user._id;
  Restaurant.find({ userId })
    .lean()
    .then((data) => res.render('index', { restaurantData: data }))
    .catch((error) => console.log(error));
});

router.get('/search', (req, res) => {
  const userId = req.user._id;
  const { keyword } = req.query;
  Restaurant.find({ userId })
    .lean()
    .then((restaurants) => {
      const results = restaurants.filter((data) => {
        return (
          data.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) ||
          data.category.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
        );
      });
      res.render('index', { restaurantData: results, keyword });
    });
});

export default router;
