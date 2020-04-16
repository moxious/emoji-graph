export const schema = gql`
  type Story {
    id: String!
    emojis: String!
    Story: String!
  }

  type Query {
    stories: [Story!]!
    story(id: String!): Story!
  }

  input CreateStoryInput {
    emojis: String!
    Story: String!
  }

  input UpdateStoryInput {
    emojis: String
    Story: String
  }

  type Mutation {
    createStory(input: CreateStoryInput!): Story!
    updateStory(id: String!, input: UpdateStoryInput!): Story!
    deleteStory(id: String!): Story!
  }
`
