import { Product } from '@/types/types'
import { FiPlus } from 'react-icons/fi'

type Props = {
    value: Product[]
    category: string
    handleAddItem: (item: string, key: string) => void
}

export default function ListItem({ value, category, handleAddItem }: Props) {
    return (
        <div className='flex flex-wrap xl:gap-x-4 lg:gap-x-1 xs:gap-x-4 gap-x-1 gap-y-10 mt-7 2xl:justify-normal justify-center'>
            {value.map((item) => (
                <button
                    key={item.id}
                    className='bg-white rounded-xl lg:min-w-[180px] lg:max-w-[180px] min-w-[140px] max-w-[140px] px-5 py-3 flex flex-row justify-between shadow-main gap-2 hover:bg-lighter-gray duration-300 group h-fit'
                    onClick={() => handleAddItem(item.name, category)}
                >
                    <span className='font-medium'>{item.name}</span>
                    <FiPlus className='text-light-gray min-w-[24px] min-h-[24px] group-hover:text-dark-gray duration-300' />
                </button>
            ))}
        </div>
    )
}
