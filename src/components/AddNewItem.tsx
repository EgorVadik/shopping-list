import {
    previewItemOpenAtom,
    shoppingListOpenAtom,
    sidebarOpenAtom,
} from '@/state/atoms'
import { useAtom } from 'jotai'
import AddNewItemForm from './AddNewItemForm'
import AddNewItemPreview from './AddNewItemPreview'

export default function AddNewItem() {
    const [, setShoppingListOpen] = useAtom(shoppingListOpenAtom)
    const [previewItemOpen, setPreviewItemOpen] = useAtom(previewItemOpenAtom)
    const [sidebarOpen] = useAtom(sidebarOpenAtom)

    return (
        <div
            data-open={sidebarOpen}
            className={`xs:max-w-sm xs:min-w-[384px] min-w-[310px] max-w-[310px] ${
                previewItemOpen ? 'bg-white' : 'bg-bg-main'
            } top-0 right-0 bottom-0 fixed data-[open=false]:opacity-0 data-[open=false]:translate-x-full data-[open=true]:translate-x-0 data-[open=true]:opacity-100 data-[open]:lg:static data-[open]:lg:opacity-100 data-[open]:lg:translate-x-0 duration-300`}
        >
            {previewItemOpen ? (
                <AddNewItemPreview
                    setPreviewItemOpen={setPreviewItemOpen}
                    setShoppingListOpen={setShoppingListOpen}
                />
            ) : (
                <AddNewItemForm
                    setPreviewItemOpen={setPreviewItemOpen}
                    setShoppingListOpen={setShoppingListOpen}
                />
            )}
        </div>
    )
}
