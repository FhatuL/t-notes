import db from "../../database";
import {Request, Response} from "express";

const create = async (req: Request, res: Response) => {
	if (req.body.name) {
		const name: string = req.body.name as string;

		try {
			await db.query(
				"INSERT INTO collection(collection_name) VALUES(?)",
				[name]
			);

			res.status(200).send({
				message: "collection created successfully",
			});
		} catch (error) {
			res.status(500).send({
				message: "error occured in creating collection",
			});
		}
	} else {
		res.status(401).send({message: "hmmm"});
	}
};

export default create;
