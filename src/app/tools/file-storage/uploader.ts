"use server"

import { decode } from "base64-arraybuffer"

export type UploadResult = {
	url?: string
	ok: boolean
}

export type UploadData = {
	filename: string
	encodedBuffer: string
}

/**
 * NOTE: We cannot pass Buffer directly to server actions, so we need to encode it to base64 first via encode() and then decode it back to Buffer via decode()
 */
export default async function uploadToCatbox(data: string): Promise<string> {
	const { filename, encodedBuffer }: UploadData = JSON.parse(data)

	const formData = new FormData()

	formData.set("reqtype", "fileupload")
	formData.set("fileToUpload", new Blob([decode(encodedBuffer)]), filename)

	try {
		const res = await fetch("https://catbox.moe/user/api.php", {
			method: "POST",
			body: formData,
		})

		if (!res.ok) {
			throw new Error("Failed to upload file to Catbox.moe")
		}

		return await res.text()
	} catch (error) {
		throw error
	}
}
