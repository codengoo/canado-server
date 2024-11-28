import { Request, Response } from 'express';
import { ENoteState, IUser } from '../data';
import NoteModel from '../models/note.model';
import { handleExceptions, ResponseData } from '../utils';
import { ValidationError } from '../utils/error';
import {
  isInEnum,
  isNullOrEmpty,
  isObjectId,
} from '../validations/base.validation';

export default class NoteController {
  static async getNote(req: Request, res: Response<ResponseData>) {
    const { status, limit, offset } = req.query;

    await handleExceptions(res, async () => {
      if (status && !isInEnum(status, ENoteState))
        throw new ValidationError('Invalid status param');

      if (limit && isNaN(Number(limit)))
        throw new ValidationError('Invalid limit param');

      if (limit && isNaN(Number(offset)))
        throw new ValidationError('Invalid offset param');

      const notes = await NoteModel.getNotes(
        status as ENoteState,
        offset && Number(offset),
        limit && Number(limit),
      );
      res.json({ message: 'Ok', data: notes });
    });
  }

  static async createNote(req: Request, res: Response<ResponseData>) {
    const { title, content } = req.body as { title: string; content: string };
    const { id } = req.user as IUser;

    await handleExceptions(res, async () => {
      if (isNullOrEmpty(title) || isNullOrEmpty(content)) {
        throw new ValidationError('title or content is not null or empty');
      }

      const note = await NoteModel.createNote(title, content, id);
      res.json({ message: 'Created', data: note });
    });
  }

  static async updateNoteStatus(req: Request, res: Response<ResponseData>) {
    const { status } = req.body as { status: ENoteState };
    const { id } = req.params;

    await handleExceptions(res, async () => {
      if (!isObjectId(id)) {
        throw new ValidationError('id is invalid or not provided');
      }

      if (!isInEnum(status, ENoteState)) {
        throw new ValidationError('status is invalid or not provided');
      }

      const note = await NoteModel.updateNoteStatus(id, status);
      res.json({ message: 'Updated', data: note });
    });
  }
}
