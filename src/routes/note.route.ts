import { Router } from 'express';
import NoteController from '../controllers/note.controller';

const router = Router();

router.get('/', NoteController.GetNote);
router.put('/:id', NoteController.UpdateNoteStatus);
router.post('/', NoteController.CreateNote);

export default router;
