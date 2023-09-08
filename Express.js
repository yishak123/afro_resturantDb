const express = require('express');
const router = express.Router();
const connection = require('./db'); // Import the database connection
const app = express();
// Create a new reservation
router.post('/reservations', (req, res) => {
  const { customer_id, reservation_date, party_size } = req.body;
  const sql = 'INSERT INTO Reservations (customer_id, reservation_date, party_size) VALUES (?, ?, ?)';
  connection.query(sql, [customer_id, reservation_date, party_size], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while creating the reservation.' });
    } else {
      res.status(201).json({ message: 'Reservation created successfully.' });
    }
  });
});

// Get all reservations
router.get('/reservations', (req, res) => {
  const sql = 'SELECT * FROM Reservations';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching reservations.' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Create a new menu item
router.post('/menu-items', (req, res) => {
  const { name, price } = req.body;
  const sql = 'INSERT INTO MenuItems (name, price) VALUES (?, ?)';
  connection.query(sql, [name, price], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while creating the menu item.' });
    } else {
      res.status(201).json({ message: 'Menu item created successfully.' });
    }
  });
});

// Get all menu items
router.get('/menu-items', (req, res) => {
  const sql = 'SELECT * FROM MenuItems';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching menu items.' });
    } else {
      res.status(200).json(results);
    }
  });
});


// Create a new reservation
router.post('/reservations', (req, res) => {
    // ... (as previously shown)
  });
  
  // Get all reservations
  router.get('/reservations', (req, res) => {
    // ... (as previously shown)
  });
  
  // Update a reservation by ID
  router.put('/reservations/:id', (req, res) => {
    const { customer_id, reservation_date, party_size } = req.body;
    const reservationId = req.params.id;
    const sql = 'UPDATE Reservations SET customer_id=?, reservation_date=?, party_size=? WHERE reservation_id=?';
    connection.query(sql, [customer_id, reservation_date, party_size, reservationId], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while updating the reservation.' });
      } else {
        res.status(200).json({ message: 'Reservation updated successfully.' });
      }
    });
  });
  
  // Delete a reservation by ID
  router.delete('/reservations/:id', (req, res) => {
    const reservationId = req.params.id;
    const sql = 'DELETE FROM Reservations WHERE reservation_id=?';
    connection.query(sql, [reservationId], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while deleting the reservation.' });
      } else {
        res.status(200).json({ message: 'Reservation deleted successfully.' });
      }
    });
  });
  
  // Create a new payment
  router.post('/payments', (req, res) => {
    // ... (similar to reservation and menu item creation)
  });
  
  // Get all payments
  router.get('/payments', (req, res) => {
    // ... (similar to reservation and menu item fetching)
  });
  
  // Create a new order
  router.post('/orders', (req, res) => {
    // ... (similar to reservation and menu item creation)
  });
  
  // Get all orders
  router.get('/orders', (req, res) => {
    // ... (similar to reservation and menu item fetching)
  });
  
  // Get customer information by ID
  router.get('/customers/:id', (req, res) => {
    const customerId = req.params.id;
    const sql = 'SELECT * FROM Customers WHERE customer_id=?';
    connection.query(sql, [customerId], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching customer information.' });
      } else {
        if (results.length === 0) {
          res.status(404).json({ message: 'Customer not found.' });
        } else {
          res.status(200).json(results[0]);
        }
      }
    });
  });
  

module.exports = router;
