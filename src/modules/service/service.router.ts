import express from "express";
import { serviceProviderController } from "./service.controller";


const router = express.Router();

router.post("/", serviceProviderController.createServiceProvider);
router.get("/:id", serviceProviderController.getServiceProviderById);
router.put("/:id", serviceProviderController.updateServiceProvider);
router.delete("/:id", serviceProviderController.deleteServiceProvider);

export default router;
