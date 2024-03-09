import Producto from "../models/Producto.model.js";

export const obtenerProductos = async (req, res) => {
    try {
      const Productos = await Producto.find();
      res.json(Productos);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener categorías" });
    }
  };
  
  export const crearProducto = async (req, res) => {
    try {
      const { IdProducto, Imagen, NameProducto, Precio, Categoria, 
        Existencias, Descripcion, Caracteristicas, Incluye } = req.body;

      if (!IdProducto || !NameProducto || !Precio || !Categoria || !Existencias) {
        return res.status(400).json({ error: "Todos los campos obligatorios deben ser proporcionados." });
      }

      const newProducto = new Producto({
        IdProducto, Imagen, NameProducto, Precio, Categoria, 
         Existencias, Descripcion, Caracteristicas, Incluye
      });
  
      const saveProducto = await newProducto.save();
  
      res.status(201).json(saveProducto);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el producto. Intente nuevamente más tarde." });
    }
  };

  export const obtenerProducto = async (req, res) => {
    try {
      const producto = await Producto.findById(req.params.id);
      if (!producto) return res.status(404).json({ message: "Producto no encontrado" });
      res.json(producto);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el producto" });
    }
  };
  
  export const eliminarProducto = async (req, res) => {
    try {
      const producto = await Producto.findByIdAndDelete(req.params.id);
      if (!producto) return res.status(404).json({ message: "Producto no eliminado" });
      res.json(producto);
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el producto" });
    }
  };
  
  export const actualizarProducto = async (req, res) => {
    try {
      const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
      if (!producto) return res.status(404).json({ message: "Producto no actualizado" });
      res.json(producto);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el producto" });
    }
  };