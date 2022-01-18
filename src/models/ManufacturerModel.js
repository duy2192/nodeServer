import sql from "./index.js";

const ManufacturerModel = {
  async create(data, result) {
    const query = `INSERT INTO manufacturer (name,decription,createdby,updatedby) values (?,?,?,?);
    `;
    sql.query(
      query,
      [data.name, data.decription, data.createdby, data.updatedby],
      (err, res) => {
        try {
          if (err) {
            throw err.code === "ER_DUP_ENTRY"
              ? "Hãng sản xuất đã tồn tại!"
              : "Không thể thêm hãng sản xuất!";
          } else {
            result(null, "Thêm hãng sản xuất thành công!");
            return;
          }
        } catch (error) {
          result(error, null);
        }
      }
    );
  },
  async update(data, result) {
    const query = `update manufacturer set name=?,decription=?,updatedby=? where manuid=?;    `;
    sql.query(
      query,
      [data.name, data.decription, data.updatedby,data.manuid],
      (err, res) => {
        try {
          if (err) {
            throw "Không thể cập nhật hãng sản xuất"
          } else {
            result(null, "Cập nhật hãng sản xuất thành công");
            return;
          }
        } catch (error) {
          result(error, null);
        }
      }
    );
  },
  async delete(data, result) {
    const query = `Delete from manufacturer where manuid=?;    `;
    sql.query(
      query,
      [data.manuid],
      (err, res) => {
        try {
          if (err) {
            throw "Không thể xóa hãng sản xuất"
          } else {
            result(null, "Xóa hãng sản xuất thành công");
            return;
          }
        } catch (error) {
          result(error, null);
        }
      }
    );
  },
  async getAll(result) {
    const query = `SELECT distinct manufacturer.*,count(product.manuid) as countproduct FROM manufacturer,product where manufacturer.manuid=product.manuid group by  manufacturer.manuid order by manufacturer.manuid ASC;
    select distinct manufacturer.*,0 as countproduct from manufacturer,product where manufacturer.manuid not in ( select product.manuid from product);
     SELECT distinct manufacturer.*,categories.categoryid from manufacturer,categories,product where manufacturer.manuid=product.manuid and categories.categoryid=product.categoryid`;
    sql.query(query, (err, res) => {
      try {
        if (err) {
          throw "Không tìm thấy hãng sản xuất!";
        }
        if (res.length) {
          const data = res[0].concat(res[1])
          result(null, data);
          return;
        }
        throw "Không tìm thấy hãng sản xuất!";
      } catch (error) {
        result(error, null);
      }
    });
  },
  async get(result) {
    const query = `SELECT * from manufacturer`;
    sql.query(query, (err, res) => {
      try {
        if (err) {
          throw "Không tìm thấy hãng sản xuất!";
        }
        if (res.length) {
          result(null, res);
          return;
        }
        throw "Không tìm thấy sản xuất!";
      } catch (error) {
        result(error, null);
      }
    });
  },
  async getByCategoryId(data, result) {
    let query = `SELECT distinct manufacturer.* from manufacturer,categories,product  `;
    query +=
      data.categoryid === ""
        ? " order by manufacturer.manuid ASC"
        : ` where product.manuid=manufacturer.manuid and  categories.categoryid=? and product.categoryid=categories.categoryid `;
    sql.query(query, [data.categoryid], (err, res) => {
      try {
        if (err) {
          throw "Không tìm thấy hãng sản xuất!";
        }
        if (res.length) {
          result(null, res);
          return;
        }
        throw "Không tìm thấy hãng sản xuất!";
      } catch (error) {
        result(error, null);
      }
    });
  },
};
export default ManufacturerModel;
