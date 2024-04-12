import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Main } from '@/components/Main'

export const Layout = () => {
  return (
    <div className='flex flex-col'>
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </div>
  )
}