import { Router } from "express";
import { ShopController } from "./shop.controller";

const router = Router();

router.post("/", ShopController.createShop);
router.get("/:id", ShopController.getShopById);
router.patch("/:id", ShopController.updateShop);
router.delete("/:id", ShopController.deleteShop);
router.get("/", ShopController.getAllShops);

export default router;
