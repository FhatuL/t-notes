import style from "../note/note.module.scss";
import {useEffect, useState} from "react";
import store from "../../../../store";

const EditNote: React.FC = () => {
	const {getNote, toggleEditNote} = store.collectionStore();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	useEffect(() => {
		setTitle(getNote().title);
		setContent(getNote().content);
	}, [getNote]);

	return (
		<div
			className={[style.parent, style.parentFixed].join(" ")}
			onClick={(e) => {
				e.stopPropagation();
			}}
		>
			<div className={style.title} contentEditable={true}>
				<span>{title}</span>
			</div>
			<div className={style.bottomBorder}></div>
			<div className={style.body} contentEditable={true}>
				<span>{content}</span>
			</div>
			<div className={style.bottom}>
				<span>{getNote().date.toUTCString()}</span>
			</div>
			<div className={[style.btn, style.btnSave].join(" ")}>
				<button>save</button>
			</div>
			<div className={[style.btn, style.btnClose].join(" ")}>
				<button onClick={toggleEditNote}>close</button>
			</div>
		</div>
	);
};

export default EditNote;
