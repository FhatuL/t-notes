import {Router} from "express";
import controllers from "./controllers";

const notes = Router();

notes.get("/collections", controllers.getCollections);
notes.post("/collections", controllers.createCollection);
notes.get("/collections/:id(\\d+)", controllers.getNotes);
notes.put("/collections/:id(\\d+)", controllers.editCollection);
notes.post("/collections/:id(\\d+)", controllers.createNote);
notes.delete("/collections/:id(\\d+)", controllers.deleteCollection);
notes.put("/collections/:id(\\d+)/:noteId(\\d+)", controllers.editNote);
notes.delete("/collections/:id(\\d+)/:noteId(\\d+)", controllers.deleteNote);

export default notes;
