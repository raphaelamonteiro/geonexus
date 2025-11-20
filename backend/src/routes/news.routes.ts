import { Router } from 'express';
import { newsController } from '../controllers/news.controller';

const router = Router();

router.get('/', newsController.getGeneralNews);
router.get('/country/:countryCode', newsController.getNewsByCountry);
router.get('/category/:category', newsController.getNewsByCategory);

export default router;