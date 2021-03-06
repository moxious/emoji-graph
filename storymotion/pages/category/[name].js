import { useRouter } from 'next/router';
import MainLayout from '../../components/MainLayout';
import EmojiList from '../../components/EmojiList';
import CategoryList from '../../components/CategoryList';
import api from '../../api';
import { Grid, Header } from 'semantic-ui-react'
import _ from 'lodash';

const EmptyList = () =>
  <div className='EmptyList'>
    <em>This category contains no emoji directly</em>; see one of the related
    categories!
  </div>

const Category = (props) => {
  const router = useRouter();

  return (
    <MainLayout>
      <Header size='huge'>Category {props.name}</Header>

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
            <CategoryList categories={_.sortBy(_.uniq(props.related.map(r => r.name)))} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </MainLayout>
  );
};

Category.getInitialProps = async function (context) {
  let emoji = [];

  try {
    emoji = await api.getEmojiByCategory(context.query.name);
  } catch (e) {
    console.error('Failed to get emoji', e);
  }

  let related = [];

  try {
    related = await api.getRelatedCategories(context.query.name);
  } catch (e) {
    console.error('Failed to get related categories', e);
  }

  return {
    emoji, related,
    name: context.query.name,
  };
};

export default Category;