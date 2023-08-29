import { useAtom } from 'jotai'
import Input from './Input'
import SelectCategory from './SelectCategory'
import { newItemAtom } from '@/state/atoms'
import { categories } from '@/data/categories'
import { useToast } from '@/components/ui/use-toast'
import { useEffect } from 'react'
import { getCategories, setCategories } from '@/lib/localStorage'

type Props = {
    setShoppingListOpen: React.Dispatch<React.SetStateAction<boolean>>
    setPreviewItemOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddNewItemForm({
    setShoppingListOpen,
    setPreviewItemOpen,
}: Props) {
    const [newItem, setNewItem] = useAtom(newItemAtom)
    const { toast } = useToast()

    useEffect(() => {
        const localCategories = getCategories()
        if (localCategories === null) {
            setCategories(categories)
        }
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (newItem.name.trim() === '' || newItem.category.trim() === '') {
            toast({
                title: 'Invalid input',
                description: 'Please enter a valid name and category',
            })
            return
        }

        setPreviewItemOpen(true)
    }

    const handleCancel = () => {
        setNewItem({
            name: '',
            category: '',
            note: undefined,
            imageUrl: undefined,
        })
        setShoppingListOpen(true)
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const name = e.target.name
        const value = e.target.value
        setNewItem((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    return (
        <div className='sticky py-10 xs:mx-7 mx-3 top-0 right-0'>
            <form
                className='flex flex-col justify-between h-[calc(100vh-80px)]'
                onSubmit={handleSubmit}
            >
                <div className='space-y-5'>
                    <h1 className='text-2xl font-medium'>Add a new item</h1>
                    <Input
                        name='name'
                        label='Name'
                        placeholder='Enter a name'
                        required
                        onChange={handleChange}
                        value={newItem.name}
                    />
                    <div className='flex flex-col gap-2 max-w-xs min-w-[270px] text-darker-gray'>
                        <label htmlFor={'Note'} className='text-sm font-medium'>
                            Note (Optional)
                        </label>
                        <textarea
                            id={'Note'}
                            className='border-2 border-lighter-gray rounded-xl py-4 focus:outline-none w-full px-5 resize-none group-focus-within:border-orange duration-300'
                            placeholder='Enter a description'
                            rows={3}
                            onChange={handleChange}
                            name='note'
                            value={newItem.note}
                        />
                    </div>
                    <Input
                        name='imageUrl'
                        label='Image'
                        placeholder='Enter a url'
                        optional
                        onChange={handleChange}
                        value={newItem.imageUrl}
                    />
                    <SelectCategory handleChange={handleChange} />
                </div>

                <div className='flex justify-center gap-3 items-center mt-auto'>
                    <button
                        className='rounded-xl px-5 py-2 text-darker-gray font-bold'
                        onClick={handleCancel}
                    >
                        cancel
                    </button>
                    <button
                        type='submit'
                        className='bg-orange rounded-xl px-7 py-5 text-white font-bold'
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}
