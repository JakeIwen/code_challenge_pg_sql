-- Database name
treats
-- Document your create tables SQL here
CREATE TABLE treats (
  id SERIAL PRIMARY KEY,
  name VARCHAR(32),
  description text,
  pic VARCHAR(50));

INSERT INTO treats (name, description, pic)
VALUES ('Cupcake', 'A delicious cupcake', '/assets/cupcake.jpg'),
('Donuts', 'Mmmm donuts', '/assets/donuts.jpg');
