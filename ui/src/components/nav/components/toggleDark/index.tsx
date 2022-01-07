import style from "./toggle.module.scss";
import svg from "./svgs";
import {useEffect, useState} from "react";

const {Dark, Light} = svg;

const ToggleDark = () => {
	const [isDark, setIsDark] = useState<boolean>(false);

	const toggleDarkMode = () => {
		setIsDark(!isDark);
	};

	useEffect(() => {
		if (isDark) {
			document.documentElement.setAttribute("data-theme", "dark");
		} else {
			document.documentElement.setAttribute("data-theme", "light");
		}
	}, [isDark]);

	return (
		<div className={style.parent} onClick={toggleDarkMode}>
			<div className={[style.item].join(" ")} title="toggle dark mode">
				{!isDark ? <Dark /> : <Light />}
			</div>
		</div>
	);
};

export default ToggleDark;
