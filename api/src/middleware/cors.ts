import CORS from "cors";

const options: CORS.CorsOptions = {
	origin: ["http://localhost:3000"],
};

const cors = CORS(options);

export default cors;
