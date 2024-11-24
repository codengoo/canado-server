import { Router } from 'express';
import NoteController from '../controllers/note.controller';

const router = Router();

router.get('/', NoteController.getNote);
router.put('/:id', NoteController.updateNoteStatus);
router.post('/', NoteController.createNote);

export default router;
