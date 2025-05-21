import { forwardRef } from 'react'

interface InputFieldProps {
	id: string
	label?: string
	extra?: string
	placeholder?: string
	variant?: string
	state?: 'error' | 'success' | ''
	disabled?: boolean
	type?: string
	isNumber?: boolean
}

export const Field = forwardRef<HTMLInputElement, InputFieldProps>(
	(
		{ label, id, extra, type, placeholder, state, disabled, isNumber, ...rest },
		ref
	) => {
		return (
			<div className={`${extra}`}>
				{label && (
					<label
						htmlFor={id}
						className={`text-m text-text`}
					>
						{label}
					</label>
				)}
				<input
					ref={ref}
					disabled={disabled}
					type={type}
					id={id}
					placeholder={placeholder ? placeholder : ''}
					className={`mt-2 p-2 pl-4 flex w-full items-center justify-center rounded-full outline-none bg-fields  placeholder:text-text-secondary duration-200 transition-ring focus:ring-2 focus:ring-active ${
						disabled === true
							? '!border-none !bg-gray-100'
							: state === 'error'
								? 'border-red-500'
								: state === 'success'
									? 'border-green-500'
									: state === ''
										? ''
										: ''
					}`}
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
			</div>
		)
	}
)

Field.displayName = 'field'
