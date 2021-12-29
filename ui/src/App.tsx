import {Routes, Route} from "react-router-dom";
import pages from "./pages";
import components from "./components";

function App() {
	return (
		<>
			<components.Nav />

			<Routes>
				<Route path="/" element={<pages.Home />} />
				<Route path="/collection" element={<pages.ViewCollection />}>
					<Route path=":id" element={<pages.ViewCollection />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
