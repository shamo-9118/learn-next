import type { Props } from '@/types/props';

export const Main = (props: Props) => {
  return (
    <main className='max-w-[860px] w-full mx-auto px-6 py-8'>
      <h2 className='text-4xl mb-8'>{props.heading}</h2>
      {props.children}
    </main>
  );
};
