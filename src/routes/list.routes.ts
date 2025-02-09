import express from "express";
import {
  createList,
  deleteList,
  getListById,
  getLists,
  updateList,
} from "../controllers/list.controller";

const router = express.Router();

// Get all lists
router.get("/lists", getLists);

// Get a single list by ID
router.get("/lists/:id", getListById);

// Create a new list
router.post("/lists", createList);

// Update a list by ID
router.put("/lists/:id", updateList);

// Delete a list by ID
router.delete("/lists/:id", deleteList);

export default router;
