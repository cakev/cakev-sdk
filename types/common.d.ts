export {}
declare global {
	interface Window {
		manager: any
	}
}

type contextmenu = {
	label: string
	disabled?: boolean
	children: Array<contextmenu>
	handler: Function
}
