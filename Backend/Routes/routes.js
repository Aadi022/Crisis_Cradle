const express= require("express");
const router= express.Router();
router.use(express.json());
const PayRouter= require("../Controllers/payment.js");
const UserRouter= require("../Controllers/user.js");

router.use("/pay",PayRouter);
router.use("/user",UserRouter);


module.exports= router;