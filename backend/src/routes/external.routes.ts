import { Router } from 'express';
import { externalController } from '../controllers/external.controller';

const router = Router();

router.get('/countries', externalController.getCountriesFromAPI);
router.post('/countries/import', externalController.importCountry);
router.get('/regions', externalController.getRegions);

export default router;