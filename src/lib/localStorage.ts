import { HistoryGroup, ProductGroup, ShoppingList } from '@/types/types'

export const getShoppingCart = () => {
    const shoppingCart = localStorage.getItem('shoppingCart')
    if (shoppingCart) {
        return JSON.parse(shoppingCart) as ShoppingList
    }
    return null
}

export const setShoppingCart = (shoppingCart: ShoppingList | null) => {
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
}

export const getItems = () => {
    const items = localStorage.getItem('items')
    if (items) {
        return JSON.parse(items) as ProductGroup
    }
    return null
}

export const setHistory = (history: HistoryGroup) => {
    localStorage.setItem('history', JSON.stringify(history))
}

export const getHistory = () => {
    const history = localStorage.getItem('history')
    if (history) {
        return JSON.parse(history) as HistoryGroup
    }
    return null
}

export const setItems = (items: ProductGroup) => {
    localStorage.setItem('items', JSON.stringify(items))
}

export const setCategories = (categories: string[]) => {
    localStorage.setItem('categories', JSON.stringify(categories))
}

export const getCategories = () => {
    const categories = localStorage.getItem('categories')
    if (categories) {
        return JSON.parse(categories) as string[]
    }
    return null
}
