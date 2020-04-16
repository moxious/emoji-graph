import StoriesLayout from 'src/layouts/StoriesLayout'
import StoryCell from 'src/components/StoryCell'

const StoryPage = ({ id }) => {
  return (
    <StoriesLayout>
      <StoryCell id={id} />
    </StoriesLayout>
  )
}

export default StoryPage
