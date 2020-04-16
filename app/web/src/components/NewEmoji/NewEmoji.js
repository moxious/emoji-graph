import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import EmojiForm from 'src/components/EmojiForm'

const CREATE_POST_MUTATION = gql`
  mutation CreateEmojiMutation($input: CreateEmojiInput!) {
    createEmoji(input: $input) {
      id
    }
  }
`

const NewEmoji = () => {
  const [createEmoji, { loading, error }] = useMutation(CREATE_POST_MUTATION, {
    onCompleted: () => {
      navigate(routes.emojis())
    },
  })

  const onSave = (input) => {
    createEmoji({ variables: { input } })
  }

  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <header className="bg-gray-300 text-gray-700 py-3 px-4">
        <h2 className="text-sm font-semibold">New Emoji</h2>
      </header>
      <div className="bg-gray-100 p-4">
        <EmojiForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewEmoji
