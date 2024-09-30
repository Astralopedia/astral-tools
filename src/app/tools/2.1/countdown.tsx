"use client"

import { useEffect, useState } from "react"

const Countdown = () => {
	const targetDate: Date = new Date("October 1, 2024 01:00:00")
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	})

	const calculateTimeLeft = () => {
		const now: Date = new Date()
		const difference = targetDate - now

		let timeRemaining = {
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
		}

		if (difference > 0) {
			timeRemaining = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60),
			}
		}

		return timeRemaining
	}

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft())
		}, 1000)

		// Cleanup on unmount
		return () => clearInterval(timer)
	}, [])

	return (
		<div className='w-full h-full'>
			<p className='text-5xl text-center'>Create: Astral 2.1 Release</p>
			<p className='text-6xl text-center font-semibold'>
				{timeLeft.days} Days {timeLeft.hours} Hours {timeLeft.minutes}{" "}
				Minutes {timeLeft.seconds} Seconds
			</p>
		</div>
	)
}

export default Countdown
