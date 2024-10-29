const express= require("express");
const router= express.Router();
router.use(express.json());
const PayRouter= require("../Controllers/payment.js");
const UserRouter= require("../Controllers/report.js");
const AdminRouter= require("../Controllers/admin.js");
const DisasterinfoRouter= require("../Controllers/disaster.js");
const ResourcesRouter= require("../Controllers/resources.js");

router.use("/pay",PayRouter);
router.use("/user",UserRouter);
router.use("/admin",AdminRouter);
router.use("/disaster",DisasterinfoRouter);
router.use("/resource",ResourcesRouter);

module.exports= router;