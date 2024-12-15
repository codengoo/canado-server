import { Router } from 'express';
import { FolderController } from '../controllers';
import checkJwt from '../middlewares/checkJwt';

const router = Router();

router.get('/', checkJwt, FolderController.getFolder);
router.post('/', checkJwt, FolderController.createFolder);
router.put('/:id', checkJwt, FolderController.updateFolder);
router.put('/:id/add', checkJwt, FolderController.updateFolder);
router.put('/:id/remove', checkJwt, FolderController.updateFolder);
router.delete('/:id', checkJwt, FolderController.deleteFolder);

export default router;
