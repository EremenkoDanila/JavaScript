const express = require('express');
const {SberServicesController} = require('./SberServicesController');

const router = express.Router();

router.get('/', SberServicesController.findSberServices);
router.get('/:id', SberServicesController.findSberServiceById);
router.post('/', SberServicesController.addSberService);
router.delete('/:id', SberServicesController.deleteSberService);

module.exports = router;