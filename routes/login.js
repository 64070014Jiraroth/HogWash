const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/login", async function (req, res, next) {
    return res.render("login");
});

exports.router = router;
