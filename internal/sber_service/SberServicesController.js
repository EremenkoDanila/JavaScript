const {SberServicesService} = require('./SberServicesService');

class SberServicesController {
    static findSberServices(req, res) {
        try {
            res.send(SberServicesService.findSberServices());
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }

    static findSberServiceById(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            res.send(SberServicesService.findSberServices(id))
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }

    static addSberService(req, res) {
        try {
            res.send(SberServicesService.addSberService(req.body));
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }

    static deleteSberService(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            res.send(SberServicesService.deleteSberService(id));
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }

    static updateSberService(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            const updates = req.body;
            const updatedService = SberServicesService.updateSberService(id, updates);
            res.send(updatedService);
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message});
        }
    }
    
    
}

module.exports = {
    SberServicesController,
};