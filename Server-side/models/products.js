import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  imageurl: {
    type: String,
    require: true,
  },
}, {
  timestamps: true,
});

const ProductModel = mongoose.model('Product', ProductSchema);
export default ProductModel;
