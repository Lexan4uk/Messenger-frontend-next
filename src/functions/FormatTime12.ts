import dayjs from 'dayjs'

export function FormatTime12(dateString: string): string {
	return dayjs(dateString).format('hh:mm A')
}
