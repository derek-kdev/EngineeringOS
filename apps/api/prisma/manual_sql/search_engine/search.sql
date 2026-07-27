
-- ============================================================
-- EngineeringOS Universal Search Engine
-- PostgreSQL Full Text Search
-- ============================================================


ALTER TABLE "SearchIndex"
ADD COLUMN IF NOT EXISTS search_vector tsvector;



-- Populate existing records

UPDATE "SearchIndex"
SET search_vector =
to_tsvector(
'english',
coalesce(title,'')
||
' '
||
coalesce(description,'')
||
' '
||
coalesce(content,'')
);



-- Fast full text lookup

CREATE INDEX IF NOT EXISTS search_index_vector_idx

ON "SearchIndex"

USING GIN(search_vector);



-- Trigger function

CREATE OR REPLACE FUNCTION search_index_update_vector()

RETURNS trigger

LANGUAGE plpgsql

AS $$

BEGIN


NEW.search_vector :=

to_tsvector(
'english',
coalesce(NEW.title,'')
||
' '
||
coalesce(NEW.description,'')
||
' '
||
coalesce(NEW.content,'')
);


RETURN NEW;


END;

$$;



-- Trigger

DROP TRIGGER IF EXISTS search_index_vector_trigger
ON "SearchIndex";



CREATE TRIGGER search_index_vector_trigger

BEFORE INSERT OR UPDATE

ON "SearchIndex"

FOR EACH ROW

EXECUTE FUNCTION search_index_update_vector();



