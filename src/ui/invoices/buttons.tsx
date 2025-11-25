import { deleteInvoice } from "@/lib/actions"
import Link from "next/link"

export function CreateInvoice() {
	return (
		<Link
			href="/dashboard/invoices/create"
			className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-blue-600"
		>
			<span className="hidden md:block">Create Invoice</span>{" "}
		</Link>
	)
}

export function UpdateInvoice({ id }: { id: string }) {
	return (
		<Link
			href={`/dashboard/invoices/${id}/edit`}
			className="rounded-md border p-2 hover:bg-gray-100"
		>
			更新
		</Link>
	)
}

export function DeleteInvoice({ id }: { id: string }) {
	const deleteInvoiceWithId = deleteInvoice.bind(null, id)
	return (
		<form action={deleteInvoiceWithId}>
			<button className="rounded-md border p-2 hover:bg-gray-100">删除</button>
		</form>
	)
}
