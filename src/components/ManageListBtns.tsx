import CancelDialog from './CancelDialog'

type Props = {
    cancelHandler: (status: 'completed' | 'cancelled') => void
    submitHandler: (status: 'completed' | 'cancelled') => void
}

export default function ManageListBtns({
    cancelHandler,
    submitHandler,
}: Props) {
    return (
        <div className='flex items-center justify-center gap-5'>
            <CancelDialog cancelHandler={cancelHandler}>
                <span className='rounded-xl px-5 py-2 text-darker-gray font-bold'>
                    cancel
                </span>
            </CancelDialog>
            <button
                className='bg-light-blue rounded-xl px-7 py-5 text-white font-bold'
                onClick={() => submitHandler('completed')}
            >
                Complete
            </button>
        </div>
    )
}
