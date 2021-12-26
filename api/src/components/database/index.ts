import mariadb from "mariadb";

const pool = mariadb.createPool({
	user: process.env.DB_USER,
	password: process.env.DB_PWD,
	database: process.env.DB_DB,
	port: parseInt(process.env.DB_PORT as string),
});

export default {
	query: (text: string, params?: Array<string | number>) =>
		pool.query(text, params),
	conn: pool.getConnection(),
};
