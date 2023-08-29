import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { DialogClose } from '@radix-ui/react-dialog'

type Props = {
    children: React.ReactNode
    cancelHandler: (status: 'completed' | 'cancelled') => void
}

export default function CancelDialog({ children, cancelHandler }: Props) {
    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className='max-w-sm'>
                <DialogHeader>
                    <DialogTitle className='text-2xl text-darker-gray font-medium'>
                        Are you sure that you want to cancel this list?
                    </DialogTitle>
                    <DialogDescription className='flex items-center justify-end gap-4'>
                        <DialogClose className='rounded-xl px-5 py-2 text-darker-gray font-bold'>
                            cancel
                        </DialogClose>
                        <button
                            className='bg-light-red rounded-xl px-7 py-5 text-white font-bold'
                            onClick={() => cancelHandler('cancelled')}
                        >
                            Yes
                        </button>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
