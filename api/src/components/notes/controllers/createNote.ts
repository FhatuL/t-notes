import db from "../../database";
import {Request, Response} from "express";

interface LastId {
	id: number;
}
const createNote = async (req: Request, res: Response) => {
	const col_id = parseInt(req.params.id);
	const content = req.body.content;
	const title = req.body.title;

	db.conn()
		.then(async (conn) => {
			try {
				await conn.beginTransaction();
				await conn.query(
					"INSERT INTO note(note_title,note_content) VALUES(?,?);",
					[title, content]
				);

				const note_id: LastId = (
					(await conn.query(
						"SELECT LAST_INSERT_ID() id;"
					)) as Array<LastId>
				)[0];

				await conn.query(
					"INSERT INTO collection_notes(note_id, collection_id) VALUES(?,?);",
					[note_id.id, col_id]
				);

				await conn.commit();

				res.send({
					message: "note created successfully",
				});
			} catch (error) {
				await conn.rollback();
				res.status(500).send({
					message: "An error occured while adding note to collection",
				});
			} finally {
				conn.release();
			}
		})
		.catch((err) => {
			res.status(500).send(err);
		});
};

export default createNote;
