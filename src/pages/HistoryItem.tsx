import HistoryItemContainer from '@/components/HistoryItemContainer'
import { useToast } from '@/components/ui/use-toast'
import { getHistory } from '@/lib/localStorage'
import { History } from '@/types/types'
import { useEffect, useState } from 'react'
import { MdKeyboardBackspace } from 'react-icons/md'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function HistoryItem() {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const { toast } = useToast()
    const [history, setHistory] = useState<History | null>(null)

    useEffect(() => {
        const localHistory = getHistory()
        const showErrToast = () => {
            toast({
                title: 'Invalid history id',
                description: 'Please try again',
            })
        }

        if (localHistory === null) {
            navigate(-1)
            showErrToast()
            return
        }

        const hist = Object.values(localHistory)
            .flat()
            .filter((item) => item.id === id!)

        if (hist.length === 0) {
            navigate(-1)
            showErrToast()
            return
        }

        setHistory(hist[0])
    }, [id, navigate, toast])

    return (
        <div className='sm:px-16 px-3 py-10 bg-bg-main w-full'>
            <Link
                to={'..'}
                onClick={(e) => {
                    e.preventDefault()
                    navigate(-1)
                }}
                className='flex items-center gap-2 text-orange'
            >
                <MdKeyboardBackspace />
                back
            </Link>
            {history && <HistoryItemContainer items={history.items} />}
        </div>
    )
}
