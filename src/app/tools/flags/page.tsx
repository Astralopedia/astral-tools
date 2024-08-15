"use client"

import flags from "@/app/tools/flags/flags"
import {
	Button,
	Input,
	Link,
	Select,
	SelectItem,
	Slider,
	Switch,
	Textarea,
} from "@nextui-org/react"
import copy from "copy-to-clipboard"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

function generateFlag(
	filename: string,
	flag: string,
	os: string,
	memory: number,
	gui: boolean,
	autoRestart: boolean,
) {
	const ram = memory * 1024
	const baseFlag = `java -Xmx${ram}m -Xms${ram}m ${flags.find(v => v.name === flag)!.content} -jar ${filename}`

	const jvmFlag = gui ? baseFlag : `${baseFlag} -nogui`

	if (!autoRestart) {
		return jvmFlag
	}

	if (os === "windows") {
		return `:start\n${jvmFlag}\necho "Restarting in 5 seconds..."\ntimeout /t 5\necho "Press Ctrl + C to stop"\ngoto :start`
	} else {
		return `#!/bin/bash\nwhile true; do\n${jvmFlag}\necho "Restarting in 5 seconds..."\nsleep 5\necho "Press Ctrl + C to stop"\ndone`
	}
}

export default function Flags() {
	const router = useRouter()
	const availableFlags = flags.map(flag => flag.name)

	const [filename, setFilename] = useState<string>("server.jar")
	const [flag, setFlag] = useState<string>(availableFlags[0])
	const [os, setOs] = useState<string>("windows")
	const [memory, setMemory] = useState<number>(4)
	const [gui, setGui] = useState<boolean>(false)
	const [autoRestart, setAutoRestart] = useState<boolean>(true)
	const [jvmFlag, setJvmFlag] = useState<string>(
		generateFlag(filename, flag, os, memory, gui, autoRestart),
	)

	const url = URL.createObjectURL(
		new Blob([jvmFlag], {
			type: "text/plain",
		}),
	)

	useEffect(() => {
		setJvmFlag(generateFlag(filename, flag, os, memory, gui, autoRestart))
	}, [filename, flag, os, memory, gui, autoRestart])

	return (
		<div className='w-full'>
			<div className='my-6'>
				<div className='mb-6'>
					<p className='text-center text-3xl'>JVM Flags</p>
					<p className='text-center text-md font-light'>
						JVM flags for client?{" "}
						<Link color='secondary' className='cursor-pointer my-1'>
							Go here
						</Link>
					</p>
				</div>
				<div className='h-full mx-auto w-11/12'>
					<div className='w-full gap-6 grid grid-cols-1 md:grid-cols-2 place-items-center'>
						<div className='w-full h-full border-default border rounded-xl'>
							<form className='p-6 h-full flex flex-col gap-3'>
								<Input
									type='text'
									label='Filename'
									name='filename'
									value={filename}
									onChange={e => setFilename(e.target.value)}
									className='w-full'
									placeholder='server.jar'
									labelPlacement='outside'
									startContent={
										<div className='pointer-events-none flex items-center'>
											<span className='text-default-400 text-small i-fa6-regular-file'></span>
										</div>
									}
								/>
								<Select
									name='flag'
									items={flags}
									defaultSelectedKeys={[flag]}
									onChange={e => setFlag(e.target.value)}
									label='Flags'
									labelPlacement='outside'
									startContent={
										<div className='pointer-events-none flex items-center'>
											<span className='text-default-400 text-small i-fa6-regular-flag'></span>
										</div>
									}
									placeholder='Select a flag'
									className='w-full'>
									{flag => (
										<SelectItem key={flag.name}>
											{flag.name}
										</SelectItem>
									)}
								</Select>
								<Select
									label='Operating System'
									labelPlacement='outside'
									name='os'
									defaultSelectedKeys={[os]}
									onChange={e => setOs(e.target.value)}
									startContent={
										<div className='pointer-events-none flex items-center'>
											<span className='text-default-400 text-small i-fa6-solid-microchip'></span>
										</div>
									}
									placeholder='Choose your operating system'
									className='w-full'>
									<SelectItem key={"windows"}>
										Windows
									</SelectItem>
									<SelectItem key={"unix-like"}>
										Linux / OS X
									</SelectItem>
								</Select>
								<Slider
									label='Memory'
									showTooltip={true}
									color='secondary'
									onChange={value =>
										setMemory(value as number)
									}
									startContent={
										<div className='pointer-events-none flex items-center'>
											<span className='text-default-400 text-small i-fa6-solid-memory'></span>
										</div>
									}
									getValue={amount => `${amount} GB`}
									step={0.5}
									maxValue={24}
									minValue={1}
									marks={[
										{
											value: 4,
											label: "4 GB",
										},
										{
											value: 8,
											label: "8 GB",
										},
										{
											value: 12,
											label: "12 GB",
										},
										{
											value: 16,
											label: "16 GB",
										},
										{
											value: 20,
											label: "20 GB",
										},
									]}
									defaultValue={memory}
									className='w-full'
									name='memory'
								/>
								<Switch
									name='gui'
									defaultSelected={gui}
									onChange={e => setGui(!gui)}
									color='secondary'>
									GUI
								</Switch>
								<Switch
									name='autoRestart'
									defaultSelected={autoRestart}
									onChange={e => setAutoRestart(!autoRestart)}
									color='secondary'>
									Auto Restart
								</Switch>
							</form>
						</div>
						<div className='h-full w-full'>
							<Textarea
								isReadOnly
								label='JVM flags based on your selection'
								variant='bordered'
								labelPlacement='inside'
								value={jvmFlag}
								className='w-full'
							/>
							<div className='gap-2 flex'>
								<Button
									href={url}
									as={Link}
									startContent={
										<i className='i-fa6-solid-download'></i>
									}
									className='mt-6'
									color='secondary'
									download={
										os === "windows"
											? "start.bat"
											: "start.sh"
									}>
									Download
								</Button>
								<Button
									startContent={
										<i className='i-fa6-regular-copy'></i>
									}
									className='mt-6'
									color='secondary'
									onClick={() => copy(jvmFlag)}>
									Copy to clipboard
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
