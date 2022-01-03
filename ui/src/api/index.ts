import axios from "axios";

const api = axios.create({
	baseURL: "https://tnotes.iqmakesmusic.com",
});

export default api;
