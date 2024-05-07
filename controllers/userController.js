import bcrypt from "bcrypt";
import Users from "../models/users.model.js";

const createAccount = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Check if the username already exists
    const existingUser = await Users.findOne({ where: { username: username } });

    if (existingUser) {
      console.log("existingUser:  " + existingUser.dataValues.username);
      return res.status(409).json({ error: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    await Users.create({ username, hashedPassword, role });

    return res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.error("Error creating account:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createAccount };
