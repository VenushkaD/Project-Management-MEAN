import JWT from 'jsonwebtoken';
import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, 'Name must be at least 3 characters'],
    },
    email: {
      type: String,
      required: true,
      unique: [true, 'Email already exists'],
      validate: {
        validator: validator.isEmail,
        message: 'Please provide a valid email',
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    boards: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    imageUrl: {
      type: String,
      required: false,
      default: '',
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.createToken = async function () {
  const user = this;
  const token = JWT.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  return token;
};

export default mongoose.model('User', UserSchema);
