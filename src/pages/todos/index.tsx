import { Layout } from '@/components/Layout';
import { TodoWrapper } from '@/components/TodoWrapper';

function About() {
  return (
    <Layout heading={'Todo List'}>
      <TodoWrapper />
    </Layout>
  );
}

export default About;
