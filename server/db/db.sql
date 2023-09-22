CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(20,2) NOT NULL,
    discount DECIMAL(20,2) NOT NULL DEFAULT 0,
    imageUrl VARCHAR(1000)
);

INSERT INTO products (id, name, description, price, discount, imageurl) VALUES
('cA6fU', 'Very very Cool black hoodie', 'Some description goes here', 15, 3, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9vZGllfGVufDB8fDB8fHww&w=1000&q=80'),
('7p3ad', 'Sports hoodiedsafsadfasdfasdfasdfasdfasdfadsf', 'Some description goes here', 13, 2, 'https://lovet.g.shopcadacdn.com/sites/files/lovet/images/products/202305/1000x1500/21may-r1-235.jpg'),
('dfx8l', 'Cool black designer hoodie', 'Some description goes here', 35, NULL, 'https://images.unsplash.com/photo-1615397587950-3cbb55f95b77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvb2RpZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'),
('xmHy0', 'Grey hoodie', 'Some description goes here', 20, NULL, 'https://img.freepik.com/free-photo/beautiful-woman-white-hoodie-winter-fashion_53876-119758.jpg'),
('3dfsi', 'Very good', 'asdfasdfsadf', 0, 0, 'https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9vZGllfGVufDB8fDB8fHww&w=1000&q=80');
