import { Paperclip, Send, Smile } from 'lucide-react'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'

import { ButtonIcon } from '@/components/ui/buttons/ButtonIcon'

import { IMessageSend } from '@/types/message.types'

import { useSendMessage } from '../../hooks/useSendMessage'

import { InputFieldMessage } from './InputFieldMessage'

interface IChattingField {
	chatId: string
}
export default function ChattingField({ chatId }: IChattingField) {
	const { register, setValue, handleSubmit } = useForm<IMessageSend>({
		mode: 'onChange'
	})

	const inputRef = useRef<HTMLTextAreaElement | null>(null)
	const { sendMessage } = useSendMessage()

	const onSubmit = (data: IMessageSend) => {
		if (data.content === '') return
		if (inputRef.current) {
			inputRef.current.style.height = 'auto'
		}
		data.chatId = chatId
		sendMessage(data)
		setValue('content', '')
	}

	return (
		<div className='MessageInputField mb-3 pt-2 flex items-end h-fit'>
			<div className='bg-background-secondary flex flex-1 items-end rounded-2xl'>
				<div className='flex ml-3 '>
					<ButtonIcon className='group h-14 hover:bg-background-secondary!'>
						<Smile
							size={24}
							className='text-text-secondary group-hover:text-active transition-all duration-200 m-auto'
						/>
					</ButtonIcon>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex items-center pl-2 py-4.5 flex-1 h-fit'
				>
					<InputFieldMessage
						placeholder='Message'
						id='message'
						extra='w-full'
						internalRef={inputRef}
						onSend={handleSubmit(onSubmit)}
						{...register('content')}
					/>
				</form>
				<div className='flex ml-3 '>
					<ButtonIcon className='group h-14 aspect-square hover:bg-background-secondary!'>
						<Paperclip
							size={24}
							className='text-text-secondary group-hover:text-active transition-all duration-200 m-auto'
						/>
					</ButtonIcon>
				</div>
			</div>
			<ButtonIcon
				onClick={handleSubmit(onSubmit)}
				className='group bg-background-secondary ml-2 rounded-full h-14 aspect-square hover:bg-active!'
			>
				<Send
					size={24}
					className='text-text-secondary group-hover:text-text transition-all duration-200 mr-auto ml-1.75'
				/>
			</ButtonIcon>
		</div>
	)
}
