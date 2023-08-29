import { History } from '@/types/types'
import { MdNavigateNext, MdOutlineEventNote } from 'react-icons/md'
import { Link } from 'react-router-dom'

type Props = {
    group: History
}

export default function HistoryCard({ group }: Props) {
    return (
        <Link
            to={group.status === 'pending' ? '' : `/history/${group.id}`}
            className={`flex items-center justify-between bg-white mb-5 shadow-main rounded-xl py-5 px-4 hover:scale-105 duration-200 ${
                group.status === 'pending' && 'animate-pulse cursor-not-allowed'
            }`}
        >
            <span>{group.title}</span>
            <div className='flex items-center gap-5'>
                <div className='flex items-center gap-2'>
                    <MdOutlineEventNote className='text-light-gray h-6 w-6' />
                    <span className='text-xs text-light-gray font-medium'>
                        {group.date}
                    </span>
                </div>
                <span
                    className={`text-xs rounded-lg px-2 py-1 border w-[75px] text-center ${
                        group.status === 'completed'
                            ? 'text-light-blue border-light-blue'
                            : group.status === 'cancelled'
                            ? 'text-light-red border-light-red'
                            : 'text-orange border-orange'
                    }`}
                >
                    {group.status}
                </span>
                <MdNavigateNext className='text-orange h-6 w-6' />
            </div>
        </Link>
    )
}
