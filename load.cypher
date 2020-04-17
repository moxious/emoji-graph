CREATE INDEX ON :Emoji(name);
CREATE INDEX ON :Emoji(column_a);
CREATE INDEX ON :Emoji(browser);
CREATE INDEX ON :Emoji(code);
CREATE INDEX ON :Category(name);

/* Raw Category list as a starting point */
LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/moxious/emoji-graph/master/category.csv' as line
MERGE (c:Category { name: line.category })
RETURN count(c);

LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/moxious/emoji-graph/master/emojis-rawcsv/all-emojis.csv' as line
WITH line
WHERE line.code is not null
MERGE (e:Emoji { code: line.code })
  ON CREATE SET
    e.name = line.cldr_short_name,
    e.column_a = line.column_a,
    e.browser = line.browser,
    e.rawSet = true
MERGE (c:Category { name: toLower(line.category) })
MERGE (e)-[:IN]->(c)
RETURN count(e);

/* Emoji Database */
LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/moxious/emoji-graph/master/emoji-database/emoji-database.csv' as line
MERGE (e:Emoji { browser: line.emoji })
  SET e.altName = coalesce(line.name, ''),
      e.codepoints = line.codepoints,
      e.emojiDatabase = true
MERGE (g:Category { name: toLower(line.group) })
   SET g.emojiDatabase = true
MERGE (sg:Category { name: toLower(line.sub_group) })
   SET g.emojiDatabase = true
MERGE (sg)-[:SIMILAR]->(g)
MERGE (e)-[:IN]->(sg)
RETURN count(e);

/* Sentiment */
LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/moxious/emoji-graph/emoji-sentiment/sentiment/Emoji_Sentiment_Data_v1.0.csv'
AS line
/* Headers:
   Emoji,Unicode codepoint,Occurrences,Position,Negative,Neutral,Positive,Unicode name,Unicode block */
MERGE (e:Emoji { browser: line.Emoji })
SET 
    e.codepoint = line.`Unicode codepoint`,
    e.occurrences = toInteger(line.Occurrences),
    e.position = toFloat(line.Position),
    e.negative = toInteger(line.Negative),
    e.neutral = toInteger(line.Neutral),
    e.positive = toInteger(line.Positive),
    e.unicodeName = toLower(line.`Unicode name`),
    e.sentiment = true
MERGE (c:Category { name: toLower(line.`Unicode block`) })
MERGE (e)-[:IN]->(c)
return count(e);

/* Compute a "positive/negative" ratio of usage */
MATCH (e:Emoji)
WHERE e.sentiment
WITH e, 
 e.positive / toFloat(e.occurrences) as positiveRatio,
 e.negative / toFloat(e.occurrences) as negativeRatio,
 e.neutral / toFloat(e.occurances) as neutralRatio
SET 
  e.positiveRatio = positiveRatio,
  e.negativeRatio = negativeRatio,
  e.neutralRatio = neutralRatio
RETURN count(e);

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
WHERE e.name =~ ('.*: ' + skinToneCategory + '.*')
MERGE (c:Category { 
  name: skinToneCategory, 
  synthetic: true,
  skinTone: true
})
MERGE (e)-[r:IN]->(c)
RETURN count(r);

/* Category Similarity */
LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/moxious/emoji-graph/master/similar.csv' as line
MERGE (a:Category { name: toLower(line.categoryA) })
MERGE (b:Category { name: toLower(line.categoryB) })
MERGE (a)-[r:SIMILAR]->(b)
RETURN count(r);

/* workers, fire fighters, officers */
MATCH (c:Category { name: "person_role" })-[]-(e:Emoji) 
where e.name =~ '.*er:.*' 
MERGE (act:Category { name: "activity", synthetic: true })
MERGE (e)-[r:IN]->(act)
RETURN count(r);

/* Colors */
WITH ['red', 'white', 'green', 'yellow', 'black', 'brown', 'pink', 'blue', 'purple', 'black'] as colors 
UNWIND colors as color
match (e:Emoji) where e.name =~ ('.*' + color + '.*')
MERGE (c:Category { name: color, synthetic: true })
MERGE (c2:Category { name: 'color' })
MERGE (c)-[:RELATED]->(c2)
MERGE (e)-[r:IN]->(c)
return count(r);

/* Create synthetic groupings */
WITH '[ \\(\\),:"-]+' as regex
MATCH (e:Emoji)
WITH e, 
   apoc.text.split(e.name, regex) as words,
   apoc.text.split(coalesce(e.altName, ''), regex) as words2,
   apoc.text.split(coalesce(e.unicodeName, ''), regex) as words3
WITH e, words + words2 + words3 as allWords
UNWIND allWords as word
WITH e, word
WHERE 
  not word in ['', 'with', 'a', 'the', 'them', 'an'] AND
  size(word) > 1 AND
  NOT word =~ '^[0-9]+'
MERGE (c:Category { name: word })
   ON CREATE SET c.synthetic = true
MERGE (e)-[r:RELATED]->(c)
RETURN count(c);
