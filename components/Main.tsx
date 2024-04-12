import type { FunctionComponent } from 'react';

type Props = {
  children: string;
};

export const Main: FunctionComponent<Props> = ({children}) => {
  const contentList = ['aaa','aaa','aaa','aaa','aaa','aaa','aaa','aaa','aaa','aaa','aaa',]
  return (
    <main className='h-[90vh] px-6 pt-8'>
      <p>{ children }</p>
      <ul>
        {
          contentList.map((content, index) => (
            <li key={index}>{content}</li>
          ))
        }
      </ul>
    </main>
  )
}