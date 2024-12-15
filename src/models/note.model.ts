import database from '../configs/database';
import {
  ICreateNotePayload,
  IDeleteNotePayload,
  IGetNotePayload,
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

  static async getNotes(payload: IGetNotePayload & { userId: string }) {
    const notes = await database.note.findMany({
      where: {
        status: payload.status,
        userId: payload.userId,
      },
      skip: payload.offset,
      take: payload.limit,
    });

    return notes;
  }

  static async updateNote(
    id: string,
    payload: IUpdateNotePayload & { userId: string },
  ) {
    const note = await database.note.update({
      where: {
        id,
        userId: payload.userId,
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
