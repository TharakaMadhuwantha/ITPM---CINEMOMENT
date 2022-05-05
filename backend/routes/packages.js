const router = require('express').Router();
let Package = require('../models/package.model');

router.route('/').get((req, res) => {
  Package.find()
    .then(packages => res.json(packages))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const packagename = req.body.packagename;
  const packagetype = req.body.packagetype;
  const cameras = req.body.cameras;
  const drons = req.body.drons;
  const amount = Number(req.body.amount);
  const description = req.body.description;

  const newPackage = new Package({
    packagename,
    packagetype,
    cameras,
    drons,
    amount,
    description,
  });

  newPackage.save()
  .then(() => res.json('Package added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Package.findById(req.params.id)
    .then(package => res.json(package))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Package.findByIdAndDelete(req.params.id)
    .then(() => res.json('Package deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Package.findById(req.params.id)
    .then(package => {
      package.packagename = req.body.packagename;
      package.packagetype = req.body.packagetype;
      package.cameras = req.body.cameras;
      package.drons = req.body.drons;
      package.amount = Number(req.body.amount);
      package.description = req.body.description;

      package.save()
        .then(() => res.json('Package updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;