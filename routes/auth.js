const authController = require("../controllers/authControllers.js");
const middlewareController = require("../controllers/middlewareController.js");

const router = require("express").Router();

router.post("/create", authController.registerUser);
router.put("/update", authController.registerUser);
router.get("/getAll", authController.registerUser);
router.delete("/delete", authController.registerUser);
//REFRESH
router.post("/refresh",authController.requesRefreshToken);
//LOGOUT
router.post("/logout",middlewareController.verifyToken,authController.userLogout);
module.exports = router;