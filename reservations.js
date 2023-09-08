const express = require('express');
const router = express.Router();
const db = require('../db'); // Import the database connection

// Create a new reservation
router.post('/reservations', async (req, res) => {
  try {
    const { customer_id, reservation_date, party_size } = req.body;
    
    // Insert the new reservation into the database
    const [result] = await db.execute(
      'INSERT INTO Reservations (customer_id, reservation_date, party_size) VALUES (?, ?, ?)',
      [customer_id, reservation_date, party_size]
    );

    res.status(201).json({ message: 'Reservation created successfully.', reservationId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the reservation.' });
  }
});

// Other reservation-related routes

module.exports = router;