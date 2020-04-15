MATCH (e:Emoji) 
WITH collect(e.browser) as emoji 
WITH apoc.coll.shuffle(emoji) as randomized
return {
    row1: randomized[0..3],
    row2: randomized[3..7],
    row3: randomized[7..10]
 } as matrix;