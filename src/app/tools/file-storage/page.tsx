"use client"

import {
	Button,
	cn,
	Link,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Snippet,
	useDisclosure,
} from "@nextui-org/react"
import { encode } from "base64-arraybuffer"
import { filesize } from "filesize"
import { useCallback, useState } from "react"
import { FileRejection, useDropzone } from "react-dropzone"
import { toast } from "sonner"
import uploadToCatbox, { UploadData } from "./uploader"

export default function FileStorage() {
	const [files, setFiles] = useState<File[]>([])
	const [urls, setUrls] = useState<string[]>([])
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
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
	const { getInputProps, getRootProps, isDragActive } = useDropzone({
		onDrop,
		maxSize: 52428800, // 50MB
	})

	function handleSubmit(provider: "astral" | "catbox") {
		if (provider === "astral") {
			toast.error("Astral storage is not supported yet")
			return
		} else if (provider === "catbox") {
			Promise.all(
				files.map(async file => {
					try {
						const data: UploadData = {
							filename: file.name,
							encodedBuffer: encode(await file.arrayBuffer()),
						}
						// Only plain objects, and a few built-ins, can be passed to Server Actions. Classes or null prototypes are not supported.
						// NOTE: We cannot pass Buffer directly to server actions, so we need to encode it to base64 first via encode() and then decode it back to Buffer via decode()
						const result = uploadToCatbox(JSON.stringify(data))

						toast.promise(result, {
							loading: "Uploading...",
							success: result => {
								removeFile(file.name)
								setUrls(prevUrls => [...prevUrls, result])
								return `Uploaded successfully: ${file.name}`
							},
							error: e => (e as Error).message,
						})
					} catch (error) {
						toast.error((error as Error).message)
					}
				}),
			).finally(() => {
				setFiles([])
			})
		}
	}
	const removeFile = (name: string) => {
		setFiles(previousFiles =>
			previousFiles.filter(file => file.name !== name),
		)
	}

	return (
		<div className='w-full'>
			<div className='my-6'>
				<div className='mb-6'>
					<p className='text-center text-2xl sm:text-3xl'>
						File Storage
					</p>
					<p className='text-center text-md font-light'>
						Support files up to 50MB
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
							<p
								className={cn(
									"text-lg font-semibold",
									files.length <= 0 ? "hidden" : "",
								)}>
								Totals {files.length} files
							</p>
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
							<div className=''>
								{urls.map(url => (
									<div key={url} className='mt-6 w-full'>
										<Snippet
											symbol=''
											className='bg-neutral-900 w-full'>
											{url}
										</Snippet>
									</div>
								))}
								<div
									className={cn("w-full flex gap-3 mt-6", {
										hidden: urls.length == 0,
									})}>
									<Button
										color='warning'
										className=''
										size='lg'
										onClick={() => setUrls([])}>
										Clear URLs
									</Button>
								</div>
							</div>
						</div>
						<div
							className={cn("w-full flex gap-3", {
								hidden: files.length == 0,
							})}>
							<Button
								color='secondary'
								className=''
								size='lg'
								onClick={() => onOpen()}>
								Upload
							</Button>
							<Button
								color='primary'
								className=''
								size='lg'
								onClick={() => setFiles([])}>
								Clear files
							</Button>
						</div>
					</div>
				</div>
			</div>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				isDismissable={false}
				isKeyboardDismissDisabled={true}
				backdrop='blur'
				placement='center'>
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader className='flex flex-col gap-1 text-2xl'>
								Choose a storage provider
							</ModalHeader>
							<ModalBody>
								<div className=''>
									<p className='font-semibold text-xl'>
										Astral Storage
									</p>
									<p>
										A free storage service which being
										maintained by Astral Tools.
									</p>
								</div>
								<div className=''>
									{" "}
									<p className='font-semibold text-xl'>
										Catbox.moe
									</p>
									<p>
										A third-party free storage service which
										is not associated with Astral Tools. By
										using this service, you agree to their{" "}
										<Link
											color='secondary'
											href='https://catbox.moe/legal.php'
											target='_blank'>
											terms of service
										</Link>
										.
									</p>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button
									color='danger'
									variant='light'
									onPress={onClose}>
									Close
								</Button>
								<Button
									color='secondary'
									onPress={() => {
										onClose
										handleSubmit("astral")
									}}
									isDisabled>
									Astral Storage
								</Button>
								<Button
									color='warning'
									onPress={() => {
										onClose()
										handleSubmit("catbox")
									}}>
									Catbox.moe
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	)
}
