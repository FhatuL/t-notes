import style from "./add.module.scss";

const AddNote = () => {
	return (
		<div className={style.addBtn} title="new note">
			<span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 0 24 24"
					width="24px"
					fill="#000000"
				>
					<path d="M0 0h24v24H0V0z" fill="none" />
					<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
				</svg>
			</span>
		</div>
	);
};

export default AddNote;
