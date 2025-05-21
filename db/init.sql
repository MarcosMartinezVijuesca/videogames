CREATE DATABASE IF NOT EXISTS videogames;

GRANT ALL PRIVILEGES ON videogames.* TO user;

USE videogames;

CREATE TABLE videogames (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    type VARCHAR(100),
    year varchar(10)
);

INSERT INTO videogames (name, type, year) VALUES
('The Legend of Zelda: Breath of the Wild', 'Action-adventure', '2017'),
('Super Mario Odyssey', 'Platformer', '2017'),
('The Witcher 3: Wild Hunt', 'Action RPG', '2015'),
('Dark Souls III', 'Action RPG', '2016'),
('God of War', 'Action-adventure', '2018'),
('Red Dead Redemption 2', 'Action-adventure', '2018'),
('Hollow Knight', 'Metroidvania', '2017'),
('Celeste', 'Platformer', '2018'),
('Stardew Valley', 'Simulation RPG', '2016'),
('Overwatch', 'First-person shooter', '2016');