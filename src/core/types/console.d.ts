export {}

interface myConsole extends console {
	warning
}
declare global {
	interface Window {
		console: myConsole
	}
}
