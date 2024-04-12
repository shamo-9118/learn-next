import { fetchDataJsonPlaceholder } from "@/hooks/fetchDataJsonPlaceholder";
import type { FunctionComponent } from 'react';
type Props = {
  children: string;
};

export const Main: FunctionComponent<Props> = ({children}) => {
  const contentList = ['aaa','aaa','aaa','aaa','aaa','aaa','aaa','aaa','aaa','aaa','aaa',]
  return (
    <main className='h-[90vh] max-w-[860px] px-6 pt-8'>
      <p>{ children }</p>
      <button className="border-[#20232a] rounded-[12px] border-[3px] py-2 px-4 hover:bg-[#20232a] hover:text-white font-medium duration-200" onClick={fetchDataJsonPlaceholder}>データ取得</button>
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