import axios from "axios";

const apiUrl = "http://localhost:5000";

const get = (endpoint: string) => axios.get(`${apiUrl}${endpoint}`);
const post = (endpoint: string, options?: any) =>
	axios.post(`${apiUrl}${endpoint}`, options);

const api = {get, post};

export default api;
