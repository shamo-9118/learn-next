import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Main } from '@/components/Main'

import type { FunctionComponent } from 'react';

type Props = {
  children: string;
};

export const Layout: FunctionComponent<Props> = ({children}) => {
  return (
    <div className='flex flex-col'>
      <Header></Header>
      <Main>
        {children}
      </Main>
      <Footer></Footer>
    </div>
  )
}