import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  name_en: {
    type: String,
  },
  category: {
    type: String,
  },
  image: {
    type: String,
  },
  location: {
    type: String,
  },
  phone: {
    type: String,
  },
  google_map: {
    type: String,
  },
  rating: {
    type: Number,
  },
  description: {
    type: String,
  },
  userId: {
    // mongoose populate function
    // type and ref set together, specify userId is an ObjectId type, and points to User model ref
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true,
  },
});

export default mongoose.model('Restaurant', restaurantSchema);
