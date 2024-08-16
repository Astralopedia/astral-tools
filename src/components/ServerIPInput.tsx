"use client"

import { Button, Input } from "@nextui-org/react"
import { useQueryState } from "nuqs"
import { useState } from "react"
import { toast } from "sonner"
import { searchParams } from "../app/tools/down-detector/searchParams"

export default function ServerIPInput() {
	const [ip, setIP] = useState<string>("")
	const [qIp, setQIp] = useQueryState(
		"ip",
		searchParams.ip.withOptions({ shallow: false }),
	)

	function validateBeforeChange() {
		const splittedIP = ip.split(":")

		if (splittedIP[0].length === 0) {
			toast.error("IP is required")
			return
		}

		if (splittedIP.length === 1) {
			setQIp(splittedIP.concat("25565").join(":"))
			return
		}

		setQIp(splittedIP.join(":"))
	}

	return (
		<div className='inline-flex w-full gap-3 justify-center items-center'>
			<Input
				type='text'
				name='ip'
				placeholder='Server IP'
				className='w-full bg-neutral-900'
				size='lg'
				onChange={e => setIP(e.target.value)}
				defaultValue={qIp}
			/>
			<Button
				onClick={() => validateBeforeChange()}
				color='secondary'
				size='lg'
				className=''>
				Check
			</Button>
		</div>
	)
}
