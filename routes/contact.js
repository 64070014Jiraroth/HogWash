const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/contact", async function (req, res, next) {
    return res.render("contact");
});

exports.router = router;
