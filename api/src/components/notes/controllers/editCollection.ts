import db from "../../database";
import {Request, Response} from "express";

const editCollection = async (req: Request, res: Response) => {
	const title = req.body.title;
	const id = parseInt(req.params.id);

	try {
		await db.query(
			"UPDATE collection SET collection_name=? WHERE collection_id=?",
			[title, id]
		);

		res.status(200).send({
			message: "successfully edited collection",
		});
	} catch (error) {
		res.status(500).send({
			message: "an error occured editing collection",
		});
	}
};

export default editCollection;
