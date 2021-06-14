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
    com_nombre VARCHAR(50) NOT NULL,
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

-- - Insertando los datos en las tablas

INSERT INTO categoria(cat_id, cat_nombre, cat_tipo, cat_plus18) VALUES 
                    (5,'Entradas','Comida',NULL),
                    (15,'Plato Fuerte','Comida',NULL),
                    (25,'Refrescos','Bebida',NULL),
                    (35,'Cervezas','Bebida','a'),
                    (45,'Aperitivo','Comida',NULL),
                    (55,'Golosina','Comda',NULL),
                    (56,'Postres','Comida',NULL),
                    (57,'Ensaladas','Comida',NULL),
                    (58,'Panes','Comida',NULL),
                    (59,'A la parrilla','Comida',NULL),
                    (60,'Pescados y Mariscos','Comida',NULL),
                    (61,'Pastas','Comida',NULL),
                    (62,'Desayunos','Comida',NULL),
                    (63,'Bebidas','Bebida',NULL);

INSERT INTO comida(com_id, com_cat_id, com_nombre, com_precio, com_descripcion, com_estado) VALUES 
                (15,60,'Ceviche de camarón',99.99,'Una joyita salida del mar.','a'),
                (25,60,'Caldo de camarón',65.00,'Un caldo tradicional, revitalizante y levantamuertos.','a'),
                (45,15,'Enchiladas suizas',46.00,'Son de importación, directamente de los Alpes suizos.','a'),
                (55,35,'Corona',40.00,'La cerveza más fina','a'),
                (75,5,'Carne asada',90.00,'Recién traída del norte, pa. ¡Fierro, pariente!','a'),
                (115,5,'Sándwich básico',20.00,'Mejor conocido como  c h a n w  i s.','a'),
                (125,5,'Hamburguesa',45.75,'ham ham ham bur bur bur ger ger ger','a'),
                (135,15,'Sopa de macaco',90.15,'Obrigado, você é um amigo','a'),
                (145,45,'Papas fritas',70.00,'mmmm papas con catsu','i'),
                (146,25,'Coca-Cola',20.00,'Destapa la felicidad.','a'),
                (147,35,'Guinness',80.00,'La última y nos vamos, un trago y adiós hígado.','i'),
                (148,55,'Cocada',55.00,'Un dulce tradicional mexicano.','a'),
                (149,25,'Fanta',15.00,'Fanta de mandarina.','a'),
                (151,61,'Espagueti',75.00,'Que el único espagueti sea el de tu plato, ¡no el de tu código!','a'),
                (153,5,'Hot-Dog',30.00,'Nada mejor que un buen hot dog.','a'),
                (155,59,'Sándwich a la parrilla',35.00,'Con delicioso tocino y cremoso pollo.','i'),
                (158,59,'Sopes de Vegetales Parrillados',40.00,'¡Más sano y más rico no puede ser!','a'),
                (159,59,'Corona de Tacos',60.00,'La corona para el el mejor rey, usted.','a'),
                (160,59,'Ternera asada al Romero',80.00,'¿Alguien dijo ternera? ¡Dame dos!','a'),
                (161,59,'Pollo momia',60.00,'(Ningún sarcófago fue profanado en la preparación de este delicioso alimento)','i'),
                (162,35,'Bomba de michelada',35.00,'Saca las miches, pa.','i'),
                (163,35,'Gomichelas',30.00,'Is that still a thing?','a'),
                (165,35,'Michelada de tamarindo',50.00,'Lo picosito del tamarindo con lo dulce de la cerveza.','a'),
                (166,62,'Tacos de hot cakes con fruta',50.75,'Nombre peculiar, ¡sabor excepcional!','a'),
                (167,62,'Croissants de Chocolate',43.50,'Que los únicos cuernos que te pongan sean éstos en la mesa.','a'),
                (168,62,'Tamales de Plátano con Nutella',25.60,'¡Tan exóticos como deliciosos!','a'),
                (169,63,'Licuado Energético de Chocolate y Almendras',35.50,'¡Los frutos ya no son tan secos y no habían sido más ricos!','i'),
                (170,62,'Huevos ahogados con Salsa de Frijol',60.00,'Desayuno muy a la mexicana.','a'),
                (171,62,'Sándwich de omelette',30.00,'Hoy puede ser tu cheat day, date el lujo de probar este manjar.','a'),
                (172,57,'Papas rellenas de atún gratinadas',33.50,'Puede que no te gusten por separado, ¡pero juntos son una combinación mortal!','a'),
                (173,57,'Ensalada navideña',54.50,'¿Por qué sólo en navidad? ¡Quiero tenerla todos los días!','a'),
                (174,57,'Pimientos rellenos de ensalada de Surimi',28.00,'Cuando acabes el primero, ¡seguro pedirás más!','a'),
                (175,57,'Pepinos con ensalada de pollo y almendras',30.00,'Delicioso sabor tropical.','a'),
                (176,57,'Ensalada cremosa de pechuga de pavo y queso panela',73.50,'¡Tan rico como saludable!','a'),
                (177,58,'Bísquets de fresa rellenos',20.00,'El bísquet de por sí es delicioso, ¡ahora imagínatelos rellenos!.','a'),
                (178,58,'Cuernitos y chocolatines',15.00,'Estos cuernos sí te van a caer bien.','a'),
                (179,58,'Pan de muerto',18.30,'¡Estarás muerto de ganas por otro!','a'),
                (181,58,'Concha',8.00,'La clásica concha de toda la vida, ¡no te vas a cansar de ella!','a'),
                (182,61,'Pasta rotini',50.42,'¡Los espirales más esponjosos, ricos y vistosos que comerás!','a'),
                (183,61,'Espagueti tricolor',50.00,'¡El único plato tan mexicano como italiano!','a'),
                (184,61,'Lasaña de Nogada',64.00,'¡Que delicia tricolor!','a'),
                (185,58,'Pan de elote con salsa de glorias',20.00,'El sabor como la salsa.','a'),
                (186,61,'Pizza de pepperoni con orilla de queso',120.00,'Un clásico que no puede faltar en el menú.','a'),
                (187,60,'Torta ahogada de camarón',43.00,'¡Picosito y delicioso!','a'),
                (188,60,'Ensalada césar con pasta y atún',53.00,'¿Es una ensalada o un marisco? ¡Tú decides! (Y nuestra base de datos tiene la palabra final).','a'),
                (189,60,'Crema de camarón',55.50,'Tan delicioso como fácil de comer. Sin darte cuenta... ¡Ya habrás acabado con más raciones!','a'),
                (190,60,'Rollos de ensalada de atún',45.60,'Una vez más la ambigüedad en el nombre, ¡tú decide! (Spoiler: Nosotros sabemos la respuesta).','a'),
                (191,15,'Enchiladas suizas sin tortilla',80.00,'Por más raro que suene enchilada sin tortilla, ¡debes saber que es una delicia!','a'),
                (192,15,'Huaraches',30.00,'¡Algunos huaraches van en la boca y no de calzado!','a'),
                (193,15,'Tlacoyos ahogados de chicharrón',65.50,'¡Ni yo sé qué sea!','a'),
                (194,15,'Maxiquesadillas de Chilorio',54.50,'Te juramos que no es un albur, pero si sabe como lo que te gusta.','a'),
                (195,56,'Gelatina de arroz con leche',20.00,'¡Lo delicioso del arroz con leche con la divertida consistencia de la gelatina!','a'),
                (196,56,'Panqué de plátano con brownie',40.00,'¡El brownie puede tener una sorpresa que te hará volar!','a'),
                (197,56,'Pastelito de limón en taza',22.50,'Es pequeño, pero eso no le quita el dulce fuerte y la deliciosa vista.','a'),
                (198,56,'Pay de queso',18.30,'Cremoso y delicioso, justo como debe ser.','a'),
                (199,56,'Rosquillas rellenas',60.00,'Como a Homero le gustan (el otro, no el poeta).','a'),
                (200,63,'Café negro',25.00,'Recién salido de las mejores ollas en México.','i'),
                (201,63,'Café con leche',25.00,'Es como café... pero con leche.','i'),
                (202,63,'Té de canela',15.00,'Un buen sustituto si quieres evitar la cafeína.','i'),
                (203,63,'Té de limón',16.00,'No es tan agrio como lo creerías.','i'),
                (210,25,'Pepsi',13.50,'(¡Destapa la felicidad!)^-1','a'),
                (211,25,'Fresca',13.50,'¿Todavía existe?','a'),
                (212,25,'Delaware Punch',10.00,'Uvita rica.','a'),
                (213,35,'Modelo',20.00,'Chelonga.','a');

