import { useState, useEffect} from 'react'

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
      }
    },
    phone: string;
    website: string;
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    }
};

type Props = {
  userId: string | string[] | undefined;
}

export const UserArticle = (props: Props) => {
  const [userData, setUserData] = useState<User>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  useEffect(()=>{
    const fetchTaskData = async () => {
      try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${props.userId}`)
        if (!response.ok) {
          throw new Error(`ネットワークエラー:  ${response.status}`)
        }
        const data: User = await response.json()
        console.log(data)
        setUserData(data)
      } catch (error) {
        console.error('データを取得できませんでした:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTaskData()
  },[])

  return (
    <div>
      <table>
      </table>
    </div>
  )
}