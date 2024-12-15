import { Request, Response } from 'express';
import { ENotePriority, ENoteStatus, IUser } from '../data';
import NoteModel from '../models/note.model';
import { ICreateNotePayload, IUpdateNotePayload } from '../types/note';
import { handleExceptions, ResponseData } from '../utils';
import {
  isInEnum,
  isNumber,
  isObjectId,
  isUUIDv4,
  isValidString,
} from '../validations/base.validation';

export default class NoteController {
  static async getNote(req: Request, res: Response<ResponseData>) {
    const { status, limit, offset } = req.query;

    await handleExceptions(res, async () => {
      isInEnum(status, ENoteStatus, { valueName: 'status', nullable: true });
      isNumber(limit, { valueName: 'limit', nullable: true });
      isNumber(offset, { valueName: 'offset', nullable: true });

      const notes = await NoteModel.getNotes(
        status as ENoteStatus,
        offset && Number(offset),
        limit && Number(limit),
      );
      res.json({ message: 'Ok', data: notes });
    });
  }

  static async createNote(req: Request, res: Response<ResponseData>) {
    const { title, content, ref, folderId, priority } =
      req.body as ICreateNotePayload;
    const { id: userId } = req.user as IUser;

    await handleExceptions(res, async () => {
      isValidString(title, { valueName: 'title' });
      isValidString(content, { valueName: 'content' });
      isUUIDv4(ref, { valueName: 'ref' });
      isObjectId(folderId, { valueName: 'folderId', nullable: true });
      isInEnum(priority, ENotePriority, {
        valueName: 'priority',
        nullable: true,
      });

      const note = await NoteModel.createNote({ ...req.body, userId });
      res.json({ message: 'Created', data: { ...note, ref } });
    });
  }

  static async updateNote(req: Request, res: Response<ResponseData>) {
    const { content, folderId, priority, status, title } =
      req.body as IUpdateNotePayload;
    const { id } = req.params;

    await handleExceptions(res, async () => {
      isValidString(content, { valueName: 'content', nullable: true });
      isObjectId(folderId, { valueName: 'folderId', nullable: true });
      isInEnum(priority, ENotePriority, {
        valueName: 'priority',
        nullable: true,
      });
      isValidString(title, { valueName: 'title', nullable: true });
      isInEnum(status, ENoteStatus, { valueName: 'status', nullable: true });
      isObjectId(id, { valueName: 'id', nullable: true });

      const note = await NoteModel.updateNote(id, req.body);
      res.json({ message: 'Updated', data: note });
    });
  }

  static async deleteNote(req: Request, res: Response<ResponseData>) {
    const { id } = req.params;
    const { id: userId } = req.user as IUser;

    await handleExceptions(res, async () => {
      isObjectId(id, { valueName: 'id', nullable: true });
      await NoteModel.deleteNote(id, { userId });
      res.json({ message: 'Deleted' });
    });
  }
}
