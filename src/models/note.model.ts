import database from '../utils/database';

export default class NoteModel {
  static async createNote(title: string, content: string) {
    const note = await database.note.create({
      data: {
        title,
        content,
      },
      select: {
        id: true,
      },
    });

    return note;
  }

  static async getNotes() {
    const notes = await database.note.findMany({
      select: {
        id: true,
        title: true,
        content: true,
      },
    });

    return notes;
  }
}
