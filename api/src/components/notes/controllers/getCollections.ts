import db from "../../database";
import {Request, Response} from "express";

async function getCollections(req: Request, res: Response) {
	try {
		const collections = await db.query("SELECT * FROM collection");

		res.status(200).send(collections.rows);
	} catch (error) {
		res.status(500).send({
			error: "internal error occured",
		});
	}
}

export default getCollections;
