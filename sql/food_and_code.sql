CREATE DATABASE IF NOT EXISTS foodandcode;
USE foodandcode;

CREATE TABLE IF NOT EXISTS mesero(
	mro_id TINYINT UNSIGNED AUTO_INCREMENT,
    mro_nombre VARCHAR(50) NOT NULL,
    mro_telefono VARCHAR(10) NULL,
    mro_correo VARCHAR(40) NULL,
    mro_sueldo DECIMAL(10,2) NOT NULL,
    mro_domicilio VARCHAR(100) NOT NULL,
    mro_estado CHAR(1) NOT NULL DEFAULT 'a',
    mro_foto VARCHAR(255) NULL,
    PRIMARY KEY (mro_id)
);

CREATE TABLE IF NOT EXISTS categoria(
	cat_id TINYINT UNSIGNED AUTO_INCREMENT,
    cat_nombre VARCHAR(20) NOT NULL,
    cat_tipo VARCHAR(15) NOT NULL,
    cat_plus18 CHAR(1) NULL,
    UNIQUE (cat_nombre),
    PRIMARY KEY (cat_id)
);

CREATE TABLE IF NOT EXISTS mesa(
	mes_id TINYINT UNSIGNED AUTO_INCREMENT,
    mes_capacidad TINYINT NOT NULL,
    mes_disponible CHAR(1) NOT NULL DEFAULT 'a',
    PRIMARY KEY (mes_id)
);

CREATE TABLE IF NOT EXISTS orden(
	ord_id INT UNSIGNED AUTO_INCREMENT,
    ord_mro_id TINYINT UNSIGNED NOT NULL,
    ord_mes_id TINYINT UNSIGNED NOT NULL,
    ord_fecha_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    ord_estado CHAR(1) NOT NULL DEFAULT 'w',
    CONSTRAINT fk_mesero_orden
		FOREIGN KEY (ord_mro_id)
        REFERENCES mesero (mro_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
	CONSTRAINT fk_mesa_orden
		FOREIGN KEY (ord_mes_id)
        REFERENCES mesa (mes_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
	PRIMARY KEY (ord_id)
);

CREATE TABLE IF NOT EXISTS pago(
    pag_ord_id INT UNSIGNED NOT NULL,
    pag_subtotal DECIMAL(6,2) NOT NULL COMMENT 'SIN IVA',
    pag_total DECIMAL(6,2) NOT NULL,
    pag_propina DECIMAL(6,2) NULL,
    pag_tipo_pago ENUM('Tarjeta','Efectivo') NOT NULL,
    pag_fecha_pago TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    CONSTRAINT fk_orden_pago
    FOREIGN KEY (pag_ord_id)
        REFERENCES orden (ord_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
  PRIMARY KEY (pag_ord_id)
);

CREATE TABLE IF NOT EXISTS comida(
    com_id TINYINT UNSIGNED AUTO_INCREMENT,
    com_cat_id TINYINT UNSIGNED NOT NULL,
    com_nombre VARCHAR(20) NOT NULL,
    com_precio DECIMAL(9,2) NOT NULL,
    com_descripcion TEXT NULL,
    com_estado CHAR(1) NOT NULL DEFAULT 'a',
    UNIQUE (com_nombre),
    CONSTRAINT fk_categoria_comida
		FOREIGN KEY (com_cat_id)
        REFERENCES categoria (cat_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
	PRIMARY KEY (com_id)
);

CREATE TABLE IF NOT EXISTS suborden(
	sub_id INT UNSIGNED AUTO_INCREMENT,
    sub_ord_id INT UNSIGNED NOT NULL,
    sub_com_id TINYINT UNSIGNED NOT NULL,
    sub_asiento TINYINT NOT NULL,
    sub_cant TINYINT NOT NULL DEFAULT 1,
    CONSTRAINT fk_orden_suborden
		FOREIGN KEY (sub_ord_id)
        REFERENCES orden (ord_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
	CONSTRAINT fk_comida_suborden
		FOREIGN KEY (sub_com_id)
        REFERENCES comida (com_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
	PRIMARY KEY (sub_id)
);

DELIMITER $$

CREATE TRIGGER mesaOcupada BEFORE INSERT ON orden
    FOR EACH ROW
    BEGIN
        UPDATE mesa SET mes_disponible = 'i' WHERE mes_id = NEW.ord_mes_id;
    END;
$$

CREATE TRIGGER mesaDisponibleActualizado AFTER UPDATE ON orden
    FOR EACH ROW
    BEGIN
        IF NEW.ord_estado = 'i' THEN
            UPDATE mesa SET mes_disponible = 'a' WHERE mes_id = NEW.ord_mes_id;
        END IF;
    END;
$$

CREATE TRIGGER mesaDisponibleBorrado AFTER DELETE ON orden
    FOR EACH ROW
    BEGIN
		UPDATE mesa SET mes_disponible = 'a' WHERE mes_id = OLD.ord_mes_id;
    END;
$$

CREATE TRIGGER ordenPendiente AFTER INSERT ON suborden
    FOR EACH ROW
    BEGIN
        UPDATE orden SET ord_estado = 'a' WHERE ord_id = NEW.sub_ord_id;
    END;
$$

CREATE TRIGGER ordenPagada AFTER INSERT ON pago
    FOR EACH ROW
    BEGIN
        UPDATE orden SET ord_estado = 'i' WHERE ord_id = NEW.pag_ord_id;
    END;
$$

DELIMITER ;
