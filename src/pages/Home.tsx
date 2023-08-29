import HomeHeader from '@/components/HomeHeader'
import ListItem from '@/components/ListItem'
import SearchBar from '@/components/SearchBar'
import {
    getShoppingCart,
    setItems as setItemsLocal,
    setShoppingCart,
} from '@/lib/localStorage'
import { itemsAtom, shoppingListAtom } from '@/state/atoms'
import { items as initialItems } from '@/data/items'
import { ProductGroup } from '@/types/types'
import { useAtom } from 'jotai'
import { useEffect, useMemo, useState } from 'react'

export default function Home() {
    const [search, setSearch] = useState('')
    const [shoppingListItems, setShoppingListItems] = useAtom(shoppingListAtom)
    const [items, setItems] = useAtom(itemsAtom)
    const filteredItems = useMemo(() => {
        if (items === null) return null
        return Object.entries(items).reduce((acc, [key, value]) => {
            const filtered = value.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            )
            if (filtered.length > 0) {
                acc[key] = filtered
            }
            return acc
        }, {} as ProductGroup)
    }, [items, search])

    const handleAddItem = (item: string, key: string) => {
        setShoppingListItems((prev) => {
            const id = `${crypto.randomUUID()}`
            const newItem = {
                id,
                name: item,
                category: key,
                quantity: 1,
                completed: false,
            }
            if (prev === null) {
                return {
                    [key]: [newItem],
                }
            }

            if (prev[key]) {
                if (prev[key].find((i) => i.name === item)) {
                    return {
                        ...prev,
                        [key]: prev[key].map((i) => {
                            if (i.name === item) {
                                return {
                                    ...i,
                                    quantity: i.quantity + 1,
                                }
                            }
                            return i
                        }),
                    }
                }

                return {
                    ...prev,
                    [key]: [...prev[key], newItem],
                }
            }

            return {
                ...prev,
                [key]: [newItem],
            }
        })
    }

    const handleSearch = (value: string) => {
        setSearch(value)
    }

    useEffect(() => {
        const shoppingList = getShoppingCart()
        if (shoppingList) {
            setShoppingListItems(shoppingList)
        }
    }, [setShoppingListItems])

    useEffect(() => {
        if (shoppingListItems) {
            setShoppingCart(shoppingListItems)
        }
    }, [shoppingListItems])

    useEffect(() => {
        if (items === null) {
            setItems(initialItems)
            setItemsLocal(initialItems)
        }
        if (items) {
            setItemsLocal(items)
            setItems(items)
        }
    }, [items, setItems])

    return (
        <div className='sm:px-16 px-3 py-10 bg-bg-main w-full'>
            <div className='flex flex-col xl:flex-row justify-between gap-10'>
                <HomeHeader />
                <SearchBar search={search} setSearch={handleSearch} />
            </div>
            {filteredItems !== null ? (
                <div className='mx-auto xs:container'>
                    {Object.entries(filteredItems).map(([key, value]) => (
                        <div key={key}>
                            <h1 className='text-lg text-darker-gray font-medium mt-20'>
                                {key}
                            </h1>
                            <ListItem
                                category={key}
                                value={value}
                                handleAddItem={handleAddItem}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className='flex justify-center items-center h-[calc(100vh-80px)]'>
                    <h1 className='text-2xl font-medium text-darker-gray'>
                        No items found
                    </h1>
                </div>
            )}
        </div>
    )
}
