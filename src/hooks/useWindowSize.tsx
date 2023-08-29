import { useEffect, useState } from 'react'

export default function useWindowSize() {
    const [size, setSize] = useState({
        width: window.innerWidth,
        isTablet: window.innerWidth < 1024,
        isMobile: window.innerWidth < 640,
        isSmallMobile: window.innerWidth < 500,
    })

    useEffect(() => {
        const onResize = () => {
            setSize({
                width: window.innerWidth,
                isMobile: window.innerWidth < 640,
                isTablet: window.innerWidth < 1024,
                isSmallMobile: window.innerWidth < 500,
            })
        }

        window.addEventListener('resize', onResize)

        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [])

    return {
        width: size.width,
        isMobile: size.isMobile,
        isTablet: size.isTablet,
        isSmallMobile: size.isSmallMobile,
    }
}
