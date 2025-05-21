import cn from 'clsx'

import LetterPicture from '@/components/ui/LetterPicture'

import { IMessage } from '@/types/message.types'

import { FormatTime12 } from '@/functions/FormatTime12'

interface IMessageElement {
	data: IMessage
	isSender: boolean
}
export default function MessageElement({ data, isSender }: IMessageElement) {
	return (
		<div
			className={cn(
				'MessageHolder flex gap-2 items-end',
				isSender ? 'justify-end' : 'justify-start'
			)}
		>
			{!isSender && (
				<LetterPicture
					letter={data.sender.name?.charAt(0) || 'P'}
					addStyle='h-auto! w-10'
					url={data.sender.imgUrl}
				/>
			)}
			<div
				className={cn(
					'babbbbe mb-1.5 flex rounded-2xl w-fit  max-w-full',
					isSender ? 'bg-active' : 'bg-background-secondary '
				)}
			>
				<div className='px-2 pt-1.25 pb-1.5 flex flex-col max-w-full'>
					<div className='text-sm text-text-secondary'>
						{!isSender && (
							<div className=''>
								{data.sender.name ? data.sender.name : `@${data.sender.login}`}
							</div>
						)}
					</div>
					<div className='whitespace-pre-wrap break-words leading-5.5 text-left flex items-end relative'>
						<p className='break-words max-w-full'>{data.content}</p>
						<span className='ml-1.75 px-1 leading-5 text-xs text-text-secondary whitespace-nowrap '>
							{FormatTime12(data.createdAt)}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}
