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
