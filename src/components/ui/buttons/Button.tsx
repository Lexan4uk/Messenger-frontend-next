import cn from 'clsx'
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type TypeButton = ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
	children,
	className,
	...rest
}: PropsWithChildren<TypeButton>) {
	return (
		<button
			className={cn(
				'rounded-lg bg-transparent border border-border py-2 px-7 font-medium transition hover:bg-hover-button active:bg-brand-700',
				className
			)}
			{...rest}
		>
			{children}
		</button>
	)
}
