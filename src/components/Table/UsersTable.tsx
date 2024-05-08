import { table } from 'console';
import { createPrivateKey } from 'crypto';
import { useEffect, useState } from 'react';
import Link from 'next/link';

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

export const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [usersKey, setUsersKey] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users',
        );
        const data: User[] = await response.json();
        setUsers(data);
        if (!response.ok) {
          throw new Error(`ネットワークエラー:  ${response.status}`);
        }
      } catch (error) {
        console.error(`データの取得ができませんでした`, error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getProps = <T extends Record<string, unknown>[]>(users: T): void => {
      let updatedKeys: string[] = [];
      for (const key in users[0]) {
        const bool = typeof users[0][key] !== 'object';
        if (bool) {
          updatedKeys = [...updatedKeys, key];
        }
      }
      setUsersKey([...updatedKeys]);
    };

    getProps(users);
  }, [users]);

  const userDataList = users.map((user) => ({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
    website: user.website,
  }));

  return (
    <table className='border-2 w-full'>
      <thead className='border-2 text-center'>
        <tr className='bg-[#bfdcff] font-medium'>
          {usersKey.map((userKey, index) => {
            return (
              <td className='border-2 text-center p-3' key={index}>
                {userKey}
              </td>
            );
          })}
        </tr>
      </thead>
      <tbody className='border-2'>
        {userDataList.map((user) => {
          return (
            <tr className='border-2 p-3' key={user.id}>
              <td className='border-2 p-3 text-center'>{user.id}</td>
              <td className='border-2 p-3 text-center'>
                <Link href={`users/${encodeURIComponent(user.id)}`}>
                  {user.name}
                </Link>
              </td>
              <td className='border-2 p-3 text-center'>{user.username}</td>
              <td className='border-2 p-3 text-center'>{user.email}</td>
              <td className='border-2 p-3 text-center'>{user.phone}</td>
              <td className='border-2 p-3'>{user.website}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
