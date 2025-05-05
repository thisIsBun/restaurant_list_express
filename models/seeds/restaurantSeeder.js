const Restaurant = require('../restaurant')
const data = require('./restaurants.json').results
const db = require('../../config/mongoose')

db.once('open', () => {
  for (let i = 0; i < data.length; i++) {
    Restaurant.create(data[i])
  }
  console.log('seeder done')
})