import database from '../configs/database';

export default class NoteModel {
  static async createNote(title: string, content: string) {
    const note = await database.note.create({
      data: {
        title,
        content,
      }
    });

    return note;
  }

  static async getNotes() {
    const notes = await database.note.findMany();

    return notes;
  }
}
