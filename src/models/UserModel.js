import sql from "./index.js";
import bcrypt from "bcryptjs";
// const bcrypt =require( "bcrypt");
import jwt from "jsonwebtoken";
const secretString = process.env.JWT_KEY;
const UserModel = {
  async login(data, result) {
    const query = `SELECT * FROM user where (email= ?) or (username=?)`;
    sql.query(query, [data.email, data.username], async (err, res) => {
      try {
        if (err) {
          throw err;
        }
        if (res.length) {
          if (res[0].confirmed === "false") throw "Tài khoản chưa kích hoạt!";
          if (res[0].blocked === "true") throw "Tài khoản đang bị chặn!";
          const encryptedPassword = res[0].password;
          const checkPassword = await bcrypt.compare(
            data.password,
            encryptedPassword
          );
          if (checkPassword) {
            const jsonObject = {
              id: res[0].userid,
              role: res[0].role,
            };
            const token = await jwt.sign(jsonObject, secretString, {
              expiresIn: 86400, // Expire trong 24 giờ
            });
            const data = { ...res[0], token };
            result(null, data);
            return;
          } else {
            throw "Mật khẩu sai!";
          }
        }
        throw "Không tìm thấy tài khoản!";
      } catch (error) {
        result({ message: error }, null);
      }
    });
  },
  async register(data, result) {
    const encryptedPassword = await bcrypt.hash(data.password, 10);
    const query = `INSERT INTO USER (email,username,password,name) values (?,?,?,?);
  Select * from user where email=?
  `;
    sql.query(
      query,
      [data.email, data.username, encryptedPassword, data.name, data.email],
      (err, res) => {
        try {
          if (err) {
            throw err.code === "ER_DUP_ENTRY"
              ? "Tài khoản đã tồn tại!"
              : "Lỗi không thể đăng ký tài khoản!";
          } else {
            result(null, res[1]);
            return;
          }
        } catch (error) {
          result({ message: error }, null);
        }
      }
    );
  },
  async findOne(data, result) {
    const query = `SELECT * FROM user where userid=?`;
    sql.query(query, [data.id,], async (err, res) => {
      try {
        if (err) {
          throw err;
        }
        if (res.length) {
          
            result(null, res[0]);
            return;
          } 
        throw "Không tìm thấy tài khoản!";
      } catch (error) {
        result({ message: error }, null);
      }
    });
  },
};
export default UserModel;
