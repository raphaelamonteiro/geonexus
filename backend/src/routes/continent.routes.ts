import { Router } from 'express';
import { continentController } from '../controllers/continent.controller';

const router = Router();

router.get('/', continentController.getAll);
router.get('/:id', continentController.getById);
router.post('/', continentController.create);
router.put('/:id', continentController.update);
router.delete('/:id', continentController.delete);

export default router;