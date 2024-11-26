import { Router } from 'express';
import DevController from '../controllers/dev.controller';

const router = Router();

router.get('/', DevController.forceCrash);

export default router;
