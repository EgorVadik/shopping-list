import { BsSearch } from 'react-icons/bs'

type Props = {
    search: string
    setSearch: (search: string) => void
}

export default function SearchBar({ search, setSearch }: Props) {
    return (
        <div className='flex items-center justify-center'>
            <div className='relative'>
                <input
                    type='text'
                    placeholder='search item'
                    className='bg-white h-12 px-5 pl-10 rounded-xl text-sm focus:outline-none shadow-main font-medium'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type='submit' className='absolute left-3 top-4'>
                    <BsSearch className='h-4 w-4 fill-current' />
                </button>
            </div>
        </div>
    )
}
