-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS colors;

CREATE TABLE colors (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	color_name VARCHAR(50),
	hex_color VARCHAR(50)
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
('Turquoise', '#40e0d0');