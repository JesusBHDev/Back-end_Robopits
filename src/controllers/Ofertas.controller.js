import Oferta from "../models/Ofertas.model.js";
import { uploadFile, deleteFile } from "../../util/uploadFile.js";

export const crearOferta = async (req, res) => {
  const body = req.body;
  const image = req.files?.Imagen;

  // Verifica que haya una imagen
  if (!image || image.length === 0) {
    return res.status(400).json({ message: "Debes enviar una imagen" });
  }

  try {
    // Sube la imagen y obtiene el URL de descarga
    const { downloadURL } = await uploadFile(image[0]);

    // Crear una nueva instancia del modelo Oferta
    const nuevaOferta = new Oferta({
      IdOferta: body.IdOferta,
      Imagen: downloadURL,
      Descripcion: body.Descripcion,
      PrecioOriginal: body.PrecioOriginal,
      PrecioOferta: body.PrecioOferta,
      FechaInicio: body.FechaInicio,
      FechaFin: body.FechaFin,
    });

    // Guarda la oferta en la base de datos
    await nuevaOferta.save();

    // Responde con éxito
    return res.status(200).json({ message: "Oferta creada", oferta: nuevaOferta });
  } catch (error) {
    console.error("Error al crear la oferta:", error);
    return res.status(500).json({ message: "Error al crear la oferta", error: error.message });
  }
};

export const eliminarOferta = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Buscar la oferta por su ID
      const oferta = await Oferta.findById(id);
  
      // Si la oferta no existe, devolver un error
      if (!oferta) {
        return res.status(404).json({ message: "Oferta no encontrada" });
      }
  
      // Eliminar la imagen de la oferta
      if (oferta.Imagen) {
        await deleteFile(oferta.Imagen); // deleteFile recibe la URL o identificador de la imagen a eliminar
      }
  
      // Eliminar la oferta de la base de datos
      await Oferta.findByIdAndDelete(id);
  
      // Responde con éxito
      return res.status(200).json({ message: "Oferta eliminada correctamente" });
    } catch (error) {
      console.error("Error al eliminar la oferta:", error);
      return res.status(500).json({ message: "Error al eliminar la oferta", error: error.message });
    }
  };
  
// Obtener todas las ofertas
export const obtenerOfertas = async (req, res) => {
    try {
      const ofertas = await Oferta.find();
      return res.status(200).json(ofertas);
    } catch (error) {
      console.error("Error al obtener las ofertas:", error);
      return res.status(500).json({ message: "Error al obtener las ofertas" });
    }
  };
  
  // Obtener una oferta por ID
  export const obtenerOferta = async (req, res) => {
    const { id } = req.params;
    
    try {
      const oferta = await Oferta.findById(id);
      
      if (!oferta) {
        return res.status(404).json({ message: "Oferta no encontrada" });
      }
  
      return res.status(200).json(oferta);
    } catch (error) {
      console.error("Error al obtener la oferta:", error);
      return res.status(500).json({ message: "Error al obtener la oferta" });
    }
  };
  