import db from "../../database";
import {Request, Response} from "express";

const create = async (req: Request, res: Response) => {
	if (req.body.name) {
		const name: string = req.body.name as string;
		try {
			await db.query(
				"INSERT INTO collection(collection_name) VALUES($1)",
				[name]
			);

			res.status(201).send({
				message: "collection created successfully",
			});
		} catch (error) {
			res.status(500).send({
				message: "error occured in creating collection",
			});
		}
	}
};

export default create;
