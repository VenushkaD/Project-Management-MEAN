import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: [3, 'Name must be at least 3 characters'],
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
      default: '',
    },
    members: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      required: false,
      default: [],
    },
    dueDate: {
      type: Date,
      required: true,
    },
    tasks: {
      type: [
        {
          name: {
            type: String,
          },
          assignedMembers: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User',
          },
          documentUrls: {
            type: [String],
          },
          progress: {
            type: Number,
          },
          description: {
            type: String,
            default: '',
          },
        },
      ],
      required: false,
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    completed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Project', ProjectSchema);
