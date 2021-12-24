import create from "zustand";
import api from "../../api";

export interface Note {
	id: number;
	title: string;
	date: Date;
	content: string;
}

interface Collection {
	notes: Note[];
	id: number;
	title: string;
}

interface CollectionState {
	collections: Collection[];
	activeIndex: number;
	editNote: boolean;
	editId: number;
	addCollection: boolean;
	prefetched: boolean;
	toggleAdd: () => void;
	getNotes: () => Note[];
	setIndex: (id: number) => void;
	getCollectionTitle: () => string;
	toggleEditNote: () => void;
	setEditId: (id: number) => void;
	getNote: () => Note;
	fetchCollection: () => Promise<void>;
	fetchNotes: (id: number) => Promise<void>;
}

const collectionStore = create<CollectionState>((set, get) => ({
	collections: [],
	activeIndex: -1,
	editNote: false,
	editId: 0,
	addCollection: false,
	prefetched: false,
	toggleAdd: () => {
		set((state) => ({addCollection: !state.addCollection}));
	},
	getNotes: () => {
		if (get().activeIndex === -1) {
			return [];
		} else {
			return get().collections[get().activeIndex].notes;
		}
	},
	setIndex: (id: number) => {
		const index = get().collections.findIndex((col) => col.id === id);

		if (index !== get().activeIndex) {
			set((state) => ({activeIndex: index}));
		}
	},
	getCollectionTitle: () => {
		if (get().activeIndex === -1) {
			return "nothing to see here ...";
		}
		return get().collections[get().activeIndex].title;
	},
	toggleEditNote: () => {
		set((state) => ({editNote: !state.editNote}));
	},
	setEditId: (id: number) => {
		set((_) => ({editId: id}));
	},
	getNote: () => {
		const note = get().collections[get().activeIndex].notes.find((item) => {
			return item.id === get().editId;
		});

		if (note) {
			return note as Note;
		}
		return {
			id: 0,
			content: "",
			date: new Date(),
			title: "",
		};
	},

	fetchCollection: async () => {
		try {
			const data = await api.get("/notes/collections");
			if (data.status === 200) {
				const collection: Collection[] = data.data;
				const collections: Collection[] = [];
				collection.forEach((item) => {
					collections.push({
						id: item.id,
						title: item.title,
						notes: [],
					});
				});

				set((_) => ({collections: collections}));
			}
		} catch (error) {
			console.log(error);
		}
	},

	fetchNotes: async (id: number) => {
		if (!get().prefetched) {
			try {
				const results = await api.get(`/notes/collections/${id}`);

				if (results.status === 200) {
					const notes: Note[] = results.data;

					const collection: Collection[] = get().collections.map(
						(item) => {
							if (item.id === id) {
								item.notes = notes;
							}

							return item;
						}
					);

					set((_) => ({collections: collection, prefetched: true}));
				}
			} catch (error) {
				console.log(error);
			}
		}
	},
}));

export default collectionStore;
