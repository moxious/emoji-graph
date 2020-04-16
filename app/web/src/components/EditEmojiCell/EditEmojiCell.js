import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import EmojiForm from 'src/components/EmojiForm'

export const QUERY = gql`
  query FIND_POST_BY_ID($id: String!) {
    emoji: emoji(id: $id) {
      id
      code
      browser
      name
      category
    }
  }
`
const UPDATE_POST_MUTATION = gql`
  mutation UpdateEmojiMutation($id: String!, $input: UpdateEmojiInput!) {
    updateEmoji(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ emoji }) => {
  const [updateEmoji, { loading, error }] = useMutation(UPDATE_POST_MUTATION, {
    onCompleted: () => {
      navigate(routes.emojis())
    },
  })

  const onSave = (input, id) => {
    updateEmoji({ variables: { id, input } })
  }

  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <header className="bg-gray-300 text-gray-700 py-3 px-4">
        <h2 className="text-sm font-semibold">Edit Emoji {emoji.id}</h2>
      </header>
      <div className="bg-gray-100 p-4">
        <EmojiForm emoji={emoji} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
