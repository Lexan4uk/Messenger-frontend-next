import { Image } from '@imagekit/next'

const backgroundColors = [
	'bg-indigo-600',
	'bg-purple-600',
	'bg-pink-600',
	'bg-rose-600',
	'bg-orange-600',
	'bg-emerald-600',
	'bg-cyan-600',
	'bg-blue-600',
	'bg-violet-600',
	'bg-fuchsia-600'
]

const getRandomColor = (letter: string) => {
	const index = letter.charCodeAt(0) % backgroundColors.length
	return backgroundColors[index]
}

interface ILetterPicture {
	letter: string
	url?: string
	addStyle?: string
}

export default function LetterPicture({
	letter,
	addStyle,
	url
}: ILetterPicture) {
	const backgroundColor = getRandomColor(letter)

	return url ? (
		<div
			className={`h-full border border-border aspect-square flex justify-center items-center rounded-full overflow-hidden ${addStyle}`}
		>
			<Image
				src={url}
				width={1000}
				height={1000}
				alt='user avatar'
				className={`object-cover h-full`}
			/>
		</div>
	) : (
		<div
			className={`h-full border border-border aspect-square flex justify-center items-center text-2xl text-white ${backgroundColor} rounded-full uppercase ${addStyle}`}
		>
			{letter}
		</div>
	)
}
