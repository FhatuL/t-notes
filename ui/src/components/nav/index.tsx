import style from "./nav.module.scss";
import {Link} from "react-router-dom";
const Nav = () => {
	return (
		<nav className={style.nav}>
			<Link to="/">TRASH NOTES</Link>
		</nav>
	);
};

export default Nav;
