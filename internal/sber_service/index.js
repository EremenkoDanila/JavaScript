const express = require('express');
const {SberServicesController} = require('./SberServicesController');

const router = express.Router();

router.get('/', SberServicesController.findSberServices);
router.get('/:id', SberServicesController.findSberServiceById);
router.post('/', SberServicesController.addSberService);
router.delete('/:id', SberServicesController.deleteSberService);
router.patch('/:id', SberServicesController.updateSberService);

module.exports = router;