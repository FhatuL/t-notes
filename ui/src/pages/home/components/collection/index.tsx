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
	const {fetchCollection, toggleEditCol} = store.collectionStore();

	const deleteCollection = () => {
		if (collection_id) {
			api.delete(`/notes/collections/${collection_id}`)
				.then(async (res) => {
					if (res.status === 200) {
						await fetchCollection();
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const editCollection = async () => {
		toggleEditCol(collection_id);
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
							title="delete"
							onClick={(e) => {
								e.stopPropagation();
								deleteCollection();
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24px"
								viewBox="0 0 24 24"
								width="24px"
								fill="#000000"
							>
								<path d="M0 0h24v24H0V0z" fill="none" />
								<path
									className={style.path}
									d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"
								/>
							</svg>
						</button>
					</div>
				)}
				{!isadd && (
					<div className={style.edit}>
						<button
							title="edit"
							onClick={(e) => {
								e.stopPropagation();
								editCollection();
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24px"
								viewBox="0 0 24 24"
								width="24px"
								fill="#000000"
							>
								<path d="M0 0h24v24H0V0z" fill="none" />
								<path
									className={style.path}
									d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"
								/>
							</svg>
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
