export const schema = gql`
  type Emoji {
    id: String!
    column_a: Int!
    code: String!
    browser: String!
    name: String!
    category: String!
  }

  type Query {
    emojis: [Emoji!]!
    emoji(id: String!): Emoji!
  }

  input CreateEmojiInput {
    column_a: Int!
    code: String!
    browser: String!
    name: String!
    category: String!
  }

  input UpdateEmojiInput {
    column_a: Int
    code: String
    browser: String
    name: String
    category: String
  }

  type Mutation {
    createEmoji(input: CreateEmojiInput!): Emoji!
    updateEmoji(id: String!, input: UpdateEmojiInput!): Emoji!
    deleteEmoji(id: String!): Emoji!
  }
`
