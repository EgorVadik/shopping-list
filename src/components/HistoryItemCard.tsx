import { Cart } from '@/types/types'

type Props = {
    value: Cart[]
}

export default function HistoryItemCard({ value }: Props) {
    return (
        <div className='flex flex-wrap gap-x-4 gap-y-10 mt-7'>
            {value.map((item) => (
                <div
                    key={item.id}
                    className='bg-white rounded-xl lg:min-w-[180px] lg:max-w-[180px] min-w-[140px] max-w-[140px] px-5 py-3 flex flex-row justify-between shadow-main gap-2 hover:bg-lighter-gray duration-300 group h-fit'
                >
                    <span className='font-medium'>{item.name}</span>
                    <span className='text-orange font-medium text-sm whitespace-nowrap'>
                        {item.quantity} pcs
                    </span>
                </div>
            ))}
        </div>
    )
}
