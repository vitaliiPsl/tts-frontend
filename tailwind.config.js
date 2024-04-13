/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				'primary': '#000000',
				'primary-text': '#ffffff',
				'secondary': '#282828',
                'secondary-text': '#282828',
				'accent': '#7D4CDB',
				'background': '#fafafa',
			},
		},
	},
	plugins: [],
}
