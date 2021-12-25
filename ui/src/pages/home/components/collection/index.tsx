import api from "../../../../api";
import store from "../../../../store";
import style from "./collection.module.scss";

interface Props {
	title: string;
	cover_text: string | number;
	nav_id?: number;
	nav: (id?: number) => void;
	isadd?: boolean;
	collection_id?: number;
}

const Collection: React.FC<Props> = ({
	title,
	cover_text,
	nav,
	nav_id,
	isadd,
	collection_id,
}) => {
	const {fetchCollection} = store.collectionStore();

	const deleteCollection = () => {
		if (collection_id) {
			api.delete(`/notes/collections/${collection_id}`)
				.then(async (res) => {
					if (res.statusText === "OK") {
						await fetchCollection();
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<div className={style.container}>
			<div
				className={style.parent}
				onClick={() => {
					if (nav_id) nav(nav_id);
					else nav();
				}}
			>
				{!isadd && (
					<div className={style.delete}>
						<button
							onClick={(e) => {
								e.stopPropagation();
								deleteCollection();
							}}
						>
							delete
						</button>
					</div>
				)}
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
