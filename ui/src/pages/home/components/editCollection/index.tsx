import {useEffect, useState} from "react";
import api from "../../../../api";
import store from "../../../../store";
import style from "../../home.module.scss";

interface Props {
	stopPropagation: React.MouseEventHandler<HTMLDivElement>;
}

const EditCollection: React.FC<Props> = ({stopPropagation}) => {
	const {editColId, toggleEditCol, fetchCollection, getEditColTitle} =
		store.collectionStore();
	const [inputTitle, setInputTitle] = useState("");
	const handleSubmit = async () => {
		try {
			const res = await api.put(`/notes/collections/${editColId}`, {
				title: inputTitle,
			});
			if (res.statusText === "OK") {
				await fetchCollection();
				toggleEditCol();
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		setInputTitle(getEditColTitle);
	}, [getEditColTitle]);

	return (
		<section className={style.addCollection} onClick={(_) => toggleEditCol}>
			<main
				className={style.editForm}
				onClick={(e) => {
					e.stopPropagation();
					toggleEditCol();
				}}
			>
				<div className={style.formItem} onClick={stopPropagation}>
					<label htmlFor="collection-title">TITLE</label>
				</div>
				<div className={style.formItem} onClick={stopPropagation}>
					<input
						type="text"
						name="title"
						id="collection-title"
						placeholder=""
						title="collection title"
						autoFocus
						onChange={(e) => {
							setInputTitle(e.target.value);
						}}
						value={inputTitle}
					/>
				</div>
				<div className={style.formItem} onClick={stopPropagation}>
					<button onClick={(_) => toggleEditCol()}>close</button>
					<button onClick={handleSubmit}>edit</button>
				</div>
			</main>
		</section>
	);
};

export default EditCollection;
