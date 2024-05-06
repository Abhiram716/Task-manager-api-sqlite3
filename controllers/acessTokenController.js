import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/users.model.js";

const createAcessTokens = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the account exists in the database
    const user = await User.findOne({ where: { username: username } });

    // If account not found, return error
    if (!user) {
      return res.status(401).json({ error: "Account not found" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Create the payload for the access token
   
    const payload = {
      userId: user.dataValues.id,
      username: user.dataValues.username,
    };

    // Generate the access token
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "365d", 
    });

    // Return the access token to the client
    res.status(200).json({ accessToken });
  }
  catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createAcessTokens };
