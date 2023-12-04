const express = require("express");
const { addToy, getToys, searchToys, getToyByCategory, getSingleToy, patchToy, deleteToy, getToysByUserId } = require("../controllers/toy.controller");
const { auth } = require("../middlewares/auth");
const router = express.Router();


router.get("/", getToys);
router.get("/search", searchToys);
router.get("/category/:catname", getToyByCategory);
router.get("/single/:id", getSingleToy);
router.get("/:id", getToysByUserId);


router.post("/", auth(), addToy);
router.patch("/:idEdit", auth(), patchToy);
router.delete("/:idDelete", auth(), deleteToy);


module.exports = router;
