const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Seat.find({}));
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.getRandom = async (req, res) => {

    try {
      const count = await Seat.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const seat = await Seat.findOne().skip(rand);
      if(!seat) res.status(404).json({ message: 'Not found' });
      else res.json(seat);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  };

  exports.getById = async (req, res) => {

    try {
        const seat = await Seat.findById(req.params.id);
        if(!seat) res.status(404).json({ message: 'Not found' });
        else res.json(seat);
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
  };

  exports.postAll = async (req, res) => {

    try {
        const { day, seat, client, email } = req.body;
        const newSeat = new Seat({ day: day, seat: seat, client: client, email: email });
        await newSeat.save();
        res.json({ message: 'OK' });
    
      } catch(err) {
        res.status(500).json({ message: err });
      }
  };


  exports.putById = async (req, res) => {

    const { day, seat, client, email} = req.body;
  
    try {
      const sea = await Seat.findById(req.params.id);
      if(sea) {
        await Seat.updateOne({ _id: req.params.id }, { $set: { day: day, seat: seat, client: client, email: email }});
        const updatedSeat = await Seat.findById(req.params.id);
        res.json(updatedSeat);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

  
  exports.deleteById = async (req, res) => {

    try {
        const seat = await Seat.findById(req.params.id);
        if(seat) {
          const deletedSeat = await Seat.deleteOne({ _id: req.params.id });
          res.json({ message: 'OK', deletedSeat });
        }
        else res.status(404).json({ message: 'Not found...' });
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
  };

  