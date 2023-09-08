

CREATE TABLE Customers (
    customer_id INT PRIMARY KEY,        
    name VARCHAR(100),                  
    phone_number VARCHAR(15),           
    email VARCHAR(20)                  
);

CREATE TABLE Reservations (
    reservation_id INT PRIMARY KEY,      
    customer_id INT,            
    reservation_date DATETIME,          
    party_size INT,                     
    CONSTRAINT fk_customer              -- Foreign key constraint linking to Customers table
        FOREIGN KEY (customer_id)
        REFERENCES Customers(customer_id)
        ON DELETE CASCADE                -- If customer is deleted, delete associated reservations
);

CREATE TABLE Staff (
    staff_id INT PRIMARY KEY,            
    name VARCHAR(100),                  
    role ENUM('chief', 'waiter', 'cashier')  -- Role of the staff member (chief, waiter, cashier)
);


CREATE TABLE ReservationAssignments (
    assignment_id INT PRIMARY KEY,      
    reservation_id INT,                 
    staff_id INT,                       
    assignment_date DATETIME,          
    CONSTRAINT fk_reservation           -- Foreign key constraint linking to Reservations table
        FOREIGN KEY (reservation_id)
        REFERENCES Reservations(reservation_id)
        ON DELETE CASCADE,               -- If reservation is deleted, delete associated assignments
    CONSTRAINT fk_staff                 -- Foreign key constraint linking to Staff table
        FOREIGN KEY (staff_id)
        REFERENCES Staff(staff_id)
);

CREATE TABLE MenuItems (
    item_id INT PRIMARY KEY,             
    name VARCHAR(100),                  
    price DECIMAL(10, 2)                
);

CREATE TABLE Orders (
    order_id INT PRIMARY KEY,           
    reservation_id INT,                 
    order_date DATETIME,                
    CONSTRAINT fk_reservation_order     
        FOREIGN KEY (reservation_id)
        REFERENCES Reservations(reservation_id)
        ON DELETE CASCADE               
);

CREATE TABLE OrderItems (
    order_item_id INT PRIMARY KEY,       
    order_id INT,                        
    item_id INT,                         
    quantity INT,                        -- Quantity of the menu item in the order
    CONSTRAINT fk_order                
        FOREIGN KEY (order_id)
        REFERENCES Orders(order_id)
        ON DELETE CASCADE,              
    CONSTRAINT fk_menu_item         
        FOREIGN KEY (item_id)
        REFERENCES MenuItems(item_id)
);


CREATE TABLE Payments (
    payment_id INT PRIMARY KEY,          
    reservation_id INT,                 
    payment_date DATETIME,              
    amount DECIMAL(10, 2),               
    CONSTRAINT fk_reservation_payment    
        FOREIGN KEY (reservation_id)
        REFERENCES Reservations(reservation_id)
        ON DELETE CASCADE                
);


INSERT INTO Customers (customer_id, name, phone_number, email)
VALUES
    (1, 'tomas neway', '093-456-7890', 'tom@example.com'),
    (2, 'yishak zewdu', '097-654-3210', 'yisa@example.com');


INSERT INTO Reservations (reservation_id, customer_id, reservation_date, party_size)
VALUES
    (1, 1, '2023-08-25 18:00:00', 4),
    (2, 2, '2023-08-26 19:30:00', 2);


INSERT INTO Staff (staff_id, name, role)
VALUES
    (1, 'Chef bekel', 'chief'),
    (2, 'Waiter Alex', 'waiter'),
    (3, 'Cashier chaltu', 'cashier');


INSERT INTO ReservationAssignments (assignment_id, reservation_id, staff_id, assignment_date)
VALUES
    (1, 1, 1, '2023-08-25 14:00:00'),
    (2, 1, 2, '2023-08-25 16:00:00'),
    (3, 1, 3, '2023-08-25 17:30:00'),
    (4, 2, 2, '2023-08-26 19:00:00'),
    (5, 2, 3, '2023-08-26 19:15:00');


INSERT INTO MenuItems (item_id, name, price)
VALUES
    (1, 'Injera with Doro Wot',  312),
    (2, 'Kitfo', 314),
    (3, 'Tibs', 270),
    (4, 'Shiro', 110),
    (5, 'Timatim Fitfit', 268);


INSERT INTO Payments (payment_id, reservation_id, payment_date, amount)
VALUES
    (1, 1, '2023-09-01 20:30:00', 40.99),
    (2, 2, '2023-09-02 21:00:00', 25.50);

-- Orders
INSERT INTO Orders (order_id, reservation_id, order_date)
VALUES
    (1, 1, '2023-09-01 19:15:00'),
    (2, 2, '2023-09-02 20:00:00');

-- OrderItems
INSERT INTO OrderItems (order_item_id, order_id, item_id, quantity)
VALUES
    (1, 1, 2, 2),
    (2, 1, 3, 1),
    (3, 2, 1, 1),
    (4, 2, 4, 2);

