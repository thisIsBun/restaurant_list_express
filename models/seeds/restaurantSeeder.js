const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const data = require('./restaurants.json').results
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
  for (let i = 0; i < data.length; i++) {
    Restaurant.create(data[i])
  }
  console.log('seeder done')
})