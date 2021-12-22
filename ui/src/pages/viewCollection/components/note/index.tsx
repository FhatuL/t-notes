import style from "./note.module.scss";
import {Note as NoteType} from "../../../../store/collectionStore";
import store from "../../../../store";

const Note: React.FC<NoteType> = ({id, content, date, title}) => {
	const {toggleEditNote, setEditId} = store.collectionStore();

	return (
		<div
			className={style.parent}
			onClick={() => {
				setEditId(id);
				toggleEditNote();
			}}
		>
			<div className={style.title}>
				<span>{title}</span>
			</div>
			<div className={style.bottomBorder}></div>
			<div className={style.body}>
				<span>{content}</span>
			</div>
			<div className={style.bottom}>
				<span>{date.toUTCString()}</span>
			</div>
		</div>
	);
};

export default Note;
