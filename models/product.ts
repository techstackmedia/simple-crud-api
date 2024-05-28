import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Product name is required'],
    },
    quantity: {
      type: Number,
      require: [true, 'Product quantity is required'],
      default: 0,
    },
    price: {
      type: Number,
      require: [true, 'Product price is required'],
    },
    img: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', ProductSchema);

export default Product;
