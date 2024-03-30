/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		screens: {
			sm: '640px',
			// => @media (min-width: 640px) { ... }

			md: '768px',
			// => @media (min-width: 768px) { ... }

			lg: '1024px',
			// => @media (min-width: 1024px) { ... }

			xl: '1280px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1536px'
			// => @media (min-width: 1536px) { ... }
		},
		extend: {
			minWidth: {
				lg: '32rem'
			},
			maxHeight: {
				'9/10': '90%',
				lg: '32rem'
			},
			gridTemplateColumns: {
				24: 'repeat(24, minmax(0, 1fr))'
			},
			transitionProperty: {
				width: 'width'
			},
			colors: {
				birch: {
					50: '#e9e9d8',
					100: '#d4d3b4',
					200: '#bcb888',
					300: '#a8a167',
					400: '#998f59',
					500: '#554c41',
					600: '#6a5c3e',
					700: '#5a4d39',
					800: '#3E3529',
					900: '#2E2921',
					950: '#1D1C18'
				},
				carrot: {
					50: '#fff8ed',
					100: '#ffefd4',
					200: '#ffdba8',
					300: '#ffc171',
					400: '#ff9933',
					500: '#fe7e11',
					600: '#ef6307',
					700: '#c64808',
					800: '#9d3a0f',
					900: '#7e3110',
					950: '#441606'
				}
			}
		}
	},
	plugins: []
};
