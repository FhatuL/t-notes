import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import style from "./home.module.scss";
import Components from "./components";
import store from "../../store";

const {Collection} = Components;

const Home = () => {
	const navigate = useNavigate();
	const {collections, addCollection, toggleAdd, fetchCollection} =
		store.collectionStore();

	const openCollection = (id?: number) => {
		navigate(`/collection/${id}`);
	};

	const addToCollection = (id?: number) => {
		toggleAdd();
	};

	const stopPropagation: React.MouseEventHandler<HTMLDivElement> = (e) => {
		e.stopPropagation();
	};

	useEffect(() => {
		fetchCollection();
	});
	return (
		<section className={style.section}>
			<header className={style.header}>
				<h1 className={style.title}>TRASH NOTES</h1>
			</header>
			<main className={style.main}>
				{collections.map((collection, index) => {
					return (
						<Collection
							key={index}
							title={collection.title}
							cover_text={collection.id}
							nav={openCollection}
							nav_id={collection.id}
						/>
					);
				})}
				<Collection
					key={"add"}
					title="add"
					cover_text={"+"}
					nav={addToCollection}
				/>
			</main>
			{addCollection && (
				<section className={style.addCollection} onClick={toggleAdd}>
					<main
						className={style.editForm}
						onClick={(e) => {
							e.stopPropagation();
							toggleAdd();
						}}
					>
						<div
							className={style.formItem}
							onClick={stopPropagation}
						>
							<label htmlFor="collection-title">TITLE</label>
						</div>
						<div
							className={style.formItem}
							onClick={stopPropagation}
						>
							<input
								type="text"
								name="title"
								id="collection-title"
								placeholder=""
								title="collection title"
							/>
						</div>
						<div
							className={style.formItem}
							onClick={stopPropagation}
						>
							<button onClick={toggleAdd}>close</button>
							<button>add</button>
						</div>
					</main>
				</section>
			)}
		</section>
	);
};
export default Home;
