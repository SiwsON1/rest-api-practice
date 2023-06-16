const Testimonial = require('../models/testimonial.model');
var sanitize = require('mongo-sanitize');


exports.getAll = async (req, res) => {

    try {
      res.json(await Testimonial.find({}));
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.getRandom = async (req, res) => {

    try {
      const count = await Testimonial.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const tes = await Testimonial.findOne().skip(rand);
      if(!tes) res.status(404).json({ message: 'Not found' });
      else res.json(tes);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  };

  exports.getById = async (req, res) => {

    try {
        const tes = await Testimonial.findById(req.params.id);
        if(!tes) res.status(404).json({ message: 'Not found' });
        else res.json(tes);
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
  };

  exports.postAll = async (req, res) => {
    var clean = sanitize(req.params.username);

    try {
        const { author, text } = req.body;
        const sanitizedAuthor = sanitize(author);
        const sanitizedText = sanitize(text); 
        const newTestimonial = new Testimonial({ author: sanitizedAuthor, text: sanitizedText });
        await newTestimonial.save();
        res.json({ message: 'OK' });
    
      } catch(err) {
        res.status(500).json({ message: err });
      }
  };


  exports.putById = async (req, res) => {

    const { author, text} = req.body;
  
    try {
      const tes = await Testimonial.findById(req.params.id);
      if(tes) {
        await Testimonial.updateOne({ _id: req.params.id }, { $set: { author: author, text: text }});
        const updatedTes = await Testimonial.findById(req.params.id);
        res.json(updatedTes);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };


  exports.deleteById = async (req, res) => {

    try {
        const tes = await Testimonial.findById(req.params.id);
        if(tes) {
          const deletedTes = await Testimonial.deleteOne({ _id: req.params.id });
          res.json({ message: 'OK', deletedTes });
        }
        else res.status(404).json({ message: 'Not found...' });
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
  };

  