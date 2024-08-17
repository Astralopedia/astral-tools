"use server"

type Players = {
	online: number
	max: number
}

type Protocol = {
	name: string
	version: string
}

export type ServerStatus = {
	online: boolean
	ip?: string
	port?: number
	hostname?: string
	version?: string
	icon?: string
	software?: string
	gamemode?: string
	players?: Players
	protocol?: Protocol
	eula_blocked?: boolean
	// Bedrock only
	serverid?: string
}

type ServerStatusResponse = {
	result?: ServerStatus
	error?: Error
}

export async function getServerStatus(
	ip: string,
	type: "java" | "bedrock",
): Promise<ServerStatusResponse> {
	try {
		if (type === "java") {
			const result = await await fetch(`https://api.mcsrvstat.us/3/${ip}`)

			if (!result.ok) {
				return {
					result: undefined,
					error: new Error("Server is offline"),
				} as ServerStatusResponse
			}

			const data = (await result.json()) as ServerStatus

			return {
				result: data,
				error: undefined,
			}
		} else {
			const result = await await fetch(
				`https://api.mcsrvstat.us/bedrock/3/${ip}`,
			)

			if (!result.ok) {
				return {
					result: undefined,
					error: new Error("Server is offline"),
				} as ServerStatusResponse
			}

			const data = (await result.json()) as ServerStatus

			return {
				result: data,
				error: undefined,
			}
		}
	} catch (error) {
		return {
			result: undefined,
			error: error as Error,
		}
	}
}
