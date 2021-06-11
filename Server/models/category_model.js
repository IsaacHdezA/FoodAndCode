const conn=require('./connection');

let category_model = () => {};


category_model.new_category = (datos,cb) => {
     conn.query('INSERT INTO categoria(cat_nombre, cat_tipo, cat_plus18) VALUES (?,?,?);', datos,cb);
};

category_model.all_categories = (datos,cb) => {
     conn.query("SELECT * FROM categoria;",[],cb);
};

category_model.delete_category = (datos, cb) => {
    conn.query("DELETE FROM categoria WHERE cat_id = ?;", datos, cb);
};

module.exports = category_model;
