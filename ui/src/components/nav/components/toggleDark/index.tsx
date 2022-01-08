import style from "./toggle.module.scss";
import "./transitions.css";
import svg from "./svgs";
import {useEffect, useState} from "react";
import {SwitchTransition, CSSTransition} from "react-transition-group";
import React from "react";
const {Dark, Light} = svg;

interface Props {
	children: React.ReactChild | React.ReactChildren;
}

const ToggleDark = () => {
	const [isDark, setIsDark] = useState<boolean>(false);

	const toggleDarkMode = () => {
		setIsDark(!isDark);
		window.localStorage.setItem("isDarkTheme", isDark ? "false" : "true");
	};

	const ToggleComp: React.FC<Props> = ({children}) => {
		return <>{children}</>;
	};

	useEffect(() => {
		const isDarkTheme = window.localStorage.getItem("isDarkTheme");

		if (isDarkTheme) {
			setIsDark(isDarkTheme === "true" ? true : false);
		}
	}, []);

	useEffect(() => {
		if (isDark) {
			document.documentElement.setAttribute("data-theme", "dark");
		} else {
			document.documentElement.setAttribute("data-theme", "light");
		}
		console.log(2);
	}, [isDark]);

	return (
		<div className={style.parent} onClick={toggleDarkMode}>
			<div className={[style.item].join(" ")} title="toggle dark mode">
				<SwitchTransition mode="out-in">
					<CSSTransition
						key={isDark ? "dark" : "light"}
						classNames="fade"
						addEndListener={(node, done) =>
							node.addEventListener("transitionend", done, false)
						}
					>
						<ToggleComp>{isDark ? <Light /> : <Dark />}</ToggleComp>
					</CSSTransition>
				</SwitchTransition>
			</div>
		</div>
	);
};

export default ToggleDark;
