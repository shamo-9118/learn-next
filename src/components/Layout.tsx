import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Main } from '@/components/Main'

import type { FunctionComponent } from 'react';

type Props = {
  heading: string;
  children: React.ReactNode;
};

export const Layout: FunctionComponent<Props> = (props) => {
  return (
    <div className='flex flex-col'>
      <Header/>
      <Main heading={props.heading}>
        {props.children}
      </Main>
      <Footer/>
    </div>
  )
}