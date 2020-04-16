import { Link, routes } from '@redwoodjs/router'

import Emojis from 'src/components/Emojis'

export const QUERY = gql`
  query POSTS {
    emojis {
      id
      code
      browser
      name
      category
    }
  }
`

export const beforeQuery = (props) => {
  return { variables: props, fetchPolicy: 'cache-and-network' }
}

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="text-center">
      {'No emojis yet. '}
      <Link
        to={routes.newEmoji()}
        className="text-blue-500 underline hover:text-blue-700"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ emojis }) => {
  return <Emojis emojis={emojis} />
}
