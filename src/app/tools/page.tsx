import ToolContainer from "@/components/ToolContainer"
import { ToolItemType } from "@/components/ToolItem"

function Tools() {
	const tools: ToolItemType[] = [
		{
			name: "Audio to DFPWM converter",
			description: "Convert audio to DFPWM",
			href: "/tools/audio2dfpwm",
		},
		{
			name: "JVM Flags",
			description: "Choose the best JVM flags for your server and client",
			href: "/tools/flags",
		},
		{
			name: "File Storage",
			description: "Keep your files in the cloud forever",
			href: "/tools/file-storage",
		},
	]

	return (
		<div className='w-full'>
			<div className='my-6'>
				<p className='text-center text-3xl mb-6'>Available Tools</p>
				<ToolContainer items={tools} />
			</div>
		</div>
	)
}

export default Tools
