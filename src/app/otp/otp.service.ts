import OTPModel, { IOTP } from './opt.model';

export class OTPService {
  // Generate a new OTP
  public async generateOTP(userId: string): Promise<string | null> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // OTP valid for 2 minutes

    const otpDocument: IOTP = new OTPModel({
      userId,
      otp,
      expiresAt,
    });

    try {
      await otpDocument.save();
      console.log('OTP saved:', otp);
      return otp; // Return the generated OTP
    } catch (error) {
      console.error('Error saving OTP:', error);
      return null; // Indicate failure to save
    }
  }

  // Verify the OTP
  public async verifyOTP(userId: string, otp: string): Promise<boolean> {
    try {
      // Find the OTP document for the user that hasn't expired
      const otpDocument = await OTPModel.findOne({
        userId,
        otp,
        expiresAt: { $gt: new Date() }, // Ensure it has not expired
      });

      if (!otpDocument) {
        console.log('Invalid or expired OTP');
        return false; // OTP is invalid or expired
      }

      // OTP is valid; you can choose to delete it if it's one-time use
      await OTPModel.deleteOne({ _id: otpDocument._id });
      console.log('OTP verified successfully');
      return true; // OTP verified successfully
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return false; // Indicate failure to verify
    }
  }
}

export default OTPService;
