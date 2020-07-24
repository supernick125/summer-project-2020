CREATE TABLE users
(
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email_address VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  bio TEXT DEFAULT ''
);

CREATE TABLE meetings
(
  meeting_id SERIAL PRIMARY KEY
);
