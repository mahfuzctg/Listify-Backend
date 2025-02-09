import { Request, Response } from "express";
import ListModel from "../models/list.model";

// Create a new list
export const createList = async (req: Request, res: Response) => {
  try {
    const { title, desc, date, items, image, link } = req.body;

    // Validate required fields
    if (!title || !desc || !date) {
      return res
        .status(400)
        .json({ message: "Title, description, and date are required." });
    }

    const newList = new ListModel({ title, desc, date, items, image, link });
    await newList.save();
    res.status(201).json(newList);
  } catch (err) {
    res.status(500).json({ message: "Error creating list", error: err });
  }
};

// Get all lists
export const getLists = async (req: Request, res: Response) => {
  try {
    const lists = await ListModel.find();
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: "Error fetching lists", error: err });
  }
};

// Get a list by ID
export const getListById = async (req: Request, res: Response) => {
  try {
    const list = await ListModel.findById(req.params.id);
    if (!list) return res.status(404).json({ message: "List not found" });
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ message: "Error fetching list", error: err });
  }
};

// Update a list by ID
export const updateList = async (req: Request, res: Response) => {
  try {
    const { title, desc, date, items, image, link } = req.body;
    const updatedList = await ListModel.findByIdAndUpdate(
      req.params.id,
      { title, desc, date, items, image, link },
      { new: true }
    );
    if (!updatedList)
      return res.status(404).json({ message: "List not found" });
    res.status(200).json(updatedList);
  } catch (err) {
    res.status(500).json({ message: "Error updating list", error: err });
  }
};

// Delete a list by ID
export const deleteList = async (req: Request, res: Response) => {
  try {
    const deletedList = await ListModel.findByIdAndDelete(req.params.id);
    if (!deletedList)
      return res.status(404).json({ message: "List not found" });
    res.status(200).json({ message: "List deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting list", error: err });
  }
};
