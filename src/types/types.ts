export interface ProductGroup {
    [category: string]: Product[]
}

export interface Product {
    id: string
    name: string
}

export interface ShoppingList {
    [category: string]: Cart[]
}

export interface Cart extends Product {
    quantity: number
    category: string
    completed: boolean
}

export interface HistoryGroup {
    [date: string]: History[]
}

export interface History {
    id: string
    title: string
    date: string
    items: ShoppingList
    status: 'pending' | 'completed' | 'cancelled'
}

export interface NewItem {
    name: string
    note?: string
    imageUrl?: string
    category: string
}

export type TopItemType = {
    name: string
    percentage: number
}

export type MonthlyCount = {
    month: string
    items: number
}
