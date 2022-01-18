import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel";
export const authentication = async (req, res, next) => {
  try {
    const token = req.headers["access-token"];

    const data = jwt.verify(token, process.env.JWT_KEY);
    await UserModel.findOne(data, (err, result) => {
      if (err) {
        res.status(401).send(err);
      } else {
        req.role = data.role;
        next();
      }
    });
  } catch (err) {
    res.status(401).send("Token đã hết hạn!");
  }
};

export const authorization = async (req, res, next) => {
  const role = req.role;
  if (role > 0) next();
  else {
    res.status(401).send("Không có quyền truy cập!");
  }
};
