import sql  from "./index.js";

const ProductModel = {
  async create(data, result) {
    if(data.name===""||data.price===""){
      result("Tên sản phẩm và giá không được trống!", null);
      return;
    }
    const query = `INSERT INTO product (categoryid,manuid,name,decription,quantity,price,saleprice,isfreeship,thumbnail,createdby,updatedby) values (?,?,?,?,?,?,?,?,?,?,?);`;
    sql.query(
      query,
      [
        data.categoryid,
        data.manuid,
        data.name,
        data.decription,
        data.quantity,
        data.price,
        data.saleprice,
        data.isfreeship,
        data.thumbnail,
        data.createdby,
        data.updatedby,
      ],
      (err, res) => {
        try {
          if (err) {
            throw err.code === "ER_DUP_ENTRY"
              ? "Sản phẩm trùng!"
              : "Lỗi tạo sản phẩm";
          } else {
            result(null, "Tạo sản phẩm thành công!");
            return;
          }
        } catch (error) {
          result(error, null);
        }
      }
    );
  },
  async update(data, result) {
    if(data.name===""||data.price===""){
      result("Tên sản phẩm và giá không được trống!", null);
      return;
    }
    const query = `Update product set categoryid=? , manuid=? , name=? ,decription=?, quantity=?,price=?,saleprice=?,isfreeship=?,thumbnail=?,updatedby=? where productid=?;`;
    sql.query(
      query,
      [
        data.categoryid,
        data.manuid,
        data.name,
        data.decription,
        data.quantity,
        data.price,
        data.saleprice,
        data.isfreeship,
        data.thumbnail,
        data.updatedby,
        data.productid,
      ],
      (err, res) => {
        try {
          if (err) {
            throw "Không thể cập nhật sản phẩm";
          
          } else {
            result(null, "Cập nhật sản phẩm thành công!");
            return;
          }
        } catch (error) {
          result(error, null);
        }
      }
    );
  },

  async get(data, result) {
    const query = `SELECT * FROM product where productid=?;
   SELECT categories.* FROM categories,product where categories.categoryid=product.categoryid and product.productid=?;
   SELECT manufacturer.* FROM manufacturer,product where manufacturer.manuid=product.manuid and product.productid=?;
  
  `;
    sql.query(
      query,
      [data.productid, data.productid, data.productid],
      (err, res) => {
        try {
          if (err) {
            throw "Lỗi tìm sản phẩm!";
          }
          if (res.length) {
            result(null, {
              ...res[0][0],
              categories: res[1][0],
              manufacturer: res[2][0],
            });
            return;
          }
          throw "Không tìm thấy sản phẩm này!";
        } catch (error) {
          result(error, null);
        }
      }
    );
  },

  async getAll(filters, result) {
    const page =
      Number.parseInt(filters._page) * Number.parseInt(filters._limit) -
      Number.parseInt(filters._limit);
    let query = `SELECT product.*,manufacturer.manuid,categories.categoryid FROM product,categories,manufacturer where categories.categoryid=product.categoryid and manufacturer.manuid=product.manuid `;
    query += filters.categoryid
      ? sql.format(
          ` and product.categoryid=cast(? as unsigned) `,
          filters.categoryid
        )
      : " ";
    query += filters.manuid
      ? sql.format(` and product.manuid=cast(? as unsigned) `, filters.manuid)
      : " ";
    query +=
      filters.ispromotion === "true" ? ` and saleprice < price ` : " ";
    query +=
      filters.isfreeship === "true" ? ` and isfreeship like 'true' ` : " ";
    query +=
      Number.parseInt(filters.pricegte) > 0
        ? ` and price>${filters.pricegte} `
        : " ";
    query +=
      Number.parseInt(filters.pricelte) > 0
        ? ` and price<${filters.pricelte} `
        : " ";
    query += filters._sort.split(":")[1]
      ? sql.format(` order by ${filters._sort.split(":")[0]}`)
      : "order by product.productid ";
    query +=
      filters._sort.split(":")[1] === "ASC" ? sql.format(` ASC`) : " DESC ";
    query += page ? sql.format(` limit ${page},`) : " limit 0,";
    query += filters._limit ? sql.format(` ${filters._limit} `) : "16";

    query += `;SELECT * FROM categories `;
    query += filters.categoryid
      ? sql.format(`where categoryid=cast(? as unsigned);`, filters.categoryid)
      : ";";
    query += `SELECT * FROM manufacturer `;
    query += filters.manuid
      ? sql.format(`where manuid=cast(? as unsigned);`, filters.manuid)
      : ";";

    query += `SELECT count(productid) as total FROM product,categories,manufacturer where categories.categoryid=product.categoryid and manufacturer.manuid=product.manuid `;
    query += filters.categoryid
      ? sql.format(
          ` and product.categoryid=cast(? as unsigned) `,
          filters.categoryid
        )
      : " ";
    query += filters.manuid
      ? sql.format(` and product.manuid=cast(? as unsigned) `, filters.manuid)
      : " ";
    query +=
      filters.isfreeship === "true" ? ` and isfreeship like 'true' ` : " ";
    query +=
      Number.parseInt(filters.pricegte) > 0
        ? ` and price>${filters.pricegte} `
        : " ";
    query +=
      Number.parseInt(filters.pricelte) > 0
        ? ` and price<${filters.pricelte} `
        : " ";
    query += filters._sort.split(":")[1]
      ? sql.format(` order by ${filters._sort.split(":")[0]}`)
      : "order by product.productid ";
    query +=
      filters._sort.split(":")[1] === "ASC" ? sql.format(` ASC`) : " DESC ";

    sql.query(query, [filters.productid], (err, res) => {
      try {
        if (err) {
          throw err;
        }
        if (res.length) {
          const data = res[0].map((x) => ({
            ...x,
            categories: res[1].filter((y) => y.categoryid == x.categoryid)[0],
            manufacturer: res[2].filter((y) => y.manuid == x.manuid)[0],
          }));
          result(null, {
            data,
            pagination: {
              page: filters._page,
              total: res[3][0].total,
              limit: filters._limit,
            },
          });
          return;
        }
        throw "Không tìm thấy sản phẩm này!";
      } catch (error) {
        result(error, null);
      }
    });
  },
  async delete(data, result) {
    const query = `Delete from product where productid=?`;
    sql.query(
      query,
      [data.productid],
      (err, res) => {
        try {
          if (err) {
            
            throw "Không thể xóa sản phẩm!";
          }
          else {
            result(null, "Xóa sản phẩm thành công!");
            return;
          }
        } catch (error) {
          result(error, null);
        }
      }
    );
  },
};
export default ProductModel;
