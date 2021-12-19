import ProductModel from "../models/ProductModel.js";
const ProductController={
create : async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Không có dữ liệu gửi!",
    });
  }
  const data = {
    name: req.body.name,
    decription: req.body.decription,
    thumbnail: req.body.thumbnail||'public/uploads/img/static/blank.png',
    price: req.body.price,
    saleprice: req.body.saleprice,
    isfreeship: req.body.isfreeship,
    createdby: req.body.createdby,
    updatedby: req.body.updatedby,
    categoryid: req.body.categoryid,
    manuid: req.body.manuid,
    quantity:req.body.quantity
  };
  await ProductModel.create(data, (err, result) => {
    if (err) res.status(400).send({ message: err });
    else res.status(200).send(result);
  });
},

update : async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Không có dữ liệu gửi!",
    });
  }
  const data = {
    productid:req.params.productid,
    name: req.body.name,
    decription: req.body.decription,
    thumbnail: req.body.thumbnail||'public/uploads/img/static/blank.png',
    price: req.body.price,
    saleprice: req.body.saleprice,
    promotion: req.body.promotion,
    isfreeship: req.body.isfreeship,
    updatedby: req.body.updatedby,
    categoryid: req.body.categoryid,
    manuid: req.body.manuid,
    quantity:req.body.quantity
  };
  if(!data.productid)
    res.status(400).send({message:"Không tìm thấy sản phẩm!"})
  await ProductModel.update(data, (err, result) => {
    if (err) res.status(400).send({ message: err });
    else res.status(200).send(result);
  });
},
get : async (req, res) => {
  const { productid } = req.params;
  const data = {
    productid,
  };
  await ProductModel.get(data, (err, result) => {
    if (err) res.status(400).send({ message: err });
    else res.status(200).send(result);
  });
},
getAll : async (req, res) => {
  const {
    _limit,
    _page,
    _sort,
    ispromotion,
    categoryid,
    isfreeship,
    manuid,
    pricegte,
    pricelte,
  } = req.query;
  const data = {
    _limit: _limit || 16,
    _page: _page || 1,
    _sort: _sort || "",
    ispromotion: ispromotion,
    isfreeship: isfreeship,
    manuid: manuid,
    categoryid: categoryid,
    pricegte,
    pricelte,
  };
  await ProductModel.getAll(data, (err, result) => {
    
    if (err) res.status(400).send({ message: err });
    else res.status(200).send(result);
  });
},
delete : async (req, res) => {
  const { productid } = req.params;
  const data = {
    productid,
  };
  await ProductModel.delete(data, (err, result) => {
    if (err) res.status(400).send({ message: err });
    else res.status(200).send(result);
  });
}}
export default ProductController