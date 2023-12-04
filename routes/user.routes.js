const express = require("express");
const { register, getUsers, login, getInfoUser, deleteUser, patchUser } = require("../controllers/user.controller");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.get("/", getUsers);
router.get("/info/:id", getInfoUser);
router.post("/register", register);
router.post("/login", login);
router.delete("/:idDelete", auth(), deleteUser);
router.patch("/:idEdit", auth(), patchUser);

module.exports = router;
