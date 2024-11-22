import { Request, Response } from 'express';
import NoteModel from '../models/note.model';
import { isNullOrEmpty } from '../validations/base.validation';

export default class NoteController {
  static async GetNote(req: Request, res: Response) {
    const notes = await NoteModel.getNotes();
    res.json({ message: 'Ok', data: notes });
  }

  static async CreateNote(req: Request, res: Response) {
    const { title, content } = req.body as { title: string; content: string };

    if (isNullOrEmpty(title) || isNullOrEmpty(content)) {
      res.json({
        message: 'title or content is not null or empty',
        data: null,
      });

      return;
    }

    const note = await NoteModel.createNote(title, content);
    res.json({ message: 'Created', data: note });
  }
}
