import Project from '../model/Project.js';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { resize } from '../image-upload/resize.js';
import app from '../server.js';

const createProject = async (req, res) => {
  const { title, description, members, dueDate, tasks } = req.body;
  const { id: user_id } = req.user;
  if (!title || !description || !dueDate) {
    return res.status(400).json({ error: 'Please fill all the fields' });
  }
  try {
    let tasksError = false;

    let tasksParsed = [];
    let membersParsed = [];
    if (tasks) {
      tasksParsed = await JSON.parse(tasks);
      tasksParsed.forEach((task) => {
        if (task.name === '') {
          console.log('empty task');
          tasksError = true;
        }
      });
      if (tasksError) {
        return res.status(400).json({ error: 'Please fill all the fields' });
      }
    }
    if (members) {
      membersParsed = JSON.parse(members);
    }
    let imageUrl = '';
    if (req.file) {
      console.log(req.file);
      imageUrl = await resize(req.file, 'projects');
    }
    let project = await Project.create({
      ...req.body,
      tasks: tasksParsed,
      members: membersParsed,
      imageUrl,
      createdBy: user_id,
    });
    project = await project.populate('members', 'id name email imageUrl');

    project = await project.populate({
      path: 'tasks.assignedMembers',
      select: 'id name email imageUrl',
    });
    const io = app.get('io');
    io.emit('project-added', project);
    res.status(201).json({ msg: 'success', project: project });
  } catch (error) {
    console.log(error);
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
  const { id: user_id } = req.user;
  try {
    let query = { $or: [{ createdBy: user_id }, { members: user_id }] };
    if (req.query.search) {
      query.title = { $regex: req.query.search, $options: 'i' };
      // query.createdBy = user_id;
    }

    let result = Project.find(query)
      .populate({
        path: 'members',
        select: 'id name email imageUrl',
      })
      .select('-description -createdAt -updatedAt -__v');
    result = result.sort('createdAt');
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit).sort({ createdAt: -1 });
    const projects = await result;
    const totalProjects = await Project.countDocuments(query);
    // .where('members')
    // .in(user_id);
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
        select: 'id name email imageUrl',
      })
      .populate({
        path: 'createdBy',
        select: 'id name email imageUrl',
      })
      .populate({
        path: 'tasks.assignedMembers',
        select: 'id name email imageUrl',
      })
      .select('-createdAt -updatedAt -__v');
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
    // let tasksError = false;
    // if (tasks) {
    //   tasks.forEach((task) => {
    //     if (task.name === '') {
    //       console.log('empty task');
    //       tasksError = true;
    //     }
    //   });
    // }

    // if (tasksError) {
    //   return res.status(400).json({ error: 'Please fill all the fields' });
    // }
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
    };

    let tasksArray = [];

    tasksArray = tasks;

    if (req.file) {
      if (result.imageUrl) {
        let imagePath = result.imageUrl.split('/').pop();
        imagePath = 'uploads\\\\projects\\\\' + imagePath;
        fs.unlinkSync(imagePath);
      }
      query.imageUrl = await resize(req.file, 'projects');
      // await sharp(req.file.path)
      //   .resize(200, 200)
      //   .jpeg({ quality: 90 })
      //   .toFile(path.resolve(req.file.destination, 'resized', image));
      // fs.unlinkSync(req.file.path);
      // query.imageUrl = `http://localhost:${process.env.PORT}/` + req.file.path;
      if (tasks) {
        const tasksParsed = await JSON.parse(tasks);
        tasksParsed.map((task) => {
          if (task.name === '') {
            return res
              .status(400)
              .json({ error: 'Please fill all the fields' });
          }
        });
        tasksArray = tasksParsed;
      }
      if (members) {
        const membersParsed = JSON.parse(members);
        query.members = membersParsed;
      }
    }

    const results = await Project.findById(id);
    if (tasksArray) {
      if (result.tasks.length > 0) {
        tasksArray = tasksArray.map((task) => {
          const newTask = results.tasks.find(
            (t) => t.name?.toLowerCase() === task.name?.toLowerCase()
          );
          if (newTask) {
            return {
              description: newTask.description,
              assignedMembers: newTask.assignedMembers,
              documentUrls: newTask.documentUrls,
              _id: newTask._id,
              name: task.name,
              progress: task.progress,
            };
          } else {
            return task;
          }
        });
      }
    }

    tasksArray.forEach((task) => {
      task.assignedMembers = task.assignedMembers?.filter((member) => {
        const memberFound = query.members.find(
          (m) => m.toString() === member.toString()
        );
        if (memberFound) {
          return member;
        }
      });
    });

    let project = await Project.findByIdAndUpdate(
      id,
      { ...query, tasks: tasksArray },
      { new: true }
    );
    project = await (
      await project.populate('members', 'id name email imageUrl')
    ).populate('createdBy', 'id name email imageUrl');

    project = await project.populate({
      path: 'tasks.assignedMembers',
      select: 'id name email imageUrl',
    });
    const io = app.get('io');
    io.emit('project-updated', project);
    res.status(200).json({ msg: 'success', project: project });
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

const updateProjectTasks = async (req, res) => {
  const id = req.params.id.toString();
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: 'Please provide valid project id' });
  }
  const {
    id: taskId,
    name,
    description,
    progress,
    assignedMembers,
    documentUrls: documentUrlsString,
  } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Please fill the name field' });
  }
  try {
    let assignedMembersArray = [];
    if (assignedMembers) {
      assignedMembersArray = JSON.parse(assignedMembers);
      assignedMembersArray = assignedMembersArray.map((member) => {
        return member._id;
      });
    }
    let documentUrlsStringArray = [];
    if (documentUrlsString) {
      documentUrlsStringArray = JSON.parse(documentUrlsString);
    }
    const files = req.files;
    const documentUrls = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const documentUrl =
          `http://localhost:${process.env.PORT}/` + files[i].path;
        documentUrls.push(documentUrl);
      }
    }
    const task = await Project.findById(id);
    // if (!task) {
    task.tasks.forEach((task) => {
      task.documentUrls.forEach((url) => {
        if (!documentUrlsStringArray.includes(url)) {
          const filePath = url.split('/').splice(3).join('/');
          console.log(filePath);
          fs.unlink(filePath, (err) => console.log(err));
        }
      });
    });
    //   return res.status(404).json({ error: 'Project not found' });
    // }

    const newTask = {
      _id: taskId,
      name,
      description,
      progress,
      assignedMembers: assignedMembersArray,
      documentUrls: [...documentUrlsStringArray, ...documentUrls],
    };

    const newTaskArray = task.tasks.map((task) => {
      if (task._id.toString() === taskId) {
        return newTask;
      }
      return task;
    });

    let result = await Project.findByIdAndUpdate(
      id,
      { tasks: newTaskArray },
      { new: true }
    ).populate({
      path: 'tasks.assignedMembers',
      select: 'id name email imageUrl',
    });

    result = await (
      await result.populate('members', 'id name email imageUrl')
    ).populate('createdBy', 'id name email imageUrl');

    const io = app.get('io');
    io.emit('project-updated', result);
    return res.status(200).json({ msg: 'success' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      errorMsg = Object.values(error.errors)
        .map((e) => e.message)
        .join(', ');
    }
    res.status(500).json({ error: error });
  }
};

export {
  createProject,
  getProjects,
  getProject,
  updateProject,
  updateProjectTasks,
};
