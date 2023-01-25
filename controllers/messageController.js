import Message from '../model/Message.js';
import User from '../model/User.js';
import app from '../server.js';

const createMessage = async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: 'Message is required' });
  const user = req.user.id;
  const project = req.params.projectId;
  try {
    const getUser = await User.findById(user);
    const messageObject = {
      user: {
        _id: user,
        name: getUser.name,
        email: getUser.email,
        imageUrl: getUser.imageUrl,
      },
      text: text.trim(),
      createdAt: new Date(),
      projectId: project,
    };
    // const message = await Message.findOne({
    //   project: project,
    // });

    // message.messages.push(messageObject);

    // const dbMessage = await message.save();
    const newMessage = await Message.updateOne(
      { project: project },
      {
        $push: {
          messages: {
            text: messageObject.text,
            user: messageObject.user,
            createdAt: messageObject.createdAt,
          },
        },
      },
      { safe: false, upsert: true }
    );
    const io = app.get('io');
    io.emit('message-added', messageObject);
    res.status(200).json(messageObject);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getMessages = async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const messages = await Message.findOne({
      project: projectId,
    });
    res.status(200).json(messages);
  } catch (error) {}
};

export { createMessage, getMessages };
