--
-- DATABASE SETUP COMMANDS A&S
--

--
-- PARAMETERS
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';
SET default_table_access_method = heap;

SET search_path = public, pg_catalog;

--
-- TABLES
--

--
-- Name: account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE account (
  id integer GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  account_type_id integer NOT NULL,
  school_id integer NOT NULL,
  graduation_year integer NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email_address text NOT NULL,
  password text NOT NULL,
  personal_id integer,
  academic_id integer,
  industry_id integer, 
  registered timestamptz DEFAULT now() NOT NULL,
  active boolean DEFAULT true NOT NULL,
  last_update timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.account OWNER TO postgres;

--
-- Name: account_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE account_type (
  id integer GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  account_type text NOT NULL,
  permissions text DEFAULT ''::text NOT NULL,
  last_update timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.account_type OWNER TO postgres;

--
-- Name: personal_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE personal_info (
  id integer GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  account_id integer NOT NULL,
  phone_number text,
  hometown text,
  high_school text,
  biography text,
  last_update timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.personal_info OWNER TO postgres;

--
-- Name: academic_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE academic_info (
  id INTEGER GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  account_id integer NOT NULL,
  school text,
  major text,
  major2 text,
  minor text,
  last_update timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.academic_info OWNER TO postgres;

--
-- Name: industry_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE industry_info (
  id INTEGER GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  account_id integer NOT NULL,
  primary_industry_interest text,
  secondary_industry_interest text,
  cities_of_interest text,
  last_update timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.industry_info OWNER TO postgres;

--
-- Name: subject; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE subject (
  id integer GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  name text NOT NULL,
  last_update timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.subject OWNER TO postgres;

--
-- Name: account_subject; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE account_subject (
  account_id integer NOT NULL,
  subject_id integer NOT NULL,
  designation text NOT NULL, -- new table?
  last_update timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.account_subject OWNER TO postgres;

--
-- Name: meeting; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE meeting (
  id integer GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  host_id integer NOT NULL,
  capacity integer DEFAULT 5 NOT NULL,
  size integer DEFAULT 0 NOT NULL,
  start timestamptz NOT NULL,
  description text DEFAULT ''::text NOT NULL,
  virtual boolean DEFAULT true NOT NULL,
  address_id integer,
  registered timestamptz DEFAULT now() NOT NULL,
  active boolean DEFAULT true NOT NULL,
  last_update timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.meeting OWNER TO postgres;

--
-- Name: account_meeting; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE account_meeting (
  account_id integer NOT NULL,
  meeting_id integer NOT NULL,
  registered timestamptz DEFAULT now() NOT NULL,
  active boolean DEFAULT true NOT NULL,
  last_update timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.account_meeting OWNER TO postgres;

--
-- Name: school; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE school (
  id integer GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  name text NOT NULL,
  email_suffix text NOT NULL,
  address_id integer,-- NOT NULL?
  admin_id integer,-- Linking table?
  registered timestamptz DEFAULT now() NOT NULL,
  last_update timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.school OWNER TO postgres;

--
-- Name: address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE address (
  id integer GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  address_1 text NOT NULL,
  address_2 text,
  city_id integer NOT NULL,
  zip_code text,
  last_update timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.address OWNER TO postgres;

--
-- Name: city; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE city (
  id integer GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  city text NOT NULL,
  state_id integer NOT NULL,
  last_update timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.city OWNER TO postgres;

--
-- Name: state; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE state (
  id integer GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  state text NOT NULL,
  state_full text NOT NULL,
  country_id integer NOT NULL,
  last_update timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.state OWNER TO postgres;

--
-- Name: country; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE country (
  id integer GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  country text NOT NULL,
  country_full text NOT NULL,
  last_update timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.country OWNER TO postgres;

--
-- Name: color; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE color (
  id integer GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  hex text NOT NULL,
  last_update timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.color OWNER TO postgres;

--
-- Name: school_color; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE school_color (
  school_id integer NOT NULL,
  color_id integer NOT NULL,
  color_type_id integer NOT NULL,
  last_update timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.school_color OWNER TO postgres;

--
-- Name: color_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE color_type (
  id integer GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  designation text NOT NULL,
  last_update timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.color_type OWNER TO postgres;

--
-- FUNCTIONS
--

--
-- Name: last_updated(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION last_updated() RETURNS trigger
  AS $$
BEGIN
  NEW.last_update = now();
  RETURN NEW;
END $$
  LANGUAGE plpgsql;

ALTER FUNCTION public.last_updated() OWNER to postgres;

--
-- PRIMARY KEYS
--

--
-- Name: account_pkey; Type: PK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account
  ADD CONSTRAINT account_pkey PRIMARY KEY (id);

--
-- Name: account_type_pkey; Type: PK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account_type
  ADD CONSTRAINT account_type_pkey PRIMARY KEY (id);

--
-- Name: personal_info_pkey; Type: PK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY personal_info
  ADD CONSTRAINT personal_info_pkey PRIMARY KEY (id);
  
--
-- Name: academic_info_pkey; Type: PK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY academic_info
  ADD CONSTRAINT academic_info_pkey PRIMARY KEY (id);
  
-- 
-- Name: industry_info_pkey; Type: PK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY industry_info
  ADD CONSTRAINT industry_info_pkey PRIMARY KEY (id);

--
-- Name: subject_pkey; Type: PK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY subject
  ADD CONSTRAINT subject_pkey PRIMARY KEY (id);

--
-- Name: account_subject_pkey; Type: PK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account_subject
  ADD CONSTRAINT account_subject_pkey PRIMARY KEY (account_id, subject_id);

--
-- Name: meeting_pkey; Type: PK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY meeting
  ADD CONSTRAINT meeting_pkey PRIMARY KEY (id);

--
-- Name: account_meeting_pkey; Type: PK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account_meeting
  ADD CONSTRAINT account_meeting_pkey PRIMARY KEY (account_id, meeting_id);

--
-- Name: school_pkey; Type: PK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY school
  ADD CONSTRAINT school_pkey PRIMARY KEY (id);

--
-- Name: address_pkey; Type: PK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY address
  ADD CONSTRAINT address_pkey PRIMARY KEY (id);

--
-- Name: city_pkey; Type: PK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY city
  ADD CONSTRAINT city_pkey PRIMARY KEY (id);

--
-- Name: state_pkey; Type: PK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY state
  ADD CONSTRAINT state_pkey PRIMARY KEY (id);

--
-- Name: country_pkey; Type: PK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY country
  ADD CONSTRAINT country_pkey PRIMARY KEY (id);

--
-- Name: color_pkey; Type: PK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY color
  ADD CONSTRAINT color_pkey PRIMARY KEY (id);

--
-- Name: school_color_pkey; Type: PK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY school_color
  ADD CONSTRAINT school_color_pkey PRIMARY KEY (school_id, color_id);

--
-- Name: color_type_pkey; Type: PK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY color_type
  ADD CONSTRAINT color_type_pkey PRIMARY KEY (id);

--
-- FOREIGN KEYS
--

--
-- Name: account_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account
  ADD CONSTRAINT account_school_id_fkey FOREIGN KEY (school_id) REFERENCES school(id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- Name: account_account_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account
  ADD CONSTRAINT account_account_type_id_fkey FOREIGN KEY (account_type_id) REFERENCES account_type(id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- Name: account_personal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account
  ADD CONSTRAINT account_personal_id_fkey FOREIGN KEY (personal_id) REFERENCES personal_info(id) ON UPDATE CASCADE ON DELETE RESTRICT;
  
--
-- Name: account_academic_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account
  ADD CONSTRAINT account_academic_id_fkey FOREIGN KEY (academic_id) REFERENCES academic_info(id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- Name: account_industry_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account
  ADD CONSTRAINT account_industry_id_fkey FOREIGN KEY (industry_id) REFERENCES industry_info(id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- Name: account_subject_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account_subject
  ADD CONSTRAINT account_subject_account_id_fkey FOREIGN KEY (account_id) REFERENCES account(id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- Name: account_subject_subject_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account_subject
  ADD CONSTRAINT account_subject_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES subject(id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- Name: meeting_host_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY meeting
  ADD CONSTRAINT meeting_host_id_fkey FOREIGN KEY (host_id) REFERENCES account(id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- Name: meeting_address_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY meeting
  ADD CONSTRAINT meeting_address_id_fkey FOREIGN KEY (address_id) REFERENCES address(id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- Name: account_meeting_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account_meeting
  ADD CONSTRAINT account_meeting_account_id_fkey FOREIGN KEY (account_id) REFERENCES account(id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- Name: account_meeting_meeting_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account_meeting
  ADD CONSTRAINT account_meeting_meeting_id_fkey FOREIGN KEY (meeting_id) REFERENCES meeting(id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- Name: school_admin_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY school
  ADD CONSTRAINT school_admin_id_fkey FOREIGN KEY (admin_id) REFERENCES account(id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- Name: school_address_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY school
  ADD CONSTRAINT school_address_id_fkey FOREIGN KEY (address_id) REFERENCES address(id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- Name: address_city_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY address
  ADD CONSTRAINT address_city_id_fkey FOREIGN KEY (city_id) REFERENCES city(id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- Name: city_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY city
  ADD CONSTRAINT city_state_id_fkey FOREIGN KEY (state_id) REFERENCES state(id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- Name: state_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY state
  ADD CONSTRAINT state_country_id_fkey FOREIGN KEY (country_id) REFERENCES country(id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- Name: school_color_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY school_color
  ADD CONSTRAINT school_color_school_id_fkey FOREIGN KEY (school_id) REFERENCES school(id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- Name: school_color_color_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY school_color
  ADD CONSTRAINT school_color_color_id_fkey FOREIGN KEY (color_id) REFERENCES color(id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- Name: school_color_color_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY school_color
  ADD CONSTRAINT school_color_color_type_id_fkey FOREIGN KEY (color_type_id) REFERENCES color_type(id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- Name: newsletter_account_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

--
-- TRIGGERS
--

--
-- Name: last_updated; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER last_updated
  BEFORE UPDATE ON account
  FOR EACH ROW
  EXECUTE PROCEDURE last_updated();

--
-- Name: last_updated; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER last_updated
  BEFORE UPDATE ON account_type
  FOR EACH ROW
  EXECUTE PROCEDURE last_updated();
  
--
-- Name: last_updated; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER last_updated
  BEFORE UPDATE ON personal_info
  FOR EACH ROW
  EXECUTE PROCEDURE last_updated();
  
--
-- Name: last_updated; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER last_updated
  BEFORE UPDATE ON academic_info
  FOR EACH ROW
  EXECUTE PROCEDURE last_updated();

--
-- Name: last_updated; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER last_updated
  BEFORE UPDATE ON industry_info
  FOR EACH ROW
  EXECUTE PROCEDURE last_updated();

--
-- Name: last_updated; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER last_updated
  BEFORE UPDATE ON subject
  FOR EACH ROW
  EXECUTE PROCEDURE last_updated();

--
-- Name: last_updated; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER last_updated
  BEFORE UPDATE ON account_subject
  FOR EACH ROW
  EXECUTE PROCEDURE last_updated();

--
-- Name: last_updated; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER last_updated
  BEFORE UPDATE ON meeting
  FOR EACH ROW
  EXECUTE PROCEDURE last_updated();

--
-- Name: last_updated; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER last_updated
  BEFORE UPDATE ON account_meeting
  FOR EACH ROW
  EXECUTE PROCEDURE last_updated();

--
-- Name: last_updated; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER last_updated
  BEFORE UPDATE ON school
  FOR EACH ROW
  EXECUTE PROCEDURE last_updated();

--
-- Name: last_updated; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER last_updated
  BEFORE UPDATE ON address
  FOR EACH ROW
  EXECUTE PROCEDURE last_updated();

--
-- Name: last_updated; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER last_updated
  BEFORE UPDATE ON city
  FOR EACH ROW
  EXECUTE PROCEDURE last_updated();

--
-- Name: last_updated; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER last_updated
  BEFORE UPDATE ON state
  FOR EACH ROW
  EXECUTE PROCEDURE last_updated();

--
-- Name: last_updated; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER last_updated
  BEFORE UPDATE ON country
  FOR EACH ROW
  EXECUTE PROCEDURE last_updated();

--
-- Name: last_updated; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER last_updated
  BEFORE UPDATE ON color
  FOR EACH ROW
  EXECUTE PROCEDURE last_updated();

--
-- Name: last_updated; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER last_updated
  BEFORE UPDATE ON school_color
  FOR EACH ROW
  EXECUTE PROCEDURE last_updated();

--
-- Name: last_updated; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER last_updated
  BEFORE UPDATE ON color_type
  FOR EACH ROW
  EXECUTE PROCEDURE last_updated();
