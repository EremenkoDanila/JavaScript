const express = require('express');
const {MainPicsController} = require('./MainPicsController');

const router = express.Router();

router.get('/', MainPicsController.findMainPics);
router.get('/:id', MainPicsController.findMainPicById);
router.post('/', MainPicsController.addMainPic);
router.delete('/:id', MainPicsController.deleteMainPic);

module.exports = router;