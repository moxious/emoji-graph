import EmojisLayout from 'src/layouts/EmojisLayout'
import EmojiCell from 'src/components/EmojiCell'

const EmojiPage = ({ id }) => {
  return (
    <EmojisLayout>
      <EmojiCell id={id} />
    </EmojisLayout>
  )
}

export default EmojiPage
