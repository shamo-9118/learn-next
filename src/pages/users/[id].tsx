import { Layout } from '../../components/Layout';
import { UserArticle } from '../../components/UserArticle';
import { useRouter } from 'next/router';

export default function UserPage() {
  const router = useRouter();
  const userId = router.query.id;

  return (
  <Layout heading={'User詳細'}>
    <UserArticle userId={userId}></UserArticle>
  </Layout>
)
}