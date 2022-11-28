import User from '../model/User.js';

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please provide all values' });
  }
  try {
    const user = await User.create({ name, email, password });
    const resUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      boards: user.boards,
      imageUrl: user.imageUrl,
    };
    const token = await user.createToken();
    res.status(201).json({ msg: 'success', user: resUser, token });
  } catch (error) {
    let errorMsg = 'Some error';
    if (error.code === 11000) {
      errorMsg = Object.keys(error.keyValue) + ' already exists';
    }
    if (error.name === 'ValidationError') {
      errorMsg = Object.values(error.errors)
        .map((e) => e.message)
        .join(', ');
    }

    res.status(400).json({ msg: errorMsg });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please provide all values' });
  }
  try {
    const user = await User.findOne({ email }, '+password');
    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }
    const passwordMatched = await user.matchPassword(password);
    if (!passwordMatched) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }
    const resUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      boards: user.boards,
      imageUrl: user.imageUrl,
    };

    const token = await user.createToken();
    res.status(200).json({ msg: 'success', user: resUser, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.errors });
  }
};

export { createUser, loginUser };
