import { Express } from 'express';
import AuthRouter from './auth.route';
import DevRouter from './dev.route';
import FolderRouter from './folder.route';
import NoteRouter from './note.route';

export function applyRoute(app: Express) {
  app.use('/note', NoteRouter);
  app.use('/folder', FolderRouter);
  app.use('/auth', AuthRouter);
  app.use('/dev', DevRouter);
}
