"use client"

import { Button, cn, Link } from "@nextui-org/react"
import { filesize } from "filesize"
import { useCallback, useState } from "react"
import { FileRejection, useDropzone } from "react-dropzone"
import { toast } from "sonner"
import { convertAudio } from "./converter"

export default function Audio2DFPWM() {
	const [files, setFiles] = useState<File[]>([])

	function handleSubmit() {
		Promise.all(
			files.map(async file => {
				if (file.size == 0) {
					toast.error("File is empty")
					return
				}
				try {
					const buffer = await convertAudio(await file.arrayBuffer())
					const blob = new Blob([buffer], {
						type: "application/octet-stream",
					})
					const url = URL.createObjectURL(blob)
					const link = document.createElement("a")
					link.href = url
					link.download = file.name + ".dfpwm"
					link.click()
					URL.revokeObjectURL(url)
					toast.success("Converted successfully")
				} catch (e) {
					toast.error((e as Error).message)
				} finally {
					setFiles([])
				}
			}),
		)
	}
	const onDrop = useCallback(
		(acceptedFiles: File[], fileRejections: FileRejection[]) => {
			if (acceptedFiles.length) {
				setFiles(previousFiles => [
					...previousFiles,
					...acceptedFiles.map(file =>
						Object.assign(file, {
							url: URL.createObjectURL(file),
						}),
					),
				])
			}

			if (fileRejections.length) {
				toast.error(`${fileRejections.length} failed to upload`)
			}
		},
		[],
	)
	const removeFile = (name: string) => {
		setFiles(previousFiles =>
			previousFiles.filter(file => file.name !== name),
		)
	}
	const { getInputProps, getRootProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"audio/*": [],
		},
		maxSize: 262144000, // 250MB
	})

	return (
		<div className='w-full'>
			<div className='my-6'>
				<div className='mb-6'>
					<p className='text-center text-2xl sm:text-3xl'>
						Audio to DFPWM converter
					</p>
					<p className='text-center text-md font-light'>
						Convert method is from{" "}
						<Link
							color='secondary'
							href='https://github.com/SquidDev-CC/music.madefor.cc'
							className='cursor-pointer my-1'>
							@SquidDev
						</Link>
					</p>
				</div>
				<div className='h-full mx-auto w-11/12 border-default border rounded-xl grid place-items-center'>
					<div className='w-full max-w-5xl h-full grid place-items-center p-6'>
						<div
							className='text-center cursor-pointer bg-neutral-900 p-6 rounded-2xl w-full'
							{...getRootProps()}>
							<i className='i-fa6-solid-file-arrow-up w-16 h-16 mx-auto my-2' />
							<input {...getInputProps()} />
							<p className='text-2xl my-3'>
								{isDragActive ? (
									<span>Drop the files here</span>
								) : (
									<span>
										Drag &apos;n&apos; drop some files here,
										or click to select files
									</span>
								)}
							</p>
						</div>
						<div
							className={cn("w-full grid grid-cols-1 gap-6", {
								"my-6": files.length > 0,
							})}>
							{files.map(file => (
								<div
									className='bg-neutral-900 w-full rounded-2xl p-6 grid grid-cols-5'
									key={file.name}>
									<div className='my-8 md:my-0 w-48 md:w-24 col-span-5 md:col-span-2 lg:col-span-1 self-center mx-auto'>
										<i className='i-fa6-solid-file-audio w-10 h-10 mx-auto my-2' />
									</div>
									<div className='col-span-5 md:col-span-2 lg:col-span-3'>
										<p className='text-lg'>{file.name}</p>
										<p className='text-md text-default-500'>
											{filesize(file.size)}
										</p>
									</div>
									<div className='col-span-5 lg:col-span-1 h-full w-full grid place-items-center'>
										<i
											className='w-10 h-10 cursor-pointer i-fa6-solid-trash hover:text-danger-500'
											onClick={() =>
												removeFile(file.name)
											}
										/>
									</div>
								</div>
							))}
							<form
								className={cn("w-full flex gap-3", {
									hidden: files.length == 0,
								})}
								action={handleSubmit}>
								<Button
									color='secondary'
									className=''
									size='lg'
									onClick={() => handleSubmit()}>
									Convert
								</Button>
								<Button
									color='primary'
									className=''
									size='lg'
									onClick={() => setFiles([])}>
									Clear
								</Button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
