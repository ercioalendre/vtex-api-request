import { Router } from "express";
import MainController from "src/controllers/Main.controller";
import checkFormData from "./middlewares/checkFormData";

const router = Router();

router.get("/", MainController.index);

router.post("/", checkFormData, MainController.generateReport);

router.get("*", (req, res) => {
  res.status(404).render("main", {
    page: "page-not-found",
  });
});

export default router;
