import cn from 'clsx'
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type TypeButton = ButtonHTMLAttributes<HTMLButtonElement>

export function ButtonIcon({
	children,
	className,
	...rest
}: PropsWithChildren<TypeButton>) {
	return (
		<button
			type='button'
			className={cn(
				'p-2 hover:bg-fields rounded-full transition-all duration-200 focus:outline-none',
				className
			)}
			{...rest}
		>
			{children}
		</button>
	)
}
