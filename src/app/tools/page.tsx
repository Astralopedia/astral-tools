import ToolContainer from "@/components/ToolContainer"
import { ToolItemType } from "@/components/ToolItem"

function Tools() {
	const tools: ToolItemType[] = [
		{
			name: "Audio to DFPWMA converter",
			description: "Convert audio to DFPWMA",
			href: "/tools/audio2dfpwma",
		},
		{
			name: "JVM Flags",
			description: "Choose the best JVM flags for your server and client",
			href: "/tools/flags",
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
