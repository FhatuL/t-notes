import db from "../../database";
import {Request, Response} from "express";

const deleteNote = async (req: Request, res: Response) => {
	const noteId = parseInt(req.params.noteId);

	try {
		await db.query("DELETE FROM note WHERE note_id=?;", [noteId]);
		res.status(200).send({
			message: "note deleted successfully",
		});
	} catch (error) {
		res.status(500).send({
			message: "an error occured while deleting note.",
		});
	}
};

export default deleteNote;
