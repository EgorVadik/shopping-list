import HistoryCard from '@/components/HistoryCard'
import { getHistory } from '@/lib/localStorage'
import { historyAtom } from '@/state/atoms'
import { HistoryGroup } from '@/types/types'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

export default function History() {
    const [history, setHistory] = useAtom(historyAtom)

    useEffect(() => {
        const localHistory = getHistory()
        setHistory(() => {
            if (localHistory === null) return null
            const newHistory: HistoryGroup = {}
            Object.entries(localHistory).forEach(([key, value]) => {
                newHistory[key] = value.reverse()
            })
            return { ...newHistory }
        })
    }, [setHistory])

    return (
        <div className='sm:px-16 px-3 py-7 bg-bg-main w-full'>
            <h1 className='text-[26px] text-darker-gray font-bold'>
                Shopping history
            </h1>

            {history !== null ? (
                Object.entries(history).map(([key, value]) => (
                    <div key={key}>
                        <h1 className='text-xs font-medium mt-10 mb-5'>
                            {key}
                        </h1>
                        {value.map((group) => (
                            <HistoryCard key={group.id} group={group} />
                        ))}
                    </div>
                ))
            ) : (
                <div className='flex justify-center items-center h-[calc(100vh-80px)]'>
                    <h1 className='text-2xl font-medium text-darker-gray'>
                        No History found
                    </h1>
                </div>
            )}
        </div>
    )
}
