/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            keyframes: {
                'accordion-down': {
                    from: { height: 0 },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: 0 },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
            colors: {
                'bg-main': '#FAFAFE',
                'shopping-list': '#FFF0DE',
                orange: '#F9A109',
                'light-red': '#EB5757',
                'source-bg': '#80485B',
                'lighter-gray': '#BDBDBD',
                'light-gray': '#C1C1C4',
                'medium-gray': '#828282',
                'dark-gray': '#454545',
                'darker-gray': '#34333A',
                'light-blue': '#56CCF2',
            },
            boxShadow: {
                main: '0px 2px 12px 0px rgba(0, 0, 0, 0.05)',
            },
            screens: {
                xs: '500px',
            },
        },
    },
    plugins: [import('tailwindcss-animate')],
}
