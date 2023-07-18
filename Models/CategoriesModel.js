import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    img: {
      type: String
  },
  },
  {
    timestamp: true,
  }
);

const Categories = mongoose.model("Categories", categorySchema);

export default Categories;
