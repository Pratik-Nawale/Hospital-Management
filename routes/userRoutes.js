const express = require("express");

const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDocotrsController,
  bookeAppointmnetController,
  bookingAvailabilityController,
  userAppointmentsController,
  getUserInfoController,
  updateUserInfoController,
  updateUserPasswordController
} = require("../controller/userCtrl");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", loginController);

router.post("/register", registerController);

//?  Authorization || Post
router.post("/getUserData", authMiddleware, authController);

router.post("/apply-doctor", authMiddleware, applyDoctorController);

//? Notifications of the doctors who have applied
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);

router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

router.get("/getAllDoctors", authMiddleware, getAllDocotrsController);

//BOOK APPOINTMENT
router.post("/book-appointment", authMiddleware, bookeAppointmnetController);

//BOOKING AVAILABILITY
router.post(
  "/booking-availbility",
  authMiddleware,
  bookingAvailabilityController
);

//Appointments List
router.get("/user-appointments", authMiddleware, userAppointmentsController);

router.post("/getUserInfo", authMiddleware, getUserInfoController);

router.post("/updateProfile", authMiddleware, updateUserInfoController);

router.post("/update-user-password", authMiddleware, updateUserPasswordController);

module.exports = router;
