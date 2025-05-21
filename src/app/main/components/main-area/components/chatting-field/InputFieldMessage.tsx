import cn from 'clsx'
import { RefObject, TextareaHTMLAttributes, forwardRef, useEffect } from 'react'

interface InputFieldMessageProps
	extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	id: string
	extra?: string
	placeholder?: string
	onSend?: () => void
	internalRef: RefObject<HTMLTextAreaElement | null>
	maxHeight?: number
}

export const InputFieldMessage = forwardRef<
	HTMLTextAreaElement,
	InputFieldMessageProps
>(
	(
		{ id, extra, placeholder, onSend, internalRef, maxHeight = 40, ...rest },
		ref
	) => {
		useEffect(() => {
			if (typeof ref === 'function') {
				ref(internalRef.current)
			} else if (ref) {
				;(ref as React.MutableRefObject<HTMLTextAreaElement | null>).current =
					internalRef.current
			}
		}, [ref])

		const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
			const el = e.currentTarget

			el.style.height = 'auto'
			const newHeight = el.scrollHeight

			if (newHeight <= maxHeight) {
				el.style.height = `${newHeight}px`
				el.style.overflowY = 'hidden'
			} else {
				el.style.height = `${maxHeight}px`
				el.style.overflowY = 'auto'
			}
		}

		const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
			if (e.key === 'Enter' && !e.shiftKey) {
				e.preventDefault()
				onSend?.()
			}
		}

		return (
			<textarea
				ref={internalRef}
				id={id}
				placeholder={placeholder || ''}
				rows={1}
				onInput={handleInput}
				onKeyDown={handleKeyDown}
				className={cn(
					'outline-none resize-none leading-tight transition-all messages-scroll',
					extra
				)}
				style={{
					maxHeight: `${maxHeight}px`,
					overflowY: 'hidden'
				}}
				{...rest}
			/>
		)
	}
)

InputFieldMessage.displayName = 'MessageInput'
