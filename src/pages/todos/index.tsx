import { Layout } from '@/components/Layout'
import { Table } from '@/components/Table'

function About() {
  return(
    <Layout heading={'Todo List'}>
      <Table category={'todos'}/>
    </Layout>
);
}

export default About;