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
}

export async function getServerStatus(ip: string): Promise<ServerStatus> {
	return (await (
		await fetch(
			`https://api.mcsrvstat.us/3/${ip.length === 0 ? "0.0.0.0:25565" : ip}`,
		)
	).json()) as ServerStatus
}
