import db from "../../database";
import {Request, Response} from "express";

async function getCollections(req: Request, res: Response) {
	try {
		const collections = await db.query(
			"SELECT collection_id id, collection_name title FROM collection"
		);
		console.log(collections);
		// res.status(200).send(collections);
		res.json(collections).status(200);
	} catch (error) {
		res.status(500).send({
			message: "internal server error",
		});
	}
}

export default getCollections;
