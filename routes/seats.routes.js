const express = require('express');
const router = express.Router();
const db = require('./../db');

// get all seats
router.route('/seats').get((req, res) => {
    res.json(db.seats);
  });
// get random seat
router.route('/seats/random').get((req, res) => {
    const randomIndex = Math.floor(Math.random() * db.seats.length);
    res.json(db.seats[randomIndex]);
  });
// get seats by id
router.route('/seats/:id').get((req, res) => {
    const id = req.params.id;
    const parsedId = parseInt(id);
    res.json(db.seats[parsedId]);
  });
// post new seat
router.route('/seats').post((req, res) => {
    const { day, seat, client, email } = req.body;
  
    if ( day && seat && client && email) {
      const newSeat = { id: db.seats.length + 1, day, seat, client, email };
      db.concerts.push(newSeat);
  
      res.status(200).json({ message: 'OK' });
    } else {
      res.status(400).json({ error: 'Missing data' });
    }
  });
 // modify seat by id
 router.route('/seats/:id').put((req, res) => {
    const id = parseInt(req.params.id);
    const { day, seat, client, email } = req.body;
  
    if (day && seat && client && email) {
      const index = db.seats.findIndex(item => item.id === id);
  
      if (index !== -1) {
        db.seats[index].day = day;
        db.seats[index].seat = seat;
        db.seats[index].client = client;
        db.seats[index].email = email;
  
        res.status(200).json({ message: 'OK' });
      } else {
        res.status(404).json({ error: 'Element not found' });
      }
    } else {
      res.status(400).json({ error: 'Missing author or text field' });
    }
  });
// delete seat by id
router.route('/seats/:id').delete((req, res) => {
    const id = parseInt(req.params.id);
  
    const index = db.seats.findIndex(item => item.id === id);
  
    if (index !== -1) {
      db.seats.splice(index, 1);
      res.status(200).json({ message: 'OK' });
    } else {
      res.status(404).json({ error: 'Element not found' });
    }
  });
  
  module.exports = router;
