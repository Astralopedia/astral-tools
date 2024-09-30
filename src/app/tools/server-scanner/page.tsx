// @ts-nocheck
import ServerIPInput from "@/components/ServerIPInput"
import { Image, Snippet, Tooltip } from "@nextui-org/react"
import { SearchParams } from "nuqs/parsers"
import { getServerStatus, ServerStatus } from "./actions"
import { searchParamsCache } from "./searchParams"

export default async function DownDetector({
	searchParams,
}: {
	searchParams: SearchParams
}) {
	const { ip, java } = searchParamsCache.parse(searchParams)

	const { result: serverStatus, error } = await getServerStatus(
		ip,
		java ? "java" : "bedrock",
	)

	return (
		<div className='w-full'>
			<div className='my-6'>
				<div className='mb-6'>
					<p className='text-center text-3xl'>
						Minecraft Server Scanner
					</p>
					<p className='text-center text-md font-light'>
						Get the status of any Minecraft server
					</p>
				</div>
				<div className='h-full mx-auto w-11/12'>
					<div className='max-w-5xl mx-auto'>
						<ServerIPInput />
						<div className='border border-divider rounded-xl mt-6 bg-neutral-900'>
							{error ? (
								<div className='p-6'>
									<Tooltip
										content='Cannot get data from API'
										color='secondary'>
										<p className='inline-flex gap-1 items-center justify-center'>
											<span className='inline-flex gap-1 items-center justify-center'>
												<i className='i-fa6-solid-circle text-danger'></i>
												Server Not Found
											</span>
										</p>
									</Tooltip>
								</div>
							) : (
								<ServerInfo data={serverStatus!} />
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

function ServerInfo({
	data: {
		online,
		icon,
		hostname,
		port,
		ip,
		version,
		protocol,
		software,
		gamemode,
		eula_blocked,
		players,
		serverid,
	},
}: {
	data: ServerStatus
}) {
	return (
		<div className='p-6'>
			{icon ? (
				<Image src={icon} alt='icon' className='mb-3 w-16 h-16' />
			) : null}
			<Tooltip
				content={
					online
						? "Server is online, you can join"
						: "Server is offline, you can not join"
				}
				color='secondary'>
				<p className='inline-flex gap-1 items-center justify-center'>
					<span className='font-semibold'>Server status: </span>
					{online ? (
						<span className='inline-flex gap-1 items-center justify-center'>
							<i className='i-fa6-solid-circle text-success'></i>
							Online
						</span>
					) : (
						<span className='inline-flex gap-1 items-center justify-center'>
							<i className='i-fa6-solid-circle text-danger'></i>
							Offline
						</span>
					)}
				</p>
			</Tooltip>
			{online ? (
				<div className='flex flex-col gap-1 mt-1'>
					{(
						<Snippet symbol='Hostname:'>{`${hostname ?? "Unknown"}:${port ?? "Unknown"}`}</Snippet>
					) ?? "Unknown"}
					{(
						<Snippet symbol='Players:' hideCopyButton>
							{`${players?.online ?? "Unknown"}/${players?.max ?? "Unknown"}`}
						</Snippet>
					) ?? "Unknown"}
					{(
						<Snippet symbol='IP:'>
							{ip}
						</Snippet>
					) ?? "Unknown"}
					{serverid ? (
						<Snippet symbol='Server ID:'>
							{serverid}
						</Snippet>
					) : null}
					{(
						<Snippet symbol='Version:' hideCopyButton>
							{version}
						</Snippet>
					) ?? "Unknown"}

					{
						<Snippet symbol='Protocol' hideCopyButton>
							<span>Name: {protocol?.name ?? "Unknown"}</span>
							<span>
								Version: {protocol?.version ?? "Unknown"}
							</span>
						</Snippet>
					}

					{(
						<Snippet symbol='Software:' hideCopyButton>
							{software ?? "Unknown"}
						</Snippet>
					) ?? "Unknown"}
					{(
						<Snippet symbol='Gamemode:' hideCopyButton>
							{gamemode ?? "Unknown"}
						</Snippet>
					) ?? "Unknown"}

					<Tooltip
						content="false means it is not in Mojang's blocklist, true means it is in the blocklist"
						color='secondary'>
						<Snippet symbol='EULA blocked:' hideCopyButton>
							{eula_blocked === true
								? "true"
								: eula_blocked === false
									? "false"
									: "Unknown"}
						</Snippet>
					</Tooltip>
				</div>
			) : null}
		</div>
	)
}
