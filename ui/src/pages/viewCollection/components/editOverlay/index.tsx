import style from "./edit.module.scss";
import EditNote from "../editNote";
import store from "../../../../store";
import api from "../../../../api";
import {useParams} from "react-router-dom";

const EditOverlay = () => {
	const {toggleEditNote, getNote, editId, fetchNotes} =
		store.collectionStore();
	const params = useParams();
	const submit = async (title: string, content: string): Promise<void> => {
		try {
			const res = await api.put(
				`/notes/collections/${params.id}/${editId}`,
				{
					title,
					content,
					id: editId,
				}
			);

			if (res.statusText === "OK") {
				await fetchNotes(parseInt(params.id as string));
			}
		} catch (error) {
			console.log(error);
		} finally {
			toggleEditNote();
		}
	};
	return (
		<section className={style.editOverlay}>
			<main className={style.main} onClick={toggleEditNote}>
				<EditNote
					close={toggleEditNote}
					noteContent={getNote("edit").content}
					noteDate={new Date(getNote("edit").date)}
					noteTitle={getNote("edit").title}
					submitFn={submit}
				/>
			</main>
		</section>
	);
};

export default EditOverlay;
