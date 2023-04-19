const appointmentModel = require("../models/appointmentModel");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModel");
const send_SMS = require("../send_message/sendSMS");
const sendEmail = require("../send_message/sendEmail")

const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "doctor data fetch success",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching Doctor Details",
    });
  }
};

// update doctor profile
const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Doctor Profile Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Doctor Profile Update issue",
      error,
    });
  }
};

//get single docotor
const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: "Single Doc info fetched",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in single doctor information",
    });
  }
};

const doctorAppointmentsController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
    });
    res.status(200).send({
      success: true,
      message: "Doctor Appointments fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Doc Appointments",
    });
  }
};

const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointments.userId });
    const notification = user.notification;
    notification.push({
      type: "status-updated",
      message: `your appointment has been updated ${status}`,
      onCLickPath: "/appointments",
    });

    // sending sms to the user
    if (status === "approved") {
      const user_message = `Your Appointment with Dr.${appointments.doctorInfo.firstName} ${appointments.doctorInfo.lastName} is approved, for appointment timing please check in the appointment section of your DOC app account`;
      await send_SMS(appointments.userInfo.number, user_message);
      await sendEmail(appointments.userInfo.email, user_message)
    } else if (status === "reject") {
      const user_message = `Your Appointment with Dr.${appointments.doctorInfo.firstName} ${appointments.doctorInfo.lastName} is Rejected, to book a new appointment visit our website`;
      await send_SMS(appointments.userInfo.number, user_message);
      await sendEmail(appointments.userInfo.email, user_message)

    }
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
};

const deleteAppointmentRequest = async (req, res) => {
  try {
    console.log(req.body.appointmentsId);
    await appointmentModel.findByIdAndDelete(req.body.appointmentsId);

    res.status(200).send({
      success: true,
      message: "Removed Appointment Request",
      // data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while Removing Appointment Request",
      error,
    });
  }
};

module.exports = {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
  deleteAppointmentRequest,
};
