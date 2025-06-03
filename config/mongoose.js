import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

db.on('error', () => {
  console.log('mongodb error');
});

db.once('open', () => {
  console.log('mongodb connected');
});

export default db;
