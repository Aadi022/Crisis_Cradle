const express= require("express");
const router= express.Router();
router.use(express.json());
const PayRouter= require("../Controllers/payment.js");

router.use("/pay",PayRouter);


module.exports= router;