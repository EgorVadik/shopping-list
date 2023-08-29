import TopValues from '@/components/TopValues'
import useWindowSize from '@/hooks/useWindowSize'
import { getHistory } from '@/lib/localStorage'
import { MonthlyCount, TopItemType } from '@/types/types'
import { useEffect, useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

export default function Statistics() {
    const [topItems, setTopItems] = useState<TopItemType[]>([])
    const [topCategories, setTopCategories] = useState<TopItemType[]>([])
    const [monthlyCount, setMonthlyCount] = useState<MonthlyCount[]>([])
    const { width, isMobile, isTablet, isSmallMobile } = useWindowSize()

    useEffect(() => {
        const history = getHistory()
        if (history === null) return
        const items = Object.values(history)
            .flat()
            .map((history) => {
                return history.items
            })

        const itemNames = items
            .map((item) => {
                return Object.values(item)
                    .flat()
                    .map((i) => {
                        return { name: i.name, quantity: i.quantity }
                    })
            })
            .flat()
        const itemCategories = items
            .map((item) => {
                return Object.values(item)
                    .flat()
                    .map((i) => {
                        return i.category
                    })
            })
            .flat()

        const itemCount: {
            [name: string]: number
        } = {}
        itemNames.forEach((item) => {
            itemCount[item.name] =
                (itemCount[item.name] || 0) + 1 * item.quantity
        })

        const categoryCount: {
            [name: string]: number
        } = {}
        itemCategories.forEach((category) => {
            categoryCount[category] = (categoryCount[category] || 0) + 1
        })

        const _topCategories = Object.entries(categoryCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)

        const _topItems = Object.entries(itemCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)

        setTopCategories(
            _topCategories.map((item) => {
                const [name, percentage] = item
                const computedPercentage = (
                    (percentage / itemNames.length) *
                    100
                ).toFixed(0)

                return {
                    name,
                    percentage: parseInt(computedPercentage),
                }
            })
        )

        setTopItems(
            _topItems.map((item) => {
                const [name, percentage] = item
                const computedPercentage = (
                    (percentage / itemCategories.length) *
                    100
                ).toFixed(0)

                return {
                    name,
                    percentage: parseInt(computedPercentage),
                }
            })
        )
    }, [])

    useEffect(() => {
        const history = getHistory()
        if (history === null) return

        let _monthlyCount: MonthlyCount[] = Object.entries(history).map(
            ([key, value]) => {
                const items = value
                    .map((history) =>
                        Object.values(history.items)
                            .flat()
                            .map((item) => item.quantity)
                    )
                    .flat()
                return {
                    month: key.split(' ')[0],
                    items: items.reduce((acc, curr) => {
                        return acc + curr
                    }, 0),
                }
            }
        )

        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]

        _monthlyCount = months
            .map((month) => {
                return _monthlyCount.map((count) => {
                    if (month === count.month) {
                        return count
                    }
                    return {
                        month,
                        items: 0,
                    }
                })
            })
            .flat()

        setMonthlyCount(_monthlyCount)
    }, [])

    return (
        <div className='sm:px-16 px-3 py-10 bg-bg-main w-full space-y-10'>
            <div className='md:flex items-center justify-around gap-10'>
                <TopValues
                    color={'orange'}
                    title='Top Items'
                    items={topItems}
                />
                <TopValues
                    color={'blue'}
                    title='Top Categories'
                    items={topCategories}
                />
            </div>
            <div className='flex flex-col gap-10'>
                <h1 className='text-2xl font-medium'>Monthly Summary</h1>

                <LineChart
                    width={
                        isSmallMobile
                            ? width - 100
                            : isMobile
                            ? width - 150
                            : isTablet
                            ? width - 230
                            : width - 600
                    }
                    height={300}
                    data={monthlyCount}
                >
                    <Line type='monotone' dataKey='items' stroke='#F9A109' />
                    <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
                    <XAxis dataKey='month' />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </div>
        </div>
    )
}
