import { connect } from 'mongoose';

export async function connectDatabase() {
  try {
    await connect(process.env.MONGO_URI!).then(() =>
      console.log('Database connection successful!!'),
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
