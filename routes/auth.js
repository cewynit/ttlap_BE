const authController = require("../controllers/authControllers.js");

const router = require("express").Router();

router.post("/create", authController.registerUser);
router.put("/update", authController.registerUser);
router.get("/getAll", authController.registerUser);
router.delete("/delete", authController.registerUser);
module.exports = router;