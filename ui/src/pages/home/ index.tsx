import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import style from "./home.module.scss";
import Components from "./components";
import store from "../../store";
import api from "../../api";

const {Collection} = Components;

const Home = () => {
	const [inputTitle, setInputTitle] = useState("");
	const [disableSave, setDisableSave] = useState(false);
	const navigate = useNavigate();
	const {collections, addCollection, toggleAdd, fetchCollection, editCol} =
		store.collectionStore();

	const openCollection = (id?: number) => {
		navigate(`/collection/${id}`);
	};

	const addToCollection = (id?: number) => {
		toggleAdd();
	};

	const handleSubmit = async () => {
		setDisableSave(true);

		try {
			const res = await api.post("/notes/collections", {
				name: inputTitle,
			});

			if (res.status === 200) {
				toggleAdd();
				fetchCollection();
			}
		} catch (error) {
			console.log(error);
		} finally {
			setDisableSave(false);
		}
	};

	const stopPropagation: React.MouseEventHandler<HTMLDivElement> = (e) => {
		e.stopPropagation();
	};
	useEffect(() => {
		fetchCollection();
	}, [fetchCollection]);
	return (
		<section className={style.section}>
			<header className={style.header}>
				<h1 className={style.title}>CATEGORIES</h1>
			</header>
			<main className={style.main}>
				{collections.map((collection) => {
					return (
						<Collection
							key={collection.id}
							title={collection.title}
							cover_text={collection.id}
							nav={openCollection}
							nav_id={collection.id}
							collection_id={collection.id}
						/>
					);
				})}
				<Collection
					key={"add"}
					title="add"
					cover_text={"+"}
					nav={addToCollection}
					isadd={true}
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
								autoFocus
								onChange={(e) => {
									setInputTitle(e.target.value);
								}}
								value={inputTitle}
							/>
						</div>
						<div
							className={style.formItem}
							onClick={stopPropagation}
						>
							<button onClick={toggleAdd}>close</button>
							<button
								disabled={disableSave ? true : false}
								onClick={handleSubmit}
							>
								add
							</button>
						</div>
					</main>
				</section>
			)}

			{editCol && (
				<Components.EditCollection stopPropagation={stopPropagation} />
			)}
		</section>
	);
};
export default Home;
