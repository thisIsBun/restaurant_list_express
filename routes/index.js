import express from 'express';
import home from './modules/home.js';
import restaurants from './modules/restaurants.js';
import users from './modules/users.js';
import authenticator from '../middleware/auth.js';

const router = express.Router();

router.use('/restaurants', authenticator, restaurants);
router.use('/users', users);
router.use('/', authenticator, home);

export default router;
