import db from "../../database";
import {Request, Response} from "express";

const getNotes = async (req: Request, res: Response) => {
	try {
		const notes = await db.query(
			`SELECT note.note_id, note.note_content, note.note_date
                      FROM collection_notes
                      INNER JOIN note ON note.note_id = collection_notes.note_id
                      INNER JOIN collection ON collection.collection_id = collection_notes.collection_id
                      AND collection.collection_id=?`,
			[parseInt(req.params.id)]
		);

		res.send(notes);
	} catch (error) {
		console.log(error);
		res.send("error");
	}
};

export default getNotes;
