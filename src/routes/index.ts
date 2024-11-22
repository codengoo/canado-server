import { Express } from "express";
import NoteRouter from "./note.route";

export function applyRoute(app: Express) {
  app.use("/note", NoteRouter);
}
