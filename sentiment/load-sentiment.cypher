LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/moxious/emoji-graph/emoji-sentiment/sentiment/Emoji_Sentiment_Data_v1.0.csv'
AS line

// Headers:
// Emoji,Unicode codepoint,Occurrences,Position,Negative,Neutral,Positive,Unicode name,Unicode block

MERGE (e:Emoji { browser: line.Emoji })
SET 
    e.codepoint = line.`Unicode codepoint`,
    e.occurrences = toInteger(line.Occurrences),
    e.position = toFloat(line.Position),
    e.negative = toInteger(line.Negative),
    e.neutral = toInteger(line.Neutral),
    e.positive = toInteger(line.Positive),
    e.unicodeName = line.`Unicode name`
MERGE (c:Category { name: line.`Unicode block` })
MERGE (e)-[:IN]->(c)
return count(e);