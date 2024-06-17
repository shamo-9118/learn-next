import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Main } from '@/components/Main';
import { Props } from '@/types/props';

import type { FunctionComponent } from 'react';

export const Layout: FunctionComponent<Props> = (props) => {
  return (
    <div className='flex flex-col justify-between h-full min-h-[100vh]'>
      <div className='flex-1'>
        <Header />
        <Main heading={props.heading}>{props.children}</Main>
      </div>
      <Footer />
    </div>
  );
};
