import { Layout } from '@/components/Layout'
import { Table } from '@/components/Table'

function Blog() {
  return (
    <Layout heading={'User List'}>
      <Table category={'users'} />
    </Layout>
  )
}

export default Blog;