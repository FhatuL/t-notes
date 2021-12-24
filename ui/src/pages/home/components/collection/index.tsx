import style from "./collection.module.scss";

interface Props {
	title: string;
	cover_text: string | number;
	nav_id?: number;
	nav: (id?: number) => void;
}

const Collection: React.FC<Props> = ({title, cover_text, nav, nav_id}) => {
	return (
		<div className={style.container}>
			<div
				className={style.parent}
				onClick={() => {
					if (nav_id) nav(nav_id);
					else nav();
				}}
			>
				<div className={style.delete}>
					<button
						onClick={(e) => {
							e.stopPropagation();
						}}
					>
						delete
					</button>
				</div>
				<div className={style.cover}>
					<h1>{cover_text}</h1>
				</div>
			</div>
			<div className={style.title}>
				<span>{title}</span>
			</div>
		</div>
	);
};

export default Collection;
