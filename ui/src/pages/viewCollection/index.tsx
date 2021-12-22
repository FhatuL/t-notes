import {useParams} from "react-router-dom";
import style from "./view.module.scss";
import components from "./components";
import store from "../../store";
import {useEffect} from "react";
import EditOverlay from "./components/editOverlay";

const ViewCollection = () => {
	const params = useParams();
	const {getNotes} = store.collectionStore();
	const {setIndex} = store.collectionStore();
	const {getCollectionTitle} = store.collectionStore();
	const {editNote} = store.collectionStore();

	useEffect(() => {
		const id = parseInt(params.id as string);
		setIndex(id);
	}, [params, setIndex]);

	return (
		<>
			<section className={style.parent}>
				<h1 className={style.title}>{getCollectionTitle()}</h1>
				<main className={style.main}>
					{getNotes().length ? (
						getNotes().map((note, index) => {
							return (
								<components.Note
									content={note.content}
									id={note.id}
									date={note.date}
									title={note.title}
									key={index}
								/>
							);
						})
					) : (
						<>
							<img
								className={style.image}
								src="https://c.tenor.com/Z6gmDPeM6dgAAAAC/dance-moves.gif"
								alt="Angela Yu"
							/>
						</>
					)}
				</main>
			</section>
			{editNote && <EditOverlay />}
		</>
	);
};

export default ViewCollection;
