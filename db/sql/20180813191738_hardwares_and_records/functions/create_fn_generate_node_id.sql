-- find the first available node id for hardware registration
CREATE OR REPLACE FUNCTION fn_generate_node_id(
	OUT node_id INTEGER
)
LANGUAGE plpgsql
AS $$
<<baseblock>>
BEGIN

--	find all available node id, and return the first one
	SELECT "s"."i"
	FROM GENERATE_SERIES( 1,254 ) s( i )
	WHERE NOT EXISTS ( SELECT 1 FROM "hardwares" WHERE "hardwares"."node" = "s"."i" )
	LIMIT 1
	INTO node_id;

END;
$$
