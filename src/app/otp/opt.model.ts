import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the OTP document
export interface IOTP extends Document {
  userId: mongoose.Types.ObjectId; // Reference to the user
  otp: string; // The OTP code
  createdAt: Date; // Creation time of the OTP
  expiresAt: Date; // Expiration time of the OTP
}

// Create the OTP schema
const OTPSchema: Schema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User', // Assuming you have a User model
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

// Add a TTL index on the expiresAt field
OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Create a model from the schema
const OTPModel = mongoose.model<IOTP>('OTP', OTPSchema);

export default OTPModel;
