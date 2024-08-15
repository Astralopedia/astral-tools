import { getIconCollections, iconsPlugin } from "@egoist/tailwindcss-icons"
import { nextui } from "@nextui-org/react"
import type { Config } from "tailwindcss"

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
	},
	darkMode: "class",
	plugins: [
		nextui(),
		iconsPlugin({
			collections: getIconCollections([
				"fa6-solid",
				"fa6-regular",
				"fa6-brands",
			]),
		}),
	],
}
export default config
