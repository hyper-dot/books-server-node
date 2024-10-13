import { Schema, model } from 'mongoose';

const batchSchema = new Schema(
  {
    batchNo: {
      type: Number, // Batch number is unique for each product
      required: true,
    },
    qty: {
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
  { id: false, timestamps: true },
);

// Define the schema for the Product
const productSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    reorderLevel: {
      type: Number,
      min: 0,
      default: 0,
    },
    name: {
      type: String,
      required: true,
      unique: true, // Ensure product name is unique
    },
    batches: [batchSchema], // Array of batches
  },
  {
    timestamps: true,
  },
);

productSchema.index({ user: 1, name: 1 }, { unique: true });

// Create the Product model
const ProductModel = model('Product', productSchema);
export default ProductModel;
