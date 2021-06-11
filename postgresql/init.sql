CREATE USER overgear WITH PASSWORD 'overgear';
CREATE DATABASE overgear;
GRANT ALL PRIVILEGES ON DATABASE overgear TO overgear;

\c overgear
set role overgear;

CREATE DOMAIN balance AS NUMERIC(5,2)
   CHECK(VALUE >= 0);

CREATE TABLE bills (
    "id"        serial PRIMARY KEY,
    "userId"    integer NOT NULL,
    "balance"   NUMERIC(10,2) CHECK ("balance">=0)
);

CREATE TABLE users (
    "id"      serial PRIMARY KEY,
    "email"   VARCHAR ( 50 ) UNIQUE NOT NULL
);

CREATE TYPE transType AS ENUM ('transfer', 'refill');
CREATE TABLE transactions (
    "id"           serial PRIMARY KEY,
    "accountFrom"  integer,
    "accountTo"    integer,
    "type"         transType,
    "amount"       NUMERIC(10,2),
    "paymentId"    VARCHAR ( 50 ) UNIQUE DEFAULT NULL
);

INSERT INTO bills VALUES
    (1, 1, 10000);
INSERT INTO bills VALUES
    (2, 2, 20000);
INSERT INTO users VALUES
    (1, 'foo@bar.ru');
INSERT INTO users VALUES
    (2, 'baz@quux.ru');
INSERT INTO transactions ("accountTo", "type", "amount", "paymentId")
    VALUES (1, 'refill', 10000, 'sdjhbsdb');
INSERT INTO transactions ("accountTo", "type", "amount", "paymentId")
    VALUES (2, 'refill', 20000, 'sjghas42');
