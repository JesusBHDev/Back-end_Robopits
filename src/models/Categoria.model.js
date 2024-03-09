import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema(
  {
    NameCategoria: {
      type: String,
      require: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Categoria", categoriaSchema);
