import ToolItem, { ToolItemType } from "./ToolItem"

function ToolContainer({ items }: { items: ToolItemType[] }) {
	return (
		<div className='w-11/12 mx-auto grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
			{items.map((item, index) => (
				<ToolItem {...item} key={index} />
			))}
		</div>
	)
}

export default ToolContainer
