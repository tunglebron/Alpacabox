const router = require("express").Router();
const verify = require("../middlewares/auth.middleware");
const listController = require("../controllers/lists.controller");

//CREATE
router.post("/", verify, listController.createList);

//DELETE
router.delete("/:id", verify, listController.deleteList);

//GET ALL FOR ADMIN
router.get("/all", verify, listController.getAllListAdmin);

//GET ALL
router.get("/", verify, listController.getAllList);

//GET HOMEPAGE LIST
router.get("/homepage", verify, listController.getHomePageList);

//GET USER LIST
router.get("/mylist", verify, listController.getListByUser);

//UPDATE
router.put("/:id", verify, listController.updateList);

//GET
router.get("/find/:id", verify, listController.getList);

module.exports = router;