INSERT INTO mesero(mro_id, mro_nombre, mro_telefono, mro_correo, mro_sueldo, mro_domicilio, mro_estado, mro_foto) VALUES 
                (55,'hjh','4621346798','diego.a.ga@dominio.com',10000.00,'sasasas','i','file-1623639377828.png'),
                (65,'Eltor cido','4621468768','misael.rr@dominio.com',99.99,'Irapuato','a','file-1623639465582.jpg'),
                (75,'Braulio José Baca Barbosa','4153246987','braulio.j.bb@dominio.com',99.99,'Jaral del progreso','a','no_user.png'),
                (85,'Aldo Isaac Hernández Antonio','4621549783','aldo.i.ha@dominio.com',99.99,'Irapuato','a','file-1623634861352.webp'),
                (105,'Aldo Saudita Aldo Saudita','4621345678','aldo.s.a.s@dominio.com',99.99,'Arabia Saudita','i','no_user.png'),
                (115,'Chokis','4620560045','eduardo.c@dominio.com',30.50,'Irapuato','a','file-1623640366723.jpg'),
                (130,'Apeca Peca','1234567980','apeca@outlook.com',1234.00,'direccion apeca','i','file-1623558303708.jpg'),
                (131,'Alfonso Quijano','1234658794','alfi@gmail.com',1500.00,'Algún lugar de La Mancha, cuyo nombre no quiero acordarme','a','file-1623626582456.jpg'),
                (132,'Vacío','4291256166','vegueku12@hotmail.com',1212.00,'Abasolo','i','file-1623640315927.jpg'),
                (136,'Floppa Enojado','1234657984','floppangry@gmail.com',12000.00,'Russia','a','file-1623626784272.webp'),
                (137,'Héctor Moai','4651327891','tontonchiclon@hotmail.com',1000.00,'Rapa Nui','a','file-1623621417449.jpg');

