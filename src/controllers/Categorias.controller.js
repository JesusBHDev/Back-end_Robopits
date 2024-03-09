import Categoria from "../models/Categoria.model.js";

export const obtenerCategorias = async (req, res) => {
  try {
    const Categorias = await Categoria.find();
    res.json(Categorias);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener categorías" });
  }
};

export const crearCategoria = async (req, res) => {
  try {
    const { NameCategoria } = req.body;

    const nuevaCategoria = new Categoria({
      NameCategoria,
    });

    const guardarCategoria = await nuevaCategoria.save();
    res.json(guardarCategoria);
  } catch (error) {
    // Verificar si el error está relacionado con la violación de la restricción unique
    if (error.code === 11000 && error.keyPattern && error.keyPattern.NameCategoria) {
        return res.status(400).json({ error: 'La categoria ya esta registrada.' });
    } else {
      res.status(500).json({ error: "Error al crear la categoría intente mas tarde." });
    }
  }
};

export const obtenerCategoria = async (req, res) =>{
  const categoria = await Categoria.findById(req.params.id);
  if(!categoria) return res.status(404).json({message:"Categoria no encontrada"})
  res.json(categoria)
};

export const eliminarCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndDelete(req.params.id);
    if (!categoria) return res.status(404).json({ message: "Categoría no eliminada" });
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la categoría" });
  }
};

export const actualizarCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!categoria) return res.status(404).json({ message: "Categoría no actualizada" });
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la categoría" });
  }
};