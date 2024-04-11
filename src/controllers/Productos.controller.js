import Producto from "../models/Producto.model.js";
import { upload } from "../config/multer.js";
import { uploadFile } from "../../util/uploadFile.js";

export const obtenerProductos = async (req, res) => {
  try {
    const Productos = await Producto.find();
    res.json(Productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener categorías" });
  }
};

export const crearProducto = async (req, res) => {
  const body = req.body;
  const image = req.files.Imagen

  if (image && image.length > 0) {
    const { downloadURL } = await uploadFile(image[0]);

    const nuevoproducto = await new Producto({
      IdProducto: body.IdProducto,
      Imagen: downloadURL,
      NameProducto: body.NameProducto,
      Precio: body.Precio,
      Categoria: body.Categoria,
      Existencias: body.Existencias,
      Descripcion: body.Descripcion,
      Caracteristicas: body.Caracteristicas,
      Incluye: body.Incluye,
    }).save();

    return res.status(200).json({ nuevoproducto });
  }
  return res.status(400).json({ message: "debes enviar una imagen" });
};

export const obtenerProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto)
      return res.status(404).json({ message: "Producto no eliminado" });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!producto)
      return res.status(404).json({ message: "Producto no actualizado" });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};
