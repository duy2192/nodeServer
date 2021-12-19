import sql from "./index.js";
import {formatPrice,convertDatetime} from "../utils/common"
import ejs from "ejs";
import sendMail from '../utils/sendMails'
const OrderModel = {
  async create(data, result) {
    const query = `INSERT INTO tblorder (userid,name,email,phone,totalprice,city,district,address) values (?,?,?,?,?,?,?,?);
  SELECT max(orderid) as orderid from tblorder where email=? and status like 'pending'`;

    sql.query(
      query,
      [
        data.userid,
        data.name,
        data.email,
        data.phone,
        data.totalprice,
        data.city,
        data.district,
        data.address,
        data.email,
      ],
      (err, res) => {
        try {
          if (err) {
            throw err.code === "ER_DUP_ENTRY"
              ? "Đơn hàng,sản phẩm trùng!"
              : "Đặt hàng không thành công!";
          }
          if (res.length) {
            const orderid = Object.values(JSON.parse(JSON.stringify(res[1])))[0]
              .orderid;
            const orderdetail = data.orderdetail.map((key) => [
              orderid,
              key.productid,
              key.product.name,
              key.product.price,
              key.product.saleprice,
              key.quantity,
            ]);
            const query2 = `insert into orderdetail (orderid,productid,name,price,saleprice,quantity) values ?`;
            sql.query(query2, [orderdetail],async (err, res) => {
              try {
                if (err) {
                  throw err.code === "ER_DUP_ENTRY"
                    ? "Trùng sản phẩm trong đơn hàng!"
                    : "Đặt hàng không thành công!";
                } else {

                  const send = await ejs.renderFile(__dirname+"/../../public/templates/newOrder.ejs", {
                     data:{...data,orderid},
                     formatPrice,
                     convertDatetime
                  });
                  sendMail(send,data.email,"[Đơn hàng mới da29.me] Đơn hàng #"+orderid)                  
                  result(null, { message: "Đặt hàng thành công!" });
                  return;
                }
              } catch (error) {
                result(error, null);
              }
            });
            return;
          }
        } catch (error) {
          result(error, null);
        }
      }
    );
  },
  async update(data, result) {
    const query = `update tblorder set status=? where orderid=?;    `;
    sql.query(
      query,
      [data.status, data.orderid],
      (err, res) => {
        try {
          if (err) {
            throw "Không thể cập nhật đơn hàng"
          } else {
            result(null, "Cập nhật đơn hàng thành công");
            return;
          }
        } catch (error) {
          result(error, null);
        }
      }
    );
  },
  async getAll(result) {
    const query = `select * from tblorder order by tblorder.orderid DESC;
    select * from orderdetail;`;
    sql.query(
      query,
      (err, res) => {
        try {
          if (err) {
            
            throw "Không tìm thấy đơn hàng!";
          }
          else {
            const data = res[0].map((x) => ({
              ...x,
              orderdetail: res[1].filter((y) => y.orderid == x.orderid),
            }));
            result(null, data);
            return;
          }
        } catch (error) {
          result(error, null);
        }
      }
    );
  },
  async get(data,result) {
    const query = `select * from tblorder where orderid=? order by tblorder.orderid DESC;
    select * from orderdetail where orderid=?;`;
    sql.query(
      query,
      [data.orderid,data.orderid],
      (err, res) => {
        try {
          if (err) {
            
            throw "Không tìm thấy đơn hàng!";
          }
          else {
            const data = {
              ...res[0][0],
              orderdetail: res[1].filter((y) => y.orderid == res[0][0].orderid),
            }
            result(null,data);
            return;
          }
        } catch (error) {
          result(error, null);
        }
      }
    );
  },
  async delete(data, result) {
    const query = `Delete from orderdetail where orderid=?;
    Delete from tblorder where orderid=?;`;
    sql.query(
      query,
      [data.orderid,data.orderid],
      (err, res) => {
        try {
          if (err) {
            throw "Không thể xóa đơn hàng!";
          }
          else {
            result(null, "Xóa đơn hàng thành công!");
            return;
          }
        } catch (error) {
          result(error, null);
        }
      }
    );
  },
};
export default OrderModel; 
