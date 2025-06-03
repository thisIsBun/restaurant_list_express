import express from 'express';
import home from './modules/home.js';
import restaurants from './modules/restaurants.js';

const router = express.Router();

router.use('/', home);
router.use('/restaurants', restaurants);

export default router;
