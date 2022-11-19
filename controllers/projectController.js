import Project from '../model/Project.js';

const createProject = async (req, res) => {
  const { title, description, members, dueDate, tasks } = req.body;
  if (!title || !description || !dueDate) {
    return res.status(400).json({ error: 'Please fill all the fields' });
  }
  let tasksParsed = [];
  let membersParsed = [];
  if (tasks) {
    tasksParsed = JSON.parse(tasks);
  }
  if (members) {
    membersParsed = JSON.parse(members);
  }
  let imageUrl = '';
  if (req.file) {
    imageUrl = `http://localhost:${process.env.PORT}/` + req.file.path;
  }
  try {
    const project = await Project.create({
      ...req.body,
      tasks: tasksParsed,
      members: membersParsed,
      imageUrl,
    });
    res.status(201).json({ msg: 'success', project: project });
  } catch (error) {
    let errorMsg = 'Some error';
    if (error.name === 'ValidationError') {
      errorMsg = Object.values(error.errors)
        .map((e) => e.message)
        .join(', ');
    }
    res.status(401).json({ error: errorMsg });
  }
};

const getProjects = async (req, res) => {
  try {
    let query = {};
    if (req.query.search) {
      query.title = { $regex: req.query.search, $options: 'i' };
    }

    let result = Project.find(query)
      .populate({
        path: 'members',
        select: 'id name email imageUrl',
      })
      .select('-description -createdAt -updatedAt -__v -createdBy');
    result = result.sort('createdAt');
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    const projects = await result;
    const totalProjects = await Project.countDocuments(query);
    const numOfPages = Math.ceil(totalProjects / limit);
    res
      .status(200)
      .json({ msg: 'success', projects: projects, numOfPages, totalProjects });
  } catch (error) {
    console.log(error);
    let errorMsg = 'Some error';
    if (error.name === 'ValidationError') {
      errorMsg = Object.values(error.errors)
        .map((e) => e.message)
        .join(', ');
    }
    res.status(404).json({ error: errorMsg });
  }
};

const getProject = async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id.toString();
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: 'Please provide valid project id' });
  }
  try {
    let result = await Project.findById(id)
      .populate({
        path: 'members',
        select: 'id name email',
      })
      .select('-createdAt -updatedAt -__v -createdBy');
    if (!result) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json({ msg: 'success', project: result });
  } catch (error) {
    console.log(error);
    let errorMsg = 'Some error';
    if (error.name === 'ValidationError') {
      errorMsg = Object.values(error.errors)
        .map((e) => e.message)
        .join(', ');
    }
    res.status(404).json({ error: errorMsg });
  }
};

const updateProject = async (req, res) => {
  const id = req.params.id.toString();
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: 'Please provide valid project id' });
  }
  const { title, description, members, dueDate, tasks, completed } = req.body;
  if (!title || !description || !dueDate) {
    return res.status(400).json({ error: 'Please fill all the fields' });
  }
  try {
    let result = await Project.findById(id);
    if (!result) {
      return res.status(404).json({ error: 'Project not found' });
    }
    let query = {
      title,
      description,
      dueDate,
      completed,
      members,
      tasks,
    };
    if (req.file) {
      query.imageUrl = `http://localhost:${process.env.PORT}/` + req.file.path;
    }
    const project = await Project.findByIdAndUpdate(id, {
      ...req.body,
      imageUrl,
    });
  } catch (error) {
    console.log(error);
    let errorMsg = 'Some error';
    if (error.name === 'ValidationError') {
      errorMsg = Object.values(error.errors)
        .map((e) => e.message)
        .join(', ');
    }
    res.status(404).json({ error: errorMsg });
  }
};

export { createProject, getProjects, getProject };
