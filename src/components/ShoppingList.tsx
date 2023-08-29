import AddItemContainer from './AddItemContainer'
import ShoppingListItem from './ShoppingListItem'
import { ScrollArea } from '@/components/ui/scroll-area'
import SaveListInput from './SaveListInput'
import { IoMdCreate } from 'react-icons/io'
import { useAtom } from 'jotai'
import { historyAtom, shoppingListAtom, sidebarOpenAtom } from '@/state/atoms'
import { useState } from 'react'
import {
    getHistory,
    setHistory as setHistoryLocal,
    setShoppingCart,
} from '@/lib/localStorage'
import { useToast } from '@/components/ui/use-toast'
import ManageListBtns from './ManageListBtns'

export default function ShoppingList() {
    const [shoppingListItems, setShoppingListItem] = useAtom(shoppingListAtom)
    const [editingState, setEditingState] = useState(false)
    const [, setHistory] = useAtom(historyAtom)
    const [sidebarOpen] = useAtom(sidebarOpenAtom)
    const { toast } = useToast()

    const updateItem = (id: string, quantity: 1 | -1) => {
        setShoppingListItem((prev) => {
            if (prev === null) return null
            Object.values(prev).forEach((value) => {
                value.forEach((item) => {
                    if (item.id === id) {
                        if (item.quantity === 1 && quantity === -1) {
                            const newItems = value.filter(
                                (i) => i.id !== item.id
                            )
                            if (newItems.length === 0) {
                                delete prev[item.category]
                                if (Object.keys(prev).length === 0) {
                                    return null
                                }
                            } else {
                                prev[item.category] = newItems
                            }
                            return
                        }
                        item.quantity += quantity
                    }
                })
            })

            return { ...prev }
        })
    }

    const deleteItem = (id: string) => {
        setShoppingListItem((prev) => {
            if (prev === null) return null
            Object.values(prev).forEach((value) => {
                value.forEach((item) => {
                    if (item.id === id) {
                        const newItems = value.filter((i) => i.id !== item.id)
                        if (newItems.length === 0) {
                            delete prev[item.category]
                            if (Object.keys(prev).length === 0) {
                                return null
                            }
                        } else {
                            prev[item.category] = newItems
                        }
                    }
                })
            })

            return { ...prev }
        })
    }

    const updateItemStatus = (id: string) => {
        setShoppingListItem((prev) => {
            if (prev === null) return null
            Object.values(prev).forEach((value) => {
                value.forEach((item) => {
                    if (item.id === id) {
                        item.completed = !item.completed
                    }
                })
            })

            return { ...prev }
        })
    }

    const handleHistoryStatus = (status: 'completed' | 'cancelled') => {
        const history = getHistory()
        if (history === null) return
        const pendingList = Object.values(history)
            .flat()
            .find((list) => list.status === 'pending')
        if (pendingList === undefined) return
        pendingList.status = status
        pendingList.items = shoppingListItems!
        setHistoryLocal(history)
        setHistory(history)
        setShoppingListItem(null)
        setShoppingCart(null)
        setEditingState(false)
        if (status === 'cancelled') {
            toast({
                title: 'List cancelled',
                description: 'You can find it in the history tab',
            })
            return
        }

        toast({
            title: 'List completed',
            description: 'You can find it in the history tab',
        })
    }

    return (
        <div
            data-open={sidebarOpen}
            className='bg-shopping-list xs:max-w-sm xs:min-w-[384px] min-w-[310px] max-w-[310px] text-darker-gray top-0 right-0 bottom-0 fixed data-[open=false]:opacity-0 data-[open=false]:translate-x-full data-[open=true]:translate-x-0 data-[open=true]:opacity-100 data-[open]:lg:static data-[open]:lg:opacity-100 data-[open]:lg:translate-x-0 duration-300'
        >
            <div className='sticky flex flex-col justify-between top-0 right-0'>
                <div>
                    <AddItemContainer />
                    <div className='xs:px-10 px-5 mt-10'>
                        <div className='flex items-center justify-between'>
                            <h1 className='font-bold text-2xl'>
                                Shopping List
                            </h1>
                            <button
                                onClick={() => {
                                    const history = getHistory()
                                    const showErrToast = () => {
                                        toast({
                                            title: 'No Pending List Found',
                                            description:
                                                'Save a list first to edit it',
                                        })
                                    }

                                    if (history === null) {
                                        showErrToast()
                                        return
                                    }

                                    const pendingList = Object.values(history)
                                        .flat()
                                        .find(
                                            (list) => list.status === 'pending'
                                        )

                                    if (pendingList === undefined) {
                                        showErrToast()
                                        return
                                    }

                                    setEditingState((prev) => !prev)
                                }}
                            >
                                <IoMdCreate className='h-6 w-6' />
                            </button>
                        </div>
                        {shoppingListItems !== null &&
                        Object.keys(shoppingListItems).length > 0 ? (
                            <ScrollArea className='h-[calc(100vh-370px)]'>
                                {Object.entries(shoppingListItems).map(
                                    ([key, value]) => (
                                        <div key={key}>
                                            <h1 className='text-sm text-medium-gray font-medium mt-10'>
                                                {key}
                                            </h1>
                                            <ShoppingListItem
                                                value={value}
                                                editingState={editingState}
                                                updateItem={updateItem}
                                                deleteItem={deleteItem}
                                                updateItemStatus={
                                                    updateItemStatus
                                                }
                                            />
                                        </div>
                                    )
                                )}
                            </ScrollArea>
                        ) : (
                            <div className='h-[calc(100vh-370px)] flex justify-end items-center flex-col gap-20'>
                                <h1 className='text-xl text-darker-gray font-bold'>
                                    No items
                                </h1>
                                <img
                                    src='/no-items.svg'
                                    alt='Cart'
                                    className='translate-y-3'
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className='bg-white py-8 xs:px-10 px-5 '>
                    {editingState ? (
                        <ManageListBtns
                            cancelHandler={handleHistoryStatus}
                            submitHandler={handleHistoryStatus}
                        />
                    ) : (
                        <SaveListInput disabled={shoppingListItems === null} />
                    )}
                </div>
            </div>
        </div>
    )
}
