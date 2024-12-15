import database from '../configs/database';
import { ENoteStatus } from '../data';
import {
  ICreateNotePayload,
  IDeleteNotePayload,
  IUpdateNotePayload,
} from '../types/note';

export default class NoteModel {
  static async createNote(payload: ICreateNotePayload & { userId: string }) {
    const { content, folderId, title, userId, priority } = payload;
    const note = await database.note.create({
      data: {
        title,
        content,
        userId,
        folderId,
        priority,
      },
    });

    return note;
  }

  static async getNotes(
    status?: ENoteStatus,
    offset: number = 0,
    limit: number = 100,
  ) {
    const notes = await database.note.findMany({
      where: {
        status: status,
      },
      skip: offset,
      take: limit,
    });

    return notes;
  }

  static async updateNote(id: string, payload: IUpdateNotePayload) {
    const note = await database.note.update({
      where: {
        id,
      },
      data: {
        title: payload.title,
        content: payload.content,
        priority: payload.priority,
        folderId: payload.folderId,
        status: payload.status,
      },
    });

    return note;
  }

  static async deleteNote(id: string, payload: IDeleteNotePayload) {
    const note = await database.note.delete({
      where: {
        id,
        userId: payload.userId,
      },
    });

    return note;
  }
}
