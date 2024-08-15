"use client"

import {
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from "@nextui-org/react"

import AstralToolsLogo from "@/assets/img/icon.png"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function NavBar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const pathname = usePathname()

	const menuItems = [
		{ name: "Home", href: "/" },
		{ name: "Tools", href: "/tools" },
		{ name: "Interactive Map", href: "/map" },
	]

	return (
		<Navbar onMenuOpenChange={setIsMenuOpen} isBordered isBlurred>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className='sm:hidden'
				/>
				<NavbarBrand>
					<Image
						src={AstralToolsLogo}
						alt='Astral Tools'
						width={250}
					/>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className='hidden sm:flex gap-4' justify='center'>
				{menuItems.map(({ name, href }, index) => (
					<NavbarItem
						key={`${name}-${index}`}
						isActive={pathname === href}>
						<Link
							className='w-full'
							href={href}
							size='lg'
							color={
								pathname === href ? "secondary" : "foreground"
							}>
							{name}
						</Link>
					</NavbarItem>
				))}
			</NavbarContent>
			<NavbarContent justify='end'>
				<NavbarItem className='cursor-pointer'>
					<Link
						color='foreground'
						target='_blank'
						href='https://discord.gg/createastral'>
						<i className='i-fa6-brands-discord size-6'></i>
					</Link>
				</NavbarItem>
				<NavbarItem className='cursor-pointer'>
					<Link
						color='foreground'
						target='_blank'
						href='https://github.com/Astralopedia/astral-tools'>
						<i className='i-fa6-brands-github size-6'></i>
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarMenu>
				{menuItems.map(({ name, href }, index) => (
					<NavbarMenuItem
						key={`${name}-${index}`}
						isActive={pathname === href}>
						<Link
							className='w-full'
							href={href}
							size='lg'
							color={
								pathname === href ? "secondary" : "foreground"
							}>
							{name}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	)
}
