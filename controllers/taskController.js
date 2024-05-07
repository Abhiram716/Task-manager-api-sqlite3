import Tasks from "../models/tasks.model.js";
import Users from "../models/users.model.js";

const createTask = async (req, res) => {
  const { title, description, status, assignee_id } = req.body;
  try {
    if (!title) {
      return res.status(400).json({ error: "Title is required." });
    }

    // To check whether there is a user with the assigned ID
    if (assignee_id) {
      let assignedUser = await Users.findByPk(assignee_id);
      if (!assignedUser) {
        return res
          .status(404)
          .json({ error: `There is no user with id ${assignee_id}` });
      }
    }

    // Create the task if everything is valid
    const newTask = await Tasks.create({
      title,
      description,
      status,
      assignee_id,
    });

    return res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllTasks = async (req, res) => {
  try {
    let tasksList = await Tasks.findAll({
      include: [{ model: Users, as: "User", attributes: ["username"] }],
    });
    return res
      .status(200)
      .json({ msg: "Tasks fetched succesfully", tasksList });
  } catch (error) {
    console.error("Error Fetching tasks:", error);
    return res.status(500).json({ error: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    let task = await Tasks.findByPk(id, {
      include: [{ model: Users, as: "User", attributes: ["username"] }],
    });

    if (!task) {
      return res.status(404).json({ error: `There is no task with id ${id}` });
    }
    return res
      .status(200)
      .json({ message: "Task fetched successfully", Task: task });
  } catch (error) {
    console.error("Error Fetching tasks:", error);
    res.status(500).json({ error: error.message });
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
      where: { id: id },
    });

    return res
      .status(200)
      .json({ msg: `Task with id ${id} deleted successfully` });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({ error: error.message });
  }
};

const updateTaskById = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, assignee_id } = req.body;
  try {
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

    return res
      .status(200)
      .json({ msg: `Task with Id ${id} is updated successfully.` });
  } catch (error) {
    console.error("Error updating tasks:", error);
    return res.status(500).json({ error: error.message });
  }
};

export { createTask, getAllTasks, getTaskById, deleteTaskById, updateTaskById };
