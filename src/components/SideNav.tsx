import { AiOutlineUnorderedList } from 'react-icons/ai'
import {
    MdInsertChartOutlined,
    MdOutlineShoppingCart,
    MdReplay,
} from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'
import IconsToolTip from './ToolTip'
import { getCartSize } from '@/lib/helpers'
import { shoppingListAtom, sidebarOpenAtom } from '@/state/atoms'
import { useAtom } from 'jotai'

function CurrentlyOn() {
    return (
        <div className='absolute top-0 left-0 bottom-0 bg-orange w-[6px] rounded-r' />
    )
}

export default function SideNav() {
    const location = useLocation()
    const [shoppingListItems] = useAtom(shoppingListAtom)
    const [, setSidebarOpen] = useAtom(sidebarOpenAtom)

    return (
        <nav className='min-h-screen xs:min-w-[90px] min-w-[50px]'>
            <ul className='fixed flex flex-col items-center justify-between min-h-screen py-7'>
                <Link to='/'>
                    <li>
                        <img src='/logo.svg' />
                    </li>
                </Link>
                <div className='flex flex-col gap-20'>
                    <IconsToolTip text='items'>
                        <Link to='/'>
                            <li className='relative xs:px-7 px-3 py-2'>
                                {location.pathname === '/' && <CurrentlyOn />}
                                <AiOutlineUnorderedList className='w-[26px] h-[26px]' />
                            </li>
                        </Link>
                    </IconsToolTip>
                    <IconsToolTip text='history'>
                        <Link to={'/history'}>
                            <li className='relative xs:px-7 px-3 py-2'>
                                {location.pathname.includes('/history') && (
                                    <CurrentlyOn />
                                )}
                                <MdReplay className='w-[26px] h-[26px]' />
                            </li>
                        </Link>
                    </IconsToolTip>
                    <IconsToolTip text='statistics'>
                        <Link to={'/statistics'}>
                            <li className='relative xs:px-7 px-3 py-2'>
                                {location.pathname === '/statistics' && (
                                    <CurrentlyOn />
                                )}
                                <MdInsertChartOutlined className='w-[26px] h-[26px]' />
                            </li>
                        </Link>
                    </IconsToolTip>
                </div>
                <li>
                    <button
                        className='relative bg-orange rounded-full p-2'
                        onClick={() => setSidebarOpen((prev) => !prev)}
                    >
                        <span className='absolute -top-1 -right-1 bg-light-red rounded-md w-[18px] h-[18px] flex items-center justify-center text-xs font-medium text-white'>
                            {getCartSize(shoppingListItems)}
                        </span>
                        <MdOutlineShoppingCart className='w-[26px] h-[26px] fill-white' />
                    </button>
                </li>
            </ul>
        </nav>
    )
}
