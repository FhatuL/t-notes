import style from "./nav.module.scss";
import {Link} from "react-router-dom";
import components from "./components";
const Nav = () => {
	return (
		<nav className={style.nav}>
			<Link to="/">T-NOTES</Link>
			<components.ToggleDark />
		</nav>
	);
};

export default Nav;
