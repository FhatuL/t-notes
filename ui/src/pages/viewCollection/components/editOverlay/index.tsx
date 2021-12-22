import style from "./edit.module.scss";
import EditNote from "../editNote";
import store from "../../../../store";

const EditOverlay = () => {
	const {toggleEditNote} = store.collectionStore();
	return (
		<section className={style.editOverlay}>
			<main className={style.main} onClick={toggleEditNote}>
				<EditNote />
			</main>
		</section>
	);
};

export default EditOverlay;
