import { ShoppingList } from '@/types/types'

export const getCartSize = (cart: ShoppingList | null) => {
    if (cart === null) return 0

    let size = 0
    for (const category in cart) {
        size += cart[category].length
    }
    return size
}
