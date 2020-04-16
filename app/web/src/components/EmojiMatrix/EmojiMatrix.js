import { Card, Header } from 'semantic-ui-react'
import emoji from 'src/emoji';

const cell = entry =>
  <Card>
    <Header size='huge'>{entry}</Header>
    <Card.Content>
      { emoji.details(entry).name }
    </Card.Content>
  </Card>;

const row = (matrix, key) =>
  <div key={key}>
    { cell(matrix[0]) }
    { cell(matrix[1]) }
    { cell(matrix[2]) }
  </div>

const EmojiMatrix = ({ matrix }) => {
  return (
    <Card.Group itemsPerRow={3} className='EmojiMatrix'>
    {
      matrix.map((r,i) => row(r,i))
    }
    </Card.Group>
  )
}

export default EmojiMatrix
