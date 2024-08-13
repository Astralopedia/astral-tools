import ShootingStars from "./ui/shooting-stars"
import StarsBackground from "./ui/stars-background"

function Header() {
	return (
		<div className='h-screen bg-black flex flex-col items-center justify-center relative w-full'>
			<div className='w-11/12 mx-auto grid place-items-center'>
				<p className='text-4xl md:text-7xl text-center font-semibold'>
					All you need{" "}
				</p>
				<p className='text-4xl md:text-7xl text-center font-semibold'>
					to play
				</p>
				<p className='text-5xl md:text-8xl text-center bg-gradient-to-r from-[#734197] to-[#cfa0ee] inline-block font-semibold text-transparent bg-clip-text'>
					Create: Astral
				</p>
			</div>
			<div className='w-11/12 mx-auto'>
				{
					// TODO: Button groups
				}
			</div>

			<ShootingStars />
			<StarsBackground starDensity={0.0003} allStarsTwinkle={true} />
		</div>
	)
}

export default Header
