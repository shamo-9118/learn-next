import { useState, useEffect } from 'react';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

type Props = {
  userId: string | string[] | undefined;
};

export const UserArticle = (props: Props) => {
  const [userData, setUserData] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${props.userId}`,
        );
        if (!response.ok) {
          throw new Error(`ネットワークエラー:  ${response.status}`);
        }
        const data: User = await response.json();
        console.log(data);
        setUserData(data);
      } catch (error) {
        console.error('データを取得できませんでした:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTaskData();
  }, []);

  return (
    <div>
      <table className='border border-slate-300 py-4 px-6 w-full'>
        <tr>
          <th
            className='border border-slate-300 bg-slate-400 py-4 px-6'
            colSpan={3}
          >
            ID
          </th>
          <td className='border border-slate-300 py-4 px-6 w-full'>
            {typeof userData?.id !== 'undefined'
              ? userData.id
              : 'データがありませんでした'}
          </td>
        </tr>
        <tr>
          <th
            className='border border-slate-300 bg-slate-400 py-4 px-6'
            colSpan={3}
          >
            名前
          </th>
          <td className='border border-slate-300 py-4 px-6 w-full'>
            {typeof userData?.name !== 'undefined'
              ? userData.name
              : 'データがありませんでした'}
          </td>
        </tr>
        <tr>
          <th
            className='border border-slate-300 bg-slate-400 py-4 px-6'
            colSpan={3}
          >
            アカウント名
          </th>
          <td className='border border-slate-300 py-4 px-6 w-full'>
            {typeof userData?.username !== 'undefined'
              ? userData.username
              : 'データがありませんでした'}
          </td>
        </tr>
        <tr>
          <th
            className='border border-slate-300 bg-slate-400 py-4 px-6'
            colSpan={3}
          >
            メールアドレス
          </th>
          <td className='border border-slate-300 py-4 px-6 w-full'>
            {typeof userData?.email !== 'undefined'
              ? userData.email
              : 'データがありませんでした'}
          </td>
        </tr>
        <tr>
          <th
            className='border border-slate-300 bg-slate-400 py-4 px-6'
            rowSpan={7}
          >
            住所
          </th>
          <th
            colSpan={2}
            className='border border-slate-300 bg-slate-400 py-4 px-6'
          >
            street
          </th>
          <td className='border border-slate-300 py-4 px-6 w-full'>
            {typeof userData?.address.street !== 'undefined'
              ? userData.address.street
              : 'データがありませんでした'}
          </td>
        </tr>
        <tr>
          <th
            colSpan={2}
            className='border border-slate-300 bg-slate-400 py-4 px-6'
          >
            suite
          </th>
          <td className='border border-slate-300 py-4 px-6 w-full'>
            {typeof userData?.address.suite !== 'undefined'
              ? userData.address.suite
              : 'データがありませんでした'}
          </td>
        </tr>
        <tr>
          <th
            colSpan={2}
            className='border border-slate-300 bg-slate-400 py-4 px-6'
          >
            city
          </th>
          <td className='border border-slate-300 py-4 px-6 w-full'>
            {typeof userData?.address.city !== 'undefined'
              ? userData.address.city
              : 'データがありませんでした'}
          </td>
        </tr>
        <tr>
          <th
            colSpan={2}
            className='border border-slate-300 bg-slate-400 py-4 px-6'
          >
            zipcode
          </th>
          <td className='border border-slate-300 py-4 px-6 w-full'>
            {typeof userData?.address.zipcode !== 'undefined'
              ? userData.address.zipcode
              : 'データがありませんでした'}
          </td>
        </tr>
        <tr>
          <th
            className='border border-slate-300 bg-slate-400 py-4 px-6'
            rowSpan={2}
          >
            geo
          </th>
          <th className='border border-slate-300 bg-slate-400 py-4 px-6'>
            lat
          </th>
          <td className='border border-slate-300 py-4 px-6 w-full'>
            {typeof userData?.address.geo.lat !== 'undefined'
              ? userData.address.geo.lat
              : 'データがありませんでした'}
          </td>
        </tr>
        <tr>
          <th className='border border-slate-300 bg-slate-400 py-4 px-6'>
            lng
          </th>
          <td className='border border-slate-300 py-4 px-6 w-full'>
            {typeof userData?.address.geo.lng !== 'undefined'
              ? userData.address.geo.lng
              : 'データがありませんでした'}
          </td>
        </tr>
      </table>
    </div>
  );
};
