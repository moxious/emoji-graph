import { useRouter } from 'next/router';
import MainLayout from '../../components/MainLayout';
import EmojiList from '../../components/EmojiList';
import CategoryList from '../../components/CategoryList';
import api from '../../api';
import { Grid } from 'semantic-ui-react'

const EmptyList = () =>
  <div className='EmptyList'>
    <em>This category contains no emoji directly</em>; see one of the related
    categories!
  </div>

const Category = (props) => {
  const router = useRouter();

  return (
    <MainLayout>
      <h1>Category: {props.name}</h1>

      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <h2>Emojis in This Category</h2>

            { props.emoji.length ? 
              <EmojiList emojis={props.emoji} /> : 
              <EmptyList/> }
          </Grid.Column>
          <Grid.Column>
            <h2>Related Categories</h2>
            <CategoryList categories={props.related.map(r => r.name)} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </MainLayout>
  );
};

Category.getInitialProps = async function (context) {
  let emoji = [];

  try {
    const res = await api.getEmojiByCategory(context.query.name);
    emoji = await res.json();
  } catch (e) {
    console.error('Failed to get emoji', e);
  }

  let related = [];

  try {
    const relResponse = await api.getRelatedCategories(context.query.name);
    related = await relResponse.json();
  } catch (e) {
    console.error('Failed to get related categories', e);
  }

  return {
    emoji, related,
    name: context.query.name,
  };
};

export default Category;