import Story from 'src/components/Story'

export const QUERY = gql`
  query FIND_POST_BY_ID($id: String!) {
    story: story(id: $id) {
      id
      emojis
      Story
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Story not found</div>

export const Success = ({ story }) => {
  return <Story story={story} />
}
