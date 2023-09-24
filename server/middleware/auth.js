import jwt from "jsonwebtoken";
import * as db from "../db/queries.js";

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const { userId } = decoded;

    const user = await db.findUserById(userId);
    if (!user || user.token !== token)
      return res.status(401).send({ message: "Unauthorized" });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ message: "Unauthorized" });
  }
};
