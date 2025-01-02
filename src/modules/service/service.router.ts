import express from "express";
import { serviceProviderController } from "./service.controller";
import { protect } from "../../middlewares/authMiddleware";


const router = express.Router();

router.post("/", protect, serviceProviderController.createServiceProvider);
router.get("/", serviceProviderController.getAllServiceProviders);
router.get("/:id", serviceProviderController.getServiceProviderById);
router.patch("/:id", protect ,  serviceProviderController.updateServiceProvider);
router.delete("/:id", protect , serviceProviderController.deleteServiceProvider);

export const serviceProviderRoute = router;
