import User from '../model/User.js';

const getUsers = async (req, res) => {
  let query = {};
  if (req.query.search) {
    query.email = { $regex: req.query.search, $options: 'i' };
  }
  const users = await User.find(query).select('_id email');
  res.status(200).json({ msg: 'success', users: users });
};

export { getUsers };
