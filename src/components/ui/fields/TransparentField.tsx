import cn from 'clsx'
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	id: string
	extra?: string
	type?: string
	isNumber?: boolean
	placeholder?: string
}

export const TransparentField = forwardRef<HTMLInputElement, InputFieldProps>(
	({ id, extra, type, placeholder, isNumber, ...rest }, ref) => {
		return (
			<input
				ref={ref}
				type={type}
				id={id}
				placeholder={placeholder ? placeholder : ''}
				className={cn('outline-none peer', extra)}
				onKeyDown={event => {
					if (
						isNumber &&
						!/[0-9]/.test(event.key) &&
						event.key !== 'Backspace' &&
						event.key !== 'Tab' &&
						event.key !== 'Enter' &&
						event.key !== 'ArrowLeft' &&
						event.key !== 'ArrowRight'
					) {
						event.preventDefault()
					}
				}}
				{...rest}
			/>
		)
	}
)

TransparentField.displayName = 'field'
