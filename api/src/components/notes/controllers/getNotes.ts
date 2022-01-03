import db from "../../database";
import {Request, Response} from "express";

const getNotes = async (req: Request, res: Response) => {
	try {
		const notes = await db.query(
			`SELECT note.note_id id,note.note_title title, note.note_content content, note.note_date date
                      FROM collection_notes 
                      INNER JOIN note ON note.note_id = collection_notes.note_id
                      INNER JOIN collection ON collection.collection_id = collection_notes.collection_id
                      AND collection.collection_id=?
					  ORDER BY date DESC`,
			[parseInt(req.params.id)]
		);

		res.send(notes);
	} catch (error) {
		res.status(500).send(error);
	}
};

export default getNotes;
