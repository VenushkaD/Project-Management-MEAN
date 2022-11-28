import User from '../model/User.js';

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

export { getUsers };
