// import { categories } from '@/data/categories'
import { getCategories } from '@/lib/localStorage'
import Input from './Input'
import { newItemAtom } from '@/state/atoms'
import { useAtom } from 'jotai'
import { ScrollArea } from './ui/scroll-area'

type Props = {
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void
}

export default function SelectCategory({ handleChange }: Props) {
    const [newItem, setNewItem] = useAtom(newItemAtom)
    const categories = getCategories()

    return (
        <div className='group' tabIndex={0}>
            <Input
                label='Category'
                placeholder='Enter a category'
                className=''
                required
                onChange={handleChange}
                name='category'
                autoComplete='off'
                value={newItem.category}
            />
            <ScrollArea className='hidden group-focus-within:flex flex-col rounded-xl shadow-main p-1 md:max-h-40 max-h-28'>
                {categories
                    ?.filter((item) =>
                        item
                            .toLowerCase()
                            .includes(newItem.category.toLowerCase().trim())
                    )
                    .map((category) => (
                        <button
                            key={category}
                            className='px-4 py-2 hover:bg-[#F2F2F2] w-full text-start rounded-xl duration-200'
                            type='button'
                            onClick={() =>
                                setNewItem((prev) => ({
                                    ...prev,
                                    category: category,
                                }))
                            }
                        >
                            {category}
                        </button>
                    ))}
            </ScrollArea>
        </div>
    )
}
