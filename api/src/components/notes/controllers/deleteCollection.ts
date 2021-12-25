import db from "../../database";
import {Request, Response} from "express";

const deleteCollection = async (req: Request, res: Response) => {
	const id = parseInt(req.params.id);

	try {
		await db.query("DELETE FROM collection WHERE collection_id=?", [id]);
		res.status(200).send({
			message: "collection deleted successfully",
		});
	} catch (error) {
		res.status(500).send({
			message: "an error occured while deleting collection",
		});
	}
};

export default deleteCollection;
