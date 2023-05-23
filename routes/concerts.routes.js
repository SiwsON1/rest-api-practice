const express = require('express');
const router = express.Router();
const db = require('./../db');

// get all concerts
router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
  });
// get random concert
router.route('/concerts/random').get((req, res) => {
    const randomIndex = Math.floor(Math.random() * db.concerts.length);
    res.json(db.concerts[randomIndex]);
  });
// get concerts by id
router.route('/concerts/:id').get((req, res) => {
    const id = req.params.id;
    const parsedId = parseInt(id);
    res.json(db.concerts[parsedId]);
  });
// post new concert
router.route('/concerts').post((req, res) => {
    const { performer, genre, price, day, image } = req.body;
  
    if (performer && genre && price && day && image) {
      const newConcert = { id: db.concerts.length + 1, performer, genre, price, day, image };
      db.concerts.push(newConcert);
  
      res.status(200).json({ message: 'OK' });
    } else {
      res.status(400).json({ error: 'Missing data' });
    }
  });
 // modify concert by id
 router.route('/concerts/:id').put((req, res) => {
    const id = parseInt(req.params.id);
    const { performer, genre, price, day, image } = req.body;
  
    if (performer && genre && price && day && image) {
      const index = db.concerts.findIndex(item => item.id === id);
  
      if (index !== -1) {
        db.concerts[index].performer = performer;
        db.concerts[index].genre = genre;
        db.concerts[index].price = price;
        db.concerts[index].day = day;
        db.concerts[index].image = image;
  
        res.status(200).json({ message: 'OK' });
      } else {
        res.status(404).json({ error: 'Element not found' });
      }
    } else {
      res.status(400).json({ error: 'Missing data' });
    }
  });
// delete concert by id
router.route('/concerts/:id').delete((req, res) => {
    const id = parseInt(req.params.id);
  
    const index = db.concerts.findIndex(item => item.id === id);
  
    if (index !== -1) {
      db.concerts.splice(index, 1);
      res.status(200).json({ message: 'OK' });
    } else {
      res.status(404).json({ error: 'Element not found' });
    }
  });
  
  module.exports = router;