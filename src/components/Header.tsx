import Link from 'next/link'

export const Header = () => {
  const headerNavList = ['todos', 'users', 'contact']
  return (
    <header className='py-6 px-5 bg-[#20232a] text-white'>
      <div className='flex justify-between max-w-[860px] mx-auto'>
        <Link href={'/'} className='text-2xl font-medium'>My Page</Link>
        <nav className='text-xl flex gap-4'>
          {
            headerNavList.map((navText) => (
              <Link href={`/${navText}`} key={navText} className='hover:underline'>{navText}</Link>
            ))
          }
        </nav>
      </div>
    </header>
  )
}