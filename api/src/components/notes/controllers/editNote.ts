import db from "../../database";
import {Request, Response} from "express";

const editNote = async (req: Request, res: Response) => {
	const title = req.body.title;
	const content = req.body.content;
	const id = parseInt(req.body.id);

	try {
		await db.query(
			"UPDATE note SET note_title=?, note_content=? WHERE note_id=?;",
			[title, content, id]
		);

		res.status(200).send({
			message: "successfully edited note",
		});
	} catch (error) {
		res.status(500).send({
			message: "an error occured while editing note",
		});
	}
};

export default editNote;
