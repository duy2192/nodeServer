import OrderModel from "../models/OrderModel.js"
const OrderController={
create : async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Không có dữ liệu gửi!",
    });
  }
  const data = {
    orderdetail: req.body.orderdetail,
    userid: req.body.userid || 2,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    totalprice: req.body.totalprice,
    city: req.body.city,
    district: req.body.district,
    address: req.body.address,
  };
  await OrderModel.create(data, (err, result) => {
    if (err) {
      res.status(400).send({ message: err });
    } else {
      
      res.status(200).send(result);
      
    }
  });
},
update : async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Không có dữ liệu gửi!",
    });
  }
  const data = {
    orderid: req.body.orderid,
    status:req.body.status
  };
  await OrderModel.update(data, (err, result) => {
    if (err) {
      res.status(400).send({ message: err });
    } else {
      
      res.status(200).send(result);
      
    }
  });
},
getAll : async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Không có dữ liệu gửi!",
    });
  }
  await OrderModel.getAll((err, result) => {
    if (err) res.status(400).send({ message: err });
    else res.status(200).send(result);
  });
},
get : async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Không có dữ liệu gửi!",
    });
  }
  const data = {
    orderid: req.params.orderid,
  };
  await OrderModel.get(data, (err, result) => {
    if (err) res.status(400).send({ message: err });
    else res.status(200).send(result);
  });
},
delete : async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Không có dữ liệu gửi!",
    });
  }
  const data = {
    orderid: req.params.orderid,
  };
  await OrderModel.delete(data, (err, result) => {
    if (err) res.status(400).send({ message: err });
    else res.status(200).send(result);
  });
}}
export default OrderController
