import { Layout } from '@/components/Layout';
import { Article } from '@/components/Article/Article';
import { useRouter } from 'next/router'

export default function TodoPage() {
  const router = useRouter()
  const taskId = router.query.id

  return (
    <Layout heading={'Todo詳細'}>
      <Article taskId={taskId}/>
    </Layout>
  )
}