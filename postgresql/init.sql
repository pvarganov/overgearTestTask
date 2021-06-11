CREATE USER overgear WITH PASSWORD 'overgear';
CREATE DATABASE overgear;
GRANT ALL PRIVILEGES ON DATABASE overgear TO overgear;

\c overgear
set role overgear;

CREATE TABLE bills (
    id        serial PRIMARY KEY,
    userId   integer NOT NULL,
    balance   NUMERIC(5,2) CHECK (balance >= 0)
);

CREATE TABLE users (
    id      serial PRIMARY KEY,
    email   VARCHAR ( 50 ) UNIQUE NOT NULL
);

CREATE TYPE transType AS ENUM ('transfer', 'refill');
CREATE TABLE transactions (
    id           serial PRIMARY KEY,
    accountFrom  integer,
    accountTo    integer,
    type         transType,
    amount       NUMERIC(5,2),
    paymentid    VARCHAR ( 50 ) UNIQUE NULL
);

INSERT INTO bills VALUES
    (1, 1, 100);
INSERT INTO bills VALUES
    (2, 2, 200);
INSERT INTO users VALUES
    (1, 'foo@bar.ru');
INSERT INTO users VALUES
    (2, 'baz@quux.ru');
INSERT INTO transactions (id, accountTo, type, amount, paymentid)
    VALUES (1, 1, 'refill', 100, 'sdjhbsdb');
INSERT INTO transactions (id, accountTo, type, amount, paymentid)
    VALUES (2, 2, 'refill', 200, 'sjghas42');
