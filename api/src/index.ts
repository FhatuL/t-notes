import express, {Request, Response, NextFunction} from "express";
require("dotenv").config();
import components from "./components";
import middleware from "./middleware";

const app = express();
app.disable("x-powered-by");
const PORT = 5000;

app.use(middleware.cors);
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/notes", components.notes);

if (process.env.NODE_ENV === "development") {
	app.listen(PORT, () => {
		console.log(`using port ${PORT}`);
	});
} else {
	app.listen();
}
