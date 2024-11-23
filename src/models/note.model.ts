import database from '../configs/database';
import { ENoteState } from '../data';

export default class NoteModel {
  static async createNote(title: string, content: string) {
    const note = await database.note.create({
      data: {
        title,
        content,
      },
    });

    return note;
  }

  static async getNotes() {
    const notes = await database.note.findMany();

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
