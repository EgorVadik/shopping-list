import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

type Props = {
    children: React.ReactNode
    text: string
}

export default function IconsToolTip({ children, text }: Props) {
    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger>{children}</TooltipTrigger>
                <TooltipContent
                    side='right'
                    className='bg-dark-gray text-white py-[2px] px-4 font-medium'
                >
                    <p>{text}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
