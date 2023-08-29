import { ShoppingList } from '@/types/types'
import HistoryItemCard from './HistoryItemCard'

type Props = {
    items: ShoppingList
}

export default function HistoryItemContainer({ items }: Props) {
    return Object.entries(items).map(([key, value]) => (
        <div key={key}>
            <h1 className='text-lg text-darker-gray font-medium mt-20'>
                {key}
            </h1>
            <HistoryItemCard value={value} />
        </div>
    ))
}
