const express = require("express");
const router = express.Router();
const getUsersControllers = require("../controllers/getUsersControllers")
const updateUserControllers = require("../controllers/updateUserControllers")

//route1: Add user

router.get("/users", getUsersControllers);

//route2: Update user

router.put("/user/:id", updateUserControllers);

module.exports = router;
