import { Request, Response } from "express";
import List from "../models/list.model";

export const getLists = async (req: Request, res: Response) => {
  try {
    const lists = await List.find();
    res.json(lists);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const createList = async (req: Request, res: Response) => {
  try {
    const { title, items } = req.body;
    const newList = new List({ title, items });
    await newList.save();
    res.status(201).json(newList);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
