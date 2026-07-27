CREATE TABLE IF NOT EXISTS "SearchIndex" (

    id TEXT PRIMARY KEY,

    "entityType" TEXT NOT NULL,

    "entityId" TEXT NOT NULL,

    "organizationId" TEXT,

    title TEXT NOT NULL,

    description TEXT,

    visibility TEXT NOT NULL DEFAULT 'ORG',

    metadata JSONB,

    search_vector TSVECTOR

);


CREATE INDEX IF NOT EXISTS search_index_vector_idx

ON "SearchIndex"

USING GIN(search_vector);



CREATE INDEX IF NOT EXISTS search_index_org_idx

ON "SearchIndex"("organizationId");



CREATE INDEX IF NOT EXISTS search_index_entity_idx

ON "SearchIndex"("entityType", "entityId");



CREATE INDEX IF NOT EXISTS search_index_visibility_idx

ON "SearchIndex"(visibility);



CREATE OR REPLACE FUNCTION update_search_vector()

RETURNS trigger AS $$

BEGIN

NEW.search_vector :=

setweight(
to_tsvector(
'english',
coalesce(NEW.title,'')
),
'A'
)

||

setweight(
to_tsvector(
'english',
coalesce(NEW.description,'')
),
'B'
)

||

setweight(
to_tsvector(
'english',
coalesce(NEW.metadata::text,'')
),
'C'
);


RETURN NEW;

END

$$ LANGUAGE plpgsql;



DROP TRIGGER IF EXISTS search_vector_update

ON "SearchIndex";



CREATE TRIGGER search_vector_update

BEFORE INSERT OR UPDATE

ON "SearchIndex"

FOR EACH ROW

EXECUTE FUNCTION update_search_vector();

