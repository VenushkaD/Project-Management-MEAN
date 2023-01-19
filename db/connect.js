import mongoose from 'mongoose';

const connect = async () => {
  const dbUrl =
    process.env.NODE_ENV?.trim() !== 'test'
      ? process.env.MONGO_URL
      : process.env.MONGO_URL_TEST;
  return mongoose.connect(dbUrl);
};

export default connect;
