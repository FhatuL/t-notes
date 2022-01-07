import style from "./note.module.scss";
import {Note as NoteType} from "../../../../store/collectionStore";
import store from "../../../../store";
import {useRef} from "react";

const Note: React.FC<NoteType> = ({id, content, date, title}) => {
	const {toggleEditNote, setEditId} = store.collectionStore();
	const noteContent = useRef<HTMLSpanElement>(null);
	return (
		<div
			className={style.parent}
			onClick={() => {
				setEditId(id);
				if (noteContent.current) {
					toggleEditNote(noteContent.current.offsetHeight);
				}
			}}
		>
			<div className={style.title}>
				<span>{title}</span>
			</div>
			<div className={style.bottomBorder}></div>
			<div className={style.body}>
				<span ref={noteContent}>{content}</span>
			</div>
			<div className={style.bottom}>
				<span>
					{date.toLocaleDateString("en-GB", {
						weekday: "short",
						year: "2-digit",
						month: "short",
						day: "2-digit",
						hour: "2-digit",
						minute: "2-digit",
					})}
				</span>
			</div>
		</div>
	);
};

export default Note;
