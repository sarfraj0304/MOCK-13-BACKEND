const { Router } = require("express");
const { appointmentModel } = require("../models/AppointmentModel");
const appointmentRouter = Router();

appointmentRouter.get("/get", async (req, res) => {
  const specialization = req.query;
  const name = req.query;
  const { limit, sort, page } = req.query;
  try {
    if (specialization && name) {
      const data = await appointmentModel
        .find()
        .limit(limit)
        .skip((page - 1) * limit);
      res.send({ data: data });
    } else {
      const data = await appointmentModel
        .find({
          $or: [specialization, name],
        })
        .limit(limit)
        .skip((page - 1) * limit);
      res.send({ data: data });
    }
  } catch (error) {
    res.send({ error: error });
  }
});

appointmentRouter.post("/", async (req, res) => {
  try {
    const data = new appointmentModel(req.body);
    await data.save();
    res.send({ msg: "appointment created" });
  } catch (error) {
    res.send({ error: error });
  }
});

appointmentRouter.patch("/book/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const fetch = await appointmentModel.find({ _id: id });
    const data = await appointmentModel.findByIdAndUpdate(
      { _id: id },
      { slots: fetch[0].slots - 1 }
    );
    res.send({ msg: "appointment booked" });
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = { appointmentRouter };
