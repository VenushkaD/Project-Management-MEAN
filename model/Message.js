import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  messages: [
    {
      text: {
        type: String,
        required: true,
      },
      user: {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        name: String,
        email: String,
        imageUrl: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  project: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

export default mongoose.model('Message', MessageSchema);
