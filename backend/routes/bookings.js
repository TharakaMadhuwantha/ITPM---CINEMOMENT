const router = require('express').Router();
let Booking = require('../models/booking.model');

router.route('/').get((req, res) => {
  Booking.find()
    .then(bookings => res.json(bookings))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const  groomname = req.body.groomname;
  const bridename = req.body.bridename;
  const  contactno = Number(req.body. contactno);
  const date = Date.parse(req.body.date);
  const  venue = req.body.venue;
  const package = req.body.package;

  const newBooking = new Booking({
    groomname,
    bridename,
    contactno,
    date,
    venue,
    package,
  });

  newBooking.save()
  .then(() => res.json('Booking added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Booking.findById(req.params.id)
    .then(booking => res.json(booking))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Booking.findByIdAndDelete(req.params.id)
    .then(() => res.json('Booking deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Booking.findById(req.params.id)
    .then(booking => {
      booking.groomname= req.body.groomname;
      booking.bridename = req.body.bridename;
      booking.contactno = Number(req.body.contactno);
      booking.date = Date.parse(req.body.date);
      booking.venue = req.body.venue;
      booking.package = req.body.package;
      booking.save()
        .then(() => res.json('Booking updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;