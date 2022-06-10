const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const usersControllers = require("../controllers/users-controllers");
const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/check-auth");


router.get("/", usersControllers.getUsers);

router.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(), // Test@test.com => test@test.com
    check("password").isLength({ min: 6 }),
  ],
  usersControllers.signup
);

router.post("/login", usersControllers.login);

router.use(checkAuth);

router.delete("/:uid/delete", usersControllers.deleteUser);

module.exports = router;
