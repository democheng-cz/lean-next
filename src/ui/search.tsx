"use client"

export default function Search({ placeholder }: { placeholder: string }) {
	return (
		<div className="relative flex flex-1 shrink-0">
			<label htmlFor="search" className="sr-only">
				Search
			</label>
			<input
				className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
				placeholder={placeholder}
			/>
		</div>
	)
}
