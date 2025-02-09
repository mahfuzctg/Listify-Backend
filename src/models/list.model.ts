import { Document, Schema, model } from "mongoose";

interface ListItem {
  name: string;
  completed: boolean;
}

interface List extends Document {
  title: string;
  desc: string;
  date: string; // Store date as a string in YYYY-MM-DD format
  items: ListItem[];
  image?: string; // Optional field for the image URL
  link?: string; // Optional field for an external link
}

const listSchema = new Schema<List>({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  date: { type: String, required: true }, // Ensure date is stored as a string in 'YYYY-MM-DD'
  items: [
    {
      name: { type: String, required: true },
      completed: { type: Boolean, default: false },
    },
  ],
  image: { type: String, required: false }, // Optional field for the image
  link: { type: String, required: false }, // Optional field for the link
});

// Pre-save hook to format the date before saving
listSchema.pre("save", function (next) {
  if (this.date) {
    const formattedDate = new Date(this.date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const day = String(formattedDate.getDate()).padStart(2, "0");
    this.date = `${year}-${month}-${day}`;
  }
  next();
});

const ListModel = model<List>("List", listSchema);

export default ListModel;
