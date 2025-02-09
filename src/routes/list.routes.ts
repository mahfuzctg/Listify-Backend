import express from "express";
import { createList, getLists } from "../controllers/list.controller";

const router = express.Router();

router.get("/", getLists);
router.post("/", createList);

export default router;
