const conn=require('./connection');

let food_model = () => {};


food_model.new_food = (datos,cb) => {
     conn.query('INSERT INTO comida(com_cat_id, com_nombre, com_precio, com_descripcion) VALUES (?,?,?,?);',
     datos,cb);
};

food_model.all_foods = (datos,cb) => {
     conn.query("SELECT co.*, ca.cat_nombre " +
                "FROM comida co " +
                "INNER JOIN categoria ca ON co.com_cat_id = ca.cat_id " +
                ";",[],cb);
};

food_model.delete_food = (datos, cb) => {
    conn.query("DELETE FROM comida WHERE com_id = ?;", datos, cb);
};

food_model.update_food = (datos, cb) => {
    conn.query("UPDATE comida SET com_cat_id = ?, com_nombre = ?, com_precio = ?, com_descripcion = ? " +
               "WHERE com_id = ?;", datos, cb);
};

food_model.active_food = (datos, cb) => {
    conn.query("UPDATE comida SET com_estado = 'a' WHERE com_id = ?;", datos, cb);
};

food_model.inactive_food = (datos, cb) => {
    conn.query("UPDATE comida SET com_estado = 'i' WHERE com_id = ?;", datos, cb);
};

module.exports = food_model;
