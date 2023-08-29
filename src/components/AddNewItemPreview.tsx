import { MdKeyboardBackspace } from 'react-icons/md'
import PreviewText from './PreviewText'
import AddNewItemBtns from './AddNewItemBtns'
import { useAtom } from 'jotai'
import { itemsAtom, newItemAtom } from '@/state/atoms'
import { categories } from '@/data/categories'
import { getCategories, setCategories } from '@/lib/localStorage'

type Props = {
    setShoppingListOpen: React.Dispatch<React.SetStateAction<boolean>>
    setPreviewItemOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddNewItemPreview({
    setPreviewItemOpen,
    setShoppingListOpen,
}: Props) {
    const [newItem, setNewItem] = useAtom(newItemAtom)
    const [, setItemsData] = useAtom(itemsAtom)

    return (
        <div className='sticky p-5 top-0 right-0'>
            <div className='flex flex-col justify-between ml-4 h-[calc(100vh-80px)]'>
                <div className='space-y-4'>
                    <button
                        className='flex items-center gap-2 text-orange'
                        onClick={() => setPreviewItemOpen(false)}
                    >
                        <MdKeyboardBackspace />
                        back
                    </button>
                    {newItem.imageUrl ? (
                        <img
                            src={newItem.imageUrl}
                            onError={(e) => {
                                e.currentTarget.src =
                                    'https://picsum.photos/300/215'
                            }}
                            alt={newItem.name}
                            className='rounded-3xl'
                        />
                    ) : (
                        <div className='md:w-[300px] h-[215px] bg-light-gray rounded-3xl' />
                    )}
                    <div className='space-y-6'>
                        <PreviewText label='name' value={newItem.name} />
                        <PreviewText
                            label='category'
                            value={newItem.category}
                            textSm
                        />
                        {newItem.note && (
                            <PreviewText
                                label='note'
                                value={newItem.note}
                                className='line-clamp-[10]'
                                textSm
                            />
                        )}
                    </div>
                </div>

                <AddNewItemBtns
                    cancelHandler={() => {
                        setShoppingListOpen(true)
                        setPreviewItemOpen(false)
                        setNewItem({
                            name: '',
                            category: '',
                            note: undefined,
                            imageUrl: undefined,
                        })
                    }}
                    cancelText='delete'
                    submitHandler={() => {
                        setItemsData((prev) => {
                            const id = `${crypto.randomUUID()}`
                            const newItemToAdd = {
                                id,
                                name: newItem.name,
                            }
                            if (prev === null) {
                                return {
                                    [newItem.category]: [newItemToAdd],
                                }
                            }

                            if (prev[newItem.category]) {
                                return {
                                    ...prev,
                                    [newItem.category]: [
                                        ...prev[newItem.category],
                                        newItemToAdd,
                                    ],
                                }
                            }

                            return {
                                ...prev,
                                [newItem.category]: [newItemToAdd],
                            }
                        })
                        setShoppingListOpen(true)
                        setPreviewItemOpen(false)
                        setNewItem({
                            name: '',
                            category: '',
                            note: undefined,
                            imageUrl: undefined,
                        })
                        if (!categories.includes(newItem.category)) {
                            const localCategories = getCategories()
                            localCategories!.push(newItem.category)
                            setCategories(localCategories!)
                        }
                    }}
                    submitText='Add to list'
                />
            </div>
        </div>
    )
}
