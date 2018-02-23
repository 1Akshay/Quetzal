DB-SCHEMA

CREATE DATABASE sys;

CREATE TABLE Skills (
    id int NOT NULL,
    name varchar(255) NOT NULL,
    status varchar(255),
    PRIMARY KEY (id)
);

use sys;

INSERT INTO Skills (id, name, status)
VALUES (1, 'PHP', 'true');

INSERT INTO Skills (id, name, status)
VALUES (2, 'Angular', null);

INSERT INTO Skills (id, name, status)
VALUES (3, 'Node Js', 'false');

INSERT INTO Skills (id, name, status)
VALUES (4, 'Photoshop cc',null );

INSERT INTO Skills (id, name, status)
VALUES (5, 'Ms Office', 'false');

INSERT INTO Skills (id, name, status)
VALUES (6, 'Git hub',null);

INSERT INTO Skills (id, name, status)
VALUES (7, 'Illustator',null );

INSERT INTO Skills (id, name, status)
VALUES (8, 'After Effects cc', null);

INSERT INTO Skills (id, name, status)
VALUES (9, 'Sketch',null);

INSERT INTO Skills (id, name, status)
VALUES (10, 'Invision',null );
