import { shoppingListOpenAtom } from '@/state/atoms'
import { useAtom } from 'jotai'

export default function AddItemContainer() {
    const [, setShoppingListOpen] = useAtom(shoppingListOpenAtom)

    return (
        <div className='xs:px-10 px-5 pt-10'>
            <div className='flex bg-source-bg rounded-3xl gap-4 px-7'>
                <img
                    src='/source.svg'
                    alt='Source'
                    className='-translate-y-4'
                />
                <div className='flex flex-col justify-center'>
                    <p className='font-bold text-white xs:text-base text-xs'>
                        Didn't find what you need?
                    </p>
                    <button
                        className='bg-white rounded-xl px-5 py-2 mt-3 text-darker-gray font-bold xs:text-base text-xs'
                        onClick={() => setShoppingListOpen(false)}
                    >
                        Add Item
                    </button>
                </div>
            </div>
        </div>
    )
}
