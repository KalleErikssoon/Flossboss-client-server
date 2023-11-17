const ClinicModel = require("../models/clinic");

class ClinicController {
  async getAllClinics(req, res) {
    try {
      const clinic = await ClinicModel.find({}).sort({ name: 1 }).exec();
      if (!clinic) {
        res.status(404).send("No clinics exist");
      }
      res.json(clinic);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = ClinicController;
