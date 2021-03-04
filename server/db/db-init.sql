--
-- DATABASE INITIALIZATION COMMANDS A&S
--

--
-- Columbia University Address
--

INSERT INTO country (country, country_full) VALUES ('US', 'UNITED STATES');
INSERT INTO state (state, state_full, country_id) VALUES ('NY', 'NEW YORK', 1);
INSERT INTO city (city, state_id) VALUES ('NEW YORK', 1);
INSERT INTO address (address_1, city_id, zip_code) VALUES ('116TH STREET AND BROADWAY', 1, '10027');

INSERT INTO school (name, email_suffix, address_id) VALUES ('COLUMBIA UNIVERSITY', 'columbia', 1);

--
-- Account init
--

INSERT INTO account_type (account_type) VALUES ('STUDENT');
INSERT INTO account_type (account_type) VALUES ('ALUMNUS');

--
-- Subject / Major list
--

INSERT INTO subject (name) VALUES ('ENGLISH');
INSERT INTO subject (name) VALUES ('MATHEMATICS');
INSERT INTO subject (name) VALUES ('BIOLOGY');
INSERT INTO subject (name) VALUES ('CHEMISTRY');
INSERT INTO subject (name) VALUES ('COMPUTER SCIENCE');
INSERT INTO subject (name) VALUES ('PHYSICS');
INSERT INTO subject (name) VALUES ('INTERNATIONAL RELATIONS');
INSERT INTO subject (name) VALUES ('ANTHROPOLOGY');
INSERT INTO subject (name) VALUES ('HISTORY');
INSERT INTO subject (name) VALUES ('ART');
INSERT INTO subject (name) VALUES ('ART HISTORY');


--
-- Extensions
--
CREATE EXTENSION pgcrypto;