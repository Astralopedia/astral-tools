"use client"

import { Button, Input, Switch } from "@nextui-org/react"
import { useFormik } from "formik"
import { useQueryState } from "nuqs"
import { toast } from "sonner"
import { searchParams } from "../app/tools/server-scanner/searchParams"

export default function ServerIPInput() {
	const [ip, setIp] = useQueryState(
		"ip",
		searchParams.ip.withOptions({ shallow: false }),
	)
	const [java, setJava] = useQueryState(
		"java",
		searchParams.java.withOptions({ shallow: false }),
	)

	const formik = useFormik({
		initialValues: {
			ip: ip,
			java: java,
		},
		onSubmit: values => {
			if (!values.ip) {
				toast.error("IP is required")
				return
			}

			if (values.ip.split(":").length === 1) {
				setIp(`${values.ip}:${values.java === true ? 25565 : 19132}`)
				return
			}

			setIp(values.ip)
			setJava(values.java)
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
				className='w-full bg-neutral-900 rounded-xl'
				size='lg'
				onChange={formik.handleChange}
				value={formik.values.ip}
			/>
			<Switch
				isSelected={formik.values.java}
				onChange={formik.handleChange}
				name='java'
				size='lg'
				color='secondary'>
				{formik.values.java ? "Java" : "Bedrock"}
			</Switch>
			<Button type='submit' color='secondary' size='lg' className=''>
				Check
			</Button>
		</form>
	)
}
