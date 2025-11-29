"use server"
import { z } from "zod"
import postgres from "postgres"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" })

const FormSchema = z.object({
	id: z.string(),
	customerId: z.string({
		error: "Please select a customer.",
	}),
	amount: z.coerce
		.number()
		.gt(0, { message: "Please enter an amount greater than $0." }),
	status: z.enum(["pending", "paid"], {
		invalid_type_error: "Please select an invoice status.",
	}),
	date: z.string(),
})
const createInvoiceSchema = FormSchema.omit({ id: true, date: true })
const updateInvoiceShema = FormSchema.omit({ id: true, date: true })

export const createInvoice = async (prevState: State, formData: FormData) => {
	try {
		const rawFormdData = {
			customerId: formData.get("customerId"),
			amount: formData.get("amount"),
			status: formData.get("status"),
		}
		const validatedFields = createInvoiceSchema.safeParse({
			customerId: formData.get("customerId"),
			amount: formData.get("amount"),
			status: formData.get("status"),
		})

		if (!validatedFields.success) {
			return {
				errors: validatedFields.error.flatten().fieldErrors,
				message: "Missing Fields. Failed to Create Invoice.",
			}
		}
		// const { customerId, amount, status } =
		// 	createInvoiceSchema.parse(rawFormdData)
		const { customerId, amount, status } = validatedFields.data
		const amountInCents = amount * 100
		const date = new Date().toISOString().split("T")[0]

		await sql`INSERT INTO invoices (customer_id, amount, status, date) VALUES (${customerId},${amountInCents},${status},${date})`

		revalidatePath("/dashboard/invoices")
		console.log("rawFormdData", rawFormdData)
	} catch (error) {
		console.log("error", error)
	}
	redirect("/dashboard/invoices")
}
export type State = {
	errors?: {
		customerId?: string[]
		amount?: string[]
		status?: string[]
	}
	message?: string | null
}

export async function updateInvoice(id: string, formData: FormData) {
	const { customerId, amount, status } = updateInvoiceShema.parse({
		customerId: formData.get("customerId"),
		amount: formData.get("amount"),
		status: formData.get("status"),
	})

	const amountInCents = amount * 100

	try {
		await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `
	} catch (error) {
		// We'll also log the error to the console for now
		console.error(error)
		return { message: "Database Error: Failed to Update Invoice." }
	}

	revalidatePath("/dashboard/invoices")
	redirect("/dashboard/invoices")
}

export async function deleteInvoice(id: string) {
	throw new Error("Failed to Delete Invoice")

	// Unreachable code block
	await sql`DELETE FROM invoices WHERE id = ${id}`
	revalidatePath("/dashboard/invoices")
}
