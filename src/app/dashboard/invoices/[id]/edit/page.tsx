import { fetchInvoiceById, fetchCustomers } from "@/lib/data"
import { notFound } from "next/navigation"

export default async function page(props: { params: Promise<{ id: string }> }) {
	const params = await props.params
	const id = params.id
	const [invoice, customers] = await Promise.all([
		fetchInvoiceById(id),
		fetchCustomers(),
	])
	console.log("invoice", invoice)
	if (invoice) {
		notFound()
	}

	return <div>update invoice</div>
}
