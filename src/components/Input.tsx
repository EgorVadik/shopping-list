import React from 'react'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string
    optional?: boolean
    className?: string
}

export default function Input({ label, optional, className, ...props }: Props) {
    return (
        <div
            className='flex flex-col gap-2 max-w-xs min-w-[270px] text-darker-gray group'
            tabIndex={0}
        >
            <label
                htmlFor={label}
                className='text-sm font-medium group-focus-within:text-orange duration-300'
            >
                {label} {optional && <span>(Optional)</span>}
            </label>
            <input
                id={label}
                className={`group-focus-within:border-orange duration-300 border-2 border-lighter-gray rounded-xl py-4 focus:outline-none w-full px-5 ${className}`}
                {...props}
            />
        </div>
    )
}
