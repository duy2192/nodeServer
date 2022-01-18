import sql from"./index.js";

const CategoriesModel = {
  async create(data, result) {
    if(data.name===""){
      result("Chưa nhập tên danh mục!",null );
      return;
    }
    const query = `INSERT INTO categories (name,decription,createdby,updatedby) values (?,?,?,?);    `;
    sql.query(
      query,
      [data.name, data.decription, data.createdby, data.updatedby],
      (err, res) => {
        try {
          if (err) {
            throw err.code === "ER_DUP_ENTRY"
              ? "Danh mục đã tồn tại!"
              : "Không thể thêm danh mục!";
          } else {
            result(null, "Thêm danh mục thành công");
            return;
          }
        } catch (error) {
          result(error, null);
        }
      }
    );
  },
  async update(data, result) {
    if(data.name===""){
      result("Chưa nhập tên danh mục!",null );
      return;
    }
    const query = `update categories set name=?,decription=?,updatedby=? where categoryid=?;    `;
    sql.query(
      query,
      [data.name, data.decription, data.updatedby,data.categoryid],
      (err, res) => {
        try {
          if (err) {
            throw "Không thể cập nhật danh mục"
          } else {
            result(null, "Cập nhật danh mục thành công");
            return;
          }
        } catch (error) {
          result(error, null);
        }
      }
    );
  },
  async delete(data, result) {
    const query = `Delete from categories where categoryid=?;    `;
    sql.query(
      query,
      [data.categoryid],
      (err, res) => {
        try {
          if (err) {
            throw "Không thể xóa danh mục"
          } else {
            result(null, "Xóa danh mục thành công");
            return;
          }
        } catch (error) {
          result(error, null);
        }
      }
    );
  },

  async getAll(result) {
    const query = `SELECT distinct categories.*,count(product.categoryid) as countproduct FROM categories,product where categories.categoryid=product.categoryid group by  categories.categoryid order by categories.categoryid ASC;
    select distinct categories.*,0 as countproduct from categories,product where categories.categoryid not in ( select product.categoryid from product);
     SELECT distinct manufacturer.*,categories.categoryid from manufacturer,categories,product where manufacturer.manuid=product.manuid and categories.categoryid=product.categoryid;
    `;
    sql.query(query, (err, res) => {
      try {
        if (err) {
          throw "Không tìm thấy danh mục!";
        }
        if (res.length) {
          const data = res[0].concat(res[1]).map((x) => ({
            ...x,
            manufacturer: res[2].filter((y) => y.categoryid == x.categoryid),
          }));
          result(null, data);
          return;
        }
        throw "Không tìm thấy danh mục!";
      } catch (error) {
        result(error, null);
      }
    });
  },
  async get(result) {
    const query = `SELECT * from categories`;
    sql.query(query, (err, res) => {
      try {
        if (err) {
          throw "Không tìm thấy danh mục!";
        }
        if (res.length) {
          result(null, res);
          return;
        }
        throw "Không tìm thấy danh mục!";
      } catch (error) {
        result(error, null);
      }
    });
  },
  async getByManuId(data, result) {
    let query = `SELECT distinct categories.* from categories,manufacturer,product `;
    query +=
      data.manuid !== ""
        ? `where product.categoryid=categories.categoryid and product.manuid=manufacturer.manuid and manufacturer.manuid=?`
        : "";
    sql.query(query, [data.manuid], (err, res) => {
      try {
        if (err) {
          throw "Không tìm thấy danh mục!";
        }
        if (res.length) {
          result(null, res);
          return;
        }
        throw "Không tìm thấy danh mục!";
      } catch (error) {
        result(error, null);
      }
    });
  },
};
export default CategoriesModel;
