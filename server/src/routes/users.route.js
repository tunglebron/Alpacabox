const router = require("express").Router();
const userController = require("../controllers/users.controller");
const verify = require("../middlewares/auth.middleware");

router.put("/:id", verify, userController.updateUser)

router.delete("/:id", verify, userController.deleteUser)

router.get("/find/:id", userController.getUser)

router.get("/", verify, userController.getAllUsers)

router.get("/stats", userController.getStats)

module.exports = router;