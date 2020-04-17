MATCH (e:Emoji)
WHERE 
    e.occurrences is not null AND
    e.occurrences >= 100 
WITH e, 
 e.positive / toFloat(e.occurrences) as positiveRatio,
 e.negative / toFloat(e.occurrences) as negativeRatio

SET e.positiveRatio = positiveRatio,
e.negativeRatio = negativeRatio
RETURN count(e);

/* Recommender */

MATCH (e:Emoji { browser: "🐧" })-[:IN]->(c:Category),
(c)-[:SIMILAR*]-(c2:Category)-[:IN]-(suggestion:Emoji)

WHERE suggestion.positiveRatio is not null
and suggestion.positiveRatio >= 0.8 * e.positiveRatio AND
suggestion.positiveRatio <= 1.3 * e.positiveRatio
RETURN suggestion;

