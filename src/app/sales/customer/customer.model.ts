import { Schema, model } from 'mongoose';

const customerSchema = new Schema({
  user: { type: Schema.ObjectId, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  dueAmount: { type: Number },
  regNo: { type: String },
});

const CustomerModel = model('Customer', customerSchema);
export default CustomerModel;
