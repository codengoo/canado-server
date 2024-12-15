import { Router } from 'express';
import { NoteController } from '../controllers';
import checkJwt from '../middlewares/checkJwt';

const router = Router();

router.get('/', checkJwt, NoteController.getNote);
router.post('/', checkJwt, NoteController.createNote);
router.put('/:id', checkJwt, NoteController.updateNote);
router.delete('/:id', checkJwt, NoteController.deleteNote);

export default router;
