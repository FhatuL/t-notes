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
	addNote: boolean;
	contentHeight: number;
	addCollection: boolean;
	editCol: boolean;
	editColId: number;
	toggleEditCol: (id?: number) => void;
	toggleAdd: () => void;
	getNotes: () => Note[];
	setIndex: (id: number) => void;
	getCollectionTitle: () => string;
	toggleEditNote: (height?: number) => void;
	toggleAddNote: () => void;
	setEditId: (id: number) => void;
	getNote: (type: "edit" | "add") => Note;
	fetchCollection: () => Promise<void>;
	fetchNotes: (id: number) => Promise<void>;
	getEditColTitle: () => string;
}

const collectionStore = create<CollectionState>((set, get) => ({
	collections: [],
	activeIndex: -1,
	editNote: false,
	addNote: false,
	editCol: false,
	editId: 0,
	editColId: 0,
	contentHeight: 0,
	addCollection: false,
	toggleEditCol: (id) => {
		set((state) => ({editCol: !state.editCol, editColId: id ? id : 0}));
	},
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
	toggleEditNote: (height) => {
		set((state) => ({
			editNote: !state.editNote,
			contentHeight: height ? height : 0,
		}));
	},
	toggleAddNote: () => {
		set((state) => ({addNote: !state.addNote}));
	},
	setEditId: (id) => {
		set((_) => ({editId: id}));
	},
	getNote: (type) => {
		const note: Note | undefined | false =
			type === "edit"
				? get().collections[get().activeIndex].notes.find((item) => {
						return item.id === get().editId;
				  })
				: false;

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

				set((_) => ({collections: collection}));
			}
		} catch (error) {
			console.log(error);
		}
	},
	getEditColTitle: () => {
		const collection = get().collections.find((item) => {
			return item.id === get().editColId;
		});

		return collection ? collection.title : "";
	},
}));

export default collectionStore;
