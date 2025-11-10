"use client"

import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
const links = [
	{ name: "Home", href: "/dashboard" },
	{
		name: "Invoices",
		href: "/dashboard/invoices",
	},
	{ name: "Customers", href: "/dashboard/customers" },
]

export default function NavLinks() {
	const pathname = usePathname()

	return (
		<>
			{links.map(link => {
				return (
					<Link
						href={link.href}
						key={link.name}
						className={clsx(
							"flex h-12 grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
							pathname === link.href
								? "bg-sky-100 text-blue-600"
								: "text-gray-600"
						)}
					>
						<p className="hidden md:block">{link.name}</p>
					</Link>
				)
			})}
		</>
	)
}
