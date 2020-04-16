import { Link, routes } from '@redwoodjs/router'

import Stories from 'src/components/Stories'

export const QUERY = gql`
  query POSTS {
    stories {
      id
      emojis
      Story
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
      {'No stories yet. '}
      <Link
        to={routes.newStory()}
        className="text-blue-500 underline hover:text-blue-700"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ stories }) => {
  return <Stories stories={stories} />
}
