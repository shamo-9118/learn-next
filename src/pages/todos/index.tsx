import { Layout } from '@/components/Layout'
import { TodoTable } from '@/components/Table/TodoTable'

function About() {
  return(
    <Layout heading={'Todo List'}>
      <TodoTable />
    </Layout>
);
}

export default About;