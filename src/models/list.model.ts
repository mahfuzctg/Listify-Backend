import { Document, Schema, model } from "mongoose";

interface ListItem {
  name: string;
  completed: boolean;
}

interface List extends Document {
  title: string;
  desc: string;
  date: Date;
  items: ListItem[];
  image?: string; // Optional field for the image URL
  link?: string; // Optional field for an external link
}

const listSchema = new Schema<List>({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  date: { type: Date, required: true },
  items: [
    {
      name: { type: String, required: true },
      completed: { type: Boolean, default: false },
    },
  ],
  image: { type: String, required: false }, // Optional field for the image
  link: { type: String, required: false }, // Optional field for the link
});

const ListModel = model<List>("List", listSchema);

export default ListModel;
