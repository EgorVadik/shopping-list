import { TopItemType } from '@/types/types'
import { Progress } from './ui/progress'

type Props = {
    title: string
    items: TopItemType[]
    color: 'orange' | 'blue'
}

export default function TopValues({ title, items, color }: Props) {
    return (
        <div className='w-full'>
            <p className='text-2xl font-medium'>{title}</p>
            <div className='space-y-5 mt-10'>
                {items.map((item) => (
                    <div key={item.name} className='flex flex-col gap-2'>
                        <div className='flex items-center justify-between font-medium'>
                            <span className='text-sm'>{item.name}</span>
                            <span className='text-lg'>{item.percentage}%</span>
                        </div>
                        <Progress
                            value={item.percentage}
                            className={'bg-[#E0E0E0] h-2 '}
                            color={color}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
