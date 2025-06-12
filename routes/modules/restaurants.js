import express from 'express';
import Restaurant from '../../models/restaurant.js';
const router = express.Router();

router.get('/new', (req, res) => {
  res.render('new');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  Restaurant.findOne({ _id: id, userId })
    .lean()
    .then((data) => res.render('show', { restaurant: data }))
    .catch((error) => console.log(error));
});

router.post('/', (req, res) => {
  const userId = req.user._id;
  Restaurant.create({ ...req.body, userId })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
});

router.get('/:id/edit', (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  Restaurant.findOne({ _id: id, userId })
    .lean()
    .then((data) => res.render('edit', { restaurant: data }))
    .catch((error) => console.log(error));
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const { name, name_en, category, image, location, phone, google_map, rating, description } =
    req.body;

  Restaurant.findOne({ _id: id, userId })
    .then((data) => {
      data.name = name;
      data.name_en = name_en;
      data.category = category;
      data.image = image;
      data.location = location;
      data.phone = phone;
      data.google_map = google_map;
      data.rating = rating;
      data.description = description;
      data.userId = userId;
      return data.save();
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log(error));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  Restaurant.findOne({ _id: id, userId })
    .then((data) => data.deleteOne())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
});

export default router;
