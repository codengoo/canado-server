import database from '../configs/database';
import { ENoteState } from '../data';

export default class NoteModel {
  static async createNote(title: string, content: string, id: string) {
    const note = await database.note.create({
      data: {
        title,
        content,
        userId: id,
      },
    });

    return note;
  }

  static async getNotes(
    state?: ENoteState,
    offset: number = 0,
    limit: number = 100,
  ) {
    const notes = await database.note.findMany({
      where: {
        state: state ? (state as any).toUpperCase() : undefined,
      },
      skip: offset,
      take: limit,
    });

    return notes;
  }

  static async updateNoteStatus(id: string, status: ENoteState) {
    const note = await database.note.update({
      where: {
        id,
      },
      data: {
        state: (status as any).toUpperCase(),
      },
    });

    return note;
  }
}
