import { Request, Response } from 'express';
import NoteModel from '../models/note.model';

export default class NoteController {
  static async GetNote(req: Request, res: Response) {
    const notes = await NoteModel.getNotes();
    res.json({ message: 'Ok', data: notes });
  }

  static async CreateNote(req: Request, res: Response) {
    const body = req.body as {title: string, content: string}

    const note = await NoteModel.createNote(body.title, body.content);
    res.json({ message: 'Created', data: note });
  }
}
