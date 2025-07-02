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
		<div className={cn('MessageHolder flex gap-2 items-end w-full')}>
			{!isSender && (
				<LetterPicture
					letter={
						data.sender.name?.charAt(0) === '@'
							? data.sender.name.charAt(1)
							: data.sender.name.charAt(0)
					}
					addStyle='h-auto! w-10'
					url={data.sender.imgUrl}
				/>
			)}
			<div
				className={cn(
					'flex flex-1 relative max-w-full',
					isSender ? 'justify-end' : 'justify-start'
				)}
			>
				<div
					className={cn(
						'mb-1.5 flex rounded-2xl w-fit',
						isSender ? 'bg-active' : 'bg-background-secondary '
					)}
				>
					<div className='px-2 pt-1.25 pb-1.5 flex flex-col max-w-full'>
						<div className='text-sm text-text-secondary'>
							{!isSender && <div className=''>{data.sender.name}</div>}
						</div>
						<div className='whitespace-pre-wrap break-words leading-5.5 text-left flex items-end relative'>
							<p className='break-all max-w-full'>{data.content}</p>
							<span className='ml-1.75 px-1 leading-5 text-xs text-text-secondary whitespace-nowrap '>
								{FormatTime12(data.createdAt)}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
