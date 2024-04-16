import { Layout } from '@/components/Layout'
import { Table } from '@/components/Table/TodoTable'
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Layout heading={'Index'}>
        <Table />
      </Layout>
    </>
  );
}
