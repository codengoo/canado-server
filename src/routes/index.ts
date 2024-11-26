import { Express } from 'express';
import AuthRouter from './auth.route';
import DevRouter from './dev.route';
import NoteRouter from './note.route';

export function applyRoute(app: Express) {
  app.use('/note', NoteRouter);
  app.use('/auth', AuthRouter);
  app.use('/dev', DevRouter);
}
