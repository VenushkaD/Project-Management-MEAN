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
            default: [],
          },
          documentUrls: {
            type: [String],
            default: [],
          },
          progress: {
            type: Number,
            default: 0,
          },
          description: {
            type: String,
            default: '',
          },
          checkList: {
            type: [
              {
                name: String,
                checked: Boolean,
              },
            ],
            default: [],
          },
          dueDate: {
            type: Date,
            default: null,
          },
          cover: {
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
