import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
    const tasks = await Task.find() 
    res.json(tasks)
};


export const createTask = async (req, res) => {
    const {IdProducto, Imagen, CodigoBarras, NombreProducto,
        PrecioMenudeo, PrecioMayoreo, CantidadMayoreo, Existencias,
        DescripcionProducto, Categoria} = req.body
        
    const newTask = new Task({
        IdProducto, Imagen,
        CodigoBarras,
        NombreProducto,
        PrecioMenudeo,
        PrecioMayoreo,
        CantidadMayoreo,
        Existencias,
        DescripcionProducto, 
        Categoria
    })
    const saveTask = await newTask.save()
    res.json(saveTask)
};

export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id);
    if(!task) return res.status(404).json({message: "producto no encontrado"})
    res.json(task)
};

export const deleteTasks  = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id)
    if(!task) return res.status(404).json({message: "producto no eliminado"})
    res.json(task)
};

export const updateTasks = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    if(!task) return res.status(404).json({message: "producto no actualizado"})
    res.json(task)
};