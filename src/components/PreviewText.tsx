type Props = {
    label: string
    value: string
    textSm?: boolean
    className?: string
}

export default function PreviewText({
    label,
    value,
    textSm,
    className,
}: Props) {
    return (
        <div className='space-y-1'>
            <p className='text-xs text-light-gray font-medium'>{label}</p>
            <p
                className={`${
                    textSm ? 'text-lg' : 'text-2xl'
                } font-medium ${className}`}
            >
                {value}
            </p>
        </div>
    )
}
