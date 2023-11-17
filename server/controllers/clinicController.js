const ClinicModel = require("../models/clinic");

class ClinicController {
  async getAllClinics(req, res) {
    try {
      const clinic = await ClinicModel.find({});
      console.log(clinic);
      if (!clinic) {
        res.status(404).send("No clinics exist");
      }
      res.status(200).json(clinic);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = ClinicController;
