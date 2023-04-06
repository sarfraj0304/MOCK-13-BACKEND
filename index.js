const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const { connection } = require("./db");
const { userRouter } = require("./routes/UserRoutes");
const { appointmentRouter } = require("./routes/AppointmentRoutes");
app.use(express.json());
app.use("/user", userRouter);
app.use("/appointments", appointmentRouter);

app.listen(4500, async () => {
  try {
    await connection;
    console.log("Db is connected!");
  } catch (error) {
    console.log({ error: error });
  }
  console.log("Server is Connected");
});
