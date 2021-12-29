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


DELIMITER //
CREATE OR REPLACE PROCEDURE delete_collection(col_id INT)
BEGIN
	DECLARE done INT DEFAULT FALSE;
	DECLARE x INT;
	DECLARE cur1 CURSOR FOR SELECT note_id FROM collection_notes WHERE collection_id=col_id;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

	OPEN cur1;
	
	read_loop: LOOP
		FETCH cur1 INTO x;

		IF done THEN
			LEAVE read_loop;
		END IF;
	
		DELETE FROM note WHERE note_id = x;
	END LOOP;
	CLOSE cur1;

	DELETE FROM collection WHERE collection_id =col_id;
END //
DELIMITER ;
