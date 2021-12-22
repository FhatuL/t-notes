import {Pool} from "pg";

const pool = new Pool();

pool.on("error", (err, client) => {
	console.error("Error on idle client.", err);
	process.exit(-1);
});

export default {
	query: (text: string, params?: Array<string | number>) =>
		pool.query(text, params),
};
