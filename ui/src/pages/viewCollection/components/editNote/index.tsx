import style from "../note/note.module.scss";
import {useEffect, useState, useRef} from "react";

interface Props {
	noteTitle: string;
	noteContent: string;
	noteDate: Date;
	submitFn: (title: string, content: string) => Promise<void>;
	contentHeight?: number;
	deleteFN?: () => Promise<void>;
	close: () => void;
}

const EditNote: React.FC<Props> = ({
	noteTitle,
	noteContent,
	noteDate,
	submitFn,
	close,
	contentHeight,
	deleteFN,
}) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const textArea = useRef<HTMLTextAreaElement>(null);
	const handleSubmit = async () => {
		await submitFn(title, content);
	};

	useEffect(() => {
		setTitle(noteTitle);
		setContent(noteContent);
	}, [noteContent, noteTitle]);

	return (
		<div
			className={[style.parent, style.parentFixed].join(" ")}
			onClick={(e) => {
				e.stopPropagation();
			}}
		>
			<div className={style.title}>
				<span>
					<input
						placeholder="title"
						type="text"
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
					/>
				</span>
			</div>
			<div className={style.bottomBorder}></div>
			<div className={style.body}>
				<span>
					{
						<textarea
							style={
								contentHeight
									? {height: `${contentHeight}px`}
									: {}
							}
							autoFocus
							ref={textArea}
							value={content}
							placeholder="enter note here"
							onChange={(e) => {
								setContent(e.target.value);
							}}
							onInput={() => {
								if (textArea.current) {
									textArea.current.style.height = `${textArea.current?.scrollHeight}px`;
								}
							}}
						/>
					}
				</span>
			</div>
			<div className={style.bottom}>
				<span>
					{noteDate.toLocaleDateString("en-GB", {
						weekday: "short",
						year: "2-digit",
						month: "short",
						day: "2-digit",
					})}
				</span>
			</div>
			{deleteFN && (
				<div className={[style.btn, style.btnDelete].join(" ")}>
					<button onClick={deleteFN}>delete</button>
				</div>
			)}
			<div className={[style.btn, style.btnSave].join(" ")}>
				<button onClick={handleSubmit}>save</button>
			</div>
			<div className={[style.btn, style.btnClose].join(" ")}>
				<button onClick={close}>close</button>
			</div>
		</div>
	);
};

export default EditNote;
