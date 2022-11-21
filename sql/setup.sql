-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS colors;
DROP TABLE IF EXISTS sharks;

CREATE TABLE colors (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	color_name VARCHAR(50),
	hex_color VARCHAR(50)
);
CREATE TABLE sharks (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	common_name VARCHAR(50),
	distinctive_feature VARCHAR(50),
	length_ft BIGINT
);

INSERT INTO colors (
    color_name, 
    hex_color) 
VALUES 
('Maroon', '#800000'),
('Violet', '#ee82ee'),
('Yellow', '#ffff00'),
('Orange', '#ffa500'),
('Goldenrod', '#daa520'),
('Green', '#008000'),
('Blue', '#0000ff'),
('White', '#ffffff'),
('Black', '#000000'),
('Turquoise', '#40e0d0')
;

INSERT INTO sharks (
	common_name,
	distinctive_feature,
	length_ft
)
VALUES
('Goblin shark', 'catapulting snout', 13),
('Leopard shark', 'banded back', 5),
('Nurse shark', 'flattened body and a broad, rounded head', 10),
('Pyjama shark', 'stripes', 3.5),
('Silky shark', 'rounded snout, large eyes, and small jaws', 7.5)
;