import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Link,
} from "@nextui-org/react"

type ToolItemType = {
	name: string
	description: string
	href: string
}

function ToolItem({ name, description, href }: ToolItemType) {
	return (
		<Card className='w-full h-full bg-black border-default border hover:brightness-125'>
			<CardHeader className='flex gap-3'>
				<div className='flex flex-col'>
					<p className='text-xl font-semibold'>{name}</p>
				</div>
			</CardHeader>
			<Divider />
			<CardBody>
				<p>{description}</p>
			</CardBody>
			<Divider />
			<CardFooter>
				<Button as={Link} color='secondary' size='md' href={href}>
					Try Now
				</Button>
			</CardFooter>
		</Card>
	)
}

export default ToolItem
export type { ToolItemType }
