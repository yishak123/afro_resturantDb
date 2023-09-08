
const express = require('express');
const app = express();
const reservationsRouter = require('./routes/reservations');

app.use(express.json());


// Use the reservations router
app.use('/api', reservationsRouter);

// Add more routers for other API endpoints

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
