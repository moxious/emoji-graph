WITH ['activity', 'sport'] as cats
MATCH (c:Category) where c.name in cats
WITH c
MATCH (c)<-[:IN]-(e:Emoji)
OPTIONAL MATCH (c)-[:SIMILAR]-(c2:Category)-[:IN]-(e2:Emoji)
WITH collect(e) + collect(e2) as allMatches
UNWIND allMatches as emoji
return distinct(emoji).browser, emoji.name;