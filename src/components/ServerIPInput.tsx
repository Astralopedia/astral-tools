"use client"

import { Button, Input } from "@nextui-org/react"
import { useFormik } from "formik"
import { useQueryState } from "nuqs"
import { toast } from "sonner"
import { searchParams } from "../app/tools/down-detector/searchParams"

export default function ServerIPInput() {
	const [ip, setIp] = useQueryState(
		"ip",
		searchParams.ip.withOptions({ shallow: false }),
	)

	const formik = useFormik({
		initialValues: {
			ip: ip,
		},
		onSubmit: values => {
			if (!values.ip) {
				toast.error("IP is required")
				return
			}

			if (values.ip.split(":").length === 1) {
				setIp(`${values.ip}:25565`)
				return
			}

			setIp(values.ip)
		},
	})

	return (
		<form
			onSubmit={formik.handleSubmit}
			className='inline-flex w-full gap-3 justify-center items-center'>
			<Input
				type='text'
				name='ip'
				placeholder='Server IP'
				className='w-full bg-neutral-900'
				size='lg'
				onChange={formik.handleChange}
				value={formik.values.ip}
			/>
			<Button type='submit' color='secondary' size='lg' className=''>
				Check
			</Button>
		</form>
	)
}
