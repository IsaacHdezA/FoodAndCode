const conn=require('./connection');

let food_model = () => {};


food_model.new_food = (datos,cb) => {
     conn.query('INSERT INTO comida(com_id_categoria, com_nombre, com_precio, com_descripcion) VALUES (?,?,?,?);',
     datos,cb);
};

food_model.all_food = (datos,cb) => {
     conn.query("SELECT * FROM comida;",[],cb);
};

food_model.delete_food = (datos, cb) => {
    conn.query("DELETE FROM comida WHERE com_id = ?;", datos, cb);
};

module.exports = food_model;