INSERT INTO mesa(mes_id, mes_capacidad, mes_disponible) VALUES 
                (1,8,'a'),
                (2,4,'a'),
                (3,4,'i'),
                (4,4,'i'),
                (5,4,'a'),
                (6,8,'i'),
                (7,4,'i'),
                (8,4,'i'),
                (9,4,'i'),
                (10,4,'i'),
                (11,8,'a'),
                (12,4,'i'),
                (13,4,'a'),
                (14,4,'i'),
                (15,4,'i');

INSERT INTO orden(ord_id, ord_mro_id, ord_mes_id, ord_fecha_hora, ord_estado) VALUES 
                (45,75,8,'2021-06-10 23:26:48','i'),
                (95,85,3,'2021-06-10 23:36:37','i'),
                (123,55,1,'2021-06-13 18:40:39','i'),
                (124,85,3,'2021-06-13 18:55:33','i'),
                (125,65,2,'2021-06-13 18:56:16','i'),
                (128,75,11,'2021-06-13 18:56:54','i'),
                (129,85,5,'2021-06-13 21:58:39','i'),
                (130,131,13,'2021-06-13 21:58:45','i'),
                (131,137,12,'2021-06-13 21:58:51','a'),
                (133,75,15,'2021-06-13 21:59:25','a'),
                (134,131,6,'2021-06-13 21:59:32','a'),
                (135,75,1,'2021-06-13 22:35:46','i'),
                (136,85,3,'2021-06-13 23:16:42','a'),
                (137,75,7,'2021-06-13 23:16:48','a'),
                (138,137,8,'2021-06-13 23:16:54','w'),
                (139,132,4,'2021-06-13 23:17:00','a'),
                (140,136,14,'2021-06-14 00:12:50','w');

INSERT INTO suborden(sub_id, sub_ord_id, sub_com_id, sub_asiento, sub_cant) VALUES 
                (155,45,115,1,2),
                (175,45,145,2,1),
                (195,95,125,1,3),
                (214,123,125,1,2),
                (215,123,146,1,1),
                (216,123,153,2,2),
                (217,123,149,2,1),
                (218,123,151,3,1),
                (219,123,147,3,1),
                (221,123,146,7,1),
                (222,123,25,8,1),
                (223,123,55,8,1),
                (224,124,172,1,1),
                (225,124,210,1,1),
                (226,124,193,2,1),
                (227,124,165,2,1),
                (228,124,182,3,1),
                (229,124,212,3,1),
                (230,125,159,1,2),
                (231,125,213,1,2),
                (232,125,192,2,2),
                (233,125,55,2,3),
                (234,125,147,3,3),
                (246,128,189,1,1),
                (247,128,188,1,1),
                (248,128,55,1,2),
                (249,128,187,2,3),
                (250,128,15,2,1),
                (287,129,115,1,2),
                (288,129,149,1,1),
                (289,129,198,2,1),
                (290,129,200,2,1),
                (291,130,177,1,3),
                (292,130,202,1,1),
                (293,130,183,2,1),
                (294,130,201,2,1),
                (295,131,161,1,3),
                (296,131,200,1,1),
                (313,133,179,1,3),
                (314,133,201,1,1),
                (315,133,151,2,1),
                (316,134,184,1,1),
                (317,134,55,1,2),
                (318,135,186,1,3),
                (319,135,146,1,5),
                (320,135,55,1,5),
                (321,136,175,1,1),
                (322,136,162,1,1),
                (323,137,199,1,4),
                (324,137,200,1,2),
                (325,139,147,2,5),
                (326,139,167,3,1),
                (327,139,145,2,2),
                (328,139,159,3,1);

INSERT INTO pago(pag_ord_id, pag_subtotal, pag_total, pag_propina, pag_tipo_pago, pag_fecha_pago) VALUES 
                (45,110.00,121.00,10.00,'Tarjeta','2021-01-13 22:00:46'),
                (95,137.25,150.98,10.00,'Efectivo','2021-06-13 07:47:37'),
                (123,466.50,513.15,50.00,'Efectivo','2021-06-13 22:06:57'),
                (124,222.92,245.21,0.00,'Efectivo','2021-01-13 22:09:02'),
                (125,580.00,638.00,0.00,'Efectivo','2021-06-14 01:01:17'),
                (128,417.49,459.24,50.00,'Efectivo','2021-03-14 00:56:54'),
                (129,98.30,108.13,20.00,'Efectivo','2021-06-14 01:01:51'),
                (130,150.00,165.00,4545.00,'Efectivo','2021-06-14 03:06:36'),
                (135,660.00,726.00,30.00,'Efectivo','2021-06-14 00:18:59');
