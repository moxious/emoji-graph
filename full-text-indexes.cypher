/* https://neo4j.com/docs/cypher-manual/current/administration/indexes-for-full-text-search/#administration-indexes-fulltext-search-manage */
CALL db.index.fulltext.createNodeIndex(
    "emojisAndNames",
    ["Emoji"],
    ["name", "altName", "unicodeName", "emoji"]
);

CALL db.index.fulltext.createNodeIndex(
    "categoryNames",
    ["Category"],
    ["name"]
);