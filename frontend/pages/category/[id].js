import Articles from '../../components/articles'
import Events from '../../components/events'
import { getCategory, getCategories } from '../../lib/api'
import Layout from '../../components/layout'

const Category = ({ category, categories }) => {
  return (
    <Layout categories={categories}>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{category.name}</h1>
          <Articles articles={category.articles} />
          <Events events={category.events} />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const categories = (await getCategories()) || []
  return {
    paths: categories.map(category => ({
      params: {
        id: category.id,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const category = (await getCategory(params.id)) || []
  const categories = (await getCategories()) || []
  return {
    props: { category, categories },
  }
}

export default Category
