import EmojisLayout from 'src/layouts/EmojisLayout'
import EditEmojiCell from 'src/components/EditEmojiCell'

const EditEmojiPage = ({ id }) => {
  return (
    <EmojisLayout>
      <EditEmojiCell id={id} />
    </EmojisLayout>
  )
}

export default EditEmojiPage
