import Producto from "../models/Producto.model.js";
import Categoria from "../models/Categoria.model.js";
import { uploadFile, deleteFile } from "../../util/uploadFile.js";

export const obtenerProductos = async (req, res) => {
  try {
    const Productos = await Producto.find();
    res.json(Productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener categorías" });
  }
};

export const obtenerProductosPorCategoria = async (req, res) => {
  try {
      const { categoriaId } = req.params; // Obtén el ID de la categoría desde el parámetro de la URL
      const categoria = await Categoria.findById(categoriaId); // Busca la categoría por su ID

      if (!categoria) {
          return res.status(404).json({ error: "Categoría no encontrada" });
      }

      const productos = await Producto.find({ Categoria: categoria.NameCategoria }); // Filtra productos por el nombre de la categoría
      res.json(productos);
  } catch (error) {
      console.error("Error al obtener productos por categoría:", error);
      res.status(500).json({ error: "Error interno al obtener productos" });
  }
};

export const crearProducto = async (req, res) => {
  const body = req.body;
  const image = req.files?.Imagen; // Usa optional chaining para evitar errores si req.files no está definido

  // Verifica que haya una imagen
  if (!image || image.length === 0) {
    return res.status(400).json({ message: "Debes enviar una imagen" });
  }

  try {
    // Sube la imagen y obtiene la URL de descarga
    const { downloadURL } = await uploadFile(image[0]);

    // Crear una nueva instancia del modelo Producto
    const nuevoproducto = new Producto({
      IdProducto: body.IdProducto, // Este campo debe generarse automáticamente con el plugin auto-increment si se configura correctamente
      Imagen: downloadURL,
      NameProducto: body.NameProducto,
      Precio: body.Precio,
      Categoria: body.Categoria,
      Existencias: body.Existencias,
      Descripcion: body.Descripcion,
      Caracteristicas: body.Caracteristicas,
      Incluye: body.Incluye,
    });

    // Guarda el producto en la base de datos
    await nuevoproducto.save();

    // Responde con éxito
    return res.status(200).json({ message: "Producto creado", producto: nuevoproducto });
  } catch (error) {
    console.error("Error al guardar el producto:", error);
    return res.status(500).json({ message: "Error al crear el producto", error: error.message });
  }
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
    const productId = req.params.id;
    const producto = await Producto.findById(productId);

    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Eliminar la imagen del producto si existe
    if (producto.Imagen) {
      await deleteFile(producto.Imagen);
    }

    // Eliminar el producto de la base de datos
    await Producto.findByIdAndDelete(productId);

    res.json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    const productId = req.params.id;
    const body = req.body;
    const image = req.files ? req.files.Imagen : null;

    if (!productId) {
      return res.status(400).json({ message: "Debe proporcionar un ID de producto" });
    }

    let updatedFields = {
      ...body
    };

    if (image && image.length > 0) {
      // Subir la nueva imagen y obtener su URL
      const { downloadURL, ref } = await uploadFile(image[0]);

      // Eliminar la imagen anterior si existe
      const productoExistente = await Producto.findById(productId);
      if (productoExistente && productoExistente.Imagen) {
        await deleteFile(productoExistente.Imagen);
      }

      updatedFields.Imagen = downloadURL;
    }

    const producto = await Producto.findByIdAndUpdate(productId, updatedFields, {
      new: true,
    });

    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};
