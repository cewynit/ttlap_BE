
const userController = require("../controllers/userControllers.js");

const router = require("express").Router();

//GET ALL USERS
router.get("/get", userController.getAllUsers);
//DELETE USER
router.delete("/delete/:id", userController.deleteUser);
//POST USER
router.post("/", userController.postUser);
//PUT USER
router.put("/:id", userController.putUser);
module.exports = router;