import { io } from 'socket.io-client'

const socket = io(process.env.NEXT_PUBLIC_API_WS_URL!, {
	withCredentials: true,
	transports: ['websocket'],
	autoConnect: true
})

socket.on('connect', () => {})
socket.on('disconnect', reason => {})

export default socket
