import CORS from "cors";

const options: CORS.CorsOptions = {
	origin: [
		"http://localho.st:3000",
		"http://localhost:3000",
		"https://fhatul.github.io",
	],
};

const cors = CORS(options);

export default cors;
