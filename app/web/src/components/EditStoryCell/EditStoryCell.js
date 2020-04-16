import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import StoryForm from 'src/components/StoryForm'

export const QUERY = gql`
  query FIND_POST_BY_ID($id: String!) {
    story: story(id: $id) {
      id
      emojis
      Story
    }
  }
`
const UPDATE_POST_MUTATION = gql`
  mutation UpdateStoryMutation($id: String!, $input: UpdateStoryInput!) {
    updateStory(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ story }) => {
  const [updateStory, { loading, error }] = useMutation(UPDATE_POST_MUTATION, {
    onCompleted: () => {
      navigate(routes.stories())
    },
  })

  const onSave = (input, id) => {
    updateStory({ variables: { id, input } })
  }

  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <header className="bg-gray-300 text-gray-700 py-3 px-4">
        <h2 className="text-sm font-semibold">Edit Story {story.id}</h2>
      </header>
      <div className="bg-gray-100 p-4">
        <StoryForm story={story} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
