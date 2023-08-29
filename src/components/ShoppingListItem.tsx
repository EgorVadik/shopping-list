import { Cart } from '@/types/types'
import { MdDeleteOutline } from 'react-icons/md'
import { FaMinus } from 'react-icons/fa'
import { BsCheck2, BsPlusLg } from 'react-icons/bs'

type Props = {
    value: Cart[]
    editingState: boolean
    updateItem: (id: string, quantity: 1 | -1) => void
    deleteItem: (id: string) => void
    updateItemStatus: (id: string) => void
}

export default function ShoppingListItem({
    value,
    editingState,
    updateItem,
    deleteItem,
    updateItemStatus,
}: Props) {
    return value.map((item) => (
        <div
            key={item.id}
            className='px-5 py-3 flex items-center justify-between gap-2 group'
        >
            <div className='flex items-center gap-2 relative cursor-pointer'>
                {editingState && (
                    <>
                        <input
                            id={item.id}
                            type='checkbox'
                            className='sr-only peer'
                            onChange={() => updateItemStatus(item.id)}
                            checked={item.completed}
                        />
                        <BsCheck2 className='text-orange opacity-0 peer-checked:opacity-100 duration-200 absolute left-1 z-0' />
                    </>
                )}
                <label
                    htmlFor={item.id}
                    className={`flex gap-2 font-medium text-lg select-none ${
                        editingState &&
                        'cursor-pointer before:content-[""] before:w-6 before:h-6 before:rounded before:border-2 before:border-orange before:flex before:items-center before:justify-center z-10'
                    } ${item.completed && 'line-through'}`}
                >
                    {item.name}
                </label>
            </div>
            {!editingState && (
                <div className='bg-white hidden group-hover:flex items-center gap-2 rounded-xl'>
                    <button
                        className='bg-orange rounded-xl px-2 py-3'
                        onClick={() => deleteItem(item.id)}
                    >
                        <MdDeleteOutline className='text-white h-[18px] w-[18px]' />
                    </button>
                    <button onClick={() => updateItem(item.id, -1)}>
                        <FaMinus className='text-orange h-6 w-6' />
                    </button>
                    <span
                        className={`border-2 border-orange rounded-full px-4 py-1 text-orange text-xs font-bold`}
                    >
                        {item.quantity} pcs
                    </span>
                    <button onClick={() => updateItem(item.id, 1)}>
                        <BsPlusLg className='text-orange h-6 w-6' />
                    </button>
                </div>
            )}
            <span
                className={`border-2 border-orange rounded-full px-4 py-1 text-orange text-xs font-bold ${
                    !editingState && 'group-hover:hidden'
                }`}
            >
                {item.quantity} pcs
            </span>
        </div>
    ))
}
