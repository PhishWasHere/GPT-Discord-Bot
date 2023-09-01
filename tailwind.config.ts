import type { Config } from 'tailwindcss'

const config: Config = {
  purge: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/flowbite-react/**/*.js",
  ],
  plugins: [
    require("flowbite/plugin")
  ],
  theme: {
    extend: {
      colors: {
        'primary':'#111827',
        'text-primary': '#164e63',
        'text-secondary': '#374151',
      }
    },
  }
}
export default config
