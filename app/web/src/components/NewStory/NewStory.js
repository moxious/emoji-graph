import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import StoryForm from 'src/components/StoryForm'

const CREATE_POST_MUTATION = gql`
  mutation CreateStoryMutation($input: CreateStoryInput!) {
    createStory(input: $input) {
      id
    }
  }
`

const NewStory = () => {
  const [createStory, { loading, error }] = useMutation(CREATE_POST_MUTATION, {
    onCompleted: () => {
      navigate(routes.stories())
    },
  })

  const onSave = (input) => {
    createStory({ variables: { input } })
  }

  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <header className="bg-gray-300 text-gray-700 py-3 px-4">
        <h2 className="text-sm font-semibold">New Story</h2>
      </header>
      <div className="bg-gray-100 p-4">
        <StoryForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewStory
