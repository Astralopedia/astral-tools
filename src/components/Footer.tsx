"use server"

import Image from "next/image"
import Link from "next/link"

import AstralToolsLogo from "@/assets/img/icon.png"

export default async function Footer() {
	const COMMIT_REF: string = (process.env.COMMIT_REF ?? "").slice(0, 7)

	return (
		<footer className='w-full bg-black border-divider border-t text-sm md:text-base'>
			<div className='p-10'>
				<div className='grid place-content-center grid-cols-2 lg:grid-cols-4 text-center'>
					<div className='grid place-items-center col-start-1 col-end-4 lg:col-start-1 lg:col-end-2 lg:grid-rows-5 my-3'>
						<Image
							src={AstralToolsLogo}
							alt='logo'
							width={160}
							className='py-2'
						/>
						<p className='text-gray-300'>
							Astral Tools is{" "}
							<Link
								href='https://github.com/Astralopedia/astral-tools'
								className='text-[#C88CF2]'>
								open source
							</Link>
						</p>
						<p>
							astralopedia/astral-tools@
							<Link
								className='text-[#C88CF2]'
								target='_blank'
								href={`https://github.com/Astralopedia/astral-tools/commit/${COMMIT_REF}`}>
								{COMMIT_REF}
							</Link>
						</p>
					</div>
					<div className='grid grid-cols-3 col-start-1 col-end-4 lg:col-start-2 lg:col-end-5'>
						<div className='grid grid-rows-5 gap-5'>
							<p className='text-gray-100 font-bold uppercase text-center'>
								Resources
							</p>
							<Link
								href='/tools'
								className='text-gray-300 hover:text-[#C88CF2]'
								target='_blank'>
								Tools
							</Link>
							<Link
								href='/map'
								className='text-gray-300 hover:text-[#C88CF2]'
								target='_blank'>
								Interactive Map
							</Link>
						</div>
						<div className='grid grid-rows-5 grid-flow-col'>
							<p className='text-gray-100 font-bold uppercase text-center'>
								Community
							</p>
							<Link
								href='https://discord.gg/mNeHyuZdqm'
								className='text-gray-300 hover:text-[#C88CF2]'
								target='_blank'>
								Discord
							</Link>
							<Link
								href='https://open.spotify.com/album/5z6NRIdWGJ6tpRC36mrxx3'
								className='text-gray-300 hover:text-[#C88CF2]'
								target='_blank'>
								Spotify
							</Link>
							<Link
								href='https://www.curseforge.com/minecraft/modpacks/create-astral'
								className='text-gray-300 hover:text-[#C88CF2]'
								target='_blank'>
								CurseForge
							</Link>
						</div>
						<div className='grid grid-rows-5'>
							<p className='text-gray-100 font-bold uppercase text-center'>
								Project
							</p>
							<Link
								href='https://github.com/Astralopedia/astral-tools/blob/main/CONTRIBUTING.md'
								className='text-gray-300 hover:text-[#C88CF2]'
								target='_blank'>
								Contributing
							</Link>
							<Link
								href='https://github.com/Astralopedia/astral-tools/blob/main/LICENSE'
								className='text-gray-300 hover:text-[#C88CF2]'
								target='_blank'>
								License
							</Link>
							<Link
								href='https://health.astral-chan.xyz'
								className='text-gray-300 hover:text-[#C88CF2]'
								target='_blank'>
								Status
							</Link>
						</div>
					</div>
				</div>
				<div className='pt-5'>
					<p className='text-center'>
						Site developed with{" "}
						<span className='i-fa6-solid-heart text-xl text-red-500'></span>{" "}
						by{" "}
						<Link
							className='hover:underline text-[#C88CF2]'
							href={"https://github.com/DefinedEntity"}
							target='_blank'>
							DefinedEntity
						</Link>
					</p>
				</div>
			</div>
		</footer>
	)
}
