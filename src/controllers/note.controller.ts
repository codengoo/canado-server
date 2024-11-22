import { Request, Response } from 'express';
import NoteModel from '../models/note.model';
import { handleExceptions } from '../utils';
import ValidationError from '../utils/valError';
import { isNullOrEmpty } from '../validations/base.validation';

export default class NoteController {
  static async GetNote(req: Request, res: Response) {
    await handleExceptions(res, async () => {
      const notes = await NoteModel.getNotes();
      res.json({ message: 'Ok', data: notes });
    });
  }

  static async CreateNote(req: Request, res: Response) {
    const { title, content } = req.body as { title: string; content: string };

    await handleExceptions(res, async () => {
      if (isNullOrEmpty(title) || isNullOrEmpty(content)) {
        throw new ValidationError('title or content is not null or empty');
      }

      const note = await NoteModel.createNote(title, content);
      res.json({ message: 'Created', data: note });
    });
  }

  static async UpdateNoteStatus(req: Request, res: Response) {
    const { status } = req.body as { status: any };
    const { id } = req.params;

    await handleExceptions(res, async () => {
      if (isNullOrEmpty(id)) {
        throw new ValidationError('id is not provided');
      }

      if (isNullOrEmpty(status)) {
        throw new ValidationError('status must be provided');
      }

      const note = await NoteModel.updateNoteStatus(id, status);
      res.json({ message: 'Updated', data: note });
    });
  }
}
