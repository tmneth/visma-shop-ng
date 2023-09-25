import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as db from "../db/queries.js";

const saltRounds = 10;

export const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await db.createUser(email, hashedPassword);

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    await db.storeUserToken(token, user.id);

    res.status(201).send({ userId: user.id, email: user.email, token });
  } catch (error) {
    res.status(500).send({ message: "Error registering user" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.findUserByEmail(email);
    if (!user) return res.status(400).send({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).send({ message: "Invalid password" });

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    await db.storeUserToken(token, user.id);

    res.send({ userId: user.id, email: user.email, token });
  } catch (error) {
    res.status(500).send({ message: "Error logging in" });
  }
};
