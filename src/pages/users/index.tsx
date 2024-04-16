import { Layout } from '@/components/Layout'
import { UsersTable } from '@/components/Table/UsersTable'

function Blog() {
  return (
    <Layout heading={'User List'}>
      <UsersTable />
    </Layout>
  )
}

export default Blog;