import style from "./nav.module.scss";
import {Link} from "react-router-dom";
const Nav = () => {
	return (
		<nav className={style.nav}>
			<Link to="/">T-NOTES</Link>
		</nav>
	);
};

export default Nav;
