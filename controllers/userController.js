import { resize } from '../image-upload/resize.js';
import User from '../model/User.js';
import fs from 'fs';

const getUsers = async (req, res) => {
  let query = {};
  if (req.query.search) {
    query.email = { $regex: req.query.search, $options: 'i' };
  }
  let users = (await User.find(query).select('_id email')).filter(
    (user) => user._id.toString() !== req.user.id
  );
  res.status(200).json({ msg: 'success', users: users });
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;
  if (!name) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  const query = {
    name,
  };

  const { id: userId } = req.user;
  let imageUrl = '';
  if (req.file) {
    // let result = await User.findById(req.user.id);
    // let imagePath = result.imageUrl.split('/').pop();
    // imagePath = 'uploads\\\\users\\\\' + imagePath;
    // fs.unlinkSync(imagePath);
    // console.log(req.file);
    imageUrl = await resize(req.file, 'users');
    query.imageUrl = imageUrl;
  }
  let user = await User.findByIdAndUpdate(userId, { ...query }, { new: true });

  res.status(200).json({ msg: 'success', user });
};

export { getUsers, updateUser };
