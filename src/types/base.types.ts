import { Dispatch, SetStateAction } from 'react'

export interface IDialogBase {
	isOpen: boolean
	onClose: Dispatch<SetStateAction<boolean>>
}
