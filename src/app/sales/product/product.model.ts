import { Schema, model } from 'mongoose';

// Define the schema for the Product
const productSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    batchNo: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      min: 0,
      default: 0,
    },
    reorderQty: {
      type: Number,
      min: 0,
      default: 0,
    },
    salesPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    costPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Create the Product model
const ProductModel = model('Product', productSchema);

export default ProductModel;
