const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController,
  deleteDoctorAccountController,
  deleteUserAccountControlller,
} = require("../controller/adminCtrl");

const router = express.Router();

router.get("/getAllUsers", authMiddleware, getAllUsersController);

router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

// ? Posting account status
router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);

router.post(
  "/delete-doctor-account",
  authMiddleware,
  deleteDoctorAccountController
);

router.post(
  "/delete-user-account",
  authMiddleware,
  deleteUserAccountControlller
);

module.exports = router;
