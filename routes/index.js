import express from 'express';
import home from './modules/home.js';
import restaurants from './modules/restaurants.js';
import users from './modules/users.js';

const router = express.Router();

router.use('/', home);
router.use('/restaurants', restaurants);
router.use('/users', users);

export default router;
