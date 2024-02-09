import { Router} from "express";
import { authRequire } from "../middlewares/validateToken.js";
import { getTasks,
        getTask,
        createTask,
       deleteTasks,
        updateTasks
    } from "../controllers/tasks.controller.js";

const router = Router()

router.get('/tasks', getTasks);
router.get('/tasks/id', getTask);
router.post('/tasks', createTask);
router.delete('/tasks', deleteTasks);
router.put('/tasks', updateTasks);


export  default router