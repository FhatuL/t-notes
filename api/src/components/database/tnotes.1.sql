CREATE TABLE IF NOT EXISTS note(
	note_id INT NOT NULL auto_increment,
	note_content TEXT,
	note_date DATETIME DEFAULT UTC_TIMESTAMP,
	PRIMARY KEY(note_id)
);

CREATE TABLE IF NOT EXISTS collection(
	collection_id INT NOT NULL auto_increment,
	collection_name VARCHAR(50) NOT NULL,
	collection_date DATETIME DEFAULT UTC_TIMESTAMP,
	PRIMARY KEY(collection_id)
);

CREATE TABLE IF NOT EXISTS collection_notes(
	note_id INT NOT NULL UNIQUE,
	collection_id INT NOT NULL,
	PRIMARY KEY(note_id, collection_id),
	FOREIGN KEY(note_id) REFERENCES note(note_id) ON DELETE CASCADE,
	FOREIGN KEY(collection_id) REFERENCES collection(collection_id) ON DELETE CASCADE
);