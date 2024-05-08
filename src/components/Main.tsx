import { TodoTable } from '@/components/Table/TodoTable';

import type { ReactNode } from 'react';
type Props = {
  heading: string;
  children: ReactNode;
};

export const Main = (props: Props) => {
  return (
    <main className='max-w-[860px] w-full mx-auto px-6 py-8'>
      <h2 className='text-4xl mb-8'>{props.heading}</h2>
      {props.children}
    </main>
  );
};
