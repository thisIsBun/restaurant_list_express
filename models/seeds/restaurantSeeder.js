import Restaurant from '../restaurant.js';
import data from './restaurants.js';
import db from '../../config/mongoose.js';

db.once('open', () => {
  for (let i = 0; i < data.length; i++) {
    Restaurant.create(data[i]);
  }
  console.log('seeder done');
});
