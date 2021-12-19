import CategoriesModel from "../models/CategoriesModel.js";

const CategoriesController={
create : async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Không có dữ liệu gửi!",
    });
  }
  const data = {
    name: req.body.name,
    decription: req.body.decription,
    createdby: req.body.createdby||'Admin',
    updatedby: req.body.updatedby||'Admin',
  };
  await CategoriesModel.create(data, (err, result) => {
    if (err)
      res.status(400).send({
        message: err,
      });
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
    categoryid:req.params.categoryid,
    name: req.body.name,
    decription: req.body.decription,
    updatedby: req.body.updatedby||'Admin',
  };
  await CategoriesModel.update(data, (err, result) => {
    if (err)
      res.status(400).send({
        message: err,
      });
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
    categoryid:req.params.categoryid,
  };
  await CategoriesModel.delete(data, (err, result) => {
    if (err)
      res.status(400).send({
        message: err,
      });
    else res.status(200).send(result);
  });
},
getAll : async (req, res) => {
  await CategoriesModel.getAll((err, result) => {
    if (err)
      res.status(400).send({
        message: err,
      });
    else res.status(200).send(result);
  });
},
get : async (req, res) => {
  await CategoriesModel.get((err, result) => {
    if (err)
      res.status(400).send({
        message: err,
      });
    else res.status(200).send(result);
  });
},

getByManuId : async (req, res) => {
  const data={
    manuid:req.params.manuid||""
  }
  await CategoriesModel.getByManuId(data,(err, result) => {
    if (err)
      res.status(400).send({
        message: err,
      });
    else res.status(200).send(result);
  });
}

}
export default CategoriesController