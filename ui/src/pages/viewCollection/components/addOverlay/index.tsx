import style from "../editOverlay/edit.module.scss";
import EditNote from "../editNote";
import store from "../../../../store";
import api from "../../../../api";
import {useParams} from "react-router-dom";

const AddOverlay = () => {
	const {toggleAddNote, getNote, fetchNotes} = store.collectionStore();
	const params = useParams();
	const submit = async (title: string, content: string): Promise<void> => {
		try {
			const res = await api.post(`/notes/collections/${params.id}/`, {
				title,
				content,
			});

			if (res.status === 200) {
				await fetchNotes(parseInt(params.id as string));
			}
		} catch (error) {
			console.log(error);
		} finally {
			toggleAddNote();
		}
	};
	return (
		<section className={style.editOverlay}>
			<main className={style.main} onClick={toggleAddNote}>
				<EditNote
					close={toggleAddNote}
					noteContent={getNote("add").content}
					noteDate={getNote("add").date}
					noteTitle={getNote("add").title}
					submitFn={submit}
				/>
			</main>
		</section>
	);
};

export default AddOverlay;
