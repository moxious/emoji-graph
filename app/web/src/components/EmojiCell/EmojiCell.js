import Emoji from 'src/components/Emoji'

export const QUERY = gql`
  query FIND_POST_BY_ID($id: String!) {
    emoji: emoji(id: $id) {
      id
      column_a
      code
      browser
      name
      category
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Emoji not found</div>

export const Success = ({ emoji }) => {
  return <Emoji emoji={emoji} />
}
