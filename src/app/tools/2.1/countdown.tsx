"use client"

import { useEffect, useState } from "react"
import { formatInTimeZone } from "date-fns-tz"

interface TimeLeft {
	days: number
	hours: number
	minutes: number
	seconds: number
}

const Countdown = () => {
	const targetDate = "2024-10-01T01:00:00+07:00"

	const [timeLeft, setTimeLeft] = useState<TimeLeft>({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	})

	const calculateTimeLeft = (): TimeLeft => {
		const now = new Date()
		const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

		const formattedTargetDate = new Date(
			formatInTimeZone(targetDate, userTimeZone, "yyyy-MM-dd'T'HH:mm:ssXXX")
		)

		const difference = formattedTargetDate.getTime() - now.getTime()

		if (difference > 0) {
			return {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60),
			}
		} else {
			return { days: 0, hours: 0, minutes: 0, seconds: 0 }
		}
	}

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft())
		}, 1000)

		return () => clearInterval(timer)
	}, [])

	return (
		<div className='w-full h-full'>
			<p className='text-5xl text-center'>Create: Astral 2.1 Release</p>
			<p className='text-6xl text-center font-semibold'>
				{timeLeft.days} Days {timeLeft.hours} Hours {timeLeft.minutes} Minutes{" "}
				{timeLeft.seconds} Seconds
			</p>
		</div>
	)
}

export default Countdown
