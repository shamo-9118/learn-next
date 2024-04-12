export const Main = () => {
  const contentList = ['aaa','aaa','aaa','aaa','aaa','aaa','aaa','aaa','aaa','aaa','aaa',]
  return (
    <main className='h-[90vh] px-6 pt-8'>
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