const mongoose = require("mongoose");
const appointmentSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  slots: { type: Number, required: true },
  fee: { type: Number, required: true },
});

const appointmentModel = mongoose.model("appointment", appointmentSchema);
module.exports = {
  appointmentModel,
};
