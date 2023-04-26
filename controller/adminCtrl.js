const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModel");

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "user data list",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while fetching users",
      error,
    });
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "Doctors data list",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while fetching doctors data",
      error,
    });
  }
};

// ? Gives Doctor account status
const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await userModel.findOne({ _id: doctor.userId });
    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-updated",
      message: `Your Doctor Account Request has ${status} `,
      onCLickPath: "/notification",
    });
    user.isDoctor = status === "approved" ? true : false;
    user.isDoctor = status === "pending" ? false : true;
    await user.save();
    if (status === "approved") {
      const user_message = `Your application for doctor is Accepted`;
      // await send_SMS(appointments.userInfo.number, user_message);
      await sendEmail(doctor.email, user_message);
    } else if (status === "reject") {
      const user_message = `Your application for doctor is Rejected`;
      // await send_SMS(appointments.userInfo.number, user_message);
      await sendEmail(doctor.email, user_message);
    }
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Account Status",
      error,
    });
  }
};

const deleteDoctorAccountController = async (req, res) => {
  try {
    console.log(req.body.doctorId);
    const doctor = await doctorModel.findById(req.body.doctorId);
    console.log(doctor.userId);

    await userModel.findByIdAndUpdate(doctor.userId, { isDoctor: false });
    await doctorModel.findByIdAndDelete(req.body.doctorId);

    res.status(200).send({
      success: true,
      message: "Deleted Doctor account",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting doctors account",
      error,
    });
  }
};

const deleteUserAccountControlller = async(req, res) => {

  try {
    // console.log(req.body._id);
    await userModel.findByIdAndDelete(req.body._id);

    res.status(200).send({
      success: true,
      message: "Deleted Doctor account",
      // data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting doctors account",
      error,
    });
  }
};



module.exports = {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController,
  deleteDoctorAccountController,
  deleteUserAccountControlller
};
