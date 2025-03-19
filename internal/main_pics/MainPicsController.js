const {MainPicsService} = require('./MainPicsService');

class MainPicsController {
    static findMainPics(req, res) {
        try {
            res.send(MainPicsService.findMainPics());
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }

    static findMainPicById(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            res.send(MainPicsService.findMainPics(id))
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }

    static addMainPic(req, res) {
        try {
            res.send(MainPicsService.addMainPic(req.body));
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }

    static deleteMainPic(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            res.send(MainPicsService.deleteMainPic(id));
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }


    static updateMainPic(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            const updates = req.body;
            const updatedMainPic = MainPicsService.updateMainPic(id, updates);
            res.send(updatedMainPic);
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message});
        }
    }
}

module.exports = {
    MainPicsController,
};