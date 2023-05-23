const express = require('express');
const router = express.Router();
const db = require('./../db');

// get all testimonials
router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
  });
// get random testimonial
router.route('/testimonials/random').get((req, res) => {
    const randomIndex = Math.floor(Math.random() * db.testimonials.length);
      res.json(db.testimonials[randomIndex]);
  });
// get testimonial by id
router.route('/testimonials/:id').get((req, res) => {
    const id = req.params.id;
    const parsedId = parseInt(id);
    res.json(db.testimonials[parsedId]);
  });
// post new testimonial
router.route('/testimonials').post((req, res) => {
    const { author, text } = req.body;
    
    if (author && text) {
      const newTestimonial = { id: db.testimonials.length + 1, author, text };
      db.testimonials.push(newTestimonial);
  
      res.status(200).json({ message: 'OK' });
    } else {
      res.status(400).json({ error: 'Missing author or text field' });
    }
  });
 // modify testimonial by id
 router.route('/testimonials/:id').put((req, res) => {
    const id = parseInt(req.params.id);
    const { author, text } = req.body;
  
    if (author && text) {
      const index = db.testimonials.findIndex(item => item.id === id);
  
      if (index !== -1) {
        db.testimonials[index].author = author;
        db.testimonials[index].text = text;
  
        res.status(200).json({ message: 'OK' });
      } else {
        res.status(404).json({ error: 'Element not found' });
      }
    } else {
      res.status(400).json({ error: 'Missing author or text field' });
    }
  });
// delete testimonial by id
router.route('/testimonials/:id').delete((req, res) => {
    const id = parseInt(req.params.id);
    
      const index = db.testimonials.findIndex(item => item.id === id);
    
      if (index !== -1) {
        db.testimonials.splice(index, 1);
        res.status(200).json({ message: 'OK' });
      } else {
        res.status(404).json({ error: 'Element not found' });
      }
  });
  
  module.exports = router;
