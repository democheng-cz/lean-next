"use client"

import { useDebouncedCallback } from "use-debounce"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

export default function Search({ placeholder }: { placeholder: string }) {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()

	const handleSearch = useDebouncedCallback((val: string) => {
		const params = new URLSearchParams(searchParams)
		params.set("page", "1")
		if (val) {
			params.set("query", val)
		} else {
			params.delete("query")
		}
		console.log("val", val, params.get("query"))
		replace(`${pathname}?${params.toString()}`)
	}, 500)

	return (
		<div className="relative flex flex-1 shrink-0">
			<label htmlFor="search" className="sr-only">
				Search
			</label>
			<input
				className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
				placeholder={placeholder}
				onChange={e => handleSearch(e.target.value)}
				defaultValue={searchParams.get("query")?.toString()}
			/>
		</div>
	)
}
