import { getHistory, getItems, getShoppingCart } from '@/lib/localStorage'
import {
    HistoryGroup,
    NewItem,
    ProductGroup,
    ShoppingList,
} from '@/types/types'
import { atom } from 'jotai'

export const shoppingListOpenAtom = atom(true)
export const previewItemOpenAtom = atom(false)
export const sidebarOpenAtom = atom(false)

export const shoppingListAtom = atom<ShoppingList | null>(getShoppingCart())
export const itemsAtom = atom<ProductGroup | null>(getItems())
export const historyAtom = atom<HistoryGroup | null>(getHistory())

export const newItemAtom = atom<NewItem>({
    name: '',
    category: '',
})
