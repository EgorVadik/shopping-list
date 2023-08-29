import React from 'react'

type Props = React.HTMLAttributes<HTMLButtonElement> & {
    cancelText: string
    submitText: string
    cancelHandler?: () => void
    submitHandler?: () => void
}

export default function AddNewItemBtns({
    cancelText,
    submitText,
    cancelHandler,
    submitHandler,
    ...props
}: Props) {
    return (
        <div className='flex justify-center gap-3 items-center mt-auto'>
            <button
                className='rounded-xl px-5 py-2 text-darker-gray font-bold'
                onClick={cancelHandler}
                {...props}
            >
                {cancelText}
            </button>
            <button
                type='submit'
                className='bg-orange rounded-xl px-7 py-5 text-white font-bold'
                onClick={submitHandler}
                {...props}
            >
                {submitText}
            </button>
        </div>
    )
}
