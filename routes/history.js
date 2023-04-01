const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/history", async function (req, res, next) {
    return res.render("history");
});

exports.router = router;
