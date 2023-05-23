const express = require('express');
const db = require('./db');

const app = express();

// import routes
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const testimonialsRoutes = require('./routes/testimonials.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use(cors());
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);
app.use('/api', testimonialsRoutes);
app.use((req, res) => {
    res.status(404).send('404 not found...');
  });


app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});