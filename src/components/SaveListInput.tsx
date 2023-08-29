import { historyAtom, shoppingListAtom } from '@/state/atoms'
import { History } from '@/types/types'
import { useAtom } from 'jotai'
import moment from 'moment'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { getHistory, setHistory as setHistoryLocal } from '@/lib/localStorage'

type Props = {
    disabled: boolean
}

export default function SaveListInput({ disabled }: Props) {
    const [name, setName] = useState('')
    const [shoppingListItems] = useAtom(shoppingListAtom)
    const [, setHistory] = useAtom(historyAtom)
    const { toast } = useToast()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (name.trim() === '') return
        const month = moment().format('MMMM YYYY')

        if (
            shoppingListItems === null ||
            Object.values(shoppingListItems).flat().length === 0
        ) {
            toast({
                title: 'Shopping list is empty',
                description: 'Add items to the shopping list',
            })
            return
        }

        const newHistory: History = {
            id: crypto.randomUUID(),
            title: name,
            status: 'pending',
            date: moment().format('ddd DD.MM.YYYY'),
            items: shoppingListItems,
        }

        let history = getHistory()

        if (history === null) {
            history = {
                [month]: [newHistory],
            }
            toast({
                title: 'List saved',
                description:
                    'You can find it in the history tab start editing it to complete it',
            })
            setHistoryLocal(history)
            setHistory(history)
            setName('')
            return
        }

        if (
            Object.values(history)
                .flat()
                .find((item) => item.status === 'pending')
        ) {
            toast({
                title: 'You already have a pending list',
                description:
                    'Complete or delete the pending list to create a new one',
            })
            return
        }

        if (history[month] === undefined) {
            history[month] = [newHistory]
        } else {
            history[month].push(newHistory)
        }

        toast({
            title: 'List saved',
            description:
                'You can find it in the history tab start editing it to complete it',
        })

        setHistoryLocal(history)
        setHistory(history)
        setName('')
    }

    return (
        <form onSubmit={handleSubmit} className='relative'>
            <input
                type='text'
                placeholder='Enter a name'
                className='bg-white border-2 w-full border-orange rounded-xl h-16 px-5 pr-24 text-sm focus:outline-none font-medium disabled:border-light-gray'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={disabled}
            />
            <button
                type='submit'
                className='absolute right-0 top-0 bottom-0 bg-orange rounded-xl px-7 font-bold text-white disabled:bg-light-gray disabled:cursor-not-allowed'
                disabled={disabled}
            >
                Save
            </button>
        </form>
    )
}
