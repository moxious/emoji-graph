import StoriesLayout from 'src/layouts/StoriesLayout'
import EditStoryCell from 'src/components/EditStoryCell'

const EditStoryPage = ({ id }) => {
  return (
    <StoriesLayout>
      <EditStoryCell id={id} />
    </StoriesLayout>
  )
}

export default EditStoryPage
