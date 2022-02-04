const express = require("express");
const router = express.Router();
const peticionesMongo= require("../controllers/peticionesMongo");

router.get("/get", peticionesMongo.getUsuarios);

module.exports = router;