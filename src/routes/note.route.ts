import { Router } from 'express';
import NoteController from '../controllers/note.controller';
import checkJwt from '../middlewares/checkJwt';

const router = Router();

router.get('/', checkJwt, NoteController.getNote);
router.put('/:id', checkJwt, NoteController.updateNoteStatus);
router.post('/', checkJwt, NoteController.createNote);

export default router;
