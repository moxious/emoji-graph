CREATE INDEX ON :Emoji(name);
CREATE INDEX ON :Emoji(column_a);
CREATE INDEX ON :Emoji(browser);
CREATE INDEX ON :Emoji(code);
CREATE INDEX ON :Category(name);

LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/moxious/emoji-graph/master/all-emojis.csv' as line
WITH line
WHERE line.code is not null
MERGE (e:Emoji { code: line.code })
  ON CREATE SET
    e.name = line.cldr_short_name,
    e.column_a = line.column_a,
    e.browser = line.browser
MERGE (c:Category { name: line.category })
MERGE (e)-[:IN]->(c)
RETURN count(e);

LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/moxious/emoji-graph/master/category.csv' as line
MERGE (c:Category { name: line.category })
RETURN count(c);


LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/moxious/emoji-graph/master/similar.csv' as line
MERGE (a:Category { name: line.categoryA })
MERGE (b:Category { name: line.categoryB })
MERGE (a)-[r:SIMILAR]->(b)
RETURN count(r);

/* Create synthetic groupings */
MATCH (e:Emoji)
WITH e, apoc.text.split(e.name, '[" \\(\\),:-]+') as words
UNWIND words as word
WITH e, word
WHERE not word in ['', 'with', 'a', 'the', 'them', 'an']
MERGE (c:Category { name: word })
   ON CREATE SET c.synthetic = true
MERGE (e)-[r:RELATED]->(c)
RETURN count(r);

/* Special case categories */
WITH [
  'light skin tone',
  'medium-light skin tone',
  'medium skin tone',
  'medium-dark skin tone',
  'dark skin tone'
] as skinToneCategories
UNWIND skinToneCategories as skinToneCategory
MATCH (e:Emoji)
WHERE e.name =~ '.*: ' + skinToneCategory + '.*'
MERGE (c:Category { name: skinToneCategory })
MERGE (e)-[r:IN]->(c)
RETURN count(r);

/* workers, fire fighters, officers */
MATCH (c:Category { name: "person_role" })-[]-(e:Emoji) 
where e.name =~ '.*er:.*' 
MERGE (act:Category { name: "activity" })
MERGE (e)-[r:IN]->(act)
RETURN count(r);
