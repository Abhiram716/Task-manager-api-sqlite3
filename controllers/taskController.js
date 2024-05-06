import Tasks from "../models/tasks.model.js";
import Users from "../models/users.model.js";

const createTask = async (req, res) => {
  const { title, description, status, assignee_id } = req.body;
  try {
    if (!title) {
      return res.status(400).json({ error: "Title is required." });
    }

    // To check wheather if there is user with assigned Id
    let assignedUser = await Users.findByPk(assignee_id);
    if (!assignedUser) {
      return res
        .status(404)
        .json({ error: `There is no user with id ${assignee_id}` });
    }
    const newTask = await Tasks.create({
      title,
      description,
      status,
      assignee_id,
    });

    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllTasks = async (req, res) => {
  try {
    let tasksList = await Tasks.findAll({
      include: [{ model: Users, as: "User", attributes: ["username"] }],
    });
    res.status(200).json({ msg: "Tasks fetched succesfully", tasksList });
  } catch (error) {
    console.error("Error Fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    let task = await Tasks.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: `There is no task with id ${id}` });
    }

    return res
      .status(200)
      .json({ message: "Task fetched successfully", Task: task });
  } catch (error) {
    console.error("Error Fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    let task = await Tasks.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: `There is no task with id ${id}` });
    }

    await Tasks.destroy({
      where: {
        id: id,
      },
    });

    return res
      .status(200)
      .json({ msg: `task with id ${id} deleted succesfully` });
  } catch (error) {
    console.error("Error Fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, assignee_id } = req.body;
    let task = await Tasks.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: `There is no task with id ${id}` });
    }

    await task.update({
      title: title || task.title,
      description: description || task.description,
      status: status || task.status,
      assignee_id: assignee_id || task.assignee_id,
    });

    res.status(200).json({msg:`Task with Id ${id} is updated successfully.`})

  } catch (error) {
    console.error("Error Fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createTask, getAllTasks, getTaskById, deleteTaskById, updateTaskById };
