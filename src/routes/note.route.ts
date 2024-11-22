import { Router } from "express";
import NoteController from "../controllers/note.controller";

const router = Router();

router.get("/", NoteController.GetNote);
router.put("/");
router.post("/", NoteController.CreateNote);

export default router;