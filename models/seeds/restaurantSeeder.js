import Restaurant from '../restaurant.js';
import data from './restaurants.js';
import db from '../../config/mongoose.js';
import bcryptjs from 'bcryptjs';
import User from '../user.js';

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678',
};

db.once('open', () => {
  const { name, email, password } = SEED_USER;

  bcryptjs
    .genSalt(10)
    .then((salt) => bcryptjs.hashSync(password, salt))
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => {
      return Promise.all(
        Array.from({ length: data.length }, (_, i) => {
          const restaurant = { ...data[i], userId: user._id };
          return Restaurant.create(restaurant);
        }),
      );
    })
    .then(() => {
      console.log('seeder done');
      process.exit();
    });
});
