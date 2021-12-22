CREATE TABLE IF NOT EXISTS note(
	note_id SERIAL,
	note_content TEXT,
	note_date TIMESTAMPTZ DEFAULT NOW(),
	PRIMARY KEY(note_id)
);

CREATE TABLE IF NOT EXISTS collection(
	collection_id SERIAL,
	collection_date TIMESTAMPTZ DEFAULT NOW(),
	PRIMARY KEY(collection_id)
);

CREATE TABLE IF NOT EXISTS collection_notes(
	col_notes_id SERIAL,
	note_id SERIAL,
	collection_id SERIAL,
	PRIMARY KEY(col_notes_id),
	FOREIGN KEY(note_id) REFERENCES note(note_id),
	FOREIGN KEY(collection_id) REFERENCES collection(collection_id)
);