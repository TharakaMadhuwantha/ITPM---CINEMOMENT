const router = require('express').Router();
let Appointment = require('../models/appointment.model');

router.route('/').get((req, res) => {
  Appointment.find()
    .then(appointments => res.json(appointments))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const couplename = req.body.couplename;
  const contactno = Number(req.body.contactno);
  const date = Date.parse(req.body.date);
  const time = req.body.time;
  const reason = req.body.reason;
  const note = req.body.note;

  const newAppointment = new Appointment({
    couplename,
    contactno,
    date,
    time,
    reason,
    note,
  });

  newAppointment.save()
  .then(() => res.json('Appointment added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Appointment.findById(req.params.id)
    .then(appointment => res.json(appointment))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Appointment.findByIdAndDelete(req.params.id)
    .then(() => res.json('Appointment deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Appointment.findById(req.params.id)
    .then(appointment => {
      appointment.couplename = req.body.couplename;
      appointment.contactno = Number(req.body.contactno);
      appointment.date = Date.parse(req.body.date);
      appointment.time = req.body.time;
      appointment.reason = req.body.reason;
      appointment.note = req.body.note;

      appointment.save()
        .then(() => res.json('Appointment updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;