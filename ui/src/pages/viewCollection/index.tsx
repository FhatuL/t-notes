import {useParams} from "react-router-dom";
import style from "./view.module.scss";
import components from "./components";
import store from "../../store";
import {useEffect} from "react";
import EditOverlay from "./components/editOverlay";

const ViewCollection = () => {
	const params = useParams();
	const {getNotes, fetchNotes, activeIndex} = store.collectionStore();
	const {setIndex} = store.collectionStore();
	const {getCollectionTitle} = store.collectionStore();
	const {editNote, fetchCollection} = store.collectionStore();

	useEffect(() => {
		const id = parseInt(params.id as string);

		fetchCollection().then((_) => {
			fetchNotes(id)
				.then((x) => {
					setIndex(id);
				})
				.catch((err) => {
					console.log(err);
				});
		});
	}, [params, setIndex, fetchNotes, fetchCollection]);

	return (
		<>
			<section className={style.parent}>
				{activeIndex !== -1 && <components.AddNote />}
				<h1 className={style.title}>{getCollectionTitle()}</h1>
				<main className={style.main}>
					{getNotes().length ? (
						getNotes().map((note) => {
							return (
								<components.Note
									content={note.content}
									id={note.id}
									date={note.date}
									title={note.title}
									key={note.id}
								/>
							);
						})
					) : (
						<>
							<img
								className={style.image}
								src="https://c.tenor.com/Z6gmDPeM6dgAAAAC/dance-moves.gif"
								alt="you know the rules..."
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
