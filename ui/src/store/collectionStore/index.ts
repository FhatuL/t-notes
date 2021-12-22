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
	toggleAdd: () => void;
	getNotes: () => Note[];
	setIndex: (id: number) => void;
	getCollectionTitle: () => string;
	toggleEditNote: () => void;
	setEditId: (id: number) => void;
	getNote: () => Note;
	fetchCollection: () => void;
}

const note1: Note = {
	id: 1,
	title: "test note",
	date: new Date(),
	content:
		"If you need slightly less control over formatting than the currently accepted answer, Date#toLocaleDateString can be used to create standard locale-specific renderings",
};

const note2: Note = {
	id: 2,
	title: "test note 2",
	date: new Date(),
	content:
		"What this does is take either an array or a string (which is then split into an array of strings), and returns a final class name (scoped to the current module since it uses the imported styles object of course).",
};

const note3: Note = {
	id: 1,
	title: "test note 3",
	date: new Date(),
	content: "What is love, baby don't hurt me",
};

const data: Collection[] = [
	{
		notes: [note1, note2],
		id: 1,
		title: "Test Notes",
	},
	{
		id: 2,
		title: "notes 2",
		notes: [note3],
	},
];

const collectionStore = create<CollectionState>((set, get) => ({
	collections: data,
	activeIndex: -1,
	editNote: false,
	editId: 0,
	addCollection: false,
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
			const collection = await api.get("/Notes/collections");
			if (collection.status === 200) {
				console.log(collection.data);
			}
		} catch (error) {
			console.log(error);
		}
	},
}));

export default collectionStore;
