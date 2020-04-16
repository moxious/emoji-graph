import MainLayout from 'src/layouts/MainLayout'
import emoji from 'src/emoji';
import EmojiMatrix from 'src/components/EmojiMatrix'
import StoriesCell from 'src/components/StoriesCell';
import { Header } from 'semantic-ui-react'

const HomePage = () => {
  const matrix = emoji.matrix();

  return (
    <MainLayout>
      <Header as='h1'>Home</Header>

      <p>What do you see?</p>

      <EmojiMatrix matrix={emoji.matrix()} />

      <StoriesCell />
    </MainLayout>
  )
}

export default HomePage
