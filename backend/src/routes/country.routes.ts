import { Router } from 'express';
import { countryController } from '../controllers/country.controller';

const router = Router();

router.get('/', countryController.getAll);
router.get('/:id', countryController.getById);
router.post('/', countryController.create);
router.put('/:id', countryController.update);
router.delete('/:id', countryController.delete);

export default router;