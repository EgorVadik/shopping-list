import { Route, Routes } from 'react-router-dom'
import SideNav from './components/SideNav'
import Home from './pages/Home'
import ShoppingList from './components/ShoppingList'
import { useAtom } from 'jotai'
import {
    // previewItemOpenAtom,
    shoppingListOpenAtom,
    // sidebarOpenAtom,
} from './state/atoms'
import AddNewItem from './components/AddNewItem'
import History from './pages/History'
import HistoryItem from './pages/HistoryItem'
import { Toaster } from '@/components/ui/toaster'
import Statistics from './pages/Statistics'

function App() {
    const [shoppingListOpen] = useAtom(shoppingListOpenAtom)
    // const [previewItemOpen] = useAtom(previewItemOpenAtom)
    // const [sidebarOpen] = useAtom(sidebarOpenAtom)

    return (
        <main className='flex'>
            <SideNav />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/history' element={<History />} />
                <Route path='/history/:id' element={<HistoryItem />} />
                <Route path='/statistics' element={<Statistics />} />
            </Routes>
            {/* <div
                data-open={sidebarOpen}
                className={`${
                    shoppingListOpen
                        ? 'bg-shopping-list'
                        : previewItemOpen
                        ? 'bg-white'
                        : 'bg-bg-main'
                } top-0 right-0 bottom-0 fixed data-[open=false]:opacity-0 data-[open=false]:translate-x-full data-[open=true]:translate-x-0 data-[open=true]:opacity-100 data-[open]:lg:static data-[open]:lg:opacity-100 data-[open]:lg:translate-x-0 duration-200 xs:w-auto w-[calc(100vw-110px)]`}
            >
            </div> */}
            {shoppingListOpen ? <ShoppingList /> : <AddNewItem />}
            <Toaster />
        </main>
    )
}

export default App
