import ToolContainer from "@/components/ToolContainer"
import { ToolItemType } from "@/components/ToolItem"

function Tools() {
	const tools: ToolItemType[] = [
		{
			name: "Audio to DFPWMA converter",
			description: "Convert audio to DFPWMA",
			href: "/tools/audio2dfpwma",
		},
	]

	return (
		<div>
			<p className='text-center text-3xl my-6'>Available Tools</p>
			<ToolContainer items={tools} />
		</div>
	)
}

export default Tools
